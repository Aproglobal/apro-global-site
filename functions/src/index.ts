// functions/src/index.ts
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import sgMail from "@sendgrid/mail";

// ⭐ Firestore 사용 (중복제출/레이트리밋)
import { initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
initializeApp();
const db = getFirestore();

/** --- Secrets (Firebase Functions v2) --- */
const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
const SALES_TO         = defineSecret("SALES_TO");
const SENDGRID_FROM    = defineSecret("SENDGRID_FROM"); // Single Sender 주소
const SALES_BCC        = defineSecret("SALES_BCC");     // 없으면 "__NONE__"
const RECAPTCHA_SECRET = defineSecret("RECAPTCHA_SECRET");

/** 간단 이메일 형식 검사 */
function isEmail(v?: string): boolean {
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
}

/** 수신자 파서 */
function toAddressList(v?: string): string[] | undefined {
  if (!v) return undefined;
  const arr = String(v).split(/[;,]/).map(s => s.trim()).filter(Boolean);
  return arr.length ? arr : undefined;
}

/** 이름 분해 */
function splitName(full?: string): { firstName?: string; lastName?: string } {
  if (!full) return {};
  const parts = String(full).trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/** 필수값 누락 */
function missingFields(body: Record<string, any>, required: string[]): string[] {
  return required.filter((k) => !body?.[k] || String(body[k]).trim() === "");
}

/** reCAPTCHA v3 검증 */
async function verifyRecaptchaV3(token: string, secret: string, remoteIp?: string) {
  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", token);
  if (remoteIp) params.set("remoteip", remoteIp);

  const resp = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  return resp.json() as Promise<{
    success: boolean;
    score?: number;
    action?: string;
    "error-codes"?: string[];
    [k: string]: any;
  }>;
}

export const lead = onRequest(
  {
    cors: true,
    secrets: [SENDGRID_API_KEY, SALES_TO, SENDGRID_FROM, SALES_BCC, RECAPTCHA_SECRET],
  },
  async (req, res): Promise<void> => {
    // 허용 메서드
    if (req.method === "OPTIONS") { res.status(204).end(); return; }
    if (req.method !== "POST") { res.status(405).send("Method Not Allowed"); return; }

    const b = (req.body ?? {}) as Record<string, any>;

    // --- 0) 허니팟 차단 ---
    if (b.website) {
      res.status(400).json({ ok: false, error: "bot_detected" });
      return;
    }

    // name만 온 경우 호환
    if (!b.firstName && b.name) {
      const { firstName, lastName } = splitName(b.name);
      b.firstName = b.firstName ?? firstName;
      b.lastName  = b.lastName  ?? lastName;
    }

    // --- 1) 필수값 확인 ---
    const required = ["firstName", "lastName", "company", "email", "recaptchaToken", "requestId"];
    const miss = missingFields(b, required);
    if (miss.length) {
      res.status(400).json({ ok: false, error: "missing_fields", fields: miss });
      return;
    }
    if (!isEmail(b.email)) {
      res.status(400).json({ ok: false, error: "invalid_email" });
      return;
    }

    // --- 2) 중복 제출 봉인 + Rate Limit ---
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip || "";
    const now = Date.now();
    const window5m = Timestamp.fromMillis(now - 5 * 60 * 1000);

    // (2-1) requestId 중복 방지
    const reqRef = db.collection("lead_requests").doc(String(b.requestId));
    const existed = await reqRef.get();
    if (existed.exists) {
      res.status(409).json({ ok: false, error: "duplicate_request" });
      return;
    }

    // (2-2) RateLimit: IP & 이메일 기준 5분 10회
    const [byIpSnap, byEmailSnap] = await Promise.all([
      db.collection("lead_requests")
        .where("ip", "==", ip)
        .where("createdAt", ">=", window5m)
        .get(),
      db.collection("lead_requests")
        .where("email", "==", b.email)
        .where("createdAt", ">=", window5m)
        .get(),
    ]);

    if (byIpSnap.size > 10 || byEmailSnap.size > 10) {
      res.status(429).json({ ok: false, error: "rate_limited" });
      return;
    }

    // (2-3) 기록 저장 (TTL: createdAt 기준으로 콘솔에서 TTL 설정해 두세요)
    await reqRef.set({
      createdAt: Timestamp.now(),
      ip,
      email: b.email,
      source: b.source || "-",
    });

    // --- 3) reCAPTCHA 검증 ---
    const secret = RECAPTCHA_SECRET.value();
    if (!secret || secret === "__NONE__") {
      res.status(500).json({ ok: false, error: "recaptcha_secret_not_configured" });
      return;
    }
    try {
      const verify = await verifyRecaptchaV3(b.recaptchaToken, secret, ip);
      if (!verify.success || (typeof verify.score === "number" && verify.score < 0.5)) {
        res.status(400).json({ ok: false, error: "recaptcha_failed", verify });
        return;
      }
    } catch (e) {
      console.error("[RECAPTCHA] verification error:", e);
      res.status(500).json({ ok: false, error: "recaptcha_verify_error" });
      return;
    }

    // --- 4) 메일 전송 준비 ---
    const API_KEY   = SENDGRID_API_KEY.value();
    const FROM_EMAIL = SENDGRID_FROM.value();
    const FROM_NAME  = "APRO Sales Team";
    if (!API_KEY || API_KEY === "__NONE__") {
      res.status(500).json({ ok: false, error: "sendgrid_key_not_configured" });
      return;
    }
    if (!isEmail(FROM_EMAIL) || FROM_EMAIL === "__NONE__") {
      res.status(500).json({ ok: false, error: "sendgrid_from_not_configured_or_invalid" });
      return;
    }
    sgMail.setApiKey(API_KEY);

    const fullName = `${b.firstName} ${b.lastName}`.trim();
    const subject = `[Lead] ${fullName} — ${b.company}${b.modelCode ? ` — ${b.modelCode}` : ""}`;

    const toList  = toAddressList(SALES_TO.value());
    const bccList = (() => {
      const raw = SALES_BCC.value();
      if (!raw || raw === "__NONE__") return undefined;
      return toAddressList(raw);
    })();
    if (!toList || toList.length === 0 || !toList.every(isEmail)) {
      res.status(500).json({ ok: false, error: "sales_to_not_configured_or_invalid" });
      return;
    }
    const replyTo = isEmail(b.email) ? b.email : undefined;

    // --- 5) 세일즈팀 발송 ---
    try {
      await sgMail.send({
        to: toList,
        bcc: bccList,
        from: { email: FROM_EMAIL, name: FROM_NAME },
        replyTo,
        subject,
        text:
`Source: ${b.source || "-"}
Model: ${b.modelCode || "-"}
Name: ${fullName}
Company: ${b.company}
Email: ${b.email}
Phone: ${b.phone || "-"}

Message:
${b.message || "-"}

Meta:
URL: ${b.url || "-"}
UA: ${b.userAgent || "-"}
Locale: ${b.locale || "-"}
Timezone: ${b.timezone || "-"}
`,
      });
    } catch (err: any) {
      console.error("[SENDGRID:sales] error:", err?.response?.body || err);
      res.status(500).json({ ok: false, error: "email_send_failed_sales" });
      return;
    }

    // --- 6) 고객 자동 회신(선택, 실패 무시) ---
    try {
      await sgMail.send({
        to: b.email,
        from: { email: FROM_EMAIL, name: FROM_NAME },
        subject: "APRO — Thanks for your inquiry",
        text:
`Hi ${b.firstName},

Thanks for reaching out to APRO.
We received your request${b.modelCode ? ` about model ${b.modelCode}` : ""} and will respond shortly.

If urgent, reply to this email or call us at +82-XX-XXXX-XXXX.

— APRO Sales Team`,
      });
    } catch (err: any) {
      console.warn("[SENDGRID:auto-reply] error (ignored):", err?.response?.body || err);
    }

    console.info("[LEAD] ok", {
      rid: String(b.requestId || "").slice(0, 8),
      ip: (ip || "").slice(0, 8) + "*",
      email_masked: (b.email || "").replace(/(^.).+(@.*$)/, "$1***$2"),
    });

    res.json({ ok: true });
  }
);

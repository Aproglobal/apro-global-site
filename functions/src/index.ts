// functions/src/index.ts
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import * as logger from "firebase-functions/logger";
import sgMail from "@sendgrid/mail";

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

  // 네트워크/파싱 예외는 호출부에서 잡음
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
    // ✅ 최상단 가드: 어떤 예외든 JSON으로 떨어지게
    try {
      // ── 공통: 메서드/프리플라이트
      if (req.method === "OPTIONS") { res.status(204).end(); return; }
      if (req.method !== "POST") { res.status(405).json({ ok:false, error:"method_not_allowed" }); return; }

      const b = (req.body ?? {}) as Record<string, any>;

      // 0) 허니팟
      if (b.website) { res.status(400).json({ ok:false, error:"bot_detected" }); return; }

      // name → first/last 호환
      if (!b.firstName && b.name) {
        const { firstName, lastName } = splitName(b.name);
        b.firstName = b.firstName ?? firstName;
        b.lastName  = b.lastName  ?? lastName;
      }

      // 1) 필수값
      const required = ["firstName", "lastName", "company", "email", "recaptchaToken", "requestId"];
      const miss = missingFields(b, required);
      if (miss.length) { res.status(400).json({ ok:false, error:"missing_fields", fields:miss }); return; }
      if (!isEmail(b.email)) { res.status(400).json({ ok:false, error:"invalid_email" }); return; }

      // 2) 중복/레이트리밋
      const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip || "";
      const now = Date.now();
      const window5m = Timestamp.fromMillis(now - 5 * 60 * 1000);

      // (2-1) requestId 중복
      const reqRef = db.collection("lead_requests").doc(String(b.requestId));
      const existed = await reqRef.get();
      if (existed.exists) { res.status(409).json({ ok:false, error:"duplicate_request" }); return; }

      // (2-2) rate limit
      const [byIpSnap, byEmailSnap] = await Promise.all([
        db.collection("lead_requests").where("ip","==",ip).where("createdAt",">=",window5m).get(),
        db.collection("lead_requests").where("email","==",b.email).where("createdAt",">=",window5m).get(),
      ]);
      if (byIpSnap.size > 10 || byEmailSnap.size > 10) { res.status(429).json({ ok:false, error:"rate_limited" }); return; }

      // (2-3) 기록 저장
      await reqRef.set({ createdAt: Timestamp.now(), ip, email: b.email, source: b.source || "-" });

      // 3) reCAPTCHA
      const secret = RECAPTCHA_SECRET.value();
      if (!secret || secret === "__NONE__") {
        logger.error("RECAPTCHA secret not configured");
        res.status(500).json({ ok:false, error:"recaptcha_secret_not_configured" });
        return;
      }
      try {
        const verify = await verifyRecaptchaV3(b.recaptchaToken, secret, ip);
        if (!verify.success || (typeof verify.score === "number" && verify.score < 0.5)) {
          logger.warn("reCAPTCHA failed", { score: verify.score ?? null, codes: verify["error-codes"] ?? [] });
          res.status(400).json({ ok:false, error:"recaptcha_failed", score: verify.score ?? null });
          return;
        }
      } catch (e:any) {
        logger.error("reCAPTCHA verification error", { msg: e?.message || String(e) });
        res.status(502).json({ ok:false, error:"recaptcha_verify_error" });
        return;
      }

      // 4) 메일 전송 준비
      const API_KEY    = SENDGRID_API_KEY.value();
      const FROM_EMAIL = SENDGRID_FROM.value();
      const FROM_NAME  = "APRO Sales Team";
      if (!API_KEY || API_KEY === "__NONE__") {
        logger.error("SENDGRID_API_KEY missing");
        res.status(500).json({ ok:false, error:"sendgrid_key_not_configured" });
        return;
      }
      if (!isEmail(FROM_EMAIL) || FROM_EMAIL === "__NONE__") {
        logger.error("SENDGRID_FROM invalid", { from: FROM_EMAIL });
        res.status(500).json({ ok:false, error:"sendgrid_from_not_configured_or_invalid" });
        return;
      }

      sgMail.setApiKey(API_KEY);

      const toList  = toAddressList(SALES_TO.value());
      const bccList = (() => {
        const raw = SALES_BCC.value();
        if (!raw || raw === "__NONE__") return undefined;
        return toAddressList(raw);
      })();
      if (!toList || toList.length === 0 || !toList.every(isEmail)) {
        logger.error("SALES_TO invalid or missing", { toList });
        res.status(500).json({ ok:false, error:"sales_to_not_configured_or_invalid" });
        return;
      }

      const fullName = `${b.firstName} ${b.lastName}`.trim();
      const subject = `[Lead] ${fullName} — ${b.company}${b.modelCode ? ` — ${b.modelCode}` : ""}`;
      const replyTo = isEmail(b.email) ? b.email : undefined;

      // 5) 세일즈팀 발송
      try {
        await sgMail.send({
          to: toList,
          bcc: bccList, // "__NONE__"면 undefined
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
      } catch (err:any) {
        const sgErr = err?.response?.body || err?.message || err;
        logger.error("[SENDGRID:sales] send error", { error: sgErr });
        res.status(502).json({ ok:false, error:"email_send_failed_sales" });
        return;
      }

      // 6) 고객 자동 회신(실패 무시)
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
      } catch (err:any) {
        logger.warn("[SENDGRID:auto-reply] ignored", { error: err?.response?.body || err?.message || err });
      }

      logger.info("[LEAD] ok", {
        rid: String(b.requestId || "").slice(0, 8),
        ip: (ip || "").slice(0, 8) + "*",
        email_masked: (b.email || "").replace(/(^.).+(@.*$)/, "$1***$2"),
      });

      res.json({ ok: true });
    } catch (e:any) {
      // ✅ 마지막 방어막: 텍스트 대신 항상 JSON
      logger.error("[LEAD] unhandled", { message: e?.message || String(e), stack: e?.stack });
      if (!res.headersSent) {
        res.status(500).json({ ok:false, error:"unhandled_error", message: e?.message || String(e) });
      }
    }
  }
);

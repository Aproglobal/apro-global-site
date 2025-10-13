// functions/src/index.ts
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import sgMail from "@sendgrid/mail";

/** --- Secrets (Firebase Functions v2: 콘솔 or CLI로 설정) --- */
const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
const SALES_TO         = defineSecret("SALES_TO");
const SENDGRID_FROM    = defineSecret("SENDGRID_FROM"); // ✅ Single Sender 주소(aproglobal@kukjeint.com)
const SALES_BCC        = defineSecret("SALES_BCC");     // 없으면 "__NONE__"가 들어옴
const RECAPTCHA_SECRET = defineSecret("RECAPTCHA_SECRET");

/** 간단 이메일 형식 검사 (RFC 완벽 X, 실무용 최소) */
function isEmail(v?: string): boolean {
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
}

/** 콤마/세미콜론 구분 수신자 파서 */
function toAddressList(v?: string): string[] | undefined {
  if (!v) return undefined;
  const arr = String(v)
    .split(/[;,]/)
    .map(s => s.trim())
    .filter(Boolean);
  return arr.length ? arr : undefined;
}

/** 이름 분해 도우미: name만 온 경우 first/last로 분리 */
function splitName(full?: string): { firstName?: string; lastName?: string } {
  if (!full) return {};
  const parts = String(full).trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/** 필드 누락 계산 */
function missingFields(
  body: Record<string, any>,
  required: string[]
): string[] {
  return required.filter((k) => !body?.[k] || String(body[k]).trim() === "");
}

/** reCAPTCHA v3 검증 */
async function verifyRecaptchaV3(token: string, secret: string, remoteIp?: string) {
  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", token);
  if (remoteIp) params.set("remoteip", remoteIp);

  // Node 20+ 에서는 fetch 내장
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
    /** 허용 메서드 */
    if (req.method === "OPTIONS") { res.status(204).end(); return; }
    if (req.method !== "POST") { res.status(405).send("Method Not Allowed"); return; }

    // 바디 파싱 (Functions v2는 JSON 자동 파싱됨)
    const b = (req.body ?? {}) as Record<string, any>;

    // 호환: name 단일로 오면 first/last 자동 분할
    if (!b.firstName && b.name) {
      const { firstName, lastName } = splitName(b.name);
      b.firstName = b.firstName ?? firstName;
      b.lastName  = b.lastName  ?? lastName;
    }

    // 필수값 정의 (기존 규칙 유지) + recaptchaToken
    const required = ["firstName", "lastName", "company", "email", "recaptchaToken"];
    const miss = missingFields(b, required);
    if (miss.length) {
      res.status(400).json({ ok: false, error: "missing_fields", fields: miss });
      return;
    }

    // reCAPTCHA Secret 구성 확인
    const secret = RECAPTCHA_SECRET.value();
    if (!secret || secret === "__NONE__") {
      res.status(500).json({ ok: false, error: "recaptcha_secret_not_configured" });
      return;
    }

    // reCAPTCHA 검증 (score 0.5 미만 or 실패 시 400)
    try {
      const verify = await verifyRecaptchaV3(b.recaptchaToken, secret, req.ip);
      if (!verify.success || (typeof verify.score === "number" && verify.score < 0.5)) {
        res.status(400).json({ ok: false, error: "recaptcha_failed", verify });
        return;
      }
    } catch (e) {
      console.error("[RECAPTCHA] verification error:", e);
      res.status(500).json({ ok: false, error: "recaptcha_verify_error" });
      return;
    }

    // --- 메일 전송 준비 ---
    const API_KEY = SENDGRID_API_KEY.value();
    const FROM_EMAIL = SENDGRID_FROM.value();                // ✅ Single Sender 고정
    const FROM_NAME = "APRO Sales Team";                     // 표시명 (원하면 변경)
    if (!API_KEY || API_KEY === "__NONE__") {
      res.status(500).json({ ok: false, error: "sendgrid_key_not_configured" });
      return;
    }
    if (!isEmail(FROM_EMAIL) || FROM_EMAIL === "__NONE__") {
      // ✅ Single Sender만 쓸 때 가장 흔한 실수 방지
      res.status(500).json({ ok: false, error: "sendgrid_from_not_configured_or_invalid" });
      return;
    }

    sgMail.setApiKey(API_KEY);

    const fullName = `${b.firstName} ${b.lastName}`.trim();
    const subject = `[Lead] ${fullName} — ${b.company}${b.modelCode ? ` — ${b.modelCode}` : ""}`;

    // 수신자 목록 파싱 (콤마/세미콜론 모두 허용)
    const toList  = toAddressList(SALES_TO.value());
    const bccList = ((): string[] | undefined => {
      const raw = SALES_BCC.value();
      if (!raw || raw === "__NONE__") return undefined;
      return toAddressList(raw);
    })();

    if (!toList || toList.length === 0 || !toList.every(isEmail)) {
      res.status(500).json({ ok: false, error: "sales_to_not_configured_or_invalid" });
      return;
    }

    // replyTo 최소 검증 (형식 불량이면 폴백 없음: 제거)
    const replyTo = isEmail(b.email) ? b.email : undefined;

    // --- 1) 세일즈팀 메일(필수) ---
    try {
      await sgMail.send({
        to: toList,
        bcc: bccList,
        from: { email: FROM_EMAIL, name: FROM_NAME },        // ✅ 표시명 분리
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
Page: ${b.page || "-"}
Variant: ${b.variant || "-"}
UA: ${b.ua || "-"}
UTM: source=${b.utm_source || "-"}, medium=${b.utm_medium || "-"}, campaign=${b.utm_campaign || "-"}, term=${b.utm_term || "-"}, content=${b.utm_content || "-"}
GCLID: ${b.gclid || "-"}
`,
        // 테스트 시 실발송 방지하려면 GitHub/Firebase에 SENDGRID_SANDBOX=true 설정 후 아래 주석 해제
        // mailSettings: { sandboxMode: { enable: process.env.SENDGRID_SANDBOX === "true" } },
      });
    } catch (err: any) {
      console.error("[SENDGRID:sales] error:", err?.response?.body || err);
      res.status(500).json({ ok: false, error: "email_send_failed_sales" });
      return;
    }

    // --- 2) 고객 자동 회신(선택: 실패해도 성공 반환) ---
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
        // mailSettings: { sandboxMode: { enable: process.env.SENDGRID_SANDBOX === "true" } },
      });
    } catch (err: any) {
      console.warn("[SENDGRID:auto-reply] error (ignored):", err?.response?.body || err);
      // 실패해도 성공 응답 유지
    }

    res.json({ ok: true });
  }
);

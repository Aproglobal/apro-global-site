import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import sgMail from "@sendgrid/mail";

/** Secret Manager 변수들 */
const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
const SALES_TO         = defineSecret("SALES_TO");        // 세일즈 수신
const SENDGRID_FROM    = defineSecret("SENDGRID_FROM");   // 인증된 발신자 주소
const SALES_BCC        = defineSecret("SALES_BCC");       // 선택

export const lead = onRequest(
  { cors: true, secrets: [SENDGRID_API_KEY, SALES_TO, SENDGRID_FROM, SALES_BCC] },
  async (req, res) => {
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    const {
      firstName, lastName, company, email, phone, message,
      modelCode, source, page, variant, ua,
    } = req.body || {};

    // 최소 필드 검증
    if (!firstName || !lastName || !company || !email) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    const apiKey = SENDGRID_API_KEY.value();
    const to = SALES_TO.value();
    const from = SENDGRID_FROM.value();
    const bcc = SALES_BCC.value();

    if (!apiKey || !to || !from) {
      console.error("[MAIL] Missing secrets", {
        hasApiKey: !!apiKey,
        hasTo: !!to,
        hasFrom: !!from,
      });
      return res.status(500).json({ ok: false, error: "Mail secrets not configured" });
    }

    sgMail.setApiKey(apiKey);

    const fullName = `${firstName} ${lastName}`.trim();
    const subject = `[Lead] ${fullName} — ${company}${modelCode ? ` — ${modelCode}` : ""}`;

    // 일반 텍스트 본문(로그/검색 용이)
    const textBody =
`Source: ${source || "-"}
Model: ${modelCode || "-"}
Name: ${fullName}
Company: ${company}
Email: ${email}
Phone: ${phone || "-"}

Message:
${message || "-"}

Meta:
Page: ${page || "-"}
Variant: ${variant || "-"}
UA: ${ua || "-"}
`;

    // HTML 본문(가독성)
    const escape = (s: string) => s.replace(/[<>&]/g, ch => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[ch]!));
    const htmlBody = `
      <h2>New Lead</h2>
      <ul>
        <li><b>Source</b>: ${escape(String(source ?? "-"))}</li>
        <li><b>Model</b>: ${escape(String(modelCode ?? "-"))}</li>
        <li><b>Name</b>: ${escape(fullName)}</li>
        <li><b>Company</b>: ${escape(String(company))}</li>
        <li><b>Email</b>: ${escape(String(email))}</li>
        <li><b>Phone</b>: ${escape(String(phone ?? "-"))}</li>
      </ul>
      <h3>Message</h3>
      <pre style="white-space:pre-wrap">${escape(String(message ?? "-"))}</pre>
      <h3>Meta</h3>
      <ul>
        <li><b>Page</b>: ${escape(String(page ?? "-"))}</li>
        <li><b>Variant</b>: ${escape(String(variant ?? "-"))}</li>
        <li><b>UA</b>: ${escape(String(ua ?? "-"))}</li>
      </ul>
    `;

    try {
      // 1) 세일즈팀 수신
      const [resp1] = await sgMail.send({
        to,
        bcc: bcc ? [bcc] : undefined,
        from,
        replyTo: email,
        subject,
        text: textBody,
        html: htmlBody,
      });

      // 2) 고객 자동 회신(선택)
      const [resp2] = await sgMail.send({
        to: email,
        from,
        subject: "APRO — Thanks for your inquiry",
        text:
`Hi ${firstName},

Thanks for reaching out to APRO.
We received your request${modelCode ? ` about model ${modelCode}` : ""} and will respond shortly.

If urgent, reply to this email or call us at +82-XX-XXXX-XXXX.

— APRO Sales Team`,
      });

      console.log("[MAIL] Sent:", {
        salesStatus: resp1?.statusCode,
        userStatus: resp2?.statusCode,
      });

      return res.json({ ok: true });
    } catch (err: any) {
      // SendGrid는 원인 메시지를 response.body로 줌
      const body = err?.response?.body;
      console.error("[MAIL] Send error:", body || err?.message || err);
      return res.status(500).json({ ok: false, error: "Email send failed" });
    }
  }
);

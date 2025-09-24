import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
const SALES_TO         = defineSecret("SALES_TO");             // 세일즈 수신 메일
const FROM             = defineSecret("FROM");                 // 송신(인증된) 주소
const SALES_BCC        = defineSecret("SALES_BCC");            // 선택

export const lead = onRequest(
  { cors: true, secrets: [SENDGRID_API_KEY, SALES_TO, FROM, SALES_BCC] },
  async (req, res) => {
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    const {
      firstName, lastName, company, email, phone, message,
      modelCode, source, page, variant, ua,
    } = req.body || {};

    if (!firstName || !lastName || !company || !email) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    sgMail.setApiKey(SENDGRID_API_KEY.value());

    const fullName = `${firstName} ${lastName}`.trim();
    const subject = `[Lead] ${fullName} — ${company}${modelCode ? ` — ${modelCode}` : ""}`;

    try {
      // 1) 세일즈팀 수신
      await sgMail.send({
        to: SALES_TO.value(),
        bcc: SALES_BCC.value() ? [SALES_BCC.value()] : undefined,
        from: FROM.value(),
        replyTo: email,
        subject,
        text:
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
`,
      });

      // 2) 고객 자동 회신
      await sgMail.send({
        to: email,
        from: FROM.value(),
        subject: "APRO — Thanks for your inquiry",
        text:
`Hi ${firstName},

Thanks for reaching out to APRO.
We received your request${modelCode ? ` about model ${modelCode}` : ""} and will respond shortly.

If urgent, reply to this email or call us at +82-XX-XXXX-XXXX.

— APRO Sales Team`,
      });

      return res.json({ ok: true });
    } catch (err: any) {
      console.error(err?.response?.body || err);
      return res.status(500).json({ ok: false, error: "Email send failed" });
    }
  }
);

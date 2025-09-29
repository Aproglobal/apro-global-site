import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
const SALES_TO         = defineSecret("SALES_TO");
const SENDGRID_FROM    = defineSecret("SENDGRID_FROM");
const SALES_BCC        = defineSecret("SALES_BCC");

export const lead = onRequest(
  { cors: true, secrets: [SENDGRID_API_KEY, SALES_TO, SENDGRID_FROM, SALES_BCC] },
  async (req, res): Promise<void> => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const {
      firstName, lastName, company, email, phone, message,
      modelCode, source, page, variant, ua,
    } = req.body || {};

    if (!firstName || !lastName || !company || !email) {
      res.status(400).json({ ok: false, error: "Missing required fields" });
      return;
    }

    sgMail.setApiKey(SENDGRID_API_KEY.value());

    const fullName = `${firstName} ${lastName}`.trim();
    const subject =
      `[Lead] ${fullName} — ${company}${modelCode ? ` — ${modelCode}` : ""}`;

    try {
      // 1) 세일즈팀 수신
      await sgMail.send({
        to: SALES_TO.value(),
        bcc: SALES_BCC.value() ? [SALES_BCC.value()] : undefined,
        from: SENDGRID_FROM.value(),
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
        from: SENDGRID_FROM.value(),
        subject: "APRO — Thanks for your inquiry",
        text:
`Hi ${firstName},

Thanks for reaching out to APRO.
We received your request${modelCode ? ` about model ${modelCode}` : ""} and will respond shortly.

If urgent, reply to this email or call us at +82-XX-XXXX-XXXX.

— APRO Sales Team`,
      });

      res.json({ ok: true });
      return;
    } catch (err: any) {
      console.error(err?.response?.body || err);
      res.status(500).json({ ok: false, error: "Email send failed" });
      return;
    }
  }
);

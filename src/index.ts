import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import fetch from "node-fetch";
import sgMail from "@sendgrid/mail";

// --- Secrets (GitHub Actions에서 Secret Manager에 동기화됨) ---
const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
const SALES_TO         = defineSecret("SALES_TO");         // 수신자(필수)
const SENDGRID_FROM    = defineSecret("SENDGRID_FROM");    // 발신자(필수)
const SALES_BCC        = defineSecret("SALES_BCC");        // 선택
const RECAPTCHA_SECRET = defineSecret("RECAPTCHA_SECRET"); // reCAPTCHA v3 서버 시크릿(필수)

// Admin 초기화 (필요 시)
try { admin.initializeApp(); } catch { /* no-op (already initialized) */ }

// 공용: reCAPTCHA 검증
async function verifyRecaptcha(token: string, secret: string) {
  const resp = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token })
  });
  return (await resp.json()) as {
    success: boolean;
    score?: number;
    action?: string;
    "error-codes"?: string[];
  };
}

export const lead = onRequest(
  {
    cors: true,
    region: "asia-northeast3",
    secrets: [SENDGRID_API_KEY, SALES_TO, SENDGRID_FROM, SALES_BCC, RECAPTCHA_SECRET]
  },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      return res.status(204).send("");
    }

    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "method_not_allowed" });
    }

    try {
      const {
        name = "",
        email = "",
        company = "",
        phone = "",
        interest = "",
        quantity = "",
        location = "",
        message = "",
        recaptchaToken = ""
      } = (req.body ?? {}) as Record<string, string>;

      if (!email || !recaptchaToken) {
        return res.status(400).json({ ok: false, error: "missing_required_fields" });
      }

      // 1) reCAPTCHA v3 검증
      const recap = await verifyRecaptcha(recaptchaToken, RECAPTCHA_SECRET.value());
      if (!recap.success || (typeof recap.score === "number" && recap.score < 0.5)) {
        return res.status(400).json({ ok: false, error: "recaptcha_failed", score: recap.score ?? null });
      }

      // 2) 메일 발송
      sgMail.setApiKey(SENDGRID_API_KEY.value());

      const to = SALES_TO.value();
      const from = SENDGRID_FROM.value();
      const bcc = SALES_BCC.value() || undefined;

      const subject = `[Lead] ${name || "(no name)"} — ${interest || "(no model)"} — ${company || "(no company)"}`;
      const plain = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company}`,
        `Phone: ${phone}`,
        `Interest: ${interest}`,
        `Quantity: ${quantity}`,
        `Location: ${location}`,
        `Message: ${message}`,
        "",
        `UA: ${req.get("user-agent") || ""}`,
        `IP: ${req.headers["x-forwarded-for"] || req.ip || ""}`
      ].join("\n");

      const html = `
        <h2>New Lead</h2>
        <table border="0" cellpadding="4" cellspacing="0">
          <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><b>Email</b></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><b>Company</b></td><td>${escapeHtml(company)}</td></tr>
          <tr><td><b>Phone</b></td><td>${escapeHtml(phone)}</td></tr>
          <tr><td><b>Interest</b></td><td>${escapeHtml(interest)}</td></tr>
          <tr><td><b>Quantity</b></td><td>${escapeHtml(String(quantity))}</td></tr>
          <tr><td><b>Location</b></td><td>${escapeHtml(location)}</td></tr>
          <tr><td><b>Message</b></td><td>${escapeHtml(message).replace(/\n/g, "<br/>")}</td></tr>
        </table>
        <hr/>
        <div style="font-size:12px;color:#555">
          UA: ${escapeHtml(String(req.get("user-agent") || ""))}<br/>
          IP: ${escapeHtml(String(req.headers["x-forwarded-for"] || req.ip || ""))}
        </div>
      `;

      const msg: sgMail.MailDataRequired = {
        to,
        from,
        ...(bcc ? { bcc } : {}),
        subject,
        text: plain,
        html
      };

      await sgMail.send(msg);

      return res.status(200).json({ ok: true });
    } catch (err: any) {
      console.error("lead error:", err);
      return res.status(500).json({ ok: false, error: "internal_error" });
    }
  }
);

// 간단한 HTML 이스케이프
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      case "'": return "&#39;";
      default: return c;
    }
  });
}

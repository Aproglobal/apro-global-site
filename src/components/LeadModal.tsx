import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { MODELS } from "../data/models";
import { submitLead } from "../services/lead";
import { loadRecaptcha, getRecaptchaToken } from "../lib/recaptcha";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export type LeadOpenDetail = { source?: string; modelCode?: string };

export function openLead(source?: string): void;
export function openLead(source?: string, payload?: { modelCode?: string }): void;
export function openLead(source?: string, payload?: { modelCode?: string }) {
  const detail: LeadOpenDetail = { source, ...(payload || {}) };
  window.dispatchEvent(new CustomEvent<LeadOpenDetail>("lead:open", { detail }));
}

export function closeLead() {
  window.dispatchEvent(new CustomEvent("lead:close"));
}

export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<string>("");
  const [modelCode, setModelCode] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  const selectedModel = useMemo(() => MODELS.find((m) => m.code === modelCode) || null, [modelCode]);

  const onEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  // 모달 열릴 때 reCAPTCHA 선로드(+ ready 보장)
  useEffect(() => {
    if (!open) return;
    const key = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
    (async () => {
      if (!key) return;
      try {
        await loadRecaptcha(key);
      } catch {
        /* optional */
      }
    })();
  }, [open]);

  // 모달 오픈 이벤트 (GA4)
  useEffect(() => {
    if (!open) return;
    window.gtag?.("event", "lead_open", {
      event_category: "lead",
      source: source || "(unknown)",
      model_code: modelCode || "(none)",
    });
  }, [open, source, modelCode]);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const ce = e as CustomEvent<LeadOpenDetail>;
      setSource(ce.detail?.source ?? "");
      setModelCode(ce.detail?.modelCode ?? "");
      setOpen(true);
    };
    const handleClose = () => setOpen(false);

    window.addEventListener("lead:open", handleOpen as EventListener);
    window.addEventListener("lead:close", handleClose);
    return () => {
      window.removeEventListener("lead:open", handleOpen as EventListener);
      window.removeEventListener("lead:close", handleClose);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onEsc);
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = orig;
    };
  }, [open, onEsc]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setStatusMsg(null);

    const formEl = formRef.current ?? e.currentTarget;
    const fd = new FormData(formEl);

    const firstName = String(fd.get("firstName") || "").trim();
    const lastName = String(fd.get("lastName") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String((fd.get("phone") ?? "") as string).trim();
    const company = String(fd.get("company") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const selModelCode = String(fd.get("modelCode") || "");
    const src = String(fd.get("source") || source || "Unknown");
    const website = String(fd.get("website") || ""); // honeypot

    if (!firstName || !lastName || !email || !company) {
      setStatusMsg("Please check the required fields.");
      return;
    }

    let recaptchaToken = "";
    try {
      recaptchaToken = await getRecaptchaToken("lead_email");
    } catch {
      /* server will reject if required */
    }

    const payload = {
      firstName,
      lastName,
      name: [firstName, lastName].filter(Boolean).join(" "),
      email,
      phone,
      company,
      message,
      modelCode: selModelCode,
      source: src,
      website,
      type: "lead",
      site: location.hostname,
      country: "KR",
      privacyAgree: true,
      referrer: document.referrer,
      url: location.href,
      pathname: location.pathname,
      origin: location.origin,
      userAgent: navigator.userAgent,
      locale: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      recaptchaToken,
      requestId: crypto.randomUUID(),
    };

    try {
      setLoading(true);
      await submitLead(payload);

      window.gtag?.("event", "generate_lead", {
        event_category: "lead",
        source: payload.source || "(unknown)",
        model_code: payload.modelCode || "(none)",
      });

      window.gtag?.("event", "lead_submit_success", {
        event_category: "lead",
        source: payload.source || "(unknown)",
        model_code: payload.modelCode || "(none)",
      });

      setStatusMsg("Submitted. Thank you!");
      formEl.reset();
      setOpen(false);
    } catch (err: any) {
      console.error("❌ Lead submit failed", err);
      const msg = err?.body?.data?.message || err?.message || "An error occurred during submission.";
      setStatusMsg(msg);

      window.gtag?.("event", "lead_submit_error", {
        event_category: "lead",
        source: src || "(unknown)",
        model_code: selModelCode || "(none)",
        reason: msg || "(unknown)",
      });
    } finally {
      setLoading(false);
    }
  };

  const modal = (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} aria-hidden />
      {/* Dialog wrapper */}
      <div className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
          className="w-full max-w-lg my-8 rounded-2xl bg-white text-black shadow-xl overflow-hidden dark:bg-zinc-900 dark:text-white"
        >
          {/* Header */}
          <div className="relative p-6 border-b border-zinc-200 dark:border-zinc-800">
            <h3 id="lead-modal-title" className="text-xl font-bold">
              Talk to Sales
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Share your details and your request. We’ll reply with pricing, lead time, and demos.
            </p>

            {/* Close (X) */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close dialog"
              title="Close"
              className="absolute right-3 top-3 inline-grid h-9 w-9 place-items-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-zinc-500" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form ref={formRef} className="p-6" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-3">
              {/* 이름 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  name="firstName"
                  placeholder="First name"
                  required
                  autoFocus
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:focus:ring-white/10"
                />
                <input
                  name="lastName"
                  placeholder="Last name"
                  required
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:focus:ring-white/10"
                />
              </div>

              {/* 회사/이메일/전화 */}
              <input
                name="company"
                placeholder="Company"
                required
                className="w-full rounded-xl border border-zinc-200 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:focus:ring-white/10"
              />
              <input
                name="email"
                type="email"
                inputMode="email"
                placeholder="Work email"
                required
                className="w-full rounded-xl border border-zinc-200 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:focus:ring-white/10"
              />
              <input
                name="phone"
                inputMode="tel"
                placeholder="Phone (optional)"
                className="w-full rounded-xl border border-zinc-200 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:focus:ring-white/10"
              />

              {/* 문의 대상 모델 */}
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-300 mt-1">Inquiry about</label>
              <select
                name="modelCode"
                value={modelCode}
                onChange={(e) => setModelCode(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:bg-zinc-900 dark:border-zinc-700 dark:focus:ring-white/10"
              >
                <option value="">General inquiry (no specific model)</option>
                {MODELS.map((m) => (
                  <option key={m.code} value={m.code}>
                    {m.name}
                  </option>
                ))}
              </select>

              <textarea
                name="message"
                placeholder={
                  modelCode
                    ? `Inquiry about ${selectedModel?.name || modelCode}: models, quantity, timeline, site location...`
                    : "Models, quantity, timeline, site location..."
                }
                className="min-h-[100px] w-full resize-y rounded-xl border border-zinc-200 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:focus:ring-white/10"
              />

              {/* 허니팟 */}
              <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />

              {/* 추적용 hidden */}
              <input type="hidden" name="source" value={source || "Unknown"} />
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-3 rounded-full bg-black text-white font-semibold disabled:opacity-60 dark:bg-white dark:text-black"
              >
                {loading ? "Submitting..." : "Send inquiry"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-700"
              >
                Cancel
              </button>
            </div>

            <p className="mt-3 text-[11px] text-zinc-500 dark:text-zinc-400">
              This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </p>

            {statusMsg && <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">{statusMsg}</p>}
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

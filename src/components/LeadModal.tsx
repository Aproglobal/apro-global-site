// src/components/LeadModal.tsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { MODELS } from "../data/models";
import { submitLead } from "../services/lead";
import { loadRecaptcha } from "../lib/recaptcha"; // ✅ 추가: 제출 직전 ready 보장

/** 이벤트 payload 타입 */
export type LeadOpenDetail = { source?: string; modelCode?: string };

/** ---- Public API (오버로드 지원) ----
 *  1) openLead(source?: string)
 *  2) openLead(source?: string, payload?: { modelCode?: string })
 */
export function openLead(source?: string): void;
export function openLead(source?: string, payload?: { modelCode?: string }): void;
export function openLead(source?: string, payload?: { modelCode?: string }) {
  const detail: LeadOpenDetail = { source, ...(payload || {}) };
  window.dispatchEvent(new CustomEvent<LeadOpenDetail>("lead:open", { detail }));
}

export function closeLead() {
  window.dispatchEvent(new CustomEvent("lead:close"));
}

/** 싱글톤 모달: App.tsx에서 <LeadModal /> 한 번만 렌더 */
export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<string>("");
  const [modelCode, setModelCode] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const selectedModel = useMemo(
    () => MODELS.find((m) => m.code === modelCode) || null,
    [modelCode]
  );

  const onEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

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
    if (loading) return; // 중복 제출 방지

    // ✅ 제출 직전: reCAPTCHA 스크립트 로드 & ready 보장 (첫 클릭 실패 차단)
    const key = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;
    if (key) await loadRecaptcha(key);
    const gre: any = (window as any).grecaptcha?.enterprise || (window as any).grecaptcha;
    if (!gre?.execute) {
      await new Promise((r) => (gre?.ready ? gre.ready(r) : setTimeout(r, 120)));
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const basePayload = {
      name:
        (formData.get("firstName") as string) +
        " " +
        (formData.get("lastName") as string),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      message: formData.get("message"),
      modelCode: formData.get("modelCode"),
      source: formData.get("source") || "Unknown",
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
    };

    try {
      setLoading(true);
      setStatusMsg(null);
      const resp = await submitLead(basePayload);
      console.log("✅ Lead submitted", resp);
      setStatusMsg("제출이 완료되었습니다. 감사합니다.");
      form.reset();
      setOpen(false);
    } catch (err: any) {
      console.error("❌ Lead submit failed", err);
      setStatusMsg(err?.message || "제출 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const modal = (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => setOpen(false)}
        aria-hidden
      />
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
              Share your details and your request. We&apos;ll get back with pricing, lead time, and demos.
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
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-zinc-500"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form className="p-6" onSubmit={handleSubmit}>
            <div className="grid gap-3">
              {/* 이름 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  name="firstName"
                  placeholder="First name"
                  required
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
                placeholder="Work email"
                required
                className="w-full rounded-xl border border-zinc-200 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:focus:ring-white/10"
              />
              <input
                name="phone"
                placeholder="Phone (optional)"
                className="w-full rounded-xl border border-zinc-200 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:focus:ring-white/10"
              />

              {/* 문의 대상 모델 */}
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-300 mt-1">
                Inquiry about
              </label>
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

              {/* 추적용 hidden */}
              <input type="hidden" name="source" value={source || "Unknown"} />
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
              >
                {loading ? "Submitting..." : "Continue in email"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-700"
              >
                Cancel
              </button>
            </div>

            {statusMsg && (
              <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                {statusMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

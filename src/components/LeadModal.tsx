// src/components/LeadModal.tsx
import React, { useEffect, useState, useCallback } from "react";

/** 공개 API: 어디서든 호출 */
export function openLead(source?: string) {
  window.dispatchEvent(new CustomEvent("lead:open", { detail: { source } }));
}
export function closeLead() {
  window.dispatchEvent(new CustomEvent("lead:close"));
}

/** 프롭스 없는 싱글톤 모달: App.tsx 최상단에서 <LeadModal /> 한 번만 렌더링 */
export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<string>("");

  const onEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const ce = e as CustomEvent<{ source?: string }>;
      setSource(ce.detail?.source ?? "");
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

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => setOpen(false)}
        aria-hidden
      />
      {/* Dialog */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
          className="w-full max-w-lg rounded-2xl bg-white shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="relative p-6 border-b">
            <h3 id="lead-modal-title" className="text-xl font-bold">
              Talk to Sales
            </h3>
            <p className="mt-1 text-sm text-zinc-600">
              Share your details and your request. We&apos;ll get back with pricing, lead time, and demos.
            </p>

            {/* Close (X) */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close dialog"
              title="Close"
              className="absolute right-3 top-3 inline-grid h-9 w-9 place-items-center rounded-lg hover:bg-zinc-100"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="#6b7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form
            className="p-6"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: 제출 로직 연결 (이메일/백엔드)
              setOpen(false);
            }}
          >
            <div className="grid gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  name="firstName"
                  placeholder="First name"
                  required
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                />
                <input
                  name="lastName"
                  placeholder="Last name"
                  required
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              <input
                name="company"
                placeholder="Company"
                required
                className="w-full rounded-xl border border-zinc-200 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
              />
              <input
                name="email"
                type="email"
                placeholder="Work email"
                required
                className="w-full rounded-xl border border-zinc-200 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
              />
              <input
                name="phone"
                placeholder="Phone (optional)"
                className="w-full rounded-xl border border-zinc-200 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
              />
              <textarea
                name="message"
                placeholder="Models, quantity, timeline, site location..."
                className="min-h-[100px] w-full resize-y rounded-xl border border-zinc-200 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
              />

              {/* 추적용 hidden field (라벨 일관성 유지) */}
              <input type="hidden" name="source" value={source || "Unknown"} />
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                className="px-5 py-3 rounded-full bg-black text-white font-semibold"
              >
                Continue in email
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-5 py-3 rounded-full border"
              >
                Cancel
              </button>
            </div>

            <p className="mt-3 text-xs text-zinc-500">
              We respect your privacy. Your information will only be used to contact you regarding your inquiry.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

// src/components/LeadModal.tsx
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { MODELS } from "../data/models";

/** 이벤트 payload 타입 */
export type LeadOpenDetail = { source?: string; modelCode?: string };

/** ---- Public API (오버로드 지원) ----
 *  1) openLead(source?: string)
 *  2) openLead(source?: string, payload?: { modelCode?: string })
 */
export function openLead(source?: string): void;
export function openLead(
  source?: string,
  payload?: { modelCode?: string }
): void;
export function openLead(
  source?: string,
  payload?: { modelCode?: string }
) {
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

  const firstNameRef = useRef<HTMLInputElement | null>(null);

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
    // 살짝 지연 후 포커스
    const t = setTimeout(() => firstNameRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = orig;
      clearTimeout(t);
    };
  }, [open, onEsc]);

  if (!open) return null;

  const modal = (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay (바깥 클릭 시 닫힘) */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* 스크롤 컨테이너 (뷰포트 기준) */}
      <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6 overscroll-contain touch-pan-y">
        {/* 다이얼로그 본문: 헤더/바디/푸터 3영역, 바디만 스크롤 */}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
          className="mx-auto my-4 sm:my-8 w-full max-w-lg rounded-2xl bg-white text-black shadow-xl dark:bg-zinc-900 dark:text-white flex flex-col max-h-[85vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()} // 내부 클릭은 닫힘 방지
        >
          {/* Header (고정) */}
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

          {/* Body (스크롤 되는 영역) */}
          <div className="px-6 py-4 overflow-y-auto">
            <div className="grid gap-3">
              {/* 이름 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  ref={firstNameRef}
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

              {/* 문의 대상 모델 (자동 선택) */}
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

              {/* 추적용 hidden field */}
              <input type="hidden" name="source" value={source || "Unknown"} />
            </div>
          </div>

          {/* Footer (고정) */}
          <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: 제출 로직 (modelCode, source 포함)
                setOpen(false);
              }}
              className="flex items-center gap-3"
            >
              <button
                type="submit"
                className="px-5 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
              >
                Continue in email
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-700"
              >
                Cancel
              </button>
            </form>

            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              We respect your privacy. Your information will only be used to contact you regarding your inquiry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // 포털로 body 최상단에 렌더 → 다른 오버레이 위에 확실히 뜸
  return createPortal(modal, document.body);
}

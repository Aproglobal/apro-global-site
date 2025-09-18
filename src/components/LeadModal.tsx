// src/components/LeadModal.tsx
import React, { useEffect, useState, useCallback } from "react";

/** ---- Public API: 다른 컴포넌트에서 호출 ---- */
export function openLead(source?: string) {
  window.dispatchEvent(new CustomEvent("lead:open", { detail: { source } }));
}
export function closeLead() {
  window.dispatchEvent(new CustomEvent("lead:close"));
}

/** ---- 스타일 ---- */
const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};
const dialogStyle: React.CSSProperties = {
  position: "relative",
  width: "min(560px, 92vw)",
  background: "#ffffff",
  color: "#111111",
  borderRadius: 12,
  boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
  padding: "24px 24px 20px",
};
const titleStyle: React.CSSProperties = { margin: 0, fontSize: 20, fontWeight: 700, lineHeight: 1.2 };
const subtitleStyle: React.CSSProperties = { margin: "8px 0 20px", fontSize: 14, color: "#555" };
const closeBtnStyle: React.CSSProperties = {
  position: "absolute", top: 10, right: 10, width: 36, height: 36, display: "grid", placeItems: "center",
  border: "none", borderRadius: 8, background: "transparent", cursor: "pointer",
};
const formRowStyle: React.CSSProperties = { display: "grid", gap: 12, marginBottom: 14 };
const inputStyle: React.CSSProperties = {
  width: "100%", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px 14px", fontSize: 14, outline: "none",
};
const ctaStyle: React.CSSProperties = {
  width: "100%", border: "none", borderRadius: 10, padding: "12px 16px", fontSize: 16, fontWeight: 700,
  background: "#0d6efd", color: "#ffffff", cursor: "pointer",
};
const helperStyle: React.CSSProperties = { marginTop: 8, fontSize: 12, color: "#6b7280", textAlign: "center" };

/** ---- Default Export: 루트 컴포넌트(프롭스 없음) ---- */
export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<string>("");

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  const onOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  useEffect(() => {
    const onOpen = ((e: Event) => {
      const ce = e as CustomEvent<{ source?: string }>;
      setSource(ce.detail?.source ?? "");
      setOpen(true);
    }) as EventListener;

    const onClose = () => setOpen(false);
    window.addEventListener("lead:open", onOpen);
    window.addEventListener("lead:close", onClose);
    return () => {
      window.removeEventListener("lead:open", onOpen);
      window.removeEventListener("lead:close", onClose);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleEsc);
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = orig;
    };
  }, [open, handleEsc]);

  if (!open) return null;

  return (
    <div style={overlayStyle} onClick={onOverlayClick} role="presentation" aria-hidden={!open}>
      <div role="dialog" aria-modal="true" aria-labelledby="lead-modal-title" style={dialogStyle}>
        {/* 닫기(X) */}
        <button type="button" onClick={() => setOpen(false)} style={closeBtnStyle} aria-label="Close dialog" title="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <h2 id="lead-modal-title" style={titleStyle}>Talk to Sales</h2>
        <p style={subtitleStyle}>
          Share your details and your request. We'll get back with pricing, lead time, and demos.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: 제출 로직 연결 (email/API)
            setOpen(false);
          }}
        >
          <div style={formRowStyle}>
            <input style={inputStyle} name="firstName" placeholder="First name" required />
            <input style={inputStyle} name="lastName" placeholder="Last name" required />
            <input style={inputStyle} name="company" placeholder="Company" required />
            <input style={inputStyle} name="email" placeholder="Work email" type="email" required />
            <input style={inputStyle} name="phone" placeholder="Phone (optional)" />
            <textarea
              style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
              name="message"
              placeholder="Models, quantity, timeline, site location..."
            />
            {/* 추적용 hidden field: 호출부에서 넘긴 라벨을 반영 */}
            <input type="hidden" name="source" value={source || "Unknown"} />
          </div>

          <button type="submit" style={ctaStyle}>Continue in email</button>
          <div style={helperStyle}>
            We respect your privacy. Your information will only be used to contact you regarding your inquiry.
          </div>
        </form>
      </div>
    </div>
  );
}

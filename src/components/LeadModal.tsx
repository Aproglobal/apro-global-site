// src/components/LeadModal.tsx
import React, { useEffect, useCallback } from "react";

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
}

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

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 20,
  fontWeight: 700,
  lineHeight: 1.2,
};

const subtitleStyle: React.CSSProperties = {
  margin: "8px 0 20px",
  fontSize: 14,
  color: "#555",
};

const closeBtnStyle: React.CSSProperties = {
  position: "absolute",
  top: 10,
  right: 10,
  width: 36,
  height: 36,
  display: "grid",
  placeItems: "center",
  border: "none",
  borderRadius: 8,
  background: "transparent",
  cursor: "pointer",
};

const formRowStyle: React.CSSProperties = { display: "grid", gap: 12, marginBottom: 14 };

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #e5e7eb",
  borderRadius: 10,
  padding: "12px 14px",
  fontSize: 14,
  outline: "none",
};

const ctaStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 10,
  padding: "12px 16px",
  fontSize: 16,
  fontWeight: 700,
  // 명시적으로 높은 대비 색상 지정 (배경과 텍스트 색 분리)
  background: "#0d6efd",   // 파란색 배경
  color: "#ffffff",         // 흰색 텍스트
  cursor: "pointer",
};

const helperStyle: React.CSSProperties = {
  marginTop: 8,
  fontSize: 12,
  color: "#6b7280",
  textAlign: "center",
};

export default function LeadModal({ open, onClose }: LeadModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // 스크롤 잠금
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  // 오버레이 클릭 시 닫기
  const onOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      style={overlayStyle}
      onClick={onOverlayClick}
      role="presentation"
      aria-hidden={!open}
    >
      <div
        style={dialogStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
      >
        {/* 닫기(X) 버튼 */}
        <button
          type="button"
          onClick={onClose}
          style={closeBtnStyle}
          aria-label="Close dialog"
          title="Close"
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

        <h2 id="lead-modal-title" style={titleStyle}>Talk to Sales</h2>
        <p style={subtitleStyle}>
          Leave your contact details and we’ll get back to you shortly.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: 실제 제출 로직 연결
            onClose();
          }}
        >
          <div style={formRowStyle}>
            <input style={inputStyle} name="name" placeholder="Your name" required />
            <input style={inputStyle} name="email" placeholder="Email" type="email" required />
            <input style={inputStyle} name="company" placeholder="Company (optional)" />
            <textarea
              style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
              name="message"
              placeholder="Tell us about your needs"
            />
          </div>

          {/* 대비 명확한 CTA 버튼 */}
          <button type="submit" style={ctaStyle}>
            Talk to sales
          </button>

          <div style={helperStyle}>
            We respect your privacy. Your information will only be used to contact you regarding your inquiry.
          </div>
        </form>
      </div>
    </div>
  );
}

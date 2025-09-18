// src/components/LeadModal.tsx
import React from "react";

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LeadModal({ open, onClose }: LeadModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white/90 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* 모달 타이틀 */}
        <h2 id="lead-modal-title" className="text-2xl font-bold">
          상담/견적 문의
        </h2>

        {/* 문의 폼 */}
        <form className="mt-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700">
              이름
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-black focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">
              이메일
            </label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-black focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">
              메시지
            </label>
            <textarea
              rows={4}
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-black focus:ring-black"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-xl px-5 py-3 text-white bg-black hover:opacity-90"
            >
              견적/상담 요청하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

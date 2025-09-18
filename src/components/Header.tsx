// src/components/Header.tsx
import React, { useState } from "react";
import LeadModal from "./LeadModal";

export default function Header() {
  const [openLead, setOpenLead] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* 좌측 로고 */}
          <div className="flex items-center gap-2">
            <img
              src="/assets/apro-logo.svg"
              alt="APRO"
              className="h-8 w-auto"
              onError={(e) => ((e.currentTarget.style.display = "none"))}
            />
            <span className="text-lg font-bold text-neutral-900">APRO</span>
          </div>

          {/* 우측 메뉴 / CTA 버튼 */}
          <div className="flex items-center gap-4">
            <nav className="hidden space-x-6 text-sm font-medium text-neutral-700 md:flex">
              <a href="#models" className="hover:text-black">
                Models
              </a>
              <a href="#specs" className="hover:text-black">
                Specs
              </a>
              <a href="#about" className="hover:text-black">
                About
              </a>
            </nav>

            <button
              onClick={() => setOpenLead(true)}
              className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Talk to Sales
            </button>
          </div>
        </div>
      </header>

      {/* 상담/견적 모달 */}
      <LeadModal open={openLead} onClose={() => setOpenLead(false)} />
    </>
  );
}

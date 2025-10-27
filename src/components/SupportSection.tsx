import React, { useEffect } from "react";
import { openLead } from "./LeadModal";
import { trackEvent } from "../services/analytics";

/**
 * ✳︎ 본 섹션은 사용자 제공 원문(유지관리 시스템 A/S 및 보증, 진단프로그램 및 교육)만
 *    영문 카피로 정리해 노출합니다. 임의 항목(일/주/월/분기 점검 등)은 추가하지 않았습니다.
 */
export default function SupportSection() {
  useEffect(() => {
    trackEvent("support_view");
  }, []);

  const asWarranty = [
    "A/S handled by KUKJE INTERTRADE C/S team; dispatched to relevant A/S teams according to each case.",
    "Free program updates & campaigns for golf carts and SK lithium batteries (executed on-site by respective A/S teams).",
    "Continuous feedback to DY Innovate C/S team to improve programs and address future issues.",
    "Warranty period — Golf cart: 2 years, Lithium battery: 5 years.",
  ];

  const diagnosticsTraining = [
    "Windows 11 laptop tool for fault diagnostics.",
    "Failure history lookup and easy plug-in inspection.",
    "Maintenance guidelines for administrators.",
    "On-site practical training after delivery.",
    "Training materials for caddies; additional on-site practice after delivery.",
  ];

  return (
    <section id="support" className="py-20 bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Support</h2>

        {/* A/S & Warranty */}
        <div className="mt-8 rounded-2xl border border-zinc-200 p-6 bg-white dark:bg-zinc-950 dark:border-zinc-700">
          <h3 className="text-xl font-semibold">Service &amp; Warranty</h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            {asWarranty.map((li, i) => (
              <li key={i} className="pl-4 relative">
                <span className="absolute left-0 top-0">•</span>
                {li}
              </li>
            ))}
          </ul>
        </div>

        {/* Diagnostics & Training */}
        <div className="mt-6 rounded-2xl border border-zinc-200 p-6 bg-white dark:bg-zinc-950 dark:border-zinc-700">
          <h3 className="text-xl font-semibold">Diagnostics &amp; Training</h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            {diagnosticsTraining.map((li, i) => (
              <li key={i} className="pl-4 relative">
                <span className="absolute left-0 top-0">•</span>
                {li}
              </li>
            ))}
          </ul>

          {/* 선택: 사진 슬롯 (이미지 없으면 자동 숨김). 파일을 public/assets/support/ 경로에 두면 됩니다. */}
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <img
              src="/assets/support/diagnostics-laptop.jpg"
              alt="Windows 11 diagnostic laptop in use"
              className="w-full h-48 object-cover rounded-xl"
              loading="lazy"
              onError={(e) => ((e.currentTarget.style.display = "none"))}
            />
            <img
              src="/assets/support/on-site-training.jpg"
              alt="On-site practical training with caddies"
              className="w-full h-48 object-cover rounded-xl"
              loading="lazy"
              onError={(e) => ((e.currentTarget.style.display = "none"))}
            />
          </div>
        </div>

        {/* 기존 CTA 유지 (App 전반과 트래킹 일관) */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => {
              openLead("Support CTA");
              trackEvent("cta_click", { where: "support", label: "Talk to Sales" });
            }}
            className="px-5 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
          >
            Talk to Sales
          </button>

          <a
            href="/brochure.pdf"
            onClick={() => trackEvent("brochure_download", { file: "/brochure.pdf", where: "support" })}
            className="px-5 py-3 rounded-full border border-black/30 dark:border-white/40"
          >
            Download brochure (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}

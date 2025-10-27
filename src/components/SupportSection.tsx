// src/components/SupportSection.tsx
import React, { useEffect, useRef } from "react";
import { openLead } from "./LeadModal";
import { trackEvent } from "../services/analytics";

/**
 * 사용자 제공 원문만 반영:
 * - A/S 및 보증기간
 * - 진단프로그램 및 교육
 * (임의 점검주기 등은 추가하지 않습니다)
 */
export default function SupportSection() {
  useEffect(() => {
    trackEvent("support_view");
  }, []);

  const hoveredRef = useRef<Set<string>>(new Set());

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

  const handleHoverOnce = (id: string) => {
    const seen = hoveredRef.current;
    if (!seen.has(id)) {
      seen.add(id);
      trackEvent("support_block_hover", { id });
    }
  };

  const Card = ({
    id,
    title,
    items,
  }: {
    id: string;
    title: string;
    items: string[];
  }) => (
    <article
      role="button"
      tabIndex={0}
      onMouseEnter={() => handleHoverOnce(id)}
      onFocus={() => handleHoverOnce(id)}
      className="
        group rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950
        p-6 transition-all duration-200
        hover:shadow-lg hover:border-black/20 dark:hover:border-white/30 hover:bg-zinc-50 dark:hover:bg-zinc-900
        focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20
        motion-safe:hover:-translate-y-0.5
      "
    >
      <h3 className="font-semibold text-lg">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
        {items.map((li, i) => (
          <li key={i} className="pl-4 relative">
            <span
              className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400
                         transition-colors group-hover:bg-black dark:group-hover:bg-white"
            />
            <span className="block translate-x-1 group-hover:translate-x-0 transition-transform">
              {li}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );

  return (
    <section id="support" className="py-20 bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Support</h2>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <Card id="as_warranty" title="Service &amp; Warranty" items={asWarranty} />
          <Card id="diagnostics_training" title="Diagnostics &amp; Training" items={diagnosticsTraining} />
        </div>

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
            onClick={() => trackEvent("brochure_download", { file: "/brochure.pdf', where: 'support" })}
            className="px-5 py-3 rounded-full border border-black/30 dark:border-white/40"
          >
            Download brochure (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}

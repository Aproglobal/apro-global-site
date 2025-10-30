// src/components/SupportSection.tsx
import React, { useEffect, useRef } from "react";
import { trackEvent } from "../services/analytics";

export default function SupportSection() {
  useEffect(() => { trackEvent("support_view"); }, []);
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
    if (!seen.has(id)) { seen.add(id); trackEvent("support_block_hover", { id }); }
  };

  const Card = ({ id, title, items }: { id: string; title: string; items: string[]; }) => (
    <article
      role="region"
      aria-labelledby={`${id}-title`}
      tabIndex={0}
      onMouseEnter={() => handleHoverOnce(id)}
      onFocus={() => handleHoverOnce(id)}
      className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/90 p-5 md:p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-black/15 dark:hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
    >
      <h3 id={`${id}-title`} className="text-lg font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
        {items.map((li, i) => (
          <li key={i} className="pl-4 relative">
            <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400 transition-colors group-hover:bg-black dark:group-hover:bg-white" />
            <span className="block">{li}</span>
          </li>
        ))}
      </ul>
    </article>
  );

  return (
    <section id="support" className="py-20 bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Support</h2>

        <div className="mt-6 space-y-3 md:hidden">
          {[
            { id: "as_warranty", title: "Service & Warranty", items: asWarranty },
            { id: "diagnostics_training", title: "Diagnostics & Training", items: diagnosticsTraining },
          ].map((block) => (
            <details
              key={block.id}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/90"
              onToggle={(e) => { if ((e.target as HTMLDetailsElement).open) handleHoverOnce(block.id); }}
            >
              <summary className="cursor-pointer list-none p-4 font-semibold flex items-center justify-between">
                {block.title}
                <span>▾</span>
              </summary>
              <div className="p-4 pt-0">
                <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {block.items.map((li, i) => (
                    <li key={i} className="pl-4 relative">
                      <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                      <span className="block">{li}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-2 gap-6 mt-6">
          <Card id="as_warranty" title="Service &amp; Warranty" items={asWarranty} />
          <Card id="diagnostics_training" title="Diagnostics &amp; Training" items={diagnosticsTraining} />
        </div>
      </div>
    </section>
  );
}

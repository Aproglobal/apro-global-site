// src/components/ProductionTimeline.tsx
import React, { useMemo } from "react";
import Carousel from "./ui/Carousel";
import type { Step } from "../data/timeline";

type Props = {
  steps: Step[];
  title?: string;
  note?: string;
  progressDay?: number; // kept for API compatibility
  showSummary?: boolean; // kept for API compatibility
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function TimelineCard({ s }: { s: Step }) {
  return (
    <article
      className="
        rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-950 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]
      "
    >
      {/* Big visual first (only two images in your case; others will just show a subtle placeholder) */}
      <div className="relative aspect-[4/3] md:aspect-[16/9] bg-zinc-100 dark:bg-zinc-900">
        {s.img ? (
          <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-sm">
            No image provided
          </div>
        )}
        <div className="absolute left-3 top-3 rounded-full bg-black/75 text-white text-[11px] px-2 py-1">
          Day {pad2(s.day)}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold">{s.title}</h3>
        {s.vendor ? (
          <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Vendor: {s.vendor}</p>
        ) : null}
        {s.note ? <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{s.note}</p> : null}
      </div>
    </article>
  );
}

export default function ProductionTimeline({
  steps,
  title = "Production & Delivery Timeline",
  note = "Note: Domestic delivery flow. Export process may differ.",
}: Props) {
  const items = useMemo(() => steps, [steps]);

  return (
    <section id="timeline" className="py-2">
      <div className="mb-5">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{title}</h2>
        {note ? <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{note}</p> : null}
      </div>

      <Carousel
        ariaLabel="Production & Delivery"
        items={items.map((s) => (
          <TimelineCard key={s.day} s={s} />
        ))}
        itemClassName="w-[88vw] sm:w-[520px] md:w-[760px] lg:w-[980px]"
        showCount
      />
    </section>
  );
}

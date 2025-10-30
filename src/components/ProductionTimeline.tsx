// src/components/ProductionTimeline.tsx
import React from "react";
import type { Step } from "../data/timeline";

type Props = {
  steps: Step[];
  title?: string;
  note?: string;
  progressDay?: number;
  showSummary?: boolean;
};

function statusOf(day: number, progressDay?: number): "neutral" | "done" | "current" | "upcoming" {
  if (!progressDay) return "neutral";
  if (day < progressDay) return "done";
  if (day === progressDay) return "current";
  return "upcoming";
}

function pad2(n: number) { return String(n).padStart(2, "0"); }

function SquareImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mt-3 w-full max-w-[320px] mx-auto aspect-square overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
      <img src={src} alt={alt} width={300} height={300} loading="lazy" draggable={false} className="w-full h-full object-cover" />
    </div>
  );
}

export default function ProductionTimeline({
  steps,
  title = "Production & Delivery Timeline",
  note = "Note: Domestic delivery flow. Export process may differ.",
  progressDay,
  showSummary = true,
}: Props) {
  return (
    <section id="timeline" className="py-20 bg-white text-black dark:bg-black dark:text-white scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
        {note ? <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{note}</p> : null}

        {showSummary && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950/90">
              <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Typical Lead Time</div>
              <div className="mt-1 text-sm font-semibold">~30 days</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950/90">
              <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Contract Phase</div>
              <div className="mt-1 text-sm">Quotation → PO → Contract (Days 1–3)</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950/90">
              <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Production & Prep</div>
              <div className="mt-1 text-sm">Orders & Artwork (Days 4–21)</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950/90">
              <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Delivery</div>
              <div className="mt-1 text-sm">Factory Release → On-site Install (Days 29–30)</div>
            </div>
          </div>
        )}

        <ol className="mt-8 space-y-4 md:hidden">
          {steps.map((s) => {
            const st = statusOf(s.day, progressDay);
            const borderClass = st === "current" ? "border-black dark:border-white" : st === "done" ? "border-emerald-500 dark:border-emerald-400" : "border-zinc-200 dark:border-zinc-800";
            return (
              <li key={s.day} className={`rounded-2xl border p-4 bg-white dark:bg-zinc-950 ${borderClass}`}>
                {s.img ? <SquareImage src={s.img} alt={s.title} /> : null}
                <div className="mt-3 flex items-center gap-3">
                  <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-medium border min-w-[78px] text-center tracking-wide ${
                    st === "current" ? "border-black dark:border-white" : st === "done" ? "border-emerald-500 dark:border-emerald-400" : "border-zinc-300 dark:border-zinc-700"
                  }`}>Day {pad2(s.day)}</span>
                  <h3 className="text-sm font-semibold">{s.title}</h3>
                </div>
                {s.vendor ? <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">Vendor: {s.vendor}</p> : null}
                {s.note ? <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">{s.note}</p> : null}
              </li>
            );
          })}
        </ol>

        <div className="mt-10 hidden md:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-zinc-200 dark:bg-zinc-800 z-0" />
            <div className="relative z-10 grid grid-cols-4 gap-6">
              {steps.map((s, i) => {
                const st = statusOf(s.day, progressDay);
                const cardBorder = st === "current" ? "border-black dark:border-white shadow-xl" : st === "done" ? "border-emerald-500/60 dark:border-emerald-400/60" : "border-zinc-200 dark:border-zinc-800";
                return (
                  <div key={s.day} className={`relative ${i % 2 === 0 ? "mb-12" : "mt-12"}`}>
                    <div className={`rounded-2xl border p-5 bg-white dark:bg-zinc-950 transition-shadow ${cardBorder}`}>
                      {s.img ? <SquareImage src={s.img} alt={s.title} /> : null}
                      <div className="mt-3 flex items-center gap-3">
                        <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-medium border min-w-[78px] text-center tracking-wide ${
                          st === "current" ? "border-black dark:border-white" : st === "done" ? "border-emerald-500 dark:border-emerald-400" : "border-zinc-300 dark:border-zinc-700"
                        }`}>Day {pad2(s.day)}</span>
                        <h3 className="text-sm font-semibold">{s.title}</h3>
                      </div>
                      {s.vendor ? <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">Vendor: {s.vendor}</p> : null}
                      {s.note ? <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">{s.note}</p> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

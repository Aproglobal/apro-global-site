// src/components/ProductionTimeline.tsx
import React from "react";
import type { Step } from "../data/timeline";

type Props = {
  steps: Step[];
  title?: string;
  note?: string;
  /** Highlight by day number (1..N). Omit to disable emphasis. */
  progressDay?: number;
  /** Show top summary boxes (lead time, phases) */
  showSummary?: boolean;
};

function statusOf(day: number, progressDay?: number): "neutral" | "done" | "current" | "upcoming" {
  if (!progressDay) return "neutral";
  if (day < progressDay) return "done";
  if (day === progressDay) return "current";
  return "upcoming";
}

export default function ProductionTimeline({
  steps,
  title = "Production & Delivery Timeline",
  note = "Note: Domestic delivery flow. Export process may differ.",
  progressDay,
  showSummary = true,
}: Props) {
  return (
    <section id="timeline" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
        {note ? <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{note}</p> : null}

        {/* Overview summary (global 고객용 요약) */}
        {showSummary && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950/90">
              <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Typical Lead Time
              </div>
              <div className="mt-1 text-sm font-semibold">~30 days</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950/90">
              <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Contract Phase
              </div>
              <div className="mt-1 text-sm">Quotation → PO → Contract (Days 1–3)</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950/90">
              <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Production & Prep
              </div>
              <div className="mt-1 text-sm">Orders & Artwork (Days 4–21)</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950/90">
              <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Delivery
              </div>
              <div className="mt-1 text-sm">Factory Release → On-site Install (Days 29–30)</div>
            </div>
          </div>
        )}

        {/* Mobile: vertical list */}
        <ol className="mt-8 space-y-4 md:hidden">
          {steps.map((s) => {
            const st = statusOf(s.day, progressDay);
            const borderClass =
              st === "current"
                ? "border-black dark:border-white"
                : st === "done"
                ? "border-emerald-500 dark:border-emerald-400"
                : "border-zinc-200 dark:border-zinc-800";
            return (
              <li
                key={s.day}
                className={`rounded-2xl border p-4 bg-white dark:bg-zinc-950 ${borderClass}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium border ${
                      st === "current"
                        ? "border-black dark:border-white"
                        : st === "done"
                        ? "border-emerald-500 dark:border-emerald-400"
                        : "border-zinc-300 dark:border-zinc-700"
                    }`}
                  >
                    Day {s.day}
                  </span>
                  <h3 className="text-sm font-semibold">{s.title}</h3>
                </div>
                {s.note ? (
                  <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">{s.note}</p>
                ) : null}
              </li>
            );
          })}
        </ol>

        {/* Desktop: centered axis with alternating cards */}
        <div className="mt-10 hidden md:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-zinc-200 dark:bg-zinc-800" />
            <div className="grid grid-cols-4 gap-6">
              {steps.map((s, i) => {
                const st = statusOf(s.day, progressDay);
                const dotClass =
                  st === "current"
                    ? "bg-black dark:bg-white ring-4 ring-black/5 dark:ring-white/10"
                    : st === "done"
                    ? "bg-emerald-500 dark:bg-emerald-400 ring-4 ring-emerald-500/15 dark:ring-emerald-400/15"
                    : "bg-zinc-600 dark:bg-zinc-400 ring-4 ring-white dark:ring-black";
                const cardBorder =
                  st === "current"
                    ? "border-black dark:border-white shadow-xl"
                    : st === "done"
                    ? "border-emerald-500/60 dark:border-emerald-400/60"
                    : "border-zinc-200 dark:border-zinc-800";

                return (
                  <div key={s.day} className="relative">
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${dotClass}`}
                    />
                    <div
                      className={`rounded-2xl border p-5 bg-white dark:bg-zinc-950 transition-shadow ${
                        i % 2 === 0 ? "mb-12" : "mt-12"
                      } ${cardBorder}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium border ${
                            st === "current"
                              ? "border-black dark:border-white"
                              : st === "done"
                              ? "border-emerald-500 dark:border-emerald-400"
                              : "border-zinc-300 dark:border-zinc-700"
                          }`}
                        >
                          Day {s.day}
                        </span>
                        <h3 className="text-sm font-semibold">{s.title}</h3>
                      </div>
                      {s.note ? (
                        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">{s.note}</p>
                      ) : null}
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

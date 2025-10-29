// src/components/ProductionTimeline.tsx
import React from "react";
import type { Step } from "../data/timeline";

type Props = {
  steps: Step[];
  /** Optional page title */
  title?: string;
  /** Optional note under the title */
  note?: string;
  /** Highlight the current phase by index (0-based). Omit if not needed. */
  currentIndex?: number;
};

export default function ProductionTimeline({
  steps,
  title = "Production & Delivery Timeline",
  note = "Note: Domestic delivery flow. Export process may differ.",
  currentIndex,
}: Props) {
  return (
    <section
      id="timeline"
      className="py-20 bg-white text-black dark:bg-black dark:text-white"
    >
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          {title}
        </h2>
        {note ? (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{note}</p>
        ) : null}

        {/* Mobile: vertical card list */}
        <ol className="mt-8 space-y-4 md:hidden">
          {steps.map((s, i) => {
            const active = i === currentIndex;
            return (
              <li
                key={s.day}
                className={[
                  "rounded-2xl border p-4",
                  "bg-white dark:bg-zinc-950",
                  active
                    ? "border-black dark:border-white shadow-lg"
                    : "border-zinc-200 dark:border-zinc-800",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={[
                      "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium",
                      active
                        ? "border border-black dark:border-white"
                        : "border border-zinc-300 dark:border-zinc-700",
                    ].join(" ")}
                  >
                    Day {s.day}
                  </span>
                  <h3
                    className={[
                      "text-sm font-semibold",
                      active ? "" : "",
                    ].join(" ")}
                  >
                    {s.title}
                  </h3>
                </div>
                {s.note ? (
                  <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                    {s.note}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>

        {/* Desktop: horizontal alternating cards with center axis */}
        <div className="mt-10 hidden md:block">
          <div className="relative">
            {/* Center axis */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-zinc-200 dark:bg-zinc-800" />
            <div className="grid grid-cols-4 gap-6">
              {steps.map((s, i) => {
                const active = i === currentIndex;
                return (
                  <div key={s.day} className="relative">
                    {/* Axis node */}
                    <div
                      className={[
                        "absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full",
                        active
                          ? "bg-black dark:bg-white ring-4 ring-black/5 dark:ring-white/10"
                          : "bg-zinc-600 dark:bg-zinc-400 ring-4 ring-white dark:ring-black",
                      ].join(" ")}
                    />
                    {/* Card */}
                    <div
                      className={[
                        "rounded-2xl border p-5 bg-white dark:bg-zinc-950 transition-shadow",
                        i % 2 === 0 ? "mb-12" : "mt-12",
                        active
                          ? "border-black dark:border-white shadow-xl"
                          : "border-zinc-200 dark:border-zinc-800",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={[
                            "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium",
                            active
                              ? "border border-black dark:border-white"
                              : "border border-zinc-300 dark:border-zinc-700",
                          ].join(" ")}
                        >
                          Day {s.day}
                        </span>
                        <h3 className="text-sm font-semibold">{s.title}</h3>
                      </div>
                      {s.note ? (
                        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                          {s.note}
                        </p>
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

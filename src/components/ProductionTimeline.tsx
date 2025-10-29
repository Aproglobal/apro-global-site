// src/components/ProductionTimeline.tsx
import React, { useEffect, useMemo } from "react";
import type { Step } from "../data/timeline";
import { trackEvent } from "../services/analytics";

type Props = {
  steps: Step[];
  /** If provided, marks progress up to this index (0-based). */
  currentIndex?: number;
  /** Alternative: mark progress by matching a Day number. Ignored when currentIndex is set. */
  currentDay?: number;
  className?: string;
};

export default function ProductionTimeline({
  steps,
  currentIndex,
  currentDay,
  className,
}: Props) {
  const activeIndex = useMemo(() => {
    if (typeof currentIndex === "number") return clamp(currentIndex, 0, steps.length - 1);
    if (typeof currentDay === "number") {
      const idx = steps.findIndex((s) => s.day === currentDay);
      return idx >= 0 ? idx : undefined;
    }
    return undefined;
  }, [steps, currentIndex, currentDay]);

  useEffect(() => {
    try {
      trackEvent("timeline_view", { steps: steps.length, activeIndex: activeIndex ?? -1 });
    } catch {}
  }, [steps.length, activeIndex]);

  return (
    <section
      id="timeline"
      className={["py-20 bg-white text-black dark:bg-black dark:text-white", className || ""].join(" ")}
      aria-label="Production timeline (domestic fulfillment)"
    >
      <div className="max-w-6xl mx-auto px-5">
        <header className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Production Timeline</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Typical domestic fulfillment flow. <span className="italic">Export timelines may vary by country and incoterms.</span>
          </p>

          {/* Legend */}
          <div className="mt-2 flex items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400">
            <LegendDot className="bg-emerald-500" label="Completed" />
            <LegendDot className="bg-black dark:bg-white" label="Current" />
            <LegendDot className="bg-zinc-300 dark:bg-zinc-700" label="Upcoming" />
          </div>
        </header>

        {/* Horizontal rail */}
        <div className="mt-8 overflow-x-auto [-webkit-overflow-scrolling:touch]">
          <ol className="min-w-[720px] grid auto-cols-[minmax(260px,1fr)] grid-flow-col gap-4">
            {steps.map((step, i) => {
              const state = stateOf(i, activeIndex);
              return (
                <li key={`${step.day}-${step.title}`}>
                  <TimelineCard step={step} index={i} state={state} />
                </li>
              );
            })}
          </ol>
        </div>

        {/* Progress bar under the rail */}
        <ProgressBar count={steps.length} activeIndex={activeIndex} />
      </div>
    </section>
  );
}

/* ---------------- UI parts ---------------- */

type State = "complete" | "current" | "upcoming" | "neutral";

function stateOf(i: number, activeIndex?: number): State {
  if (typeof activeIndex !== "number") return "neutral";
  if (i < activeIndex) return "complete";
  if (i === activeIndex) return "current";
  return "upcoming";
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={["inline-block h-2.5 w-2.5 rounded-full", className].join(" ")} />
      {label}
    </span>
  );
}

function ProgressBar({ count, activeIndex }: { count: number; activeIndex?: number }) {
  // width of completed segment
  const ratio =
    typeof activeIndex === "number" && count > 1 ? (activeIndex / (count - 1)) : 0;
  return (
    <div className="mt-6 h-1 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
      <div
        className="h-1 rounded-full bg-emerald-500 transition-all duration-500"
        style={{ width: `${Math.max(0, Math.min(1, ratio)) * 100}%` }}
        aria-hidden
      />
    </div>
  );
}

function TimelineCard({
  step,
  index,
  state,
}: {
  step: Step;
  index: number;
  state: State;
}) {
  // visuals based on state
  const dotClass =
    state === "complete"
      ? "bg-emerald-500"
      : state === "current"
      ? "bg-black dark:bg-white ring-2 ring-black/20 dark:ring-white/30"
      : state === "upcoming"
      ? "bg-zinc-300 dark:bg-zinc-700"
      : "bg-zinc-300 dark:bg-zinc-700";

  const borderClass =
    state === "current"
      ? "border-black/40 dark:border-white/50"
      : state === "complete"
      ? "border-emerald-500/40"
      : "border-zinc-200 dark:border-zinc-800";

  const onClick = () => {
    try {
      trackEvent("timeline_step_click", {
        index,
        day: step.day,
        title: step.title,
      });
    } catch {}
  };

  return (
    <article
      className={[
        "h-full rounded-2xl border p-4 bg-white dark:bg-zinc-950 transition-shadow duration-200",
        "hover:shadow-lg",
        borderClass,
      ].join(" ")}
      role="group"
      aria-label={`Day ${step.day}: ${step.title}`}
    >
      {/* Top: square media (300x300 if available), never up-scale */}
      <div className="w-full max-w-[320px] mx-auto">
        <div className="relative mx-auto w-[300px] max-w-full">
          <div className="aspect-square w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
            {step.img ? (
              <img
                src={step.img}
                alt={step.title}
                width={300}
                height={300}
                loading="lazy"
                className="block w-[300px] h-[300px] max-w-full object-contain"
              />
            ) : (
              <span className="text-xs text-zinc-500">No image</span>
            )}
          </div>

          {/* State dot in corner */}
          <span
            className={[
              "absolute -top-2 -right-2 h-4 w-4 rounded-full",
              dotClass,
            ].join(" ")}
            aria-hidden
          />
        </div>
      </div>

      {/* Body */}
      <div className="mt-4">
        <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Day {step.day}
        </div>
        <h3 className="mt-1 text-sm font-semibold">{step.title}</h3>
        {step.desc ? (
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{step.desc}</p>
        ) : null}
        {step.vendor ? (
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Vendor: {step.vendor}</p>
        ) : null}
      </div>

      {/* Action (semantic but quiet) */}
      <div className="mt-3">
        <button
          type="button"
          onClick={onClick}
          className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900"
          aria-label={`Mark or read more about Day ${step.day}`}
        >
          Details
          <span aria-hidden>↗</span>
        </button>
      </div>
    </article>
  );
}

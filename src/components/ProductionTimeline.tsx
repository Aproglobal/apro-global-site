import React, { useMemo } from "react";
import type { Step } from "../data/timeline";
import HorizontalRail from "./HorizontalRail";

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

export default function ProductionTimeline({
  steps,
  title = "Production & Delivery Timeline",
  note = "Note: Domestic delivery flow. Export process may differ.",
  progressDay,
  showSummary = true,
}: Props) {

  const summary = useMemo(
    () => [
      { label: "Typical Lead Time", val: "~30 days" },
      { label: "Contract Phase", val: "Quotation → PO → Contract (Days 1–3)" },
      { label: "Production & Prep", val: "Orders & Artwork (Days 4–21)" },
      { label: "Delivery", val: "Factory Release → On-site Install (Days 29–30)" },
    ],
    []
  );

  return (
    <div className="relative">
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{title}</h3>
        {note ? <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{note}</p> : null}
      </div>

      {showSummary && (
        <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-3">
          {summary.map((b, i) => (
            <div key={i} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950/90">
              <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{b.label}</div>
              <div className="mt-1 text-sm font-semibold">{b.val}</div>
            </div>
          ))}
        </div>
      )}

      <HorizontalRail ariaLabel="Production timeline">
        {steps.map((s) => {
          const st = statusOf(s.day, progressDay);
          const border =
            st === "current"
              ? "border-black dark:border-white shadow-xl"
              : st === "done"
              ? "border-emerald-500/70 dark:border-emerald-400/70"
              : "border-zinc-200 dark:border-zinc-800";
          return (
            <article
              key={s.day}
              className={`snap-start shrink-0 w-[280px] md:w-[360px] rounded-2xl border ${border} bg-white dark:bg-zinc-950 p-4 md:p-5`}
            >
              {s.img ? (
                <div className="w-full aspect-square overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-900">
                  <img
                    src={s.img}
                    alt={s.title}
                    width={600}
                    height={600}
                    loading="lazy"
                    draggable={false}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}

              <div className="mt-3 flex items-center gap-3">
                <span
                  className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-medium border min-w-[78px] text-center tracking-wide
                    ${st === "current" ? "border-black dark:border-white"
                      : st === "done" ? "border-emerald-500 dark:border-emerald-400"
                      : "border-zinc-300 dark:border-zinc-700"}`}
                >
                  Day {pad2(s.day)}
                </span>
                <h4 className="text-sm font-semibold">{s.title}</h4>
              </div>

              {s.vendor ? <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">Vendor: {s.vendor}</p> : null}
              {s.note ? <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">{s.note}</p> : null}
            </article>
          );
        })}
      </HorizontalRail>
    </div>
  );
}

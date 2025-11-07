import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Step } from "../data/timeline";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  steps: Step[];
  title?: string;
  note?: string;
  /** Highlight by day number (1..N). Omit to disable emphasis. */
  progressDay?: number;
  /** Show small summary strip */
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
  const railRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const onScroll = () => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  };

  useEffect(() => {
    onScroll();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollBy = (dir: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;
    const delta = Math.round(el.clientWidth * 0.9) * dir;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

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
            <div
              key={i}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950/90"
            >
              <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{b.label}</div>
              <div className="mt-1 text-sm font-semibold">{b.val}</div>
            </div>
          ))}
        </div>
      )}

      {/* Rail */}
      <div className="relative">
        {/* edge fades */}
        {!atStart && (
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent rounded-l-2xl" />
        )}
        {!atEnd && (
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent rounded-r-2xl" />
        )}

        {/* arrow buttons */}
        <button
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          aria-label="Scroll left"
          className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full border
            ${atStart ? "opacity-40 cursor-not-allowed" : "bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-900"}
            border-zinc-200 dark:border-zinc-700 shadow`}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          aria-label="Scroll right"
          className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full border
            ${atEnd ? "opacity-40 cursor-not-allowed" : "bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-900"}
            border-zinc-200 dark:border-zinc-700 shadow`}
        >
          <ChevronRight size={18} />
        </button>

        <div
          ref={railRef}
          className="rail scrollbar-none overflow-x-auto snap-x snap-mandatory flex gap-4 py-2"
        >
          {steps.map((s, i) => {
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
                className={`snap-start shrink-0 w-[280px] md:w-[360px] rounded-2xl border ${border}
                  bg-white dark:bg-zinc-950 p-4 md:p-5`}
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
                      ${st === "current"
                        ? "border-black dark:border-white"
                        : st === "done"
                        ? "border-emerald-500 dark:border-emerald-400"
                        : "border-zinc-300 dark:border-zinc-700"}`}
                  >
                    Day {pad2(s.day)}
                  </span>
                  <h4 className="text-sm font-semibold">{s.title}</h4>
                </div>

                {s.vendor ? (
                  <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">Vendor: {s.vendor}</p>
                ) : null}
                {s.note ? (
                  <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">{s.note}</p>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Step } from "../data/timeline";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  steps: Step[];
  title?: string;
  note?: string;
  /** Highlight by day number (1..N). Omit to disable emphasis. */
  progressDay?: number;
  /** Show top summary boxes (lead time, phases). Defaults to true when steps > 2 */
  showSummary?: boolean;
};

function statusOf(day: number, progressDay?: number): "neutral" | "done" | "current" | "upcoming" {
  if (!progressDay) return "neutral";
  if (day < progressDay) return "done";
  if (day === progressDay) return "current";
  return "upcoming";
}

const pad2 = (n: number) => String(n).padStart(2, "0");

function SquareImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mt-3 w-full aspect-square overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
      <img
        src={src}
        alt={alt}
        width={600}
        height={600}
        loading="lazy"
        draggable={false}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function ProductionTimeline({
  steps,
  title = "Production & Delivery Timeline",
  note = "Note: Domestic delivery flow. Export process may differ.",
  progressDay,
  showSummary,
}: Props) {
  const shouldShowSummary = showSummary ?? steps.length > 2;

  // --- Horizontal rail controls ---
  const railRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const checkScroll = () => {
    const el = railRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 0);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = railRef.current;
    if (!el) return;
    const onScroll = () => checkScroll();
    const ro = new ResizeObserver(() => checkScroll());
    el.addEventListener("scroll", onScroll, { passive: true });
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  const scrollByViewport = (dir: "prev" | "next") => {
    const el = railRef.current;
    if (!el) return;
    const delta = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === "next" ? delta : -delta, behavior: "smooth" });
  };

  // group summary boxes (static text kept so ALL info is visible)
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
    <section id="timeline" className="py-20 bg-white text-black dark:bg-black dark:text-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
        {note ? <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{note}</p> : null}

        {/* Summary info (always visible if shouldShowSummary) */}
        {shouldShowSummary && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
            {summary.map((b, i) => (
              <div
                key={i}
                className="
                  rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 
                  bg-white dark:bg-zinc-950/90
                  transition-all duration-200
                  hover:shadow-md hover:-translate-y-0.5 hover:border-black/15 dark:hover:border-white/20
                  motion-reduce:transition-none motion-reduce:hover:translate-y-0
                "
              >
                <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{b.label}</div>
                <div className="mt-1 text-sm font-semibold">{b.val}</div>
              </div>
            ))}
          </div>
        )}

        {/* Horizontal rail (no toggles; every card shows full info) */}
        <div className="relative mt-8">
          {/* Edge fades for premium feel */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white dark:from-black to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white dark:from-black to-transparent z-10" />

          {/* Controls */}
          <div className="absolute -top-14 right-0 flex items-center gap-2">
            <button
              type="button"
              aria-label="Scroll previous"
              onClick={() => scrollByViewport("prev")}
              disabled={!canPrev}
              className={`h-9 w-9 rounded-full border transition ${
                canPrev
                  ? "bg-white/80 dark:bg-zinc-900/80 border-zinc-300 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-900"
                  : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 opacity-50 cursor-not-allowed"
              }`}
            >
              <ArrowLeft className="mx-auto" size={18} />
            </button>
            <button
              type="button"
              aria-label="Scroll next"
              onClick={() => scrollByViewport("next")}
              disabled={!canNext}
              className={`h-9 w-9 rounded-full border transition ${
                canNext
                  ? "bg-white/80 dark:bg-zinc-900/80 border-zinc-300 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-900"
                  : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 opacity-50 cursor-not-allowed"
              }`}
            >
              <ArrowRight className="mx-auto" size={18} />
            </button>
          </div>

          {/* Rail */}
          <div
            ref={railRef}
            tabIndex={0}
            className="
              rail
              relative z-0
              mt-2 -mx-5 px-5
              flex gap-5 overflow-x-auto scrollbar-none
              snap-x snap-mandatory
              touch-pan-x
            "
          >
            {steps.map((s) => {
              const st = statusOf(s.day, progressDay);
              const cardBorder =
                st === "current"
                  ? "border-black dark:border-white shadow-xl"
                  : st === "done"
                  ? "border-emerald-500/60 dark:border-emerald-400/60"
                  : "border-zinc-200 dark:border-zinc-800";

              return (
                <article
                  key={s.day}
                  className={`
                    rail-card snap-start
                    min-w-[280px] sm:min-w-[340px] md:min-w-[420px] lg:min-w-[460px]
                    rounded-2xl border ${cardBorder} p-5
                    bg-white dark:bg-zinc-950
                    transition-transform duration-300 hover:-translate-y-1
                    focus-within:-translate-y-1
                  `}
                >
                  {/* Image if provided (only for Factory Release & On-site Delivery in your data) */}
                  {s.img ? <SquareImage src={s.img} alt={s.title} /> : null}

                  <div className="mt-3 flex items-center gap-3">
                    <span
                      className={`
                        inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-medium border min-w-[78px] text-center tracking-wide
                        ${st === "current"
                          ? "border-black dark:border-white"
                          : st === "done"
                          ? "border-emerald-500 dark:border-emerald-400"
                          : "border-zinc-300 dark:border-zinc-700"}
                      `}
                    >
                      Day {pad2(s.day)}
                    </span>
                    <h3 className="text-sm font-semibold">{s.title}</h3>
                  </div>

                  {s.vendor ? (
                    <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                      Vendor: {s.vendor}
                    </p>
                  ) : null}

                  {/* Details are ALWAYS visible (no toggles) */}
                  {s.note ? (
                    <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {s.note}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// src/components/ProductionTimeline.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Step } from "../data/timeline";
import { trackEvent } from "../services/analytics";

type Props = {
  steps: Step[];
  title?: string;
  note?: string;
  /** Highlight by day number (1..N). Omit to disable emphasis color. */
  progressDay?: number;
  /** Show top summary boxes (lead time, phases). */
  showSummary?: boolean;
  /** Show Day chip nav for quick jump. */
  showNav?: boolean;
};

type Status = "neutral" | "done" | "current" | "upcoming";

function statusOf(day: number, progressDay?: number): Status {
  if (!progressDay) return "neutral";
  if (day < progressDay) return "done";
  if (day === progressDay) return "current";
  return "upcoming";
}

export default function ProductionTimeline({
  steps,
  title = "Production & Delivery Timeline",
  note = "Note: Domestic delivery flow. Export process may differ by country and Incoterms.",
  progressDay,
  showSummary = true,
  showNav = true,
}: Props) {
  // 현재 화면에서 ‘가장 중심에 가까운’ 스텝을 가볍게 하이라이트 (네비 전용)
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  // GA: 섹션 노출
  useEffect(() => {
    try {
      trackEvent("timeline_impression", { steps: steps.length });
    } catch {}
  }, [steps.length]);

  // 스크롤 감지 (네비 하이라이트용)
  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!("IntersectionObserver" in window) || els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // 화면 중앙과 가장 가까운 섹션을 active 로
        let bestIdx = activeIdx;
        let bestScore = -Infinity;
        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset["idx"] || -1);
          const rect = (e.target as HTMLElement).getBoundingClientRect();
          const center = window.innerHeight / 2;
          const dist = Math.abs(rect.top + rect.height / 2 - center);
          const score = (e.intersectionRatio || 0) - dist / 100000;
          if (score > bestScore) {
            bestScore = score;
            bestIdx = idx;
          }
          // 개별 스텝 뷰 GA
          if (e.isIntersecting && (e.intersectionRatio || 0) > 0.5) {
            try {
              const s = steps[idx];
              if (s) trackEvent("timeline_step_view", { day: s.day, title: s.title, idx });
            } catch {}
          }
        });
        if (bestIdx !== activeIdx) setActiveIdx(bestIdx);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-15% 0px -15% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length]);

  const onJump = (to: number) => {
    const el = sectionRefs.current[to];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    try {
      const s = steps[to];
      trackEvent("timeline_jump", { toIndex: to, day: s?.day, title: s?.title });
    } catch {}
  };

  const lastDay = useMemo(() => steps[steps.length - 1]?.day ?? 0, [steps]);

  return (
    <section id="timeline" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
        {note ? <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{note}</p> : null}

        {/* Overview summary (global audience quick read) */}
        {showSummary && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
            <SummaryCard k="Typical Lead Time" v="~30 days" />
            <SummaryCard k="Contract Phase" v="Quotation → PO → Contract (Days 1–3)" />
            <SummaryCard k="Production & Prep" v="Orders & Artwork (Days 4–21)" />
            <SummaryCard k="Delivery" v="Factory Release → On-site Install (Days 29–30)" />
          </div>
        )}

        {/* Chip nav (모바일/데스크톱 공통, 가로 스크롤) */}
        {showNav && (
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]" aria-label="Jump to day">
            {steps.map((s, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={`chip-${s.day}`}
                  onClick={() => onJump(i)}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "shrink-0 px-3 py-1.5 rounded-full border text-xs transition",
                    isActive
                      ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                      : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900",
                  ].join(" ")}
                >
                  Day {s.day}
                </button>
              );
            })}
          </div>
        )}

        {/* Mobile: simple vertical cards */}
        <ol className="mt-8 space-y-4 md:hidden">
          {steps.map((s, i) => {
            const st = statusOf(s.day, progressDay);
            const borderClass =
              st === "current"
                ? "border-black dark:border-white"
                : st === "done"
                ? "border-emerald-500/70 dark:border-emerald-400/70"
                : "border-zinc-200 dark:border-zinc-800";

            return (
              <li key={`m-${s.day}`} className={`rounded-2xl border p-4 bg-white dark:bg-zinc-950 ${borderClass}`}>
                <HeaderLine s={s} status={st} />
                <Body s={s} />
              </li>
            );
          })}
        </ol>

        {/* Desktop: centered axis with alternating cards */}
        <div className="mt-10 hidden md:block">
          <div className="relative">
            {/* axis */}
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
                  <div key={`d-${s.day}`} className="relative">
                    {/* axis dot */}
                    <span
                      className={[
                        "absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full",
                        dotClass,
                        i === activeIdx ? "scale-110" : "opacity-90",
                      ].join(" ")}
                      aria-hidden
                    />
                    {/* card */}
                    <div
                      ref={(el) => (sectionRefs.current[i] = el)}
                      data-idx={i}
                      id={`step-day-${s.day}`}
                      className={[
                        "rounded-2xl border p-5 bg-white dark:bg-zinc-950 transition-shadow",
                        i % 2 === 0 ? "mb-12" : "mt-12",
                        cardBorder,
                        i === activeIdx ? "ring-1 ring-black/10 dark:ring-white/10" : "",
                      ].join(" ")}
                      role="group"
                      aria-label={`Day ${s.day} of ${lastDay}`}
                    >
                      <HeaderLine s={s} status={st} />
                      <Body s={s} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tiny legend */}
        <p className="mt-8 text-[11px] text-zinc-500 dark:text-zinc-400">
          Status legend — <span className="text-emerald-600 dark:text-emerald-400">Done</span>{" "}
          / <span className="text-black dark:text-white">Current</span> / Upcoming. Emphasis follows{" "}
          <code>progressDay</code>; omit it for neutral styling.
        </p>
      </div>
    </section>
  );
}

/* ---------- Subcomponents ---------- */

function SummaryCard({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950/90">
      <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{k}</div>
      <div className="mt-1 text-sm font-semibold">{v}</div>
    </div>
  );
}

function HeaderLine({ s, status }: { s: Step; status: Status }) {
  const badge =
    status === "current"
      ? "border-black dark:border-white"
      : status === "done"
      ? "border-emerald-500 dark:border-emerald-400"
      : "border-zinc-300 dark:border-zinc-700";
  return (
    <div className="flex items-center gap-3">
      <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium border ${badge}`}>
        Day {s.day}
      </span>
      <h3 className="text-sm font-semibold">{s.title}</h3>
      {s.vendor ? (
        <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">Vendor: {s.vendor}</span>
      ) : null}
    </div>
  );
}

function Body({ s }: { s: Step }) {
  return (
    <div className="mt-3 grid md:grid-cols-12 gap-4">
      {/* Media (optional 300×300) */}
      <div className="md:col-span-5">
        <div className="aspect-square w-full max-w-[320px] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
          {s.img ? (
            <img
              src={s.img}
              alt={s.title}
              width={300}
              height={300}
              loading="lazy"
              className="block w-[300px] h-[300px] max-w-full object-contain"
            />
          ) : (
            <span className="text-xs text-zinc-500">No image</span>
          )}
        </div>
      </div>
      {/* Copy */}
      <div className="md:col-span-7">
        {s.note ? <p className="text-sm md:text-[15px] text-zinc-700 dark:text-zinc-300">{s.note}</p> : null}
      </div>
    </div>
  );
}

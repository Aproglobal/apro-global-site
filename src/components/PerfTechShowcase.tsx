import React, { useEffect, useMemo, useState } from "react";
import { TECH_FEATURES, type TechItem } from "../data/tech_features";
import { getTechCopy } from "../data/technology";
import { trackEvent } from "../services/analytics";

/**
 * Unified Performance + Technology showcase
 * - Single row (no horizontal scroll). One feature/system shown at a time.
 * - Navigate with arrows and 1/2/3... pager.
 * - Large image focus + concise copy.
 *
 * Image convention for "systems" (Powertrain, Suspension, ...):
 *   Place images at: /systems/<section.id>.jpg
 *   Example: /systems/powertrain.jpg, /systems/suspension.jpg, /systems/safety.jpg ...
 */

type Slide = {
  kind: "system" | "feature";
  key: string;
  title: string;
  desc?: string;
  bullets?: string[];
  img: string;
  // For optional filtering/jumps
  bucket: "performance" | "technology";
};

const SYSTEM_BUCKET: Record<string, "performance" | "technology"> = {
  powertrain: "performance",
  suspension: "performance",
  safety: "technology",
  storage: "technology",
  control: "technology",
  service: "technology",
};

function systemImgFor(id: string) {
  // You’ll provide these files under /public/systems/
  return `/systems/${id}.jpg`;
}

function buildSlides(): Slide[] {
  const techCopy = getTechCopy();
  const systems: Slide[] = techCopy.sections.map((sec) => ({
    kind: "system",
    key: `system:${sec.id}`,
    title: sec.title,
    bullets: sec.bullets,
    img: systemImgFor(sec.id),
    bucket: SYSTEM_BUCKET[sec.id] ?? "technology",
  }));

  const features: Slide[] = (TECH_FEATURES as TechItem[]).map((f) => ({
    kind: "feature",
    key: `feature:${f.key}`,
    title: f.title,
    desc: f.desc,
    img: f.img,
    // Heuristic: map motor/suspension/brake → performance; storage/windscreen/etc → technology
    bucket: /motor|susp|brake|hill/i.test(`${f.key} ${f.title}`) ? "performance" : "technology",
  }));

  // Merge into one timeline-like set, keeping systems first (clear storyline), then features
  return [...systems, ...features];
}

export default function PerfTechShowcase() {
  const allSlides = useMemo(buildSlides, []);
  const [filter, setFilter] = useState<"all" | "performance" | "technology">("all");
  const slides = useMemo(
    () => (filter === "all" ? allSlides : allSlides.filter((s) => s.bucket === filter)),
    [allSlides, filter]
  );

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    // Reset index if filter changes and current exceeds
    if (idx > slides.length - 1) setIdx(0);
  }, [slides.length, idx]);

  const goPrev = () => setIdx((i) => (i === 0 ? slides.length - 1 : i - 1));
  const goNext = () => setIdx((i) => (i === slides.length - 1 ? 0 : i + 1));
  const goTo = (i: number) => setIdx(i);

  useEffect(() => {
    if (!slides[idx]) return;
    const s = slides[idx];
    trackEvent("perftech_slide_view", { index: idx + 1, key: s.key, title: s.title, kind: s.kind, bucket: s.bucket });
    // Preload next image
    const next = slides[(idx + 1) % slides.length];
    if (next) {
      const img = new Image();
      img.src = next.img;
    }
  }, [idx, slides]);

  if (slides.length === 0) return null;
  const current = slides[idx];

  return (
    <section id="perftech" className="scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <header className="flex items-end justify-between gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Performance &amp; Technology
          </h2>

          {/* Optional quick filter (doesn't split into rows; just filters the same single row experience) */}
          <div className="hidden md:flex items-center gap-1 text-sm">
            {(["all", "performance", "technology"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setFilter(tab);
                  trackEvent("perftech_filter", { tab });
                }}
                className={[
                  "px-3 py-1.5 rounded-full border transition",
                  filter === tab
                    ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                    : "border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200",
                ].join(" ")}
                aria-pressed={filter === tab}
              >
                {tab === "all" ? "All" : tab[0].toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </header>

        {/* One-row, single focus card */}
        <div
          className="
            rounded-3xl border border-zinc-200 dark:border-zinc-800
            bg-white/70 dark:bg-zinc-950/70 backdrop-blur
            p-4 md:p-6
            shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]
            dark:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.5)]
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 items-stretch">
            {/* Copy */}
            <div className="md:col-span-2 flex flex-col">
              <div className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {current.kind === "system" ? "System" : "Feature"} • {current.bucket}
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mt-1">{current.title}</h3>

              {current.desc ? (
                <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{current.desc}</p>
              ) : null}

              {current.bullets?.length ? (
                <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {current.bullets.map((b, i) => (
                    <li key={i} className="pl-4 relative">
                      <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                      <span className="block translate-x-1">{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-auto pt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => (goPrev(), trackEvent("perftech_prev"))}
                  className="rounded-full border px-3 py-2 text-sm border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  aria-label="Previous"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={() => (goNext(), trackEvent("perftech_next"))}
                  className="rounded-full border px-3 py-2 text-sm border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  aria-label="Next"
                >
                  Next →
                </button>
                <span className="ml-auto text-xs text-zinc-600 dark:text-zinc-400">
                  {idx + 1} / {slides.length}
                </span>
              </div>
            </div>

            {/* Image */}
            <div className="md:col-span-3 relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
              <img
                src={current.img}
                alt={current.title}
                loading="lazy"
                className="w-full h-[320px] md:h-full object-cover"
              />

              {/* Corner numbers (subtle hint that there are more) */}
              <div className="absolute right-3 top-3 text-xs px-2 py-1 rounded-full bg-black/70 text-white">
                {idx + 1}/{slides.length}
              </div>
            </div>
          </div>

          {/* Numbered pager (no scroll; click to jump) */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.key}
                onClick={() => goTo(i)}
                className={[
                  "w-8 h-8 rounded-full border text-sm inline-grid place-items-center",
                  i === idx
                    ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                    : "border-zinc-300 text-zinc-800 dark:border-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                ].join(" ")}
                aria-current={i === idx}
                aria-label={`Go to ${i + 1}: ${s.title}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

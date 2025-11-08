// src/components/StageCarousel.tsx
import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Stage = {
  key: string;
  title: string;
  desc?: string;
  img: string; // absolute from /public
  badge?: string;
};

type Props = {
  id?: string;
  title?: string;
  note?: string;
  stages?: Stage[]; // can be undefined
  startIndex?: number;
};

export default function StageCarousel({
  id,
  title,
  note,
  stages,
  startIndex = 0,
}: Props) {
  const safeStages: Stage[] = Array.isArray(stages) ? stages : [];
  const total = safeStages.length;

  // If nothing to show, render nothing (prevents `.length` crashes)
  if (total === 0) {
    if (import.meta.env.DEV) {
      console.info(`[StageCarousel] No stages to render for id="${id || title || ""}".`);
    }
    return null;
  }

  const [idx, setIdx] = useState(() =>
    Math.min(Math.max(0, startIndex), total - 1)
  );

  const current = safeStages[idx];

  const go = (to: number) => setIdx(((to % total) + total) % total);
  const next = () => go(idx + 1);
  const prev = () => go(idx - 1);

  const bullets = useMemo(
    () => Array.from({ length: total }, (_, i) => i),
    [total]
  );

  return (
    <section id={id} className="scroll-mt-24 py-16">
      <div className="max-w-6xl mx-auto px-5">
        {title ? (
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {title}
            </h2>
            {note ? (
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {note}
              </p>
            ) : null}
          </div>
        ) : null}

        <div
          className="
            rounded-3xl border border-zinc-200 dark:border-zinc-800
            bg-white/70 dark:bg-zinc-950/70 backdrop-blur
            p-3 md:p-6
            shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]
            dark:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.5)]
          "
        >
          {/* Image area */}
          <div className="relative">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
              {/* big centered image */}
              <img
                src={current.img}
                alt={current.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* top-right counter + arrows */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className="inline-flex min-w-[44px] justify-center rounded-full px-2 py-1 text-xs font-semibold bg-black/70 text-white dark:bg-white/20 dark:text-white">
                  {idx + 1}/{total}
                </span>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous"
                  className="inline-grid place-items-center w-9 h-9 rounded-full bg-black/75 text-white hover:bg-black/90"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next"
                  className="inline-grid place-items-center w-9 h-9 rounded-full bg-black/75 text-white hover:bg-black/90"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* badge (optional) */}
              {current.badge ? (
                <div className="absolute left-3 top-3">
                  <span className="rounded-full bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1">
                    {current.badge}
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          {/* text area */}
          <div className="mt-5 px-1 md:px-2">
            <h3 className="text-xl md:text-2xl font-bold">{current.title}</h3>
            {current.desc ? (
              <p className="mt-2 text-zinc-700 dark:text-zinc-200">
                {current.desc}
              </p>
            ) : null}

            {/* number bullets (tap to jump) */}
            <div className="mt-4 flex flex-wrap gap-2">
              {bullets.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to item ${i + 1}`}
                  className={[
                    "px-3 py-1.5 rounded-full text-xs font-semibold border",
                    i === idx
                      ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                      : "border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200",
                  ].join(" ")}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

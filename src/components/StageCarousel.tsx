// src/components/StageCarousel.tsx
import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type StageKPI = { label: string; value: string };
export type StageItem = {
  id: string;
  img: string;
  alt: string;
  title: string;
  subtitle?: string;
  description?: string;
  kpis?: StageKPI[];
};

export default function StageCarousel({
  items,
  ariaLabel = "Feature carousel",
}: {
  items: StageItem[];
  ariaLabel?: string;
}) {
  const [index, setIndex] = useState(0);
  const count = items.length;
  const safeIndex = useMemo(() => Math.min(Math.max(index, 0), count - 1), [index, count]);

  useEffect(() => {
    setIndex((i) => Math.min(i, count - 1));
  }, [count]);

  const go = (i: number) => setIndex(((i % count) + count) % count);
  const next = () => go(safeIndex + 1);
  const prev = () => go(safeIndex - 1);

  const current = items[safeIndex];

  return (
    <section aria-label={ariaLabel}>
      {/* Image stage */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
        <div className="aspect-[16/9] w-full bg-zinc-200 dark:bg-zinc-800">
          <img
            src={current.img}
            alt={current.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Right-corner controls: arrows + numbers */}
        <div className="absolute right-3 top-3 md:top-auto md:bottom-3 flex md:flex-col items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="inline-grid place-items-center w-9 h-9 rounded-xl bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800 shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="inline-grid place-items-center w-9 h-9 rounded-xl bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800 shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Number pager (1..N) */}
          <div className="hidden md:flex flex-col gap-1 mt-2 items-center">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to item ${i + 1}`}
                className={[
                  "w-9 h-8 rounded-lg text-xs font-semibold border transition",
                  i === safeIndex
                    ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                    : "bg-white/90 dark:bg-zinc-900/90 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800",
                ].join(" ")}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info under image */}
      <div className="mt-6">
        <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight">{current.title}</h4>
        {current.subtitle ? (
          <p className="mt-1 text-zinc-600 dark:text-zinc-300">{current.subtitle}</p>
        ) : null}
        {current.description ? (
          <p className="mt-4 text-sm md:text-base text-zinc-700 dark:text-zinc-200">{current.description}</p>
        ) : null}

        {current.kpis?.length ? (
          <ul className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {current.kpis.map((k, i) => (
              <li
                key={i}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 px-4 py-3"
              >
                <div className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{k.label}</div>
                <div className="text-sm font-semibold mt-0.5">{k.value}</div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

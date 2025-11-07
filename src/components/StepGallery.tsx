// src/components/StepGallery.tsx
import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import type { TechItem } from "../data/tech_features";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  items: TechItem[];
  onIndexChange?: (index: number) => void;
  ariaLabel?: string;
};

export default function StepGallery({ items, onIndexChange, ariaLabel }: Props) {
  const total = items.length;
  const [idx, setIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const clamp = useCallback((n: number) => {
    if (total === 0) return 0;
    if (n < 0) return total - 1;
    if (n >= total) return 0;
    return n;
  }, [total]);

  const go = useCallback((n: number) => setIdx(() => clamp(n)), [clamp]);
  const next = useCallback(() => setIdx((i) => clamp(i + 1)), [clamp]);
  const prev = useCallback(() => setIdx((i) => clamp(i - 1)), [clamp]);

  useEffect(() => {
    onIndexChange?.(idx);
  }, [idx, onIndexChange]);

  const active = items[idx];

  // keyboard left/right
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const numbers = useMemo(() => Array.from({ length: total }, (_, i) => i), [total]);

  if (total === 0) return null;

  return (
    <div ref={containerRef} tabIndex={0} aria-label={ariaLabel} className="relative outline-none">
      {/* Big image */}
      <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {active?.img ? (
          <img
            src={active.img}
            alt={active.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : null}

        {/* Right-corner numeric + arrows */}
        {total > 1 && (
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 rounded-full bg-black/60 text-white px-2 py-1.5 dark:bg-white/70 dark:text-black">
              {numbers.map((n) => (
                <button
                  key={n}
                  onClick={() => go(n)}
                  aria-label={`Go to ${n + 1}`}
                  className={[
                    "w-6 h-6 rounded-full text-xs font-semibold grid place-items-center",
                    n === idx ? "bg-white text-black dark:bg-black dark:text-white" : "bg-transparent"
                  ].join(" ")}
                >
                  {n + 1}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 rounded-full bg-black/60 text-white p-1 dark:bg-white/70 dark:text-black">
              <button
                onClick={prev}
                aria-label="Previous"
                className="w-8 h-8 rounded-full grid place-items-center hover:bg-white/20 dark:hover:bg-black/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="mx-1 text-xs font-semibold tabular-nums">
                {idx + 1} / {total}
              </div>
              <button
                onClick={next}
                aria-label="Next"
                className="w-8 h-8 rounded-full grid place-items-center hover:bg-white/20 dark:hover:bg-black/10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Info below image */}
      {active && (
        <div className="mt-4">
          {active.system ? (
            <div className="text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {active.system}
            </div>
          ) : null}
          <h4 className="mt-1 text-xl md:text-2xl font-extrabold tracking-tight">{active.title}</h4>
          {active.desc ? (
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">{active.desc}</p>
          ) : null}
        </div>
      )}
    </div>
  );
}

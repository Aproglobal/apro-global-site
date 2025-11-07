// src/components/StageCarousel.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";

export type StageItem = {
  id?: string;
  img: string;
  alt?: string;
  title: string;
  subtitle?: string;
  description?: string;
  kpis?: Array<{ label: string; value: string }>;
  note?: string;
  cta?: { label: string; href?: string; onClick?: () => void };
  below?: React.ReactNode; // optional custom block under description
};

type Props = {
  items: StageItem[];
  onChange?(index: number): void;
  initialIndex?: number;
  imgClassName?: string; // override image sizing if needed
  controlsPosition?: "right" | "inside"; // "right" by default
  ariaLabel?: string;
};

export default function StageCarousel({
  items,
  onChange,
  initialIndex = 0,
  imgClassName,
  controlsPosition = "right",
  ariaLabel = "Feature gallery",
}: Props) {
  const [index, setIndex] = useState(() => {
    const safe = Number.isFinite(initialIndex) ? initialIndex : 0;
    return Math.min(Math.max(0, safe), Math.max(0, items.length - 1));
  });

  const total = items.length;
  const go = (i: number) => setIndex((cur) => {
    const next = (i + total) % total;
    return next;
  });
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  // announce to parent
  useEffect(() => { onChange?.(index); }, [index, onChange]);

  // keyboard navigation
  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", "PageDown"].includes(e.key)) { e.preventDefault(); next(); }
      else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); prev(); }
      else if (e.key === "Home") { e.preventDefault(); go(0); }
      else if (e.key === "End") { e.preventDefault(); go(total - 1); }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [total, index]);

  const active = items[index] ?? items[0];

  const numberButton = (i: number) => {
    const isActive = i === index;
    return (
      <button
        key={i}
        type="button"
        aria-label={`Go to item ${i + 1} of ${total}`}
        onClick={() => go(i)}
        className={[
          "w-9 h-9 rounded-full grid place-items-center text-xs font-semibold border",
          isActive
            ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
            : "bg-white/70 dark:bg-zinc-900/70 backdrop-blur border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:opacity-90",
        ].join(" ")}
      >
        {i + 1}
      </button>
    );
  };

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      aria-live="polite"
      className="relative"
    >
      {/* Visual */}
      <div className="relative">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]">
          <img
            src={active.img}
            alt={active.alt || active.title}
            className={[
              "w-full h-full object-cover object-center",
              imgClassName || "md:object-cover",
            ].join(" ")}
            draggable={false}
          />
        </div>

        {/* Right-side controls (desktop) */}
        {controlsPosition === "right" && total > 1 && (
          <div className="hidden md:flex flex-col items-center gap-2 absolute right-3 top-1/2 -translate-y-1/2 z-20">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="w-10 h-10 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-300 dark:border-zinc-700 grid place-items-center hover:opacity-90"
            >
              <ChevronUp size={18} />
            </button>
            <div className="flex flex-col items-center gap-2">
              {Array.from({ length: total }).map((_, i) => numberButton(i))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="w-10 h-10 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-300 dark:border-zinc-700 grid place-items-center hover:opacity-90"
            >
              <ChevronDown size={18} />
            </button>
          </div>
        )}

        {/* Mobile controls (bottom bar) */}
        {total > 1 && (
          <div className="md:hidden absolute inset-x-3 bottom-3 z-20">
            <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-300 dark:border-zinc-700 px-2 py-2 flex items-center justify-between">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous"
                className="w-9 h-9 rounded-xl grid place-items-center hover:opacity-80"
              >
                <ChevronLeft />
              </button>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-2">
                {Array.from({ length: total }).map((_, i) => numberButton(i))}
              </div>
              <button
                type="button"
                onClick={next}
                aria-label="Next"
                className="w-9 h-9 rounded-xl grid place-items-center hover:opacity-80"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Text block */}
      <div className="mt-6">
        <h4 className="text-xl md:text-2xl font-extrabold tracking-tight">{active.title}</h4>
        {active.subtitle && (
          <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">{active.subtitle}</p>
        )}
        {active.description && (
          <p className="mt-3 text-zinc-700 dark:text-zinc-200 leading-relaxed">{active.description}</p>
        )}

        {active.kpis?.length ? (
          <ul className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {active.kpis.map((k, i) => (
              <li
                key={i}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/60 px-4 py-3"
              >
                <div className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{k.label}</div>
                <div className="text-base font-semibold">{k.value}</div>
              </li>
            ))}
          </ul>
        ) : null}

        {active.note && (
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">{active.note}</p>
        )}

        {active.below}

        {active.cta && (
          <div className="mt-5">
            {active.cta.href ? (
              <a
                href={active.cta.href}
                className="inline-block px-5 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold"
              >
                {active.cta.label}
              </a>
            ) : (
              <button
                type="button"
                onClick={active.cta.onClick}
                className="px-5 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold"
              >
                {active.cta.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// src/components/ui/Carousel.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselProps = {
  items: React.ReactNode[];
  ariaLabel?: string;
  id?: string;
  className?: string;
  itemClassName?: string; // e.g. "w-[88vw] md:w-[720px]"
  showCount?: boolean;
};

export default function Carousel({
  items,
  ariaLabel,
  id,
  className = "",
  itemClassName = "w-[88vw] md:w-[760px] lg:w-[900px]",
  showCount = true,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const count = items.length;

  const snapTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(i, count - 1));
    const child = el.children[clamped] as HTMLElement | undefined;
    if (child) child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setIndex(clamped);
  };

  const onPrev = () => snapTo(index - 1);
  const onNext = () => snapTo(index + 1);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;
      let best = 0;
      let bestDelta = Infinity;
      const mid = el.scrollLeft + el.clientWidth / 2;
      children.forEach((c, i) => {
        const left = c.offsetLeft + c.clientWidth / 2;
        const delta = Math.abs(left - mid);
        if (delta < bestDelta) {
          bestDelta = delta;
          best = i;
        }
      });
      setIndex(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const canPrev = index > 0;
  const canNext = index < count - 1;

  const gradientEdges = useMemo(
    () => (
      <>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/90 dark:from-black/90 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/90 dark:from-black/90 to-transparent" />
      </>
    ),
    []
  );

  return (
    <div id={id} className={`relative ${className}`} aria-label={ariaLabel}>
      {/* Track */}
      <div
        ref={trackRef}
        className="
          overflow-x-auto scroll-smooth no-scrollbar
          snap-x snap-mandatory flex gap-4 px-1
        "
      >
        {items.map((node, i) => (
          <div key={i} className={`shrink-0 snap-center ${itemClassName}`}>
            {node}
          </div>
        ))}
      </div>

      {/* Overlay UI */}
      {gradientEdges}

      {/* Count indicator */}
      {showCount && (
        <div className="absolute top-2 right-2 rounded-full bg-black/70 text-white text-xs px-2 py-1">
          {index + 1} / {count}
        </div>
      )}

      {/* Arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center px-1">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous"
          disabled={!canPrev}
          className={`rounded-full p-2 border text-sm backdrop-blur bg-white/70 dark:bg-zinc-900/70 border-zinc-300 dark:border-zinc-700 transition
            ${canPrev ? "hover:bg-white dark:hover:bg-zinc-800" : "opacity-40 cursor-not-allowed"}
          `}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center px-1">
        <button
          type="button"
          onClick={onNext}
          aria-label="Next"
          disabled={!canNext}
          className={`rounded-full p-2 border text-sm backdrop-blur bg-white/70 dark:bg-zinc-900/70 border-zinc-300 dark:border-zinc-700 transition
            ${canNext ? "hover:bg-white dark:hover:bg-zinc-800" : "opacity-40 cursor-not-allowed"}
          `}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

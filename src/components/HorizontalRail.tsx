import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  children: React.ReactNode;
  /** Optional: fixed height background fades to imitate Audi */
  edgeFades?: boolean;
  /** optional aria-label */
  ariaLabel?: string;
  /** Add custom class to rail container */
  className?: string;
};

export default function HorizontalRail({ children, edgeFades = true, ariaLabel, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  };

  useEffect(() => {
    onScroll();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollBy = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    const delta = Math.round(el.clientWidth * 0.9) * dir;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className={`relative ${className ?? ""}`}>
      {edgeFades && !atStart && (
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent rounded-l-2xl" />
      )}
      {edgeFades && !atEnd && (
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent rounded-r-2xl" />
      )}

      <button
        onClick={() => scrollBy(-1)}
        aria-label="Scroll left"
        className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full border
          ${atStart ? "opacity-40 cursor-not-allowed" : "bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-900"}
          border-zinc-200 dark:border-zinc-700 shadow`}
        disabled={atStart}
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => scrollBy(1)}
        aria-label="Scroll right"
        className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full border
          ${atEnd ? "opacity-40 cursor-not-allowed" : "bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-900"}
          border-zinc-200 dark:border-zinc-700 shadow`}
        disabled={atEnd}
      >
        <ChevronRight size={18} />
      </button>

      <div
        ref={ref}
        aria-label={ariaLabel}
        className="scrollbar-none overflow-x-auto snap-x snap-mandatory flex gap-4 py-2 rail"
      >
        {children}
      </div>
    </div>
  );
}

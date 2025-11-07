import React, { useEffect, useRef, useState } from "react";
import { openLead } from "./LeadModal";
import { trackEvent } from "../services/analytics";

// Keep labels/ids in sync with sections in App.tsx
const LABELS: Record<string, string> = {
  models: "Models",
  compare: "Compare",
  technology: "Technology",
  industries: "Industries",
  timeline: "Timeline",
  service: "Service",
  charging: "Charging",
  resources: "Resources",
  tco: "TCO",
  configurator: "Configurator",
  fleet: "Fleet",
  support: "Support",
  contact: "Contact",
};

const CANDIDATE_IDS = Object.keys(LABELS);

export function Header() {
  const ref = useRef<HTMLElement | null>(null);
  const [activeId, setActiveId] = useState<string>("models");

  // Set CSS var for header height and observe section intersections
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setH = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--header-h", `${Math.ceil(h)}px`);
    };
    setH();
    const ro = new ResizeObserver(setH);
    ro.observe(el);

    // IntersectionObserver to update active section
    const sections = CANDIDATE_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio near top
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length) {
          const id = visible[0].target.id;
          setActiveId(id);
        } else {
          // Fallback based on scroll position
          const scrollY = window.scrollY + 120; // a bit below header
          let current = activeId;
          for (const s of sections) {
            if (s.offsetTop <= scrollY) current = s.id;
          }
          setActiveId(current);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px", // prefer the section near the top/middle
        threshold: [0.01, 0.15, 0.3, 0.6, 0.9],
      }
    );

    sections.forEach((s) => io.observe(s));

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const onNavClick = (id: string, label: string) => {
    trackEvent("nav_click", { id, label });
  };

  return (
    <header
      ref={ref as any}
      className="fixed inset-x-0 top-0 z-50 backdrop-blur bg-white/70 dark:bg-black/50 border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center gap-4">
        <a href="#home" className="font-extrabold tracking-tight text-lg">
          APRO
        </a>

        {/* nav — horizontal scroll on narrow widths; single underbar highlight */}
        <nav className="flex-1 overflow-x-auto">
          <ul className="flex items-center gap-4 whitespace-nowrap">
            {CANDIDATE_IDS.map((id) => {
              const isActive = activeId === id;
              return (
                <li key={id} className="relative">
                  <a
                    href={`#${id}`}
                    onClick={() => onNavClick(id, LABELS[id])}
                    className={
                      "px-1 py-2 text-sm transition-colors " +
                      (isActive
                        ? "text-black dark:text-white"
                        : "text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white")
                    }
                  >
                    {LABELS[id]}
                  </a>
                  {/* single underbar (no duplicated highlight) */}
                  <div
                    className={`absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(99,102,241,0.9) 20%, rgba(16,185,129,0.9) 80%, rgba(0,0,0,0) 100%)",
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          onClick={() => {
            openLead("Header CTA");
            trackEvent("contactOpen", { where: "header", label: "Talk to Sales" });
          }}
          className="hidden sm:inline-flex px-4 py-2 rounded-full bg-black text-white text-sm font-semibold dark:bg-white dark:text-black"
        >
          Talk to Sales
        </button>
      </div>
    </header>
  );
}

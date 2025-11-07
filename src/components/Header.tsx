import React, { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = { id: string; label: string };
const NAV: NavItem[] = [
  { id: "models", label: "Models" },
  { id: "technology", label: "Technology" },
  { id: "timeline", label: "Timeline" },
  { id: "service", label: "Service" },
  { id: "fleet", label: "Fleet" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [active, setActive] = useState<string>("models");
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement | null>(null);

  // set header height CSS var so main can offset
  useEffect(() => {
    const h = () => {
      const el = barRef.current;
      if (!el) return;
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    };
    h();
    const ro = new ResizeObserver(h);
    if (barRef.current) ro.observe(barRef.current);
    return () => ro.disconnect();
  }, []);

  // Scrollspy (IntersectionObserver)
  useEffect(() => {
    const sections = NAV.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const onClickNav = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 64) - 8;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const links = useMemo(
    () => (
      <nav className="relative">
        <ul className="flex items-center gap-1">
          {NAV.map(item => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                <button
                  onClick={() => onClickNav(item.id)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition
                    ${isActive ? "text-black dark:text-white" : "text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"}`}
                >
                  {item.label}
                </button>
                {isActive && (
                  <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-zinc-900/5 dark:bg-white/10" />
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    ),
    [active]
  );

  return (
    <header ref={barRef} className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/40 border-b border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <a href="#home" className="font-extrabold tracking-tight text-lg">APRO</a>

        <div className="hidden md:block">{links}</div>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden sm:inline-flex px-3 py-2 rounded-full text-sm font-semibold bg-black text-white dark:bg-white dark:text-black"
          >
            Talk to Sales
          </a>
          <button className="md:hidden p-2 rounded-lg border border-zinc-200 dark:border-zinc-700" onClick={() => setOpen(s => !s)} aria-label="Toggle menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="max-w-6xl mx-auto px-5 py-2">{links}</div>
        </div>
      )}
    </header>
  );
}

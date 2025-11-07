import React, { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = { id: string; label: string };

const PRIMARY: NavItem[] = [
  { id: "models", label: "Models" },
  { id: "technology", label: "Technology" },
  { id: "timeline", label: "Timeline" },
  { id: "service", label: "Service" },
  { id: "fleet", label: "Fleet" },
  { id: "contact", label: "Contact" },
];

const SECONDARY: NavItem[] = [
  { id: "industries", label: "Industries" },
  { id: "charging", label: "Charging" },
  { id: "resources", label: "Resources" },
  { id: "tco", label: "TCO" },
  { id: "configurator", label: "Configurator" },
  { id: "support", label: "Support" },
];

const ALL = [...PRIMARY, ...SECONDARY];

export default function Header() {
  const [active, setActive] = useState<string>("models");
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const barRef = useRef<HTMLDivElement | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);

  // header height → CSS var
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

  // Scrollspy
  useEffect(() => {
    const sections = ALL.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
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

  // close More on outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!moreRef.current) return;
      if (!moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const scrollToId = (id: string) => {
    setOpen(false);
    setMoreOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const headerH =
      parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 64;
    const y = el.getBoundingClientRect().top + window.scrollY - headerH - 8;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const LinkPill = ({ item }: { item: NavItem }) => {
    const isActive = active === item.id;
    return (
      <button
        onClick={() => scrollToId(item.id)}
        className={`relative px-3 py-2 rounded-full text-sm font-medium transition
        ${isActive ? "text-black dark:text-white" : "text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"}`}
      >
        {item.label}
        {isActive && (
          <span className="absolute inset-0 -z-10 rounded-full bg-zinc-900/5 dark:bg-white/10" />
        )}
      </button>
    );
  };

  const DesktopNav = useMemo(() => {
    const moreActive = SECONDARY.some(s => s.id === active);
    return (
      <nav className="relative hidden md:flex items-center gap-1">
        {PRIMARY.map(item => (
          <div key={item.id} className="relative">
            <LinkPill item={item} />
          </div>
        ))}
        <div className="relative" ref={moreRef}>
          <button
            onClick={() => setMoreOpen(v => !v)}
            className={`px-3 py-2 rounded-full text-sm font-medium transition
            ${moreActive ? "text-black dark:text-white" : "text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"}`}
          >
            More
          </button>
          {moreOpen && (
            <div
              className="absolute right-0 mt-2 w-56 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 shadow-lg p-2 z-50"
            >
              {SECONDARY.map(s => (
                <button
                  key={s.id}
                  onClick={() => scrollToId(s.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm
                    ${active === s.id ? "bg-zinc-100 dark:bg-zinc-800 font-semibold" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    );
  }, [active, moreOpen]);

  const MobileDrawer = () => (
    <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-5 py-2">
        <div className="grid grid-cols-2 gap-2">
          {[...PRIMARY, ...SECONDARY].map(item => (
            <button
              key={item.id}
              onClick={() => scrollToId(item.id)}
              className={`px-3 py-2 rounded-lg text-sm border
                ${active === item.id
                  ? "border-black dark:border-white font-semibold"
                  : "border-zinc-200 dark:border-zinc-700"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <header
      ref={barRef}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/40 border-b border-zinc-200/60 dark:border-zinc-800/60"
    >
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <a href="#home" className="font-extrabold tracking-tight text-lg">APRO</a>
        {DesktopNav}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden sm:inline-flex px-3 py-2 rounded-full text-sm font-semibold bg-black text-white dark:bg-white dark:text-black"
          >
            Talk to Sales
          </a>
          <button
            className="md:hidden p-2 rounded-lg border border-zinc-200 dark:border-zinc-700"
            onClick={() => setOpen(s => !s)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && <MobileDrawer />}
    </header>
  );
}

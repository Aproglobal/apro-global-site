import React, { useEffect, useRef, useState } from "react";
import { openLead } from "./LeadModal";

type LinkItem = { href: string; label: string };

const LINKS: LinkItem[] = [
  { href: "#home", label: "Home" },
  { href: "#models", label: "Models" },
  { href: "#technology", label: "Technology" },
  { href: "#industries", label: "Industries" },
  { href: "#timeline", label: "Timeline" },
  { href: "#service", label: "Service" },
  { href: "#charging", label: "Charging" },
  { href: "#resources", label: "Resources" },
  { href: "#tco", label: "TCO" },
  { href: "#configurator", label: "Configurator" },
  { href: "#fleet", label: "Fleet" },
  { href: "#support", label: "Support" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Expose header height as a CSS var so main can pad correctly
  useEffect(() => {
    const update = () => {
      const el = wrapRef.current;
      if (!el) return;
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const closeOnHash = () => setMenuOpen(false);
    window.addEventListener("hashchange", closeOnHash);
    return () => window.removeEventListener("hashchange", closeOnHash);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800 dark:bg-black/70"
      role="banner"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-2" aria-label="APRO Home">
          <img src="/assets/logo.svg" alt="" className="h-6 w-auto" />
          <span className="sr-only">APRO</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => openLead("Header CTA")}
            className="ml-2 rounded-full px-4 py-2 text-sm font-semibold bg-black text-white dark:bg-white dark:text-black"
          >
            Talk to Sales
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d={menuOpen ? "M6 6L18 18M6 18L18 6" : "M3 6h18M3 12h18M3 18h18"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800">
          <nav className="mx-auto max-w-6xl px-5 py-3 grid grid-cols-2 gap-2 text-sm" aria-label="Mobile">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2 text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => openLead("Header CTA - mobile")}
              className="col-span-2 mt-1 rounded-md px-3 py-2 font-semibold bg-black text-white dark:bg-white dark:text-black"
            >
              Talk to Sales
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
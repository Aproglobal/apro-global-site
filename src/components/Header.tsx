import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "../services/analytics";
import { openLead } from "./LeadModal";

/** -------------------------------
 *  Config (no TS types to avoid parser issues)
 * --------------------------------*/
const LABELS = {// src/components/Header.tsx
import React, { useEffect, useRef, useState } from "react";
import { trackEvent } from "../services/analytics";

type SectionId =
  | "home"
  | "models"
  | "technology"
  | "industries"
  | "timeline"
  | "service"
  | "charging"
  | "resources"
  | "tco"
  | "configurator"
  | "fleet"
  | "support"
  | "contact";

type NavItem = { id: SectionId; label: string; href: `#${SectionId}` };

const NAV: NavItem[] = [
  { id: "models", label: "Models", href: "#models" },
  { id: "technology", label: "Technology", href: "#technology" },
  { id: "industries", label: "Industries", href: "#industries" },
  { id: "timeline", label: "Timeline", href: "#timeline" },
  { id: "service", label: "Service", href: "#service" },
  { id: "charging", label: "Charging", href: "#charging" },
  { id: "resources", label: "Resources", href: "#resources" },
  { id: "tco", label: "TCO", href: "#tco" },
  { id: "configurator", label: "Configurator", href: "#configurator" },
  { id: "fleet", label: "Fleet", href: "#fleet" },
  { id: "support", label: "Support", href: "#support" },
  { id: "contact", label: "Contact", href: "#contact" },
];

function toggleDarkClass(nextIsDark: boolean): void {
  const root = document.documentElement;
  root.classList.toggle("dark", nextIsDark);
  // Optional: keep a CSS var for header height consumers
  document.body.style.setProperty("--header-h", getComputedStyle(root).getPropertyValue("--header-h") || "4rem");
}

export default function Header(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(() => document.documentElement.classList.contains("dark"));
  const headerRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]); // typed, no 'never'

  // Keep a CSS variable of header height for padding-top users
  useEffect(() => {
    const updateHeaderHeight = () => {
      const h = headerRef.current?.offsetHeight ?? 64;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  // Close mobile menu on route hash change or when clicking outside
  useEffect(() => {
    const onHash = () => setMenuOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const handleThemeToggle = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    toggleDarkClass(nextIsDark);
    trackEvent("themeToggle", { to: nextIsDark ? "dark" : "light" });
  };

  const onNavClick = (id: SectionId) => {
    setMenuOpen(false);
    trackEvent("navClick", { id });
  };

  return (
    <header
      ref={headerRef as React.RefObject<HTMLElement>}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-zinc-200 dark:bg-black/70 dark:border-zinc-800"
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#home" className="font-extrabold tracking-tight text-xl dark:text-white" aria-label="APRO Home">
          APRO
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-5 items-center">
          {NAV.map((item, idx) => (
            <a
              key={item.id}
              ref={(el) => (linkRefs.current[idx] = el)}
              href={item.href}
              onClick={() => onNavClick(item.id)}
              className="text-sm text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
            className="ml-2 rounded-full px-3 py-1.5 text-xs border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
          >
            {isDark ? "Light" : "Dark"}
          </button>
        </nav>

        {/* Mobile toggles */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
            className="rounded-full px-3 py-1.5 text-xs border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
          >
            {isDark ? "☀︎" : "🌙"}
          </button>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((s) => !s)}
            className="rounded-md px-3 py-2 border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-800 dark:text-zinc-200"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile Nav Sheet */}
      {menuOpen && (
        <div id="mobile-nav" className="md:hidden border-t border-zinc-200 dark:border-zinc-800">
          <nav className="px-5 py-3 grid grid-cols-2 gap-3 bg-white dark:bg-black">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => onNavClick(item.id)}
                className="text-sm px-3 py-2 rounded-md border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-100"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

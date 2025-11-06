import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "../services/analytics";
import { openLead } from "./LeadModal";

/** -------------------------------
 *  Config (no TS types to avoid parser issues)
 * --------------------------------*/
const LABELS = {// src/components/Header.tsx
import React, { useEffect, useRef, useState } from "react";
import { trackEvent } from "../services/analytics";// src/components/Header.tsx
import React, { useEffect, useRef, useState } from "react";
import { trackEvent } from "../services/analytics";// src/components/Header.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/** Define nav items with stable keys that match section IDs in App.tsx */
const NAV_ITEMS = [
  { id: "home", label: "Home", href: "#home" },
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
] as const;

type NavItem = typeof NAV_ITEMS[number];
type NavKey = NavItem["id"];

function classNames(...xs: Array<string | false | null | undefined>): string {
  return xs.filter(Boolean).join(" ");
}

/** Basic theme toggler that works with your existing dark mode */
function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : false
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  return { isDark, setIsDark };
}

export default function Header(): JSX.Element {
  const { isDark, setIsDark } = useTheme();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [active, setActive] = useState<NavKey>("home");

  const headerRef = useRef<HTMLDivElement | null>(null);

  /** Keep --header-h CSS var in sync (used by App.tsx paddingTop) */
  useEffect(() => {
    const updateHeaderVar = () => {
      const h = headerRef.current?.offsetHeight ?? 64;
      if (typeof document !== "undefined") {
        document.documentElement.style.setProperty("--header-h", `${h}px`);
      }
    };
    updateHeaderVar();
    window.addEventListener("resize", updateHeaderVar);
    const ro = headerRef.current ? new ResizeObserver(updateHeaderVar) : null;
    if (headerRef.current && ro) ro.observe(headerRef.current);
    return () => {
      window.removeEventListener("resize", updateHeaderVar);
      if (headerRef.current && ro) ro.disconnect();
    };
  }, []);

  /** Scroll spy using IntersectionObserver (TS-safe) */
  useEffect(() => {
    if (typeof document === "undefined") return;
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => !!el
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        // Pick the most visible section
        let best: { id: NavKey; ratio: number } | null = null;
        for (const entry of entries) {
          const id = entry.target.id as NavKey;
          const ratio = entry.intersectionRatio;
          if (!best || ratio > best.ratio) {
            best = { id, ratio };
          }
        }
        if (best && best.id !== active) setActive(best.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [active]);

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Let the browser handle anchor nav (for accessibility),
    // but also close mobile menu & smooth-scroll when possible.
    if (mobileOpen) setMobileOpen(false);

    const hashIndex = href.indexOf("#");
    if (hashIndex > -1) {
      const id = href.slice(hashIndex + 1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        const headerH = (headerRef.current?.offsetHeight ?? 0) + 8;
        const top = el.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  const nav = useMemo(() => NAV_ITEMS, []);

  return (
    <div
      ref={headerRef}
      className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b border-zinc-200 dark:bg-black/70 dark:border-zinc-800"
      role="navigation"
      aria-label="Primary"
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          className="text-xl font-extrabold tracking-tight"
          onClick={(e) => onLinkClick(e, "#home")}
          aria-label="Go to home"
        >
          APRO
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {nav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => onLinkClick(e, item.href)}
              className={classNames(
                "px-3 py-2 rounded-full text-sm font-medium transition-colors",
                active === item.id
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => setIsDark((v: boolean) => !v)}
            aria-label="Toggle dark mode"
            className="px-3 py-2 rounded-full text-sm border border-zinc-300 dark:border-zinc-700"
          >
            {isDark ? "Light" : "Dark"}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v: boolean) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="md:hidden px-3 py-2 rounded-full text-sm border border-zinc-300 dark:border-zinc-700"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        id="mobile-nav"
        className={classNames(
          "md:hidden overflow-hidden transition-[max-height] duration-300",
          mobileOpen ? "max-h-[520px]" : "max-h-0"
        )}
      >
        <div className="px-5 pb-4 grid grid-cols-2 gap-2">
          {nav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => onLinkClick(e, item.href)}
              className={classNames(
                "px-3 py-2 rounded-lg text-sm border",
                active === item.id
                  ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                  : "border-zinc-200 text-zinc-800 dark:border-zinc-700 dark:text-zinc-200"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

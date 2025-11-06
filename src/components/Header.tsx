import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "../services/analytics";
import { openLead } from "./LeadModal";

/** -------------------------------
 *  Config
 * --------------------------------*/
type NavItem = { id: string; label: string };

const LABELS: Record<string, string> = {
  models: "Models",// src/components/Header.tsx
import React, { useEffect, useRef, useState } from "react";
import { trackEvent } from "../services/analytics";
import { openLead } from "./LeadModal";

type NavItem = {
  id: string;
  label: string;
  href: `#${string}`;
};

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { id: "models", label: "Models", href: "#models" },
  { id: "technology", label: "Technology", href: "#technology" },
  { id: "industries", label: "Industries", href: "#industries" },
  { id: "timeline", label: "Timeline", href: "#timeline" },
  { id: "service", label: "Service", href: "#service" },
  { id: "charging", label: "Charging", href: "#charging" },
  { id: "resources", label: "Resources", href: "#resources" },
  { id: "tco", label: "TCO / ROI", href: "#tco" },
  { id: "configurator", label: "Configurator", href: "#configurator" },
  { id: "fleet", label: "Fleet", href: "#fleet" },
  { id: "support", label: "Support", href: "#support" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function Header(): JSX.Element {
  const headerRef = useRef<HTMLElement | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // Measure header height → CSS var for main padding
  useEffect((): void => {
    const el = headerRef.current;
    if (!el) return;
    const apply = (): void => {
      const h = el.offsetHeight;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    apply();

    const ro = new ResizeObserver(() => apply());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Add subtle border & backdrop after scroll
  useEffect((): void => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem): void => {
    setMenuOpen(false);
    trackEvent("navClick", { id: item.id, label: item.label });
  };

  const onToggleMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setMenuOpen((v) => !v);
  };

  const onTalkToSales = (e: React.MouseEvent<HTMLButtonElement>): void => {
    openLead("Header CTA");
    trackEvent("contactOpen", { where: "header", label: "Talk to Sales" });
  };

  return (
    <header
      ref={headerRef}
      className={[
        "fixed top-0 inset-x-0 z-50",
        "backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/40",
        scrolled ? "border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/40" : "bg-transparent",
      ].join(" ")}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-5 h-16 md:h-20 flex items-center justify-between">
        {/* Brand */}
        <a href="#home" className="font-extrabold tracking-tight text-xl md:text-2xl" aria-label="APRO Home">
          APRO
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => onNavClick(e, item)}
                  className="text-sm md:text-[15px] text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA (always visible) */}
        <div className="hidden lg:flex">
          <button
            type="button"
            onClick={onTalkToSales}
            className="px-4 py-2 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
          >
            Talk to Sales
          </button>
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            type="button"
            onClick={onTalkToSales}
            className="px-3 py-1.5 rounded-full bg-black text-white text-sm font-semibold dark:bg-white dark:text-black"
            aria-label="Talk to Sales"
          >
            Sales
          </button>
          <button
            type="button"
            onClick={onToggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700"
          >
            <span className="sr-only">Toggle menu</span>
            {/* simple hamburger */}
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu sheet */}
      {menuOpen && (
        <div id="mobile-nav" className="lg:hidden border-t border-zinc-200 dark:border-zinc-800">
          <nav aria-label="Mobile">
            <ul className="px-5 py-3 space-y-2 bg-white dark:bg-black">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => onNavClick(e, item)}
                    className="block py-2 text-sm text-zinc-800 dark:text-zinc-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={onTalkToSales}
                  className="w-full px-4 py-2 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
                >
                  Talk to Sales
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

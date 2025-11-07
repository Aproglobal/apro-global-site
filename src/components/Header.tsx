// src/components/Header.tsx
import React, { useEffect, useRef, useState } from "react";
import { trackEvent } from "../services/analytics";
import { openLead } from "./LeadModal";

// Keep this simple and TS-safe
const NAV = [
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
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Set CSS var --header-h so <main> can offset correctly
  useEffect(() => {
    const updateHeaderHeight = () => {
      const h = headerRef.current?.offsetHeight ?? 64; // fallback 64px
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    updateHeaderHeight();
    const onResize = () => updateHeaderHeight();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNavClick = (href: string, label: string) => {
    setMenuOpen(false);
    trackEvent("navClick", { href, label });
  };

  return (
    <>
      <div
        ref={headerRef}
        className={[
          "fixed inset-x-0 top-0 z-50",
          "backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/60",
          scrolled ? "border-b border-zinc-200/70 dark:border-zinc-800/70 shadow-sm" : "",
        ].join(" ")}
        role="navigation"
        aria-label="Primary"
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          {/* Brand */}
          <a
            href="#home"
            className="font-extrabold tracking-tight text-xl"
            onClick={() => onNavClick("#home", "Home")}
          >
            APRO
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => onNavClick(item.href, item.label)}
                className="text-sm text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}

            <button
              onClick={() => {
                openLead("Header CTA");
                trackEvent("contactOpen", { where: "header", label: "Talk to Sales" });
              }}
              className="ml-2 px-4 py-2 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
            >
              Talk to Sales
            </button>
          </nav>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-3">
            <button
              aria-label="Talk to Sales"
              onClick={() => {
                openLead("Header CTA (mobile)");
                trackEvent("contactOpen", { where: "header_mobile", label: "Talk to Sales" });
              }}
              className="px-3 py-2 rounded-full bg-black text-white text-sm font-semibold dark:bg-white dark:text-black"
            >
              Sales
            </button>

            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-md border border-zinc-300 dark:border-zinc-700"
            >
              <span className="sr-only">Open menu</span>
              {/* Simple burger */}
              <div className="w-5 h-0.5 bg-current mb-1" />
              <div className="w-5 h-0.5 bg-current mb-1" />
              <div className="w-5 h-0.5 bg-current" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-0 right-0 h-full w-72 bg-white dark:bg-zinc-900 shadow-xl p-5">
            <div className="flex items-center justify-between h-16">
              <span className="font-bold">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-md border border-zinc-300 dark:border-zinc-700"
              >
                ✕
              </button>
            </div>
            <nav className="mt-2 flex flex-col">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => onNavClick(item.href, item.label)}
                  className="px-2 py-3 text-zinc-800 dark:text-zinc-200 border-b border-zinc-200/70 dark:border-zinc-800/70"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openLead("Header CTA (mobile menu)");
                  trackEvent("contactOpen", { where: "header_mobile_menu", label: "Talk to Sales" });
                }}
                className="mt-4 px-4 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
              >
                Talk to Sales
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
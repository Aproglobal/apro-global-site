import React, { useEffect, useRef, useState } from "react";
import { openLead } from "./LeadModal";

type LinkItem = { href: string; label: string };

const LINKS: LinkItem[] = [
  { href: "#home", label: "Home" },
  { href: "#models", label: "Models" },
  { href: "#technology", label: "Technology" },
  { href: "#industries", label: "Industries" },
  { href: "#timeline", label: "Timeline" },
  { href: "#service", label: "Service" },// src/components/Header.tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";// src/components/Header.tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { openLead } from "./LeadModal"; // same folder

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

const PRIMARY_LINKS: NavItem[] = [
  { label: "Models", href: "#models" },
  { label: "Technology", href: "#technology" },
  { label: "Industries", href: "#industries" },
  { label: "Resources", href: "#resources" },
];

const MORE_LINKS: NavItem[] = [
  { label: "Support", href: "#support" },
  { label: "Compare", href: "#compare" },
  { label: "TCO Calculator", href: "#tco" },
  { label: "Warranty", href: "#warranty" },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);

  // Scroll effects: shrink + progress
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 8);
      const h = document.documentElement;
      const total = (h.scrollHeight - h.clientHeight) || 1;
      setProgress(Math.min(100, Math.max(0, (y / total) * 100)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click outside for "More"
  useEffect(() => {
    if (!moreOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!moreRef.current) return;
      if (!moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [moreOpen]);

  const onLead = useCallback(() => {
    try {
      openLead("header");
    } catch {
      // no-op if not wired yet
    }
  }, []);

  const onNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = (e.currentTarget.getAttribute("href") || "").trim();
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  }, []);

  return (
    <>
      {/* Top scroll progress */}
      <div
        className="fixed left-0 top-0 z-[60] h-0.5 bg-[var(--brand,#0ea5e9)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-all",
          "border-b border-white/10",
          scrolled
            ? "backdrop-blur bg-white/60 dark:bg-neutral-900/60"
            : "backdrop-blur-0 bg-transparent"
        )}
        role="navigation"
        aria-label="Primary"
      >
        <div
          className={cx(
            "mx-auto flex items-center gap-3 px-4 sm:px-6",
            "transition-[height,padding] duration-200",
            scrolled ? "h-14" : "h-20"
          )}
        >
          {/* Left: brand */}
          <a
            href="/"
            className={cx(
              "font-semibold tracking-tight",
              "text-neutral-900 dark:text-white",
              "select-none"
            )}
            aria-label="APRO — Home"
          >
            APRO
          </a>

          {/* Center: nav (desktop) */}
          <nav className="ml-auto hidden md:flex items-center gap-1">
            {PRIMARY_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={onNavClick}
                className={cx(
                  "rounded-xl px-3 py-2 text-sm font-medium",
                  "text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white",
                  "hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                )}
              >
                {link.label}
              </a>
            ))}

            {/* More dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                className={cx(
                  "group inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium",
                  "text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white",
                  "hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                )}
                aria-haspopup="menu"
                aria-expanded={moreOpen}
                aria-controls="more-menu"
              >
                More
                <ChevronDown
                  className={cx(
                    "h-4 w-4 transition-transform",
                    moreOpen ? "rotate-180" : "rotate-0"
                  )}
                  aria-hidden="true"
                />
              </button>

              {moreOpen && (
                <div
                  id="more-menu"
                  role="menu"
                  className={cx(
                    "absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-black/5",
                    "bg-white/90 backdrop-blur shadow-lg dark:bg-neutral-900/90"
                  )}
                >
                  <ul className="py-2">
                    {MORE_LINKS.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={onNavClick}
                          className={cx(
                            "block px-3 py-2 text-sm",
                            "text-neutral-700 hover:text-neutral-900 hover:bg-black/5",
                            "dark:text-neutral-300 dark:hover:text-white dark:hover:bg-white/10"
                          )}
                          role="menuitem"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={onLead}
              className={cx(
                "ml-2 inline-flex items-center gap-2 rounded-2xl px-3.5 py-2 text-sm font-semibold",
                "text-white bg-[var(--brand,#0ea5e9)] hover:opacity-90 active:opacity-100",
                "shadow-sm"
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Talk to Sales
            </button>
          </nav>

          {/* Right: mobile controls */}
          <div className="ml-auto md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={cx(
                "inline-flex items-center justify-center rounded-xl p-2",
                "text-neutral-700 hover:text-neutral-900 hover:bg-black/5",
                "dark:text-neutral-300 dark:hover:text-white dark:hover:bg-white/10",
                "transition-colors"
              )}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay & drawer */}
      <div
        className={cx(
          "fixed inset-0 z-[55] bg-black/30 backdrop-blur-sm transition-opacity",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      <aside
        className={cx(
          "fixed right-0 top-0 z-[60] h-full w-[82%] max-w-sm",
          "bg-white dark:bg-neutral-900 shadow-2xl",
          "transition-transform duration-200",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-black/5 dark:border-white/10">
          <span className="font-semibold">Menu</span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="px-4 py-3">
          <ul className="space-y-1">
            {[...PRIMARY_LINKS, ...MORE_LINKS].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={onNavClick}
                  className={cx(
                    "block rounded-xl px-3 py-2 text-base font-medium",
                    "text-neutral-800 hover:text-neutral-950 hover:bg-black/5",
                    "dark:text-neutral-200 dark:hover:text-white dark:hover:bg-white/10",
                    "transition-colors"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-3 border-t border-black/5 dark:border-white/10 pt-3">
            <button
              type="button"
              onClick={() => {
                onLead();
                setMobileOpen(false);
              }}
              className={cx(
                "w-full inline-flex items-center justify-center gap-2 rounded-2xl px-3.5 py-2.5 text-sm font-semibold",
                "text-white bg-[var(--brand,#0ea5e9)] hover:opacity-90 active:opacity-100",
                "shadow-sm"
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Talk to Sales
            </button>
          </div>
        </nav>
      </aside>

      {/* Spacer so content isn't hidden under fixed header */}
      <div aria-hidden="true" className={cx(scrolled ? "h-14" : "h-20")} />
    </>
  );
}

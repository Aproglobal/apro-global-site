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
  { href: "#resources", label: "Resources" },import React, { useEffect, useMemo, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { openLead } from "./LeadModal"; // CTA: opens your existing lead modal

/**
 * Modern APRO Header
 * - Sticky, glassy, compact-on-scroll
 * - Scroll progress indicator
 * - Centered primary nav + "More" overflow menu
 * - Mobile drawer
 * - Accessible (keyboard, ARIA), SSR-safe
 *
 * Tailwind required. No external UI deps.
 */

type NavItem = {
  label: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
};

// -- Tune these lists for your IA -------------------------------------------
const PRIMARY_LINKS: NavItem[] = [
  { label: "Models", href: "#models" },
  { label: "Technology", href: "#technology" },
  { label: "Industries", href: "#industries" },
  { label: "Resources", href: "#resources" },
  { label: "Support", href: "#support" },
  { label: "About", href: "#about" },
];

const MORE_LINKS: NavItem[] = [
  { label: "TCO Calculator", href: "#tco" },
  { label: "Fleet", href: "#fleet" },
  { label: "Warranty & Service", href: "#service" },
  { label: "Configurator", href: "#configurator" },
];
// ---------------------------------------------------------------------------

function useScrollState() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 8);
      const doc = document.documentElement;
      const total = (doc.scrollHeight - doc.clientHeight) || 1;
      const p = Math.min(100, Math.max(0, (y / total) * 100));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrolled, progress };
}

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function Header() {
  const { scrolled, progress } = useScrollState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    // lock body scroll when mobile drawer open
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const headerClasses = useMemo(
    () =>
      classNames(
        "sticky top-0 z-50 transition-all duration-300",
        "border-b border-transparent",
        scrolled
          ? "backdrop-blur bg-white/70 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800/60 shadow-sm"
          : "bg-transparent"
      ),
    [scrolled]
  );

  const barStyle: React.CSSProperties = {
    width: `${progress}%`,
    background: "var(--brand, linear-gradient(90deg,#10b981,#22d3ee))",
  };

  const NavLink: React.FC<{ item: NavItem; onClick?: () => void }> = ({ item, onClick }) => (
    <a
      href={item.href || "#"}
      onClick={(e) => {
        if (item.onClick) {
          e.preventDefault();
          item.onClick();
        }
        onClick?.();
      }}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className={classNames(
        "group relative inline-flex items-center px-3 py-2 text-sm font-medium",
        "text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
      )}
    >
      {item.label}
      <span
        className="pointer-events-none absolute inset-x-2 -bottom-0.5 h-px scale-x-0 bg-current opacity-40 transition-transform duration-200 group-hover:scale-x-100"
        aria-hidden
      />
    </a>
  );

  return (
    <header className={headerClasses} role="banner">
      {/* Scroll progress bar */}
      <div className="h-0.5 w-full" aria-hidden>
        <div className="h-full" style={barStyle} />
      </div>

      <div
        className={classNames(
          "mx-auto flex w-full max-w-7xl items-center gap-3 px-4 md:px-6",
          scrolled ? "h-14" : "h-16"
        )}
      >
        {/* Left: Brand */}
        <a
          href="/"
          className="flex items-center gap-2 font-black tracking-wider text-slate-900 dark:text-white"
          aria-label="APRO – Home"
        >
          {/* If you have a logo image, swap this text for <img .../> */}
          <span className="text-lg md:text-xl">APRO</span>
        </a>

        {/* Center: Primary nav (desktop) */}
        <nav className="mx-auto hidden md:flex items-center">
          <ul className="flex items-center gap-1">
            {PRIMARY_LINKS.map((item) => (
              <li key={item.label}>
                <NavLink item={item} />
              </li>
            ))}

            {/* More dropdown */}
            {MORE_LINKS.length > 0 && (
              <li className="relative">
                <button
                  type="button"
                  onClick={() => setMoreOpen((v) => !v)}
                  onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
                  className={classNames(
                    "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium",
                    "text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
                  )}
                  aria-haspopup="menu"
                  aria-expanded={moreOpen}
                >
                  More <ChevronDown className="h-4 w-4" />
                </button>
                {moreOpen && (
                  <div
                    role="menu"
                    className="absolute left-0 mt-2 min-w-[14rem] overflow-hidden rounded-xl border border-slate-200/70 bg-white/90 backdrop-blur-md shadow-lg dark:border-slate-800/60 dark:bg-slate-900/90"
                  >
                    {MORE_LINKS.map((m) => (
                      <a
                        key={m.label}
                        href={m.href || "#"}
                        onClick={(e) => {
                          if (m.onClick) {
                            e.preventDefault();
                            m.onClick();
                          }
                          setMoreOpen(false);
                        }}
                        className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800/60"
                        role="menuitem"
                      >
                        {m.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>

        {/* Right: CTAs */}
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => openLead("header")}
            className={classNames(
              "hidden md:inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold",
              "text-white shadow-sm",
              "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800",
              "dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-900"
            )}
          >
            Talk to Sales
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5 text-slate-900 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={classNames(
          "fixed inset-0 z-50 md:hidden transition-opacity",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className={classNames(
            "absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <aside
          className={classNames(
            "absolute right-0 top-0 h-full w-[82%] max-w-sm",
            "bg-white dark:bg-slate-900 shadow-xl",
            "transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 py-4">
            <span className="font-black tracking-wider text-slate-900 dark:text-white">APRO</span>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5 text-slate-900 dark:text-white" />
            </button>
          </div>

          <nav className="px-2 pb-6">
            <ul className="space-y-1">
              {[...PRIMARY_LINKS, ...MORE_LINKS].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href || "#"}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                      setMobileOpen(false);
                    }}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/60"
                  >
                    {item.label}
                  </a>
                </li)
              ))}
            </ul>

            <div className="mt-4 border-t border-slate-200/70 pt-4 dark:border-slate-800/60">
              <button
                onClick={() => {
                  openLead("header-mobile");
                  setMobileOpen(false);
                }}
                className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-700 active:bg-emerald-800 dark:bg-emerald-500 dark:text-slate-900 dark:hover:bg-emerald-400"
              >
                Talk to Sales
              </button>
            </div>
          </nav>

          <div className="px-4 pb-6 text-xs text-slate-500/80">
            © {new Date().getFullYear()} APRO. All rights reserved.
          </div>
        </aside>
      </div>
    </header>
  );
}

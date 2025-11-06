import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "../services/analytics";
import { openLead } from "./LeadModal";

/** -------------------------------
 *  Config (no TS types to avoid parser issues)
 * --------------------------------*/
const LABELS = {
  models: "Models",
  technology: "Technology",
  industries: "Industries",
  compare: "Compare",import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { trackEvent } from "../services/analytics";
import { openLead } from "./LeadModal";

/* ---------- types ---------- */
type NavItem = { id: string; label: string };

/* ---------- tiny helpers (ASCII only) ---------- */
const USER_KEY = "theme_user_pref";

function isNightNow(d: Date = new Date()): boolean {
  const h = d.getHours();
  return h >= 19 || h < 7;
}

function applyThemeClass(isDark: boolean): void {
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}

function labelOf(id: string): string {
  switch (id) {
    case "models": return "Models";
    case "technology": return "Technology";
    case "industries": return "Industries";
    case "compare": return "Compare";
    case "charging": return "Charging";
    case "resources": return "Resources";
    case "support": return "Support";
    case "timeline": return "Timeline";
    case "configurator": return "Configurator";
    case "fleet": return "Fleet";
    case "service": return "Service";
    case "contact": return "Contact";
    default: return id;
  }
}

const CANDIDATE_IDS: string[] = [
  "models",
  "technology",
  "industries",
  "compare",
  "charging",
  "resources",
  "support",
  "timeline",
  "configurator",
  "fleet",
  "service",
  "contact",
];

function getDocTop(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
  return rect.top + scrollY;
}

function setHeaderVar(px: number): void {
  document.documentElement.style.setProperty("--header-h", String(px) + "px");
}

function useTheme2State(): {
  theme: "light" | "dark";
  toggle: () => void;
  icon: string;
  label: string;
} {
  const [userPref, setUserPref] = useState<"light" | "dark" | null>(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw === "light" || raw === "dark" ? raw : null;
  });

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem(USER_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return isNightNow() ? "dark" : "light";
  });

  useEffect(() => {
    applyThemeClass(theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (userPref) return;
    const tick = () => {
      const want: "light" | "dark" = isNightNow() ? "dark" : "light";
      setTheme((cur) => (cur !== want ? want : cur));
    };
    tick();
    const id = window.setInterval(tick, 5 * 60 * 1000);
    return () => window.clearInterval(id);
  }, [userPref]);

  const toggle = useCallback(() => {
    setTheme((cur) => {
      const next: "light" | "dark" = cur === "light" ? "dark" : "light";
      localStorage.setItem(USER_KEY, next);
      setUserPref(next);
      trackEvent("theme_toggle_click", { to: next });
      return next;
    });
  }, []);

  return {
    theme,
    toggle,
    icon: theme === "dark" ? "🌙" : "☀️",
    label: theme === "dark" ? "Theme: dark" : "Theme: light",
  };
}

/* ---------- Component ---------- */
export default function Header(): JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>("");
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const { toggle: toggleTheme, icon: themeIcon, label: themeLabel } = useTheme2State();

  const firstMobileLinkRef = useRef<HTMLButtonElement | null>(null);
  const desktopScrollRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const apply = () => setHeaderVar(el.offsetHeight);
    apply();

    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener("resize", apply);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let t: number | undefined;

    const recalc = () => {
      const existing: NavItem[] = CANDIDATE_IDS
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((x): x is { id: string; el: HTMLElement } => x.el instanceof HTMLElement)
        .sort((a, b) => getDocTop(a.el) - getDocTop(b.el))
        .map(({ id }) => ({ id, label: labelOf(id) }));
      setNavItems(existing);
    };

    recalc();
    window.addEventListener("load", recalc);

    const onResize = () => {
      if (t !== undefined) window.clearTimeout(t);
      t = window.setTimeout(recalc, 120);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("load", recalc);
      window.removeEventListener("resize", onResize);
      if (t !== undefined) window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!navItems.length) return;

    const io = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          );
        if (visible.length) setActive(visible[0].target.id);
      },
      { root: null, rootMargin: "-30% 0px -30% 0px", threshold: [0, 0.2, 0.5, 1] }
    );

    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });

    const onScrollBottomFallback = () => {
      const atBottom =
        window.innerHeight + (window.scrollY || 0) >=
        (document.scrollingElement?.scrollHeight ||
          document.body.scrollHeight) - 2;
      if (atBottom && navItems.length) setActive(navItems[navItems.length - 1].id);
    };
    window.addEventListener("scroll", onScrollBottomFallback, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScrollBottomFallback);
    };
  }, [navItems]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : original || "";
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onNavClick = useCallback((id: string) => {
    setMobileOpen(false);
    trackEvent("nav_click", { id, where: "header" });
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState({}, "", "#" + id);
    }
  }, []);

  const onTalkToSales = useCallback(() => {
    openLead("Header CTA");
    trackEvent("cta_click", { where: "header", label: "Talk to Sales" });
  }, []);

  const Brand = useMemo<JSX.Element>(() => (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        history.pushState({}, "", "#top");
      }}
      className="inline-flex items-center gap-2 font-extrabold tracking-tight text-lg lg:text-xl whitespace-nowrap"
      aria-label="APRO Home"
    >
      <span>APRO</span>
    </a>
  ), []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:px-3 focus:py-2 focus:rounded-md focus:bg-black focus:text-white"
      >
        Skip to content
      </a>

      <header
        ref={headerRef}
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all",
          scrolled
            ? "bg-white/90 dark:bg-black/70 backdrop-blur-md shadow-sm"
            : "bg-transparent dark:bg-transparent",
          "border-b border-transparent",
        ].join(" ")}
        role="banner"
      >
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-center gap-3 h-16 lg:h-20">
            <div className="flex-none">{Brand}</div>

            <div className="relative hidden lg:flex flex-1 min-w-0 items-center justify-center px-2">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white/90 dark:from-black/70 to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white/90 dark:from-black/70 to-transparent" />
              <div
                ref={desktopScrollRef}
                className="mx-auto overflow-x-auto overscroll-x-contain"
                style={{ scrollbarWidth: "thin", maxWidth: "min(760px, calc(100vw - 280px))" }}
              >
                <ul className="flex items-center gap-1 whitespace-nowrap pr-6">
                  {navItems.map((item) => {
                    const isActive = active === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => onNavClick(item.id)}
                          className={[
                            "px-3 py-2 rounded-full text-sm font-medium transition-all",
                            "hover:-translate-y-0.5 hover:shadow-sm",
                            isActive
                              ? "bg-black text-white dark:bg-white dark:text-black"
                              : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20",
                          ].join(" ")}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-none ml-auto">
              <button
                type="button"
                onClick={toggleTheme}
                title={themeLabel}
                aria-label={themeLabel}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
              >
                <span aria-hidden="true" className="text-base leading-none">
                  {themeIcon}
                </span>
              </button>

              <button
                type="button"
                onClick={onTalkToSales}
                className="hidden md:inline-flex h-10 shrink-0 items-center justify-center px-4 rounded-full text-sm font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 whitespace-nowrap"
                title="Talk to Sales"
              >
                Talk to Sales
              </button>

              <button
                type="button"
                className="inline-flex lg:hidden items-center justify-center w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-drawer"
                onClick={() => {
                  setMobileOpen((v) => !v);
                  window.setTimeout(() => firstMobileLinkRef.current?.focus(), 60);
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={[
            "lg:hidden fixed inset-0 z-40 transition-opacity",
            mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          ].join(" ")}
          aria-hidden={!mobileOpen}
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/70" />

          <div
            id="mobile-drawer"
            className={[
              "absolute right-0 top-0 h-[100dvh] w-[86%] max-w-sm",
              "bg-white dark:bg-zinc-950",
              "border-l border-zinc-200 dark:border-zinc-800 shadow-xl",
              "transition-transform duration-200",
              mobileOpen ? "translate-x-0" : "translate-x-full",
              "flex flex-col",
            ].join(" ")}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between h-16 px-4">
              <div className="font-extrabold">APRO</div>
              <button
                type="button"
                className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6l-12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="px-4 pb-6 overflow-y-auto flex-1">
              <div className="py-3">
                <button
                  ref={firstMobileLinkRef}
                  type="button"
                  onClick={() => {
                    onTalkToSales();
                    setMobileOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 whitespace-nowrap"
                >
                  Talk to Sales
                </button>
              </div>

              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onNavClick(item.id)}
                        className={[
                          "w-full text-left px-4 py-3 rounded-lg text-[15px] font-medium transition",
                          "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                          isActive ? "bg-zinc-100 dark:bg-zinc-800" : "",
                        ].join(" ")}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="h-6" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { trackEvent } from "../services/analytics";
import { openLead } from "./LeadModal";

/** -------------------------------
 *  Config
 * --------------------------------*/
type NavItem = { id: string; label: string };

const LABELS: Record<string, string> = {
  models: "Models",
  technology: "Technology",
  industries: "Industries",
  compare: "Compare",
  charging: "Charging",
  resources: "Resources",
  support: "Support",
  timeline: "Timeline",
  configurator: "Configurator",
  fleet: "Fleet",
  service: "Service",
  contact: "Contact",
};

const CANDIDATE_IDS = [
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

// Static top-level pages
const PAGE_LINKS = [
  { to: "/about", label: "Company" },
  { to: "/partners", label: "Partners" },
] as const;

/** -------------------------------
 *  Theme (time-based default + 2-state user toggle)
 * --------------------------------*/
type UserPref = "light" | "dark" | null;
const USER_KEY = "theme_user_pref";

function isNightNow(d: Date = new Date()) {
  const h = d.getHours();
  return h >= 19 || h < 7;
}
function applyThemeClass(isDark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}
function useTheme2State() {
  const [userPref, setUserPref] = useState<UserPref>(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw === "light" || raw === "dark" ? (raw as UserPref) : null;
  });
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem(USER_KEY) as UserPref;
    if (saved) return saved;
    return isNightNow() ? "dark" : "light";
  });

  useEffect(() => {
    applyThemeClass(theme === "dark");
  }, [theme]);

  // auto-switch by time only when user hasn’t chosen
  useEffect(() => {
    if (userPref) return;
    const tick = () => {
      const want = isNightNow() ? "dark" : "light";
      setTheme((cur) => (cur !== want ? want : cur));
    };
    tick();
    const id = window.setInterval(tick, 5 * 60 * 1000);
    return () => window.clearInterval(id);
  }, [userPref]);

  const toggle = useCallback(() => {
    setTheme((cur) => {
      const next = cur === "light" ? "dark" : "light";
      localStorage.setItem(USER_KEY, next);
      setUserPref(next);
      trackEvent("theme_toggle_click", { to: next });
      return next;
    });
  }, []);

  const icon = theme === "dark" ? "🌙" : "☀️";
  const label = theme === "dark" ? "Theme: dark" : "Theme: light";
  return { theme, toggle, icon, label };
}

/** -------------------------------
 *  Utils
 * --------------------------------*/
function getDocTop(el: Element) {
  const rect = el.getBoundingClientRect();
  const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
  return rect.top + scrollY;
}
function setHeaderVar(px: number) {
  const r = document.documentElement;
  r.style.setProperty("--header-h", `${px}px`);
}

/** -------------------------------
 *  Header
 * --------------------------------*/
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const { toggle: toggleTheme, icon: themeIcon, label: themeLabel } = useTheme2State();

  const firstMobileLinkRef = useRef<HTMLButtonElement | null>(null);
  const desktopScrollRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  /** Header height -> CSS var (remove spacer gap issues) */
  useLayoutEffect(() => {
    if (!headerRef.current) return;
    const el = headerRef.current;

    const apply = () => setHeaderVar(el.offsetHeight);
    apply();

    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();import React, {import React, { useEffect, useMemo, useState } from "react";
import { openLead } from "./LeadModal";

type NavItem = { label: string; href: string; external?: boolean };

const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Models", href: "/models" },
  { label: "Company", href: "/company" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function useScrolled(threshold = 4) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function applyTheme(next: "light" | "dark") {
  try {
    const root = document.documentElement;
    localStorage.setItem("theme", next);
    if (next === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  } catch {
    // no-op
  }
}

function getInitialTheme(): "light" | "dark" {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    // fallback to system
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    return mql.matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

export default function Header() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // 닫기: 라우팅 없이 해시/경로가 바뀌어도 닫히도록 처리
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const themeLabel = useMemo(() => (theme === "dark" ? "Light" : "Dark"), [theme]);

  const onClickCTA = () => {
    try {
      window.gtag?.("event", "lead_open_click", {
        event_category: "lead",
        source: "header_cta",
      });
    } catch {
      // no-op
    }
    openLead("header_cta");
    setMobileOpen(false);
  };

  const desktopNav = (
    <nav aria-label="Primary" className="hidden lg:flex items-center gap-6">
      {NAV_LINKS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          rel={item.external ? "noopener noreferrer" : undefined}
          target={item.external ? "_blank" : undefined}
          className="text-sm text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );

  const ThemeButton = (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex h-10 items-center rounded-full border border-zinc-300 px-3 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
    >
      {themeLabel} mode
    </button>
  );

  const CtaButton = (
    <button
      type="button"
      onClick={onClickCTA}
      className="inline-flex h-10 items-center rounded-full bg-black px-4 text-sm font-semibold text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
    >
      Talk to Sales
    </button>
  );

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50",
        "transition-shadow",
        scrolled ? "shadow-md/50 backdrop-blur bg-white/80 dark:bg-zinc-900/80" : "bg-transparent"
      )}
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Row */}
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <a
            href="/"
            className="flex items-center gap-2 rounded-lg px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
            aria-label="APRO Home"
          >
            {/* Simple text logo to avoid asset coupling */}
            <span className="text-lg font-extrabold tracking-tight text-black dark:text-white">
              APRO
            </span>
          </a>

          {/* Center: Desktop nav */}
          {desktopNav}

          {/* Right: actions */}
          <div className="hidden lg:flex items-center gap-3">
            {ThemeButton}
            {CtaButton}
          </div>

          {/* Mobile burger */}
          <div className="lg:hidden">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="inline-grid h-10 w-10 place-items-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
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
        className={cx(
          "lg:hidden fixed inset-0 z-[60]",
          mobileOpen ? "block" : "hidden"
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl dark:bg-zinc-900"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
            <span className="text-base font-semibold text-black dark:text-white">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="inline-grid h-10 w-10 place-items-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile" className="px-2 py-2">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                rel={item.external ? "noopener noreferrer" : undefined}
                target={item.external ? "_blank" : undefined}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-3 text-base text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
            <div className="flex-1">{ThemeButton}</div>
            {CtaButton}
          </div>

          <div className="px-4 pb-6 pt-2 text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} APRO. All rights reserved.
          </div>
        </div>
      </div>
    </header>
  );
}

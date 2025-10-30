import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

/** -------------------------------
 *  Theme (Cycle: light → dark → system)
 * --------------------------------*/
type ThemeMode = "light" | "dark" | "system";

function useThemeCycle() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const v = localStorage.getItem("theme") as ThemeMode | null;
    return v ?? "system";
  });

  const apply = useCallback((m: ThemeMode) => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const effectiveDark = m === "dark" || (m === "system" && prefersDark);
    root.classList.toggle("dark", !!effectiveDark);
    root.style.colorScheme = effectiveDark ? "dark" : "light";
  }, []);

  useEffect(() => {
    apply(mode);
    localStorage.setItem("theme", mode);
  }, [mode, apply]);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onChange = () => {
      const saved = (localStorage.getItem("theme") as ThemeMode | null) ?? "system";
      if (saved === "system") apply("system");
    };
    mq?.addEventListener?.("change", onChange);
    return () => mq?.removeEventListener?.("change", onChange);
  }, [apply]);

  const cycle = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : prev === "dark" ? "system" : "light"));
    trackEvent("theme_cycle_click", {});
  }, []);

  const icon = mode === "light" ? "☀️" : mode === "dark" ? "🌙" : "🖥️";
  const label = `Theme: ${mode}`;

  return { mode, cycle, icon, label };
}

/** -------------------------------
 *  Utils
 * --------------------------------*/
function getDocTop(el: Element) {
  const rect = el.getBoundingClientRect();
  const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
  return rect.top + scrollY;
}

/** -------------------------------
 *  Header
 * --------------------------------*/
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const { cycle, icon: themeIcon, label: themeLabel } = useThemeCycle();

  const firstMobileLinkRef = useRef<HTMLButtonElement | null>(null);
  const desktopScrollRef = useRef<HTMLDivElement | null>(null);

  /** Shadow / bg */
  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Build nav by actual DOM order */
  useEffect(() => {
    let t: number | undefined;
    const recalc = () => {
      const existing = CANDIDATE_IDS
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((x): x is { id: string; el: HTMLElement } => !!x.el)
        .sort((a, b) => getDocTop(a.el) - getDocTop(b.el))
        .map(({ id }) => ({ id, label: LABELS[id] || id }));
      setNavItems(existing);
    };
    recalc();
    window.addEventListener("load", recalc);
    const onResize = () => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(recalc, 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("load", recalc);
      window.removeEventListener("resize", onResize);
      if (t) window.clearTimeout(t);
    };
  }, []);

  /** Active section highlight (with bottom-of-page fallback) */
  useEffect(() => {
    if (!navItems.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        if (visible.length) {
          setActive(visible[0].target.id);
        }
      },
      {
        root: null,
        // 넉넉한 마진으로 하단 섹션도 안정적으로 활성화
        rootMargin: "-30% 0px -30% 0px",
        threshold: [0, 0.2, 0.5, 1],
      }
    );

    const targets: HTMLElement[] = [];
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) {
        io.observe(el);
        targets.push(el);
      }
    });

    const onScrollBottomFallback = () => {
      const atBottom =
        window.innerHeight + (window.scrollY || 0) >=
        (document.scrollingElement?.scrollHeight || document.body.scrollHeight) - 2;
      if (atBottom && navItems.length) {
        setActive(navItems[navItems.length - 1].id); // 마지막 섹션 활성
      }
    };
    window.addEventListener("scroll", onScrollBottomFallback, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScrollBottomFallback);
    };
  }, [navItems]);

  /** Lock body when mobile drawer open */
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : original || "";
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [mobileOpen]);

  /** Close on ESC */
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
      history.pushState({}, "", `#${id}`);
    }
  }, []);

  const onTalkToSales = useCallback(() => {
    openLead("Header CTA");
    trackEvent("cta_click", { where: "header", label: "Talk to Sales" });
  }, []);

  const Brand = useMemo(
    () => (
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
    ),
    []
  );

  /** -------------------------------
   *  Render
   * --------------------------------*/
  return (
    <>
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:px-3 focus:py-2 focus:rounded-md focus:bg-black focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all",
          scrolled
            ? "bg-white/90 dark:bg-black/70 backdrop-blur-md shadow-sm"
            : "bg-transparent dark:bg-transparent",
        ].join(" ")}
        role="banner"
      >
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-center gap-3 h-16 lg:h-20">
            {/* Left: Brand (no overlap) */}
            <div className="flex-none">{Brand}</div>

            {/* Center: Desktop Nav — 가로 스크롤 가능 + 마스크 페이드, 로고와 겹치지 않음 */}
            <div className="relative hidden lg:flex flex-1 min-w-0 items-center justify-center px-2">
              {/* Edge fade masks */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white/90 dark:from-black/70 to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white/90 dark:from-black/70 to-transparent" />
              <div
                ref={desktopScrollRef}
                className="mx-auto max-w-[720px] overflow-x-auto overscroll-x-contain"
                style={{ scrollbarWidth: "thin" }}
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

            {/* Right: CTA + Theme + Hamburger */}
            <div className="flex items-center gap-2 flex-none">
              {/* Theme Cycle (icon-only) */}
              <button
                type="button"
                onClick={cycle}
                title={themeLabel}
                aria-label={themeLabel}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
              >
                <span aria-hidden="true" className="text-base leading-none">{themeIcon}</span>
              </button>

              {/* CTA on md+; 모바일은 드로어 내부 */}
              <button
                type="button"
                onClick={onTalkToSales}
                className="hidden md:inline-flex shrink-0 items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 whitespace-nowrap"
                title="Talk to Sales"
              >
                Talk to Sales
              </button>

              {/* Hamburger (mobile only) */}
              <button
                type="button"
                className="inline-flex lg:hidden items-center justify-center w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-drawer"
                onClick={() => {
                  setMobileOpen((v) => !v);
                  setTimeout(() => firstMobileLinkRef.current?.focus(), 60);
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Overlay */}
        <div
          className={[
            "lg:hidden fixed inset-0 z-40 transition-opacity",
            mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          ].join(" ")}
          aria-hidden={!mobileOpen}
          onClick={() => setMobileOpen(false)}
        >
          {/* 더 진한 스크림 */}
          <div className="absolute inset-0 bg-black/70" />

          {/* Drawer */}
          <div
            id="mobile-drawer"
            className={[
              "absolute right-0 top-0 h-[100dvh] w-[86%] max-w-sm",
              // 완전 불투명으로 가독성 최대화
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
            {/* Drawer header */}
            <div className="flex items-center justify-between h-16 px-4">
              <div className="font-extrabold">APRO</div>
              <div className="flex items-center gap-2">
                {/* Theme button in drawer too */}
                <button
                  type="button"
                  onClick={cycle}
                  title={themeLabel}
                  aria-label={themeLabel}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70"
                >
                  <span aria-hidden="true" className="text-base leading-none">{themeIcon}</span>
                </button>
                <button
                  type="button"
                  className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div
              className="px-4 pb-6 overflow-y-auto"
              style={{ maxHeight: "calc(100dvh - 64px)" }}
            >
              {/* CTA */}
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

              {/* Menu — DOM 순서 반영 */}
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

              {/* bottom padding */}
              <div className="h-6" />
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div aria-hidden className="h-16 lg:h-20" />
    </>
  );
}

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { trackEvent } from "../services/analytics";
import { openLead } from "./LeadModal";

/** -------------------------------
 *  Config
 * --------------------------------*/
type NavItem = { id: string; label: string };

const LABELS: Record<string, string> = {
  company: "Company",
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
  partners: "Partners",
  contact: "Contact",
};

const CANDIDATE_IDS = [
  "company",
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
  "partners",
  "contact",
] as const;

/** -------------------------------
 *  Theme (2-state toggle + time-of-day auto if unset)
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

/** Header height → CSS var */
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
  const { toggle: toggleTheme, icon: themeIcon, label: themeLabel } =
    useTheme2State();

  const firstMobileLinkRef = useRef<HTMLButtonElement | null>(null);
  const desktopScrollRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  // moving underline indicator
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number; visible: boolean }>({
    left: 0,
    width: 0,
    visible: false,
  });

  const updateIndicator = useCallback(
    (id?: string) => {
      const curId = id ?? active;
      const wrap = desktopScrollRef.current;
      const btn = curId ? buttonRefs.current[curId] : null;
      if (!wrap || !btn) {
        setIndicator((p) => ({ ...p, visible: false }));
        return;
      }
      const left = btn.offsetLeft - wrap.scrollLeft;
      const width = btn.offsetWidth;
      setIndicator({ left, width, visible: true });
    },
    [active]
  );

  useEffect(() => {
    updateIndicator();
  }, [active, updateIndicator]);

  useEffect(() => {
    const wrap = desktopScrollRef.current;
    if (!wrap) return;
    const onScroll = () => updateIndicator();
    const onResize = () => updateIndicator();
    wrap.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      wrap.removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", onResize);
    };
  }, [updateIndicator]);

  /** Header height → CSS var */
  useLayoutEffect(() => {
    if (!headerRef.current) return;
    const el = headerRef.current;

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
        .filter((x): x is { id: string; el: HTMLElement } => !!x && !!x.el)
        .sort((a, b) => getDocTop(a.el) - getDocTop(b.el))
        .map(({ id }) => ({ id, label: LABELS[id] || id }));
      setNavItems(existing);
      // after navItems update, line will be updated by effect watching "active"
      setTimeout(() => updateIndicator(existing[0]?.id), 0);
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
  }, [updateIndicator]);

  /** Active section highlight + bottom fallback */
  useEffect(() => {
    if (!navItems.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          );
        if (visible.length) setActive((visible[0].target as HTMLElement).id);
      },
      { root: null, rootMargin: "-30% 0px -30% 0px", threshold: [0, 0.2, 0.5, 1] }
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
            {/* Left: Brand */}
            <div className="flex-none">{Brand}</div>

            {/* Center: Desktop Nav */}
            <div className="relative hidden lg:flex flex-1 min-w-0 items-center justify-center px-2">
              {/* soft fades at edges */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white/90 dark:from-black/70 to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white/90 dark:from-black/70 to-transparent" />

              <div
                ref={desktopScrollRef}
                className="relative mx-auto overflow-x-auto overscroll-x-contain pb-[10px]"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  maxWidth: "min(820px, calc(100vw - 280px))",
                }}
              >
                {/* floating underline indicator */}
                <div
                  ref={indicatorRef}
                  className={[
                    "pointer-events-none absolute bottom-[2px] h-[2px] rounded-full",
                    "bg-gradient-to-r from-zinc-900/80 via-zinc-900/90 to-zinc-900/80",
                    "dark:from-white/70 dark:via-white/90 dark:to-white/70",
                    "transition-all duration-300 ease-out",
                  ].join(" ")}
                  style={{
                    left: indicator.left,
                    width: indicator.width,
                    opacity: indicator.visible ? 1 : 0,
                  }}
                />

                <ul className="relative flex items-center gap-2 whitespace-nowrap pr-6">
                  {navItems.map((item) => {
                    const isActive = active === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          ref={(el) => (buttonRefs.current[item.id] = el)}
                          onClick={() => onNavClick(item.id)}
                          className={[
                            "px-3 py-2 rounded-md text-sm font-medium transition-all",
                            "hover:-translate-y-0.5 hover:opacity-90",
                            isActive
                              ? "text-zinc-900 dark:text-white"
                              : "text-zinc-700 dark:text-zinc-300",
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

            {/* Right: Theme + CTA + Hamburger */}
            <div className="flex items-center gap-2 flex-none ml-auto">
              {/* Theme toggle */}
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

              {/* CTA on md+; mobile → in drawer */}
              <button
                type="button"
                onClick={onTalkToSales}
                className="hidden md:inline-flex h-10 shrink-0 items-center justify-center px-4 rounded-full text-sm font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 whitespace-nowrap"
                title="Talk to Sales"
              >
                Talk to Sales
              </button>

              {/* Hamburger */}
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

        {/* Mobile Drawer Overlay */}
        <div
          className={[
            "lg:hidden fixed inset-0 z-40 transition-opacity",
            mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          ].join(" ")}
          aria-hidden={!mobileOpen}
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/70" />

          {/* Drawer */}
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
            {/* Drawer header */}
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

            {/* Scrollable content */}
            <div className="px-4 pb-6 overflow-y-auto flex-1">
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

              {/* Menu — DOM order based */}
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

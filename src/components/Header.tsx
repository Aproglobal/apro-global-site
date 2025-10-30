import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "../services/analytics";
import { openLead } from "./LeadModal";

type NavItem = { id: string; label: string };

// 라벨 사전 (DOM 자동 정렬 시 사용)
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

// 후보 섹션 ID (존재하는 것만 자동 취합)
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

function getDocTop(el: Element) {
  const rect = el.getBoundingClientRect();
  const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
  return rect.top + scrollY;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [navItems, setNavItems] = useState<NavItem[]>([]); // ✅ 실제 DOM 순서 기반 메뉴

  const firstMobileLinkRef = useRef<HTMLButtonElement | null>(null);

  // ----- Scroll background / shadow
  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ----- 실제 DOM 순서로 메뉴 재구성 (로드/리사이즈에 반응)
  useEffect(() => {
    let timer: number | undefined;

    const recalc = () => {
      const existing = CANDIDATE_IDS
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((x): x is { id: string; el: HTMLElement } => !!x.el)
        .sort((a, b) => getDocTop(a.el) - getDocTop(b.el))
        .map(({ id }) => ({ id, label: LABELS[id] || id }));

      setNavItems(existing);
    };

    // 초기 + load(이미지 로드 후 레이아웃 안정) + resize 디바운스
    recalc();
    window.addEventListener("load", recalc);
    const onResize = () => {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(recalc, 120);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("load", recalc);
      window.removeEventListener("resize", onResize);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  // ----- Active section highlighting (동적 navItems 기준)
  useEffect(() => {
    if (!navItems.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        if (visible.length) setActive(visible[0].target.id);
      },
      {
        root: null,
        rootMargin: "-25% 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 1],
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

    return () => io.disconnect();
  }, [navItems]);

  // ----- Lock body scroll when mobile menu open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : original || "";
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [mobileOpen]);

  // ----- Close on ESC
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
        className="inline-flex items-center gap-2 font-extrabold tracking-tight text-lg lg:text-xl"
        aria-label="APRO Home"
      >
        <span>APRO</span>
      </a>
    ),
    []
  );

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
            ? "bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-sm"
            : "bg-transparent dark:bg-transparent backdrop-blur-0",
        ].join(" ")}
        role="banner"
      >
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-center justify-between gap-3 h-16 lg:h-20">
            {/* Left: Brand */}
            <div className="min-w-0 flex-1 flex items-center">{Brand}</div>

            {/* Center: Desktop Nav (no wrap, only on lg+) */}
            <nav className="hidden lg:flex items-center justify-center flex-none">
              <ul className="flex items-center gap-1 whitespace-nowrap">
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
            </nav>

            {/* Right: CTA + Hamburger */}
            <div className="flex items-center gap-2 flex-none">
              {/* CTA on md+; 모바일은 드로어 내부에 배치 */}
              <button
                type="button"
                onClick={onTalkToSales}
                className="hidden md:inline-flex shrink-0 items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 whitespace-nowrap"
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
                  setTimeout(() => firstMobileLinkRef.current?.focus(), 60);
                }}
              >
                <span className="sr-only">Menu</span>
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={[
            "lg:hidden fixed inset-0 z-40 transition-opacity",
            mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          ].join(" ")}
          aria-hidden={!mobileOpen}
          onClick={() => setMobileOpen(false)}
        >
          {/* ✅ 더 진한 스크림으로 가독성 향상 */}
          <div className="absolute inset-0 bg-black/70" />

          <div
            id="mobile-drawer"
            className={[
              "absolute right-0 top-0 h-full w-[86%] max-w-sm",
              // ✅ 거의 불투명 + 강한 블러로 배경 간섭 제거
              "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl",
              "border-l border-zinc-200 dark:border-zinc-800 shadow-xl",
              "transition-transform duration-200",
              mobileOpen ? "translate-x-0" : "translate-x-full",
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
                  <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="px-4 pb-6 overflow-y-auto">
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

              {/* ✅ 실제 DOM 순서를 그대로 반영한 메뉴 */}
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
                          "hover:bg-zinc-100/90 dark:hover:bg-zinc-800/90",
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

              <div className="mt-6 border-t border-zinc-200 dark:border-zinc-800 pt-4 text-xs text-zinc-500 dark:text-zinc-400">
                <p>© {new Date().getFullYear()} APRO. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Header spacer to prevent content jump */}
      <div aria-hidden className="h-16 lg:h-20" />
    </>
  );
}

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "../services/analytics";
import { openLead } from "./LeadModal";

type NavItem = { id: string; label: string };

const NAV_ITEMS: NavItem[] = [
  { id: "models", label: "Models" },
  { id: "technology", label: "Technology" },
  { id: "industries", label: "Industries" },
  { id: "compare", label: "Compare" },
  { id: "charging", label: "Charging" },
  { id: "resources", label: "Resources" },
  { id: "support", label: "Support" },
  { id: "timeline", label: "Timeline" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const firstMobileLinkRef = useRef<HTMLButtonElement | null>(null);
  const lastScrollY = useRef(0);

  // ----- Scroll background / shadow
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(y > 8);
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ----- Active section highlighting
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        if (visible.length) setActive(visible[0].target.id);
      },
      {
        // account for header height; highlight when the top of a section passes ~30% viewport
        root: null,
        rootMargin: "-25% 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

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
      // Update hash without jump
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
        {/* 텍스트 로고 (이미지 로고가 있다면 교체: <img src="/logo.svg" alt="APRO" className="h-6" /> ) */}
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
            ? "bg-white/75 dark:bg-black/50 backdrop-blur-md shadow-sm"
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
                {NAV_ITEMS.map((item) => {
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
              {/* CTA on md+ to keep header single-line; mobile CTA lives in drawer */}
              <button
                type="button"
                onClick={onTalkToSales}
                className="hidden md:inline-flex shrink-0 items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
              >
                Talk to Sales
              </button>

              <button
                type="button"
                className="inline-flex lg:hidden items-center justify-center w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                onClick={() => {
                  setMobileOpen((v) => !v);
                  // 다음 프레임에 포커스 이동
                  setTimeout(() => firstMobileLinkRef.current?.focus(), 60);
                }}
              >
                <span className="sr-only">Menu</span>
                {/* Hamburger icon */}
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

        {/* Mobile Drawer */}
        <div
          className={[
            "lg:hidden fixed inset-0 z-40 transition-opacity",
            mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          ].join(" ")}
          aria-hidden={!mobileOpen}
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50" />

          <div
            className={[
              "absolute right-0 top-0 h-full w-[86%] max-w-sm",
              "bg-white dark:bg-zinc-950 shadow-xl",
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
              <div className="py-3">
                <button
                  ref={firstMobileLinkRef}
                  type="button"
                  onClick={() => {
                    onTalkToSales();
                    setMobileOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
                >
                  Talk to Sales
                </button>
              </div>

              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onNavClick(item.id)}
                        className={[
                          "w-full text-left px-4 py-3 rounded-lg text-[15px] font-medium transition",
                          "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80",
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

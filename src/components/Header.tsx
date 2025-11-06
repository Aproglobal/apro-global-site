import React, { useEffect, useState } from "react";
import { openLead } from "./LeadModal";

type NavItem = { label: string; href: string; external?: boolean };

const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Models", href: "/models" },
  { label: "Company", href: "/company" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

// 간단한 스크롤 감지 훅 (문법 최소화)
function useScrolled(threshold: number = 4): boolean {
  const [scrolled, setScrolled] = useState<boolean>(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > threshold) setScrolled(true);
      else setScrolled(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// 다크모드 토글 (엄격모드 안전)
function applyTheme(next: "light" | "dark"): void {
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
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    return mql.matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

const Header: React.FC = () => {
  const scrolled = useScrolled(4);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const headerClass =
    "fixed inset-x-0 top-0 z-50 transition-shadow " +
    (scrolled ? "backdrop-blur bg-white/80 dark:bg-zinc-900/80 shadow-md" : "bg-transparent");

  const handleCtaClick = (): void => {
    try {
      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "lead_open_click", {
          event_category: "lead",
          source: "header_cta",
        });
      }
    } catch {
      // no-op
    }
    openLead("header_cta");
    setMobileOpen(false);
  };

  const handleThemeToggle = (): void => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  // 버튼/링크는 최대한 단순 JSX로 구성 (타입 인수/제네릭/헬퍼 없음)
  const ThemeButton = (
    <button
      type="button"
      onClick={handleThemeToggle}
      aria-label="Toggle theme"
      className="inline-flex h-10 items-center rounded-full border border-zinc-300 px-3 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );

  const CtaButton = (
    <button
      type="button"
      onClick={handleCtaClick}
      className="inline-flex h-10 items-center rounded-full bg-black px-4 text-sm font-semibold text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
    >
      Talk to Sales
    </button>
  );

  return (
    <header className={headerClass} role="banner">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 상단 바 */}
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <a
            href="/"
            className="flex items-center gap-2 rounded-lg px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
            aria-label="APRO Home"
          >
            <span className="text-lg font-extrabold tracking-tight text-black dark:text-white">
              APRO
            </span>
          </a>

          {/* 데스크탑 내비게이션 */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="text-sm text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* 데스크탑 액션 */}
          <div className="hidden lg:flex items-center gap-3">
            {ThemeButton}
            {CtaButton}
          </div>

          {/* 모바일 햄버거 */}
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

      {/* 모바일 드로어 */}
      {mobileOpen ? (
        <div className="lg:hidden fixed inset-0 z-[60]" aria-hidden={!mobileOpen}>
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
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
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
      ) : null}
    </header>
  );
};

export default Header;

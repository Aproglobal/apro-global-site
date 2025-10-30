// src/components/Header.tsx
import React from "react";
import { openLead } from "./LeadModal";
import { getThemeMode, setThemeMode, subscribeTheme } from "../utils/theme";
import { trackEvent } from "../services/analytics";

type Mode = "light" | "dark" | "system";

/** 상단 내비: 핵심 4개만 (Audi/Tesla식 슬림 IA) */
const NAV_LINKS = [
  { id: "models", label: "Models" },
  { id: "technology", label: "Technology" },
  { id: "service", label: "Service" },
  { id: "fleet", label: "Fleet" },
] as const;

/** 우측 고정 링크 (항상 보이게) */
const RIGHT_LINKS = [
  { id: "support", label: "Support" },
  { id: "contact", label: "Contact" },
] as const;

/* ---------------- Active section detector ---------------- */
function useActiveSection() {
  const [active, setActive] = React.useState<string>("");
  React.useEffect(() => {
    const targets = [...NAV_LINKS, ...RIGHT_LINKS]
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);

    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { root: null, rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return active;
}

/* ---------------- Theme: cycle-only (Auto → Light → Dark) ---------------- */
function ThemeCycleButton() {
  const [mode, setMode] = React.useState<Mode>(() => getThemeMode());

  React.useEffect(() => {
    const cleanupMaybe = subscribeTheme(() => setMode(getThemeMode()));
    // subscribeTheme의 반환이 함수일 수도/아닐 수도 있으므로 안전 처리
    return () => {
      if (typeof cleanupMaybe === "function") cleanupMaybe();
    };
  }, []);

  const order: Mode[] = ["system", "light", "dark"];
  const next = () => {
    const idx = order.indexOf(mode);
    const to = order[(idx + 1) % order.length];
    setThemeMode(to);
  };

  const label = mode === "system" ? "Auto" : mode === "light" ? "Light" : "Dark";
  const icon = mode === "system" ? "A" : mode === "light" ? "☀️" : "🌙";

  return (
    <button
      onClick={next}
      className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full border border-black/20 dark:border-white/20 text-sm shrink-0"
      title="Theme"
      aria-label={`Theme: ${label}`}
    >
      <span aria-hidden>{icon}</span>
      <span className="leading-none">{label}</span>
    </button>
  );
}

/* ---------------- Desktop center nav (scrollable with fade & arrows) ---------------- */
function DesktopNav({ active }: { active: string }) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(false);

  const updateOverflow = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  React.useEffect(() => {
    const el = scrollerRef.current;
    updateOverflow();
    el?.addEventListener("scroll", updateOverflow, { passive: true });
    window.addEventListener("resize", updateOverflow);
    return () => {
      el?.removeEventListener("scroll", updateOverflow as any);
      window.removeEventListener("resize", updateOverflow);
    };
  }, [updateOverflow]);

  const scrollBy = (dx: number) => {
    scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  };

  const linkCls = (isActive: boolean) =>
    [
      "px-2 py-1 rounded-md text-[15px] leading-none whitespace-nowrap transition-colors",
      "text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white",
      isActive ? "underline underline-offset-8 decoration-2" : "",
    ].join(" ");

  return (
    <div className="relative min-w-0 hidden lg:block">
      {/* 페이드 오버레이 */}
      {canLeft && (
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white/90 dark:from-black/70 to-transparent" />
      )}
      {canRight && (
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white/90 dark:from-black/70 to-transparent" />
      )}

      {/* 스크롤 버튼 */}
      <button
        type="button"
        onClick={() => scrollBy(-220)}
        className={[
          "hidden lg:flex items-center justify-center",
          "absolute -left-3 top-1/2 -translate-y-1/2 z-10",
          "h-8 w-8 rounded-full border border-zinc-300 dark:border-zinc-700",
          "bg-white/80 dark:bg-black/60 backdrop-blur",
          canLeft ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-label="Scroll left"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => scrollBy(220)}
        className={[
          "hidden lg:flex items-center justify-center",
          "absolute -right-3 top-1/2 -translate-y-1/2 z-10",
          "h-8 w-8 rounded-full border border-zinc-300 dark:border-zinc-700",
          "bg-white/80 dark:bg-black/60 backdrop-blur",
          canRight ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-label="Scroll right"
      >
        ›
      </button>

      {/* 실제 스크롤 컨테이너 */}
      <nav
        ref={scrollerRef}
        className="
          h-10 min-w-0 overflow-x-auto flex items-center gap-6
          justify-center
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
          px-1
        "
      >
        {NAV_LINKS.map((l) => {
          const isActive = active === l.id;
          return (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => trackEvent("headerNavClick", { target: l.id })}
              className={linkCls(isActive)}
              aria-current={isActive ? "true" : undefined}
            >
              {l.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

/* ---------------- Small screens: More menu ---------------- */
function MoreMenu() {
  const ALL_FOR_MENU = [...NAV_LINKS, ...RIGHT_LINKS];
  return (
    <details className="relative md:flex lg:hidden">
      <summary className="list-none cursor-pointer inline-flex items-center h-10 px-3 rounded-full border border-black/20 dark:border-white/20 text-sm select-none">
        Menu <span className="ml-1">▾</span>
      </summary>
      <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl p-2 z-50">
        {ALL_FOR_MENU.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={() => trackEvent("headerMoreClick", { target: l.id })}
            className="block px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {l.label}
          </a>
        ))}
      </div>
    </details>
  );
}

/* ---------------- Header ---------------- */
export default function Header() {
  const active = useActiveSection();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/75 dark:bg-black/75 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
      {/* auto | 1fr | auto, 중앙은 minmax(0,1fr)로 안전하게 수축/확장 */}
      <div className="max-w-6xl mx-auto px-5 h-16 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
        {/* Left: Logo (줄어들지 않게) */}
        <a
          href="#home"
          onClick={() => trackEvent("headerLogoClick")}
          className="text-black dark:text-white text-xl tracking-wide font-semibold justify-self-start leading-none shrink-0"
          aria-label="Go to top"
        >
          APRO
        </a>

        {/* Center: Slim nav */}
        <DesktopNav active={active} />

        {/* Right: Always-visible actions */}
        <div className="flex items-center justify-self-end gap-4 shrink-0">
          <MoreMenu />

          {/* 우측 텍스트 링크 (md+에서 노출) */}
          {RIGHT_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => trackEvent("headerRightLink", { target: l.id })}
              className="hidden md:inline-block text-sm text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}

          {/* 테마 사이클 버튼 (미니멀) */}
          <ThemeCycleButton />

          {/* 메인 CTA: 절대 줄바꿈 금지 */}
          <button
            onClick={() => {
              openLead("Header CTA");
              trackEvent("contactOpen", { where: "header", label: "Talk to Sales" });
            }}
            className="h-11 px-5 rounded-full bg-black text-white text-base font-semibold hover:opacity-90 dark:bg-white dark:text-black transition shadow-sm whitespace-nowrap shrink-0"
            aria-label="Talk to Sales"
          >
            Talk to Sales
          </button>
        </div>
      </div>
    </header>
  );
}

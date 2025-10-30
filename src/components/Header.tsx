// src/components/Header.tsx
import React from "react";
import { openLead } from "./LeadModal";
import { getThemeMode, setThemeMode, subscribeTheme } from "../utils/theme";
import { trackEvent } from "../services/analytics";

type Mode = "light" | "dark" | "system";

const ALL_LINKS = [
  { id: "models", label: "Models" },
  { id: "technology", label: "Technology" },
  { id: "industries", label: "Industries" },
  { id: "timeline", label: "Production" },
  { id: "service", label: "Service" },
  { id: "charging", label: "Charging" },
  { id: "resources", label: "Resources" },
  { id: "tco", label: "TCO" },
  { id: "configurator", label: "Configurator" },
  { id: "fleet", label: "Fleet" },
  { id: "support", label: "Support" },
  { id: "contact", label: "Contact" },
] as const;

const CORE_LINK_IDS = new Set([
  "models",
  "technology",
  "service",
  "charging",
  "fleet",
  "support",
]);

function useActiveSection() {
  const [active, setActive] = React.useState<string>("");
  React.useEffect(() => {
    const targets = ALL_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el
    );
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
    return () => {
      io.disconnect();
    };
  }, []);
  return active;
}

/** 유일한 테마 UI: 작은 사이클 버튼(모든 해상도에서 노출) */
function ThemeCycleButton() {
  const [mode, setMode] = React.useState<Mode>(() => getThemeMode());
  React.useEffect(() => {
    const unsub = subscribeTheme(() => setMode(getThemeMode()));
    return () => {
      unsub();
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

function DesktopNav({ active }: { active: string }) {
  const coreLinks = ALL_LINKS.filter((l) => CORE_LINK_IDS.has(l.id));
  const linkCls = (isActive: boolean) =>
    [
      "px-2 py-1 rounded-md text-[15px] leading-none transition-colors whitespace-nowrap",
      "text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white",
      isActive ? "underline underline-offset-8 decoration-2" : "",
    ].join(" ");

  return (
    <nav
      className="
        hidden lg:flex items-center h-10
        min-w-0                                /* ✅ Grid child가 overflow 되려면 필요 */
        overflow-x-auto flex-nowrap            /* ✅ 줄바꿈 금지 + 가로 스크롤 */
        justify-center                         /* 가운데 정렬 느낌 유지 */
        [scrollbar-width:none] [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden
        mx-2 px-1                              /* 좌우 숨김 여백 */
      "
    >
      {/* lg: 핵심 링크만 */}
      <div className="lg:flex xl:hidden flex-nowrap items-center gap-5">
        {coreLinks.map((l) => {
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
      </div>
      {/* xl+: 전체 링크 */}
      <div className="hidden xl:flex flex-nowrap items-center gap-6">
        {ALL_LINKS.map((l) => {
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
      </div>
    </nav>
  );
}

function MoreMenu() {
  return (
    <details className="relative md:flex lg:hidden">
      <summary className="list-none cursor-pointer inline-flex items-center h-10 px-3 rounded-full border border-black/20 dark:border-white/20 text-sm select-none">
        Menu <span className="ml-1">▾</span>
      </summary>
      <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl p-2 z-50">
        {ALL_LINKS.map((l) => (
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

export default function Header() {
  const active = useActiveSection();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/75 dark:bg-black/75 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
      {/* ✅ Grid 컬럼을 auto | 1fr | auto 로 변경 */}
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

        {/* Center: Nav (min-w-0은 nav 내부에 적용) */}
        <DesktopNav active={active} />

        {/* Right: Actions (줄어들지 않게) */}
        <div className="flex items-center justify-self-end gap-3 shrink-0">
          <MoreMenu />
          <ThemeCycleButton />
          <button
            onClick={() => {
              openLead("Header CTA");
              trackEvent("contactOpen", { where: "header", label: "Talk to Sales" });
            }}
            className="ml-1 h-11 px-5 rounded-full bg-black text-white text-base font-semibold hover:opacity-90 dark:bg-white dark:text-black transition shadow-sm whitespace-nowrap shrink-0"
            aria-label="Talk to Sales"
          >
            Talk to Sales
          </button>
        </div>
      </div>
    </header>
  );
}

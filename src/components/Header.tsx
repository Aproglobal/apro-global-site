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

// lg에서 보여줄 핵심 메뉴(겹침 방지), xl 이상에서 전체 노출
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
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return active;
}

function ThemeToggle() {
  const [mode, setMode] = React.useState<Mode>(() => getThemeMode());
  React.useEffect(() => {
    const unsub = subscribeTheme(() => setMode(getThemeMode()));
    return () => {
      unsub();
    };
  }, []);

  const OPTIONS = ["system", "light", "dark"] as const;
  const LABEL: Record<Mode, string> = { system: "Auto", light: "Light", dark: "Dark" };

  return (
    <div
      className="hidden lg:flex rounded-full border border-black/20 dark:border-white/20 overflow-hidden text-sm h-9"
      role="group"
      aria-label="Theme"
    >
      {OPTIONS.map((m) => (
        <button
          key={m}
          onClick={() => setThemeMode(m)}
          aria-pressed={mode === m}
          title={m === "system" ? "Follow OS theme" : LABEL[m]}
          className={[
            "px-3 py-1.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20",
            mode === m ? "bg-black text-white dark:bg-white dark:text-black" : "text-black dark:text-white",
          ].join(" ")}
        >
          {LABEL[m]}
        </button>
      ))}
    </div>
  );
}

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
      className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-black/20 dark:border-white/20 text-xs lg:hidden"
      title="Theme"
      aria-label={`Theme: ${label}`}
    >
      <span aria-hidden>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function DesktopNav({ active }: { active: string }) {
  // lg: 핵심 링크만, xl+: 전체 링크
  const coreLinks = ALL_LINKS.filter((l) => CORE_LINK_IDS.has(l.id));
  const extraLinks = ALL_LINKS.filter((l) => !CORE_LINK_IDS.has(l.id));

  const linkCls = (isActive: boolean) =>
    [
      "px-1.5 py-1 rounded-md text-sm transition-colors",
      "text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white",
      isActive ? "underline underline-offset-8 decoration-2" : "",
    ].join(" ");

  return (
    <nav className="hidden lg:flex items-center justify-center gap-6 text-sm h-9 whitespace-nowrap">
      {/* lg: 핵심 */}
      <div className="lg:flex xl:hidden flex-wrap items-center justify-center gap-6">
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

      {/* xl+: 전체 */}
      <div className="hidden xl:flex flex-wrap items-center justify-center gap-6">
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

/** 작은/중간 화면에서 겹침 방지를 위한 “More” 콜랩스 */
function MoreMenu() {
  return (
    <details className="relative md:flex lg:hidden">
      <summary className="list-none cursor-pointer inline-flex items-center h-9 px-3 rounded-full border border-black/20 dark:border-white/20 text-sm select-none">
        Menu
        <span className="ml-1">▾</span>
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
      {/* 3열 그리드: 좌 로고 / 중앙 네비(정중앙) / 우 액션 */}
      <div className="max-w-6xl mx-auto px-5 py-3 grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Left: Logo */}
        <a
          href="#home"
          onClick={() => trackEvent("headerLogoClick")}
          className="text-black dark:text-white text-xl tracking-wide font-semibold justify-self-start"
          aria-label="Go to top"
        >
          APRO
        </a>

        {/* Center: Nav (가운데 정렬) */}
        <DesktopNav active={active} />

        {/* Right: Actions */}
        <div className="flex items-center justify-self-end gap-2">
          <MoreMenu />
          <ThemeCycleButton />
          <ThemeToggle />
          <button
            onClick={() => {
              openLead("Header CTA");
              trackEvent("contactOpen", { where: "header", label: "Talk to Sales" });
            }}
            className="ml-1 h-9 px-3 rounded-full bg-black text-white text-xs font-semibold hover:opacity-90 dark:bg-white dark:text-black transition md:text-sm md:px-4"
            aria-label="Talk to Sales"
          >
            Talk to Sales
          </button>
        </div>
      </div>
    </header>
  );
}

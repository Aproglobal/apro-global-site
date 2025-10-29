import React from "react";
import { openLead } from "./LeadModal";
import { getThemeMode, setThemeMode, subscribeTheme } from "../utils/theme";

type Mode = "light" | "dark" | "system";

function ThemeToggle() {
  const [mode, setMode] = React.useState<Mode>(() => getThemeMode());
  React.useEffect(() => {
    const unsub = subscribeTheme(() => setMode(getThemeMode()));
    return () => { unsub(); };
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
            mode === m
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-black dark:text-white",
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
    return () => { unsub(); };
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

/** 작은/중간 화면에서 겹침 방지를 위한 “More” 콜랩스 */
function MoreMenu() {
  return (
    <details className="relative md:flex lg:hidden">
      <summary className="list-none cursor-pointer inline-flex items-center h-9 px-3 rounded-full border border-black/20 dark:border-white/20 text-sm">
        Menu
        <span className="ml-1">▾</span>
      </summary>
      <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl p-2 z-50">
        <a href="#models" className="block px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Models</a>
        <a href="#technology" className="block px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Technology</a>
        <a href="#fleet" className="block px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Fleet & Leasing</a>
        <a href="#support" className="block px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Support</a>
        <a href="#timeline" className="block px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Timeline</a>
        <a href="#contact" className="block px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Contact</a>
      </div>
    </details>
  );
}

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
      {/* 3열 그리드: 좌 로고 / 중앙 네비(정중앙) / 우 액션 */}
      <div className="max-w-6xl mx-auto px-5 py-3 grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Left: Logo */}
        <a
          href="#home"
          className="text-black dark:text-white text-xl tracking-wide font-semibold justify-self-start"
        >
          APRO
        </a>

        {/* Center: Nav (가운데 정렬, 큰 화면에서만 전체 표시) */}
        <nav className="hidden lg:flex items-center justify-center gap-7 text-sm h-9 whitespace-nowrap">
          <a href="#models" className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white">Models</a>
          <a href="#technology" className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white">Technology</a>
          <a href="#fleet" className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white">Fleet &amp; Leasing</a>
          <a href="#support" className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white">Support</a>
          <a href="#timeline" className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white">Timeline</a>
          <a href="#contact" className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white">Contact</a>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center justify-self-end gap-2">
          {/* md~lg: 메뉴가 좁으면 More로 수납 */}
          <MoreMenu />
          <ThemeCycleButton />
          <ThemeToggle />

          {/* CTA: 좁은 화면에서 짧게, 큰 화면에서 정규 크기 */}
          <button
            onClick={() => openLead("Header CTA")}
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

// src/components/Header.tsx
import React from 'react';
import { openLead } from './LeadModal';
import { getThemeMode, setThemeMode, subscribeTheme } from '../utils/theme';

type Mode = 'light' | 'dark' | 'system';

function ThemeToggle() {
  const [mode, setMode] = React.useState<Mode>(() => getThemeMode());
  React.useEffect(() => {
    const unsub = subscribeTheme(() => setMode(getThemeMode()));
    return () => { unsub(); }; // cleanup은 void로
  }, []);

  const OPTIONS = ['system', 'light', 'dark'] as const;
  const LABEL: Record<Mode, string> = { system: 'Auto', light: 'Light', dark: 'Dark' };

  return (
    <div
      className="hidden sm:flex rounded-full border border-black/20 dark:border-white/20 overflow-hidden text-sm"
      role="group"
      aria-label="Theme"
    >
      {OPTIONS.map((m) => (
        <button
          key={m}
          onClick={() => setThemeMode(m)}
          aria-pressed={mode === m}
          title={m === 'system' ? 'Follow OS theme' : LABEL[m]}
          className={[
            'px-3 py-1.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20',
            mode === m
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'text-black dark:text-white',
          ].join(' ')}
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

  const order: Mode[] = ['system', 'light', 'dark'];
  const next = () => {
    const idx = order.indexOf(mode);
    const to = order[(idx + 1) % order.length];
    setThemeMode(to);
  };

  // 간단한 라벨/아이콘
  const label = mode === 'system' ? 'Auto' : mode === 'light' ? 'Light' : 'Dark';
  const icon = mode === 'system' ? 'A' : mode === 'light' ? '☀️' : '🌙';

  return (
    <button
      onClick={next}
      className="sm:hidden inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-black/20 dark:border-white/20 text-xs"
      title="Theme"
      aria-label={`Theme: ${label}`}
    >
      <span aria-hidden>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
        <a
          href="#home"
          className="text-black dark:text-white text-xl tracking-wide font-semibold"
        >
          APRO
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          <a href="#models" className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white">Models</a>
          <a href="#technology" className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white">Technology</a>
          <a href="#fleet" className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white">Fleet &amp; Leasing</a>
          <a href="#support" className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white">Support</a>
          <a href="#contact" className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          {/* 모바일: 순환 버튼 / 데스크톱: 3단 토글 */}
          <ThemeCycleButton />
          <ThemeToggle />

          <button
            onClick={() => openLead('Header CTA')}
            className="ml-1 px-4 py-2 rounded-full bg-black text-white text-sm font-semibold hover:opacity-90 dark:bg-white dark:text-black transition"
            aria-label="Talk to Sales"
          >
            Talk to Sales
          </button>
        </div>
      </div>
    </header>
  );
}

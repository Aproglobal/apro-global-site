import React from 'react';
import { openLead } from './LeadModal';
import { getThemeMode, setThemeMode, subscribeTheme } from '../utils/theme';
import { trackEvent } from '../services/analytics';

type Mode = 'light' | 'dark' | 'system';

function ThemeToggle() {
  const [mode, setMode] = React.useState<Mode>(() => getThemeMode());
  React.useEffect(() => {
    const unsub = subscribeTheme(() => setMode(getThemeMode()));
    return () => { unsub(); };
  }, []);
  const OPTIONS = ['system', 'light', 'dark'] as const;
  const LABEL: Record<Mode, string> = { system: 'Auto', light: 'Light', dark: 'Dark' };

  return (
    <div
      className="hidden lg:flex rounded-full border border-black/20 dark:border-white/20 overflow-hidden text-sm"
      role="group"
      aria-label="Theme"
    >
      {OPTIONS.map((m) => (
        <button
          key={m}
          onClick={() => setThemeMode(m)}
          onMouseDown={() => trackEvent('nav_click', { label: `Theme ${m}`, location: 'header' })}
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
    trackEvent('nav_click', { label: `Theme ${to}`, location: 'header' });
  };
  const label = mode === 'system' ? 'Auto' : mode === 'light' ? 'Light' : 'Dark';
  const icon = mode === 'system' ? 'A' : mode === 'light' ? '☀️' : '🌙';

  return (
    <button
      onClick={next}
      className="lg:hidden inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-black/20 dark:border-white/20 text-xs"
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
          onClick={() => trackEvent('nav_click', { label: 'Home', location: 'header' })}
          className="text-black dark:text-white text-xl tracking-wide font-semibold"
        >
          APRO
        </a>

        {/* 메인 내비게이션 (중앙 정렬/한 줄 유지) */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#models" onClick={() => trackEvent('nav_click', { label: 'Models', location: 'header' })}
             className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white">Models</a>
          <a href="#technology" onClick={() => trackEvent('nav_click', { label: 'Technology', location: 'header' })}
             className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white">Technology</a>
          <a href="#fleet" onClick={() => trackEvent('nav_click', { label: 'Fleet & Leasing', location: 'header' })}
             className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white">Fleet &amp; Leasing</a>
          <a href="#support" onClick={() => trackEvent('nav_click', { label: 'Support', location: 'header' })}
             className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white">Support</a>
          <a href="#timeline" onClick={() => trackEvent('nav_click', { label: 'Timeline', location: 'header' })}
             className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white">Timeline</a>

          {/* More 드롭다운: 겹침 방지용 */}
          <details className="relative group">
            <summary
              className="list-none cursor-pointer text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white"
              onClick={() => trackEvent('nav_click', { label: 'More', location: 'header' })}
            >
              More ▾
            </summary>
            <div className="absolute mt-3 right-0 w-64 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl p-2">
              <a href="#industries" onClick={() => trackEvent('nav_click', { label: 'Industries', location: 'header' })}
                 className="block px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Industries</a>
              <a href="#downloads" onClick={() => trackEvent('nav_click', { label: 'Downloads', location: 'header' })}
                 className="block px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Downloads</a>
              <a href="#certs" onClick={() => trackEvent('nav_click', { label: 'Certifications', location: 'header' })}
                 className="block px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Certifications</a>
              <a href="#cases" onClick={() => trackEvent('nav_click', { label: 'Case Studies', location: 'header' })}
                 className="block px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Case Studies <span className="ml-1 text-xs text-zinc-500">(Coming soon)</span></a>
              <a href="#export" onClick={() => trackEvent('nav_click', { label: 'Export & Logistics', location: 'header' })}
                 className="block px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Export &amp; Logistics <span className="ml-1 text-xs text-zinc-500">(Coming soon)</span></a>
              <a href="#sustainability" onClick={() => trackEvent('nav_click', { label: 'Sustainability', location: 'header' })}
                 className="block px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Sustainability <span className="ml-1 text-xs text-zinc-500">(Coming soon)</span></a>
              <a href="#partners" onClick={() => trackEvent('nav_click', { label: 'Partner Program', location: 'header' })}
                 className="block px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Partner Program <span className="ml-1 text-xs text-zinc-500">(Coming soon)</span></a>
            </div>
          </details>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeCycleButton />
          <ThemeToggle />
          <button
            onClick={() => { openLead('Header CTA'); trackEvent('cta_click', { label: 'Talk to Sales', where: 'header' }); }}
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

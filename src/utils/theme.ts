// src/utils/theme.ts
type ThemeMode = 'light' | 'dark' | 'system';

const MQ = '(prefers-color-scheme: dark)';
let mql: MediaQueryList | null = null;
const listeners = new Set<() => void>();

function isDarkResolved(mode: ThemeMode) {
  if (mode === 'dark') return true;
  if (mode === 'light') return false;
  if (typeof window === 'undefined') return false;
  return window.matchMedia(MQ).matches;
}

function apply(mode: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle('dark', isDarkResolved(mode));
}

export function getThemeMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  const saved = localStorage.getItem('theme');
  return saved === 'light' || saved === 'dark' || saved === 'system' ? (saved as ThemeMode) : 'system';
}

export function setThemeMode(mode: ThemeMode) {
  localStorage.setItem('theme', mode);
  apply(mode);
  listeners.forEach((fn) => fn());
}

export function initThemeWatcher() {
  if (typeof window === 'undefined') return;
  if (!mql) {
    mql = window.matchMedia(MQ);
    mql.addEventListener?.('change', () => {
      if (getThemeMode() === 'system') {
        apply('system');
        listeners.forEach((fn) => fn());
      }
    });
  }
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
      apply(getThemeMode());
      listeners.forEach((fn) => fn());
    }
  });
  apply(getThemeMode());
}

export function subscribeTheme(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

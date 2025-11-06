/* Lightweight GA4 helpers: init, SPA pageviews, events, scroll-depth */

type Gtag = (...args: any[]) => void;

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: Gtag;
  }
}

let _spaBound = false;
let _scrollBound = false;

/** Initialize (idempotent). We assume GA snippet is injected in index.html on prod. */
export async function initAnalytics(): Promise<void> {
  // If index.html already injected GA (prod), window.gtag exists.
  // For preview/local, do nothing (fail-soft).
  if (!window.dataLayer) window.dataLayer = [];
}

/** Track a custom event. Safe on non-prod (no-op if gtag missing). */
export function trackEvent(
  name: string,
  params?: Record<string, any>
): void {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params ?? {});
}

/** Fire a page_view (manually). */
function trackPageView(): void {
  if (typeof window.gtag !== "function") return;
  const path = location.pathname + location.search + location.hash;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: location.href,
    page_title: document.title,
  });
}

/** Bind SPA pageview tracking by hooking history API (idempotent). */
export function setupSpaPageviews(): void {
  if (_spaBound) return;
  _spaBound = true;

  // 1) initial view
  trackPageView();

  // 2) hook pushState / replaceState
  const push = history.pushState.bind(history);
  const replace = history.replaceState.bind(history);

  function onNav() {
    // Small delay to allow title updates by Router, then PV
    queueMicrotask(trackPageView);
  }

  history.pushState = function (...args) {
    push(...args as any);
    onNav();
  } as typeof history.pushState;

  history.replaceState = function (...args) {
    replace(...args as any);
    onNav();
  } as typeof history.replaceState;

  // 3) back/forward
  window.addEventListener("popstate", onNav);
}

/** Scroll-depth tracking (25/50/75/100%). Optional config accepted for backward compat. */
export function setupScrollDepth(config?: {
  thresholds?: number[];   // e.g., [20,40,60,80,100]
  intervalMs?: number;     // throttle
}): void {
  if (_scrollBound) return;
  _scrollBound = true;

  const thresholds = (config?.thresholds ?? [25, 50, 75, 100])
    .filter(n => n > 0 && n <= 100)
    .sort((a, b) => a - b);

  if (!thresholds.length) return;

  const fired = new Set<number>();
  let ticking = false;

  function check() {
    const doc = document.documentElement;
    const body = document.body;
    const scrollTop = Math.max(doc.scrollTop, body.scrollTop);
    const height = Math.max(
      body.scrollHeight, doc.scrollHeight,
      body.offsetHeight, doc.offsetHeight,
      body.clientHeight, doc.clientHeight
    );
    const viewport = window.innerHeight || doc.clientHeight;
    const maxScrollable = Math.max(1, height - viewport);
    const percent = Math.min(100, Math.round((scrollTop / maxScrollable) * 100));

    thresholds.forEach(t => {
      if (!fired.has(t) && percent >= t) {
        fired.add(t);
        trackEvent("scroll_depth", { percent: t });
      }
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        check();
        ticking = false;
      });
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  // first check in case of short pages
  check();
}

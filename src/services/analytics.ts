// src/services/analytics.ts
type Gtag = (...args: any[]) => void;

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: Gtag;
  }
}

function ensureGtag() {
  if (!window.dataLayer) window.dataLayer = [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments);
    };
  }
}

/** Initialize GA4. Safe to call even if the ID is missing; it will no-op. */
export function initAnalytics(measurementId?: string) {
  if (!measurementId) {
    console.warn("[analytics] Missing VITE_GA_MEASUREMENT_ID.");
    return;
  }
  ensureGtag();

  // Inject GA4 script once
  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(s);
  }

  window.gtag!("js", new Date());
  window.gtag!("config", measurementId, {
    anonymize_ip: true,
    send_page_view: false, // SPA: we control pageviews
  });
}

/** Fire a SPA pageview for the current (or provided) path. */
export function trackSpaPageview(path?: string) {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  if (!window.gtag || !id) return;
  window.gtag("config", id, {
    page_path: path ?? window.location.pathname + window.location.search,
  });
}

/** Basic event helper */
export function trackEvent(name: string, params?: Record<string, any>) {
  if (!window.gtag) return;
  window.gtag("event", name, params ?? {});
}

/** Simple scroll-depth tracker (25/50/75/100 once per load) */
export function setupScrollDepth() {
  const marks = [25, 50, 75, 100];
  const fired = new Set<number>();

  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    if (max <= 0) return;

    const pct = Math.round((doc.scrollTop / max) * 100);
    for (const m of marks) {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        trackEvent("scroll_depth", { percent: m });
      }
    }
    if (fired.size === marks.length) {
      window.removeEventListener("scroll", onScroll, { passive: true } as any);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true } as any);
}

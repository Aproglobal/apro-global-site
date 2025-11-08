// src/services/analytics.ts
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

let initialized = false;

function getGaId(idFromParam?: string): string | undefined {
  const id = idFromParam || (import.meta as any).env?.VITE_GA_MEASUREMENT_ID;
  if (!id && (import.meta as any).env?.DEV) {
    console.info("[analytics] Disabled (no VITE_GA_MEASUREMENT_ID).");
  }
  return id;
}

export function initAnalytics(idFromParam?: string) {
  const id = getGaId(idFromParam);
  if (!id || initialized) return;
  initialized = true;

  // Inject gtag script
  const s1 = document.createElement("script");
  s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s1);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { anonymize_ip: true });
}

export function trackEvent(name: string, params?: Record<string, any>) {
  if (!window.gtag) return;
  window.gtag("event", name, params || {});
}

function sendPageview() {
  if (!window.gtag) return;
  const href = location.href;
  const path = location.pathname + location.search + location.hash;
  window.gtag("event", "page_view", {
    page_location: href,
    page_path: path,
    page_title: document.title,
  });
}

/**
 * Hooks History API + hashchange to send page_view in SPAs.
 * Safe to call multiple times; handlers are idempotent.
 */
export function setupSpaPageviews() {
  // If GA is not initialized yet, we still install hooks; calls just no-op until gtag exists.
  // Hook pushState/replaceState once
  const anyHist = history as any;
  if (!anyHist.__ga_hooked) {
    const origPush = history.pushState;
    const origReplace = history.replaceState;

    history.pushState = function (...args) {
      const ret = origPush.apply(this, args as any);
      queueMicrotask(sendPageview);
      return ret;
    };
    history.replaceState = function (...args) {
      const ret = origReplace.apply(this, args as any);
      queueMicrotask(sendPageview);
      return ret;
    };

    window.addEventListener("popstate", sendPageview);
    window.addEventListener("hashchange", sendPageview);
    anyHist.__ga_hooked = true;
  }

  // Fire an initial PV once (use a flag to avoid duplicates)
  if (!(window as any).__ga_initial_pv_sent) {
    (window as any).__ga_initial_pv_sent = true;
    queueMicrotask(sendPageview);
  }
}

/** Optional scroll depth tracking (25/50/75/100) */
export function setupScrollDepth() {
  if (typeof window === "undefined") return;
  let fired25 = false, fired50 = false, fired75 = false, fired100 = false;

  const handler = () => {
    const h = document.documentElement;
    const scrolled =
      (h.scrollTop || document.body.scrollTop) + h.clientHeight;
    const full = h.scrollHeight || 1;
    const pct = Math.min(100, Math.round((scrolled / full) * 100));

    const fire = (mark: number) => trackEvent("scroll_depth", { percent: mark });

    if (!fired25 && pct >= 25) { fire(25); fired25 = true; }
    if (!fired50 && pct >= 50) { fire(50); fired50 = true; }
    if (!fired75 && pct >= 75) { fire(75); fired75 = true; }
    if (!fired100 && pct >= 100) {
      fire(100);
      fired100 = true;
      window.removeEventListener("scroll", handler);
    }
  };

  window.addEventListener("scroll", handler, { passive: true });
}

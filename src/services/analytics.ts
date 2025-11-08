// src/services/analytics.ts
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

let initialized = false;

export function initAnalytics(idFromParam?: string) {
  const id = idFromParam || (import.meta as any).env?.VITE_GA_MEASUREMENT_ID;

  if (!id) {
    if ((import.meta as any).env?.DEV) {
      console.info("[analytics] Disabled (no VITE_GA_MEASUREMENT_ID).");
    }
    return; // no-op
  }
  if (initialized) return;
  initialized = true;

  // Inject gtag
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
  if (!window.gtag) return; // safe no-op
  window.gtag("event", name, params || {});
}

export function setupScrollDepth() {
  // Optional: guard if not in browser
  if (typeof window === "undefined") return;
  // Lightweight example (guarded)
  let fired25 = false, fired50 = false, fired75 = false, fired100 = false;
  const handler = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop || document.body.scrollTop) + h.clientHeight;
    const full = h.scrollHeight;
    const pct = Math.min(100, Math.round((scrolled / full) * 100));

    const fire = (mark: number, flag: "25"|"50"|"75"|"100") => {
      trackEvent("scroll_depth", { percent: mark });
      if (flag === "25") fired25 = true;
      if (flag === "50") fired50 = true;
      if (flag === "75") fired75 = true;
      if (flag === "100") fired100 = true;
    };

    if (!fired25 && pct >= 25) fire(25, "25");
    if (!fired50 && pct >= 50) fire(50, "50");
    if (!fired75 && pct >= 75) fire(75, "75");
    if (!fired100 && pct >= 100) {
      fire(100, "100");
      window.removeEventListener("scroll", handler);
    }
  };
  window.addEventListener("scroll", handler, { passive: true });
}

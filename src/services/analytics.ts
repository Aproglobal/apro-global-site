/* src/services/analytics.ts */
type EventParams = Record<string, any>;

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    __GA_ID__?: string; // runtime fallback
    RUNTIME_CONFIG?: { VITE_GA_MEASUREMENT_ID?: string };
    __gaLoaded?: boolean;
  }
}

const isAllowedHost = () => {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  // include web.app / firebaseapp.com previews, live, and localhost
  return (
    h === "apro.kukjeint.com" ||
    h.endsWith(".web.app") ||
    h.endsWith(".firebaseapp.com") ||
    h === "localhost"
  );
};

function resolveGaId(): string | undefined {
  const fromVite =
    (import.meta as any)?.env?.VITE_GA_MEASUREMENT_ID as string | undefined;
  const fromRuntimeCfg = window.RUNTIME_CONFIG?.VITE_GA_MEASUREMENT_ID;
  const fromWindow = window.__GA_ID__;
  const fromMeta =
    document.querySelector('meta[name="ga-id"]')?.getAttribute("content") ||
    undefined;
  return fromVite || fromRuntimeCfg || fromWindow || fromMeta;
}

function ensureGaScript(id: string) {
  if (document.getElementById("ga-script")) return;
  const s = document.createElement("script");
  s.id = "ga-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    id
  )}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function (...args: any[]) {
      window.dataLayer!.push(args);
    };
}

/** GA4 init (non-fatal if missing) */
export async function initAnalytics(measurementId?: string): Promise<void> {
  if (typeof window === "undefined") return;
  if (!isAllowedHost()) return;

  if (window.__gaLoaded) return;

  const id = measurementId ?? resolveGaId();
  if (!id) {
    console.warn("[analytics] Missing VITE_GA_MEASUREMENT_ID.");
    return;
  }

  ensureGaScript(id);
  window.gtag!("js", new Date());
  window.gtag!("config", id, { send_page_view: false });
  window.__gaLoaded = true;
}

/** Basic event */
export function trackEvent(eventName: string, params?: EventParams) {
  window.gtag?.("event", eventName, params ?? {});
}

/** Page view */
export function trackPageView(path?: string) {
  const href =
    typeof window !== "undefined" ? window.location.href : path || "/";
  const pagePath =
    path ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const title =
    typeof document !== "undefined" ? document.title : "APRO";

  window.gtag?.("event", "page_view", {
    page_location: href,
    page_path: pagePath,
    page_title: title,
  });
}

/** SPA page views (hash/popstate/history) */
export function setupSpaPageviews(routerOrGetter?: any) {
  if (typeof window === "undefined") return;

  const send = () =>
    trackPageView(
      (window.location.pathname || "/") +
        (window.location.search || "") +
        (window.location.hash || "")
    );

  try {
    if (typeof routerOrGetter === "function") {
      trackPageView(routerOrGetter());
    } else {
      send();
    }
  } catch {
    send();
  }

  if (routerOrGetter && typeof routerOrGetter.afterEach === "function") {
    routerOrGetter.afterEach((to: any) => {
      const path = to?.fullPath ?? to?.path ?? window.location?.pathname;
      trackPageView(path);
    });
  }

  const patch = (type: "pushState" | "replaceState") => {
    const orig = (history as any)[type];
    (history as any)[type] = function (...args: any[]) {
      const ret = orig.apply(this, args);
      requestAnimationFrame(send);
      return ret;
    };
  };

  patch("pushState");
  patch("replaceState");
  window.addEventListener("popstate", () => send(), { passive: true });
}

/** Optional scroll depth */
export function setupScrollDepth(
  breakpoints: number[] = [25, 50, 75, 100],
  eventName = "scroll_depth"
) {
  if (typeof window === "undefined") return;

  const sent = new Set<number>();
  const onScroll = () => {
    const doc = document.documentElement;
    const body = document.body;

    const scrollTop =
      window.pageYOffset || doc.scrollTop || body.scrollTop || 0;
    const docHeight = Math.max(
      body.scrollHeight,
      doc.scrollHeight,
      body.offsetHeight,
      doc.offsetHeight,
      body.clientHeight,
      doc.clientHeight
    );
    const winHeight =
      window.innerHeight || doc.clientHeight || body.clientHeight || 0;

    const pct = Math.min(
      100,
      Math.round(((scrollTop + winHeight) / docHeight) * 100)
    );

    for (const bp of breakpoints) {
      if (!sent.has(bp) && pct >= bp) {
        sent.add(bp);
        trackEvent(eventName, { percent: bp });
      }
    }

    if (sent.size === breakpoints.length) {
      window.removeEventListener("scroll", onScroll);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

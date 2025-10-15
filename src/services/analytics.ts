/* src/services/analytics.ts */

type EventParams = Record<string, any>;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    __GA_ID__?: string; // 런타임 폴백
  }
}

const getGtag = () => (typeof window !== "undefined" ? window.gtag : undefined);
const isAllowedHost = () => {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return (
    h === "apro.kukjeint.com" ||
    h.endsWith(".web.app") ||
    h.endsWith(".firebaseapp.com") ||
    h === "localhost"
  );
};
const getGaId = () =>
  (import.meta as any)?.env?.VITE_GA_MEASUREMENT_ID ||
  (typeof window !== "undefined" ? window.__GA_ID__ : undefined);

/** GA4 초기화 */
export function initAnalytics(measurementId?: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (!isAllowedHost()) return Promise.resolve(); // 허용 외 호스트는 조용히 패스

  const id = measurementId ?? getGaId();
  if (!id) {
    console.warn("[analytics] Missing VITE_GA_MEASUREMENT_ID.");
    return Promise.resolve();
  }
  const g = getGtag();
  g?.("js", new Date() as any);
  g?.("config", id);
  return Promise.resolve();
}

/** 공통 이벤트 */
export function trackEvent(eventName: string, params?: EventParams) {
  getGtag()?.("event", eventName, params ?? {});
}

/** 페이지뷰 */
export function trackPageView(path?: string) {
  const g = getGtag();
  if (!g) return;
  const href = typeof window !== "undefined" ? window.location.href : path;
  const pagePath =
    path ?? (typeof window !== "undefined" ? window.location.pathname : undefined);
  g("event", "page_view", {
    page_location: href,
    page_path: pagePath,
    page_title: typeof document !== "undefined" ? document.title : undefined,
  });
}

/** SPA 페이지뷰(옵션) */
export function setupSpaPageviews(routerOrGetter?: any) {
  if (typeof window === "undefined") return;

  const send = () => trackPageView(window.location?.href || undefined);

  try {
    if (typeof routerOrGetter === "function") {
      const path = routerOrGetter();
      trackPageView(path);
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
  window.addEventListener("popstate", () => send());
}

/** 스크롤 깊이(옵션) */
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

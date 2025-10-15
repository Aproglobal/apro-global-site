/* src/services/analytics.ts */

type EventParams = Record<string, any>;

function ga() {
  return typeof window !== "undefined" ? window.gtag : undefined;
}

/** GA4 초기화 – VITE_GA_MEASUREMENT_ID만 사용 */
export function initAnalytics(measurementId?: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const id = measurementId ?? (import.meta as any)?.env?.VITE_GA_MEASUREMENT_ID;
  if (!id) {
    console.warn("[analytics] Missing VITE_GA_MEASUREMENT_ID.");
    return Promise.resolve();
  }

  // 전역 선언 충돌 방지: 존재할 때만 호출
  ga()?.("js", new Date() as any);
  ga()?.("config", id);

  return Promise.resolve();
}

/** 공통 이벤트 */
export function trackEvent(eventName: string, params?: EventParams) {
  ga()?.("event", eventName, params ?? {});
}

/** 페이지뷰 */
export function trackPageView(path?: string) {
  const g = ga();
  if (!g) return;

  const href = typeof window !== "undefined" ? window.location.href : path;
  const pagePath =
    path ??
    (typeof window !== "undefined" ? window.location.pathname : undefined);

  g("event", "page_view", {
    page_location: href,
    page_path: pagePath,
    page_title: typeof document !== "undefined" ? document.title : undefined,
  });
}

/** SPA 페이지뷰 */
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

/** 스크롤 깊이 */
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

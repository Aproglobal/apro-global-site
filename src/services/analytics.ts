// src/services/analytics.ts

// ---- 타입: gtag를 가변 인자 함수로 선언 (TS 오류 방지)
type Gtag = (...args: any[]) => void;

declare global {
  interface Window {
    dataLayer: any[];
    gtag: Gtag;
  }
}

// ---- 내부 유틸: gtag 준비
function ensureGtagInitialized() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    // 표준 GA 스니펫 형태와 호환되도록 가변 인자 push
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args);
    } as Gtag;
  }
}

// ---- GA 초기화: 인자 선택(옵션), Promise 반환(then 체이닝 대응)
export function initAnalytics(measurementId?: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  ensureGtagInitialized();

  // ✅ 환경변수 이름을 폭넓게 지원 (여기 추가됨: VITE_GA_MEASUREMENT_ID)
  const idFromEnv =
    (import.meta as any)?.env?.VITE_GA_MEASUREMENT_ID ||
    (import.meta as any)?.env?.VITE_MEASUREMENT_ID ||
    (import.meta as any)?.env?.VITE_GA4_ID ||
    (import.meta as any)?.env?.VITE_GA_ID;

  const id = measurementId ?? idFromEnv;

  if (!id) {
    console.warn(
      "[analytics] GA measurement ID not set. Set VITE_GA_MEASUREMENT_ID (or VITE_MEASUREMENT_ID / VITE_GA4_ID / VITE_GA_ID) or pass to initAnalytics()."
    );
    return Promise.resolve();
  }

  // 표준 GA4 부트스트랩
  window.gtag("js", new Date());
  window.gtag("config", id);

  return Promise.resolve();
}

// ---- 이벤트 트래킹
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params ?? {});
}

// ---- 페이지뷰 트래킹
export function trackPageView(path?: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  // GA4는 page_view 이벤트 사용
  window.gtag("event", "page_view", path ? { page_location: path } : {});
}

// ---- SPA 페이지뷰 설정
export function setupSpaPageviews(routerOrGetter?: any) {
  if (typeof window === "undefined") return;

  const send = () => trackPageView(window.location?.href || undefined);

  if (typeof routerOrGetter === "function") {
    try {
      const path = routerOrGetter();
      trackPageView(path);
    } catch {}
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
  send(); // 초기 1회
}

// ---- 스크롤 깊이 측정
export function setupScrollDepth(
  breakpoints: number[] = [25, 50, 75, 100],
  eventName = "scroll_depth"
) {
  if (typeof window === "undefined") return;

  const sent = new Set<number>();

  const onScroll = () => {
    const doc = document.documentElement;
    const body = document.body;

    const scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop || 0;
    const docHeight = Math.max(
      body.scrollHeight,
      doc.scrollHeight,
      body.offsetHeight,
      doc.offsetHeight,
      body.clientHeight,
      doc.clientHeight
    );
    const winHeight = window.innerHeight || doc.clientHeight || body.clientHeight || 0;

    const pct = Math.min(100, Math.round(((scrollTop + winHeight) / docHeight) * 100));

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
  onScroll(); // 초기 체크
}

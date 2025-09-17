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
      // 원형은 arguments 자체를 push하지만, 배열로 넣어도 정상 동작
      window.dataLayer.push(args);
    } as Gtag;
  }
}

// ---- GA 초기화: 인자 선택(옵션), Promise 반환(then 체이닝 대응)
export function initAnalytics(measurementId?: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  ensureGtagInitialized();

  // 환경변수 여러 키 지원(프로젝트마다 다를 수 있으므로 넉넉하게)
  const idFromEnv =
    (import.meta as any)?.env?.VITE_GA_ID ||
    (import.meta as any)?.env?.VITE_GA4_ID ||
    (import.meta as any)?.env?.VITE_MEASUREMENT_ID;

  const id = measurementId ?? idFromEnv;

  if (!id) {
    console.warn(
      "[analytics] GA measurement ID not set. Set VITE_GA_ID (or VITE_GA4_ID / VITE_MEASUREMENT_ID) or pass to initAnalytics()."
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

// ---- SPA 페이지뷰 설정: 라우터/히스토리 변화에 맞춰 page_view 전송
// - router 인식(가능하면 afterEach/subscribe), 없으면 history monkey-patch + popstate
export function setupSpaPageviews(routerOrGetter?: any) {
  if (typeof window === "undefined") return;

  const send = () => trackPageView(window.location?.href || undefined);

  // 1) 사용자 제공 getter 함수가 있으면 그걸로 경로 얻어서 전송
  if (typeof routerOrGetter === "function") {
    try {
      const path = routerOrGetter();
      trackPageView(path);
    } catch {}
  }

  // 2) Vue Router 스타일(afterEach)
  if (routerOrGetter && typeof routerOrGetter.afterEach === "function") {
    routerOrGetter.afterEach((to: any) => {
      const path = to?.fullPath ?? to?.path ?? window.location?.pathname;
      trackPageView(path);
    });
  }

  // 3) React Router 등: history 변경 감지 (pushState/replaceState monkey-patch)
  const patch = (type: "pushState" | "replaceState") => {
    const orig = (history as any)[type];
    (history as any)[type] = function (...args: any[]) {
      const ret = orig.apply(this, args);
      // 다음 프레임에서 전송 (경로 반영 이후)
      requestAnimationFrame(send);
      return ret;
    };
  };

  patch("pushState");
  patch("replaceState");

  // 뒤로가기/앞으로가기
  window.addEventListener("popstate", () => send());

  // 초기 1회
  send();
}

// ---- 스크롤 깊이 측정: 25/50/75/100% 지점에서 1회씩 이벤트 전송
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
  // 초기 체크(작은 페이지에서 바로 100%일 수 있음)
  onScroll();
}


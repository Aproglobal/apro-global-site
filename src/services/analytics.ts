// src/services/analytics.ts

// ----- 최소 타입(로컬에 @types/gtag.js 없어도 빌드되도록)
type Gtag = (...args: any[]) => void;

declare global {
  interface Window {
    dataLayer: any[];
    gtag: Gtag;
  }
}

// ----- GA4 초기화
export function initAnalytics(measurementId: string) {
  if (typeof window === "undefined") return;

  // dataLayer 준비
  window.dataLayer = window.dataLayer || [];

  // gtag 함수(가변 인자) 보장
  if (!window.gtag) {
    // 주의: 화살표 함수가 아닌 function을 쓰면 arguments 사용 가능
    window.gtag = function gtag(...args: any[]) {
      // GA 스니펫은 arguments 자체를 push하지만, 배열로 넣어도 동작합니다.
      // 더 원형에 가깝게 하려면 아래 주석 해제:
      // // @ts-ignore
      // window.dataLayer.push(arguments);
      window.dataLayer.push(args);
    } as Gtag;
  }

  // 표준 GA4 부트스트랩
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

// ----- 이벤트 트래킹
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params ?? {});
}

// (선택) 페이지뷰 같은 커스텀 헬퍼가 필요하면 아래처럼 추가 가능
export function trackPageView(path?: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", path ? { page_location: path } : {});
}

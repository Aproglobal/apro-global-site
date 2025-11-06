export async function initAnalytics(): Promise<void> {
  // GA4는 index.html에서 로드됨(운영 도메인에서만). 여기서는 no-op.
  return;
}

export function setupSpaPageviews(): void {
  // 간단 SPA PV: 해시/경로 변경 시 gtag 전송
  const send = () => {
    // @ts-ignore
    if (typeof window.gtag === "function") {
      // @ts-ignore
      window.gtag("event", "page_view", {
        page_location: location.href,
        page_path: location.pathname + location.search
      });
    }
  };
  window.addEventListener("popstate", send);
  window.addEventListener("hashchange", send);
  // 최초 1회
  send();
}

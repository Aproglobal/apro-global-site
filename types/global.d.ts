/* types/global.d.ts */
export {};

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void; // 전역 gtag는 '옵셔널'만 선언 (충돌 방지)
  }
}

/* types/global.d.ts */
export {};

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    __GA_ID__?: string;
  }
}

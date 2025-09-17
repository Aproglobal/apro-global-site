const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;

function loadScript(src: string, attrs: Record<string,string> = {}) {
  return new Promise<void>((resolve) => {
    const s = document.createElement('script');
    s.async = true;
    s.src = src;
    Object.entries(attrs).forEach(([k,v]) => s.setAttribute(k, v));
    s.onload = () => resolve();
    document.head.appendChild(s);
  });
}

export async function initAnalytics() {
  if (GTM_ID) {
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtm(){ (window as any).dataLayer.push(arguments); }
    // @ts-ignore
    gtm('js', new Date());
    const src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    await loadScript(src);
    return;
  }

  if (GA_ID) {
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(){ (window as any).dataLayer.push(arguments); }
    // @ts-ignore
    (window as any).gtag = gtag;
    gtag('js', new Date());
    const src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    await loadScript(src);
    gtag('config', GA_ID, { send_page_view: false });
  }
}

export function trackPageview(path?: string) {
  if ((window as any).gtag && GA_ID) {
    (window as any).gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: path ?? (window.location.pathname + window.location.hash),
    });
  } else if ((window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'page_view',
      page_title: document.title,
      page_location: window.location.href,
      page_path: path ?? (window.location.pathname + window.location.hash),
    });
  }
}

export function setupSpaPageviews() {
  trackPageview();
  window.addEventListener('hashchange', () => trackPageview());
}

export function trackEvent(action: string, params: Record<string, any> = {}) {
  if ((window as any).gtag && GA_ID) {
    (window as any).gtag('event', action, params);
  } else if ((window as any).dataLayer) {
    (window as any).dataLayer.push({ event: action, ...params });
  }
}

// Scroll depth tracking at 25/50/75/100%
export function setupScrollDepth() {
  const marks = new Set<number>();
  function onScroll() {
    const doc = document.documentElement;
    const winH = window.innerHeight || doc.clientHeight;
    const scrollTop = window.pageYOffset || doc.scrollTop;
    const fullH = doc.scrollHeight - winH;
    const pct = Math.min(100, Math.round((scrollTop / Math.max(1, fullH)) * 100));
    [25,50,75,100].forEach(m => {
      if (pct >= m && !marks.has(m)) {
        marks.add(m);
        trackEvent('scroll_depth', { percent: m });
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

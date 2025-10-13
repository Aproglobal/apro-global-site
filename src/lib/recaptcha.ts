// src/lib/recaptcha.ts
// Vite + React 프로젝트용 reCAPTCHA v3 helper
let loading: Promise<void> | null = null;

export function loadRecaptcha(siteKey: string) {
  if ((window as any).grecaptcha) return Promise.resolve();
  if (!loading) {
    loading = new Promise<void>((resolve, reject) => {
      const s = document.createElement('script');
      s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('reCAPTCHA script failed to load'));
      document.head.appendChild(s);
    });
  }
  return loading!;
}

export async function getRecaptchaToken(action = 'lead') {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;
  if (!siteKey) throw new Error('Missing VITE_RECAPTCHA_SITE_KEY');
  await loadRecaptcha(siteKey);
  // @ts-ignore
  return await (window as any).grecaptcha.execute(siteKey, { action });
}

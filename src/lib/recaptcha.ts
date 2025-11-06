export function loadRecaptcha(siteKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).grecaptcha) return resolve();
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("reCAPTCHA load failed"));
    document.head.appendChild(s);
  });
}

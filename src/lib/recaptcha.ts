/* reCAPTCHA v3 loader + token helper (fail-soft on non-prod) */

declare global {
  interface Window {
    grecaptcha?: {
      ready(cb: () => void): void;
      execute(siteKey: string, opts: { action: string }): Promise<string>;
      enterprise?: any;
    };
    __recaptchaLoading?: boolean;
  }
}

let _loaded = false;
let _siteKey: string | undefined;

/** Load reCAPTCHA v3 script (idempotent). */
export function loadRecaptcha(siteKey: string): Promise<void> {
  _siteKey = siteKey;

  if (_loaded) return Promise.resolve();
  if (window.grecaptcha) {
    _loaded = true;
    return Promise.resolve();
  }

  if (window.__recaptchaLoading) {
    // Another loader already in progress — poll until ready
    return new Promise((resolve) => {
      const i = setInterval(() => {
        if (window.grecaptcha) {
          clearInterval(i);
          _loaded = true;
          resolve();
        }
      }, 50);
    });
  }

  window.__recaptchaLoading = true;

  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.async = true;
    s.defer = true;
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    s.onload = () => {
      _loaded = true;
      resolve();
    };
    s.onerror = () => reject(new Error("Failed to load reCAPTCHA"));
    document.head.appendChild(s);
  });
}

/**
 * Get a v3 token. Returns null if unavailable (local/preview).
 * Action defaults to 'submit' for GA/abuse signal consistency.
 */
export async function getRecaptchaToken(
  action: string = "submit",
  siteKeyOverride?: string
): Promise<string | null> {
  const key = siteKeyOverride ?? _siteKey ?? (import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined);
  if (!key) return null;

  // If script not loaded yet, try to load now (best-effort)
  if (!window.grecaptcha && !_loaded) {
    try {
      await loadRecaptcha(key);
    } catch {
      return null;
    }
  }

  if (!window.grecaptcha) return null;

  return new Promise((resolve) => {
    window.grecaptcha!.ready(async () => {
      try {
        const token = await window.grecaptcha!.execute(key, { action });
        resolve(token ?? null);
      } catch {
        resolve(null);
      }
    });
  });
}

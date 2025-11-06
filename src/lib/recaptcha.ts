// reCAPTCHA v3 loader (Enterprise first with safe fallback), ready() + execute() guaranteed.
// - Tries enterprise.js first, falls back to standard api.js if it fails.
// - Deduplicated loader with a single readyPromise.

let readyPromise: Promise<void> | null = null;

function getGre() {
  const w: any = window as any;
  return w.grecaptcha?.enterprise || w.grecaptcha;
}

function hasScript(id: string) {
  return !!document.getElementById(id);
}

function waitReady(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const gre = getGre();
    if (gre?.ready) {
      gre.ready(resolve);
      return;
    }
    // If grecaptcha is present but ready() is missing (very rare), retry briefly
    let tries = 0;
    const maxTries = 40; // ~2s
    const t = setInterval(() => {
      const g2 = getGre();
      if (g2?.ready) {
        clearInterval(t);
        g2.ready(resolve);
      } else if (++tries >= maxTries) {
        clearInterval(t);
        reject(new Error("grecaptcha loaded but ready() not available"));
      }
    }, 50);
  });
}

function injectScript(src: string, id: string) {
  return new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.id = id;
    s.src = src;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(s);
  });
}

function ensureReady(siteKey: string) {
  if (!readyPromise) {
    readyPromise = (async () => {
      // 1) If grecaptcha is already on the page, just wait for ready()
      if (getGre()) {
        await waitReady();
        return;
      }

      // 2) Try Enterprise first
      const ENTERPRISE_ID = "grecaptcha-enterprise-js";
      const STD_ID = "grecaptcha-std-js";
      const entSrc = `https://www.google.com/recaptcha/enterprise.js?render=${encodeURIComponent(siteKey)}`;
      const stdSrc = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;

      try {
        if (!hasScript(ENTERPRISE_ID)) {
          await injectScript(entSrc, ENTERPRISE_ID);
        }
        await waitReady();
      } catch {
        // 3) Fallback to standard api.js
        if (!hasScript(STD_ID)) {
          await injectScript(stdSrc, STD_ID);
        }
        await waitReady();
      }
    })();
  }
  return readyPromise;
}

async function waitForExecute(maxMs = 2000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    const gre = getGre();
    if (gre?.execute) return gre;
    await new Promise((r) => setTimeout(r, 50));
  }
  throw new Error("grecaptcha.execute not ready");
}

export function loadRecaptcha(siteKey: string) {
  return ensureReady(siteKey);
}

export async function getRecaptchaToken(action = "lead_submit") {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;
  if (!siteKey) throw new Error("Missing VITE_RECAPTCHA_SITE_KEY");

  await ensureReady(siteKey);

  // execute() may appear a tick later after ready(); wait safely
  let gre: any;
  try {
    gre = await waitForExecute();
  } catch {
    // minor retry once
    await new Promise((r) => setTimeout(r, 300));
    gre = await waitForExecute();
  }
  return gre.execute(siteKey, { action });
}

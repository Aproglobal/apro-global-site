// src/lib/recaptcha.ts
// reCAPTCHA v3 loader (enterprise 우선), ready 보장 + execute 대기 + 1회 재시도

let readyPromise: Promise<void> | null = null;

function getGre() {
  const w: any = window as any;
  return w.grecaptcha?.enterprise || w.grecaptcha;
}

function ensureReady(siteKey: string) {
  if (!readyPromise) {
    readyPromise = new Promise<void>((resolve, reject) => {
      const gre = getGre();
      if (gre?.ready) {
        gre.ready(resolve);
        return;
      }
      const s = document.createElement("script");
      s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      s.async = true;
      s.defer = true;
      s.onload = () => {
        const g2 = getGre();
        if (g2?.ready) g2.ready(resolve);
        else reject(new Error("grecaptcha loaded but ready() missing"));
      };
      s.onerror = () => reject(new Error("reCAPTCHA script failed to load"));
      document.head.appendChild(s);
    });
  }
  return readyPromise;
}

async function waitForExecute(maxMs = 1500) {
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
  let gre: any = await waitForExecute().catch(() => null);

  try {
    gre = gre || getGre();
    return await gre.execute(siteKey, { action });
  } catch {
    await new Promise((r) => setTimeout(r, 300));
    gre = await waitForExecute().catch(() => getGre());
    return await gre.execute(siteKey, { action });
  }
}

// ready 보장 + enterprise 호환 + execute 대기(폴링) + 짧은 재시도

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

async function waitForExecute(maxMs = 2000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    const gre = getGre();
    if (typeof gre?.execute === "function") return gre;
    await new Promise((r) => setTimeout(r, 100));
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
  let gre = await waitForExecute().catch(() => null);

  if (!gre) {
    // 아주 짧은 재시도 1회
    await new Promise((r) => setTimeout(r, 500));
    gre = await waitForExecute().catch(() => getGre());
  }

  return await gre.execute(siteKey, { action });
}

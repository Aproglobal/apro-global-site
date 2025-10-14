// src/lib/recaptcha.ts
// Vite + React 용 reCAPTCHA v3 helper (ready 보장 + 1회 로드 + 짧은 재시도)

let readyPromise: Promise<void> | null = null;

function ensureReady(siteKey: string) {
  if (!readyPromise) {
    readyPromise = new Promise<void>((resolve, reject) => {
      const g: any = (window as any).grecaptcha;

      // 1) 이미 로드된 경우: 반드시 ready()로 준비 완료 보장
      if (g?.ready) {
        g.ready(resolve);
        return;
      }

      // 2) 아직 미로드: 스크립트 1회 주입
      const s = document.createElement("script");
      s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      s.async = true;
      s.defer = true;
      s.onload = () => {
        const gx: any = (window as any).grecaptcha;
        if (gx?.ready) gx.ready(resolve);
        else reject(new Error("grecaptcha loaded but ready() missing"));
      };
      s.onerror = () => reject(new Error("reCAPTCHA script failed to load"));
      document.head.appendChild(s);
    });
  }
  return readyPromise;
}

export function loadRecaptcha(siteKey: string) {
  // 기존 API 유지: 호출 시 내부적으로 ready 보장 Promise 반환
  return ensureReady(siteKey);
}

export async function getRecaptchaToken(action = "lead") {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;
  if (!siteKey) throw new Error("Missing VITE_RECAPTCHA_SITE_KEY");

  await ensureReady(siteKey);

  const g: any = (window as any).grecaptcha;
  try {
    return await g.execute(siteKey, { action });
  } catch (e) {
    // 아주 짧은 재시도 1회 (초기화 경합 대비)
    await new Promise((r) => setTimeout(r, 300));
    return await g.execute(siteKey, { action });
  }
}

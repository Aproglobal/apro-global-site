/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SALES_EMAIL?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_RECAPTCHA_SITE_KEY?: string; // ⬅️ 추가
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SALES_EMAIL?: string;
  // 필요하면 여기에 VITE_ 로 시작하는 키를 더 추가
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

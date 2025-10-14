import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './pages/App'
import { initAnalytics, setupSpaPageviews } from './services/analytics'
import { loadRecaptcha } from './lib/recaptcha'

// ✅ 앱 마운트 전에 reCAPTCHA 스크립트 미리 로드
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
if (siteKey) {
  // 실패해도 앱 구동은 계속되도록 catch
  loadRecaptcha(siteKey).catch(() => {});
}

initAnalytics().then(() => setupSpaPageviews())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

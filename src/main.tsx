import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './pages/App'
import { initAnalytics, setupSpaPageviews } from './services/analytics'
import { loadRecaptcha } from './lib/recaptcha'

// ✅ reCAPTCHA preload
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
if (siteKey) {
  loadRecaptcha(siteKey).catch(() => {});
}

initAnalytics().then(() => setupSpaPageviews());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

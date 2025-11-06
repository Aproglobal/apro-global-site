// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import { BrowserRouter } from 'react-router-dom';
import { initAnalytics, setupSpaPageviews } from './services/analytics';
import { loadRecaptcha } from './lib/recaptcha';

// ✅ Preload reCAPTCHA v3 before mount (non-blocking)
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
if (siteKey) {
  loadRecaptcha(siteKey).catch(() => {});
}

// ✅ Initialize GA, then hook SPA pageviews
initAnalytics().then(() => setupSpaPageviews());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

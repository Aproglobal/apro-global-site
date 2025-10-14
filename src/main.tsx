// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import { initAnalytics, setupSpaPageviews } from './services/analytics';

initAnalytics(import.meta.env.VITE_GA_MEASUREMENT_ID).then(() => {
  setupSpaPageviews();
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import { initAnalytics, setupSpaPageviews } from "./services/analytics";
import { loadRecaptcha } from "./lib/recaptcha";

// ✅ Preload reCAPTCHA v3 (fail-soft)
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
if (siteKey) {
  loadRecaptcha(siteKey).catch(() => {});
}

initAnalytics().then(() => setupSpaPageviews());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>
);

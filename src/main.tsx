import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import { initAnalytics, setupSpaPageviews } from "./services/analytics";
import { loadRecaptcha } from "./lib/recaptcha";

// reCAPTCHA preload (safe if not set)
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
if (siteKey) {
  // your helper expects a key argument
  loadRecaptcha(siteKey).catch(() => {});
}

// GA init is synchronous in our implementation
initAnalytics();
setupSpaPageviews();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

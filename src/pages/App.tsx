import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import ModelGrid from "../components/ModelGrid";
import CompareTable from "../components/CompareTable";
import TechSection from "../components/TechSection";
import FleetSection from "../components/FleetSection";
import SupportSection from "../components/SupportSection";
import LeadModal, { openLead } from "../components/LeadModal";
import ModelDetail from "../components/ModelDetail";
import { getVariant } from "../utils/ab";
import { setupScrollDepth, trackEvent, initAnalytics } from "../services/analytics";
import { initThemeWatcher } from "../utils/theme";
import { loadRecaptcha } from "../lib/recaptcha";
import { getTechCopy } from "../data/technology";// src/pages/App.tsx
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "../components/Header";
import LeadModal from "../components/LeadModal";
import ModelDetail from "../components/ModelDetail";

// Pages
import HomePage from "./HomePage";
import CompanyPage from "./CompanyPage";
import PartnersPage from "./PartnersPage";

function Layout() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Header />
      <Outlet />
      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <div className="max-w-6xl mx-auto px-5 py-6 text-sm text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} APRO. All rights reserved.
          <div className="mt-4">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-500">
              Company information
            </h3>
            <p className="mt-1">KUKJE INTERTRADE Co., Ltd.</p>
            <p className="mt-1">
              Address: Room 1208, Biz Center, SKn Techno Park, 124 Sagimakgol-ro, Jungwon-gu,
              Seongnam-si, Gyeonggi-do, Republic of Korea
            </p>
            <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </div>
      </footer>
      <LeadModal />
      <ModelDetail />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<CompanyPage />} />
        <Route path="/partners" element={<PartnersPage />} />
      </Route>
    </Routes>
  );
}

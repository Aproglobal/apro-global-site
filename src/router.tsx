import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./pages/App";
import AboutPage from "./pages/AboutPage";
import PartnersPage from "./pages/PartnersPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/partners" element={<PartnersPage />} />
      {/* 필요 시: <Route path="*" element={<App />} /> */}
    </Routes>
  );
}

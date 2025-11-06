// src/router.tsx
import { Routes, Route, Navigate } from "react-router-dom";

// pages
import Home from "./pages/home/Home";
import Support from "./pages/support/Support";
import Contact from "./pages/contact/Contact";

import ModelsIndex from "./pages/models/ModelsIndex";
import ModelDetail from "./pages/models/ModelDetail";
import ModelsCompare from "./pages/models/ModelsCompare";
import ModelConfigurator from "./pages/models/ModelConfigurator";
import ModelsTechnology from "./pages/models/ModelsTechnology";
import ModelsService from "./pages/models/ModelsService";
import ModelsCases from "./pages/models/ModelsCases";

import CompanyAbout from "./pages/company/CompanyAbout";
import CompanyResources from "./pages/company/CompanyResources";

import Partners from "./pages/partners/Partners";
import PartnersApply from "./pages/partners/PartnersApply";

import NotFound from "./pages/NotFound";

export default function Router() {
  return (
    <Routes>
      {/* ✅ 메인(Home) */}
      <Route path="/" element={<Home />} />

      {/* Models 아래 모든 서브 섹션 일원화 */}
      <Route path="/models" element={<ModelsIndex />} />
      <Route path="/models/compare" element={<ModelsCompare />} />
      <Route path="/models/configurator" element={<ModelConfigurator />} />
      <Route path="/models/technology" element={<ModelsTechnology />} />
      <Route path="/models/service" element={<ModelsService />} />
      <Route path="/models/cases" element={<ModelsCases />} />
      <Route path="/models/:slug" element={<ModelDetail />} />

      {/* Company */}
      <Route path="/company" element={<CompanyAbout />} />
      <Route path="/company/resources" element={<CompanyResources />} />

      {/* Partners */}
      <Route path="/partners" element={<Partners />} />
      <Route path="/partners/apply" element={<PartnersApply />} />

      {/* Support / Contact */}
      <Route path="/support" element={<Support />} />
      <Route path="/contact" element={<Contact />} />

      {/* 레거시 리다이렉트 (있다면) */}
      <Route path="/home" element={<Navigate to="/" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

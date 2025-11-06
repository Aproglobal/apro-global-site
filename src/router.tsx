// src/router.tsx
import { Navigate, Route, Routes } from "react-router-dom";

// 홈/공통
import Home from "./pages/home/Home";
import Support from "./pages/support/Support";
import Contact from "./pages/contact/Contact";

// 모델
import ModelsIndex from "./pages/models/ModelsIndex";
import ModelDetail from "./pages/models/ModelDetail";
import ModelsCompare from "./pages/models/ModelsCompare";
import ModelConfigurator from "./pages/models/ModelConfigurator";
import ModelsTechnology from "./pages/models/ModelsTechnology";
import ModelsService from "./pages/models/ModelsService";
import ModelsCases from "./pages/models/ModelsCases";

// 회사/파트너
import CompanyAbout from "./pages/company/CompanyAbout";
import CompanyResources from "./pages/company/CompanyResources";
import Partners from "./pages/partners/Partners";
import PartnersApply from "./pages/partners/PartnersApply";

import NotFound from "./pages/NotFound";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Models */}
      <Route path="/models" element={<ModelsIndex />} />
      <Route path="/models/compare" element={<ModelsCompare />} />
      <Route path="/models/configurator" element={<ModelConfigurator />} />
      <Route path="/models/technology" element={<ModelsTechnology />} />   {/* ⬅️ 이동 */}
      <Route path="/models/service" element={<ModelsService />} />         {/* ⬅️ 이동 */}
      <Route path="/models/cases" element={<ModelsCases />} />             {/* ⬅️ 이동 */}
      <Route path="/models/:slug" element={<ModelDetail />} />

      {/* Company */}
      <Route path="/company/about" element={<CompanyAbout />} />
      <Route path="/company/resources" element={<CompanyResources />} />

      {/* Partners */}
      <Route path="/partners" element={<Partners />} />
      <Route path="/partners/apply" element={<PartnersApply />} />

      {/* Support / Contact */}
      <Route path="/support" element={<Support />} />
      <Route path="/contact" element={<Contact />} />

      {/* Legacy redirects */}
      <Route path="/company/technology" element={<Navigate to="/models/technology" replace />} />
      <Route path="/company/service" element={<Navigate to="/models/service" replace />} />
      <Route path="/partners/cases" element={<Navigate to="/models/cases" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

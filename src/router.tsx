import React from "react";
import { Routes, Route } from "react-router-dom";

import SiteLayout from "./layouts/SiteLayout";

// Home
import Home from "./pages/home/Home";

// Models
import ModelsIndex from "./pages/models/ModelsIndex";
import ModelDetail from "./pages/models/ModelDetail";
import ModelsTechnology from "./pages/models/ModelsTechnology";
import ModelsService from "./pages/models/ModelsService";
import ModelsCases from "./pages/models/ModelsCases";

// Company
import CompanyAbout from "./pages/company/CompanyAbout";
import CompanyResources from "./pages/company/CompanyResources";

// Partners
import Partners from "./pages/partners/Partners";
import PartnersApply from "./pages/partners/PartnersApply";

// Support / Contact
import Support from "./pages/support/Support";
import Contact from "./pages/contact/Contact";

// Not found
import NotFound from "./pages/NotFound";

export default function Router() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />

        {/* Models */}
        <Route path="/models" element={<ModelsIndex />} />
        <Route path="/models/:slug" element={<ModelDetail />} />
        <Route path="/models/technology" element={<ModelsTechnology />} />
        <Route path="/models/service-warranty" element={<ModelsService />} />
        <Route path="/models/cases" element={<ModelsCases />} />

        {/* Company */}
        <Route path="/company/about" element={<CompanyAbout />} />
        <Route path="/company/resources" element={<CompanyResources />} />

        {/* Partners */}
        <Route path="/partners" element={<Partners />} />
        <Route path="/partners/apply" element={<PartnersApply />} />

        {/* Support / Contact */}
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

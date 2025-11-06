import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/home/Home"));
const ModelsIndex = lazy(() => import("./pages/models/ModelsIndex"));
const ModelDetail = lazy(() => import("./pages/models/ModelDetail"));
const ModelsTechnology = lazy(() => import("./pages/models/ModelsTechnology"));
const ModelsServiceWarranty = lazy(() => import("./pages/models/ModelsServiceWarranty"));
const ModelsCases = lazy(() => import("./pages/models/ModelsCases"));

const CompanyAbout = lazy(() => import("./pages/company/CompanyAbout"));
const CompanyResources = lazy(() => import("./pages/company/CompanyResources"));

const Partners = lazy(() => import("./pages/partners/Partners"));
const PartnersApply = lazy(() => import("./pages/partners/PartnersApply"));

const Contact = lazy(() => import("./pages/contact/Contact"));
const Support = lazy(() => import("./pages/support/Support"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function Router() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="container-xl py-10">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/models" element={<ModelsIndex />} />
          <Route path="/models/technology" element={<ModelsTechnology />} />
          <Route path="/models/service-warranty" element={<ModelsServiceWarranty />} />
          <Route path="/models/cases" element={<ModelsCases />} />
          <Route path="/models/:slug" element={<ModelDetail />} />

          <Route path="/company/about" element={<CompanyAbout />} />
          <Route path="/company/resources" element={<CompanyResources />} />

          <Route path="/partners" element={<Partners />} />
          <Route path="/partners/apply" element={<PartnersApply />} />

          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

import Header from "./components/Header";
import CompanySection from "./sections/CompanySection";
import PartnersSection from "./sections/PartnersSection";

// …import your existing sections…
import ModelsSection from "./components/ModelGrid";            // adjust if your names differ
import TechnologySection from "./components/TechSection";
import IndustriesSection from "./components/IndustriesSection";
import CompareTable from "./components/CompareTable";
import ChargingPowerSection from "./components/ChargingPowerSection";
import ResourcesSection from "./components/ResourcesSection";
import SupportSection from "./components/SupportSection";
import ProductionTimeline from "./components/ProductionTimeline";
import ConfiguratorSection from "./components/ConfiguratorSection";
import FleetSection from "./components/FleetSection";
import ServiceWarrantySection from "./components/ServiceWarrantySection";
// Contact section should have id="contact"

export default function App() {
  return (
    <>
      <Header />
      <main id="main" className="pt-[var(--header-h,80px)]">
        {/* Hero stays the same */}

        {/* New blocks */}
        <CompanySection />
        {/* your existing order below */}
        <div id="models"><ModelsSection /></div>
        <div id="technology"><TechnologySection /></div>
        <div id="industries"><IndustriesSection /></div>
        <div id="compare"><CompareTable /></div>
        <div id="charging"><ChargingPowerSection /></div>
        <div id="resources"><ResourcesSection /></div>
        <div id="support"><SupportSection /></div>
        <div id="timeline"><ProductionTimeline /></div>
        <div id="configurator"><ConfiguratorSection /></div>
        <div id="fleet"><FleetSection /></div>
        <div id="service"><ServiceWarrantySection /></div>

        <PartnersSection />

        {/* Your existing contact section */}
        {/* <section id="contact"> ... </section> */}
      </main>
    </>
  );
}

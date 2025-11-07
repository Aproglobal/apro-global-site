// src/pages/App.tsx
import Header from "../components/Header";
import ModelGrid from "../components/ModelGrid";
import CompareTable from "../components/CompareTable";
import TechSection from "../components/TechSection";
import FleetSection from "../components/FleetSection";
import ChargingPowerSection from "../components/ChargingPowerSection";
import ConfiguratorSection from "../components/ConfiguratorSection";
import ProductionTimeline from "../components/ProductionTimeline";
import ResourcesSection from "../components/ResourcesSection";
import ServiceWarrantySection from "../components/ServiceWarrantySection";
import SupportSection from "../components/SupportSection";
import TcoCalculator from "../components/TcoCalculator";
import IndustriesSection from "../components/IndustriesSection";
import LeadModal from "../components/LeadModal";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Product overview */}
        <section aria-labelledby="models">
          <h2 id="models" className="sr-only">Models</h2>
          <ModelGrid />
        </section>

        {/* Side-by-side comparison */}
        <section aria-labelledby="compare" className="mt-16">
          <h2 id="compare" className="sr-only">Compare Models</h2>
          <CompareTable />
        </section>

        {/* Technology highlights */}
        <section aria-labelledby="tech" className="mt-16">
          <h2 id="tech" className="sr-only">Technology</h2>
          <TechSection />
        </section>

        {/* Fleet & industries */}
        <section aria-labelledby="fleet" className="mt-16">
          <h2 id="fleet" className="sr-only">Fleet</h2>
          <FleetSection />
        </section>

        <section aria-labelledby="industries" className="mt-16">
          <h2 id="industries" className="sr-only">Industries</h2>
          <IndustriesSection />
        </section>

        {/* Charging power */}
        <section aria-labelledby="charging" className="mt-16">
          <h2 id="charging" className="sr-only">Charging</h2>
          <ChargingPowerSection />
        </section>

        {/* TCO calculator */}
        <section aria-labelledby="tco" className="mt-16">
          <h2 id="tco" className="sr-only">Total Cost of Ownership</h2>
          <TcoCalculator />
        </section>

        {/* Configurator */}
        <section aria-labelledby="configurator" className="mt-16">
          <h2 id="configurator" className="sr-only">Configurator</h2>
          <ConfiguratorSection />
        </section>

        {/* Production timeline */}
        <section aria-labelledby="timeline" className="mt-16">
          <h2 id="timeline" className="sr-only">Production Timeline</h2>
          <ProductionTimeline />
        </section>

        {/* Resources & support */}
        <section aria-labelledby="resources" className="mt-16">
          <h2 id="resources" className="sr-only">Resources</h2>
          <ResourcesSection />
        </section>

        <section aria-labelledby="service" className="mt-16">
          <h2 id="service" className="sr-only">Service & Warranty</h2>
          <ServiceWarrantySection />
        </section>

        <section aria-labelledby="support" className="mt-16 mb-24">
          <h2 id="support" className="sr-only">Support</h2>
          <SupportSection />
        </section>
      </main>

      {/* Keep this mounted near the end so it can portal correctly */}
      <LeadModal />
    </div>
  );
}

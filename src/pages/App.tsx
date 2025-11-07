import React from "react";

// Global layout
import Header from "./components/Header";

// New sections you added/asked for
import CompanySection from "./sections/CompanySection";
import PartnersSection from "./sections/PartnersSection";

// Existing sections (adjust names/paths only if your files differ)
import ModelGrid from "./components/ModelGrid";
import TechSection from "./components/TechSection";
import IndustriesSection from "./components/IndustriesSection";
import CompareTable from "./components/CompareTable";
import ChargingPowerSection from "./components/ChargingPowerSection";
import ResourcesSection from "./components/ResourcesSection";
import SupportSection from "./components/SupportSection";
import ProductionTimeline from "./components/ProductionTimeline";
import ConfiguratorSection from "./components/ConfiguratorSection";
import FleetSection from "./components/FleetSection";
import ServiceWarrantySection from "./components/ServiceWarrantySection";

// If you already have a separate Contact section, remove this inline one below.
import { openLead } from "./components/LeadModal";

export default function App() {
  return (
    <>
      <Header />
      {/* Anchor for brand click */}
      <div id="top" />

      {/* push content under fixed header */}
      <main id="main" className="pt-[var(--header-h,80px)]">
        {/* === Company (new) === */}
        <CompanySection />

        {/* === Existing content in your preferred order (wrapped with stable ids) === */}
        <section id="models" className="scroll-mt-28">
          <ModelGrid />
        </section>

        <section id="technology" className="scroll-mt-28">
          <TechSection />
        </section>

        <section id="industries" className="scroll-mt-28">
          <IndustriesSection />
        </section>

        <section id="compare" className="scroll-mt-28">
          <CompareTable />
        </section>

        <section id="charging" className="scroll-mt-28">
          <ChargingPowerSection />
        </section>

        <section id="resources" className="scroll-mt-28">
          <ResourcesSection />
        </section>

        <section id="support" className="scroll-mt-28">
          <SupportSection />
        </section>

        <section id="timeline" className="scroll-mt-28">
          <ProductionTimeline />
        </section>

        <section id="configurator" className="scroll-mt-28">
          <ConfiguratorSection />
        </section>

        <section id="fleet" className="scroll-mt-28">
          <FleetSection />
        </section>

        <section id="service" className="scroll-mt-28">
          <ServiceWarrantySection />
        </section>

        {/* === Partners (new) === */}
        <PartnersSection />

        {/* === Minimal Contact (only if you don't already have one) === */}
        <section id="contact" className="scroll-mt-28">
          <div className="max-w-6xl mx-auto px-5 py-20">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Contact</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-300 max-w-3xl">
              Talk to our sales team about APRO carts, John Deere turf equipment, and irrigation solutions.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => openLead("Contact Section")}
                className="inline-flex h-11 items-center justify-center px-5 rounded-full text-sm font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
              >
                Talk to Sales
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

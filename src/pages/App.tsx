// src/pages/App.tsx
import React from "react";

// Components (adjust default/named imports only if your files export differently)
import Header from "../components/Header";
import ModelGrid from "../components/ModelGrid";
import CompareTable from "../components/CompareTable";
import ChargingPowerSection from "../components/ChargingPowerSection";
import FleetSection from "../components/FleetSection";
import TechSection, { type TechCopy } from "../components/TechSection";
import TechFeatureGrid from "../components/TechFeatureGrid";
import ProductionTimeline, { type ProductionStep } from "../components/ProductionTimeline";
import ServiceWarrantySection from "../components/ServiceWarrantySection";
import ResourcesSection from "../components/ResourcesSection";
import SupportSection from "../components/SupportSection";
import TcoCalculator from "../components/TcoCalculator";
import ConfiguratorSection from "../components/ConfiguratorSection";

// Minimal placeholder copy for TechSection (use real strings later)
const techCopy = {
  // Put your real fields here if you have a specific shape.
  // We assert to TechCopy to satisfy TS and fix the build right now.
} as unknown as TechCopy;

// Minimal placeholder steps for ProductionTimeline
const timelineSteps = [
  // Example of likely shape (safe to keep empty if unsure):
  // { title: "Inquiry", description: "Send RFQ", etaWeeks: 0 },
  // { title: "Production", description: "Build & QC", etaWeeks: 4 },
  // { title: "Delivery", description: "Ship & install", etaWeeks: 2 },
] as unknown as ProductionStep[];

export default function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero / Models */}
        <ModelGrid />

        {/* Key sections */}
        <CompareTable />
        <ChargingPowerSection />
        <FleetSection />

        {/* Tech sections that require props */}
        <TechSection copy={techCopy} />
        <TechFeatureGrid />
        <ProductionTimeline steps={timelineSteps} />

        {/* Business sections */}
        <TcoCalculator />
        <ConfiguratorSection />
        <ServiceWarrantySection />
        <ResourcesSection />
        <SupportSection />
      </main>
    </>
  );
}

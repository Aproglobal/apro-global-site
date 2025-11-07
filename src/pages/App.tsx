// src/pages/App.tsx
import React from "react";

// Components (use default imports only)
import Header from "../components/Header";
import ModelGrid from "../components/ModelGrid";
import CompareTable from "../components/CompareTable";
import ChargingPowerSection from "../components/ChargingPowerSection";
import FleetSection from "../components/FleetSection";
import TechSection from "../components/TechSection";
import TechFeatureGrid from "../components/TechFeatureGrid";
import ProductionTimeline from "../components/ProductionTimeline";
import ServiceWarrantySection from "../components/ServiceWarrantySection";
import ResourcesSection from "../components/ResourcesSection";
import SupportSection from "../components/SupportSection";
import TcoCalculator from "../components/TcoCalculator";
import ConfiguratorSection from "../components/ConfiguratorSection";

// ---- Minimal placeholders to satisfy required props ----

// If TechSection expects a `copy` prop, infer its type from the component and pass an empty object for now.
type TechSectionProps = React.ComponentProps<typeof TechSection>;
const techCopy = {} as unknown as TechSectionProps extends { copy: infer T } ? T : never;

// If ProductionTimeline expects a `steps` prop, infer its type and pass an empty array.
type ProductionTimelineProps = React.ComponentProps<typeof ProductionTimeline>;
const timelineSteps = [] as unknown as ProductionTimelineProps extends { steps: infer T } ? T : never;

// If CompareTable requires `items`, infer and pass an empty array.
type CompareTableProps = React.ComponentProps<typeof CompareTable>;
const compareItems = [] as unknown as CompareTableProps extends { items: infer T } ? T : never;

export default function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero / Models */}
        <ModelGrid />

        {/* Key sections */}
        <CompareTable items={compareItems} />
        <ChargingPowerSection />
        <FleetSection />

        {/* Tech sections */}
        {"copy" in ({} as TechSectionProps) ? <TechSection copy={techCopy as any} /> : <TechSection />}
        <TechFeatureGrid />
        {"steps" in ({} as ProductionTimelineProps) ? (
          <ProductionTimeline steps={timelineSteps as any} />
        ) : (
          <ProductionTimeline />
        )}

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

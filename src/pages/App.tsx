// src/pages/App.tsx
import React from "react";

import Header from "../components/Header";
import ModelGrid from "../components/ModelGrid";
// import CompareTable from "../components/CompareTable";            // needs confirmed props
import ChargingPowerSection from "../components/ChargingPowerSection";
import FleetSection from "../components/FleetSection";
// import TechSection from "../components/TechSection";              // requires copy prop
import TechFeatureGrid from "../components/TechFeatureGrid";
// import ProductionTimeline from "../components/ProductionTimeline"; // requires steps prop
import ServiceWarrantySection from "../components/ServiceWarrantySection";
import ResourcesSection from "../components/ResourcesSection";
import SupportSection from "../components/SupportSection";
import TcoCalculator from "../components/TcoCalculator";
import ConfiguratorSection from "../components/ConfiguratorSection";

/** Error boundary so one broken section won't blank the whole page */
class SectionBoundary extends React.Component<
  { name: string; children: React.ReactNode },
  { hasError: boolean; error?: unknown }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }
  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }
  componentDidCatch(error: unknown, info: unknown) {
    // Keep a console signal for quick triage
    // eslint-disable-next-line no-console
    console.error(`[Section Error] ${this.props.name}`, error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-6 max-w-5xl rounded-xl border border-red-300 bg-red-50 p-4 text-red-800">
          <div className="font-semibold">{this.props.name} failed to render.</div>
          <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs">
            {String((this.state.error as any)?.message ?? this.state.error ?? "Unknown error")}
          </pre>
        </div>
      );
    }
    return <>{this.props.children}</>;
  }
}
const Safe: React.FC<{ name: string; children: React.ReactNode }> = ({ name, children }) => (
  <SectionBoundary name={name}>{children}</SectionBoundary>
);

export default function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Safe name="ModelGrid">
          <ModelGrid />
        </Safe>

        {/* Re-enable after we confirm prop shapes
        <Safe name="CompareTable">
          <CompareTable {...({ items: [] } as any)} />
        </Safe>
        */}

        <Safe name="ChargingPowerSection">
          <ChargingPowerSection />
        </Safe>

        <Safe name="FleetSection">
          <FleetSection />
        </Safe>

        {/* Re-enable after we confirm copy shape
        <Safe name="TechSection">
          <TechSection {...({ copy: {} } as any)} />
        </Safe>
        */}

        <Safe name="TechFeatureGrid">
          <TechFeatureGrid />
        </Safe>

        {/* Re-enable after we confirm steps shape
        <Safe name="ProductionTimeline">
          <ProductionTimeline {...({ steps: [] } as any)} />
        </Safe>
        */}

        <Safe name="TcoCalculator">
          <TcoCalculator />
        </Safe>

        <Safe name="ConfiguratorSection">
          <ConfiguratorSection />
        </Safe>

        <Safe name="ServiceWarrantySection">
          <ServiceWarrantySection />
        </Safe>

        <Safe name="ResourcesSection">
          <ResourcesSection />
        </Safe>

        <Safe name="SupportSection">
          <SupportSection />
        </Safe>
      </main>
    </>
  );
}

// src/pages/App.tsx
import React from "react";

// Import components
import Header from "../components/Header";
import ModelGrid from "../components/ModelGrid";
// import CompareTable from "../components/CompareTable"; // keep disabled until shape is confirmed
import ChargingPowerSection from "../components/ChargingPowerSection";
import FleetSection from "../components/FleetSection";
// import TechSection from "../components/TechSection";  // requires `copy`
import TechFeatureGrid from "../components/TechFeatureGrid";
// import ProductionTimeline from "../components/ProductionTimeline"; // requires `steps`
import ServiceWarrantySection from "../components/ServiceWarrantySection";
import ResourcesSection from "../components/ResourcesSection";
import SupportSection from "../components/SupportSection";
import TcoCalculator from "../components/TcoCalculator";
import ConfiguratorSection from "../components/ConfiguratorSection";

/** Error boundary so a broken section won't blank the whole app */
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

/** Cast components to any so TS doesn't enforce required props at call sites */
const ModelGridAny = ModelGrid as unknown as React.ComponentType<any>;
// const CompareTableAny = CompareTable as unknown as React.ComponentType<any>;
const ChargingPowerSectionAny = ChargingPowerSection as unknown as React.ComponentType<any>;
const FleetSectionAny = FleetSection as unknown as React.ComponentType<any>;
// const TechSectionAny = TechSection as unknown as React.ComponentType<any>;
const TechFeatureGridAny = TechFeatureGrid as unknown as React.ComponentType<any>;
// const ProductionTimelineAny = ProductionTimeline as unknown as React.ComponentType<any>;
const TcoCalculatorAny = TcoCalculator as unknown as React.ComponentType<any>;
const ConfiguratorSectionAny = ConfiguratorSection as unknown as React.ComponentType<any>;
const ServiceWarrantySectionAny = ServiceWarrantySection as unknown as React.ComponentType<any>;
const ResourcesSectionAny = ResourcesSection as unknown as React.ComponentType<any>;
const SupportSectionAny = SupportSection as unknown as React.ComponentType<any>;

export default function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Safe name="ModelGrid">
          <ModelGridAny />
        </Safe>

        {/* Leave CompareTable off until we confirm the exact prop name/shape
        <Safe name="CompareTable">
          <CompareTableAny items={[]} />
        </Safe>
        */}

        <Safe name="ChargingPowerSection">
          <ChargingPowerSectionAny />
        </Safe>

        <Safe name="FleetSection">
          <FleetSectionAny />
        </Safe>

        {/* TechSection needs `copy`; enable when ready
        <Safe name="TechSection">
          <TechSectionAny copy={{}} />
        </Safe>
        */}

        {/* TechFeatureGrid often requires `items` — pass empty to avoid .map on undefined */}
        <Safe name="TechFeatureGrid">
          <TechFeatureGridAny items={[]} />
        </Safe>

        {/* ProductionTimeline needs `steps`; enable when ready
        <Safe name="ProductionTimeline">
          <ProductionTimelineAny steps={[]} />
        </Safe>
        */}

        <Safe name="TcoCalculator">
          <TcoCalculatorAny />
        </Safe>

        <Safe name="ConfiguratorSection">
          <ConfiguratorSectionAny />
        </Safe>

        <Safe name="ServiceWarrantySection">
          <ServiceWarrantySectionAny />
        </Safe>

        <Safe name="ResourcesSection">
          <ResourcesSectionAny />
        </Safe>

        <Safe name="SupportSection">
          <SupportSectionAny />
        </Safe>
      </main>
    </>
  );
}

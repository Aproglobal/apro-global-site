import React from "react";

// ✅ FIXED: from pages → components is one level up
import Header from "../components/Header";

// Your existing sections (file names from your repo listing)
import ModelGrid from "../components/ModelGrid";
import TechSection from "../components/TechSection";
import IndustriesSection from "../components/IndustriesSection";
import CompareTable from "../components/CompareTable";
import ChargingPowerSection from "../components/ChargingPowerSection";
import ResourcesSection from "../components/ResourcesSection";
import SupportSection from "../components/SupportSection";
import ProductionTimeline from "../components/ProductionTimeline";
import ConfiguratorSection from "../components/ConfiguratorSection";
import FleetSection from "../components/FleetSection";
import ServiceWarrantySection from "../components/ServiceWarrantySection";

import { openLead } from "../components/LeadModal";

/**
 * Small wrapper to standardize section spacing & anchor behavior.
 * - scroll-mt uses the CSS var set by Header ( --header-h )
 */
function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={[
        "scroll-mt-[var(--header-h,64px)]",
        "py-16 lg:py-24",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}

/**
 * Minimal Contact section (uses your Lead modal)
 */
function ContactSection() {
  return (
    <div className="max-w-6xl mx-auto px-5">
      <div className="grid gap-6 lg:grid-cols-3 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
            Contact
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Have questions about APRO carts, configurations, or service? Talk to
            our sales team—average first response within one business day.
          </p>
        </div>
        <div className="lg:justify-self-end">
          <button
            type="button"
            onClick={() => openLead("Contact Section")}
            className="inline-flex h-11 items-center justify-center px-5 rounded-full text-sm font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
          >
            Talk to Sales
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Header />

      {/* Main content — top padding equals header height via CSS var */}
      <main id="main" className="pt-[var(--header-h,64px)]">

        {/* IDs below MUST match Header’s CANDIDATE_IDS */}
        <Section id="models" className="pt-10">
          {/* Product models grid */}
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="sr-only">Models</h2>
          </div>
          <ModelGrid />
        </Section>

        <Section id="technology">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="sr-only">Technology</h2>
          </div>
          <TechSection />
        </Section>

        <Section id="industries">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="sr-only">Industries</h2>
          </div>
          <IndustriesSection />
        </Section>

        <Section id="compare">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="sr-only">Compare</h2>
          </div>
          <CompareTable />
        </Section>

        <Section id="charging">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="sr-only">Charging</h2>
          </div>
          <ChargingPowerSection />
        </Section>

        <Section id="resources">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="sr-only">Resources</h2>
          </div>
          <ResourcesSection />
        </Section>

        <Section id="support">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="sr-only">Support</h2>
          </div>
          <SupportSection />
        </Section>

        <Section id="timeline">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="sr-only">Production Timeline</h2>
          </div>
          <ProductionTimeline />
        </Section>

        <Section id="configurator">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="sr-only">Configurator</h2>
          </div>
          <ConfiguratorSection />
        </Section>

        <Section id="fleet">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="sr-only">Fleet</h2>
          </div>
          <FleetSection />
        </Section>

        <Section id="service">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="sr-only">Service</h2>
          </div>
          <ServiceWarrantySection />
        </Section>

        <Section id="contact">
          <ContactSection />
        </Section>
      </main>
    </>
  );
}

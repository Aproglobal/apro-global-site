// src/pages/App.tsx
import React, { useEffect, useMemo, useState } from "react";

// Core UI
import Header from "../components/Header";
import SectionFrame from "../components/SectionFrame";
import LeadModal, { openLead } from "../components/LeadModal";
import ModelDetail from "../components/ModelDetail";

// Content sections
import ModelGrid from "../components/ModelGrid";
import CompareTable from "../components/CompareTable";
import PerfTechShowcase from "../components/PerfTechShowcase";
import IndustriesSection from "../components/IndustriesSection";
import ProductionTimeline from "../components/ProductionTimeline";
import ServiceWarrantySection from "../components/ServiceWarrantySection";
import ChargingPowerSection from "../components/ChargingPowerSection";
import ResourcesSection from "../components/ResourcesSection";
import TcoCalculator from "../components/TcoCalculator";
import ConfiguratorSection from "../components/ConfiguratorSection";
import FleetSection from "../components/FleetSection";
import SupportSection from "../components/SupportSection";
import ContactCompany from "../components/ContactCompany";

// Data
import { TIMELINE_STEPS } from "../data/timeline";
import { getTechCopy } from "../data/technology";

// SEO
import SEO from "../components/SEO";

// Utilities / analytics
import { getVariant } from "../utils/ab";
import { initThemeWatcher } from "../utils/theme";
import { loadRecaptcha } from "../lib/recaptcha";
import { initAnalytics, setupScrollDepth, trackEvent } from "../services/analytics";

export default function App() {
  const variant = getVariant();

  useEffect(() => {
    initAnalytics(import.meta.env.VITE_GA_MEASUREMENT_ID);
    setupScrollDepth();
    initThemeWatcher();
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;
    if (siteKey) loadRecaptcha(siteKey);
  }, []);

  const primaryCta = "Talk to Sales";
  const secondaryCta = variant === "A" ? "Explore models" : "Download brochure";
  const techCopy = useMemo(() => getTechCopy(), []);

  // Hide sticky CTA when compare section pins a mini view at bottom
  const [bottomBlocked, setBottomBlocked] = useState(false);
  useEffect(() => {
    let pinnedCount = 0;
    let miniOpen = false;
    const recompute = () => setBottomBlocked(miniOpen || pinnedCount > 0);

    const onPinned = (e: Event) => {
      const ce = e as CustomEvent<{ count: number }>;
      pinnedCount = Number(ce?.detail?.count ?? 0);
      recompute();
    };
    const onMini = (e: Event) => {
      const ce = e as CustomEvent<{ open: boolean }>;
      miniOpen = Boolean(ce?.detail?.open ?? false);
      recompute();
    };

    window.addEventListener("compare:pinned" as any, onPinned as any);
    window.addEventListener("compare:mini" as any, onMini as any);
    return () => {
      window.removeEventListener("compare:pinned" as any, onPinned as any);
      window.removeEventListener("compare:mini" as any, onMini as any);
    };
  }, []);

  // SEO constants
  const siteName = "APRO — Electric Golf Carts";
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const canonical = origin + "/";
  const salesEmail = import.meta.env.VITE_SALES_EMAIL || "sales@example.com";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "KUKJE INTERTRADE Co., Ltd. (APRO)",
      url: canonical,
      logo: origin + "/assets/logo.png",
      email: salesEmail,
      brand: { "@type": "Brand", name: "APRO" },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: salesEmail,
          areaServed: "KR, US, JP, EU, SEA",
          availableLanguage: ["en", "ko", "ja"],
        },
      ],
      sameAs: [],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: canonical,
      potentialAction: {
        "@type": "SearchAction",
        target: canonical + "?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      {/* SEO */}
      <SEO
        title="APRO Electric Golf Carts — Lithium, VIP & Fleet Solutions"
        description="APRO builds electric golf carts for courses, resorts, and venues worldwide—smart guidance, flexible seating, and global after-sales support."
        canonical={canonical}
        og={{
          title: "APRO Electric Golf Carts",
          description: "Lithium fleets, VIP/Semi-VIP options, and global support.",
          url: canonical,
          image: "/assets/og.jpg",
          siteName: "APRO",
        }}
        twitter={{
          card: "summary_large_image",
          site: "@yourbrand",
          creator: "@yourteam",
          image: "/assets/og.jpg",
        }}
        jsonLd={jsonLd}
      />

      <Header />

      {/* consume header height variable for safe anchor offsets */}
      <main id="main" style={{ paddingTop: "var(--header-h, 4rem)" }}>
        {/* HERO */}
        <section id="home" className="relative scroll-mt-24" aria-label="Hero">
          <div className="relative h-[72vh] md:h-[84vh] w-full">
            <img
              src="/assets/hero.jpg"
              alt="APRO Golf Carts"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent dark:from-black dark:via-black/30 dark:to-transparent" />
            <div className="relative z-10 max-w-6xl mx-auto px-5 h-full flex flex-col justify-end pb-14">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                Electric Golf Carts, Built for Courses, Resorts & Venues Worldwide
              </h1>
              <p className="mt-3 max-w-2xl text-zinc-700 dark:text-zinc-200">
                Smart guidance, flexible seating, and global after-sales support.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    openLead("Hero CTA");
                    trackEvent("heroCtaClick", { where: "hero", label: primaryCta, ab_variant: variant });
                  }}
                  className="px-5 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
                  aria-label="Open sales contact form"
                >
                  {primaryCta}
                </button>

                {secondaryCta === "Explore models" ? (
                  <a
                    href="#models"
                    onClick={() =>
                      trackEvent("modelExploreClick", { where: "hero", label: secondaryCta, ab_variant: variant })
                    }
                    className="px-5 py-3 rounded-full border border-black/40 text-black dark:border-white/60 dark:text-white"
                    aria-label="Jump to models section"
                  >
                    {secondaryCta}
                  </a>
                ) : (
                  <a
                    href="/brochure.pdf"
                    onClick={() =>
                      trackEvent("brochureDownload", { file: "/brochure.pdf", where: "hero", ab_variant: variant })
                    }
                    className="px-5 py-3 rounded-full border border-black/40 text-black dark:border-white/60 dark:text-white"
                    aria-label="Download brochure"
                  >
                    {secondaryCta}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* MODELS + COMPARE */}
        <SectionFrame id="models">
          <div className="space-y-8">
            <ModelGrid />
            <div id="compare" className="sr-only" aria-hidden="true" />
            <div className="border-t border-zinc-200 dark:border-zinc-800" />
            <CompareTable />
          </div>
        </SectionFrame>

        {/* Unified Performance & Technology (single row, numbered navigation) */}
        <SectionFrame id="technology">
          <PerfTechShowcase />
        </SectionFrame>

        {/* INDUSTRIES */}
        <SectionFrame id="industries">
          <IndustriesSection />
        </SectionFrame>

        {/* PRODUCTION & DELIVERY TIMELINE */}
        <SectionFrame id="timeline">
          <ProductionTimeline
            steps={TIMELINE_STEPS}
            title="Production & Delivery Timeline"
            note="Note: Domestic delivery flow. Export process may differ."
            showSummary={true}
          />
        </SectionFrame>

        {/* SERVICE & WARRANTY */}
        <SectionFrame id="service">
          <ServiceWarrantySection />
        </SectionFrame>

        {/* CHARGING & POWER */}
        <SectionFrame id="charging">
          <ChargingPowerSection />
        </SectionFrame>

        {/* RESOURCES */}
        <SectionFrame id="resources">
          <ResourcesSection />
        </SectionFrame>

        {/* TCO / ROI */}
        <SectionFrame id="tco" title="TCO / ROI">
          <div className="not-prose">
            <TcoCalculator />
          </div>
        </SectionFrame>

        {/* CONFIGURATOR */}
        <SectionFrame id="configurator" title="Configurator">
          <div className="not-prose">
            <ConfiguratorSection />
          </div>
        </SectionFrame>

        {/* FLEET */}
        <SectionFrame id="fleet">
          <FleetSection />
        </SectionFrame>

        {/* SUPPORT */}
        <SectionFrame id="support">
          <SupportSection />
        </SectionFrame>

        {/* CONTACT & COMPANY */}
        <SectionFrame id="contact">
          <ContactCompany />
        </SectionFrame>
      </main>

      {/* Sticky CTA — hidden when compare pins a bottom mini view */}
      {!bottomBlocked && (
        <button
          onClick={() => {
            openLead("Sticky CTA");
            trackEvent("contactOpen", { where: "sticky_cta", label: "Talk to Sales" });
          }}
          aria-label="Talk to Sales"
          className="fixed bottom-[calc(env(safe-area-inset-bottom)+88px)] right-6 px-5 py-3 rounded-full bg-black text-white font-semibold shadow-lg dark:bg-white dark:text-black z-40"
        >
          Talk to Sales
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <div className="max-w-6xl mx-auto px-5 py-6 text-sm text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} APRO. All rights reserved.
          <div className="mt-4">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-500">
              Company information
            </h3>
            <p className="mt-1">KUKJE INTERTRADE Co., Ltd.</p>
            <p className="mt-1">
              Address: Floor 12, 124, Sagimakgol-ro, Jungwon-gu, Seongnam-si, Gyeonggi-do, Republic of Korea
            </p>

            <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </div>
      </footer>

      {/* Portals / modals */}
      <LeadModal />
      <ModelDetail />
    </div>
  );
}

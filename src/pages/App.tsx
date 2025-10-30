// src/pages/App.tsx
import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import ModelGrid from "../components/ModelGrid";
import CompareTable from "../components/CompareTable";
import TechSection from "../components/TechSection";
import FleetSection from "../components/FleetSection";
import SupportSection from "../components/SupportSection";
import LeadModal, { openLead } from "../components/LeadModal";
import ModelDetail from "../components/ModelDetail";
import { getVariant } from "../utils/ab";// src/pages/App.tsx
import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import ModelGrid from "../components/ModelGrid";
import CompareTable from "../components/CompareTable";
import TechSection from "../components/TechSection";
import FleetSection from "../components/FleetSection";
import SupportSection from "../components/SupportSection";
import LeadModal, { openLead } from "../components/LeadModal";
import ModelDetail from "../components/ModelDetail";
import { getVariant } from "../utils/ab";
import { setupScrollDepth, trackEvent, initAnalytics } from "../services/analytics";
import { initThemeWatcher } from "../utils/theme";
import { loadRecaptcha } from "../lib/recaptcha";
import { getTechCopy } from "../data/technology";

// Production timeline
import ProductionTimeline from "../components/ProductionTimeline";
import { TIMELINE_STEPS } from "../data/timeline";

// NEW sections
import IndustriesSection from "../components/IndustriesSection";
import ServiceWarrantySection from "../components/ServiceWarrantySection";
import ChargingPowerSection from "../components/ChargingPowerSection";
import ResourcesSection from "../components/ResourcesSection";
import TcoCalculator from "../components/TcoCalculator";
import ConfiguratorSection from "../components/ConfiguratorSection";

export default function App() {
  const variant = getVariant();

  useEffect(() => {
    initAnalytics(import.meta.env.VITE_GA_MEASUREMENT_ID);
    setupScrollDepth();
    initThemeWatcher();

    // reCAPTCHA v3 preload
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;
    if (siteKey) loadRecaptcha(siteKey);
  }, []);

  const primaryCta = "Talk to Sales";
  const secondaryCta = variant === "A" ? "Explore models" : "Download brochure";

  const techCopy = useMemo(() => getTechCopy(), []);

  // CompareTable가 하단을 차지할 때 플로팅 CTA 자동 숨김
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

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Header />

      <main id="main" className="pt-16">
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
        <section id="models" className="scroll-mt-24" aria-label="Models">
          <ModelGrid />
          <div className="border-t border-zinc-200 dark:border-zinc-800" />
          <CompareTable />
        </section>

        {/* TECHNOLOGY */}
        <section id="technology" className="scroll-mt-24" aria-label="Technology">
          <div className="border-t border-zinc-200 dark:border-zinc-800" />
          <TechSection copy={techCopy} />
        </section>

        {/* INDUSTRIES */}
        <section id="industries" className="scroll-mt-24" aria-label="Industries">
          <div className="border-t border-zinc-200 dark:border-zinc-800" />
          <IndustriesSection />
        </section>

        {/* PRODUCTION TIMELINE */}
        <section id="timeline" className="scroll-mt-24" aria-label="Production timeline">
          <div className="border-t border-zinc-200 dark:border-zinc-800" />
          <ProductionTimeline steps={TIMELINE_STEPS} />
        </section>

        {/* SERVICE & WARRANTY */}
        <section id="service" className="scroll-mt-24" aria-label="Service and warranty">
          <div className="border-t border-zinc-200 dark:border-zinc-800" />
          <ServiceWarrantySection />
        </section>

        {/* CHARGING & POWER */}
        <section id="charging" className="scroll-mt-24" aria-label="Charging and power">
          <div className="border-t border-zinc-200 dark:border-zinc-800" />
          <ChargingPowerSection />
        </section>

        {/* RESOURCES */}
        <section id="resources" className="scroll-mt-24" aria-label="Resources">
          <div className="border-t border-zinc-200 dark:border-zinc-800" />
          <ResourcesSection />
        </section>

        {/* TCO / ROI */}
        <section id="tco" className="scroll-mt-24" aria-label="Total cost of ownership">
          <div className="border-t border-zinc-200 dark:border-zinc-800" />
          <TcoCalculator />
        </section>

        {/* CONFIGURATOR */}
        <section id="configurator" className="scroll-mt-24" aria-label="Configurator">
          <div className="border-t border-zinc-200 dark:border-zinc-800" />
          <ConfiguratorSection />
        </section>

        {/* FLEET */}
        <section id="fleet" className="scroll-mt-24" aria-label="Fleet">
          <div className="border-t border-zinc-200 dark:border-zinc-800" />
          <FleetSection />
        </section>

        {/* SUPPORT */}
        <section id="support" className="scroll-mt-24" aria-label="Support">
          <div className="border-t border-zinc-200 dark:border-zinc-800" />
          <SupportSection />
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="scroll-mt-24 py-20 bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white"
          aria-label="Contact"
        >
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Contact</h2>
            <p className="mt-2 text-zinc-700 max-w-2xl dark:text-zinc-200">
              Email us at{" "}
              <a href={`mailto:${import.meta.env.VITE_SALES_EMAIL || "sales@example.com"}`} className="underline">
                {import.meta.env.VITE_SALES_EMAIL || "sales@example.com"}
              </a>{" "}
              or open the form above.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  openLead("Contact CTA");
                  trackEvent("contactOpen", { where: "contact_section", label: "Talk to Sales" });
                }}
                className="px-5 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
              >
                Talk to Sales
              </button>

              <a
                href="/brochure.pdf"
                onClick={() => trackEvent("brochureDownload", { file: "/brochure.pdf", where: "contact_section" })}
                className="px-5 py-3 rounded-full border border-black/30 dark:border-white/40"
              >
                Download brochure (PDF)
              </a>
            </div>

            {/* ✅ reCAPTCHA v3 공식 문구 (모바일에서 배지 숨길 때 필수) */}
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </section>
      </main>

      {/* Sticky CTA — compare가 하단을 점유할 때는 자동 숨김 */}
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

            {/* ✅ reCAPTCHA v3 공식 문구 (푸터에도 노출해두면 가장 안전) */}
            <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </div>
      </footer>

      <LeadModal />
      <ModelDetail />
    </div>
  );
}

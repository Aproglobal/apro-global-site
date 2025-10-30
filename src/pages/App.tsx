import React, { useEffect, useMemo } from "react";
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

// Timeline
import ProductionTimeline from "../components/ProductionTimeline";
import { TIMELINE_STEPS } from "../data/timeline";

// New sections
import IndustriesSection from "../components/IndustriesSection";
import AfterSalesSection from "../components/AfterSalesSection";
import CertificationsSection from "../components/CertificationsSection";
import DownloadsSection from "../components/DownloadsSection";
import CaseStudiesSection from "../components/CaseStudiesSection";
import ExportSection from "../components/ExportSection";
import SustainabilitySection from "../components/SustainabilitySection";
import PartnerProgramSection from "../components/PartnerProgramSection";

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

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Header />

      <main className="pt-16">
        {/* HERO */}
        <section id="home" className="relative">
          <div className="relative h-[70vh] md:h-[80vh] w-full">
            <img
              src="/assets/hero.jpg"
              className="absolute inset-0 w-full h-full object-cover"
              alt="APRO Golf Carts"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent dark:from-black dark:via-black/30 dark:to-transparent" />
            <div className="relative z-10 max-w-6xl mx-auto px-5 h-full flex flex-col justify-end pb-14">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                Smart Electric Carts for Courses, Resorts &amp; Venues
              </h1>
              <p className="mt-3 max-w-2xl text-zinc-700 dark:text-zinc-200">
                Safer guidance, flexible seating, and dependable after-sales — delivered worldwide.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    openLead("Hero CTA");
                    trackEvent("cta_click", { where: "hero", label: primaryCta, variant });
                  }}
                  className="px-5 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
                >
                  {primaryCta}
                </button>

                {secondaryCta === "Explore models" ? (
                  <a
                    href="#models"
                    onClick={() => trackEvent("cta_click", { where: "hero", label: secondaryCta, variant })}
                    className="px-5 py-3 rounded-full border border-black/40 text-black dark:border-white/60 dark:text-white"
                  >
                    {secondaryCta}
                  </a>
                ) : (
                  <a
                    href="/brochure.pdf"
                    onClick={() => trackEvent("brochure_download", { file: "/brochure.pdf", where: "hero" })}
                    className="px-5 py-3 rounded-full border border-black/40 text-black dark:border-white/60 dark:text-white"
                  >
                    {secondaryCta}
                  </a>
                )}
              </div>

              {/* Value props badges */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { t: "Electronic Guidance", d: "Reduce incidents and improve pace-of-play." },
                  { t: "Flexible Seating", d: "2/4/6-seat, VIP and utility options." },
                  { t: "Service You Can Count On", d: "Warranty, parts & on-site support." },
                ].map((v, i) => (
                  <div key={i} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/70 backdrop-blur p-3">
                    <div className="text-sm font-semibold">{v.t}</div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5">{v.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <IndustriesSection />

        <section id="models" className="pt-12">
          <ModelGrid />
        </section>

        <CompareTable />

        <section id="technology" className="pt-6">
          <TechSection copy={techCopy} />
        </section>

        {/* Timeline (no highlight by default) */}
        <ProductionTimeline steps={TIMELINE_STEPS} showSummary />

        <section id="fleet">
          <FleetSection />
        </section>

        <AfterSalesSection />
        <CertificationsSection />
        <DownloadsSection />
        <CaseStudiesSection />
        <ExportSection />
        <SustainabilitySection />
        <PartnerProgramSection />

        <section id="support">
          <SupportSection />
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Contact</h2>
            <p className="mt-2 text-zinc-700 max-w-2xl dark:text-zinc-200">
              Email us at{" "}
              <a
                href={`mailto:${import.meta.env.VITE_SALES_EMAIL || "sales@example.com"}`}
                className="underline"
                onClick={() => trackEvent('nav_click', { label: 'Email link', location: 'contact' })}
              >
                {import.meta.env.VITE_SALES_EMAIL || "sales@example.com"}
              </a>{" "}
              or open the form above.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  openLead("Contact CTA");
                  trackEvent("cta_click", { where: "contact", label: "Talk to Sales" });
                }}
                className="px-5 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
              >
                Talk to Sales
              </button>

              <a
                href="/brochure.pdf"
                onClick={() => trackEvent("brochure_download", { file: "/brochure.pdf", where: "contact" })}
                className="px-5 py-3 rounded-full border border-black/30 dark:border-white/40"
              >
                Download brochure (PDF)
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky CTA */}
      <button
        onClick={() => {
          openLead("Sticky CTA");
          trackEvent("cta_click", { where: "sticky", label: "Talk to Sales" });
        }}
        aria-label="Talk to Sales"
        className="
          fixed
          bottom-[96px]
          right-6
          px-5 py-3 rounded-full
          bg-black text-white font-semibold shadow-lg
          dark:bg-white dark:text-black
          z-40
        "
      >
        Talk to Sales
      </button>

      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <div className="max-w-6xl mx-auto px-5 py-6 text-sm text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} APRO. All rights reserved.
          <div className="mt-4">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-500">Company information</h3>
            <p className="mt-1">KUKJE INTERTRADE Co., Ltd.</p>
            <p className="mt-1">Address: Floor 12, 124, Sagimakgol-ro, Jungwon-gu, Seongnam-si, Gyeonggi-do, Republic of Korea</p>
          </div>
        </div>
      </footer>

      <LeadModal />
      <ModelDetail />
    </div>
  );
}

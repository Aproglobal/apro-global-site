import React, { useEffect, useMemo, useState, Suspense } from "react";
import { Header } from "../components/Header";
import { DotRail } from "../components/DotRail";
import LeadModal, { openLead } from "../components/LeadModal";
import ModelDetail from "../components/ModelDetail";
import ModelGrid from "../components/ModelGrid";
const LazyCompareTable = React.lazy(() => import("../components/CompareTable"));
import TechSection from "../components/TechSection";
import ProductionTimeline from "../components/ProductionTimeline";
import { TIMELINE_STEPS } from "../data/timeline";
import ContactCompany from "../components/ContactCompany";

import { getVariant } from "../utils/ab";
import { setupScrollDepth, trackEvent, initAnalytics } from "../services/analytics";
import { initThemeWatcher } from "../utils/theme";
import { loadRecaptcha } from "../lib/recaptcha";
import { getTechCopy } from "../data/technology";
import SEO from "../components/SEO";

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

  // Compare modal
  const [compareOpen, setCompareOpen] = useState(false);

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

  // Tech drawer
  const [showTechMore, setShowTechMore] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
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

      {/* Right-side dot rail */}
      <DotRail ids={["home", "models", "technology", "timeline", "contact"]} />

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

        {/* MODELS — compact + Compare (modal) */}
        <section id="models" className="scroll-mt-24 py-16" aria-label="Models">
          <div className="max-w-6xl mx-auto px-5">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Models</h2>
                <p className="mt-2 text-zinc-700 dark:text-zinc-300">
                  Lithium fleets, VIP/Semi-VIP seating, smart guidance—built for performance and uptime.
                </p>
              </div>
              <div className="hidden md:flex gap-3">
                <button
                  onClick={() => setCompareOpen(true)}
                  className="px-4 py-2 rounded-full border border-black/30 dark:border-white/40"
                >
                  Compare models
                </button>
                <a
                  href="#contact"
                  className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black"
                  onClick={() => trackEvent("contactOpen", { where: "models_top" })}
                >
                  Ask an expert
                </a>
              </div>
            </div>

            <div className="mt-8">
              <ModelGrid />
            </div>

            {/* Mobile actions */}
            <div className="mt-6 md:hidden flex gap-3">
              <button
                onClick={() => setCompareOpen(true)}
                className="px-4 py-2 rounded-full border border-black/30 dark:border-white/40 w-full"
              >
                Compare models
              </button>
              <a
                href="#contact"
                className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black w-full text-center"
                onClick={() => trackEvent("contactOpen", { where: "models_mobile" })}
              >
                Ask an expert
              </a>
            </div>
          </div>
        </section>

        {/* TECHNOLOGY — short + drawer */}
        <section id="technology" className="scroll-mt-24 py-16" aria-label="Technology">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Technology</h2>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300 max-w-3xl">
              {techCopy?.highlights?.[0] || "High-efficiency powertrain, durable chassis, guidance-ready electronics."}
            </p>

            <div className="mt-6">
              <button
                onClick={() => setShowTechMore((v) => !v)}
                className="px-4 py-2 rounded-full border border-black/30 dark:border-white/40"
                aria-expanded={showTechMore}
                aria-controls="tech-more"
              >
                {showTechMore ? "Hide details" : "Learn more"}
              </button>
            </div>

            {showTechMore && (
              <div id="tech-more" className="mt-8 border rounded-2xl border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
                <TechSection copy={techCopy} />
              </div>
            )}
          </div>
        </section>

        {/* TIMELINE — trimmed to 2 steps (only images you have) */}
        <section id="timeline" className="scroll-mt-24 py-16" aria-label="Production & Delivery Timeline">
          <div className="max-w-6xl mx-auto px-5">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Production & Delivery</h2>
                <p className="mt-2 text-zinc-700 dark:text-zinc-300">
                  From factory release to on-site delivery & installation.
                </p>
              </div>
              <a
                href="#contact"
                className="hidden md:inline-flex px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black"
              >
                Plan your delivery
              </a>
            </div>

            <div className="mt-8">
              <ProductionTimeline steps={TIMELINE_STEPS} />
            </div>
          </div>
        </section>

        {/* CONTACT + COMPANY (no partners) */}
        <section id="contact" className="scroll-mt-24" aria-label="Contact & Company">
          <ContactCompany />
        </section>
      </main>

      {/* Compare Modal (lazy) */}
      {compareOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setCompareOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative z-10 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-[95vw] max-w-6xl max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-semibold">Compare Models</h3>
              <button
                onClick={() => setCompareOpen(false)}
                aria-label="Close"
                className="px-3 py-1 rounded-full border border-black/20 dark:border-white/30"
              >
                Close
              </button>
            </div>
            <div className="p-2 md:p-4 overflow-auto">
              <Suspense fallback={<div className="p-6 text-sm opacity-70">Loading…</div>}>
                <LazyCompareTable />
              </Suspense>
            </div>
          </div>
        </div>
      )}

      {/* Sticky CTA */}
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

      <LeadModal />
      <ModelDetail />
    </div>
  );
}

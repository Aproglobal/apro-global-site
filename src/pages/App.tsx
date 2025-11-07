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
import IndustriesSection from "../components/IndustriesSection";
import ServiceWarrantySection from "../components/ServiceWarrantySection";
import ChargingPowerSection from "../components/ChargingPowerSection";
import ConfiguratorSection from "../components/ConfiguratorSection";
import SupportSection from "../components/SupportSection";
import ContactCompany from "../components/ContactCompany";

// Premium, one-item-at-a-time renderers
import StepGallery from "../components/StepGallery";
import FeatureGroupSection from "../components/FeatureGroupSection";

// SEO
import SEO from "../components/SEO";

// Utilities / analytics
import { getVariant } from "../utils/ab";
import { initThemeWatcher } from "../utils/theme";
import { loadRecaptcha } from "../lib/recaptcha";
import { initAnalytics, setupScrollDepth, trackEvent } from "../services/analytics";

/** ------------------------------------------------
 * Slides: Electronic Guidance
 * (Update image paths to real assets under /public/guidance/*)
 * ------------------------------------------------- */
const GUIDANCE_ELECTRONIC_SLIDES = [
  {
    id: "e-line",
    title: "Buried Guidance Line",
    subtitle: "Defines the driving route via underground wire",
    img: "/guidance/egps_line.jpg",
    bullets: [
      "Guidance wire embedded along the cart path",
      "Route design aligned with course policies",
      "Durable, waterproof installation for long-term operation"
    ],
    cta: { label: "Design a route", href: "#contact" }
  },
  {
    id: "e-sensor",
    title: "Underbody Guidance Sensor",
    subtitle: "Detects the wire while driving",
    img: "/guidance/egps_sensor.jpg",
    bullets: [
      "Underbody sensor continuously detects the embedded line",
      "Real-time left/right correction minimizes deviation",
      "Diagnostic mode supports quick maintenance checks"
    ]
  },
  {
    id: "e-controller",
    title: "Motor Controller Integration",
    subtitle: "Signals delivered to the drive controller",
    img: "/guidance/egps_controller.jpg",
    bullets: [
      "Sensor deviation is fed into the controller",
      "Speed/steering correction for stable tracking",
      "Zone-based speed and stop scenarios"
    ]
  },
  {
    id: "e-ops",
    title: "Operations & Safety",
    subtitle: "Speed & zone control, protective rules",
    img: "/guidance/egps_ops.jpg",
    bullets: [
      "Entry restriction to protect fairways and sensitive areas",
      "Auto slow-down on bridges and steep grades",
      "Off-route/stop event logging for audits"
    ]
  }
] as const;

/** ------------------------------------------------
 * Slides: Voice Guidance
 * ------------------------------------------------- */
const GUIDANCE_VOICE_SLIDES = [
  {
    id: "v-brake",
    title: "Braking Alerts",
    subtitle: "Audio warning on hard braking",
    img: "/guidance/voice_brake.jpg",
    bullets: [
      "Immediate voice alert when sudden braking is detected",
      "Raises passenger awareness and prevents accidents",
      "Customizable phrases to match course policies"
    ],
    cta: { label: "Configure alerts", href: "#contact" }
  },
  {
    id: "v-accel",
    title: "Acceleration Alerts",
    subtitle: "Guidance on hard acceleration",
    img: "/guidance/voice_accel.jpg",
    bullets: [
      "Alerts on hard acceleration or wheel slip",
      "Deters aggressive driving and protects equipment",
      "Zone-specific thresholds and volume controls"
    ]
  },
  {
    id: "v-custom",
    title: "Custom Language & Volume",
    subtitle: "Multi-language, volume & frequency control",
    img: "/guidance/voice_custom.jpg",
    bullets: [
      "Language packs (EN/KR/JP etc.) for global operations",
      "Adjust volume, frequency, and conditions",
      "Night/Event modes to reduce disturbance"
    ]
  }
] as const;

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
          availableLanguage: ["en", "ko", "ja"]
        }
      ],
      sameAs: []
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: canonical,
      potentialAction: {
        "@type": "SearchAction",
        target: canonical + "?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      {/* SEO */}
      <SEO
        title="APRO Electric Golf Carts — Lithium, Technology & Safety"
        description="APRO builds electric golf carts for courses, resorts, and venues worldwide—advanced technology, guidance systems, and global support."
        canonical={canonical}
        og={{
          title: "APRO Electric Golf Carts",
          description: "Lithium performance, advanced technology, and operator safety.",
          url: canonical,
          image: "/assets/og.jpg",
          siteName: "APRO"
        }}
        twitter={{
          card: "summary_large_image",
          site: "@yourbrand",
          creator: "@yourteam",
          image: "/assets/og.jpg"
        }}
        jsonLd={jsonLd}
      />

      <Header />

      {/* safe anchor offset under sticky header */}
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

        {/* PERFORMANCE — one large slide at a time */}
        <SectionFrame
          id="performance"
          title="Performance"
          note="AC 48V 4.6 kW (LSIS/Hyosung) motor, SK Mobile Energy lithium packs, 4-wheel independent/MacPherson suspension, and hydraulic disc brakes — built for mountainous courses."
        >
          <FeatureGroupSection group="performance" />
        </SectionFrame>

        {/* TECHNOLOGY — one large slide at a time */}
        <SectionFrame
          id="technology"
          title="Technology"
          note="Comfort, storage, sensing, and service — heated seats, 12V vehicle charger, ABS+ASA body, ultrasonic detection, cart guard spacing, −40~+85 °C sensor validation, and patented brake control."
        >
          <FeatureGroupSection group="technology" />
        </SectionFrame>

        {/* TECHNOLOGY DETAIL — Electronic Guidance */}
        <SectionFrame
          id="tech-electronic-guidance"
          title="Electronic Guidance"
          note="For route guidance, a wire is buried under the cart path; the underbody guidance sensor detects the wire during operation and sends signals to the drive controller to keep the cart on course."
        >
          <StepGallery
            slides={GUIDANCE_ELECTRONIC_SLIDES as any}
            onChange={(idx) => trackEvent("eguidance_slide_change", { index: idx })}
          />
        </SectionFrame>

        {/* TECHNOLOGY DETAIL — Voice Guidance */}
        <SectionFrame
          id="tech-voice-guidance"
          title="Voice Guidance"
          note="Speakers deliver immediate warnings for events such as sudden braking or hard acceleration; language, volume, and frequency are adjustable to suit course policy."
        >
          <StepGallery
            slides={GUIDANCE_VOICE_SLIDES as any}
            onChange={(idx) => trackEvent("vguidance_slide_change", { index: idx })}
          />
        </SectionFrame>

        {/* INDUSTRIES */}
        <SectionFrame id="industries" title="Industries">
          <IndustriesSection />
        </SectionFrame>

        {/* SERVICE & WARRANTY */}
        <SectionFrame id="service" title="Service & Warranty">
          <ServiceWarrantySection />
        </SectionFrame>

        {/* CHARGING & POWER */}
        <SectionFrame id="charging" title="Charging & Power">
          <ChargingPowerSection />
        </SectionFrame>

        {/* CONFIGURATOR */}
        <SectionFrame id="configurator" title="Configurator">
          <div className="not-prose">
            <ConfiguratorSection />
          </div>
        </SectionFrame>

        {/* SUPPORT */}
        <SectionFrame id="support" title="Support">
          <SupportSection />
        </SectionFrame>

        {/* CONTACT & COMPANY */}
        <SectionFrame id="contact" title="Contact & Company">
          <ContactCompany />
        </SectionFrame>

        {/* Back-compat invisible anchors (removed sections) */}
        <div id="timeline" className="sr-only" aria-hidden="true" />
        <div id="resources" className="sr-only" aria-hidden="true" />
        <div id="tco" className="sr-only" aria-hidden="true" />
        <div id="fleet" className="sr-only" aria-hidden="true" />
        {/* Legacy combined guidance anchor for any existing links */}
        <div id="guidance" className="sr-only" aria-hidden="true" />
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

// src/pages/App.tsx
import React, { useEffect, useMemo, useState } from "react";

// Core UI
import Header from "../components/Header";
import SectionFrame from "../components/SectionFrame";
import LeadModal, { openLead } from "../components/LeadModal";
import ModelDetail from "../components/ModelDetail";

// Sections
import ModelGrid from "../components/ModelGrid";
import CompareTable from "../components/CompareTable";
import IndustriesSection from "../components/IndustriesSection";
import ServiceWarrantySection from "../components/ServiceWarrantySection";
import ChargingPowerSection from "../components/ChargingPowerSection";
import SupportSection from "../components/SupportSection";
import ContactCompany from "../components/ContactCompany";

// SEO
import SEO from "../components/SEO";

// Utilities / analytics
import { getVariant } from "../utils/ab";
import { initThemeWatcher } from "../utils/theme";
import { loadRecaptcha } from "../lib/recaptcha";
import { initAnalytics, setupScrollDepth, trackEvent } from "../services/analytics";

// -------------------------------------------------------------
// Lightweight, accessible gallery with arrows + numbered dots
// -------------------------------------------------------------
type Slide = {
  id: string;
  title: string;
  subtitle?: string;
  img: string; // /public path
  bullets?: string[];
  cta?: { label: string; href: string };
};

function GalleryPager({
  id,
  title,
  note,
  slides,
  startIndex = 0,
}: {
  id?: string;
  title?: string;
  note?: string;
  slides: ReadonlyArray<Slide>;
  startIndex?: number;
}) {
  const [idx, setIdx] = useState(startIndex);
  const total = slides.length;
  const go = (n: number) => setIdx(((n % total) + total) % total);
  const prev = () => go(idx - 1);
  const next = () => go(idx + 1);

  const current = slides[idx];

  return (
    <SectionFrame id={id} title={title} note={note}>
      <div className="relative">
        {/* Big media */}
        <div className="aspect-[16/9] w-full overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900">
          <img
            src={current.img}
            alt={current.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Content under image */}
        <div className="mt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">{current.title}</h3>
              {current.subtitle ? (
                <p className="mt-1 text-zinc-700 dark:text-zinc-300">{current.subtitle}</p>
              ) : null}
            </div>
            {/* Arrows on the right */}
            <div className="shrink-0 flex items-center gap-2">
              <button
                aria-label="Previous"
                onClick={prev}
                className="h-10 w-10 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                ‹
              </button>
              <button
                aria-label="Next"
                onClick={next}
                className="h-10 w-10 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                ›
              </button>
            </div>
          </div>

          {current.bullets?.length ? (
            <ul className="mt-4 grid gap-2 text-sm md:text-base text-zinc-800 dark:text-zinc-200">
              {current.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {current.cta ? (
            <div className="mt-5">
              <a
                href={current.cta.href}
                onClick={() => trackEvent("gallery_cta_click", { id: current.id, label: current.cta?.label })}
                className="inline-block px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold"
              >
                {current.cta.label}
              </a>
            </div>
          ) : null}
        </div>

        {/* Numbered dots in top-right corner */}
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white dark:bg-white/70 dark:text-black">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={[
                "h-6 min-w-6 px-1 rounded-full grid place-items-center",
                i === idx ? "bg-white text-black dark:bg-black dark:text-white" : "opacity-80",
              ].join(" ")}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

// -------------------------------------------------------------
// Content: Performance, Technology, Electronic & Voice Guidance
// (Images are placeholders — point to your real assets)
// -------------------------------------------------------------

// PERFORMANCE — focus on powertrain, battery, chassis/ride
const PERFORMANCE_SLIDES: ReadonlyArray<Slide> = [
  {
    id: "perf-powertrain",
    title: "Powertrain & Battery",
    subtitle: "AC 48V 4.6 kW motor + SK Mobile Energy lithium pack",
    img: "/performance/powertrain.jpg",
    bullets: [
      "AC 48V 4.6 kW motor tuned for mountainous terrain; stable hill climbing & reduced rollback/judder (LSIS/Hyosung).",
      "High efficiency vs. DC motors (+20–30% in comparable capacity) with no brushes/commutators → lower maintenance.",
      "51V 110Ah / 160Ah lithium options; typical 4–5 h charge; wide temperature operating range.",
      "SK Mobile Energy stack: in-house BMS / PACK / CELL for quality control, service consistency, and long life."
    ],
  },
  {
    id: "perf-chassis",
    title: "Suspension & Chassis",
    subtitle: "Sedan-class ride quality with confident handling",
    img: "/performance/suspension.jpg",
    bullets: [
      "Ultra-light MacPherson-type suspension for refined ride comfort.",
      "4-wheel independent suspension maintains ground contact and improves cornering stability.",
      "Balanced weight distribution for confident feel over uneven fairways."
    ],
  },
];

// TECHNOLOGY — safety/sensing, body/storage, motor control, service/updates
const TECHNOLOGY_SLIDES: ReadonlyArray<Slide> = [
  {
    id: "tech-safety",
    title: "Safety & Sensing",
    subtitle: "Predictable stopping and awareness around the course",
    img: "/technology/safety.jpg",
    bullets: [
      "Hydraulic disc brakes with motor control; EM parking brake for reliable holds.",
      "Ultrasonic obstacle detection up to ~4.5 m with staged deceleration and auto stop.",
      "Cart guard sensor maintains ~1.2 m spacing between carts; impact-sensing bumper.",
      "Low-/high-temperature validation for AGV, guidance, and magnet sensors (-40 °C to +85 °C)."
    ],
  },
  {
    id: "tech-body",
    title: "Body & Storage",
    subtitle: "More usable space, easier serviceability",
    img: "/technology/body_storage.jpg",
    bullets: [
      "ABS+ASA body panels in a 4-piece layout for easier service and cost-effective replacement.",
      "Front: larger, organized storage with dedicated phone bay.",
      "Rear: concealed, sealed locker keeps belongings secure; simplified open/close."
    ],
  },
  {
    id: "tech-motor-ctrl",
    title: "Motor Control System",
    subtitle: "Composed launches and consistent braking feel",
    img: "/technology/motor_control.jpg",
    bullets: [
      "Integrated motor control enables smooth starts on grades and coordinated braking feel.",
      "Patent No. 10-1860936 — Electric vehicle brake control system to replace hydraulic braking."
    ],
  },
  {
    id: "tech-service",
    title: "Service & Updates",
    subtitle: "Built for uptime and lifecycle value",
    img: "/technology/service_updates.jpg",
    bullets: [
      "Service-friendly access hatch shortens inspection time.",
      "Field-proven components and organized harnessing simplify troubleshooting.",
      "Parts, documentation and localization support for global operations."
    ],
  },
];

// ELECTRONIC GUIDANCE — wire/line guidance overview
const GUIDANCE_ELECTRONIC_SLIDES: ReadonlyArray<Slide> = [
  {
    id: "eg-overview",
    title: "Electronic Guidance Overview",
    subtitle:
      "Course-embedded guidance lines + on-cart sensors feed the motor controller to keep carts on path",
    img: "/guidance/electronic_overview.jpg",
    bullets: [
      "Guidance lines are installed beneath the cart path.",
      "On-cart guidance sensors detect the embedded lines and relay signals to the drive motor controller.",
      "The controller steers motion logic to keep the cart on the intended route."
    ],
  },
  {
    id: "eg-sensing",
    title: "Sensors + Controller",
    subtitle: "Robust detection for reliable path following",
    img: "/guidance/electronic_sensing.jpg",
    bullets: [
      "Multi-sensor approach to minimize false detection and drift.",
      "Real-time signal processing stabilizes behavior on bends, grades and junctions.",
      "Integration with braking and speed policies for staging and restricted zones."
    ],
  },
  {
    id: "eg-validation",
    title: "Validation & Environment",
    subtitle: "Wide-range performance and course-friendly operation",
    img: "/guidance/electronic_validation.jpg",
    bullets: [
      "Low-/high-temperature sensor validation (-40 °C to +85 °C).",
      "Noise and weather considerations for consistent detection in real-world use.",
      "Configuration presets for local course layouts and safety policies."
    ],
  },
];

// VOICE GUIDANCE — start + stop announcements (per your clarification)
const GUIDANCE_VOICE_SLIDES: ReadonlyArray<Slide> = [
  {
    id: "v-start",
    title: "Start Announcement",
    subtitle: "Notifies nearby people when the cart begins moving",
    img: "/guidance/voice_start.jpg",
    bullets: [
      "Voice or chime plays when the cart transitions from standstill to moving.",
      "Improves pedestrian awareness around tees and crossings.",
      "Speed threshold & debounce prevent repeated triggers in creeping traffic."
    ],
  },
  {
    id: "v-stop",
    title: "Stop Announcement",
    subtitle: "Confirms that the cart has come to a full stop",
    img: "/guidance/voice_stop.jpg",
    bullets: [
      "Plays when the cart reaches zero speed for loading/unloading.",
      "Helps passengers recognize safe entry/exit timing.",
      "Silence window avoids chatter during brief pauses."
    ],
  },
  {
    id: "v-custom",
    title: "Custom Language & Volume",
    subtitle: "Multi-language voice packs, volume & timing controls",
    img: "/guidance/voice_custom.jpg",
    bullets: [
      "Language packs (EN/KR/JP, etc.) with course-specific phrases.",
      "Adjust volume, cue length, and cooldown between announcements.",
      "Quiet/Event modes for early morning or tournament operation."
    ],
  },
  {
    id: "v-zones",
    title: "Zone Awareness",
    subtitle: "Different behaviors by area to minimize disturbance",
    img: "/guidance/voice_zones.jpg",
    bullets: [
      "Use short chimes in quiet or residential-adjacent holes.",
      "Normal voice cues in parking, crossing and staging zones.",
      "Policy presets can be saved and reused across courses."
    ],
  },
];

// -------------------------------------------------------------
// Page
// -------------------------------------------------------------
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

  // Sticky CTA suppression when compare mini opens (events fired by CompareTable)
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
  const jsonLd = useMemo(
    () => [
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
    ],
    [canonical, origin, salesEmail, siteName]
  );

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      {/* SEO */}
      <SEO
        title="APRO Electric Golf Carts — Lithium, VIP & Fleet Solutions"
        description="APRO builds electric golf carts for courses, resorts, and venues worldwide—smart guidance, refined ride, and global after-sales support."
        canonical={canonical}
        og={{
          title: "APRO Electric Golf Carts",
          description: "Lithium powertrains, advanced guidance, and global support.",
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

      {/* Main */}
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
                Smart guidance, refined ride, and global after-sales support.
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

        {/* PERFORMANCE (one-at-a-time big image with arrows + numbers) */}
        <GalleryPager
          id="performance"
          title="Performance"
          note="Powertrain, battery, and chassis tuned for real golf-course conditions."
          slides={PERFORMANCE_SLIDES}
        />

        {/* TECHNOLOGY (one-at-a-time big image with arrows + numbers) */}
        <GalleryPager
          id="technology"
          title="Technology"
          note="Safety & sensing, body & storage, motor control, service & updates."
          slides={TECHNOLOGY_SLIDES}
        />

        {/* ELECTRONIC GUIDANCE */}
        <GalleryPager
          id="tech-electronic-guidance"
          title="Electronic Guidance"
          note="Embedded guidance lines are detected by on-cart sensors which pass signals to the drive motor controller, keeping the cart on its intended path."
          slides={GUIDANCE_ELECTRONIC_SLIDES}
        />

        {/* VOICE GUIDANCE (start/stop announcements) */}
        <GalleryPager
          id="tech-voice-guidance"
          title="Voice Guidance"
          note="Speakers provide start/stop announcements so players and pedestrians know when the cart is moving or has come to a full stop. Language, volume, timing and zone behavior are configurable."
          slides={GUIDANCE_VOICE_SLIDES}
        />

        {/* INDUSTRIES */}
        <SectionFrame id="industries">
          <IndustriesSection />
        </SectionFrame>

        {/* SERVICE & WARRANTY */}
        <SectionFrame id="service">
          <ServiceWarrantySection />
        </SectionFrame>

        {/* CHARGING & POWER */}
        <SectionFrame id="charging">
          <ChargingPowerSection />
        </SectionFrame>

        {/* SUPPORT */}
        <SectionFrame id="support">
          <SupportSection />
        </SectionFrame>

        {/* CONTACT */}
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

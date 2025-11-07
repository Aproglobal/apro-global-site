// src/pages/App.tsx
import React from "react";
import Header from "../components/Header";
import { openLead } from "../components/LeadModal";
import { trackEvent } from "../services/analytics";
import { ArrowRight, Phone, Mail, MapPin, Building2, CalendarClock, Users2, Network } from "lucide-react";

// Simple section shell to keep spacing consistent and avoid "map on undefined"
function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-[calc(var(--header-h,64px)+24px)] py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <div className="mb-10">
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight">{title}</h2>
          {subtitle && (
            <p className="text-zinc-600 dark:text-zinc-300 mt-2">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-dvh bg-white text-black dark:bg-black dark:text-white">
      {/* Premium sticky header (your updated Header.tsx) */}
      <Header />

      {/* Hero */}
      <main id="main" className="pt-[calc(var(--header-h,64px)+12px)]">
        <section
          id="top"
          className="relative overflow-hidden py-20 lg:py-28"
          aria-label="APRO Golf Cart Solutions"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-100/60 to-transparent dark:from-zinc-900/40" />
          <div className="max-w-6xl mx-auto px-5 relative">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  APRO — Modern Electric Golf Carts & Course Solutions
                </h1>
                <p className="mt-4 text-zinc-600 dark:text-zinc-300 text-base lg:text-lg">
                  Premium lithium carts, smart guidance, and nationwide service footprint backed by
                  Kukje Intertrade’s 25+ years in golf course operations.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      openLead("Hero CTA");
                      trackEvent("cta_click", { where: "hero", label: "Talk to Sales" });
                    }}
                    className="inline-flex items-center gap-2 rounded-full px-5 h-11 text-sm font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
                  >
                    Talk to Sales <ArrowRight size={16} />
                  </button>
                  <a
                    href="#models"
                    className="inline-flex items-center gap-2 rounded-full px-5 h-11 text-sm font-semibold border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70"
                  >
                    Explore Models
                  </a>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
                {/* Visual placeholder — replace with your hero image/video if desired */}
                <div className="aspect-video bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-200 via-white to-white dark:from-zinc-800 dark:via-zinc-900 dark:to-black flex items-center justify-center">
                  <span className="text-zinc-500 dark:text-zinc-400 text-sm">
                    Hero Visual (replace later)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The nav in Header.tsx auto-highlights by IDs below */}
        <Section id="models" title="Models" subtitle="Electric 5-seaters, VIP, long/short-deck options.">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-zinc-600 dark:text-zinc-300">
              Your model grid/content lives here. (Placeholder to avoid runtime errors.)
            </p>
          </div>
        </Section>

        <Section id="technology" title="Technology" subtitle="Smart guidance, lithium power, safety systems.">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-zinc-600 dark:text-zinc-300">
              Technology highlights placeholder.
            </p>
          </div>
        </Section>

        <Section id="industries" title="Industries" subtitle="Golf courses, resorts, industrial campuses.">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-zinc-600 dark:text-zinc-300">Industries content placeholder.</p>
          </div>
        </Section>

        <Section id="compare" title="Compare" subtitle="Lithium vs lead-acid, VIP vs standard, TCO.">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-zinc-600 dark:text-zinc-300">Comparison table placeholder.</p>
          </div>
        </Section>

        <Section id="charging" title="Charging" subtitle="Charging power options & best practices.">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-zinc-600 dark:text-zinc-300">Charging section placeholder.</p>
          </div>
        </Section>

        <Section id="resources" title="Resources" subtitle="Brochures, certifications, case studies.">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-zinc-600 dark:text-zinc-300">Resources placeholder.</p>
          </div>
        </Section>

        <Section id="support" title="Support" subtitle="Nationwide service centers & maintenance programs.">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-zinc-600 dark:text-zinc-300">Support placeholder.</p>
          </div>
        </Section>

        <Section id="timeline" title="Timeline" subtitle="Production & delivery schedule.">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-zinc-600 dark:text-zinc-300">Timeline placeholder.</p>
          </div>
        </Section>

        <Section id="configurator" title="Configurator" subtitle="Build your fleet spec.">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-zinc-600 dark:text-zinc-300">Configurator placeholder.</p>
          </div>
        </Section>

        <Section id="fleet" title="Fleet" subtitle="Fleet management & deployment options.">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-zinc-600 dark:text-zinc-300">Fleet placeholder.</p>
          </div>
        </Section>

        <Section id="service" title="Service" subtitle="Warranty, extended coverage, on-site repair.">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <p className="text-zinc-600 dark:text-zinc-300">Service placeholder.</p>
          </div>
        </Section>

        {/* CONTACT — contains Company / History / Organization / Partners as requested */}
        <Section
          id="contact"
          title="Contact & Company"
          subtitle="Kukje Intertrade Co., Ltd. — national footprint, premium partners."
        >
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Company Overview */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="opacity-70" size={18} />
                <h3 className="font-semibold">Company Overview</h3>
              </div>
              <ul className="space-y-2 text-sm leading-6">
                <li><strong>Company:</strong> Kukje Intertrade Co., Ltd.</li>
                <li><strong>CEO:</strong> Dong Hyun Lee</li>
                <li>
                  <strong>Core Lines:</strong> Golf course maintenance equipment (John Deere); Signature Control Systems (irrigation); APRO electric guidance golf carts (DY Innovate); plus Wiedenmann, TURFCO, REDEXIM, T.W.T, snow equipment and more.
                </li>
              </ul>
              <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
                  <div className="flex items-center gap-2 font-medium mb-1">
                    <MapPin size={16} /> Headquarters (Seongnam)
                  </div>
                  <div>SKn Techno Park Biz Center #1208, 124 Sagimakgol-ro, Jungwon-gu</div>
                  <div>TEL 031-739-3200 · FAX 031-739-3232~3</div>
                </div>
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
                  <div className="flex items-center gap-2 font-medium mb-1">
                    <MapPin size={16} /> Service Plant (Icheon)
                  </div>
                  <div>435 Noseong-ro, Seolseong-myeon</div>
                  <div>TEL 031-643-3077 · FAX 031-643-3087</div>
                </div>
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
                  <div className="flex items-center gap-2 font-medium mb-1">
                    <MapPin size={16} /> Yeongnam Branch (Gyeongsan)
                  </div>
                  <div>61 Bulgulsa-gil, Wachon-myeon</div>
                  <div>TEL 053-856-3360 · FAX 053-856-3361</div>
                </div>
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
                  <div className="flex items-center gap-2 font-medium mb-1">
                    <MapPin size={16} /> Honam Branch (Jeongeup)
                  </div>
                  <div>77 Cheomdan-gwahak-ro, Ipam-myeon</div>
                  <div>TEL 063-538-7501 · FAX 063-538-7502</div>
                </div>
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
                  <div className="flex items-center gap-2 font-medium mb-1">
                    <MapPin size={16} /> Southern Branch (Jinju)
                  </div>
                  <div>497 Museonsan-ro, Geumgok-myeon</div>
                  <div>TEL 055-761-1811 · FAX 055-731-1811</div>
                </div>
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
                  <div className="flex items-center gap-2 font-medium mb-1">
                    <MapPin size={16} /> Jeju Agent (Jeju-si)
                  </div>
                  <div>561, Samdo-1-dong</div>
                  <div>TEL 064-757-3877</div>
                </div>
              </div>
              <div className="mt-3">
                <a
                  href="https://www.kukjeint.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm underline underline-offset-4"
                >
                  www.kukjeint.com
                </a>
              </div>
            </div>

            {/* History */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CalendarClock className="opacity-70" size={18} />
                <h3 className="font-semibold">Company History (Highlights)</h3>
              </div>
              <ul className="text-sm space-y-2 leading-6">
                <li><strong>2025.01</strong> Yeongnam Branch relocated to Gyeongsan (Wachon-myeon).</li>
                <li><strong>2023.11</strong> New Service Plant in Icheon (relocated from Gonjiam).</li>
                <li><strong>2020.01</strong> Southern Branch opened (Jinju).</li>
                <li><strong>2019.07</strong> Honam Branch relocated to Jeongeup. <em>2019.01</em> John Deere Asia “Star Dealer”.</li>
                <li><strong>2017</strong> John Deere Asia “Top Dealer”; Certified “Innovative SME”.</li>
                <li><strong>2014</strong> Began KT cart-telematics business.</li>
                <li><strong>2013–2004</strong> Multiple John Deere/SANYO Asia dealer awards.</li>
                <li><strong>2002</strong> Incorporated; started John Deere & SANYO dealer business.</li>
              </ul>
            </div>

            {/* Organization */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users2 className="opacity-70" size={18} />
                <h3 className="font-semibold">Organization (Overview)</h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                CEO; Vice President, Auditor, Advisors; Management, Planning; Service Division
                (Jeju Agent, Special Care, Yeongnam, Honam); Cart Division (Jeju Agent, Special Care, Yeongnam, Honam);
                Irrigation; Central Services (Production Mgmt, Service, Golf Cart Service).
              </p>
            </div>

            {/* Partners */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Network className="opacity-70" size={18} />
                <h3 className="font-semibold">Partners</h3>
              </div>
              <ul className="text-sm space-y-2 leading-6">
                <li>
                  <strong>John Deere:</strong> Official equipment supplier to PGA; TPC courses use JD for
                  tournament-grade maintenance.
                </li>
                <li>
                  <strong>Signature Control Systems / Weathermatic:</strong> Advanced irrigation systems widely adopted
                  in Korea and abroad.
                </li>
                <li>
                  <strong>DY Innovate (APRO):</strong> Next-gen electric golf carts, refined design and tech—built on
                  domestic engineering with Kukje Intertrade’s course know-how.
                </li>
              </ul>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="tel:0317393200"
              className="inline-flex items-center gap-2 rounded-full px-4 h-10 text-sm font-semibold border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70"
              onClick={() => trackEvent("contact_click", { via: "phone" })}
            >
              <Phone size={16} /> 031-739-3200
            </a>
            <a
              href="mailto:sales@kukjeint.com"
              className="inline-flex items-center gap-2 rounded-full px-4 h-10 text-sm font-semibold border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70"
              onClick={() => trackEvent("contact_click", { via: "email" })}
            >
              <Mail size={16} /> sales@kukjeint.com
            </a>
            <button
              onClick={() => {
                openLead("Contact Section CTA");
                trackEvent("cta_click", { where: "contact", label: "Talk to Sales" });
              }}
              className="inline-flex items-center gap-2 rounded-full px-5 h-10 text-sm font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
            >
              Talk to Sales <ArrowRight size={16} />
            </button>
          </div>
        </Section>

        {/* Footer (simple) */}
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-10">
          <div className="max-w-6xl mx-auto px-5 text-sm text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} Kukje Intertrade Co., Ltd. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}

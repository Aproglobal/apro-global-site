// src/pages/App.tsx
import React, { Component, PropsWithChildren } from "react";
import Header from "../components/Header"; // ✅ correct relative path
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

// -------------------------------------
// Error Boundary so one bad section doesn't kill the whole app
// -------------------------------------
class SectionErrorBoundary extends Component<
  PropsWithChildren<{ name: string }>
> {
  state = { hasError: false as boolean, errorMsg: "" as string };

  static getDerivedStateFromError(err: unknown) {
    return { hasError: true, errorMsg: (err as Error)?.message ?? String(err) };
  }

  componentDidCatch(err: unknown, info: unknown) {
    // Keep the console useful in CI/preview
    // eslint-disable-next-line no-console
    console.error(`[SectionErrorBoundary] ${this.props.name}`, err, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-6xl mx-auto px-5 py-10 my-6 rounded-xl border border-red-200/60 bg-red-50/60 dark:border-red-900/40 dark:bg-red-900/10">
          <div className="text-sm font-semibold text-red-700 dark:text-red-300">
            {this.props.name} failed to load
          </div>
          <div className="mt-1 text-xs text-red-600/80 dark:text-red-300/80 break-words">
            {this.state.errorMsg || "Unknown error"}
          </div>
        </div>
      );
    }
    return this.props.children as React.ReactElement;
  }
}

function Guard({
  name,
  children,
}: PropsWithChildren<{ name: string }>): JSX.Element {
  return <SectionErrorBoundary name={name}>{children}</SectionErrorBoundary>;
}

// -------------------------------------
// Helper: common section shell (adds scroll-mt using header CSS var)
// -------------------------------------
function Section({
  id,
  title,
  children,
  wide = false,
}: PropsWithChildren<{ id: string; title?: string; wide?: boolean }>) {
  return (
    <section
      id={id}
      className="scroll-mt-[var(--header-h,64px)] py-10 lg:py-16"
      aria-label={title || id}
    >
      <div className={(wide ? "max-w-7xl" : "max-w-6xl") + " mx-auto px-5"}>
        {title ? (
          <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-6">
            {title}
          </h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}

// -------------------------------------
// New premium company info blocks (English, condensed)
// They live before Contact, but are not in the top nav (clean header).
// -------------------------------------
function CompanyIntroSection() {
  return (
    <Section id="company" title="Company Profile">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="text-sm text-zinc-500">Company</div>
          <div className="mt-1 font-semibold">KUKJE INTERTRADE Co., Ltd.</div>
          <div className="mt-2 text-sm">CEO: Dong-hyun Lee</div>
          <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
            Portfolio: Golf course maintenance equipment (John Deere), irrigation
            systems (Signature/Weathermatic), domestic APRO golf carts (DY
            Innovate), and other turf solutions (Wiedenmann, TURFCO, REDEXIM,
            T.W.T., snow removal).
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="text-sm text-zinc-500">Head Office</div>
          <div className="mt-1 font-medium">
            SKn Techno Park Biz Center #1208,
            <br />
            124 Sagimakgol-ro, Jungwon-gu, Seongnam-si, Gyeonggi-do
          </div>
          <div className="mt-2 text-sm">TEL: 031-739-3200</div>
          <div className="text-sm">FAX: 031-739-3232~3</div>
          <a
            href="https://www.kukjeint.com"
            className="mt-3 inline-block text-sm underline hover:opacity-80"
          >
            kukjeint.com
          </a>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="text-sm text-zinc-500">Service Factory</div>
          <div className="mt-1 font-medium">
            435 Noseong-ro, Seolseong-myeon,
            <br />
            Icheon-si, Gyeonggi-do
          </div>
          <div className="mt-2 text-sm">TEL: 031-643-3077</div>
          <div className="text-sm">FAX: 031-643-3087</div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <BranchCard
          title="Yeongnam Branch"
          addr="61 Bulgulsa-gil, Wachon-myeon, Gyeongsan-si, Gyeongsangbuk-do"
          tel="053-856-3360"
          fax="053-856-3361"
        />
        <BranchCard
          title="Honam Branch"
          addr="77 Cheomdangwagi-ro, Ibang-myeon, Jeongeup-si, Jeollabuk-do"
          tel="063-538-7501"
          fax="063-538-7502"
        />
        <BranchCard
          title="Southern Branch"
          addr="497 Museonsan-ro, Geumgok-myeon, Jinju-si, Gyeongsangnam-do"
          tel="055-761-1811"
          fax="055-731-1811"
        />
        <BranchCard
          title="Jeju Agency"
          addr="561 Samdo 1-dong, Jeju-si, Jeju"
          tel="064-757-3877"
        />
      </div>
    </Section>
  );
}
function BranchCard({
  title,
  addr,
  tel,
  fax,
}: {
  title: string;
  addr: string;
  tel: string;
  fax?: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="text-sm text-zinc-500">{title}</div>
      <div className="mt-1 font-medium">{addr}</div>
      <div className="mt-2 text-sm">TEL: {tel}</div>
      {fax ? <div className="text-sm">FAX: {fax}</div> : null}
    </div>
  );
}

function CompanyHistorySection() {
  const items: { y: string; t: string }[] = [
    { y: "2025.01", t: "Yeongnam Branch new building relocation (Gyeongsan-si)" },
    { y: "2023.11", t: "Service Factory relocation (to Seolseong-myeon, Icheon)" },
    { y: "2020.01", t: "Southern Branch opened (Jinju)" },
    { y: "2019.09", t: "Appreciation plaque from Korea Golf University" },
    { y: "2019.07", t: "Honam Branch relocation (to Jeongeup)" },
    { y: "2019.01", t: "John Deere Asia ‘Star Dealer’ award" },
    { y: "2017.10", t: "John Deere Asia ‘Best Dealer’ award" },
    { y: "2017.04", t: "INNOBIZ (2017.04.12–2020.04.11)" },
    { y: "2014.10", t: "KT cart telematics business launched" },
    { y: "2014.07", t: "Yeongnam Branch relocation (to Gyeongsan)" },
    { y: "2014.03", t: "INNOBIZ certification" },
    { y: "2013.02", t: "JD Asia sales growth best dealer (HQ)" },
    { y: "2012.05", t: "Yeongnam Branch relocation (to Yangsan)" },
    { y: "2011.11", t: "Honam Branch relocation (to Gwangju)" },
    { y: "2011.04", t: "Service factory new build (Gwangju, Gyeonggi-do)" },
    { y: "2011.01", t: "IBK ‘JobWorld Best 600’ company" },
    { y: "2010.09", t: "IBK FAMILY company" },
    { y: "2010.02", t: "JD Asia irrigation top award (2009 performance)" },
    { y: "2009.11", t: "Golf cart sales agreement with DY" },
    { y: "2009.02", t: "JD Asia irrigation top award (2008 performance)" },
    { y: "2008.09", t: "Service factory expansion (Gwangju, Gyeonggi-do)" },
    { y: "2008.03", t: "INNOBIZ certification" },
    { y: "2007.02", t: "Honam Branch opened (Naju)" },
    { y: "2006.12", t: "HQ expansion (Seongnam-si)" },
    { y: "2006.09", t: "KEB FX Prime Business Club member" },
    { y: "2005.12", t: "Southern Branch opened (Daegu)" },
    { y: "2004.12", t: "JD Asia market-share top dealer award" },
    { y: "2004.05", t: "SANYO market-share top dealer award" },
    { y: "2004.02", t: "Overseas dealer market-share excellence award (JD HQ)" },
    { y: "2003.12", t: "JD Asia sales promotion excellence award" },
    { y: "2002.06", t: "Service factory in operation (Gwangju, Gyeonggi-do)" },
    {
      y: "1998.04",
      t: "SANYO golf cart domestic dealership acquired",
    },
    {
      y: "1998.03",
      t: "John Deere golf/turf & construction equipment domestic dealership acquired",
    },
    {
      y: "1998.02",
      t: "Company founded by turf industry specialists for systematic supply and stable A/S",
    },
    { y: "1998.02", t: "KUKJE INTERTRADE incorporated" },
  ];

  return (
    <Section id="history" title="Company History" wide>
      <ol className="relative border-s border-zinc-200 dark:border-zinc-800 pl-6">
        {items.map((it, idx) => (
          <li key={idx} className="mb-6">
            <div className="absolute -left-[9px] mt-1 size-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <div className="text-xs uppercase tracking-wider text-zinc-500">
              {it.y}
            </div>
            <div className="font-medium">{it.t}</div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function OrganizationSection() {
  const groups = [
    {
      name: "Executive",
      items: ["CEO", "Vice President", "Auditor", "Advisor"],
    },
    {
      name: "Management",
      items: ["Administration", "Planning"],
    },
    {
      name: "Service Divisions",
      items: [
        "Service Business Dept. (Jeju Agency, Special Care, Yeongnam, Honam)",
        "Total Service (Production Mgmt, Service, Golf Cart Service)",
      ],
    },
    {
      name: "Business Divisions",
      items: [
        "Cart Business Dept. (Jeju Agency, Special Care, Yeongnam, Honam)",
        "Irrigation",
      ],
    },
  ];
  return (
    <Section id="organization" title="Organization">
      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((g) => (
          <div
            key={g.name}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6"
          >
            <div className="text-sm text-zinc-500">{g.name}</div>
            <ul className="mt-2 space-y-1 text-sm">
              {g.items.map((x) => (
                <li key={x} className="leading-relaxed">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function PartnersSection() {
  return (
    <Section id="partners" title="Partners">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          All John Deere golf course equipment is supplied under an official
          partnership with the PGA (Professional Golfers’ Association), and is
          deployed across TPC facilities to maintain courses to professional
          tournament standards.
        </p>
        <p>
          Weathermatic / Signature irrigation systems deliver proven
          performance—trusted globally and domestically for efficient,
          dependable water management.
        </p>
        <p>
          <strong>DY Innovate — APRO Golf Cart.</strong> A next-generation
          domestic golf cart combining confident design with advanced
          technology. Built on 100% Korean engineering from Dongyang Gijeon and
          the golf industry know-how of KUKJE INTERTRADE.
        </p>
      </div>
    </Section>
  );
}

function ContactSection() {
  return (
    <Section id="contact" title="Contact">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="text-sm text-zinc-500">Sales</div>
          <div className="mt-1 text-sm">
            Email: <span className="font-medium">sales@kukjeint.com</span>
          </div>
          <div className="text-sm">TEL: 031-739-3200</div>
          <div className="mt-4 text-xs text-zinc-500">
            For APRO cart inquiries, cli

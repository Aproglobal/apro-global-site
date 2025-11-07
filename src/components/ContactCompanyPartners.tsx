import React from "react";
import { Building2, Factory, MapPin, Phone, Mail, Award, Users, ShieldCheck, Briefcase } from "lucide-react";

type Office = {
  name: string;
  address: string;
  tel?: string;
  fax?: string;
};

type HistoryItem = {
  year: number;
  month?: number;
  text: string;
};

const offices: Office[] = [
  {
    name: "Head Office",
    address:
      "1208, Biz Center, SKn Techno Park, 124 Sagimakgol-ro, Jungwon-gu, Seongnam-si, Gyeonggi-do, Korea",
    tel: "031-739-3200",
    fax: "031-739-3232~3",
  },
  {
    name: "Service Plant",
    address: "435 Noseong-ro, Seolsung-myeon, Icheon-si, Gyeonggi-do, Korea",
    tel: "031-643-3077",
    fax: "031-643-3087",
  },
  {
    name: "Youngnam Branch",
    address: "61 Bulgulsa-gil, Wachon-myeon, Gyeongsan-si, Gyeongsangbuk-do, Korea",
    tel: "053-856-3360",
    fax: "053-856-3361",
  },
  {
    name: "Honam Branch",
    address: "77 Cheomdangwahak-ro, Ipgam-myeon, Jeongeup-si, Jeollabuk-do, Korea",
    tel: "063-538-7501",
    fax: "063-538-7502",
  },
  {
    name: "Southern Branch",
    address: "497 Museonsan-ro, Geumgok-myeon, Jinju-si, Gyeongsangnam-do, Korea",
    tel: "055-761-1811",
    fax: "055-731-1811",
  },
  {
    name: "Jeju Agency",
    address: "561, Samdo 1-dong, Jeju-si, Jeju-do, Korea",
    tel: "064-757-3877",
  },
];

const history: HistoryItem[] = [
  { year: 2025, month: 1, text: "Youngnam Branch relocated to Wachon-myeon, Gyeongsan-si." },
  { year: 2023, month: 11, text: "New Service Plant opened (moved from Gonjiam to Seolsung-myeon, Icheon-si)." },
  { year: 2020, month: 1, text: "Southern Branch opened (Jinju, Gyeongsangnam-do)." },
  { year: 2019, month: 9, text: "Commendation from Korea Golf University." },
  { year: 2019, month: 7, text: "Honam Branch relocated (from Gwangju to Jeongeup, Jeollabuk-do)." },
  { year: 2019, month: 1, text: "John Deere Asia — Star Dealer Award." },
  { year: 2017, month: 10, text: "John Deere Asia — Best Dealer Award." },
  { year: 2017, month: 4, text: "Certified as an Innovative SME (2017.04.12 ~ 2020.04.11)." },
  { year: 2014, month: 10, text: "Launched KT cart fleet management system business." },
  { year: 2014, month: 7, text: "Youngnam Branch moved (Yangsan → Gyeongsan)." },
  { year: 2014, month: 3, text: "Certified as an Innovative SME." },
  { year: 2013, month: 2, text: "John Deere HQ — Asia Region Sales Growth Top Dealer (2012)." },
  { year: 2012, month: 5, text: "Youngnam Branch moved (Daegu → Yangsan)." },
  { year: 2011, month: 11, text: "Honam Branch moved (Naju → Gwangju)." },
  { year: 2011, month: 4, text: "Built Service Plant in Gwangju, Gyeonggi-do." },
  { year: 2011, month: 1, text: "Selected as ‘Job World Best 600 Companies’ (IBK)." },
  { year: 2010, month: 9, text: "Selected as IBK Family Company (IBK)." },
  { year: 2010, month: 2, text: "John Deere HQ — Sprinkler Business Best Dealer (2009, Asia region)." },
  { year: 2009, month: 11, text: "Signed domestic & export sales agreement for APRO golf carts with Dongyang Precision (DY Innovate)." },
  { year: 2008, month: 9, text: "Expanded Service Plant in Gwangju, Gyeonggi-do." },
  { year: 2008, month: 3, text: "Certified as an Innovative SME." },
  { year: 2007, month: 2, text: "Opened Honam Branch (Naju)." },
  { year: 2006, month: 12, text: "Head Office expanded and relocated (Seongnam-si, Gyeonggi-do)." },
  { year: 2006, month: 9, text: "Selected for Korea Exchange Bank Prime Business Club." },
  { year: 2005, month: 12, text: "Opened Southern Branch (Daegu)." },
  { year: 2004, month: 12, text: "John Deere Asia — Highest Market Share Dealer." },
  { year: 2004, month: 5, text: "SANYO — Highest Market Share Dealer." },
  { year: 2004, month: 2, text: "Overseas Dealer Market Share Excellence Award (John Deere HQ)." },
  { year: 2003, month: 12, text: "John Deere Asia — Sales Promotion Excellence Dealer." },
  { year: 2002, month: 6, text: "Commissioned Service Plant in Gwangju, Gyeonggi-do." },
  { year: 1998, month: 4, text: "Acquired Japan SANYO golf cart dealership and started operations." },
  { year: 1998, month: 3, text: "Acquired U.S. John Deere golf & construction equipment dealership and started operations." },
  { year: 1998, month: 2, text: "Company founded by experts in John Deere golf equipment & SANYO golf carts." },
  { year: 1998, month: 2, text: "Incorporated as KUKJE INTERTRADE Co., Ltd." },
];

const products = [
  "U.S. John Deere course maintenance equipment: tractors, mowers, aeration, utility vehicles, bunker rakes, grinders, etc.",
  "Irrigation: Signature Control Systems (sprinkler & control; design, install, sales).",
  "Domestic APRO electric guidance golf carts (DY Innovate / Dongyang Precision).",
  "Other turf solutions: Wiedenmann, TURFCO, REDEXIM, T.W.T., snow removal equipment, and more.",
];

const partners = [
  {
    name: "John Deere",
    blurb:
      "Official supplier to PGA® events and TPC® courses. John Deere course maintenance solutions uphold tour-grade performance and reliability.",
  },
  {
    name: "Signature Control Systems",
    blurb:
      "Advanced irrigation controllers and sprinklers delivering precision water management from tee to green.",
  },
  {
    name: "DY Innovate (APRO)",
    blurb:
      "Next-generation, 100% Korea-engineered APRO electric carts built with premium design and technology for modern courses.",
  },
];

export default function ContactCompanyPartners() {
  return (
    <div className="mt-12 space-y-14">
      {/* Company overview */}
      <section id="company" aria-label="Company">
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black">
              <Building2 />
            </div>
            <div className="min-w-0">
              <h3 className="text-2xl font-extrabold tracking-tight">KUKJE INTERTRADE Co., Ltd.</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                CEO: <strong>Dong-Hyun Lee</strong>
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <Briefcase className="h-5 w-5" />
                    Core Lines
                  </div>
                  <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-200">
                    {products.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <Factory className="h-5 w-5" />
                    Offices & Service
                  </div>
                  <div className="mt-2 grid sm:grid-cols-2 gap-3">
                    {offices.map((o) => (
                      <div key={o.name} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3">
                        <div className="font-semibold">{o.name}</div>
                        <div className="mt-1 flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-200">
                          <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                          <span>{o.address}</span>
                        </div>
                        {(o.tel || o.fax) && (
                          <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">
                            {o.tel && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>{o.tel}</span>
                              </div>
                            )}
                            {o.fax && (
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>Fax {o.fax}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-sm">
                    KR website:{" "}
                    <a className="underline" href="https://www.kukjeint.com" target="_blank" rel="noreferrer">
                      https://www.kukjeint.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company history */}
      <section aria-label="Company History">
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur p-6 md:p-8">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6" />
            <h3 className="text-2xl font-extrabold tracking-tight">Company History</h3>
          </div>
          <ol className="mt-6 space-y-3">
            {history.map((h) => (
              <li key={`${h.year}-${h.month ?? 0}`} className="group">
                <div className="flex gap-4">
                  <div className="w-20 shrink-0 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                    {h.year}.{h.month ? String(h.month).padStart(2, "0") : "—"}
                  </div>
                  <div className="flex-1 text-zinc-800 dark:text-zinc-100">{h.text}</div>
                </div>
                <div className="ml-20 h-px bg-zinc-200 dark:bg-zinc-800 group-last:hidden mt-3" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Organization (compact) */}
      <section aria-label="Organization">
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur p-6 md:p-8">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6" />
            <h3 className="text-2xl font-extrabold tracking-tight">Organization</h3>
          </div>
          <div className="mt-5 grid md:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4">
              <div className="font-semibold">Leadership</div>
              <ul className="mt-2 text-sm text-zinc-700 dark:text-zinc-200 list-disc pl-5">
                <li>CEO</li>
                <li>Vice President</li>
                <li>Auditor, Advisors</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4">
              <div className="font-semibold">Business Units</div>
              <ul className="mt-2 text-sm text-zinc-700 dark:text-zinc-200 list-disc pl-5">
                <li>Management</li>
                <li>Planning</li>
                <li>Cart Business (incl. Jeju Agency, Special Service, Youngnam, Honam)</li>
                <li>Service Business (incl. Jeju Agency, Special Service, Youngnam, Honam)</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4">
              <div className="font-semibold">Operations</div>
              <ul className="mt-2 text-sm text-zinc-700 dark:text-zinc-200 list-disc pl-5">
                <li>Sprinkler / Irrigation</li>
                <li>Total Service (Production, Maintenance, Cart Service)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" aria-label="Partners">
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur p-6 md:p-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6" />
            <h3 className="text-2xl font-extrabold tracking-tight">Partners</h3>
          </div>

          <div className="mt-5 grid md:grid-cols-3 gap-4">
            {partners.map((p) => (
              <div key={p.name} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4">
                <div className="text-lg font-semibold">{p.name}</div>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">{p.blurb}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
            PGA® and TPC® are properties of their respective owners; references indicate product usage and supplier status.
          </p>
        </div>
      </section>
    </div>
  );
}

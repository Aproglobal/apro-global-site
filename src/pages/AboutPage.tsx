import React from "react";
import Header from "../components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Header />
      <main id="main" className="pt-16">
        <section className="max-w-6xl mx-auto px-5 py-12">
          <h1 className="text-4xl font-extrabold tracking-tight">Company</h1>
          <p className="mt-3 text-zinc-700 dark:text-zinc-300 max-w-3xl">
            KUKJE INTERTRADE Co., Ltd. is a Korea-based distributor and service provider for golf course equipment,
            irrigation systems, and electric golf carts, serving courses and venues across Korea and APAC.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-xl font-bold">Corporate Profile</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="w-36 text-zinc-500">Company Name</dt>
                  <dd className="flex-1">KUKJE INTERTRADE Co., Ltd.</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-36 text-zinc-500">CEO</dt>
                  <dd className="flex-1">Donghyun Lee</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-36 text-zinc-500">Main Lines</dt>
                  <dd className="flex-1">
                    Golf course maintenance equipment, irrigation systems, and battery electric guidance carts (APRO).
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-36 text-zinc-500">Head Office</dt>
                  <dd className="flex-1">
                    Floor 12, 124, Sagimakgol-ro, Jungwon-gu, Seongnam-si, Gyeonggi-do, Republic of Korea<br />
                    Tel: +82-31-739-3200 / Fax: +82-31-739-3232~3
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-36 text-zinc-500">Service Plant</dt>
                  <dd className="flex-1">
                    435, Noseong-ro, Seolseong-myeon, Icheon-si, Gyeonggi-do, Republic of Korea<br />
                    Tel: +82-31-643-3077 / Fax: +82-31-643-3087
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-36 text-zinc-500">Branches</dt>
                  <dd className="flex-1">
                    Yeongnam: 61, Bulgulsa-gil, Wachon-myeon, Gyeongsan-si, Gyeongsangbuk-do (Tel +82-53-856-3360 / Fax
                    +82-53-856-3361)<br />
                    Honam: 77, Jeondong Science-ro, Ipam-myeon, Jeongeup-si, Jeollabuk-do (Tel +82-63-538-7501 / Fax
                    +82-63-538-7502)<br />
                    Southern: 497, Museonsan-ro, Geumgok-myeon, Jinju-si, Gyeongsangnam-do (Tel +82-55-761-1811 / Fax
                    +82-55-731-1811)<br />
                    Jeju Agency: 561, Samdo 1-dong, Jeju-si, Jeju-do (Tel +82-64-757-3877)
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-xl font-bold">Product Lines</h2>
              <ul className="mt-4 list-disc pl-5 space-y-1 text-sm">
                <li>
                  John Deere golf course maintenance equipment — tractors, mowers, aerifiers, utility vehicles, bunker
                  rakes, grinders, and more.
                </li>
                <li>
                  Signature/Weathermatic irrigation systems — sprinkler system sales & construction.
                </li>
                <li>
                  APRO electric guidance golf carts (made by DONGYANG DKI) — battery electric passenger carts.
                </li>
                <li>Additional equipment lines: Wiedenmann, TURFCO, REDEXIM, T.W.T, snow removal, and others.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-xl font-bold">Company History</h2>
            <ol className="mt-4 space-y-2 text-sm">
              <li><b>2025.01</b> — Yeongnam Branch relocated (Gyeongsan-si)</li>
              <li><b>2023.11</b> — Service Plant relocated (to Icheon-si)</li>
              <li><b>2020.01</b> — Southern Branch opened (Jinju)</li>
              <li><b>2019.09</b> — Awarded by Korea Golf University</li>
              <li><b>2019.07</b> — Honam Branch relocated (to Jeongeup)</li>
              <li><b>2019.01</b> — John Deere Asia “Star Dealer” award</li>
              <li><b>2017.10</b> — John Deere Asia “Top Dealer” award</li>
              <li><b>2017.04</b> — INNOBIZ (Korean Innovative SME) certification</li>
              <li><b>2014.10</b> — KT Cart Guidance business launched</li>
              <li><b>2014.07</b> — Yeongnam Branch relocation (to Gyeongsangnam-do)</li>
              <li><b>2013.03</b> — INNOBIZ certification</li>
              <li><b>2013.02</b> — JD Asia Sales Growth Top Dealer (2012)</li>
              <li><b>2012.05</b> — Yeongnam Branch relocation</li>
              <li><b>2011.11</b> — Honam Branch relocation (to Gwangju)</li>
              <li><b>2011.04</b> — New Service Plant in Gwangju, Gyeonggi-do</li>
              <li><b>2011.01</b> — IBK Best 600 Companies list</li>
              <li><b>2010.09</b> — IBK Family Company</li>
              <li><b>2010.02</b> — JD Asia Sprinkler Business Excellence (2009)</li>
              <li><b>2009.11</b> — Golf cart sales contract with DONGYANG DKI (domestic & export)</li>
              <li><b>2009.02</b> — JD Asia Sprinkler Business Excellence (2008)</li>
              <li><b>2008.09</b> — Gwangju Service Plant expansion</li>
              <li><b>2008.03</b> — INNOBIZ certification</li>
              <li><b>2007.02</b> — Honam Branch opened (Naju)</li>
              <li><b>2006.12</b> — Head office relocation (Seongnam-si)</li>
              <li><b>2006.09</b> — Korea Exchange Bank “Prime Business Club” member</li>
              <li><b>2005.12</b> — Southern Branch opened (Daegu)</li>
              <li><b>2005.02</b> — JD Overseas Dealer Excellence Award (2004)</li>
              <li><b>2004.12</b> — JD Asia Top Market Share Dealer</li>
              <li><b>2004.05</b> — SANYO Top Market Share Dealer</li>
              <li><b>2004.02</b> — Overseas Dealer Market Share Excellence (JD)</li>
              <li><b>2003.12</b> — JD Asia Sales Promotion Excellence</li>
              <li><b>2002.06</b> — Gwangju Service Plant started operations</li>
              <li><b>1998.04</b> — SANYO golf cart domestic dealership acquired</li>
              <li><b>1998.03</b> — John Deere golf course & construction equipment dealership acquired</li>
              <li><b>1998.02</b> — KUKJE INTERTRADE established</li>
            </ol>
          </div>

          <div className="mt-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-xl font-bold">Organization</h2>
            <ul className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
              <li>
                <b>Executive</b>: CEO, Vice President, Auditor, Advisors
              </li>
              <li>
                <b>Operations Divisions</b>: Administration, Planning, Service Business (Jeju Agency, Special Center, Yeongnam, Honam), Cart Business (Jeju Agency, Special Center, Yeongnam, Honam), Sprinkler, Central Service (Production Management, Service, Golf Cart Service)
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

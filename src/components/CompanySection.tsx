import { Building2, Award, UsersRound, CircuitBoard, Wrench, MapPin } from "lucide-react";

export default function CompanySection() {
  return (
    <section id="company" className="scroll-mt-28">
      <div className="max-w-6xl mx-auto px-5 py-20">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <Building2 className="w-4 h-4" />
            About the Company
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
            Kukje Intertrade Co., Ltd.
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300 max-w-3xl">
            We are an APAC-focused supplier and service partner for golf-course equipment and electric carts.
            Our portfolio spans <strong>John Deere</strong> turf management equipment, irrigation solutions,
            and <strong>APRO</strong> battery-electric guidance carts manufactured by DY Innovate (Dongyang Gijeon).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white/60 dark:bg-zinc-950/60 backdrop-blur">
            <h3 className="text-lg font-semibold">Company Profile</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li><strong>Legal Name:</strong> Kukje Intertrade Co., Ltd.</li>
              <li><strong>CEO:</strong> Dong-Hyun Lee</li>
              <li><strong>Core Lines:</strong> John Deere turf equipment; Signature/Weathermatic irrigation systems; APRO electric golf carts (battery, e-guidance); additional brands including Wiedenmann, TURFCO, REDEXIM, T.W.T., and winter equipment.</li>
              <li><strong>Homepage (KR):</strong> https://www.kukjeint.com</li>
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
                <CircuitBoard className="w-3.5 h-3.5" /> Electronic Guidance
              </span>
              <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
                <Wrench className="w-3.5 h-3.5" /> Service &amp; Parts
              </span>
              <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
                <UsersRound className="w-3.5 h-3.5" /> APAC Support
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white/60 dark:bg-zinc-950/60 backdrop-blur">
            <h3 className="text-lg font-semibold">Offices & Service</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li><MapPin className="inline-block w-4 h-4 mr-2" /> <strong>HQ (Seongnam, Gyeonggi)</strong> — SKn Technopark Biz Center #1208, Tel +82-31-739-3200, Fax 320‐3232~3</li>
              <li><MapPin className="inline-block w-4 h-4 mr-2" /> <strong>Service Factory (Icheon)</strong> — 435 Noseong-ro, Seolseong-myeon, Tel +82-31-643-3077, Fax 3087</li>
              <li><MapPin className="inline-block w-4 h-4 mr-2" /> <strong>Yeongnam Branch (Gyeongsan)</strong> — 61 Bulgulsa-gil, Wacheon-myeon, Tel +82-53-856-3360, Fax 3361</li>
              <li><MapPin className="inline-block w-4 h-4 mr-2" /> <strong>Honam Branch (Jeongeup)</strong> — 77 Cheomdan Science-ro, Ipram-myeon, Tel +82-63-538-7501, Fax 7502</li>
              <li><MapPin className="inline-block w-4 h-4 mr-2" /> <strong>Southern Branch (Jinju)</strong> — 497 Museonsan-ro, Geumgok-myeon, Tel +82-55-761-1811, Fax 1811</li>
              <li><MapPin className="inline-block w-4 h-4 mr-2" /> <strong>Jeju Dealer</strong> — Samdo-1-dong 561, Tel +82-64-757-3877</li>
            </ul>

            <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
              <Award className="inline-block w-4 h-4 mr-2" />
              Recognitions include John Deere Asia Star Dealer / Top Dealer awards and multiple innovation-SME certifications.
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-gradient-to-br from-white/60 to-zinc-50/60 dark:from-zinc-950/60 dark:to-zinc-900/60">
          <h3 className="text-lg font-semibold">Company Milestones</h3>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-zinc-700 dark:text-zinc-300">
            <li><strong>2025.01</strong> — Yeongnam branch relocation (Gyeongsan)</li>
            <li><strong>2023.11</strong> — Service factory relocated to Icheon</li>
            <li><strong>2020.01</strong> — Southern branch opened (Jinju)</li>
            <li><strong>2019–2017</strong> — John Deere Asia Star/Top Dealer awards; SME innovation certifications</li>
            <li><strong>2014–2012</strong> — KT cart telematics launched; multiple branch relocations</li>
            <li><strong>2011–2004</strong> — Factory expansion, Best 600 enterprise, export & share awards</li>
            <li><strong>2003–1998</strong> — Established; secured John Deere/SANYO dealership; factory operations</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

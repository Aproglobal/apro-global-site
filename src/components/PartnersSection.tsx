import { Handshake, Trophy, Droplets, Cog, Shield } from "lucide-react";

const items = [
  {
    title: "John Deere (Turf Management)",
    body:
      "Official partner across APAC supplying tractors, mowers, renovation tools, utility vehicles, bunker rakes, grinders and full-course maintenance solutions. Recognized with multiple Asia Star/Top Dealer awards.",
    badge: "PGA & TPC trusted",
    icon: Trophy,
  },
  {
    title: "Signature / Weathermatic (Irrigation)",
    body:
      "Engineering and supply of sprinkler systems and smart irrigation controls with proven reliability in both overseas and domestic courses.",
    badge: "Irrigation systems",
    icon: Droplets,
  },
  {
    title: "APRO Golf Cart (DY Innovate)",
    body:
      "Next-gen battery electric carts with electronic guidance. Designed and built in Korea combining DY’s engineering with Kukje Intertrade’s golf-industry know-how.",
    badge: "E-Guidance",
    icon: Shield,
  },
  {
    title: "Wiedenmann · TURFCO · REDEXIM · T.W.T.",
    body:
      "Complementary turf equipment portfolio covering aeration, topdressing, seeding, and specialty maintenance, plus seasonal snow equipment.",
    badge: "Extended portfolio",
    icon: Cog,
  },
];

export default function PartnersSection() {
  return (
    <section id="partners" className="scroll-mt-28">
      <div className="max-w-6xl mx-auto px-5 py-20">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <Handshake className="w-4 h-4" />
            Partners
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
            Trusted global & domestic partners
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300 max-w-3xl">
            We partner with proven manufacturers to deliver reliable performance, serviceability, and total-course outcomes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div
                key={it.title}
                className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white/60 dark:bg-zinc-950/60 backdrop-blur hover:-translate-y-0.5 hover:shadow-sm transition"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold">{it.title}</h3>
                  </div>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {it.badge}
                  </span>
                </div>
                <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{it.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

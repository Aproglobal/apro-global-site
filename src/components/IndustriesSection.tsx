import React from "react";
import HorizontalRail from "./HorizontalRail";
import { trackEvent } from "../services/analytics";

type Industry = {
  id: string;
  name: string;
  outcomes: string[];
  suggested: string[];
  comingSoon?: boolean;
  img?: string; // optional hero
};

const INDUSTRIES: Industry[] = [
  {
    id: "courses",
    name: "Golf Courses",
    outcomes: ["Faster round turnover with quiet operations", "Reliable hill-climb for challenging terrain", "Lower maintenance vs gas fleets"],
    suggested: ["5-seat VIP", "6-seat VIP", "Utility (Long Deck)"],
    img: "/assets/industries/golf.jpg",
  },
  {
    id: "resorts",
    name: "Resorts & Hotels",
    outcomes: ["Premium guest transfer experience", "Low-noise night operations", "Brandable seating & trims"],
    suggested: ["VIP Seating", "Heated/Ventilated Seats", "Custom Branding"],
    img: "/assets/industries/resort.jpg",
  },
  {
    id: "campuses",
    name: "Corporate & School Campuses",
    outcomes: ["Safe, predictable campus mobility", "Low TCO with electric charging", "Modular storage for tools & parcels"],
    suggested: ["Utility (Long/Short Deck)", "Standard 5-seat"],
    comingSoon: true,
    img: "/assets/industries/campus.jpg",
  },
  {
    id: "venues",
    name: "Event Venues & Parks",
    outcomes: ["Flexible seating for peak days", "Multi-purpose storage for events", "Temporary charging layouts"],
    suggested: ["6-seat VIP", "Utility", "Branding kits"],
    comingSoon: true,
    img: "/assets/industries/industrial.jpg",
  },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-20 bg-white text-black dark:bg-black dark:text-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Industries</h2>
          <span className="text-xs text-zinc-600 dark:text-zinc-400">All details are visible; swipe/scroll sideways.</span>
        </div>

        <div className="mt-6">
          <HorizontalRail ariaLabel="Industries we serve">
            {INDUSTRIES.map((it) => (
              <article
                key={it.id}
                className="snap-start shrink-0 w-[280px] md:w-[360px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5"
              >
                {it.img ? (
                  <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-900">
                    <img src={it.img} alt={it.name} loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
                  </div>
                ) : null}

                <h3 className="mt-3 text-lg font-semibold">{it.name}</h3>

                <p className="mt-2 text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">Outcomes</p>
                <ul className="mt-1 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                  {it.outcomes.map((o, i) => (
                    <li key={i} className="pl-4 relative">
                      <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                      <span className="block translate-x-1">{o}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">Suggested configurations</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {it.suggested.map((s, i) => (
                    <li key={i} className="text-[11px] rounded-full border px-3 py-1 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200">
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => trackEvent("industryCardClick", { industry_id: it.id, label: it.name })}
                    className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm w-full sm:w-auto transition hover:opacity-90"
                    disabled={it.comingSoon}
                    aria-disabled={it.comingSoon}
                  >
                    {it.comingSoon ? "Details (coming soon)" : "Get a tailored spec & quote"}
                  </button>
                </div>
              </article>
            ))}
          </HorizontalRail>
        </div>
      </div>
    </section>
  );
}

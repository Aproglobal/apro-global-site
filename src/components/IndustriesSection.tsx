import React from "react";
import { trackEvent } from "../services/analytics";
import { openLead } from "./LeadModal";

type Industry = {
  id: string;
  name: string;
  outcomes: string[];
  suggested: string[]; // models/configs
  comingSoon?: boolean;
};

const INDUSTRIES: Industry[] = [
  {
    id: "courses",
    name: "Golf Courses",
    outcomes: [
      "Faster round turnover with quiet operations",
      "Reliable hill-climb for challenging terrain",
      "Lower maintenance vs gas fleets",
    ],
    suggested: ["5-seat VIP", "6-seat VIP", "Utility (Long Deck)"],
  },
  {
    id: "resorts",
    name: "Resorts & Hotels",
    outcomes: ["Premium guest transfer experience", "Low-noise night operations", "Brandable seating & trims"],
    suggested: ["VIP Seating", "Heated/Ventilated Seats", "Custom Branding"],
  },
  {
    id: "campuses",
    name: "Corporate & School Campuses",
    outcomes: ["Safe, predictable campus mobility", "Low TCO with electric charging", "Modular storage for tools & parcels"],
    suggested: ["Utility (Long/Short Deck)", "Standard 5-seat"],
    comingSoon: true,
  },
  {
    id: "venues",
    name: "Event Venues & Parks",
    outcomes: ["Flexible seating for peak days", "Multi-purpose storage for events", "Temporary charging layouts"],
    suggested: ["6-seat VIP", "Utility", "Branding kits"],
    comingSoon: true,
  },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-20 bg-white text-black dark:bg-black dark:text-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Industries</h2>
          <span className="text-xs text-zinc-600 dark:text-zinc-400">Pick an industry to see relevant outcomes.</span>
        </div>

        <ul className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {INDUSTRIES.map((it) => (
            <li
              key={it.id}
              className="
                group rounded-2xl border border-zinc-200 dark:border-zinc-800 
                bg-white dark:bg-zinc-950 overflow-hidden
                transition-all duration-200
                hover:shadow-lg hover:-translate-y-0.5 hover:border-black/15 dark:hover:border-white/20
                motion-reduce:transition-none motion-reduce:hover:translate-y-0
              "
            >
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">{it.name}</h3>
                  {it.comingSoon ? (
                    <span className="text-[10px] uppercase tracking-wide rounded-full border px-2 py-1 text-zinc-600 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700">
                      Coming soon
                    </span>
                  ) : null}
                </div>

                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">Outcomes</p>
                    <ul className="mt-2 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                      {it.outcomes.map((o, i) => (
                        <li key={i} className="pl-4 relative">
                          <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                          <span className="block translate-x-1">{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">Suggested configurations</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {it.suggested.map((s, i) => (
                        <li
                          key={i}
                          className="text-xs rounded-full border px-3 py-1 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent("industryCardClick", { industry_id: it.id, label: it.name });
                      if (!it.comingSoon) openLead(`Industry ${it.id}`);
                    }}
                    className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm w-full sm:w-auto transition hover:opacity-90 disabled:opacity-60"
                    disabled={it.comingSoon}
                    aria-disabled={it.comingSoon}
                  >
                    {it.comingSoon ? "Details (coming soon)" : "Get a tailored spec & quote"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

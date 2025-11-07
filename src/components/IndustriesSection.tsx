// src/components/IndustriesSection.tsx
import React from "react";
import Carousel from "./ui/Carousel";
import { trackEvent } from "../services/analytics";

type Industry = {
  id: string;
  name: string;
  outcomes: string[];
  suggested: string[];
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

function bgImg(id: string) {
  // Optional industry hero: /public/industries/<id>.jpg
  return `/industries/${id}.jpg`;
}

function IndustryCard({ it }: { it: Industry }) {
  return (
    <article
      className="
        rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-950 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]
      "
    >
      <div className="relative aspect-[16/9] bg-zinc-100 dark:bg-zinc-900">
        <img
          src={bgImg(it.id)}
          alt={it.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        {it.comingSoon && (
          <div className="absolute right-3 top-3 rounded-full bg-black/75 text-white text-[11px] px-2 py-1">Coming soon</div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold">{it.name}</h3>

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
            onClick={() => trackEvent("industryCardClick", { industry_id: it.id, label: it.name })}
            className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm"
            disabled={it.comingSoon}
            aria-disabled={it.comingSoon}
          >
            {it.comingSoon ? "Details (coming soon)" : "Get a tailored spec & quote"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-2">
      <div className="mb-5">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Industries</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">One industry at a time—swipe to explore.</p>
      </div>

      <Carousel
        ariaLabel="Industries"
        items={INDUSTRIES.map((it) => (
          <IndustryCard key={it.id} it={it} />
        ))}
        itemClassName="w-[88vw] sm:w-[520px] md:w-[760px] lg:w-[980px]"
        showCount
      />
    </section>
  );
}

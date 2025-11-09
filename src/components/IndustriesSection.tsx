import React from "react";
import { Flag, Hotel, Building2, Factory, Trees, Settings2 } from "lucide-react";

type Card = {
  icon: React.ElementType;
  title: string;
  bullets: string[];
};

const CARDS: Card[] = [
  {
    icon: Flag,
    title: "Golf Courses & Country Clubs",
    bullets: [
      "Electronic Guidance keeps carts on intended paths with predictable behavior.",
      "Quiet, low-vibration ride improves player experience and reduces fatigue.",
      "Configurable speed & zone policies for staging areas and crossings.",
    ],
  },
  {
    icon: Hotel,
    title: "Resorts & Hotels",
    bullets: [
      "Guest-friendly comfort (MacPherson ride, heated seats options).",
      "Custom colors/branding, seat configurations, and cargo solutions.",
      "Simple daily charging workflows with clear status indicators.",
    ],
  },
  {
    icon: Building2,
    title: "Corporate & University Campuses",
    bullets: [
      "Facilities & maintenance teams benefit from utility decks and storage.",
      "Geofencing/speed policy presets help standardize safety by area.",
      "Low operating noise supports indoor-adjacent operations.",
    ],
  },
  {
    icon: Trees,
    title: "Parks, Leisure & Municipal",
    bullets: [
      "Durable ABS+ASA body with 4-piece service layout lowers downtime.",
      "Voice Guidance improves pedestrian awareness in shared zones.",
      "Lifecycle support: documentation, training, and parts availability.",
    ],
  },
  {
    icon: Factory,
    title: "Industrial & Venues",
    bullets: [
      "Cart guard distance sensor (~1.2 m) helps maintain safe spacing.",
      "Obstacle detection up to ~4.5 m with staged deceleration & auto stop.",
      "Wide operating temp validation (-40 °C to +85 °C for sensors).",
    ],
  },
  {
    icon: Settings2,
    title: "Custom Projects & OEM",
    bullets: [
      "Seating, battery capacity, guidance/voice packs, and accessories.",
      "Market-specific compliance & documentation support.",
      "Joint development options for special bodies or use-cases.",
    ],
  },
];

export default function IndustriesSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {CARDS.map(({ icon: Icon, title, bullets }) => (
        <div
          key={title}
          className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800 bg-white/60 dark:bg-white/5"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

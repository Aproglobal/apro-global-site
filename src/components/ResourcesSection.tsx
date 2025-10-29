import React from "react";
import { trackEvent } from "../services/analytics";

type ResourceCard = {
  id: string;
  title: string;
  desc: string;
  href?: string;
  comingSoon?: boolean;
};

const CARDS: ResourceCard[] = [
  {
    id: "downloads",
    title: "Downloads",
    desc: "Spec sheets, drawings, brochures, owner’s manuals.",
    comingSoon: true,
  },
  {
    id: "case-studies",
    title: "Case Studies",
    desc: "Before/after outcomes, fleets, charging, service plans.",
    comingSoon: true,
  },
  {
    id: "compliance",
    title: "Compliance & Certifications",
    desc: "Electrical, charger safety, EMC, IP ratings, lighting.",
    comingSoon: true,
  },
];

export default function ResourcesSection() {
  return (
    <section id="resources" className="py-20 bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Resources</h2>

        <ul className="mt-6 grid md:grid-cols-3 gap-4">
          {CARDS.map((c) => (
            <li key={c.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">{c.title}</h3>
                {c.comingSoon ? (
                  <span className="text-[10px] uppercase tracking-wide rounded-full border px-2 py-1 text-zinc-600 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700">
                    Coming soon
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{c.desc}</p>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => trackEvent("resourceCardClick", { resource_id: c.id })}
                  className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm"
                  disabled={c.comingSoon}
                  aria-disabled={c.comingSoon}
                >
                  {c.comingSoon ? "View (coming soon)" : "View"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import React from "react";
import { openLead } from "./LeadModal";

export default function FleetSection() {
  const cards = [
    {
      title: "Fleet Purchase",
      desc: "Volume pricing, phased delivery schedules, and on-site handover.",
      foot: "Best for clubs modernizing the entire fleet.",
    },
    {
      title: "Operating Lease",
      desc: "Predictable monthly costs with service options bundled.",
      foot: "Ideal for low upfront CAPEX.",
    },
    {
      title: "Maintenance Plans",
      desc: "Tiered SLAs, parts availability bands, and preventive maintenance calendars.",
      foot: "Lower downtime, longer lifetime.",
    },
  ];

  return (
    <section id="fleet" className="py-20 bg-white text-black dark:bg-black dark:text-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Fleet &amp; Leasing</h2>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">Select a path and ask us for a tailored quote.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <article
              key={i}
              className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{c.desc}</p>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{c.foot}</p>
              <button
                type="button"
                onClick={() => openLead("Fleet CTA")}
                className="mt-4 px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm"
              >
                Talk to Sales
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

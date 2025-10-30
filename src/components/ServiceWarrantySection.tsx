import React from "react";

export default function ServiceWarrantySection() {
  return (
    <section id="service" className="py-20 bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Service &amp; Warranty</h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[
            {
              title: "Coverage & Response",
              body: "Global partner network with tiered response SLAs and parts availability bands.",
              foot: "Map & partner list — coming soon.",
            },
            {
              title: "Warranty Matrix",
              items: [
                "Battery — standard term by chemistry",
                "Motor & Controller — limited warranty",
                "Chassis & Trim — limited warranty",
              ],
              foot: "Final terms vary by market.",
            },
            {
              title: "After-Delivery Program",
              items: ["On-site training & handover", "First-month check & maintenance schedule", "Parts portal access"],
              foot: "Docs & portal — coming soon.",
            },
          ].map((c, i) => (
            <article
              key={i}
              className="
                group rounded-2xl border border-zinc-200 dark:border-zinc-800 
                bg-white dark:bg-zinc-950 p-6
                transition-all duration-200
                hover:shadow-lg hover:-translate-y-0.5 hover:border-black/15 dark:hover:border-white/20
                motion-reduce:transition-none motion-reduce:hover:translate-y-0
              "
            >
              <h3 className="font-semibold">{c.title}</h3>
              {"body" in c ? (
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{c.body as string}</p>
              ) : (
                <ul className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                  {(c.items as string[]).map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              )}
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{c.foot}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

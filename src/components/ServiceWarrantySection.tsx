import React from "react";
import HorizontalRail from "./HorizontalRail";

const CARDS = [
  {
    key: "coverage",
    title: "Coverage & Response",
    body: "Global partner network with tiered response SLAs and parts availability bands.",
    foot: "Map & partner list — coming soon.",
    img: "/assets/service/support.jpg",
  },
  {
    key: "warranty",
    title: "Warranty Matrix",
    items: ["Battery — standard term by chemistry", "Motor & Controller — limited warranty", "Chassis & Trim — limited warranty"],
    foot: "Final terms vary by market.",
    img: "/assets/service/warranty.jpg",
  },
  {
    key: "after",
    title: "After-Delivery Program",
    items: ["On-site training & handover", "First-month check & maintenance schedule", "Parts portal access"],
    foot: "Docs & portal — coming soon.",
    img: "/assets/service/spares.jpg",
  },
];

export default function ServiceWarrantySection() {
  return (
    <section id="service" className="py-20 bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Service &amp; Warranty</h2>

        <div className="mt-6">
          <HorizontalRail ariaLabel="Service and warranty">
            {CARDS.map((c) => (
              <article
                key={c.key}
                className="snap-start shrink-0 w-[280px] md:w-[360px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5"
              >
                {c.img ? (
                  <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-900">
                    <img src={c.img} alt={c.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
                  </div>
                ) : null}

                <h3 className="mt-3 font-semibold">{c.title}</h3>
                {"body" in c ? (
                  <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{(c as any).body}</p>
                ) : (
                  <ul className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                    {(c as any).items.map((t: string, idx: number) => <li key={idx}>{t}</li>)}
                  </ul>
                )}
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{c.foot}</p>
              </article>
            ))}
          </HorizontalRail>
        </div>
      </div>
    </section>
  );
}

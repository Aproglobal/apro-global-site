// src/components/ServiceWarrantySection.tsx
import React from "react";
import Carousel from "./ui/Carousel";

type Card =
  | { type: "text"; title: string; body: string; foot?: string; imgId?: string }
  | { type: "list"; title: string; items: string[]; foot?: string; imgId?: string };

const CARDS: Card[] = [
  {
    type: "text",
    title: "Coverage & Response",
    body: "Global partner network with tiered response SLAs and parts availability bands.",
    foot: "Map & partner list — coming soon.",
    imgId: "1",
  },
  {
    type: "list",
    title: "Warranty Matrix",
    items: ["Battery — standard term by chemistry", "Motor & Controller — limited warranty", "Chassis & Trim — limited warranty"],
    foot: "Final terms vary by market.",
    imgId: "2",
  },
  {
    type: "list",
    title: "After-Delivery Program",
    items: ["On-site training & handover", "First-month check & maintenance schedule", "Parts portal access"],
    foot: "Docs & portal — coming soon.",
    imgId: "3",
  },
];

function imgSrc(id?: string) {
  // Optional: /public/service/<id>.jpg
  return id ? `/service/${id}.jpg` : "";
}

function CardView({ c }: { c: Card }) {
  return (
    <article
      className="
        rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-950 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]
      "
    >
      <div className="relative aspect-[16/9] bg-zinc-100 dark:bg-zinc-900">
        {c.imgId ? (
          <img
            src={imgSrc(c.imgId)}
            alt={c.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ) : null}
        <div className="absolute left-3 top-3 rounded-full bg-black/75 text-white text-[11px] px-2 py-1">Service & Warranty</div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg">{c.title}</h3>
        {"body" in c && <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{c.body}</p>}
        {"items" in c && (
          <ul className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
            {c.items.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        )}
        {c.foot ? <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{c.foot}</p> : null}
      </div>
    </article>
  );
}

export default function ServiceWarrantySection() {
  return (
    <section id="service" className="py-2">
      <div className="mb-5">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Service &amp; Warranty</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Swipe to see coverage, warranty, and programs.</p>
      </div>

      <Carousel
        ariaLabel="Service & Warranty"
        items={CARDS.map((c, i) => (
          <CardView key={i} c={c} />
        ))}
        itemClassName="w-[88vw] sm:w-[520px] md:w-[760px] lg:w-[980px]"
        showCount
      />
    </section>
  );
}

// src/components/ChargingPowerSection.tsx
import React from "react";
import Carousel from "./ui/Carousel";

type Card = {
  id: string;
  title: string;
  body: string;
  foot?: string;
  cta?: string;
};

const CARDS: Card[] = [
  {
    id: "layouts",
    title: "Layouts",
    body: "Typical layouts for 10 / 20 / 40 carts with breaker ranges and overnight charging.",
    foot: "Downloadable diagrams — coming soon.",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    body: "Cable gauge by distance, IP ratings for outdoor cabinets, ventilation for charging rooms.",
    foot: "Specs & tables — coming soon.",
  },
  {
    id: "request",
    title: "Request a Layout",
    body: "Share photos and the number of carts; we’ll propose a safe, scalable plan.",
    cta: "Get a charging layout",
  },
];

function imgSrc(id: string) {
  // Optional: /public/charging/<id>.jpg
  return `/charging/${id}.jpg`;
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
        <img
          src={imgSrc(c.id)}
          alt={c.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div className="absolute left-3 top-3 rounded-full bg-black/75 text-white text-[11px] px-2 py-1">Charging & Power</div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold">{c.title}</h3>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{c.body}</p>

        {c.foot ? (
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{c.foot}</p>
        ) : c.cta ? (
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("lead:open", { detail: { source: "Charging Layout CTA" } }))
            }
            className="mt-3 px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm"
          >
            {c.cta}
          </button>
        ) : null}
      </div>
    </article>
  );
}

export default function ChargingPowerSection() {
  return (
    <section id="charging" className="py-2">
      <div className="mb-5">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Charging &amp; Power</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Swipe through layouts, infra, and request flow.</p>
      </div>

      <Carousel
        ariaLabel="Charging & Power"
        items={CARDS.map((c) => (
          <CardView key={c.id} c={c} />
        ))}
        itemClassName="w-[88vw] sm:w-[520px] md:w-[760px] lg:w-[980px]"
        showCount
      />
    </section>
  );
}

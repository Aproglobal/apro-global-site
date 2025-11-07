import React from "react";
import HorizontalRail from "./HorizontalRail";

const CARDS = [
  {
    key: "layouts",
    title: "Layouts",
    body: "Typical layouts for 10 / 20 / 40 carts with breaker ranges and overnight charging.",
    foot: "Downloadable diagrams — coming soon.",
    img: "/assets/charging/dock.jpg",
  },
  {
    key: "infra",
    title: "Infrastructure",
    body: "Cable gauge by distance, IP ratings for outdoor cabinets, ventilation for charging rooms.",
    foot: "Specs & tables — coming soon.",
    img: "/assets/charging/regen.jpg",
  },
  {
    key: "request",
    title: "Request a Layout",
    body: "Share photos and the number of carts; we’ll propose a safe, scalable plan.",
    cta: "Get a charging layout",
    img: "/assets/charging/fast.jpg",
  },
];

export default function ChargingPowerSection() {
  return (
    <section id="charging" className="py-20 bg-white text-black dark:bg-black dark:text-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Charging &amp; Power</h2>

        <div className="mt-6">
          <HorizontalRail ariaLabel="Charging and power">
            {CARDS.map((card) => (
              <article
                key={card.key}
                className="snap-start shrink-0 w-[280px] md:w-[360px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 h-full flex flex-col"
              >
                {card.img ? (
                  <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-900">
                    <img src={card.img} alt={card.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
                  </div>
                ) : null}

                <h3 className="mt-3 font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{card.body}</p>

                {"foot" in card && (card as any).foot ? (
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{(card as any).foot}</p>
                ) : (
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent("lead:open", { detail: { source: "Charging Layout CTA" } }))}
                    className="mt-4 px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm w-full sm:w-auto transition hover:opacity-90"
                  >
                    {(card as any).cta}
                  </button>
                )}
              </article>
            ))}
          </HorizontalRail>
        </div>
      </div>
    </section>
  );
}

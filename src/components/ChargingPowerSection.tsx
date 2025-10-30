import React from "react";

export default function ChargingPowerSection() {
  return (
    <section id="charging" className="py-20 bg-white text-black dark:bg-black dark:text-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Charging &amp; Power</h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Layouts",
              body: "Typical layouts for 10 / 20 / 40 carts with breaker ranges and overnight charging.",
              foot: "Downloadable diagrams — coming soon.",
            },
            {
              title: "Infrastructure",
              body: "Cable gauge by distance, IP ratings for outdoor cabinets, ventilation for charging rooms.",
              foot: "Specs & tables — coming soon.",
            },
            {
              title: "Request a Layout",
              body: "Share photos and the number of carts; we’ll propose a safe, scalable plan.",
              cta: "Get a charging layout",
            },
          ].map((card, i) => (
            <article
              key={i}
              className="
                group rounded-2xl border border-zinc-200 dark:border-zinc-800 
                bg-white dark:bg-zinc-950 p-6 h-full flex flex-col
                transition-all duration-200
                hover:shadow-lg hover:-translate-y-0.5 hover:border-black/15 dark:hover:border-white/20
                motion-reduce:transition-none motion-reduce:hover:translate-y-0
              "
            >
              <h3 className="font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{card.body}</p>

              {card.foot ? (
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{card.foot}</p>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("lead:open", { detail: { source: "Charging Layout CTA" } })
                    )
                  }
                  className="
                    mt-auto px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm
                    w-full sm:w-auto
                    transition hover:opacity-90
                  "
                >
                  {card.cta}
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// src/components/ChargingPowerSection.tsx
import React from "react";

export default function ChargingPowerSection() {
  return (
    <section
      id="charging"
      className="py-20 bg-white text-black dark:bg-black dark:text-white scroll-mt-24 md:scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Charging & Power</h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
            <h3 className="font-semibold">Layouts</h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              Typical layouts for 10 / 20 / 40 carts with breaker ranges and overnight charging.
            </p>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Downloadable diagrams — coming soon.</p>
          </article>

          <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
            <h3 className="font-semibold">Infrastructure</h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              Cable gauge by distance, IP ratings for outdoor cabinets, ventilation for charging rooms.
            </p>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Specs & tables — coming soon.</p>
          </article>

          <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
            <h3 className="font-semibold">Request a Layout</h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              Share photos and the number of carts; we’ll propose a safe, scalable plan.
            </p>
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("lead:open", { detail: { source: "Charging Layout CTA" } }))
              }
              className="mt-3 px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm whitespace-nowrap"
            >
              Get a charging layout
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}

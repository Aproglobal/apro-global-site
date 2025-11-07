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
              foot: "Downloadable diagrams — coming soon.",import React from "react";
import { openLead } from "./LeadModal";
import { Plug, Cable, ClipboardList } from "lucide-react";

type Card =
  | { title: string; body: string; foot: string; icon: React.ReactNode }
  | { title: string; body: string; cta: string; icon: React.ReactNode };

export default function ChargingPowerSection() {
  const cards: Card[] = [
    {
      title: "Layouts",
      body: "Typical layouts for 10 / 20 / 40 carts with breaker ranges and overnight charging.",
      foot: "Downloadable diagrams — coming soon.",
      icon: <Plug className="h-4 w-4" />,
    },
    {
      title: "Infrastructure",
      body: "Cable gauge by distance, IP ratings for outdoor cabinets, ventilation for charging rooms.",
      foot: "Specs & tables — coming soon.",
      icon: <Cable className="h-4 w-4" />,
    },
    {
      title: "Request a Layout",
      body: "Share photos and the number of carts; we’ll propose a safe, scalable plan.",
      cta: "Get a charging layout",
      icon: <ClipboardList className="h-4 w-4" />,
    },
  ];

  return (
    <section id="charging" className="py-20 bg-white text-black dark:bg-black dark:text-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Charging &amp; Power</h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => {
            const isCta = "cta" in card;
            return (
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
                <div className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                  <span aria-hidden>{card.icon}</span>
                  <h3 className="font-semibold text-black dark:text-white">{card.title}</h3>
                </div>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{card.body}</p>

                {isCta ? (
                  <button
                    type="button"
                    onClick={() => openLead("Charging Layout CTA")}
                    className="mt-auto px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm
                               w-full sm:w-auto transition hover:opacity-90 focus:outline-none focus-visible:ring-2
                               focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
                  >
                    {(card as any).cta}
                  </button>
                ) : (
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{(card as any).foot}</p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

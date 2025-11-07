// src/components/CompareTable.tsx
import React, { useMemo } from "react";
import Carousel from "./ui/Carousel";
import { MODELS, type ModelSpec } from "../data/models";
import { openLead } from "./LeadModal";
import { trackEvent } from "../services/analytics";

function subtitleOf(m: ModelSpec) {
  const bits: string[] = [];
  if (m.guidance) bits.push(m.guidance);
  if (m.seats) bits.push(`${m.seats} seats`);
  if (m.deck) bits.push(`${m.deck} deck`);
  if (m.variant) bits.push(m.variant);
  if (m.reverse) bits.push("Reverse Seating");
  return bits.join(" • ");
}

function ModelCard({ m }: { m: ModelSpec }) {
  return (
    <article
      className="
        rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-950 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]
      "
    >
      <div className="relative aspect-[16/9]">
        <img
          src={`/models/${m.code}_1.jpg`}
          alt={m.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 rounded-full bg-black/70 text-white text-[11px] px-2 py-1">
          {m.code.toUpperCase()}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold">{m.name}</h3>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1">{subtitleOf(m)}</p>

        {/* (Optional) quick bullets — adjust as you like */}
        {m.features?.length ? (
          <ul className="mt-3 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            {m.features.slice(0, 4).map((f: string, i: number) => (
              <li key={i} className="pl-4 relative">
                <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                <span className="block translate-x-1">{f}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => {
              openLead(`Compare ${m.code}`, { modelCode: m.code });
              trackEvent("compare_talk_to_sales", { code: m.code });
            }}
            className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm"
          >
            Talk to Sales
          </button>
          <a
            href={`/specs/${m.code}.pdf`}
            onClick={() => trackEvent("compare_spec_download", { code: m.code })}
            className="px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-800 dark:text-zinc-200"
          >
            Specs PDF
          </a>
        </div>
      </div>
    </article>
  );
}

export default function CompareTable() {
  // Order or filter as needed (e.g., feature models first)
  const models = useMemo(() => MODELS, []);

  return (
    <section aria-label="Compare Models">
      <div className="mb-5">
        <h3 className="text-xl font-semibold">Compare Models</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Swipe/scroll sideways to browse models. Images sit right with the names so you can see differences at a glance.
        </p>
      </div>

      <Carousel
        ariaLabel="Compare Models"
        items={models.map((m) => <ModelCard key={m.code} m={m} />)}
        itemClassName="w-[88vw] sm:w-[520px] md:w-[640px] lg:w-[820px]"
        showCount
      />
    </section>
  );
}

// src/components/TechSection.tsx
import React, { useMemo } from "react";
import Carousel from "./ui/Carousel";
import { TECH_FEATURES, type TechItem } from "../data/tech_features";
import { trackEvent } from "../services/analytics";

function TechCard({ f }: { f: TechItem }) {
  return (
    <article
      className="
        rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-950 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]
      "
    >
      <div className="relative aspect-[4/3] md:aspect-[16/9] bg-black">
        <img
          src={f.img}
          alt={f.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          onClick={() => trackEvent("tech_image_open", { key: f.key, title: f.title })}
        />
        {/* optional numbered badge could go here if you want static numbering per item */}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold">{f.title}</h3>
        {f.desc ? <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1">{f.desc}</p> : null}
      </div>
    </article>
  );
}

export default function TechSection() {
  const items = useMemo<TechItem[]>(() => TECH_FEATURES, []);

  return (
    <section id="technology" className="py-2">
      <div className="mb-5">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Technology</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Swipe to explore every feature—images first, spec text second. The counter and arrows show there’s more to see.
        </p>
      </div>

      <Carousel
        ariaLabel="Technology features"
        items={items.map((f) => (
          <TechCard key={f.key} f={f} />
        ))}
        itemClassName="w-[88vw] sm:w-[520px] md:w-[760px] lg:w-[980px]"
        showCount
      />
    </section>
  );
}

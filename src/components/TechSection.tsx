// src/components/TechSection.tsx
import React, { useMemo } from "react";
import Carousel from "./ui/Carousel";
import type { TechCopy } from "../data/technology";
import { TECH_FEATURES, type TechItem } from "../data/tech_features";
import { trackEvent } from "../services/analytics";

function systemImg(id: string) {
  // Optional: add images under /public/tech/systems/<id>.jpg
  return `/tech/systems/${id}.jpg`;
}

function SystemCard({ id, title, bullets }: { id: string; title: string; bullets: string[] }) {
  return (
    <article
      className="
        rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-950 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]
      "
    >
      <div className="relative aspect-[4/3] md:aspect-[16/9] bg-zinc-100 dark:bg-zinc-900">
        <img
          src={systemImg(id)}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
          onClick={() => trackEvent("tech_system_image_open", { id, title })}
        />
        <div className="absolute left-3 top-3 rounded-full bg-black/75 text-white text-[11px] px-2 py-1">
          {title}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold">{title}</h3>
        <ul className="mt-2 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
          {bullets.map((b, i) => (
            <li key={i} className="pl-4 relative">
              <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
              <span className="block translate-x-1">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function FeatureCard({ f }: { f: TechItem }) {
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
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold">{f.title}</h3>
        {f.desc ? <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1">{f.desc}</p> : null}
      </div>
    </article>
  );
}

export default function TechSection({ copy }: { copy: TechCopy }) {
  const features = useMemo<TechItem[]>(() => TECH_FEATURES, []);
  const systems = copy.sections ?? [];

  return (
    <section id="technology" className="py-2">
      <div className="mb-5">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Technology</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Explore systems and features. Swipe sideways; arrows and the counter show more content.
        </p>
      </div>

      {/* Systems (your six highlight groups, image-led) */}
      {systems.length > 0 && (
        <>
          <h3 className="text-base font-semibold mb-2">Systems</h3>
          <Carousel
            ariaLabel="Technology systems"
            items={systems.map((s) => (
              <SystemCard key={s.id} id={s.id} title={s.title} bullets={s.bullets} />
            ))}
            itemClassName="w-[88vw] sm:w-[520px] md:w-[760px] lg:w-[980px]"
            showCount
          />
        </>
      )}

      {/* Visual features gallery */}
      {features.length > 0 && (
        <>
          <h3 className="text-base font-semibold mt-8 mb-2">Feature Gallery</h3>
          <Carousel
            ariaLabel="Technology features"
            items={features.map((f) => (
              <FeatureCard key={f.key} f={f} />
            ))}
            itemClassName="w-[88vw] sm:w-[520px] md:w-[760px] lg:w-[980px]"
            showCount
          />
        </>
      )}

      {copy.footnote ? <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">{copy.footnote}</p> : null}
    </section>
  );
}

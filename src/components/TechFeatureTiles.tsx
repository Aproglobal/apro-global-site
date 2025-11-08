// src/components/TechFeatureTiles.tsx
import React from "react";
import { TECH_FEATURES, type TechItem } from "../data/tech_features";

type Props = {
  title?: string;
  note?: string;
  items?: TechItem[]; // optional override
};

export default function TechFeatureTiles({ title, note, items }: Props) {
  const list: TechItem[] = Array.isArray(items)
    ? items
    : Array.isArray(TECH_FEATURES)
    ? TECH_FEATURES
    : [];

  if (list.length === 0) return null; // nothing to render, avoid crashes

  return (
    <section className="scroll-mt-24 py-16">
      <div className="max-w-6xl mx-auto px-5">
        {title ? (
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {title}
            </h2>
            {note ? (
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {note}
              </p>
            ) : null}
          </div>
        ) : null}

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {list.map((t) => (
            <li
              key={t.key}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 backdrop-blur overflow-hidden"
            >
              <div className="aspect-[16/10] bg-zinc-100 dark:bg-zinc-900">
                <img
                  src={t.img}
                  alt={t.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{t.title}</h3>
                {t.desc ? (
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">
                    {t.desc}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// src/components/TechSection.tsx
import React from "react";
import { TECH_SECTIONS } from "../data/tech";

export default function TechSection() {
  return (
    <section id="technology" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Technology</h2>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300 max-w-3xl">
          A practical stack for real courses: consistent routing, predictable operations, and maintainable hardware.
          Details vary by model and site plan—ask us for a tailored blueprint.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH_SECTIONS.map((item) => (
            <article key={item.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              {item.image && (
                <div className="w-full aspect-[16/9] bg-zinc-100 dark:bg-zinc-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{item.blurb}</p>
                {item.bullets && (
                  <ul className="mt-3 space-y-1 text-sm list-disc pl-5 text-zinc-700 dark:text-zinc-300">
                    {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
                {item.models && item.models.length > 0 && (
                  <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                    Applicable models: {item.models.join(', ')}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// src/components/TechSection.tsx
import React from "react";
import type { TechCopy } from "../data/technology";

export default function TechSection({ copy }: { copy: TechCopy }) {
  return (
    <section id="technology" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Technology</h2>

        {/* Highlights */}
        {copy.highlights?.length ? (
          <ul className="mt-4 grid md:grid-cols-3 gap-4">
            {copy.highlights.map((h, i) => (
              <li
                key={i}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 text-sm text-zinc-700 dark:text-zinc-300"
              >
                {h}
              </li>
            ))}
          </ul>
        ) : null}

        {/* Sections */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {copy.sections.map((sec) => (
            <article
              key={sec.id}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950"
            >
              <h3 className="text-lg font-semibold">{sec.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                {sec.bullets.map((b, i) => (
                  <li key={i} className="pl-4 relative">
                    <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                    <span className="block translate-x-1">{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {copy.footnote ? (
          <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">{copy.footnote}</p>
        ) : null}
      </div>
    </section>
  );
}

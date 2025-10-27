// src/components/TechSection.tsx
import React from "react";
import type { TechCopy } from "../data/technology";

export default function TechSection({ copy }: { copy: TechCopy }) {
  // 모바일: 아코디언 / 데스크톱: 카드 그리드
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
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 text-sm text-zinc-700 dark:text-zinc-300
                           bg-white dark:bg-zinc-950"
              >
                {h}
              </li>
            ))}
          </ul>
        ) : null}

        {/* Mobile (Accordion) */}
        <div className="mt-8 space-y-3 md:hidden">
          {copy.sections.map((sec) => (
            <details key={sec.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/90">
              <summary className="cursor-pointer list-none p-4 font-semibold flex items-center justify-between">
                {sec.title}
                <span>▾</span>
              </summary>
              <div className="p-4 pt-0">
                <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {sec.bullets.map((b, i) => (
                    <li key={i} className="pl-4 relative">
                      <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                      <span className="block translate-x-1">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>

        {/* Desktop (Cards) */}
        <div className="mt-8 hidden md:grid md:grid-cols-2 gap-6">
          {copy.sections.map((sec) => (
            <article
              key={sec.id}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6
                         bg-white dark:bg-zinc-950/90
                         transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-black/15 dark:hover:border-white/20"
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

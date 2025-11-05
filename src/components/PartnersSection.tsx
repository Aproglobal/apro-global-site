import React from "react";
import { PARTNERS_COPY } from "../data/company";

export default function PartnersSection() {
  return (
    <section id="partners" className="py-20 bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Partners</h2>
      <div className="mt-6 grid gap-4">
          {PARTNERS_COPY.map((p, i) => (
            <article
              key={i}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 text-sm text-zinc-700 dark:text-zinc-300"
            >
              {p}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

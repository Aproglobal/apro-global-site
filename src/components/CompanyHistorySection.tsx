import React from "react";
import { HISTORY } from "../data/company";

export default function CompanyHistorySection() {
  return (
    <section id="history" className="py-20 bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">회사 연혁</h2>
        <ol className="mt-6 space-y-4">
          {HISTORY.map((h) => (
            <li key={h.year} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
              <div className="flex items-baseline gap-3">
                <span className="inline-flex rounded-full border px-3 py-1 text-[11px] tracking-wide text-zinc-600 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700">
                  {h.year}
                </span>
                <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                  {h.items.map((t,i)=><li key={i}>• {t}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

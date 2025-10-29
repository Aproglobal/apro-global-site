import React from "react";

export default function ServiceWarrantySection() {
  return (
    <section id="service" className="py-20 bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Service & Warranty</h2>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
            <h3 className="font-semibold">Coverage & Response</h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              Global partner network with tiered response SLAs and parts availability bands.
            </p>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Map & partner list — coming soon.</p>
          </article>

          <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
            <h3 className="font-semibold">Warranty Matrix</h3>
            <ul className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
              <li>Battery — standard term by chemistry</li>
              <li>Motor & Controller — limited warranty</li>
              <li>Chassis & Trim — limited warranty</li>
            </ul>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Final terms vary by market.</p>
          </article>

          <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
            <h3 className="font-semibold">After-Delivery Program</h3>
            <ul className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
              <li>On-site training & handover</li>
              <li>First-month check & maintenance schedule</li>
              <li>Parts portal access</li>
            </ul>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Docs & portal — coming soon.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

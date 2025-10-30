// src/components/ConfiguratorSection.tsx
import React from "react";
import { trackEvent } from "../services/analytics";

export default function ConfiguratorSection() {
  return (
    <section
      id="configurator"
      className="py-20 bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white scroll-mt-24 md:scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Model Configurator</h2>
          <span className="text-[10px] uppercase tracking-wide rounded-full border px-2 py-1 text-zinc-600 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700">
            Coming soon
          </span>
        </div>

        <p className="mt-3 text-zinc-700 dark:text-zinc-300 max-w-2xl">
          Choose seating, battery options, colors, and must-have features. We’ll pre-fill a quote with your configuration.
        </p>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => trackEvent("configuratorNotifyClick", { where: "configurator_section" })}
            className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm whitespace-nowrap"
          >
            Notify me when ready
          </button>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { trackEvent } from "../services/analytics";

export default function TcoCalculator() {
  return (
    <section id="tco" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">TCO & ROI</h2>
          <span className="text-[10px] uppercase tracking-wide rounded-full border px-2 py-1 text-zinc-600 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700">
            Coming soon
          </span>
        </div>

        <p className="mt-3 text-zinc-700 dark:text-zinc-300 max-w-2xl">
          Estimate monthly energy cost, maintenance delta vs gas, and payback window. A simple calculator will be available here.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => trackEvent("tcoNotifyClick", { where: "tco_section" })}
            className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm"
          >
            Notify me when ready
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("lead:open", { detail: { source: "TCO CTA" } }))}
            className="px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm"
          >
            Request a detailed ROI (PDF)
          </button>
        </div>
      </div>
    </section>
  );
}

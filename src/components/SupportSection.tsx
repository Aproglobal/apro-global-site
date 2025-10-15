// src/components/SupportSection.tsx
import React from "react";
import { openLead } from "./LeadModal";

export default function SupportSection() {
  return (
    <section id="support" className="py-20 bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Support</h2>
          <button
            onClick={() => openLead('Support CTA')}
            className="hidden md:inline-flex px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black"
          >
            Talk to Sales
          </button>
        </div>

        <div className="mt-4 grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700">
            <h4 className="font-semibold">Installation</h4>
            <p className="text-sm text-zinc-600 mt-1 dark:text-zinc-300">
              Onsite setup, guidance calibration, and basic operator training.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700">
            <h4 className="font-semibold">Maintenance</h4>
            <p className="text-sm text-zinc-600 mt-1 dark:text-zinc-300">
              Preventive checks, genuine parts sourcing, and service SLAs.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700">
            <h4 className="font-semibold">Operations</h4>
            <p className="text-sm text-zinc-600 mt-1 dark:text-zinc-300">
              Throughput playbooks and best practices for route & station planning.
            </p>
          </div>
        </div>

        <div className="mt-6 md:hidden">
          <button
            onClick={() => openLead('Support CTA (mobile)')}
            className="w-full px-5 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black"
          >
            Talk to Sales
          </button>
        </div>
      </div>
    </section>
  );
}

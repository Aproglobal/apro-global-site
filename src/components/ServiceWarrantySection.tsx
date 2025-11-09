import React from "react";
import { LifeBuoy, Wrench, BookOpen } from "lucide-react";
import { openLead } from "./LeadModal";

export default function ServiceWarrantySection() {
  const salesEmail = (import.meta as any).env?.VITE_SALES_EMAIL || "sales@example.com";

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Service */}
      <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
            <Wrench className="h-5 w-5" />
          </span>
          <h3 className="text-lg font-bold">Service</h3>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          <li>• Organized harnessing and service hatch for faster inspection.</li>
          <li>• Diagnostics checklist & guided troubleshooting flow.</li>
          <li>• Parts logistics and RMA handling through regional partners.</li>
          <li>• Optional on-site service packages for launch and peak seasons.</li>
        </ul>
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => openLead("Service: Request support")}
            className="rounded-full bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
          >
            Request Support
          </button>
          <a
            href={`mailto:${salesEmail}`}
            className="rounded-full border px-4 py-2 text-sm border-zinc-300 dark:border-zinc-700"
          >
            Email Service
          </a>
        </div>
      </div>

      {/* Warranty */}
      <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
            <LifeBuoy className="h-5 w-5" />
          </span>
          <h3 className="text-lg font-bold">Warranty</h3>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          <li>• Standard vehicle and battery coverage, market-specific.</li>
          <li>• SK Mobile Energy lithium: in-house BMS / PACK / CELL provenance.</li>
          <li>• Clear exclusions and wear-item policy to avoid surprises.</li>
          <li>• Transferable options available for fleet resale programs.</li>
        </ul>
        <p className="mt-4 text-xs text-zinc-500">
          Coverage terms vary by country and distributor. For official terms, contact sales.
        </p>
        <div className="mt-5">
          <button
            onClick={() => openLead("Warranty: Request terms")}
            className="rounded-full bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
          >
            Get Official Terms
          </button>
        </div>
      </div>

      {/* Training & Documentation */}
      <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
            <BookOpen className="h-5 w-5" />
          </span>
          <h3 className="text-lg font-bold">Training & Documentation</h3>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          <li>• Operator & caddie quick-start guides.</li>
          <li>• Preventive maintenance schedule & checklists.</li>
          <li>• Charging room SOPs and daily runtime best practices.</li>
          <li>• Localization support (EN/KR/JP and others as needed).</li>
        </ul>
        <div className="mt-5">
          <button
            onClick={() => openLead("Docs: Request handbook")}
            className="rounded-full border px-4 py-2 text-sm border-zinc-300 dark:border-zinc-700"
          >
            Request Handbook PDF
          </button>
        </div>
      </div>
    </div>
  );
}

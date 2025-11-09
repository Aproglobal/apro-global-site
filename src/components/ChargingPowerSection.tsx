import React from "react";
import { BatteryCharging, PlugZap, GaugeCircle } from "lucide-react";
import { openLead } from "./LeadModal";

export default function ChargingPowerSection() {
  // Derived energy estimates (approx): 51V * Ah
  const packs = [
    { label: "51V 110Ah", energy: "~5.6 kWh", typical: "4–5 h charge (15–20 A)" },
    { label: "51V 160Ah", energy: "~8.2 kWh", typical: "4–5 h charge (20–25 A)" },
  ];

  return (
    <div className="space-y-8">
      {/* Quick stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
              <BatteryCharging className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold">Battery Options</h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>• SK Mobile Energy lithium with in-house BMS / PACK / CELL.</li>
            <li>• 51V 110Ah and 160Ah options for different duty cycles.</li>
            <li>• Wide operating temperature tolerance for year-round use.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
              <PlugZap className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold">Charging Time</h3>
          </div>
          <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">
            Typical full charge in <strong>4–5 hours</strong> depending on pack size and charger current. Daily top-ups
            shorten cycles and extend effective uptime.
          </p>
          <table className="mt-4 w-full text-sm">
            <thead className="text-left text-zinc-500 dark:text-zinc-400">
              <tr>
                <th className="py-2 pr-3">Pack</th>
                <th className="py-2 pr-3">Est. Energy</th>
                <th className="py-2">Typical Charge</th>
              </tr>
            </thead>
            <tbody className="text-zinc-800 dark:text-zinc-200">
              {packs.map((p) => (
                <tr key={p.label} className="border-t border-zinc-100 dark:border-zinc-800">
                  <td className="py-2 pr-3">{p.label}</td>
                  <td className="py-2 pr-3">{p.energy}</td>
                  <td className="py-2">{p.typical}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
              <GaugeCircle className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold">Daily Operations</h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>• Assign charging bays; rotate carts to balance cycle counts.</li>
            <li>• Keep charger leads off the floor; use clear cable routing.</li>
            <li>• Ventilated, dry charging room with dedicated circuits.</li>
            <li>• Post a simple open/close checklist for staff.</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-zinc-200 p-6 md:flex-row md:items-center dark:border-zinc-800">
        <div>
          <h4 className="text-lg font-bold">Plan your charging layout</h4>
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
            Get a suggested charger-per-fleet plan, electrical specs, and SOP template tailored to your course.
          </p>
        </div>
        <button
          onClick={() => openLead("Charging: Layout & SOP")}
          className="rounded-full bg-black px-5 py-2 text-white dark:bg-white dark:text-black"
        >
          Request a Charging Plan
        </button>
      </div>

      <p className="text-xs text-zinc-500">
        Notes: Energy figures are approximate (V × Ah). Actual runtime and charge time vary by temperature, load,
        terrain, and driving style.
      </p>
    </div>
  );
}

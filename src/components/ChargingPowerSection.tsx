import React from "react";

type Stat = {
  label: string;
  value: string;
  note?: string;
};

const STATS: Stat[] = [
  { label: "AC Charging", value: "6.6 kW", note: "On-board charger" },
  { label: "DC Fast Charge", value: "Up to 30 kW", note: "Optional" },
  { label: "Charge Port", value: "IP67", note: "Weather sealed" },
  { label: "Battery Chem.", value: "LiFePO₄", note: "Long cycle life" },
];

export default function ChargingPowerSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Charging & Power</h2>
          <p className="mt-2 text-sm text-gray-600">
            Fast, safe, and reliable charging for daily fleet operations.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-gray-200 p-5 shadow-sm"
            >
              <div className="text-xs uppercase text-gray-500">{s.label}</div>
              <div className="mt-1 text-2xl font-semibold">{s.value}</div>
              {s.note && <div className="mt-1 text-xs text-gray-500">{s.note}</div>}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-gray-50 p-5 text-sm text-gray-700">
          Compatible with standard AC outlets and optional DC fast-charge
          infrastructure. Exact specs can vary by model and market.
        </div>
      </div>
    </section>
  );
}

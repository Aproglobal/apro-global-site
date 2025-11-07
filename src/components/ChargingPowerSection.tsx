import React from "react";

type Stat = { label: string; value: string; sub?: string };

const STATS: Stat[] = [
  { label: "Max Charging Power", value: "6.6 kW" },
  { label: "Battery", value: "LiFePO₄ 105Ah" },
  { label: "On-board Charger", value: "AC 220V / 60Hz" },
];

export const ChargingPowerSection: React.FC = () => {
  return (
    <section id="charging" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-semibold">Charging & Power</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border p-6">
            <div className="text-sm text-gray-500">{s.label}</div>
            <div className="mt-1 text-2xl font-bold">{s.value}</div>
            {s.sub ? <div className="mt-1 text-xs">{s.sub}</div> : null}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChargingPowerSection;

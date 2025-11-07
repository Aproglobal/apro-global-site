import React from "react";

type Spec = { label: string; value: string };

const specs: Spec[] = [
  { label: "On-board Charger", value: "3.3–6.6 kW (model dependent)" },
  { label: "Input Voltage", value: "AC 100–240V / 50–60Hz" },
  { label: "Fast Charge (0→80%)", value: "≈ 2–3 hrs (lithium, fast charger)" },
  { label: "Standard Charge (0→100%)", value: "≈ 6–8 hrs (on-board)" },
  { label: "Battery Options", value: "Lithium / Lead-acid (per model)" },
  { label: "Safety", value: "Over-voltage / Over-temp / Short-circuit" },
];

function ChargingPowerSection() {
  return (
    <section id="charging" className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Charging & Power
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Practical specs for day-to-day operations. Exact values vary by model
            and market option.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {specs.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 p-4 shadow-sm"
            >
              <div className="text-xs uppercase tracking-wide text-gray-500">
                {s.label}
              </div>
              <div className="mt-1 text-lg font-semibold">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ChargingPowerSection;
export { ChargingPowerSection };

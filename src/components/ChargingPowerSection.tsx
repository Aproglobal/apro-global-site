// src/components/ChargingPowerSection.tsx
import React from "react";


export type ChargingItem = {
label: string;
value: string;
note?: string;
};


export function ChargingPowerSection(props: { title?: string; items?: ChargingItem[]; className?: string }) {
const { title = "Charging & Power", items = [], className = "" } = props;


const defaultItems: ChargingItem[] = items.length
? items
: [
{ label: "Battery", value: "Lithium Iron Phosphate (LFP)" },
{ label: "Pack Capacity", value: "105 Ah (standard)", note: "Optional 150 Ah" },
{ label: "On‑board Charger", value: "48V / 25A smart charger" },
{ label: "Input Voltage", value: "AC 100–240V, 50/60Hz" },
{ label: "Charge Time", value: "≈ 4–6 hours (0→100%)" },
{ label: "Connector", value: "IEC C13 / country‑specific plug" }
];


return (
<section className={`w-full bg-white py-16 ${className}`}>
<div className="mx-auto max-w-6xl px-4">
<h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
<p className="mt-2 text-sm text-gray-500">Fast, safe, and maintenance‑friendly power architecture.</p>


<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
{defaultItems.map((row) => (
<div key={row.label} className="rounded-2xl border border-gray-200 p-4">
<div className="text-xs uppercase text-gray-500">{row.label}</div>
<div className="mt-1 text-lg font-medium">{row.value}</div>
{row.note ? <div className="text-xs text-gray-400 mt-0.5">{row.note}</div> : null}
</div>
))}
</div>
</div>
</section>
);
}


export default ChargingPowerSection;

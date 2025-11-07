// src/components/CompareTable.tsx
import React from "react";


export type CompareSpec = {
key: string;
label: string;
g2?: string;
g3?: string;
vip?: string;
};


export function CompareTable(props: { title?: string; specs?: CompareSpec[]; className?: string }) {
const { title = "Model Comparison", specs = [], className = "" } = props;


const rows: CompareSpec[] = specs.length
? specs
: [
{ key: "seating", label: "Seating", g2: "5‑seater", g3: "5‑seater", vip: "5‑seater (VIP)" },
{ key: "battery", label: "Battery", g2: "LFP 105Ah", g3: "LFP 150Ah", vip: "LFP 150Ah" },
{ key: "deck", label: "Deck", g2: "Short / Long", g3: "Long", vip: "VIP long" },
{ key: "motor", label: "Motor", g2: "AC 5kW", g3: "AC 7.5kW", vip: "AC 7.5kW" },
{ key: "charger", label: "Charger", g2: "48V 25A", g3: "48V 25A", vip: "48V 25A" }
];


return (
<section className={`w-full bg-gray-50 py-16 ${className}`}>
<div className="mx-auto max-w-6xl px-4">
<h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
<div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
<table className="w-full text-left text-sm">
<thead className="bg-gray-50 text-gray-600">
<tr>
<th className="min-w-[180px] px-4 py-3">Specification</th>
<th className="px-4 py-3">G2</th>
<th className="px-4 py-3">G3</th>
<th className="px-4 py-3">VIP</th>
</tr>
</thead>
<tbody>
{rows.map((r) => (
<tr key={r.key} className="border-t border-gray-100">
<td className="px-4 py-3 font-medium text-gray-900">{r.label}</td>
<td className="px-4 py-3 text-gray-700">{r.g2 ?? "—"}</td>
<td className="px-4 py-3 text-gray-700">{r.g3 ?? "—"}</td>
<td className="px-4 py-3 text-gray-700">{r.vip ?? "—"}</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
</section>
);
}


export default CompareTable;

import React from "react";

type Row = { key: string; g2: string; g3: string };

const rows: Row[] = [
  { key: "Seating", g2: "2+3 (5-seat)", g3: "2+3 (5-seat)" },
  { key: "Battery", g2: "Lithium / Lead-acid", g3: "Lithium / Lead-acid" },
  { key: "Top Speed", g2: "≈ 24 km/h (gov.)", g3: "≈ 24 km/h (gov.)" },
  { key: "Wheelbase", g2: "Short / Long deck", g3: "Short / Long deck" },
  { key: "Guidance", g2: "Electronic (opt.)", g3: "Electronic (opt.)" },
  { key: "Warranty", g2: "Varies by market", g3: "Varies by market" },
];

function CompareTable() {
  return (
    <section id="compare" className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Compare Models
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            High-level differences between G2 and G3. Contact us for a detailed
            spec sheet.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="min-w-[640px] w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-4 py-3 font-semibold">Key</th>
                <th className="px-4 py-3 font-semibold">G2</th>
                <th className="px-4 py-3 font-semibold">G3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {rows.map((r) => (
                <tr key={r.key}>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {r.key}
                  </td>
                  <td className="px-4 py-3">{r.g2}</td>
                  <td className="px-4 py-3">{r.g3}</td>
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
export { CompareTable };

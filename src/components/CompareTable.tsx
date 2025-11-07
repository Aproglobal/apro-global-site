import React from "react";

type Row = {
  feature: string;
  g2: string;
  g3: string;
};

const ROWS: Row[] = [
  { feature: "Seats", g2: "5", g3: "5" },
  { feature: "Deck", g2: "Short / Long", g3: "Short / Long" },
  { feature: "Battery", g2: "LiFePO₄ (48V)", g3: "LiFePO₄ (48V)" },
  { feature: "Drive", g2: "2WD", g3: "2WD" },
  { feature: "Charger", g2: "AC 6.6kW", g3: "AC 6.6kW + DC Optional" },
];

export default function CompareTable() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">G2 vs G3</h2>
          <p className="mt-2 text-sm text-gray-600">
            A quick spec-by-spec comparison of our core models.
          </p>
        </header>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Feature
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  G2
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  G3
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {ROWS.map((r) => (
                <tr key={r.feature}>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-800">
                    {r.feature}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                    {r.g2}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                    {r.g3}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Specs shown are representative; final configuration varies by market and
          options.
        </p>
      </div>
    </section>
  );
}

// src/pages/models/ModelsCompare.tsx
export default function ModelsCompare() {
  const rows = [
    { name: "Seats", g2: "4/5/6", g3: "4/5 VIP", eg5: "5" },
    { name: "Guidance", g2: "Ready", g3: "Ready", eg5: "Optional" },
    { name: "Battery", g2: "Li / Pb", g3: "Li", eg5: "Li" },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">Compare Models</h1>
      <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-900/40">
            <tr>
              <th className="text-left p-3">Spec</th>
              <th className="text-left p-3">G2</th>
              <th className="text-left p-3">G3</th>
              <th className="text-left p-3">EG-5</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="p-3 font-medium">{r.name}</td>
                <td className="p-3">{r.g2}</td>
                <td className="p-3">{r.g3}</td>
                <td className="p-3">{r.eg5}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

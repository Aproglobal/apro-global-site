// src/pages/models/ModelsTechnology.tsx
// 내부 TechSection/TechFeatureGrid가 필수 props를 요구하므로, 우선 순수 JSX로 안전 구현
export default function ModelsTechnology() {
  const features = [
    { t: "Guidance", d: "Geofencing, pace control, and course rules." },
    { t: "Battery Systems", d: "Long-life packs, safe BMS, and charging workflows." },
    { t: "Diagnostics", d: "Remote checks and quick fault isolation." },
    { t: "Safety", d: "Speed limits by zone, roll warnings, emergency stop." },
  ];
  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">Technology</h1>
      <p className="text-neutral-600 dark:text-neutral-300 mb-8">
        Electronic guidance, power systems, diagnostics, and safety that power APRO carts.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f) => (
          <article key={f.t} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5">
            <h3 className="font-semibold">{f.t}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">{f.d}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

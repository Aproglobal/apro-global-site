// src/pages/models/ModelsService.tsx
export default function ModelsService() {
  const items = [
    { t: "Warranty", d: "Standard coverage with options for extended terms." },
    { t: "Parts", d: "Regional inventory and fast-ship lanes." },
    { t: "Repair", d: "Certified workflows to minimize downtime." },
    { t: "TCO", d: "Predictable costs across battery lifecycle." },
  ];
  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">Service & Warranty</h1>
      <p className="text-neutral-600 dark:text-neutral-300 mb-8">
        Coverage, parts, and repair processes designed for operational reliability.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((x) => (
          <article key={x.t} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5">
            <h3 className="font-semibold">{x.t}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">{x.d}</p>
          </article>
        ))}
      </div>

      <section className="mt-12 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
        <h2 className="text-xl font-semibold mb-2">Need help choosing?</h2>
        <p className="text-neutral-600 dark:text-neutral-300 mb-4">
          Tell us your course size, terrain, and preferred seating. We’ll propose the right model set and service plan.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center rounded-lg px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-medium"
        >
          Talk to Sales
        </a>
      </section>
    </main>
  );
}

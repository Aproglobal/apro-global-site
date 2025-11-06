// src/pages/models/ModelsIndex.tsx
import { Link } from "react-router-dom";

const MODELS = [
  { slug: "g2", name: "G2", blurb: "Electronic guidance ready, flexible seating." },
  { slug: "g3", name: "G3", blurb: "Premium trim, VIP/Semi-VIP seating options." },
  { slug: "eg-5", name: "EG-5", blurb: "5-seater configuration for operations." },
];

export default function ModelsIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Models</h1>
          <p className="text-neutral-600 dark:text-neutral-300 mt-2">
            Choose the right cart set for your course layout and operations.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/models/compare" className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700">Compare</Link>
          <Link to="/models/configurator" className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700">Configurator</Link>
          <Link to="/models/cases" className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700">Case Studies</Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODELS.map((m) => (
          <article key={m.slug} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 hover:shadow-sm transition">
            <h3 className="text-lg font-semibold">{m.name}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">{m.blurb}</p>
            <Link to={`/models/${m.slug}`} className="inline-block mt-3 underline underline-offset-2 text-sm">
              View details
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

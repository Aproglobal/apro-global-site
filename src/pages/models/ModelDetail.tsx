// src/pages/models/ModelDetail.tsx
import { useParams, Link } from "react-router-dom";

const COPY: Record<string, { title: string; bullets: string[] }> = {
  g2: { title: "G2", bullets: ["Electronic guidance ready", "Lithium / Lead-acid options", "4/5/6 seats"] },
  g3: { title: "G3", bullets: ["VIP/Semi-VIP seating", "Premium trim", "Configured for member courses"] },
  "eg-5": { title: "EG-5", bullets: ["5 seats", "Ops friendly", "Low TCO"] },
};

export default function ModelDetail() {
  const { slug } = useParams<{ slug: string }>();
  const data = (slug && COPY[slug]) || { title: slug ?? "Model", bullets: [] };

  return (
    <main className="mx-auto max-w-4xl px-4 md:px-6 py-10">
      <Link to="/models" className="text-sm underline underline-offset-2">← Back to Models</Link>
      <h1 className="text-3xl font-extrabold tracking-tight mt-3">{data.title}</h1>

      <ul className="mt-6 space-y-2 list-disc pl-5">
        {data.bullets.map((b) => <li key={b} className="text-neutral-700 dark:text-neutral-200">{b}</li>)}
      </ul>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link to="/models/technology" className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700">Technology</Link>
        <Link to="/models/service" className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700">Service & Warranty</Link>
        <Link to="/models/cases" className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700">Case Studies</Link>
        <Link to="/contact" className="px-3 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black">Talk to Sales</Link>
      </div>
    </main>
  );
}

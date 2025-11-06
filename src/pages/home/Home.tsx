// src/pages/home/Home.tsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-12">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">APRO — Electric Golf Carts</h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-300">
          Electronic guidance, flexible seating, and dependable service across APAC.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/models"
            className="rounded-xl px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-semibold"
          >
            Explore Models
          </Link>
          <Link
            to="/contact"
            className="rounded-xl px-4 py-2 border border-neutral-300 dark:border-neutral-700"
          >
            Talk to Sales
          </Link>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { t: "Electronic Guidance", d: "Course mapping, pace, and safety rules." },
          { t: "Battery & Power", d: "Long-life packs and safe charging workflows." },
          { t: "Service & Warranty", d: "Parts coverage and fast turnaround." },
        ].map((x) => (
          <article key={x.t} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5">
            <h3 className="font-semibold">{x.t}</h3>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{x.d}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

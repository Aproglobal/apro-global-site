// src/pages/home/Home.tsx
import MarketingHero from "../../components/hero/MarketingHero";
import { Link } from "react-router-dom";
import { getABVariant } from "../../services/ab";

export default function Home() {
  const variant = getABVariant();

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-10 space-y-10">
      {/* HERO */}
      <MarketingHero variant={variant} />

      {/* 핵심 가치 3그리드 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            t: "Electronic Guidance",
            d: "Geofencing, pace, and course rules that keep play flowing.",
            to: "/models/technology",
          },
          {
            t: "Battery & Power",
            d: "Long-life packs, safe BMS, and predictable TCO across lifecycle.",
            to: "/models/technology",
          },
          {
            t: "Service & Warranty",
            d: "Parts coverage and fast turnaround, optimized for APAC.",
            to: "/models/service",
          },
        ].map((x) => (
          <article
            key={x.t}
            className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 hover:shadow-sm transition"
          >
            <h3 className="font-semibold">{x.t}</h3>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{x.d}</p>
            <Link to={x.to} className="inline-block mt-3 text-sm underline underline-offset-2">
              Learn more
            </Link>
          </article>
        ))}
      </section>

      {/* 콜아웃 (세일즈 유도) */}
      <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">Ready to plan your fleet?</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
          Tell us your course size, terrain, and seating mix. We’ll propose the right model set, delivery plan, and TCO.
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            to="/models"
            className="rounded-xl px-4 py-2 border border-neutral-300 dark:border-neutral-700"
          >
            Explore Models
          </Link>
          <Link
            to="/contact"
            className="rounded-xl px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-semibold"
          >
            Talk to Sales
          </Link>
        </div>
      </section>
    </main>
  );
}

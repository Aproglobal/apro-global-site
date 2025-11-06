import React from "react";
import Header from "../components/Header";

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Header />
      <main id="main" className="pt-16">
        <section className="max-w-6xl mx-auto px-5 py-12">
          <h1 className="text-4xl font-extrabold tracking-tight">Partners</h1>
          <p className="mt-3 text-zinc-700 dark:text-zinc-300 max-w-3xl">
            We work with globally trusted brands and manufacturers to support professional golf course operations.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-lg font-bold">John Deere</h2>
              <p className="mt-3 text-sm">
                John Deere golf course maintenance equipment is widely used at professional venues, from mowers and
                tractors to aerifiers and utility vehicles. PGA and TPC courses are known to maintain tournament-level
                conditions with John Deere solutions.
              </p>
            </article>

            <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-lg font-bold">Weathermatic / Signature</h2>
              <p className="mt-3 text-sm">
                High-performance irrigation systems used globally and domestically, offering efficient water delivery
                and reliable course-wide control from pump stations to individual sprinklers.
              </p>
            </article>

            <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-lg font-bold">APRO (DONGYANG DKI)</h2>
              <p className="mt-3 text-sm">
                Next-generation electric guidance golf carts with refined design and advanced technology. Developed with
                domestic engineering and field know-how for courses across APAC.
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

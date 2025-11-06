// src/pages/PartnersPage.tsx
import React from "react";
import PartnersSection from "../components/PartnersSection";

export default function PartnersPage() {
  return (
    <main id="main" className="pt-16">
      <section className="py-14 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto px-5">
          <h1 className="text-4xl font-extrabold tracking-tight">Partners</h1>
          <p className="mt-3 text-zinc-700 dark:text-zinc-300 max-w-3xl">
            Global brands and technology partners we collaborate with.
          </p>
        </div>
      </section>

      <PartnersSection />
    </main>
  );
}

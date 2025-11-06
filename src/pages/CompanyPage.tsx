// src/pages/CompanyPage.tsx
import React from "react";
import CompanyAboutSection from "../components/CompanyAboutSection";
import CompanyHistorySection from "../components/CompanyHistorySection";
import OrganizationSection from "../components/OrganizationSection";

export default function CompanyPage() {
  return (
    <main id="main" className="pt-16">
      <section className="py-14 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto px-5">
          <h1 className="text-4xl font-extrabold tracking-tight">About the Company</h1>
          <p className="mt-3 text-zinc-700 dark:text-zinc-300 max-w-3xl">
            Learn about our background, milestones, and organizational structure.
          </p>
        </div>
      </section>

      <CompanyAboutSection />
      <CompanyHistorySection />
      <OrganizationSection />
    </main>
  );
}

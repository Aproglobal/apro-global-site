import ServiceWarrantySection from "../../components/ServiceWarrantySection";

export default function ModelsService() {
  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">
        Service & Warranty
      </h1>
      <p className="text-neutral-600 dark:text-neutral-300 mb-10">
        Coverage, parts, and repair workflows designed for minimal downtime and predictable TCO.
      </p>

      <ServiceWarrantySection />

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

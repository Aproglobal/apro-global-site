type CaseItem = {
  logo?: string;
  name: string;
  region: string;
  highlight: string;
  link?: string;
};

const CASES: CaseItem[] = [
  { name: "Sky Valley", region: "KR", highlight: "Electronic guidance roll-out across 18H", link: "#" },
  { name: "Rexfield", region: "KR", highlight: "VIP seating mix for member courses", link: "#" },
  { name: "LakeSide", region: "KR", highlight: "Battery lifecycle & TCO optimization", link: "#" },
];

export default function ModelsCases() {
  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">
        Case Studies
      </h1>
      <p className="text-neutral-600 dark:text-neutral-300 mb-10">
        Selected deployments and outcomes from courses using APRO carts.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CASES.map((c) => (
          <article
            key={c.name}
            className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 hover:shadow-sm transition"
          >
            <div className="text-sm text-neutral-500">{c.region}</div>
            <h3 className="text-lg font-semibold mt-1">{c.name}</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-2">{c.highlight}</p>
            {c.link && (
              <a
                href={c.link}
                className="inline-flex items-center mt-3 text-sm underline underline-offset-2"
              >
                View details
              </a>
            )}
          </article>
        ))}
      </div>

      <section className="mt-12 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
        <h2 className="text-xl font-semibold mb-2">Have a project in mind?</h2>
        <p className="text-neutral-600 dark:text-neutral-300 mb-4">
          We’ll help you scope models, guidance, and service to your operation.
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

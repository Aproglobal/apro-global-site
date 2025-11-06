import { SERVICE_STEPS, WARRANTY } from "../../content/service";
import { SeoHead } from "../../utils/SeoHead";
import { SectionTitle } from "../../components/Section";

export default function ModelsServiceWarranty() {
  return (
    <main className="container-xl section-pad">
      <SeoHead title="Service & Warranty — APRO" description="Onboarding, delivery, after-sales, and coverage." />
      <SectionTitle title="Service Process" desc="From site assessment to after-sales." />
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICE_STEPS.map((s, i) => (
          <li key={i} className="card p-5">
            <div className="text-xs tracking-wider uppercase text-brand-600 font-bold">Step {i+1}</div>
            <div className="mt-1 font-semibold">{s.title}</div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{s.desc}</p>
          </li>
        ))}
      </ol>

      <SectionTitle title="Warranty" desc={WARRANTY.summary} />
      <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
        {WARRANTY.bullets.map((b, i) => <li key={i} className="mb-1">{b}</li>)}
      </ul>
    </main>
  );
}

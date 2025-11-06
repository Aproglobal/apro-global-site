import { CASES } from "../../content/cases";
import { MODELS } from "../../content/models";
import { SeoHead } from "../../utils/SeoHead";
import { SectionTitle } from "../../components/Section";

export default function ModelsCases() {
  const modelBySlug = Object.fromEntries(MODELS.map(m => [m.slug, m]));
  return (
    <main className="container-xl section-pad">
      <SeoHead title="Case Studies — APRO" description="Measured outcomes from real courses." />
      <SectionTitle title="Case Studies" desc="Selected deployments with before/after outcomes." />
      <div className="grid sm:grid-cols-2 gap-6">
        {CASES.map(cs => {
          const m = modelBySlug[cs.modelSlug];
          return (
            <article key={cs.id} className="card overflow-hidden">
              <img src={cs.cover} alt="" className="w-full aspect-[16/9] object-cover" loading="lazy" />
              <div className="p-5">
                <div className="text-xs text-gray-500">{cs.course} · {m?.name}</div>
                <h3 className="mt-1 font-semibold">{cs.title}</h3>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {cs.results.map((r, i) => (
                    <div key={i} className="rounded-lg bg-gray-50 dark:bg-white/5 p-3">
                      <div className="text-xs text-gray-500">{r.label}</div>
                      <div className="kpi">{r.value}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300"><b>Problem:</b> {cs.problem}</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300"><b>Solution:</b> {cs.solution}</p>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

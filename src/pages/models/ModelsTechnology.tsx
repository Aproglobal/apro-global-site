import { TECHNOLOGY } from "../../content/technology";
import { SeoHead } from "../../utils/SeoHead";
import { SectionTitle } from "../../components/Section";

export default function ModelsTechnology() {
  return (
    <main className="container-xl section-pad">
      <SeoHead title="Technology — APRO" description="Electronic guidance, battery platform, chassis & ride." />
      <SectionTitle title="Technology" desc="Shared platform across APRO models." />
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TECHNOLOGY.map(t => (
          <li key={t.id} className="card p-5">
            <div className="font-semibold">{t.title}</div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{t.summary}</p>
            {t.details && <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{t.details}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}

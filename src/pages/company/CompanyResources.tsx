import { DOWNLOADS } from "../../content/company";
import { SeoHead } from "../../utils/SeoHead";
import { SectionTitle } from "../../components/Section";

export default function CompanyResources() {
  return (
    <main className="container-xl section-pad">
      <SeoHead title="Resources — APRO" description="Brochures, certifications, and guides." />
      <SectionTitle title="Resources" desc="Download PDFs and official materials." />
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DOWNLOADS.map((d, i) => (
          <li key={i} className="card p-5 flex items-center justify-between gap-4">
            <div>
              <div className="font-semibold">{d.title}</div>
              <div className="text-xs text-gray-500">{d.type.toUpperCase()}</div>
            </div>
            <a className="btn btn-ghost" href={d.file} target="_blank" rel="noreferrer">Open</a>
          </li>
        ))}
      </ul>
    </main>
  );
}

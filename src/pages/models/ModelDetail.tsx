import { useParams } from "react-router-dom";
import { MODELS } from "../../content/models";
import { SeoHead } from "../../utils/SeoHead";
import { LeadCtaBar } from "../../components/LeadCtaBar";
import { SectionTitle } from "../../components/Section";

export default function ModelDetail() {
  const { slug } = useParams();
  const model = MODELS.find(m => m.slug === slug);

  if (!model) {
    return (
      <main className="container-xl section-pad">
        <SeoHead title="Model not found — APRO" />
        <h1 className="text-2xl font-bold">Model not found</h1>
      </main>
    );
  }

  return (
    <>
      <SeoHead title={`${model.name} — APRO`} description={model.tagline} image={model.thumbnail} />
      <section className="section-pad bg-gray-50 dark:bg-white/5 border-b border-gray-200/70 dark:border-white/10">
        <div className="container-xl grid lg:grid-cols-2 gap-8 items-center">
          <img src={model.thumbnail} alt="" className="w-full rounded-2xl border border-gray-200/70 dark:border-white/10" />
          <div>
            <h1 className="text-3xl font-extrabold">{model.name}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{model.tagline}</p>
            <ul className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              <li>Seats: {model.seats}</li>
              <li>Power: {model.power}</li>
              <li>Guidance: {model.guidance}</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="https://forms.gle/9z6Z-example" target="_blank" rel="noreferrer" className="btn btn-primary">Get Pricing</a>
              {model.brochure && (
                <a href={model.brochure} className="btn btn-ghost" target="_blank" rel="noreferrer"
                  onClick={() => {
                    // @ts-ignore
                    if (typeof window.gtag === "function")
                      window.gtag("event", "model_spec_download", { slug: model.slug });
                  }}
                >
                  Brochure
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="container-xl section-pad">
        {model.highlights?.length ? (
          <>
            <SectionTitle title="Highlights" />
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {model.highlights.map((h, i) => (
                <li className="card p-5" key={i}>{h}</li>
              ))}
            </ul>
          </>
        ) : null}

        {model.specs && (
          <>
            <SectionTitle title="Specifications" />
            <div className="overflow-x-auto card">
              <table className="min-w-full text-sm">
                <tbody>
                  {Object.entries(model.specs).map(([k, v]) => (
                    <tr key={k} className="border-b last:border-0 border-gray-200/70 dark:border-white/10">
                      <td className="py-3 px-4 font-medium">{k}</td>
                      <td className="py-3 px-4">{String(v)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <LeadCtaBar />
      </main>
    </>
  );
}

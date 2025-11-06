import { Hero } from "../../components/Hero";
import { SectionTitle } from "../../components/Section";
import { MODELS } from "../../content/models";
import { LeadCtaBar } from "../../components/LeadCtaBar";
import { SeoHead } from "../../utils/SeoHead";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <SeoHead
        title="APRO — Electric Golf Carts"
        description="Electronic guidance, flexible seating, dependable service."
        image="/assets/hero.jpg"
      />
      <Hero
        title="Electronic Guidance. Flexible Seating. Proven in APAC."
        subtitle="Modern electric carts, backed by local partners and measurable outcomes."
      />

      <main className="container-xl section-pad">
        <SectionTitle
          eyebrow="Models"
          title="Popular selections"
          desc="Pick a model and request lead time & pricing."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODELS.slice(0,3).map(m => (
            <Link key={m.slug} to={`/models/${m.slug}`} className="card overflow-hidden hover:shadow-md transition">
              <img src={m.thumbnail} alt="" className="w-full aspect-video object-cover" loading="lazy" />
              <div className="p-5">
                <div className="text-sm text-gray-500">{m.tagline}</div>
                <div className="mt-1 font-semibold">{m.name}</div>
                <div className="mt-2 text-xs text-gray-500">
                  {m.seats} seats · {m.power} · {m.guidance}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <SectionTitle
          eyebrow="Why APRO"
          title="Designed for real courses"
          desc="Field-proven guidance, battery telemetry, and service playbooks."
        />
        <ul className="grid sm:grid-cols-3 gap-6">
          <li className="card p-5">
            <div className="font-semibold">Electronic Guidance</div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Stable routing on varied terrain with OTA parameter tuning.
            </p>
          </li>
          <li className="card p-5">
            <div className="font-semibold">Lithium Platform</div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Predictable runtime, cycle longevity, and safer charge strategy.
            </p>
          </li>
          <li className="card p-5">
            <div className="font-semibold">Service & Warranty</div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Local partner support with clear SLAs and parts stocking.
            </p>
          </li>
        </ul>

        <LeadCtaBar />
      </main>
    </>
  );
}

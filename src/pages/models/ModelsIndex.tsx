import { MODELS } from "../../content/models";
import { SectionTitle } from "../../components/Section";
import { Link } from "react-router-dom";
import { SeoHead } from "../../utils/SeoHead";

export default function ModelsIndex() {
  return (
    <main className="container-xl section-pad">
      <SeoHead title="Models — APRO" description="Browse APRO models and request pricing." />
      <SectionTitle title="Models" desc="Electronic guidance-ready carts with flexible seating." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODELS.map(m => (
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
    </main>
  );
}

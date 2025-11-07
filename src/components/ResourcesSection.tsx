import React from "react";
import HorizontalRail from "./HorizontalRail";
import { trackEvent } from "../services/analytics";

type ResourceCard = {
  id: string;
  title: string;
  desc: string;
  href?: string;
  comingSoon?: boolean;
  img?: string;
};

const CARDS: ResourceCard[] = [
  { id: "downloads", title: "Downloads", desc: "Spec sheets, drawings, brochures, owner’s manuals.", comingSoon: true, img: "/assets/resources/specs.jpg" },
  { id: "case-studies", title: "Case Studies", desc: "Before/after outcomes, fleets, charging, service plans.", comingSoon: true, img: "/assets/resources/brochure.jpg" },
  { id: "compliance", title: "Compliance & Certifications", desc: "Electrical, charger safety, EMC, IP ratings, lighting.", comingSoon: true, img: "/assets/resources/brand.jpg" },
];

export default function ResourcesSection() {
  return (
    <section id="resources" className="py-20 bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Resources</h2>

        <div className="mt-6">
          <HorizontalRail ariaLabel="Resources and downloads">
            {CARDS.map((c) => (
              <a
                key={c.id}
                href={c.href || undefined}
                onClick={() => trackEvent("resourceCardClick", { resource_id: c.id })}
                className="snap-start shrink-0 w-[280px] md:w-[360px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 hover:shadow-md transition"
                aria-disabled={!c.href}
              >
                {c.img ? (
                  <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-900">
                    <img src={c.img} alt={c.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
                  </div>
                ) : null}

                <div className="mt-3 flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{c.title}</h3>
                  {c.comingSoon ? (
                    <span className="text-[10px] uppercase tracking-wide rounded-full border px-2 py-1 text-zinc-600 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700">
                      Coming soon
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{c.desc}</p>
              </a>
            ))}
          </HorizontalRail>
        </div>
      </div>
    </section>
  );
}

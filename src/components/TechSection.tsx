import React, { useMemo, useState } from "react";
import type { TechCopy } from "../data/technology";
import { TECH_FEATURES, type TechItem } from "../data/tech_features";
import { trackEvent } from "../services/analytics";
import HorizontalRail from "./HorizontalRail";

export default function TechSection({ copy }: { copy: TechCopy }) {
  const items = useMemo<TechItem[]>(() => TECH_FEATURES, []);
  const [active, setActive] = useState<TechItem | null>(null);

  const onOpen = (it: TechItem) => {
    setActive(it);
    try { trackEvent("tech_image_open", { section: "technology", key: it.key, title: it.title }); } catch {}
  };
  const onClose = () => setActive(null);

  return (
    <section id="technology" className="py-20 bg-white text-black dark:bg-black dark:text-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Technology</h2>

        {/* Desktop: left specs (sticky) + right horizontal rail (images) */}
        <div className="mt-10 hidden md:grid grid-cols-12 gap-6">
          <aside className="col-span-4 sticky top-24 self-start space-y-4">
            {copy.highlights?.length ? (
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950/90">
                <h3 className="text-base font-semibold">Technology Highlights</h3>
                <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {copy.highlights.map((h, i) => (
                    <li key={i} className="pl-4 relative">
                      <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                      <span className="block translate-x-1">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {copy.sections.map((sec) => (
              <article key={sec.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950/90">
                <h3 className="text-base font-semibold">{sec.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {sec.bullets.map((b, i) => (
                    <li key={i} className="pl-4 relative">
                      <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                      <span className="block translate-x-1">{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            {copy.footnote ? <p className="text-xs text-zinc-500 dark:text-zinc-400">{copy.footnote}</p> : null}
          </aside>

          <div className="col-span-8">
            <HorizontalRail ariaLabel="Technology photo gallery">
              {items.map((f) => (
                <article
                  key={f.key}
                  className="snap-start shrink-0 w-[280px] md:w-[360px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 md:p-5"
                >
                  <button type="button" onClick={() => onOpen(f)} className="block w-full text-left" aria-label={`Open ${f.title} image`}>
                    <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-900">
                      <img src={f.img} alt={f.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
                    </div>
                    <div className="mt-3">
                      <h3 className="text-sm font-semibold">{f.title}</h3>
                      {f.desc ? <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{f.desc}</p> : null}
                    </div>
                  </button>
                </article>
              ))}
            </HorizontalRail>
          </div>
        </div>

        {/* Mobile: rail first, then ALWAYS-OPEN specs (no toggle) */}
        <div className="md:hidden">
          <HorizontalRail ariaLabel="Technology photo gallery (mobile)">
            {items.map((f) => (
              <article
                key={f.key}
                className="snap-start shrink-0 w-[240px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3"
              >
                <button type="button" onClick={() => onOpen(f)} className="block w-full text-left" aria-label={`Open ${f.title} image`}>
                  <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-900">
                    <img src={f.img} alt={f.title} loading="lazy" width={640} height={480} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-sm font-semibold">{f.title}</h3>
                    {f.desc ? <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{f.desc}</p> : null}
                  </div>
                </button>
              </article>
            ))}
          </HorizontalRail>

          {copy.highlights?.length ? (
            <div className="mt-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
              <h3 className="text-sm font-semibold">Technology Highlights</h3>
              <ul className="mt-2 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                {copy.highlights.map((h, i) => (
                  <li key={i} className="pl-4 relative">
                    <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                    <span className="block translate-x-1">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-4 space-y-3">
            {copy.sections.map((sec) => (
              <article key={sec.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
                <h3 className="text-sm font-semibold">{sec.title}</h3>
                <ul className="mt-2 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {sec.bullets.map((b, i) => (
                    <li key={i} className="pl-4 relative">
                      <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                      <span className="block translate-x-1">{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {copy.footnote ? <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">{copy.footnote}</p> : null}
        </div>
      </div>

      {/* Lightbox */}
      {active ? (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-2xl bg-black">
              <img src={active.img} alt={active.title} className="w-full h-auto" />
            </div>
            <div className="mt-3 flex items-start justify-between gap-4 text-white">
              <div>
                <h4 className="text-base font-semibold">{active.title}</h4>
                {active.desc ? <p className="text-sm text-zinc-300 mt-1">{active.desc}</p> : null}
              </div>
              <button type="button" onClick={onClose} className="rounded-full border border-white/30 px-3 py-1 text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

import React, { useEffect } from "react";
import type { TechCopy } from "../data/technology";
import { trackEvent } from "../services/analytics";
import { Cog, BatteryCharging, Radio, ShieldCheck, Car, Wind } from "lucide-react";

type Props = { copy: TechCopy };

const IconById: Record<string, React.ReactNode> = {
  drivetrain: <Cog className="w-5 h-5 mr-2" aria-hidden />,
  battery: <BatteryCharging className="w-5 h-5 mr-2" aria-hidden />,
  guidance: <Radio className="w-5 h-5 mr-2" aria-hidden />,import React, { useEffect } from "react";
import type { TechCopy } from "../data/technology";
import { trackEvent } from "../services/analytics";
import { Cog, BatteryCharging, Radio, ShieldCheck, Car, Wind } from "lucide-react";

type Props = { copy: TechCopy };

const IconById: Record<string, React.ReactNode> = {
  drivetrain: <Cog className="w-5 h-5 mr-2" aria-hidden />,
  battery: <BatteryCharging className="w-5 h-5 mr-2" aria-hidden />,
  guidance: <Radio className="w-5 h-5 mr-2" aria-hidden />,
  safety: <ShieldCheck className="w-5 h-5 mr-2" aria-hidden />,
  suspension: <Car className="w-5 h-5 mr-2" aria-hidden />,
  body: <Wind className="w-5 h-5 mr-2" aria-hidden />,
};

export default function TechSection({ copy }: Props) {
  useEffect(() => {
    trackEvent("tech_view");
  }, []);

  // ✅ 블록 노출(첫 진입) 트래킹
  useEffect(() => {
    const seen = new Set<string>();
    const selector = '[data-tech-id]';
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const id = el.dataset.techId!;
          const title = el.dataset.techTitle || id;
          if (seen.has(id)) return;
          seen.add(id);
          trackEvent("tech_block_view", { id, title });
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.25 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [copy.blocks.map((b) => b.id).join('|')]);

  return (
    <section id="technology" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          {copy.headline}
        </h2>
        {copy.intro && (
          <p className="mt-3 max-w-3xl text-zinc-700 dark:text-zinc-300">
            {copy.intro}
          </p>
        )}

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {copy.blocks.map((b) => (
            <article
              key={b.id}
              id={b.id}
              data-tech-id={b.id}
              data-tech-title={b.title}
              onClick={() => trackEvent("tech_block_click", { id: b.id, title: b.title })}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <h3 className="text-xl font-semibold flex items-center">
                <span className="inline-flex items-center justify-center">{IconById[b.id] ?? null}</span>
                {b.title}
              </h3>
              {b.body && (
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {b.body}
                </p>
              )}
              {b.bullets && b.bullets.length > 0 && (
                <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {b.bullets.map((li, i) => (
                    <li key={i} className="pl-4 relative">
                      <span className="absolute left-0 top-0">•</span>
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        <div className="mt-8">
          <a
            href="#models"
            onClick={() => trackEvent("cta_click", { where: "technology", label: "Explore models" })}
            className="inline-block px-5 py-3 rounded-full border border-black/40 text-black dark:border-white/60 dark:text-white"
          >
            Explore models
          </a>
        </div>
      </div>
    </section>
  );
}

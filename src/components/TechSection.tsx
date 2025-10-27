import React, { useEffect } from "react";
import type { TechCopy } from "../data/technology";
import { trackEvent } from "../services/analytics";

type Props = {
  copy: TechCopy;
};

export default function TechSection({ copy }: Props) {
  useEffect(() => {
    trackEvent("tech_view");
  }, []);

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
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6"
            >
              <h3 className="text-xl font-semibold">{b.title}</h3>
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

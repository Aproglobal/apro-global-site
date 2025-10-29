import React, { useMemo, useState } from "react";
import type { TechCopy } from "../data/technology";
import { TECH_FEATURES, type TechItem } from "../data/tech_features";
import { trackEvent } from "../services/analytics";

type ViewMode = "gallery" | "list";

type SplitBlock = {
  key: string;           // TECH_FEATURES.key 참조
  eyebrow?: string;
  headline: string;
  body?: string;// src/components/TechSection.tsx
import React, { useMemo, useState } from "react";
import type { TechCopy } from "../data/technology";
import { TECH_FEATURES, type TechItem } from "../data/tech_features";
import { trackEvent } from "../services/analytics";

type ViewMode = "photos" | "specs";

/** 원본 크기 유지: 컨테이너보다 클 때만 줄이고, 그 외에는 절대 확대하지 않음 */
function NativeImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-auto max-w-full h-auto block"
      style={{ imageRendering: "auto" }}
    />
  );
}

export default function TechSection({ copy }: { copy: TechCopy }) {
  const items: TechItem[] = useMemo(() => TECH_FEATURES, []);
  const [view, setView] = useState<ViewMode>("photos");

  return (
    <section id="technology" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Technology</h2>

        {/* Highlights */}
        {copy.highlights?.length ? (
          <ul className="mt-4 grid md:grid-cols-3 gap-4">
            {copy.highlights.map((h, i) => (
              <li
                key={i}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 text-sm text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950"
              >
                {h}
              </li>
            ))}
          </ul>
        ) : null}

        {/* Mobile toggle */}
        <div className="mt-6 md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setView("photos")}
            className={`flex-1 rounded-full border px-4 py-2 text-sm ${
              view === "photos"
                ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            }`}
          >
            Photos
          </button>
          <button
            type="button"
            onClick={() => setView("specs")}
            className={`flex-1 rounded-full border px-4 py-2 text-sm ${
              view === "specs"
                ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            }`}
          >
            Specs
          </button>
        </div>

        {/* Mobile: Photos */}
        {view === "photos" && (
          <ul className="md:hidden mt-6 space-y-4">
            {items.map((f) => (
              <li
                key={f.key}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3"
              >
                <figure className="text-center">
                  {/* 프레임 안에서 중앙 정렬 + 원본 크기 유지 */}
                  <div className="w-full flex justify-center">
                    <NativeImage src={f.img} alt={f.title} />
                  </div>
                  <figcaption className="mt-3 text-left">
                    <p className="text-sm font-semibold">{f.title}</p>
                    {f.desc && (
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{f.desc}</p>
                    )}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}

        {/* Mobile: Specs */}
        {view === "specs" && (
          <div className="md:hidden mt-6 space-y-3">
            {copy.sections.map((sec) => (
              <details
                key={sec.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/90"
              >
                <summary className="cursor-pointer list-none p-4 font-semibold flex items-center justify-between">
                  {sec.title}
                  <span>▾</span>
                </summary>
                <div className="p-4 pt-0">
                  <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    {sec.bullets.map((b, i) => (
                      <li key={i} className="pl-4 relative">
                        <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                        <span className="block translate-x-1">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        )}

        {/* Desktop: 좌(스펙 카드), 우(원본 크기 갤러리) */}
        <div className="mt-10 hidden md:grid md:grid-cols-2 gap-8">
          {/* Left: specs cards */}
          <div className="space-y-6">
            {copy.sections.map((sec) => (
              <article
                key={sec.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950/90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-black/15 dark:hover:border-white/20"
              >
                <h3 className="text-lg font-semibold">{sec.title}</h3>
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
          </div>

          {/* Right: native-size photo gallery */}
          <ul className="grid grid-cols-2 gap-4 content-start">
            {items.map((f) => (
              <li
                key={f.key}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3"
              >
                <button
                  type="button"
                  onClick={() => {
                    try {
                      trackEvent("tech:image_click", { key: f.key });
                    } catch {}
                    // 필요 시 원본 새 탭 열기 (라이트박스 대신)
                    window.open(f.img, "_blank", "noopener,noreferrer");
                  }}
                  className="block w-full text-left"
                  aria-label={`Open ${f.title} original`}
                >
                  <figure className="text-center">
                    <div className="w-full flex justify-center">
                      <NativeImage src={f.img} alt={f.title} />
                    </div>
                    <figcaption className="mt-3">
                      <p className="text-sm font-semibold">{f.title}</p>
                      {f.desc && (
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                          {f.desc}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Footnote */}
        {copy.footnote ? (
          <p className="mt-8 text-xs text-zinc-500 dark:text-zinc-400">{copy.footnote}</p>
        ) : null}
      </div>
    </section>
  );
}

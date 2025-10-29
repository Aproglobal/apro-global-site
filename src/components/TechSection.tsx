// src/components/TechSection.tsx
import React, { useMemo, useState } from "react";
import type { TechCopy } from "../data/technology";
import { TECH_FEATURES, type TechItem } from "../data/tech_features";
import { trackEvent } from "../services/analytics";

type ViewMode = "gallery" | "list";

export default function TechSection({ copy }: { copy: TechCopy }) {
  const items = useMemo<TechItem[]>(() => TECH_FEATURES, []);
  const [view, setView] = useState<ViewMode>("gallery");
  const [active, setActive] = useState<TechItem | null>(null);

  const onOpen = (it: TechItem) => {
    setActive(it);
    try {
      trackEvent("tech_image_open", {
        section: "technology",
        key: it.key,
        title: it.title,
      });
    } catch {}
  };

  const onClose = () => setActive(null);

  return (
    <section id="technology" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Technology</h2>

        {/* Highlights: 모바일에만 상단 노출 (데스크톱은 좌측 sticky로 이동) */}
        {copy.highlights?.length ? (
          <ul className="mt-4 grid grid-cols-1 gap-4 md:hidden">
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

        {/* 모바일 토글 */}
        <div className="mt-6 md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setView("gallery")}
            className={`flex-1 rounded-full border px-4 py-2 text-sm ${
              view === "gallery"
                ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            }`}
          >
            Photos
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            className={`flex-1 rounded-full border px-4 py-2 text-sm ${
              view === "list"
                ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            }`}
          >
            Specs
          </button>
        </div>

        {/* 모바일: 갤러리 / 아코디언 */}
        <div className="md:hidden">
          {view === "gallery" ? (
            <ul className="mt-6 grid gap-4 content-start grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
              {items.map((f) => (
                <li
                  key={f.key}
                  className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                >
                  <button
                    type="button"
                    onClick={() => onOpen(f)}
                    className="block w-full text-left"
                    aria-label={`Open ${f.title} image`}
                  >
                    <div className="w-full flex justify-center max-w-[320px] mx-auto">
                      <img
                        src={f.img}
                        alt={f.title}
                        loading="lazy"
                        width={300}
                        height={300}
                        className="block"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold">{f.title}</h3>
                      {f.desc ? (
                        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{f.desc}</p>
                      ) : null}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 space-y-3">
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
        </div>

        {/* 데스크톱: 좌측 sticky 요약/스펙 + 우측 네이티브 300x300 갤러리 */}
        <div className="mt-10 hidden md:grid grid-cols-3 gap-6">
          {/* 좌측: sticky 요약 + 스펙 카드들 */}
          <aside className="col-span-1 sticky top-24 self-start space-y-4">
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
              <article
                key={sec.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950/90"
              >
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
          </aside>

          {/* 우측: 300x300 네이티브 이미지 갤러리 */}
          <div className="col-span-2">
            <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 content-start">
              {items.map((f) => (
                <li
                  key={f.key}
                  className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                >
                  <button
                    type="button"
                    onClick={() => onOpen(f)}
                    className="block w-full text-left"
                    aria-label={`Open ${f.title} image`}
                  >
                    {/* 300x300 원본을 프레임에도 그대로 적용 (업스케일/크롭 없음) */}
                    <div className="mx-auto w-[300px] h-[300px] flex items-center justify-center">
                      <img
                        src={f.img}
                        alt={f.title}
                        loading="lazy"
                        width={300}
                        height={300}
                        className="w-[300px] h-[300px] object-contain"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold">{f.title}</h3>
                      {f.desc ? (
                        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{f.desc}</p>
                      ) : null}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {copy.footnote ? (
          <p className="mt-8 text-xs text-zinc-500 dark:text-zinc-400">{copy.footnote}</p>
        ) : null}
      </div>

      {/* 라이트박스 */}
      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={onClose}
        >
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-2xl bg-black">
              <img src={active.img} alt={active.title} className="w-full h-auto" />
            </div>
            <div className="mt-3 flex items-start justify-between gap-4 text-white">
              <div>
                <h4 className="text-base font-semibold">{active.title}</h4>
                {active.desc ? <p className="text-sm text-zinc-300 mt-1">{active.desc}</p> : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/30 px-3 py-1 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

// src/components/TechSection.tsx
import React, { useMemo, useState } from "react";
import type { TechCopy } from "../data/technology";
import { TECH_FEATURES, type TechItem } from "../data/tech_features";
import { trackEvent } from "../services/analytics";

type ViewMode = "gallery" | "list";

/**
 * 목표
 * - 300x300 원본 이미지를 '그대로' 보여준다 (업스케일 금지, 선명도 유지)
 * - 모바일: Photos / Specs 전환 토글
 * - 데스크탑: 좌측 텍스트(스펙 카드), 우측 네이티브 갤러리(300x300)
 * - 단순 라이트박스 포함
 */
export default function TechSection({ copy }: { copy: TechCopy }) {
  // 원본 300x300 이미지 배열 (업스케일 금지)
  const items: TechItem[] = useMemo(() => TECH_FEATURES, []);

  const [view, setView] = useState<ViewMode>("gallery");
  const [active, setActive] = useState<TechItem | null>(null);

  const onOpen = (it: TechItem) => {
    setActive(it);
    try {
      trackEvent("tech:image_open", { key: it.key });
    } catch {}
  };
  const onClose = () => setActive(null);

  return (
    <section id="technology" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Technology</h2>

        {/* Highlights (텍스트) */}
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

        {/* 모바일 전환 토글 */}
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

        {/* 데스크톱: 좌(텍스트) / 우(네이티브 이미지 갤러리) */}
        <div className="mt-10 hidden md:grid md:grid-cols-2 gap-6">
          {/* 좌: 텍스트 카드 */}
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

          {/* 우: 300px 네이티브 이미지 갤러리 */}
          <ul className="grid gap-4 content-start grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
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

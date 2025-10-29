// src/components/TechSection.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { TechCopy } from "../data/technology";
import { TECH_FEATURES, type TechItem } from "../data/tech_features";
import { trackEvent } from "../services/analytics";

type ViewMode = "gallery" | "list";

function distribute<T>(arr: T[], groups: number): T[][] {
  if (groups <= 0) return [arr];
  const out: T[][] = [];
  const base = Math.floor(arr.length / groups);
  let rem = arr.length % groups;
  let idx = 0;
  for (let g = 0; g < groups; g++) {
    const take = base + (rem > 0 ? 1 : 0);
    rem = Math.max(0, rem - 1);
    out.push(arr.slice(idx, idx + take));
    idx += take;
  }
  return out;
}

export default function TechSection({ copy }: { copy: TechCopy }) {
  // 이미지(300x300) — 원본 크기 유지, 업스케일 금지
  const items = useMemo<TechItem[]>(() => TECH_FEATURES, []);
  const [view, setView] = useState<ViewMode>("gallery");
  const [activeLightbox, setActiveLightbox] = useState<TechItem | null>(null);

  const sections = copy.sections ?? [];
  const groups = useMemo(() => distribute(items, Math.max(1, sections.length || 1)), [items, sections.length]);

  // 인터섹션으로 우측 섹션과 좌측 sticky 카드 동기화
  const groupRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!groupRefs.current.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const i = Number((visible[0].target as HTMLElement).dataset.index || 0);
          setActiveIdx(i);
        }
      },
      { root: null, rootMargin: "0px 0px -55% 0px", threshold: [0.2, 0.4, 0.6] }
    );
    groupRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [groups.length]);

  const openLightbox = (it: TechItem) => {
    setActiveLightbox(it);
    try {
      trackEvent("tech:image_open", { key: it.key });
    } catch {}
  };

  const scrollToGroup = (i: number) => {
    const el = groupRefs.current[i];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="technology" className="py-24 md:py-28 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight -tracking-[.005em] leading-[1.1]">
          Technology
        </h2>

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

        {/* 모바일 탭: Photos / Specs */}
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
                    onClick={() => openLightbox(f)}
                    className="block w-full text-left"
                    aria-label={`Open ${f.title} image`}
                  >
                    <div className="w-full flex justify-center max-w-[320px] mx-auto">
                      <img src={f.img} alt={f.title} loading="lazy" width={300} height={300} className="block" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium">{f.title}</h3>
                      {f.desc ? <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{f.desc}</p> : null}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 space-y-3">
              {(copy.sections || []).map((sec) => (
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

        {/* 데스크톱: 좌(sticky) / 우(섹션별 그룹 갤러리) */}
        <div className="mt-12 hidden md:grid md:grid-cols-[340px,1fr] gap-8">
          {/* 좌: sticky 패널 (현재 섹션 동기화) */}
          <aside className="relative">
            <div className="sticky top-24">
              {/* 섹션 인덱스 네비 */}
              <nav className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
                <h3 className="text-sm font-semibold mb-3">Sections</h3>
                <ul className="space-y-1">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => scrollToGroup(i)}
                        aria-current={i === activeIdx ? "page" : undefined}
                        className={[
                          "w-full text-left px-3 py-2 rounded-md text-sm",
                          i === activeIdx
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : "hover:bg-zinc-100 dark:hover:bg-zinc-900",
                        ].join(" ")}
                      >
                        {s.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* 현재 섹션 상세 카드 */}
              {sections[activeIdx] ? (
                <div className="mt-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm">
                  <h4 className="text-base font-semibold">{sections[activeIdx].title}</h4>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    {sections[activeIdx].bullets.map((b, i) => (
                      <li key={i} className="pl-4 relative">
                        <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                        <span className="block translate-x-1">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </aside>

          {/* 우: 섹션별 그룹 갤러리 (300×300 네이티브) */}
          <div className="space-y-10">
            {groups.map((group, gi) => (
              <section
                key={`group-${gi}`}
                data-index={gi}
                ref={(el) => (groupRefs.current[gi] = el)}
                className="scroll-mt-24"
              >
                {/* 섹션 제목(우측에도 보이도록) */}
                {sections[gi] ? (
                  <h3 className="text-lg font-semibold mb-4">{sections[gi].title}</h3>
                ) : null}

                <ul className="grid gap-4 content-start grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
                  {group.map((f) => (
                    <li
                      key={f.key}
                      className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:-translate-y-0.5 transition-transform"
                    >
                      <button
                        type="button"
                        onClick={() => openLightbox(f)}
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
                          <h4 className="text-sm font-medium">{f.title}</h4>
                          {f.desc ? (
                            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{f.desc}</p>
                          ) : null}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        {copy.footnote ? (
          <p className="mt-8 text-xs text-zinc-500 dark:text-zinc-400">{copy.footnote}</p>
        ) : null}
      </div>

      {/* 라이트박스 */}
      {activeLightbox ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActiveLightbox(null)}
        >
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-2xl bg-black">
              <img src={activeLightbox.img} alt={activeLightbox.title} className="w-full h-auto" />
            </div>
            <div className="mt-3 flex items-start justify-between gap-4 text-white">
              <div>
                <h4 className="text-base font-semibold">{activeLightbox.title}</h4>
                {activeLightbox.desc ? <p className="text-sm text-zinc-300 mt-1">{activeLightbox.desc}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => setActiveLightbox(null)}
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

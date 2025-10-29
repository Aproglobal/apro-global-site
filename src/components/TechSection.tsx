// src/components/TechSection.tsx
import React, { useMemo, useState } from "react";
import type { TechCopy } from "../data/technology";
import { TECH_FEATURES, type TechItem } from "../data/tech_features";
import { trackEvent } from "../services/analytics";

type ViewMode = "gallery" | "list";

export default function TechSection({ copy }: { copy: TechCopy }) {
  // 이미지 목록 (필요하면 props로도 대체 가능하게 분리)
  const items: TechItem[] = useMemo(() => TECH_FEATURES, []);
// src/components/TechSection.tsx
import React, { useMemo, useState } from "react";
import type { TechCopy } from "../data/technology";
import { TECH_FEATURES } from "../data/tech_features";
import { trackEvent } from "../services/analytics";

// 선택된 보기 모드
type ViewMode = "gallery" | "specs";

// TechItem 확장: groupId(섹션 연결), oneLiner(갤러리용 한 줄 설명) 지원
type FeatureEx = (typeof TECH_FEATURES)[number] & {
  groupId?: string;   // copy.sections[i].id 와 매칭
  oneLiner?: string;  // 갤러리 카드 짧은 문구 (없으면 desc 사용)
};

export default function TechSection({ copy }: { copy: TechCopy }) {
  const items: FeatureEx[] = useMemo(() => TECH_FEATURES as FeatureEx[], []);
  const sections = copy.sections ?? [];

  // 이미지가 섹션과 연결되어 있는지 감지
  const hasGrouping = useMemo(() => items.some((x) => !!x.groupId), [items]);

  // 카테고리(섹션) 칩 목록
  const categories = useMemo(
    () => [{ id: "all", title: "All" }, ...sections.map((s) => ({ id: s.id, title: s.title }))],
    [sections]
  );

  const [view, setView] = useState<ViewMode>("gallery");
  const [activeCat, setActiveCat] = useState<string>("all");
  const [lightbox, setLightbox] = useState<FeatureEx | null>(null);

  const filtered = useMemo(() => {
    if (!hasGrouping || activeCat === "all") return items;
    const list = items.filter((x) => x.groupId === activeCat);
    // 만약 매칭 결과가 0이면 사용자 경험상 전체로 폴백
    return list.length ? list : items;
  }, [items, hasGrouping, activeCat]);

  // 섹션별 연결된 이미지(있으면 우선 보여주기)
  const sectionToItems = useMemo(() => {
    const map = new Map<string, FeatureEx[]>();
    sections.forEach((s) => map.set(s.id, []));
    items.forEach((it) => {
      if (it.groupId && map.has(it.groupId)) {
        map.get(it.groupId)!.push(it);
      }
    });
    return map;
  }, [items, sections]);

  const openLightbox = (it: FeatureEx) => {
    setLightbox(it);
    try { trackEvent("tech:image_open", { key: it.key }); } catch {}
  };

  return (
    <section id="technology" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        {/* 헤더 */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Technology</h2>

          {/* 모바일 전환 토글 */}
          <div className="mt-2 md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setView("gallery")}
              className={`flex-1 rounded-full border px-4 py-2 text-sm ${view === "gallery"
                ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"}`}
            >
              Photos
            </button>
            <button
              type="button"
              onClick={() => setView("specs")}
              className={`flex-1 rounded-full border px-4 py-2 text-sm ${view === "specs"
                ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"}`}
            >
              Specs
            </button>
          </div>
        </div>

        {/* 하이라이트(요약 배너) */}
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

        {/* 카테고리 칩 (그룹 데이터 있을 때만 노출) */}
        {hasGrouping && (
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCat(c.id)}
                className={`rounded-full border px-3 py-1.5 text-sm ${
                  activeCat === c.id
                    ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        )}

        {/* ---------- 모바일: 뷰 전환 ---------- */}
        <div className="md:hidden">
          {view === "gallery" ? (
            // 모바일 갤러리
            <ul className="mt-6 grid grid-cols-2 gap-4">
              {filtered.map((f) => (
                <li key={f.key} className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                  <button
                    type="button"
                    onClick={() => openLightbox(f)}
                    className="block w-full text-left"
                    aria-label={`Open ${f.title} image`}
                  >
                    <div className="aspect-square overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                      <img
                        src={f.img}
                        alt={f.title}
                        loading="lazy"
                        width={300}
                        height={300}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold">{f.title}</h3>
                      {(f.oneLiner || f.desc) && (
                        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                          {f.oneLiner ?? f.desc}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            // 모바일 스펙 (섹션 아코디언)
            <div className="mt-6 space-y-3">
              {sections.map((sec) => (
                <details key={sec.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/90">
                  <summary className="cursor-pointer list-none p-4 font-semibold flex items-center justify-between">
                    {sec.title}
                    <span>▾</span>
                  </summary>

                  {/* 섹션 연결 이미지가 있으면 먼저 1~2장 썸네일로 먼저 제시 (증거 → 설명 순서) */}
                  {hasGrouping && (sectionToItems.get(sec.id)?.length ?? 0) > 0 && (
                    <div className="px-4 pt-0 pb-2">
                      <ul className="mt-2 grid grid-cols-2 gap-2">
                        {sectionToItems.get(sec.id)!.slice(0, 2).map((f) => (
                          <li key={f.key} className="overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-900">
                            <button type="button" onClick={() => openLightbox(f)} className="block w-full">
                              <img src={f.img} alt={f.title} loading="lazy" className="w-full h-28 object-cover" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

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

        {/* ---------- 데스크톱: 좌 텍스트(증명+설명) / 우 갤러리 ---------- */}
        <div className="mt-10 hidden md:grid md:grid-cols-2 gap-6">
          {/* 좌측: 섹션 카드 (증거 → 설명 순) */}
          <div className="space-y-6">
            {sections.map((sec) => {
              const linked = hasGrouping ? (sectionToItems.get(sec.id) ?? []).slice(0, 1) : [];
              return (
                <article
                  key={sec.id}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950/90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-black/15 dark:hover:border-white/20"
                >
                  {/* 1) 증거(사진) */}
                  {linked.length > 0 && (
                    <button
                      type="button"
                      onClick={() => openLightbox(linked[0])}
                      className="block w-full overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-900"
                      aria-label={`Open ${linked[0].title} image`}
                    >
                      <img src={linked[0].img} alt={linked[0].title} loading="lazy" className="w-full h-44 object-cover" />
                    </button>
                  )}

                  {/* 2) 제목 + 한 줄 요약 */}
                  <h3 className="mt-4 text-lg font-semibold">{sec.title}</h3>
                  {linked[0]?.oneLiner && (
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{linked[0].oneLiner}</p>
                  )}

                  {/* 3) 설명(불릿) */}
                  <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    {sec.bullets.map((b, i) => (
                      <li key={i} className="pl-4 relative">
                        <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                        <span className="block translate-x-1">{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          {/* 우측: 이미지 갤러리 */}
          <div>
            <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 content-start">
              {filtered.map((f) => (
                <li key={f.key} className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                  <button
                    type="button"
                    onClick={() => openLightbox(f)}
                    className="block w-full text-left"
                    aria-label={`Open ${f.title} image`}
                  >
                    <div className="aspect-square overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                      <img
                        src={f.img}
                        alt={f.title}
                        loading="lazy"
                        width={300}
                        height={300}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold">{f.title}</h3>
                      {(f.oneLiner || f.desc) && (
                        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                          {f.oneLiner ?? f.desc}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 각주 */}
        {copy.footnote ? (
          <p className="mt-8 text-xs text-zinc-500 dark:text-zinc-400">{copy.footnote}</p>
        ) : null}
      </div>

      {/* 라이트박스 */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-2xl bg-black">
              <img src={lightbox.img} alt={lightbox.title} className="w-full h-auto" />
            </div>
            <div className="mt-3 flex items-start justify-between gap-4 text-white">
              <div>
                <h4 className="text-base font-semibold">{lightbox.title}</h4>
                {(lightbox.oneLiner || lightbox.desc) && (
                  <p className="text-sm mt-1 text-zinc-300">{lightbox.oneLiner ?? lightbox.desc}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="rounded-full border border-white/30 px-3 py-1 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

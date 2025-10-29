import React, { useEffect, useMemo, useState } from "react";
import type { TechCopy } from "../data/technology";
import { TECH_FEATURES, type TechItem } from "../data/tech_features";
import { trackEvent } from "../services/analytics";

type ViewMode = "gallery" | "list";

type Block =
  | { kind: "image"; item: TechItem }
  | {
      kind: "text";
      sec: {
        id: string;
        title: string;
        bullets: string[];
      };
    };

export default function TechSection({ copy }: { copy: TechCopy }) {
  // 300x300 원본 이미지에 최적화: 업스케일 금지, 중앙정렬, 카드 폭 가이드(최소 320px)
  const items = useMemo<TechItem[]>(() => TECH_FEATURES, []);
  const sections = useMemo(() => copy?.sections ?? [], [copy]);

  // 데스크톱 전용: 텍스트 카드와 이미지 카드를 하나의 그리드에 인터리브 배치
  const blocks = useMemo<Block[]>(() => {
    const out: Block[] = [];
    const queue = [...sections];

    // 첫 단에 텍스트 1개 넣어 스타트(있다면)
    if (queue.length) out.push({ kind: "text", sec: queue.shift()! });

    let imgCount = 0;
    for (const it of items) {
      out.push({ kind: "image", item: it });
      imgCount++;
      // 이미지 4장마다 텍스트 1개 삽입(남아있다면)
      if (imgCount % 4 === 0 && queue.length) {
        out.push({ kind: "text", sec: queue.shift()! });
      }
    }
    // 남은 텍스트 마저 삽입
    while (queue.length) out.push({ kind: "text", sec: queue.shift()! });
    return out;
  }, [items, sections]);

  const [view, setView] = useState<ViewMode>("gallery");
  const [active, setActive] = useState<TechItem | null>(null);

  const onOpen = (it: TechItem) => {
    setActive(it);
    try {
      trackEvent("tech:image_open", { key: it.key });
    } catch {}
  };
  const onClose = () => setActive(null);

  // ESC 닫기
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

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

        {/* 모바일 전환 토글 (Photos / Specs) */}
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
                    {/* 원본 300×300 유지, 중앙 정렬 */}
                    <div className="w-full flex justify-center max-w-[320px] mx-auto">
                      <img src={f.img} alt={f.title} loading="lazy" width={300} height={300} className="block" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold">{f.title}</h3>
                      {f.desc ? <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{f.desc}</p> : null}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 space-y-3">
              {sections.map((sec) => (
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

        {/* 데스크톱: 유니파이드 카드 그리드 (텍스트/이미지 혼합, 빈 공간 없음) */}
        <div className="mt-10 hidden md:block">
          <ul className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
            {blocks.map((blk, idx) =>
              blk.kind === "image" ? (
                <li
                  key={`img-${blk.item.key}-${idx}`}
                  className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                >
                  <button
                    type="button"
                    onClick={() => onOpen(blk.item)}
                    className="block w-full text-left"
                    aria-label={`Open ${blk.item.title} image`}
                  >
                    <div className="w-full flex justify-center max-w-[320px] mx-auto">
                      {/* 300×300 원본 그대로, 업스케일 금지 */}
                      <img
                        src={blk.item.img}
                        alt={blk.item.title}
                        loading="lazy"
                        width={300}
                        height={300}
                        className="block"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold">{blk.item.title}</h3>
                      {blk.item.desc ? (
                        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{blk.item.desc}</p>
                      ) : null}
                    </div>
                  </button>
                </li>
              ) : (
                <li
                  key={`txt-${blk.sec.id}-${idx}`}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950/90"
                >
                  <h3 className="text-lg font-semibold">{blk.sec.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    {blk.sec.bullets.map((b, i) => (
                      <li key={i} className="pl-4 relative">
                        <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                        <span className="block translate-x-1">{b}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            )}
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

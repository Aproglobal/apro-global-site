// src/components/ProductionTimeline.tsx
import React from "react";
import type { Step } from "../data/timeline";

type Props = {
  steps: Step[];
  title?: string;
  note?: string;
};

export default function ProductionTimeline({
  steps,
  title = "Production & Delivery Timeline",
  note = "※ 국내 납품 기준이며, 해외 납품은 상이할 수 있습니다.",
}: Props) {
  return (
    <section id="timeline" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          {title}
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{note}</p>

        {/* 모바일: 수직 카드 리스트 */}
        <ol className="mt-8 space-y-4 md:hidden">
          {steps.map((s) => (
            <li
              key={s.day}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 px-3 py-1 text-xs font-medium">
                  {s.day}일차
                </span>
                <h3 className="text-sm font-semibold">{s.title}</h3>
              </div>
              {s.note ? (
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">{s.note}</p>
              ) : null}
            </li>
          ))}
        </ol>

        {/* 데스크톱: 수평 타임라인 카드 그리드 */}
        <div className="mt-10 hidden md:block">
          <div className="relative">
            {/* 중앙 축 */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-zinc-200 dark:bg-zinc-800" />
            <div className="grid grid-cols-4 gap-6">
              {steps.map((s, idx) => (
                <div key={s.day} className="relative">
                  {/* 점 */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-black dark:bg-white ring-4 ring-white dark:ring-black" />
                  {/* 카드 */}
                  <div
                    className={[
                      "rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5",
                      // 위/아래 교차 배치
                      idx % 2 === 0 ? "mb-12" : "mt-12",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 px-3 py-1 text-xs font-medium">
                        {s.day}일차
                      </span>
                      <h3 className="text-sm font-semibold">{s.title}</h3>
                    </div>
                    {s.note ? (
                      <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">{s.note}</p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

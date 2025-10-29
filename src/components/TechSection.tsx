// src/components/TechSection.tsx
import React, { useEffect } from 'react';
import { trackEvent } from '../services/analytics';
import { TECH_FEATURES, type TechItem } from '../data/tech_features';

type TechCopy = {
  headline: string;
  subhead?: string;
};

type Props = {
  copy?: TechCopy;
  /** 필요 시 외부에서 다른 리스트를 주입할 수 있도록 열어둠 */
  items?: TechItem[];
};

export default function TechSection({ copy, items: itemsProp }: Props) {
  useEffect(() => {
    trackEvent('technology_view');
  }, []);

  // 기본은 /data/tech_features.ts 의 리스트 사용
  const items: TechItem[] = itemsProp ?? TECH_FEATURES;

  return (
    <section
      id="technology"
      className="py-16 bg-white text-black border-t border-zinc-200 dark:bg-black dark:text-white dark:border-zinc-800"
    >
      <div className="max-w-6xl mx-auto px-5">
        <header className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {copy?.headline ?? 'Technology'}
          </h2>
          {copy?.subhead ? (
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">
              {copy.subhead}
            </p>
          ) : null}
        </header>

        {/* 그리드: 모바일 2열, 데스크탑 4열 */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((it) => (
            <article
              key={it.key}
              className="group rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-950/90 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* 이미지 래퍼: 1:1 비율, 저해상도 보정용 배경 */}
              <div className="relative aspect-square bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800">
                <img
                  src={it.img}
                  alt={it.title}
                  className="absolute inset-0 w-full h-full object-cover md:object-contain"
                  loading="lazy"
                  decoding="async"
                />
                {/* 살짝 그라데이션 오버레이로 텍스트 가독성 향상 */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent dark:from-black/35" />
              </div>

              <div className="p-3 md:p-4">
                <h3 className="text-sm md:text-base font-semibold leading-snug">
                  {it.title}
                </h3>
                {it.desc ? (
                  <p className="mt-1 text-xs md:text-sm text-zinc-600 dark:text-zinc-300">
                    {it.desc}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

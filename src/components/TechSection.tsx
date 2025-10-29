// src/components/TechSection.tsx
import React, { useEffect, useMemo } from "react";
import { trackEvent } from "../services/analytics";
import TechFeatureGrid from "./TechFeatureGrid";
import { TECH_FEATURES } from "../data/tech_features";

// 페이지에서 넘겨주는 카피 구조는 유연하게(any) 받아서 타입 충돌을 피함
type TechCopy = {
  headline?: string;
  sub?: string;
  columns?: Array<{ title: string; desc?: string }>;
} | any;

export default function TechSection({ copy }: { copy?: TechCopy }) {
  useEffect(() => {
    trackEvent("technology_view");
  }, []);

  // 사용자가 실제 파일을 모두 .jpg로 준비했다고 했으므로
  // 데이터에 .png/.webp가 들어와도 여기서 .jpg로 변환해서 사용
  const jpgFeatures = useMemo(() => {
    return TECH_FEATURES.map((f) => {
      const img = typeof f.img === "string"
        ? f.img.replace(/\.(png|webp)$/i, ".jpg")
        : f.img;
      return { ...f, img };
    });
  }, []);

  const headline = copy?.headline ?? "Technology";
  const sub = copy?.sub ?? "Performance, control, comfort — engineered for modern courses.";

  // columns가 있으면 2~3열 설명 블록을 보여주고, 없어도 무방
  const columns: Array<{ title: string; desc?: string }> = Array.isArray(copy?.columns)
    ? copy.columns
    : [];

  return (
    <section
      id="technology"
      className="py-20 bg-white text-black border-t border-zinc-200 dark:bg-black dark:text-white dark:border-zinc-800"
      aria-labelledby="technology-title"
    >
      <div className="max-w-6xl mx-auto px-5">
        <header className="max-w-3xl">
          <h2
            id="technology-title"
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            {headline}
          </h2>
          <p className="mt-3 text-zinc-700 dark:text-zinc-300">{sub}</p>
        </header>

        {/* 선택형: 텍스트 설명 컬럼 */}
        {columns.length > 0 && (
          <div className="mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {columns.map((c: { title: string; desc?: string }, i: number) => (
              <article
                key={i}
                className="
                  rounded-2xl border border-zinc-200 dark:border-zinc-800
                  bg-white dark:bg-zinc-950/90
                  p-5 md:p-6 transition-all duration-200
                  hover:shadow-md hover:-translate-y-0.5
                  focus-within:ring-2 focus-within:ring-black/20 dark:focus-within:ring-white/20
                "
              >
                <h3 className="text-lg font-semibold">{c.title}</h3>
                {c.desc && (
                  <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{c.desc}</p>
                )}
              </article>
            ))}
          </div>
        )}

        {/* 피처 그리드: 현재 이미지는 300×300 저해상도이므로 lowRes 모드 ON */}
        <div className="mt-10">
          <TechFeatureGrid items={jpgFeatures} lowRes thumbMaxPx={180} />
        </div>

        <div className="mt-8">
          <a
            href="/brochure.pdf"
            onClick={() => trackEvent("brochure_download", { file: "/brochure.pdf", where: "technology" })}
            className="inline-block px-5 py-3 rounded-full border border-black/30 dark:border-white/40"
          >
            Download brochure (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}

import React, { useMemo, useState } from "react";
import type { TechCopy } from "../data/technology";
import { TECH_FEATURES, type TechItem } from "../data/tech_features";
import { trackEvent } from "../services/analytics";

type ViewMode = "gallery" | "list";

type SplitBlock = {
  key: string;           // TECH_FEATURES.key 참조
  eyebrow?: string;
  headline: string;
  body?: string;
  align?: "left" | "right";
};

export default function TechSection({ copy }: { copy: TechCopy }) {
  // 전체 피처 인덱스
  const items = useMemo(() => TECH_FEATURES, []);
  const byKey = useMemo(() => new Map(items.map((i) => [i.key, i])), [items]);

  // 1) 서사 축: 좌우 분할 모듈(이미지+카피 결합)
  const splits: SplitBlock[] = [
    {
      key: "motor_46kw",
      eyebrow: "Powertrain",
      headline: "4.6 kW AC Motor — 즉각적인 토크, 부드러운 가속",
      body:
        "장거리 페어웨이와 업힐에서도 일정한 속도를 유지합니다. 조용하고 효율적인 AC 구동으로 라운드 전체가 더 쾌적해집니다.",
      align: "left",
    },
    {
      key: "independent_suspension",
      eyebrow: "Chassis",
      headline: "독립 현가 + MacPherson — 흔들림을 제어하는 승차감",
      body:
        "잔진동과 요철을 줄여 플레이 집중도를 높입니다. 코스 구배가 심한 환경에서도 차체 안정성을 확보합니다.",
      align: "right",
    },
    {
      key: "hydraulic_disc",
      eyebrow: "Safety",
      headline: "4륜 유압 디스크 브레이크 — 젖은 노면에서도 자신감",
      body:
        "일관된 제동력과 페이드 저감 설정으로 안전한 정차를 구현합니다. 장마철·새벽 이슬 노면에서도 차분합니다.",
      align: "left",
    },
  ];

  // 2) 시그니처 그리드: 스플릿에 쓴 키 제외한 나머지 대표 기능
  const usedKeys = new Set(splits.map((s) => s.key));
  const signature = items.filter((i) => !usedKeys.has(i.key));

  // 3) 라이트박스
  const [active, setActive] = useState<TechItem | null>(null);
  const open = (it: TechItem) => {
    setActive(it);
    try {
      trackEvent("tech:image_open", { key: it.key });
    } catch {}
  };
  const close = () => setActive(null);

  // 4) 모바일 전환(사진/스펙)
  const [view, setView] = useState<ViewMode>("gallery");

  // 5) 운영 가치 콜아웃: 기존 copy.sections의 bullets를 납작하게 모아 미니 배지로
  const opsPills = useMemo(() => {
    const pills: string[] = [];
    for (const sec of copy.sections || []) {
      for (const b of sec.bullets || []) {
        if (pills.length < 18) pills.push(b);
      }
    }
    return pills;
  }, [copy.sections]);

  return (
    <section id="technology" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        {/* 헤더 */}
        <header>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Technology</h2>

          {copy?.highlights?.length ? (
            <ul className="mt-3 grid gap-2 md:grid-cols-3">
              {copy.highlights.map((h, i) => (
                <li
                  key={i}
                  className="text-sm rounded-full border border-zinc-200 dark:border-zinc-800 px-3 py-2 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300"
                >
                  {h}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        {/* A. Split Blocks (이미지-카피 결합) */}
        <div className="mt-10 space-y-10">
          {splits.map((s, idx) => {
            const f = byKey.get(s.key);
            if (!f) return null;
            const media = (
              <button
                type="button"
                onClick={() => open(f)}
                className="group block w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
                aria-label={`Open ${f.title} image`}
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={f.img}
                    alt={f.title}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </button>
            );

            const copyBlock = (
              <div className="p-1">
                {s.eyebrow && (
                  <div className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    {s.eyebrow}
                  </div>
                )}
                <h3 className="mt-2 text-xl md:text-2xl font-semibold">{s.headline}</h3>
                {s.body && (
                  <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{s.body}</p>
                )}

                {/* 관련 한줄 설명(있으면) */}
                {(f as any).oneLiner && (
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    {(f as any).oneLiner}
                  </p>
                )}
              </div>
            );

            return (
              <div
                key={s.key}
                className={`grid gap-6 md:grid-cols-2 items-center ${
                  s.align === "right" ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {media}
                {copyBlock}
              </div>
            );
          })}
        </div>

        {/* B. 모바일 전환 토글 */}
        <div className="mt-12 md:hidden flex items-center gap-2">
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

        {/* C-1. 모바일: 사진 그리드 */}
        {view === "gallery" && (
          <ul className="mt-6 grid grid-cols-2 gap-4 md:hidden">
            {signature.map((f) => (
              <li
                key={f.key}
                className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
              >
                <button
                  type="button"
                  onClick={() => open(f)}
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
                    <h4 className="text-sm font-semibold">{f.title}</h4>
                    {f.desc && (
                      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{f.desc}</p>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* C-2. 데스크톱: Signature Innovations */}
        <div className="mt-12 hidden md:block">
          <h3 className="text-lg font-semibold">Signature Innovations</h3>
          <ul className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {signature.map((f) => (
              <li
                key={f.key}
                className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
              >
                <button
                  type="button"
                  onClick={() => open(f)}
                  className="block w-full text-left"
                  aria-label={`Open ${f.title} image`}
                >
                  <div className="aspect-square overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                    <img
                      src={f.img}
                      alt={f.title}
                      loading="lazy"
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-semibold">{f.title}</h4>
                    {f.desc && (
                      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{f.desc}</p>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* D. 운영 가치 콜아웃(기존 bullets 재활용) */}
        {opsPills.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold">Operational Advantages</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {opsPills.map((t, i) => (
                <li
                  key={i}
                  className="text-xs rounded-full border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 각주 */}
        {copy?.footnote ? (
          <p className="mt-8 text-xs text-zinc-500 dark:text-zinc-400">{copy.footnote}</p>
        ) : null}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={close}
        >
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-2xl bg-black">
              <img src={active.img} alt={active.title} className="w-full h-auto" />
            </div>
            <div className="mt-3 flex items-start justify-between gap-4 text-white">
              <div>
                <h4 className="text-base font-semibold">{active.title}</h4>
                {active.desc && <p className="text-sm text-zinc-300 mt-1">{active.desc}</p>}
              </div>
              <button
                type="button"
                onClick={close}
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

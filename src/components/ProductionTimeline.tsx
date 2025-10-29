// src/components/ProductionTimeline.tsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import type { TimelineStep } from "../data/timeline";

type Props = {
  steps: TimelineStep[];
  startDate?: Date;
  currentIndex?: number;   // 진행중 단계 강조 (선택)
  title?: string;
  subtitle?: string;
};

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + (days || 0));
  return d;
}
function fmt(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

export default function ProductionTimeline({
  steps,
  startDate = new Date(),
  currentIndex,
  title = "Production Timeline",
  subtitle = "From order to handover — clear steps, clear timelines.",
}: Props) {
  // 누적 ETA 계산
  const calc = useMemo(() => {
    let acc = 0;
    const items = steps.map((s, index) => {
      const days = s.days ?? 0;
      const etaStart = addDays(startDate, acc);
      const etaEnd = addDays(startDate, acc + days);
      acc += days;
      return { ...s, index, etaStart, etaEnd, totalDaysToHere: acc };
    });
    return { items, totalDays: acc };
  }, [steps, startDate]);

  // 데스크탑 가로 레일 스크롤
  const railRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const cardFull = 340; // 카드폭(내용) + 여백 감안 스크롤 단위
  const gap = 20;       // tailwind gap-5 ~ 20px 가정

  const syncArrows = () => {
    const el = railRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 0);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const handler = () => syncArrows();
    handler();
    el.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      el.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  const scrollByCards = (dir: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: (cardFull + gap) * dir, behavior: "smooth" });
  };

  const progress =
    typeof currentIndex === "number" && calc.items.length > 1
      ? Math.min(1, Math.max(0, currentIndex / (calc.items.length - 1)))
      : 0;

  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const roleBadge = (role?: TimelineStep["role"]) => {
    const m: Record<string, string> = {
      APRO: "bg-zinc-900 text-white dark:bg-white dark:text-black",
      Customer: "bg-emerald-600 text-white",
      Logistics: "bg-amber-600 text-black",
      QC: "bg-indigo-600 text-white",
    };
    return role ? `inline-flex items-center px-2 py-0.5 rounded-full text-[11px] ${m[role] ?? "bg-zinc-800 text-white"}` : "";
  };

  return (
    <section id="production-timeline" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        {/* 헤더 */}
        <header className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </header>

        {/* 상단 요약 & 프로그레스 바 */}
        <div className="mt-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="font-semibold">Start</span>
            <span>{fmt(startDate)}</span>
            <span className="opacity-40">•</span>
            <span className="font-semibold">Lead time</span>
            <span>{calc.totalDays} days</span>
            <span className="opacity-40">•</span>
            <span className="font-semibold">Estimated delivery</span>
            <span>{fmt(addDays(startDate, calc.totalDays))}</span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-black dark:bg-white transition-[width] duration-500"
              style={{ width: `${progress * 100}%` }}
              aria-hidden
            />
          </div>
        </div>

        {/* 모바일: 수직 스텝퍼 */}
        <ol className="mt-8 space-y-6 md:hidden">
          {calc.items.map((s) => {
            const active = typeof currentIndex === "number" && s.index === currentIndex;
            return (
              <li key={s.id} className="relative pl-6">
                <span className={`absolute left-0 top-1.5 h-3 w-3 rounded-full ${active ? "bg-black dark:bg-white" : "bg-zinc-300 dark:bg-zinc-700"}`} />
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950/90">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold">{s.title}</h3>
                    {s.role && <span className={roleBadge(s.role)}>{s.role}</span>}
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {(s.days ?? 0)} days · {fmt(s.etaStart)} → {fmt(s.etaEnd)}
                  </p>

                  {s.changeWindow && (
                    <p className="mt-2 text-xs">
                      <span className="font-semibold">Change window: </span>
                      {s.changeWindow}
                    </p>
                  )}

                  {s.deliverables?.length ? (
                    <ul className="mt-2 text-sm list-disc pl-5 space-y-1">
                      {s.deliverables.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  ) : null}

                  {/* 원본 해상도 존중: 300x300 고정 박스 */}
                  {s.asset?.src && (
                    <button
                      type="button"
                      onClick={() => setLightbox({ src: s.asset!.src, alt: s.asset!.alt })}
                      className="mt-3 block w-full"
                      aria-label={`Open image for ${s.title}`}
                    >
                      <div className="mx-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-2 w-[320px] max-w-full">
                        <div className="mx-auto w-[300px] h-[300px] overflow-hidden">
                          <img
                            src={s.asset.src}
                            alt={s.asset.alt}
                            width={300}
                            height={300}
                            className="w-[300px] h-[300px] object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {/* 데스크탑: 프리미엄 가로 타임라인 (스크롤 스냅) */}
        <div className="mt-10 relative hidden md:block">
          {/* 좌/우 네비게이션 */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
            <div className="pl-2">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                disabled={!canPrev}
                className={`pointer-events-auto rounded-full border px-3 py-1.5 text-sm backdrop-blur
                  ${canPrev ? "bg-white/80 dark:bg-black/60 border-zinc-300 dark:border-zinc-700" : "opacity-30 cursor-not-allowed border-zinc-200 dark:border-zinc-800"}`}
                aria-label="Scroll left"
              >
                ←
              </button>
            </div>
            <div className="pr-2">
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                disabled={!canNext}
                className={`pointer-events-auto rounded-full border px-3 py-1.5 text-sm backdrop-blur
                  ${canNext ? "bg-white/80 dark:bg-black/60 border-zinc-300 dark:border-zinc-700" : "opacity-30 cursor-not-allowed border-zinc-200 dark:border-zinc-800"}`}
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>

          {/* 레일 */}
          <div
            ref={railRef}
            onScroll={syncArrows}
            className="overflow-x-auto overscroll-x-contain scroll-smooth py-2"
          >
            <div className="flex gap-5 min-w-full scroll-snap-x mandatory px-1">
              {calc.items.map((s) => {
                const active = typeof currentIndex === "number" && s.index === currentIndex;
                return (
                  <article
                    key={s.id}
                    className={`scroll-snap-align-start w-[340px] flex-shrink-0 rounded-2xl border p-4 bg-white dark:bg-zinc-950/90
                      transition-all ${active ? "border-black dark:border-white shadow-lg" : "border-zinc-200 dark:border-zinc-800"}`}
                    style={{ scrollSnapAlign: "start" }}
                  >
                    {/* 이미지: 300x300 고정(원본 1:1) */}
                    {s.asset?.src ? (
                      <button
                        type="button"
                        onClick={() => setLightbox({ src: s.asset!.src, alt: s.asset!.alt })}
                        className="block"
                        aria-label={`Open image for ${s.title}`}
                      >
                        <div className="mx-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-2">
                          <div className="mx-auto w-[300px] h-[300px] overflow-hidden">
                            <img
                              src={s.asset.src}
                              alt={s.asset.alt}
                              width={300}
                              height={300}
                              className="w-[300px] h-[300px] object-contain"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </button>
                    ) : (
                      <div className="mx-auto w-[300px] h-[300px] rounded-xl border border-dashed grid place-items-center text-xs text-zinc-500">
                        No image
                      </div>
                    )}

                    {/* 텍스트 */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-semibold">{s.title}</h3>
                        {s.role && <span className={roleBadge(s.role)}>{s.role}</span>}
                      </div>
                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        {(s.days ?? 0)} days · {fmt(s.etaStart)} → {fmt(s.etaEnd)}
                      </p>

                      {s.changeWindow && (
                        <p className="mt-2 text-sm">
                          <span className="font-semibold">Change window: </span>
                          {s.changeWindow}
                        </p>
                      )}

                      {s.deliverables?.length ? (
                        <ul className="mt-2 text-sm list-disc pl-5 space-y-1">
                          {s.deliverables.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* 고객 안심 포인트(요약) */}
        <div className="mt-12 grid md:grid-cols-3 gap-4 text-sm">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
            <h4 className="font-semibold">You’ll receive</h4>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              Road test report, final QC checklist, packing list, on-site training.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
            <h4 className="font-semibold">Change windows</h4>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              Color before paint, seat trim until assembly D-2, branding before shipping.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
            <h4 className="font-semibold">Delivery & handover</h4>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              We coordinate delivery slots and commission carts on-site.
            </p>
          </div>
        </div>
      </div>

      {/* 라이트박스 (원본 크기 존중) */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-2xl bg-black">
              <img src={lightbox.src} alt={lightbox.alt} className="w-full h-[75vh] object-contain" />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-zinc-300">{lightbox.alt}</p>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="rounded-full border border-white/30 px-3 py-1 text-sm text-white"
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

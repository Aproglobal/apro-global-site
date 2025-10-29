import React, { useMemo } from "react";
import { trackEvent } from "../services/analytics";

export type FeatureItem = {
  id: string;
  title: string;
  img: string;      // e.g. "/features/01_motor.webp"
  note?: string;
  category?: "Performance" | "Control" | "Comfort" | "Service" | "Protection" | "Storage";
};

type Props = {
  items: FeatureItem[];
  /** 저해상도(≈300×300) 이미지일 때 켜면, 중앙 작은 썸네일 + 블러 백그라운드로 예쁘게 보정 */
  lowRes?: boolean;
  /** 중앙 썸네일 최대 크기(px). 기본 180 */
  thumbMaxPx?: number;
};

export default function TechFeatureGrid({ items, lowRes = false, thumbMaxPx = 180 }: Props) {
  // 카테고리 정렬(성능→제동/제어→승차감→정비→보호→수납)
  const display = useMemo(() => {
    const order = ["Performance","Control","Comfort","Service","Protection","Storage"];
    return [...items].sort(
      (a, b) => order.indexOf(a.category || "Performance") - order.indexOf(b.category || "Performance")
    );
  }, [items]);

  return (
    <section aria-labelledby="tech-feature-grid-title" className="py-10">
      <h3 id="tech-feature-grid-title" className="sr-only">Technology Features</h3>

      <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {display.map((f, i) => (
          <li
            key={f.id}
            className="group relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
          >
            {/* 카드 비율 고정 */}
            <div className="relative aspect-square">
              {/* 1) 배경 레이어: 같은 이미지를 확대+블러로 깔아서 저해상도 보정 */}
              <img
                src={f.img}
                alt=""
                aria-hidden="true"
                className={[
                  "absolute inset-0 w-full h-full object-cover",
                  lowRes ? "scale-125 blur-xl opacity-50" : "opacity-0",
                  "transition-opacity"
                ].join(" ")}
                loading={i > 3 ? "lazy" : "eager"}
                decoding="async"
              />

              {/* 2) 콘텐츠 레이어 */}
              {lowRes ? (
                // 저해상도 모드: 중앙 작은 썸네일을 또렷하게 배치
                <div className="absolute inset-0 grid place-items-center p-3 sm:p-4">
                  <img
                    src={f.img}
                    alt={f.title}
                    className="relative z-10 object-contain drop-shadow"
                    style={{ maxWidth: thumbMaxPx, maxHeight: thumbMaxPx }}
                    loading={i > 3 ? "lazy" : "eager"}
                    decoding="async"
                    onMouseEnter={() => trackEvent("tech_feature_hover", { id: f.id })}
                    onFocus={() => trackEvent("tech_feature_hover", { id: f.id })}
                  />
                </div>
              ) : (
                // 고해상도 모드: 이미지 풀프레임
                <img
                  src={f.img}
                  alt={f.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={i > 3 ? "lazy" : "eager"}
                  decoding="async"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  onMouseEnter={() => trackEvent("tech_feature_hover", { id: f.id })}
                  onFocus={() => trackEvent("tech_feature_hover", { id: f.id })}
                />
              )}

              {/* 텍스트 오버레이 (라이트/다크 모두 가독성) */}
              <div
                className="
                  absolute inset-x-0 bottom-0
                  bg-gradient-to-t from-white/85 via-white/20 to-transparent
                  dark:from-black/70 dark:via-black/20 dark:to-transparent
                  pointer-events-none
                "
                style={{ minHeight: 96 }}
              />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <span className="inline-block text-[11px] uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                  {f.category || "Feature"}
                </span>
                <h4 className="mt-1 text-sm sm:text-base font-semibold">
                  {f.title}
                </h4>
                {f.note && (
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2">
                    {f.note}
                  </p>
                )}
              </div>

              {/* 포커스 링 */}
              <span className="absolute inset-0 ring-0 ring-black/0 dark:ring-white/0 group-focus-within:ring-2 group-focus-within:ring-black/20 dark:group-focus-within:ring-white/20 rounded-2xl pointer-events-none" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

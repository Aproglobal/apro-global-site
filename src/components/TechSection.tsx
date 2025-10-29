// src/components/TechSection.tsx
import React, { useEffect, useRef } from "react";
import { trackEvent } from "../services/analytics";
import { TECH_FEATURES, type TechItem } from "../data/tech_features";

/** ✅ App 쪽의 TechCopy와 이름 충돌/불일치가 나더라도 수용 가능한 느슨한 타입 */
type TechCopyLike = {
  title?: string;
  subtitle?: string;
  bullets?: string[];
  // 다른 필드가 추가돼도 허용
  [k: string]: unknown;
};// src/components/TechSection.tsx
import React, { useEffect, useRef } from "react";
import { trackEvent } from "../services/analytics";
import { TECH_FEATURES, type TechItem } from "../data/tech_features";

/** 느슨한 카피 타입: App의 getTechCopy() 결과 어떤 구조든 수용 */
type TechCopyLike = {
  title?: string;
  subtitle?: string;
  bullets?: string[];
  [k: string]: unknown;
};

/** 내부 카드에서 쓰는 아이템 타입: key → id 매핑 */
type FeatureItem = TechItem & { id: string };

/** key를 id로 매핑(타입 오류 방지) */
const FEATURES: FeatureItem[] = TECH_FEATURES.map((f) => ({ ...f, id: f.key }));

export default function TechSection({ copy }: { copy?: TechCopyLike }) {
  useEffect(() => {
    trackEvent("technology_view");
  }, []);

  // hover 1회만 트래킹
  const hoveredRef = useRef<Set<string>>(new Set());
  const handleHoverOnce = (id: string) => {
    const seen = hoveredRef.current;
    if (!seen.has(id)) {
      seen.add(id);
      trackEvent("technology_item_hover", { id });
    }
  };

  const TitleBlock = () => (
    <header className="max-w-6xl mx-auto px-5">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        {copy?.title ?? "Technology"}
      </h2>
      {copy?.subtitle && (
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">{copy.subtitle}</p>
      )}
      {Array.isArray(copy?.bullets) && copy!.bullets!.length > 0 ? (
        <ul className="mt-3 list-disc pl-5 text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
          {copy!.bullets!.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ) : null}
    </header>
  );

  const Card = ({ item }: { item: FeatureItem }) => (
    <article
      role="region"
      aria-labelledby={`tech-${item.id}-title`}
      tabIndex={0}
      onMouseEnter={() => handleHoverOnce(item.id)}
      onFocus={() => handleHoverOnce(item.id)}
      className="
        group rounded-2xl border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-950/90
        overflow-hidden p-4 md:p-5
        transition-all duration-200
        hover:shadow-lg hover:-translate-y-0.5
        focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20
      "
    >
      {/* 이미지: 작은 원본도 깔끔하게 보이도록 */}
      <div
        className="
          relative rounded-xl overflow-hidden
          ring-1 ring-zinc-200 dark:ring-zinc-800
          aspect-[4/3]
        "
      >
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="
            h-full w-full object-cover
            transition-transform duration-300
            group-hover:scale-[1.02]
          "
        />
        <div
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-t from-black/10 to-transparent
            dark:from-black/20
            opacity-0 group-hover:opacity-100 transition-opacity
          "
        />
      </div>

      <h3 id={`tech-${item.id}-title`} className="mt-4 text-base md:text-lg font-semibold">
        {item.title}
      </h3>
      {item.desc && (
        <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{item.desc}</p>
      )}
    </article>
  );

  return (
    <section
      id="technology"
      className="py-20 bg-white text-black border-t border-zinc-200 dark:bg-black dark:text-white dark:border-zinc-800"
    >
      <TitleBlock />

      {/* 📱 Mobile: 아코디언 */}
      <div className="mt-6 md:hidden max-w-6xl mx-auto px-5 space-y-3">
        {FEATURES.map((f) => (
          <details
            key={f.id}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/90"
            onToggle={(e) => {
              if ((e.target as HTMLDetailsElement).open) handleHoverOnce(f.id);
            }}
          >
            <summary className="cursor-pointer list-none p-4 font-semibold flex items-center gap-3">
              <img
                src={f.img}
                alt={f.title}
                loading="lazy"
                decoding="async"
                className="h-14 w-14 object-cover rounded-lg ring-1 ring-zinc-200 dark:ring-zinc-800"
              />
              <span className="flex-1">{f.title}</span>
              <span className="text-zinc-500">▾</span>
            </summary>
            {f.desc && (
              <div className="px-4 pb-4 -mt-2">
                <p className="text-sm text-zinc-700 dark:text-zinc-300">{f.desc}</p>
              </div>
            )}
          </details>
        ))}
      </div>

      {/* 💻 Desktop: 카드 그리드 */}
      <div className="hidden md:block max-w-6xl mx-auto px-5">
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <Card key={f.id} item={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

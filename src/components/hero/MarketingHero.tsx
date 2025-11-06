// src/components/hero/MarketingHero.tsx
import { Link } from "react-router-dom";

type Variant = "A" | "B";

export default function MarketingHero({ variant = "A" }: { variant?: Variant }) {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
      aria-label="APRO main hero"
    >
      {/* 배경 이미지 (CLS 최소화 위해 고정 높이) */}
      <div className="relative h-[60svh] min-h-[420px]">
        <picture>
          {/* 필요 시 모바일 소스 별도 운영 가능 */}
          {/* <source media="(max-width: 640px)" srcSet="/assets/hero-mobile.jpg" /> */}
          <img
            src="/assets/hero.jpg"
            alt="APRO electric golf carts on course"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        {/* 카피 + CTA */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
          <div className="max-w-5xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              APRO — Electric Golf Carts
            </h1>
            <p className="mt-3 max-w-2xl text-neutral-200">
              Electronic guidance, flexible seating, and dependable service across APAC.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/models"
                className="rounded-xl px-4 py-2 bg-white text-black font-semibold shadow-sm hover:shadow transition"
              >
                Explore Models
              </Link>
              <Link
                to="/contact"
                className="rounded-xl px-4 py-2 bg-black/70 text-white ring-1 ring-white/30 backdrop-blur hover:bg-black/80 transition"
              >
                Talk to Sales
              </Link>
            </div>

            {/* 서브 포인트 (Variant에 따라 표기 살짝 변경) */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-neutral-200">
              {variant === "A" ? (
                <>
                  <div className="rounded-lg bg-white/10 p-3 ring-1 ring-white/20">Electronic Guidance Ready</div>
                  <div className="rounded-lg bg-white/10 p-3 ring-1 ring-white/20">VIP / Semi-VIP Seating</div>
                  <div className="rounded-lg bg-white/10 p-3 ring-1 ring-white/20">APAC Service & Warranty</div>
                </>
              ) : (
                <>
                  <div className="rounded-lg bg-white/10 p-3 ring-1 ring-white/20">Geofencing & Pace Control</div>
                  <div className="rounded-lg bg-white/10 p-3 ring-1 ring-white/20">Long-life Battery Systems</div>
                  <div className="rounded-lg bg-white/10 p-3 ring-1 ring-white/20">Diagnostics & Safety</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

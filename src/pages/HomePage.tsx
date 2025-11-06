import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { setupScrollDepth, trackEvent } from "../services/analytics";

export default function HomePage() {
  useEffect(() => {
    // 인자 없이 호출 (TS2554 방지). 커스텀 threshold 필요 시 analytics.ts가 옵션을 지원함.
    setupScrollDepth();
  }, []);

  function onCta() {
    trackEvent("cta_click", { location: "hero" });
  }

  return (
    <main className="min-h-[70vh]">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh]">
        <img
          src="/assets/hero.jpg"
          alt="APRO electric golf carts on course"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              APRO — Electric Golf Carts for Modern Courses
            </h1>
            <p className="mt-4 text-white/90 text-lg md:text-xl max-w-2xl">
              Electronic guidance, flexible seating, dependable service across APAC.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                to="/contact"
                onClick={onCta}
                className="inline-flex items-center rounded-2xl px-5 py-3 bg-white text-black font-semibold shadow hover:opacity-90"
              >
                Talk to Sales
              </Link>
              <Link
                to="/models"
                className="inline-flex items-center rounded-2xl px-5 py-3 bg-white/10 text-white border border-white/30 hover:bg-white/20"
              >
                Explore Models
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 구체 섹션은 추후 채움 */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Why APRO</h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-300">
          High-availability fleet, guidance-ready electronics, field-proven service, and tailored seating layouts.
        </p>
      </section>
    </main>
  );
}

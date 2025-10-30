{/* HERO */}
<section id="home" className="relative scroll-mt-24" aria-label="Hero">
  <div className="relative h-[72vh] md:h-[84vh] w-full">
    <img
      src="/assets/hero.jpg"
      alt="APRO Golf Carts"
      className="absolute inset-0 w-full h-full object-cover"
      loading="eager"
      fetchPriority="high"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent dark:from-black dark:via-black/30 dark:to-transparent" />
    <div className="relative z-10 max-w-6xl mx-auto px-5 h-full flex flex-col justify-end pb-14">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
        Electric Golf Carts, Built for Courses, Resorts & Venues Worldwide
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-700 dark:text-zinc-200">
        Smart guidance, flexible seating, and global after-sales support.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => {
            openLead("Hero CTA");
            trackEvent("heroCtaClick", { where: "hero", label: "Talk to Sales" });
          }}
          className="px-5 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
          aria-label="Open sales contact form"
        >
          Talk to Sales
        </button>

        <a
          href="#models"
          onClick={() => trackEvent("modelExploreClick", { where: "hero", label: "Explore models" })}
          className="px-5 py-3 rounded-full border border-black/40 text-black dark:border-white/60 dark:text-white"
          aria-label="Jump to models section"
        >
          Explore models
        </a>
      </div>

      {/* ✔️ 기존의 USP chips 블록은 삭제했습니다 */}
    </div>
  </div>
</section>

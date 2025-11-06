type Props = {
  title: string;
  subtitle?: string;
  ctaHref?: string;
  image?: string;
};

export function Hero({ title, subtitle, ctaHref = "https://forms.gle/9z6Z-example", image = "/assets/hero.jpg" }: Props) {
  return (
    <section className="relative overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
        loading="eager"
      />
      <div className="relative z-10 bg-gradient-to-b from-black/40 to-black/20 dark:from-black/60 dark:to-black/30">
        <div className="container-xl section-pad text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold max-w-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-lg opacity-90">{subtitle}</p>
          )}
          <div className="mt-8">
            <a
              href={ctaHref}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              onClick={() => {
                // @ts-ignore
                if (typeof window.gtag === "function")
                  window.gtag("event", "lead_click", { location: "hero" });
              }}
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/25 dark:bg-black/40" aria-hidden="true" />
    </section>
  );
}

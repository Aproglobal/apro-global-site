import React, { useEffect, useMemo, useRef, useState } from "react";
import { MODELS } from "../data/models";
import { openModel } from "./ModelDetail";
import { trackEvent } from "../services/analytics";

function useReveal() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && (setVisible(true), io.disconnect())),
      { threshold: 0.15, rootMargin: "80px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function imgSrc(code: string) {
  return `/models/${code}_1.jpg`;
}
function imgPreviewSrc(code: string) {
  return `/models/${code}_1-preview.jpg`;
}

export default function ModelGrid() {
  const models = useMemo(() => MODELS, []);
  return (
    <section id="models" className="py-16 bg-white text-black dark:bg-black dark:text-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Models</h2>

        <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {models.map((m) => (
            <ModelCard key={m.code} code={m.code} name={m.name} subtitle={`${m.guidance} • ${m.seats} seats`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModelCard({ code, name, subtitle }: { code: string; name: string; subtitle: string }) {
  const { ref, visible } = useReveal();
  const [loaded, setLoaded] = useState(false);

  const onOpen = () => {
    openModel(code);
    trackEvent("model_card_click", { code, name });
  };

  return (
    <div
      ref={ref}
      className={[
        "rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-200",
        "hover:shadow-lg hover:-translate-y-0.5 hover:border-black/15 dark:hover:border-white/20",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      ].join(" ")}
    >
      <button
        onClick={onOpen}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
        aria-label={`Open ${name} details`}
      >
        <div className="relative aspect-[16/9] bg-zinc-100 dark:bg-zinc-900">
          <img
            src={imgPreviewSrc(code)}
            alt=""
            aria-hidden="true"
            className={["absolute inset-0 w-full h-full object-cover blur-md scale-105 transition-opacity", loaded ? "opacity-0" : "opacity-100"].join(" ")}
            onError={(e) => ((e.currentTarget.style.display = "none"))}
          />
          <img
            src={imgSrc(code)}
            alt={name}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={() => setLoaded(true)}
          />
        </div>
        <div className="p-4">
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-300 mt-0.5">{subtitle}</div>
        </div>
      </button>
    </div>
  );
}

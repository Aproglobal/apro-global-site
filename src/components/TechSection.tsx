import React, { useEffect, useRef } from "react";
import { trackEvent } from "../services/analytics";

/** 타입(선택): 외부 data/technology.ts 없이도 동작하도록 내부 기본값을 둡니다. */
type TechBlock = {
  id: "drivetrain" | "battery" | "guidance" | "safety" | "suspension" | "body" | string;
  title: string;
  body?: string;
  bullets?: string[];
};
type TechCopy = {
  headline: string;
  intro?: string;
  blocks: TechBlock[];
};

const DEFAULT_COPY: TechCopy = {
  headline: "Technology",
  intro:
    "Hill-ready AC powertrain, lithium safety, and modular body design—engineered for daily uptime on modern courses.",
  blocks: [
    {
      id: "drivetrain",
      title: "AC Drivetrain (48V • 4.6 kW)",
      bullets: [
        "High torque for 25° grades; smooth starts on slopes",
        "Low maintenance vs. DC (no brushes/commutator)",
        "Wide high-efficiency band for longer runtime",
      ],
    },
    {
      id: "battery",
      title: "SK Mobile Energy Lithium",
      bullets: [
        "51V 110Ah standard, 160Ah option",
        "≈2,000 cycles @ DOD 80% (typical)",
        "BMS / PACK / CELL in-house for quality & service",
        "4–5 h typical charge; no memory effect",
      ],
    },
    {
      id: "guidance",
      title: "E-Guidance & Remote",
      bullets: [
        "FM remote up to ~100 m (convenience & ops)",
        "Speed profiles: 8 / 5 / 3.5 km/h (guided modes)",
        "Magnet / ultrasonic sensors validated −40°C ~ +85°C",
      ],
    },
    {
      id: "safety",
      title: "Brake & Obstacle Safety",
      bullets: [
        "Hydraulic disc + motor control system",
        "Ultrasonic auto-stop: detects up to ~4.5 m",
        "Cart-guard sensor for safe spacing",
      ],
    },
    {
      id: "suspension",
      title: "4-Wheel Independent Suspension",
      bullets: [
        "MacPherson-type front; sedan-grade ride",
        "Consistent grip and confident cornering",
      ],
    },
    {
      id: "body",
      title: "Modular Body & Storage",
      bullets: [
        "4-piece ABS+ASA body: easy service & parts swap",
        "Expanded front storage + sealed rear locker",
      ],
    },
  ],
};

/** 아이콘: 외부 라이브러리 없이 인라인 SVG로 제공 */
function IconSVG({ id }: { id: TechBlock["id"] }) {
  const cls = "w-5 h-5 mr-2";
  switch (id) {
    case "drivetrain":
      return (
        <svg className={cls} viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm8 3h-2.1a6.96 6.96 0 0 0-1.15-2.78l1.48-1.48-1.42-1.42-1.48 1.48A6.96 6.96 0 0 0 13 4.1V2h-2v2.1a6.96 6.96 0 0 0-2.78 1.15L6.74 3.77 5.32 5.2l1.48 1.48A6.96 6.96 0 0 0 4.1 11H2v2h2.1a6.96 6.96 0 0 0 1.15 2.78L3.77 17.26l1.42 1.42 1.48-1.48A6.96 6.96 0 0 0 11 19.9V22h2v-2.1a6.96 6.96 0 0 0 2.78-1.15l1.48 1.48 1.42-1.42-1.48-1.48A6.96 6.96 0 0 0 19.9 13H22v-2Z"
            fill="currentColor"
          />
        </svg>
      );
    case "battery":
      return (
        <svg className={cls} viewBox="0 0 24 24" aria-hidden>
          <rect x="2" y="7" width="18" height="10" rx="2" fill="none" stroke="currentColor" />
          <rect x="20" y="10" width="2" height="4" fill="currentColor" />
          <path d="M9 9l-2 4h3l-2 4 6-6h-3l2-2z" fill="currentColor" />
        </svg>
      );
    case "guidance":
      return (
        <svg className={cls} viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <path d="M7 12a5 5 0 0 1 5-5M5 12a7 7 0 0 1 7-7M17 12a5 5 0 0 0-5-5M19 12a7 7 0 0 0-7-7" stroke="currentColor" fill="none" />
          <path d="M7 12a5 5 0 0 0 5 5M5 12a7 7 0 0 0 7 7M17 12a5 5 0 0 1-5 5M19 12a7 7 0 0 1-7 7" stroke="currentColor" fill="none" />
        </svg>
      );
    case "safety":
      return (
        <svg className={cls} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" fill="none" stroke="currentColor" />
          <path d="M8 12l2 2 4-4" stroke="currentColor" fill="none" />
        </svg>
      );
    case "suspension":
      return (
        <svg className={cls} viewBox="0 0 24 24" aria-hidden>
          <path d="M3 16h18M5 16l2-6h10l2 6M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="none" stroke="currentColor" />
        </svg>
      );
    case "body":
      return (
        <svg className={cls} viewBox="0 0 24 24" aria-hidden>
          <path d="M4 7h16v10H4z" fill="none" stroke="currentColor" />
          <path d="M4 9h16M8 7v10" stroke="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export default function TechSection({ copy }: { copy?: TechCopy }) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    trackEvent("tech_view");
  }, []);

  // 블록 노출(첫 진입) 트래킹
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const seen = new Set<string>();
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-tech-id]"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const id = el.dataset.techId!;
          const title = el.dataset.techTitle || id;
          if (seen.has(id)) return;
          seen.add(id);
          trackEvent("tech_block_view", { id, title });
        });
      },
      { threshold: 0.25 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [copy?.blocks?.map((b) => b.id).join("|")]);

  const data = copy ?? DEFAULT_COPY;

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="py-20 bg-white text-black dark:bg-black dark:text-white"
    >
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{data.headline}</h2>
        {data.intro && (
          <p className="mt-3 max-w-3xl text-zinc-700 dark:text-zinc-300">{data.intro}</p>
        )}

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {data.blocks.map((b) => (
            <article
              key={b.id}
              id={b.id}
              data-tech-id={b.id}
              data-tech-title={b.title}
              onClick={() => trackEvent("tech_block_click", { id: b.id, title: b.title })}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <h3 className="text-xl font-semibold flex items-center">
                <IconSVG id={b.id} />
                {b.title}
              </h3>

              {b.body && (
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{b.body}</p>
              )}

              {b.bullets && b.bullets.length > 0 && (
                <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {b.bullets.map((li, i) => (
                    <li key={i} className="pl-4 relative">
                      <span className="absolute left-0 top-0">•</span>
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        <div className="mt-8">
          <a
            href="#models"
            onClick={() => trackEvent("cta_click", { where: "technology", label: "Explore models" })}
            className="inline-block px-5 py-3 rounded-full border border-black/40 text-black dark:border-white/60 dark:text-white"
          >
            Explore models
          </a>
        </div>
      </div>
    </section>
  );
}

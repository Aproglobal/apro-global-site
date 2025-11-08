import React, { useMemo, useState } from "react";
import StageCarousel from "./StageCarousel";
import { trackEvent } from "../services/analytics";
import { openLead } from "./LeadModal";
import { MODELS } from "../data/models";
import { SPECS } from "../data/specs";

type Option = { key: string; label: string; price?: number };

const COLORS: Option[] = [
  { key: "white", label: "Arctic White" },
  { key: "black", label: "Obsidian Black" },
  { key: "silver", label: "Titan Silver" },
  { key: "green", label: "Forest Green" },
];

const WHEELS: Option[] = [
  { key: "std", label: "Standard 10\"", price: 0 },
  { key: "lux", label: "Premium 12\"", price: 250 },
];

const SEAT_TRIM: Option[] = [
  { key: "fabric", label: "Durable Fabric", price: 0 },
  { key: "premium", label: "Premium Synthetic", price: 180 },
  { key: "heated", label: "Heated (Front & Rear)", price: 420 },
];

const SAFETY: Option[] = [
  { key: "ultra", label: "Ultrasonic Sensing", price: 220 },
  { key: "guard", label: "Cart Guard Distance Sensor", price: 180 },
  { key: "bumper", label: "Impact-Sensing Bumper", price: 160 },
];

export default function ConfiguratorSection() {
  const stageSlides = [
    {
      img: "/configurator/hero.jpg",
      title: "Build Your Cart",
      desc: "Choose model, color, wheels, seating, and safety. Send your build to sales for a tailored quote.",
      meta: "Spec your APRO like a premium car",
    },
  ];

  const models = useMemo(() => MODELS, []);
  const [modelCode, setModelCode] = useState(models[0]?.code ?? "");
  const [color, setColor] = useState(COLORS[0].key);
  const [wheel, setWheel] = useState(WHEELS[0].key);
  const [seat, setSeat] = useState(SEAT_TRIM[0].key);
  const [safety, setSafety] = useState<string[]>([]);

  const spec = (SPECS as any)[modelCode] || {};
  const price = useMemo(() => {
    const w = WHEELS.find((x) => x.key === wheel)?.price ?? 0;
    const s = SEAT_TRIM.find((x) => x.key === seat)?.price ?? 0;
    const sf = safety.reduce((sum, k) => sum + (SAFETY.find((x) => x.key === k)?.price ?? 0), 0);
    return 10000 + w + s + sf; // base placeholder; real pricing comes from sales
  }, [wheel, seat, safety]);

  return (
    <div className="not-prose">
      <StageCarousel
        id="configurator-stage"
        title="Build Your Cart"
        note="A clean, visual configurator—focus on one choice at a time, then send to sales."
        slides={stageSlides}
      />

      {/* Config grid */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {/* Left: choices */}
        <div className="md:col-span-2 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-5 md:p-6 bg-white/70 dark:bg-zinc-950/70 backdrop-blur">
          {/* Model */}
          <div>
            <label className="block text-xs font-semibold tracking-wide text-zinc-500">MODEL</label>
            <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {models.map((m) => (
                <button
                  key={m.code}
                  onClick={() => setModelCode(m.code)}
                  className={[
                    "rounded-xl border px-3 py-2 text-left",
                    modelCode === m.code
                      ? "border-black dark:border-white"
                      : "border-zinc-200 dark:border-zinc-800",
                  ].join(" ")}
                  aria-pressed={modelCode === m.code}
                >
                  <div className="text-sm font-semibold">{m.name}</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    {m.guidance} • {m.seats} seats {m.variant ? `• ${m.variant}` : ""}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mt-6">
            <label className="block text-xs font-semibold tracking-wide text-zinc-500">COLOR</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setColor(c.key)}
                  className={[
                    "px-3 py-2 rounded-full border text-sm",
                    color === c.key
                      ? "border-black dark:border-white"
                      : "border-zinc-200 dark:border-zinc-800",
                  ].join(" ")}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Wheels */}
          <div className="mt-6">
            <label className="block text-xs font-semibold tracking-wide text-zinc-500">WHEELS</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {WHEELS.map((w) => (
                <button
                  key={w.key}
                  onClick={() => setWheel(w.key)}
                  className={[
                    "px-3 py-2 rounded-full border text-sm",
                    wheel === w.key
                      ? "border-black dark:border-white"
                      : "border-zinc-200 dark:border-zinc-800",
                  ].join(" ")}
                >
                  {w.label} {w.price ? `(+${w.price.toLocaleString()})` : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Seats */}
          <div className="mt-6">
            <label className="block text-xs font-semibold tracking-wide text-zinc-500">SEAT TRIM</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {SEAT_TRIM.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setSeat(s.key)}
                  className={[
                    "px-3 py-2 rounded-full border text-sm",
                    seat === s.key
                      ? "border-black dark:border-white"
                      : "border-zinc-200 dark:border-zinc-800",
                  ].join(" ")}
                >
                  {s.label} {s.price ? `(+${s.price.toLocaleString()})` : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Safety */}
          <div className="mt-6">
            <label className="block text-xs font-semibold tracking-wide text-zinc-500">SAFETY</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {SAFETY.map((s) => {
                const on = safety.includes(s.key);
                return (
                  <button
                    key={s.key}
                    onClick={() =>
                      setSafety((cur) => (on ? cur.filter((k) => k !== s.key) : [...cur, s.key]))
                    }
                    className={[
                      "px-3 py-2 rounded-full border text-sm",
                      on ? "border-black dark:border-white" : "border-zinc-200 dark:border-zinc-800",
                    ].join(" ")}
                    aria-pressed={on}
                  >
                    {s.label} {s.price ? `(+${s.price.toLocaleString()})` : ""}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: summary */}
        <aside className="rounded-3xl border border-zinc-200 dark:border-zinc-800 p-5 md:p-6 bg-white/70 dark:bg-zinc-950/70 backdrop-blur">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Your Build</div>
          <div className="mt-2 text-lg font-semibold">
            {(MODELS.find((m) => m.code === modelCode)?.name ?? "Model")} — {price.toLocaleString()}*
          </div>
          <ul className="mt-3 space-y-1 text-sm">
            <li>Color: {COLORS.find((x) => x.key === color)?.label}</li>
            <li>Wheels: {WHEELS.find((x) => x.key === wheel)?.label}</li>
            <li>Seat: {SEAT_TRIM.find((x) => x.key === seat)?.label}</li>
            {safety.length > 0 && (
              <li>
                Safety:{" "}
                {safety
                  .map((k) => SAFETY.find((x) => x.key === k)?.label)
                  .filter(Boolean)
                  .join(", ")}
              </li>
            )}
          </ul>

          <div className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 text-xs text-zinc-600 dark:text-zinc-400">
            <div>Key spec (preview)</div>
            <div className="mt-1">
              Motor: {spec?.motor ?? "—"} • Battery: {spec?.battery ?? "—"}
            </div>
            <div className="mt-1">
              Suspension: {spec?.suspension ?? "—"} • Brakes: {spec?.brakes ?? "—"}
            </div>
          </div>

          <button
            onClick={() => {
              openLead("Configurator");
              trackEvent("configurator_submit", {
                model: modelCode,
                color,
                wheel,
                seat,
                safety: safety.join(","),
                price,
              });
            }}
            className="mt-5 w-full px-4 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
          >
            Send Build to Sales
          </button>

          <div className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-500">
            *Indicative only. Final pricing varies by market, policy, and options.
          </div>
        </aside>
      </div>
    </div>
  );
}

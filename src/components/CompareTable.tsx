// src/components/CompareTable.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MODELS } from "../data/models";
import { SPECS, SPEC_LABELS } from "../data/specs";
import { trackEvent } from "../services/analytics";
import { openModel } from "./ModelDetail";

type TipState = {
  show: boolean;
  x: number;
  y: number;
  content?: string;
};

const DESKTOP_HEADERS: Array<keyof typeof SPEC_LABELS | "model" | "variant" | "reverse"> = [
  "model",              // 가상 컬럼(모델명)
  "modelNo",
  "guidance",
  "seating",
  "variant",           // 가상 컬럼(variants)
  "deck",
  "reverse",           // 가상 컬럼(reverse seating)
  "maxSpeed",
  "gradeability",
  "battery",
  "motor",
  "dimensions",
  "payload",
];

const MOBILE_KEYS: Array<keyof typeof SPEC_LABELS | "variant" | "reverse"> = [
  "modelNo",
  "guidance",
  "seating",
  "variant",
  "deck",
  "maxSpeed",
  "battery",
  "gradeability",
];

function buildTip(code: string): string {
  const s = SPECS[code] || {};
  const parts = [
    s.modelNo && `Model No.: ${s.modelNo}`,
    s.dimensions && `Size: ${s.dimensions}`,
    s.wheelbase && `Wheelbase: ${s.wheelbase}`,
    s.curbWeight && `Curb: ${s.curbWeight}`,
    s.battery && `Battery: ${s.battery}`,
    s.motor && `Motor: ${s.motor}`,
    s.suspension && `Suspension: ${s.suspension}`,
    (s.brakes || s.parkingBrake) &&
      `Brakes: ${[s.brakes, s.parkingBrake ? `+ ${s.parkingBrake}` : ""].filter(Boolean).join(" ")}`,
    s.maxSpeed && `Speed: ${s.maxSpeed}`,
    s.gradeability && `Grade: ${s.gradeability}`,
    s.payload && `Payload: ${s.payload}`,
    s.cargoBed && `Cargo bed: ${s.cargoBed}`,
    s.options?.length && `Options: ${s.options.slice(0, 3).join(", ")}${s.options.length > 3 ? "…" : ""}`,
  ].filter(Boolean);
  return parts.length ? parts.join(" • ") : "Specs coming soon";
}

export default function CompareTable() {
  useEffect(() => {
    trackEvent("compare_view");
  }, []);

  const [tip, setTip] = useState<TipState>({ show: false, x: 0, y: 0 });
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showHint, setShowHint] = useState(true);

  // 스크롤 힌트는 첫 스크롤 시 사라짐
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setShowHint(false);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const models = useMemo(() => MODELS, []);

  return (
    <section
      id="compare"
      className="py-16 bg-zinc-50 text-black border-t border-zinc-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-800"
    >
      <div className="max-w-6xl mx-auto px-5 relative">
        <h3 className="text-2xl font-bold">Compare Models</h3>

        {/* ======= 모바일: 카드 요약 ======= */}
        <div className="md:hidden mt-6 grid gap-4">
          {models.map((m) => {
            const s = SPECS[m.code] || {};
            return (
              <article
                key={m.code}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4"
              >
                <header className="flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-semibold">{m.name}</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {m.guidance} • {m.seats} seats {m.deck ? `• ${m.deck} deck` : ""}{" "}
                      {m.variant ? `• ${m.variant}` : ""} {m.reverse ? "• Reverse Seating" : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => (openModel(m.code), trackEvent("compare_card_open", { code: m.code }))}
                    className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold bg-black text-white dark:bg-white dark:text-black"
                    aria-label={`Open ${m.name} details`}
                  >
                    Details
                  </button>
                </header>

                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {MOBILE_KEYS.map((key) => {
                    const label = SPEC_LABELS[key as keyof typeof SPEC_LABELS] || key;
                    // 가상 필드 처리
                    const value =
                      key === "variant"
                        ? m.variant ?? "—"
                        : key === "deck"
                        ? m.deck ?? "—"
                        : key === "seating"
                        ? m.seats ?? "—"
                        : key === "guidance"
                        ? m.guidance ?? "—"
                        : key === "battery" ||
                          key === "maxSpeed" ||
                          key === "modelNo" ||
                          key === "dimensions" ||
                          key === "gradeability"
                        ? (SPECS[m.code] as any)?.[key] ?? "—"
                        : (SPECS[m.code] as any)?.[key] ?? "—";

                    return (
                      <li key={key} className="flex flex-col">
                        <span className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                          {label}
                        </span>
                        <span>{value || "—"}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* 더보기 (세부 스펙) */}
                <details className="mt-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <summary className="cursor-pointer list-none px-3 py-2 text-sm font-medium">
                    More specs
                  </summary>
                  <div className="px-3 pb-3">
                    <ul className="mt-2 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                      {Object.entries(SPECS[m.code] || {}).map(([k, v]) => {
                        const label = SPEC_LABELS[k as keyof typeof SPEC_LABELS];
                        if (!label) return null;
                        return (
                          <li key={k} className="flex gap-2">
                            <span className="w-36 shrink-0 text-zinc-500 dark:text-zinc-400">{label}</span>
                            <span className="flex-1">{Array.isArray(v) ? v.join(", ") : (v as any) ?? "—"}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </details>

                <div className="mt-3 flex gap-2">
                  <a
                    href={`/specs/${m.code}.pdf`}
                    onClick={() => trackEvent("spec_download", { code: m.code })}
                    className="px-3 py-2 rounded-full border text-sm border-zinc-300 text-zinc-800 dark:border-zinc-700 dark:text-zinc-200"
                  >
                    Download specs
                  </a>
                  <button
                    onClick={() => (openModel(m.code), trackEvent("compare_card_open", { code: m.code, via: "cta" }))}
                    className="px-3 py-2 rounded-full bg-black text-white text-sm font-semibold dark:bg-white dark:text-black"
                  >
                    View details
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* ======= 데스크탑: 전체 표 ======= */}
        <div className="hidden md:block mt-6">
          <div className="relative">
            {/* 좌/우 그라데이션 가이드 */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r
                            from-zinc-50 dark:from-zinc-900 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l
                            from-zinc-50 dark:from-zinc-900 to-transparent z-10" />

            {/* 스크롤 컨테이너 */}
            <div
              ref={scrollRef}
              className="overflow-x-auto overscroll-x-contain relative rounded-xl border border-zinc-200 dark:border-zinc-800"
            >
              {/* 스크롤 힌트 */}
              {showHint && (
                <div className="pointer-events-none absolute bottom-2 right-3 z-20 text-[11px] px-2 py-1 rounded-full bg-zinc-800/80 text-white">
                  Scroll →
                </div>
              )}

              <table className="min-w-[1200px] w-max text-sm border-collapse">
                <thead className="sticky top-0 z-20">
                  <tr className="bg-zinc-50 dark:bg-zinc-900">
                    {DESKTOP_HEADERS.map((h) => (
                      <th
                        key={h}
                        className={[
                          "py-3 px-3 text-left text-zinc-600 dark:text-zinc-300",
                          h === "model" ? "sticky left-0 z-20 bg-zinc-50 dark:bg-zinc-900" : "",
                        ].join(" ")}
                      >
                        {h === "model" ? "Model" : (SPEC_LABELS as any)[h] || h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {models.map((m, idx) => {
                    const s = SPECS[m.code] || {};
                    return (
                      <tr
                        key={m.code}
                        className={[
                          "group border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer",
                          idx % 2 ? "bg-white/50 dark:bg-transparent" : "",
                        ].join(" ")}
                        tabIndex={0}
                        role="button"
                        aria-label={`Open ${m.name} details`}
                        onClick={() => (openModel(m.code), trackEvent("compare_row_click", { code: m.code }))}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            openModel(m.code);
                            trackEvent("compare_row_click", { code: m.code, via: "kbd" });
                          }
                        }}
                        onMouseEnter={(e) =>
                          setTip({
                            show: true,
                            x: e.clientX,
                            y: e.clientY,
                            content: buildTip(m.code),
                          })
                        }
                        onMouseMove={(e) => setTip((t) => (t.show ? { ...t, x: e.clientX, y: e.clientY } : t))}
                        onMouseLeave={() => setTip({ show: false, x: 0, y: 0 })}
                        onFocus={() =>
                          setTip({
                            show: true,
                            x: window.innerWidth - 16,
                            y: 120,
                            content: buildTip(m.code),
                          })
                        }
                        onBlur={() => setTip({ show: false, x: 0, y: 0 })}
                      >
                        {DESKTOP_HEADERS.map((h) => {
                          const cell =
                            h === "model"
                              ? m.name
                              : h === "variant"
                              ? m.variant ?? "—"
                              : h === "reverse"
                              ? m.reverse
                                ? "Yes"
                                : "No"
                              : h === "seating"
                              ? m.seats ?? "—"
                              : h === "guidance"
                              ? m.guidance ?? "—"
                              : (s as any)?.[h] ?? "—";
                          const stickyFirst = h === "model";
                          return (
                            <td
                              key={String(h)}
                              className={[
                                "py-3 px-3 whitespace-nowrap",
                                stickyFirst
                                  ? "sticky left-0 z-10 bg-white dark:bg-zinc-950 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800"
                                  : "",
                              ].join(" ")}
                            >
                              {cell}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6">
            <a
              href="#contact"
              onClick={() => trackEvent("cta_click", { where: "compare", label: "Download full brochure" })}
              className="inline-block px-5 py-3 rounded-lg font-medium bg-black text-white hover:opacity-90 dark:bg-white dark:text-black"
            >
              Download full brochure
            </a>
          </div>
        </div>

        {/* Tooltip (데스크탑 전용) */}
        <div className="hidden md:block">
          {tip.show && (
            <div
              className="pointer-events-none fixed z-30 max-w-md px-3 py-2 rounded-lg shadow-lg
                         text-xs leading-relaxed
                         bg-white text-black dark:bg-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700"
              style={{
                left: Math.min(tip.x + 14, window.innerWidth - 16),
                top: Math.min(tip.y + 14, window.innerHeight - 16),
              }}
              role="status"
              aria-live="polite"
            >
              {tip.content}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

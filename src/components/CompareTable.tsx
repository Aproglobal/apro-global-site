// src/components/CompareTable.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { MODELS } from '../data/models';
import { SPECS } from '../data/specs';
import { trackEvent } from '../services/analytics';
import { openModel } from './ModelDetail';

/** -------------------------------
 *  Types & Helpers
 * --------------------------------*/
type TipState = {
  show: boolean;
  x: number;
  y: number;
  code?: string;
  content?: string;
  viaKeyboard?: boolean;
};

function buildTip(code: string): string {
  const s = (SPECS as any)[code] || {};
  const rows = [
    s.modelNo ? `Model No.: ${s.modelNo}` : undefined,
    s.dimensions ? `Size: ${s.dimensions}` : undefined,
    s.wheelbase ? `Wheelbase: ${s.wheelbase}` : undefined,
    s.curbWeight ? `Curb: ${s.curbWeight}` : undefined,
    s.battery ? `Battery: ${s.battery}` : undefined,
    s.motor ? `Motor: ${s.motor}` : undefined,
    s.suspension ? `Suspension: ${s.suspension}` : undefined,
    s.brakes || s.parkingBrake
      ? `Brakes: ${[s.brakes, s.parkingBrake ? `+ ${s.parkingBrake}` : undefined].filter(Boolean).join(' ')}`
      : undefined,
    s.maxSpeed ? `Speed: ${s.maxSpeed}` : undefined,
    s.gradeability ? `Grade: ${s.gradeability}` : undefined,
    s.payload ? `Payload: ${s.payload}` : undefined,
    s.cargoBed ? `Cargo bed: ${s.cargoBed}` : undefined,
    s.options?.length ? `Options: ${s.options.slice(0, 3).join(', ')}${s.options.length > 3 ? '…' : ''}` : undefined,
  ].filter(Boolean);
  return rows.length ? rows.join(' • ') : 'Specs coming soon';
}

/** -------------------------------
 *  Spec keys & labels
 * --------------------------------*/
const DESKTOP_HEADERS = [
  'model',
  'modelNo',
  'guidance',
  'seats',
  'variant',
  'deck',
  'reverse',
  'maxSpeed',
  'gradeability',
  'battery',
  'motor',
  'dimensions',
  'payload',
] as const;

type FieldKey = typeof DESKTOP_HEADERS[number];

const HEADER_LABEL: Record<FieldKey, string> = {
  model: 'Model',
  modelNo: 'Model No.',
  guidance: 'Guidance',
  seats: 'Seats',
  variant: 'Variant',
  deck: 'Deck',
  reverse: 'Reverse',
  maxSpeed: 'Max speed',
  gradeability: 'Grade',
  battery: 'Battery',
  motor: 'Motor',
  dimensions: 'Dimensions (L×W×H)',
  payload: 'Payload',
};

const MOBILE_KEYS: FieldKey[] = [
  'guidance',
  'seats',
  'variant',
  'deck',
  'reverse',
  'maxSpeed',
  'gradeability',
  'battery',
  'motor',
  'payload',
];

function getCellValue(m: any, key: FieldKey): string {
  const s = (SPECS as any)[m.code] || {};
  switch (key) {
    case 'model':
      return m.name;
    case 'guidance':
      return m.guidance ?? '—';
    case 'seats':
      return m.seats ?? '—';
    case 'variant':
      return m.variant ?? '—';
    case 'deck':
      return m.deck ?? '—';
    case 'reverse':
      return m.reverse ? 'Yes' : 'No';
    default:
      return s?.[key] ?? '—';
  }
}

function findDiffColumns(headers: ReadonlyArray<FieldKey>, list: any[]): Set<FieldKey> {
  const diffs = new Set<FieldKey>();
  headers.forEach((h) => {
    if (h === 'model') return;
    const values = list.map((m) => getCellValue(m, h));
    const allSame = values.every((v) => v === values[0]);
    if (!allSame) diffs.add(h);
  });
  return diffs;
}

/** -------------------------------
 *  Component
 * --------------------------------*/
export default function CompareTable() {
  useEffect(() => {
    trackEvent('compare_view');
  }, []);

  const models = useMemo(() => MODELS, []);
  const [tip, setTip] = useState<TipState>({ show: false, x: 0, y: 0 });

  // 데스크탑: 차이만 보기
  const [showDiffOnly, setShowDiffOnly] = useState(false);
  const diffCols = useMemo(() => findDiffColumns(DESKTOP_HEADERS, models), [models]);

  const visibleHeaders = useMemo<ReadonlyArray<FieldKey>>(
    () =>
      showDiffOnly
        ? DESKTOP_HEADERS.filter((h) => h === 'model' || diffCols.has(h))
        : DESKTOP_HEADERS,
    [showDiffOnly, diffCols]
  );

  // 모바일: 핀 & 미니 비교
  const [pinned, setPinned] = useState<string[]>([]);
  const [showMini, setShowMini] = useState(false);

  // ✅ 하단 UI 충돌 방지: 핀 개수/미니 비교 상태 브로드캐스트
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('compare:pinned', { detail: { count: pinned.length } } as any));
  }, [pinned]);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('compare:mini', { detail: { open: showMini } } as any));
  }, [showMini]);
  useEffect(() => {
    return () => {
      // 언마운트 시 초기화
      window.dispatchEvent(new CustomEvent('compare:pinned', { detail: { count: 0 } } as any));
      window.dispatchEvent(new CustomEvent('compare:mini', { detail: { open: false } } as any));
    };
  }, []);

  const togglePin = (code: string) => {
    setPinned((cur) => {
      if (cur.includes(code)) return cur.filter((c) => c !== code);
      if (cur.length >= 2) return [cur[1], code];
      return [...cur, code];
    });
  };

  const onRowActivate = (code: string, name: string) => {
    openModel(code);
    trackEvent('compare_row_click', { code, name });
  };

  return (
    <section
      id="compare"
      className="py-16 bg-zinc-50 text-black border-t border-zinc-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-800"
    >
      <div className="max-w-6xl mx-auto px-5">
        <h3 className="text-2xl font-bold">Compare Models</h3>

        {/* ---------------- Mobile: 카드 + Pin ---------------- */}
        <div className="mt-6 md:hidden space-y-3">
          {models.map((m) => {
            const s = (SPECS as any)[m.code] || {};
            return (
              <article
                key={m.code}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => (openModel(m.code), trackEvent('compare_card_open', { code: m.code }))}
                  aria-label={`Open ${m.name} details`}
                  className="block w-full text-left"
                >
                  <div className="p-4">
                    <header className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-base font-semibold">{m.name}</h4>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300">
                          {m.guidance} • {m.seats} seats {m.deck ? `• ${m.deck} deck` : ''}{' '}
                          {m.variant ? `• ${m.variant}` : ''} {m.reverse ? '• Reverse Seating' : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline text-[11px] text-zinc-500 dark:text-zinc-400">
                          {s.modelNo || '—'}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePin(m.code);
                            trackEvent('compare_pin_toggle', { code: m.code });
                          }}
                          className={[
                            'px-3 py-1.5 rounded-full text-xs font-semibold border',
                            pinned.includes(m.code)
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200',
                          ].join(' ')}
                          aria-pressed={pinned.includes(m.code)}
                        >
                          {pinned.includes(m.code) ? 'Pinned' : 'Pin'}
                        </button>
                      </div>
                    </header>

                    {/* 하이라이트 스펙 칩 */}
                    <ul className="mt-3 flex flex-wrap gap-2 text-[12px]">
                      {[
                        ['Max', s.maxSpeed ?? '—'],
                        ['Grade', s.gradeability ?? '—'],
                        ['Battery', s.battery ?? '—'],
                      ].map(([k, v]) => (
                        <li
                          key={String(k)}
                          className="rounded-full border px-2.5 py-1 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200"
                        >
                          {k}: {v as string}// src/components/CompareTable.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MODELS } from "../data/models";
import { SPECS } from "../data/specs";
import { trackEvent } from "../services/analytics";
import { openModel } from "./ModelDetail";

/** -------------------------------
 *  Types & Helpers
 * --------------------------------*/
type TipState = {
  show: boolean;
  x: number;
  y: number;
  code?: string;
  content?: string;
  viaKeyboard?: boolean;
};

function buildTip(code: string): string {
  const s = (SPECS as any)[code] || {};
  const rows = [
    s.modelNo ? `Model No.: ${s.modelNo}` : undefined,
    s.dimensions ? `Size: ${s.dimensions}` : undefined,
    s.wheelbase ? `Wheelbase: ${s.wheelbase}` : undefined,
    s.curbWeight ? `Curb: ${s.curbWeight}` : undefined,
    s.battery ? `Battery: ${s.battery}` : undefined,
    s.motor ? `Motor: ${s.motor}` : undefined,
    s.suspension ? `Suspension: ${s.suspension}` : undefined,
    s.brakes || s.parkingBrake
      ? `Brakes: ${[s.brakes, s.parkingBrake ? `+ ${s.parkingBrake}` : undefined].filter(Boolean).join(" ")}`
      : undefined,
    s.maxSpeed ? `Speed: ${s.maxSpeed}` : undefined,
    s.gradeability ? `Grade: ${s.gradeability}` : undefined,
    s.payload ? `Payload: ${s.payload}` : undefined,
    s.cargoBed ? `Cargo bed: ${s.cargoBed}` : undefined,
    s.options?.length ? `Options: ${s.options.slice(0, 3).join(", ")}${s.options.length > 3 ? "…" : ""}` : undefined,
  ].filter(Boolean);
  return rows.length ? rows.join(" • ") : "Specs coming soon";
}

/** -------------------------------
 *  Spec keys & labels
 * --------------------------------*/
const DESKTOP_HEADERS = [
  "model",
  "modelNo",
  "guidance",
  "seats",
  "variant",
  "deck",
  "reverse",
  "maxSpeed",
  "gradeability",
  "battery",
  "motor",
  "dimensions",
  "payload",
] as const;

type FieldKey = (typeof DESKTOP_HEADERS)[number];

const HEADER_LABEL: Record<FieldKey, string> = {
  model: "Model",
  modelNo: "Model No.",
  guidance: "Guidance",
  seats: "Seats",
  variant: "Variant",
  deck: "Deck",
  reverse: "Reverse",
  maxSpeed: "Max speed",
  gradeability: "Grade",
  battery: "Battery",
  motor: "Motor",
  dimensions: "Dimensions (L×W×H)",
  payload: "Payload",
};

const MOBILE_KEYS: FieldKey[] = [
  "guidance",
  "seats",
  "variant",
  "deck",
  "reverse",
  "maxSpeed",
  "gradeability",
  "battery",
  "motor",
  "payload",
];

function getCellValue(m: any, key: FieldKey): string {
  const s = (SPECS as any)[m.code] || {};
  switch (key) {
    case "model":
      return m.name;
    case "guidance":
      return m.guidance ?? "—";
    case "seats":
      return m.seats ?? "—";
    case "variant":
      return m.variant ?? "—";
    case "deck":
      return m.deck ?? "—";
    case "reverse":
      return m.reverse ? "Yes" : "No";
    default:
      return s?.[key] ?? "—";
  }
}

function findDiffColumns(headers: ReadonlyArray<FieldKey>, list: any[]): Set<FieldKey> {
  const diffs = new Set<FieldKey>();
  headers.forEach((h) => {
    if (h === "model") return;
    const values = list.map((m) => getCellValue(m, h));
    const allSame = values.every((v) => v === values[0]);
    if (!allSame) diffs.add(h);
  });
  return diffs;
}

/** -------------------------------
 *  Component
 * --------------------------------*/
export default function CompareTable() {
  useEffect(() => {
    trackEvent("compare_view");
  }, []);

  const models = useMemo(() => MODELS, []);
  const [tip, setTip] = useState<TipState>({ show: false, x: 0, y: 0 });
  const tipId = "compare-tip";

  // 데스크탑: 차이만 보기
  const [showDiffOnly, setShowDiffOnly] = useState(false);
  const diffCols = useMemo(() => findDiffColumns(DESKTOP_HEADERS, models), [models]);

  const visibleHeaders = useMemo<ReadonlyArray<FieldKey>>(
    () => (showDiffOnly ? DESKTOP_HEADERS.filter((h) => h === "model" || diffCols.has(h)) : DESKTOP_HEADERS),
    [showDiffOnly, diffCols]
  );

  // 모바일: 핀 & 미니 비교
  const [pinned, setPinned] = useState<string[]>([]);
  const [showMini, setShowMini] = useState(false);

  // ✅ 하단 UI 충돌 방지: 핀 개수/미니 비교 상태 브로드캐스트
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("compare:pinned", { detail: { count: pinned.length } } as any));
  }, [pinned]);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("compare:mini", { detail: { open: showMini } } as any));
  }, [showMini]);
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent("compare:pinned", { detail: { count: 0 } } as any));
      window.dispatchEvent(new CustomEvent("compare:mini", { detail: { open: false } } as any));
    };
  }, []);

  const togglePin = (code: string) => {
    setPinned((cur) => {
      if (cur.includes(code)) return cur.filter((c) => c !== code);
      if (cur.length >= 2) return [cur[1], code];
      return [...cur, code];
    });
  };

  const onRowActivate = (code: string, name: string) => {
    openModel(code);
    trackEvent("compare_row_click", { code, name });
  };

  const tableWrapperRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      id="compare"
      className="py-16 bg-zinc-50 text-black border-t border-zinc-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-800"
    >
      <div className="max-w-6xl mx-auto px-5">
        <h3 className="text-2xl font-bold">Compare Models</h3>

        {/* ---------------- Mobile: 카드 + Pin ---------------- */}
        <div className="mt-6 md:hidden space-y-3">
          {models.map((m) => {
            const s = (SPECS as any)[m.code] || {};
            return (
              <article
                key={m.code}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => (openModel(m.code), trackEvent("compare_card_open", { code: m.code }))}
                  aria-label={`Open ${m.name} details`}
                  className="block w-full text-left"
                >
                  <div className="p-4">
                    <header className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-base font-semibold">{m.name}</h4>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300">
                          {m.guidance} • {m.seats} seats {m.deck ? `• ${m.deck} deck` : ""} {m.variant ? `• ${m.variant}` : ""}{" "}
                          {m.reverse ? "• Reverse Seating" : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline text-[11px] text-zinc-500 dark:text-zinc-400">{s.modelNo || "—"}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePin(m.code);
                            trackEvent("compare_pin_toggle", { code: m.code });
                          }}
                          className={[
                            "px-3 py-1.5 rounded-full text-xs font-semibold border",
                            pinned.includes(m.code)
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200",
                          ].join(" ")}
                          aria-pressed={pinned.includes(m.code)}
                        >
                          {pinned.includes(m.code) ? "Pinned" : "Pin"}
                        </button>
                      </div>
                    </header>

                    {/* 하이라이트 스펙 칩 */}
                    <ul className="mt-3 flex flex-wrap gap-2 text-[12px]">
                      {[
                        ["Max", s.maxSpeed ?? "—"],
                        ["Grade", s.gradeability ?? "—"],
                        ["Battery", s.battery ?? "—"],
                      ].map(([k, v]) => (
                        <li
                          key={String(k)}
                          className="rounded-full border px-2.5 py-1 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200"
                        >
                          {k}: {v as string}
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              </article>
            );
          })}
        </div>

        {/* 모바일 핀 트레이 - safe-area 하단 보정 */}
        {pinned.length > 0 && (
          <div className="md:hidden fixed left-0 right-0 z-40" style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}>
            <div className="mx-auto max-w-6xl px-5">
              <div className="flex items-center gap-2 rounded-2xl bg-black text-white dark:bg-white dark:text-black px-4 py-3 shadow-lg">
                <div className="text-sm font-semibold">{pinned.length} selected</div>
                <div className="ml-auto flex items-center gap-2">
                  <button onClick={() => setPinned([])} className="text-xs underline decoration-1 opacity-80 hover:opacity-100">
                    Clear
                  </button>
                  <button
                    onClick={() => {
                      if (pinned.length === 0) return;
                      setShowMini(true);
                      trackEvent("compare_tray_open", { pinned: pinned.join(",") });
                    }}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-black dark:bg.black dark:text-white"
                  >
                    Compare
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 미니 비교 시트 */}
        {showMini && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/70 p-4" onClick={() => setShowMini(false)}>
            <div
              className="max-w-6xl mx-auto bg-white dark:bg-zinc-950 rounded-2xl p-4"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Quick Compare</h4>
                <button
                  onClick={() => setShowMini(false)}
                  aria-label="Close"
                  className="w-9 h-9 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 inline-grid place-items-center"
                >
                  ✕
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {pinned.slice(0, 2).map((code) => {
                  const m = (MODELS as any).find((x: any) => x.code === code);
                  const s = (SPECS as any)[code] || {};
                  if (!m) return null;
                  return (
                    <div key={code} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3">
                      <div className="text-sm font-semibold">{m.name}</div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">
                        {m.guidance} • {m.seats} seats
                      </div>
                      <ul className="mt-2 space-y-1 text-sm">
                        {MOBILE_KEYS.map((k) => {
                          const label = HEADER_LABEL[k];
                          const val = getCellValue(m, k);
                          return (
                            <li key={k} className="flex justify-between gap-2">
                              <span className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{label}</span>
                              <span className="text-right">{Array.isArray(val) ? (val as any).join(", ") : String(val)}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowMini(false);
                    setPinned([]);
                  }}
                  className="px-3 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const first = pinned[0];
                    window.dispatchEvent(
                      new CustomEvent("lead:open", { detail: { source: "Mobile Compare", modelCode: first } } as any)
                    );
                    setShowMini(false);
                  }}
                  className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold dark:bg-white dark:text-black"
                >
                  Talk to Sales
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- Desktop ---------------- */}
        <div className="hidden md:flex items-center justify-between mt-6">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Scroll horizontally to see all specs</div>
          <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              className="accent-black dark:accent-white"
              checked={showDiffOnly}
              onChange={(e) => {
                setShowDiffOnly(e.target.checked);
                trackEvent("compare_diff_toggle", { on: e.target.checked });
              }}
            />
            <span className="text-zinc-700 dark:text-zinc-200">Show differences only</span>
          </label>
        </div>

        <div className="mt-3 hidden md:block relative" ref={tableWrapperRef}>
          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-zinc-50 dark:from-zinc-900 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-zinc-50 dark:from-zinc-900 to-transparent" />

          <div className="overflow-x-auto" aria-describedby={tip.show ? tipId : undefined}>
            <table className="min-w-[1200px] w-full text-sm border-collapse">
              <thead className="sticky top-0 z-20">
                <tr className="bg-zinc-50 dark:bg-zinc-900">
                  {visibleHeaders.map((h) => (
                    <th
                      key={h}
                      className="py-3 px-3 text-left text-zinc-600 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800"
                      scope="col"
                    >
                      {HEADER_LABEL[h]}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {models.map((m: any, idx: number) => {
                  const tipContent = buildTip(m.code);
                  return (
                    <tr
                      key={m.code}
                      className={[
                        "border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer",
                        idx % 2 ? "bg-white/50 dark:bg-transparent" : "",
                      ].join(" ")}
                      tabIndex={0}
                      role="button"
                      aria-label={`Open ${m.name} details`}
                      onClick={() => onRowActivate(m.code, m.name)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onRowActivate(m.code, m.name);
                        }
                      }}
                      onMouseEnter={(e) =>
                        setTip({
                          show: true,
                          x: e.clientX,
                          y: e.clientY,
                          code: m.code,
                          content: tipContent,
                          viaKeyboard: false,
                        })
                      }
                      onMouseMove={(e) => setTip((t) => (t.show ? { ...t, x: e.clientX, y: e.clientY } : t))}
                      onMouseLeave={() => setTip({ show: false, x: 0, y: 0 })}
                      onFocus={(e) => {
                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                        setTip({
                          show: true,
                          x: rect.right - 12,
                          y: rect.top + rect.height / 2,
                          code: m.code,
                          content: tipContent,
                          viaKeyboard: true,
                        });
                      }}
                      onBlur={() => setTip({ show: false, x: 0, y: 0 })}
                    >
                      {visibleHeaders.map((h) => (
                        <td key={h} className="py-3 px-3 whitespace-nowrap">
                          {getCellValue(m, h)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tooltip */}
        {tip.show && (
          <div
            id={tipId}
            className="pointer-events-none fixed z-30 max-w-[80vw] md:max-w-md px-3 py-2 rounded-lg shadow-lg
                        text-xs md:text-sm leading-relaxed
                        bg-white text-black dark:bg-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700"
            style={{
              left: Math.min(tip.x + 14, window.innerWidth - 16),
              top: Math.min(tip.y + 14, window.innerHeight - 16),
            }}
            role="tooltip"
          >
            {tip.content}
          </div>
        )}

        {/* 하단 CTA */}
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
    </section>
  );
}

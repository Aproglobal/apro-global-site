// src/components/CompareTable.tsx
import React, { useMemo } from "react";
import { MODELS, type ModelSpec } from "../data/models";
import { openLead } from "./LeadModal";
import { trackEvent } from "../services/analytics";

function thumbSrc(code: string) {
  // If you later add dedicated thumbs, change to `${code}_1-thumb.jpg`
  return `/models/${code}_1.jpg`;
}

type Col = {
  key: string;
  header: string;
  get: (m: ModelSpec) => React.ReactNode;
  align?: "left" | "center" | "right";
};

const COLS: Col[] = [
  {
    key: "title",
    header: "Model",
    get: (m) => (
      <div className="flex items-center gap-3">
        <div className="w-16 h-10 overflow-hidden rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
          <img
            src={thumbSrc(m.code)}
            alt={m.name}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.visibility = "hidden")}
          />
        </div>
        <div className="min-w-0">
          <div className="font-semibold truncate">{m.name}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{m.code.toUpperCase()}</div>
        </div>
      </div>
    ),
  },
  { key: "seats", header: "Seats", get: (m) => (m.seats ?? "-") as any, align: "center" },
  { key: "deck", header: "Deck", get: (m) => m.deck ?? "-", align: "center" },
  { key: "guidance", header: "Guidance", get: (m) => m.guidance ?? "-", align: "center" },
  { key: "variant", header: "Variant", get: (m) => m.variant ?? "-", align: "center" },
  { key: "reverse", header: "Reverse Seat", get: (m) => (m.reverse ? "Yes" : "-"), align: "center" },
  {
    key: "actions",
    header: "",
    get: (m) => (
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => {
            openLead(`Compare ${m.code}`, { modelCode: m.code });
            trackEvent("compare_talk_to_sales", { code: m.code });
          }}
          className="px-3 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs"
        >
          Talk to Sales
        </button>
        <a
          href={`/specs/${m.code}.pdf`}
          onClick={() => trackEvent("compare_spec_download", { code: m.code })}
          className="px-3 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-800 dark:text-zinc-200"
        >
          Specs
        </a>
      </div>
    ),
    align: "right",
  },
];

export default function CompareTable() {
  const models = useMemo(() => MODELS, []);
  return (
    <section id="compare" aria-label="Compare Models" className="py-2">
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Compare Models</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          A quick, image-forward comparison. Thumbnails sit next to model names for instant recognition.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              {COLS.map((c) => (
                <th
                  key={c.key}
                  className={`py-3 px-3 font-semibold text-left ${c.align === "center" ? "text-center" : ""} ${c.align === "right" ? "text-right" : ""}`}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr key={m.code} className="border-b border-zinc-100 dark:border-zinc-900/60 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                {COLS.map((c) => (
                  <td
                    key={c.key}
                    className={`py-3 px-3 align-middle ${c.align === "center" ? "text-center" : ""} ${c.align === "right" ? "text-right" : ""}`}
                  >
                    {c.get(m)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

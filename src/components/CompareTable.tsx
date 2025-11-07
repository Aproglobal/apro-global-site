// src/components/CompareTable.tsx
import React, { useMemo } from "react";
import { MODELS, type ModelSpec } from "../data/models";
import { openLead } from "./LeadModal";
import { trackEvent } from "../services/analytics";

function thumbSrc(code: string) {
  return `/models/${code}_1.jpg`; // update to *_thumb.jpg later if you add thumbs
}

type Row = {
  key: string;
  label: string;
  get: (m: ModelSpec) => React.ReactNode;
  align?: "left" | "center" | "right";
};

const ROWS: Row[] = [
  { key: "seats", label: "Seats", get: (m) => m.seats ?? "-", align: "center" },
  { key: "deck", label: "Deck", get: (m) => m.deck ?? "-", align: "center" },
  { key: "guidance", label: "Guidance", get: (m) => m.guidance ?? "-", align: "center" },
  { key: "variant", label: "Variant", get: (m) => m.variant ?? "-", align: "center" },
  { key: "reverse", label: "Reverse Seat", get: (m) => (m.reverse ? "Yes" : "-"), align: "center" },
  // add more rows here if your ModelSpec has them (battery, wheelbase, etc.)
];

export default function CompareTable() {
  const models = useMemo(() => MODELS, []);

  return (
    <section id="compare" aria-label="Compare Models" className="py-2">
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Compare Models</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Rotate the table: models appear as columns. Column headers include thumbnails for quick recognition.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[880px]">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="sticky left-0 z-10 bg-white dark:bg-black py-3 px-3 text-left font-semibold w-[180px]">
                Feature
              </th>
              {models.map((m) => (
                <th
                  key={m.code}
                  className="py-3 px-3 text-left font-semibold min-w-[220px]"
                >
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
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {ROWS.map((r, idx) => (
              <tr key={r.key} className={`border-b ${idx % 2 === 0 ? "bg-transparent" : "bg-zinc-50/50 dark:bg-zinc-900/30"} border-zinc-100 dark:border-zinc-900/60`}>
                <th className="sticky left-0 z-10 bg-inherit py-3 px-3 text-left font-medium w-[180px]">
                  {r.label}
                </th>
                {models.map((m) => (
                  <td
                    key={`${r.key}-${m.code}`}
                    className={`py-3 px-3 ${r.align === "center" ? "text-center" : ""} ${r.align === "right" ? "text-right" : ""}`}
                  >
                    {r.get(m)}
                  </td>
                ))}
              </tr>
            ))}

            {/* Actions row */}
            <tr className="border-b border-zinc-100 dark:border-zinc-900/60">
              <th className="sticky left-0 z-10 bg-inherit py-3 px-3 text-left font-medium w-[180px]">Actions</th>
              {models.map((m) => (
                <td key={`actions-${m.code}`} className="py-3 px-3">
                  <div className="flex gap-2">
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
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

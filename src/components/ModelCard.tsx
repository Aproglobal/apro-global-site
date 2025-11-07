import React from 'react';
import { ModelSpec } from '../data/models';
import { openLead } from './LeadModal';
import { openModel } from './ModelDetail';

export default function ModelCard({ model }: { model: ModelSpec }) {
  return (
    <div className="group rounded-2xl overflow-hidden border bg-white border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950">
      <buttonimport React from "react";
import { ModelSpec } from "../data/models";
import { openLead } from "./LeadModal";
import { openModel } from "./ModelDetail";
import { MessageSquare, FileDown } from "lucide-react";

export default function ModelCard({ model }: { model: ModelSpec }) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-white border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950">
      <button
        className="w-full text-left"
        onClick={() => openModel(model.code)}
        aria-label={`Open ${model.name}`}
      >
        <div className="aspect-[16/9] bg-zinc-200 dark:bg-black">
          <img
            src={`/models/${model.code}_1.jpg`}
            alt={model.name}
            className="h-full w-full object-cover opacity-95 transition group-hover:opacity-100"
          />
        </div>
      </button>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-black dark:text-white">{model.name}</h3>
        <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">
          {model.guidance} • {model.seats} seats {model.deck ? `• ${model.deck} deck` : ""}{" "}
          {model.variant ? `• ${model.variant}` : ""} {model.reverse ? "• Reverse Seating" : ""}
        </p>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => openLead(`Model ${model.code}`, { modelCode: model.code })}
            className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90
                       dark:bg-white dark:text-black"
          >
            <MessageSquare className="h-4 w-4" />
            Talk to Sales
          </button>

          <a
            href={`/specs/${model.code}.pdf`}
            onClick={() =>
              (window as any).trackEvent &&
              (window as any).trackEvent("spec_download", { code: model.code })
            }
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-100
                       dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            <FileDown className="h-4 w-4" />
            Download specs
          </a>
        </div>
      </div>
    </div>
  );
}

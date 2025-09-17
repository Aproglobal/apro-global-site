import React from 'react';
import { ModelSpec } from '../data/models';
import { openLead } from './LeadModal';
import { openModel } from './ModelDetail';

export default function ModelCard({ model }: { model: ModelSpec }) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
      <button className="w-full text-left"
        onClick={() => openModel(model.code)}
        aria-label={`Open ${model.name}`}>
        <div className="aspect-[16/9] bg-black">
          <img src={`/models/${model.code}_1.jpg`} alt={model.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition" />
        </div>
      </button>
      <div className="p-5">
        <h3 className="text-white text-lg font-semibold">{model.name}</h3>
        <p className="text-zinc-400 text-sm mt-1">
          {model.guidance} • {model.seats} seats {model.deck ? `• ${model.deck} deck` : ''} {model.variant ? `• ${model.variant}` : ''} {model.reverse ? '• Reverse Seating' : ''}
        </p>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => openLead(`Model ${model.code}`)}
            className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200"
          >
            Talk to Sales
          </button>
          <a
            href={`/specs/${model.code}.pdf`}
            onClick={() => (window as any).trackEvent && (window as any).trackEvent('spec_download', { code: model.code })}
            className="px-4 py-2 rounded-full border border-zinc-700 text-zinc-200 text-sm hover:bg-zinc-900"
          >
            Download specs
          </a>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useMemo, useState } from 'react';
import { MODELS, type ModelSpec } from '../data/models';
import { trackEvent } from '../services/analytics';
import { openLead } from './LeadModal';
import { SPECS, SPEC_LABELS, type DetailedSpecs } from '../data/specs';

let openRef: (code: string) => void = () => {};

export function openModel(code: string) {
  openRef(code);
}

function imagesFor(code: string) {
  return [`/models/${code}_1.jpg`, `/models/${code}_2.jpg`];
}

const ORDER: (keyof DetailedSpecs)[] = [
  'guidance',
  'seating',
  'deck',
  'reverseSeating',
  'dimensions',
  'wheelbase',
  'curbWeight',
  'battery',
  'motor',
  'maxSpeed',
  'gradeability',
  'range',
  'payload',
  'charging',
  'options',
];

function renderValue(v: unknown) {
  if (v === undefined || v === null || v === '') return '—';
  if (Array.isArray(v)) return v.join(', ');
  return String(v);
}

export default function ModelDetail() {
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState<ModelSpec | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    openRef = (code: string) => {
      const m = MODELS.find((x) => x.code === code) || null;
      setModel(m);
      setImgIdx(0);
      setOpen(!!m);
      if (m) trackEvent('model_view', { code: m.code, name: m.name });
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const spec = useMemo(() => (model ? SPECS[model.code] || {} : {}), [model]);

  if (!open || !model) return null;

  const imgs = imagesFor(model.code);
  const specHref = `/specs/${model.code}.pdf`;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className="w-full max-w-5xl rounded-2xl bg-white text-black shadow-xl overflow-hidden relative dark:bg-zinc-900 dark:text-white"
          role="dialog"
          aria-modal="true"
          aria-labelledby="model-detail-title"
        >
          {/* 닫기(X) 버튼 */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close dialog"
            title="Close"
            className="absolute right-3 top-3 inline-grid h-9 w-9 place-items-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-zinc-500" />
            </svg>
          </button>

          <div className="grid md:grid-cols-2">
            <div className="relative bg-black">
              <img src={imgs[imgIdx]} alt={model.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {imgs.map((_, i) => (
                  <button
                    key={i}
                    aria-label={'thumb' + i}
                    onClick={() => setImgIdx(i)}
                    className={`w-2 h-2 rounded-full ${i === imgIdx ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </div>

            <div className="p-6">
              <h3 id="model-detail-title" className="text-xl font-bold">{model.name}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">
                {model.guidance} • {model.seats} seats {model.deck ? `• ${model.deck} deck` : ''}{' '}
                {model.variant ? `• ${model.variant}` : ''} {model.reverse ? '• Reverse Seating' : ''}
              </p>

              <div className="mt-4">
                <table className="w-full text-sm">
                  <tbody>
                    {ORDER.map((key) => {
                      const label = SPEC_LABELS[key];
                      // @ts-ignore tolerate missing keys
                      const value =
                        spec?.[key] ?? (key === 'reverseSeating' ? (model.reverse ? 'Yes' : 'No') : undefined);
                      if (value === undefined) return null;
                      return (
                        <tr key={key} className="border-t border-zinc-200 dark:border-zinc-800">
                          <td className="py-2 pr-3 text-zinc-500 dark:text-zinc-400 w-40">{label}</td>
                          <td className="py-2">{renderValue(value)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => openLead(`Model Detail ${model.code}`)}
                  className="px-5 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
                >
                  Talk to Sales
                </button>
                <a
                  href={specHref}
                  onClick={() => trackEvent('spec_download', { code: model.code })}
                  className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-700"
                >
                  Download specs (PDF)
                </a>
              </div>

              <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                To edit this table: open <code>src/data/specs.ts</code> and update <code>SPECS['{model.code}']</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useEffect, useState, useMemo } from 'react';
import { MODELS, ModelSpec } from '../data/models';
import { trackEvent } from '../services/analytics';
import { openLead } from './LeadModal';
import { SPECS, SPEC_LABELS, DetailedSpecs } from '../data/specs';

let openRef: (code: string) => void = () => {};

export function openModel(code: string) {
  openRef(code);
}

function imagesFor(code: string) {
  return [`/models/${code}_1.jpg`, `/models/${code}_2.jpg`];
}

const ORDER: (keyof DetailedSpecs)[] = [
  'guidance','seating','deck','reverseSeating',
  'dimensions','wheelbase','curbWeight',
  'battery','motor','maxSpeed','gradeability','range','payload','charging',
  'options'
];

function renderValue(v: any) {
  if (!v) return '—';
  if (Array.isArray(v)) return v.join(', ');
  return v;
}

export default function ModelDetail() {
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState<ModelSpec | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    openRef = (code: string) => {
      const m = MODELS.find(x => x.code === code) || null;
      setModel(m);
      setImgIdx(0);
      setOpen(!!m);
      if (m) trackEvent('model_view', { code: m.code, name: m.name });
    };
  }, []);

  const spec = useMemo(() => (model ? SPECS[model.code] || {} : {}), [model]);

  if (!open || !model) return null;

  const imgs = imagesFor(model.code);
  const specHref = `/specs/${model.code}.pdf`;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl rounded-2xl bg-white shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative bg-black">
              <img src={imgs[imgIdx]} alt={model.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {imgs.map((_, i) => (
                  <button key={i} aria-label={'thumb' + i}
                    onClick={() => setImgIdx(i)}
                    className={\`w-2 h-2 rounded-full \${i===imgIdx?'bg-white':'bg-white/50'}\`} />
                ))}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold">{model.name}</h3>
              <p className="text-sm text-zinc-600 mt-1">
                {model.guidance} • {model.seats} seats {model.deck ? \`• \${model.deck} deck\` : ''} {model.variant ? \`• \${model.variant}\` : ''} {model.reverse ? '• Reverse Seating' : ''}
              </p>

              <div className="mt-4">
                <table className="w-full text-sm">
                  <tbody>
                    {ORDER.map((key) => {
                      const label = SPEC_LABELS[key];
                      // @ts-ignore tolerate bad key in seed data
                      const value = spec?.[key] ?? (key === 'reverseSeating' && (model.reverse ? 'Yes' : 'No'));
                      if (value === undefined) return null;
                      return (
                        <tr key={key} className="border-t">
                          <td className="py-2 pr-3 text-zinc-500 w-40">{label}</td>
                          <td className="py-2">{renderValue(value)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={() => openLead(\`Model Detail \${model.code}\`)} className="px-5 py-3 rounded-full bg-black text-white font-semibold">
                  Talk to Sales
                </button>
                <a
                  href={specHref}
                  onClick={() => trackEvent('spec_download', { code: model.code })}
                  className="px-5 py-3 rounded-full border"
                >
                  Download specs (PDF)
                </a>
              </div>

              <p className="mt-3 text-xs text-zinc-500">
                To edit this table: open <code>src/data/specs.ts</code> and update the <code>SPECS['{model.code}']</code> object.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

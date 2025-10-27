// src/components/CompareTable.tsx
import React, { useEffect, useState } from 'react';
import { MODELS } from '../data/models';
import { SPECS } from '../data/specs';
import { trackEvent } from '../services/analytics';
import { openModel } from './ModelDetail';

type TipState = {
  show: boolean;
  x: number;
  y: number;
  code?: string;
  content?: string;
  viaKeyboard?: boolean;
};

function buildTip(code: string): string {
  const s = SPECS[code] || {};
  const rows = [
    s.modelNo ? `Model No.: ${s.modelNo}` : undefined,
    s.dimensions ? `Size: ${s.dimensions}` : undefined,
    s.wheelbase ? `Wheelbase: ${s.wheelbase}` : undefined,
    s.curbWeight ? `Curb: ${s.curbWeight}` : undefined,
    s.battery ? `Battery: ${s.battery}` : undefined,
    s.motor ? `Motor: ${s.motor}` : undefined,
    s.suspension ? `Suspension: ${s.suspension}` : undefined,
    s.brakes || s.parkingBrake ? `Brakes: ${[s.brakes, s.parkingBrake ? `+ ${s.parkingBrake}` : undefined].filter(Boolean).join(' ')}` : undefined,
    s.maxSpeed ? `Speed: ${s.maxSpeed}` : undefined,
    s.gradeability ? `Grade: ${s.gradeability}` : undefined,
    s.payload ? `Payload: ${s.payload}` : undefined,
    s.cargoBed ? `Cargo bed: ${s.cargoBed}` : undefined,
    s.options?.length ? `Options: ${s.options.slice(0, 3).join(', ')}${s.options.length > 3 ? '…' : ''}` : undefined,
  ].filter(Boolean);
  return rows.length ? rows.join(' • ') : 'Specs coming soon';
}

export default function CompareTable() {
  useEffect(() => {
    trackEvent('compare_view');
  }, []);

  const [tip, setTip] = useState<TipState>({ show: false, x: 0, y: 0 });

  const onRowActivate = (code: string, name: string) => {
    openModel(code);
    trackEvent('compare_row_click', { code, name });
  };

  const headers = [
    'Model',
    'Model No.',
    'Guidance',
    'Seats',
    'Variant',
    'Deck',
    'Reverse',
    'Max speed',
    'Grade',
    'Battery',
    'Motor',
    'Dimensions (L×W×H)',
    'Payload',
  ];

  return (
    <section
      id="compare"
      className="py-16 bg-zinc-50 text-black border-t border-zinc-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-800"
    >
      <div className="max-w-6xl mx-auto px-5 relative">
        <h3 className="text-2xl font-bold">Compare Models</h3>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-[1200px] w-full text-sm border-collapse">
            <thead>
              <tr>
                {headers.map((h) => (
                  <th
                    key={h}
                    className="py-3 px-3 text-left text-zinc-600 dark:text-zinc-300 sticky top-0 bg-zinc-50 dark:bg-zinc-900 z-10"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODELS.map((m: (typeof MODELS)[number], idx) => {
                const s = SPECS[m.code] || {};
                const tipContent = buildTip(m.code);
                return (
                  <tr
                    key={m.code}
                    className={`border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer ${
                      idx % 2 ? 'bg-white/50 dark:bg-transparent' : ''
                    }`}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open ${m.name} details`}
                    onClick={() => onRowActivate(m.code, m.name)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
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
                    onMouseMove={(e) =>
                      setTip((t) => (t.show ? { ...t, x: e.clientX, y: e.clientY } : t))
                    }
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
                    <td className="py-3 px-3 font-medium whitespace-nowrap">{m.name}</td>
                    <td className="py-3 px-3 whitespace-nowrap">{s.modelNo ?? '-'}</td>
                    <td className="py-3 px-3 whitespace-nowrap">{m.guidance}</td>
                    <td className="py-3 px-3 whitespace-nowrap">{m.seats}</td>
                    <td className="py-3 px-3 whitespace-nowrap">{m.variant ?? '-'}</td>
                    <td className="py-3 px-3 whitespace-nowrap">{m.deck ?? '-'}</td>
                    <td className="py-3 px-3 whitespace-nowrap">{m.reverse ? 'Yes' : 'No'}</td>
                    <td className="py-3 px-3 whitespace-nowrap">{s.maxSpeed ?? '-'}</td>
                    <td className="py-3 px-3 whitespace-nowrap">{s.gradeability ?? '-'}</td>
                    <td className="py-3 px-3 whitespace-nowrap">{s.battery ?? '-'}</td>
                    <td className="py-3 px-3 whitespace-nowrap">{s.motor ?? '-'}</td>
                    <td className="py-3 px-3 whitespace-nowrap">{s.dimensions ?? '-'}</td>
                    <td className="py-3 px-3 whitespace-nowrap">{s.payload ?? '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Tooltip */}
        {tip.show && (
          <div
            className="pointer-events-none fixed z-30 max-w-[80vw] md:max-w-md px-3 py-2 rounded-lg shadow-lg
                        text-xs md:text-sm leading-relaxed
                        bg-white text-black dark:bg-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700"
            style={{
              left: Math.min(tip.x + 14, window.innerWidth - 16),
              top: Math.min(tip.y + 14, window.innerHeight - 16),
              transform: 'translate(-0%, -0%)',
            }}
            role="status"
            aria-live="polite"
          >
            {tip.content}
          </div>
        )}

        <div className="mt-6">
          <a
            href="#contact"
            onClick={() => trackEvent('cta_click', { where: 'compare', label: 'Download full brochure' })}
            className="inline-block px-5 py-3 rounded-lg font-medium bg-black text-white hover:opacity-90 dark:bg-white dark:text-black"
          >
            Download full brochure
          </a>
        </div>
      </div>
    </section>
  );
}

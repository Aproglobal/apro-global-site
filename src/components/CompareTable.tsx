import React, { useEffect } from 'react';
import { MODELS } from '../data/models';
import { trackEvent } from '../services/analytics';
import { openModel } from './ModelDetail';

export default function CompareTable() {
  useEffect(() => {
    trackEvent('compare_view');
  }, []);

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

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-[720px] w-full text-sm border-collapse">
            <thead>
              <tr>
                {['Model', 'Guidance', 'Seats', 'Variant', 'Deck', 'Reverse'].map((h) => (
                  <th
                    key={h}
                    className="py-3 pr-4 text-left text-zinc-600 dark:text-zinc-300 sticky top-0 bg-zinc-50 dark:bg-zinc-900 z-10"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODELS.map((m: (typeof MODELS)[number], idx) => (
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
                >
                  <td className="py-3 pr-4 font-medium">{m.name}</td>
                  <td className="py-3 pr-4">{m.guidance}</td>
                  <td className="py-3 pr-4">{m.seats}</td>
                  <td className="py-3 pr-4">{m.variant ?? '-'}</td>
                  <td className="py-3 pr-4">{m.deck ?? '-'}</td>
                  <td className="py-3 pr-4">{m.reverse ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

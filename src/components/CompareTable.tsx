import React, { useEffect } from 'react';
import { MODELS } from '../data/models';
import { trackEvent } from '../services/analytics';

export default function CompareTable() {
  useEffect(() => {
    trackEvent('compare_view');
  }, []);

  return (
    <section
      id="compare"
      className="py-16 bg-zinc-50 text-black border-t border-zinc-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-800"
    >
      <div className="max-w-6xl mx-auto px-5">
        <h3 className="text-2xl font-bold">Compare Models</h3>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-[720px] w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-600 dark:text-zinc-300">
                <th className="py-3 pr-4">Model</th>
                <th className="py-3 pr-4">Guidance</th>
                <th className="py-3 pr-4">Seats</th>
                <th className="py-3 pr-4">Variant</th>
                <th className="py-3 pr-4">Deck</th>
                <th className="py-3 pr-4">Reverse</th>
              </tr>
            </thead>
            <tbody>
              {MODELS.map((m: (typeof MODELS)[number]) => (
                <tr key={m.code} className="border-t border-zinc-200 dark:border-zinc-800">
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

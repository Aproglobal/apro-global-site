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
};import React from "react";

type Row = { key: string; g2: string; g3: string; vip?: string };

const ROWS: Row[] = [
  { key: "Seats", g2: "4–5", g3: "5", vip: "5" },
  { key: "Battery", g2: "LiFePO₄", g3: "LiFePO₄", vip: "LiFePO₄" },
  { key: "Range", g2: "up to 36 holes", g3: "up to 36 holes", vip: "up to 36 holes" },
];

export const CompareTable: React.FC = () => {
  return (
    <section id="compare" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-semibold">Model Comparison</h2>
      <div className="mt-6 overflow-x-auto rounded-2xl border">
        <table className="min-w-[720px] w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 text-sm text-gray-500">Spec</th>
              <th className="px-4 py-3 font-semibold">G2</th>
              <th className="px-4 py-3 font-semibold">G3</th>
              <th className="px-4 py-3 font-semibold">VIP</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.key} className="border-t">
                <td className="px-4 py-3 text-sm text-gray-600">{r.key}</td>
                <td className="px-4 py-3">{r.g2}</td>
                <td className="px-4 py-3">{r.g3}</td>
                <td className="px-4 py-3">{r.vip ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CompareTable;

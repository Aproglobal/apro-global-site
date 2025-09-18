// src/components/CompareTable.tsx
import React from "react";

/**
 * CompareTable
 * - 배경/텍스트 색을 명시(bg-white, text-neutral-900)해서
 *   상위에서 text-white가 상속되어도 안전하게 보이도록 처리.
 * - 표 가독성을 위해 thead/td 패딩 및 보더, zebra-striping 추가.
 * - 필요 시 실제 스펙 데이터로 교체(현재는 예시 값).
 */
export default function CompareTable() {
  return (
    <section id="models" className="w-full bg-white text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl font-bold">Compare Models</h2>
        <p className="mt-2 text-sm text-neutral-600">
          주요 사양을 한눈에 비교하세요. (실제 사양/옵션은 현장/발주 조건에 따라 달라질 수 있습니다)
        </p>

        {/* 카드 요약 (선택) */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold">G2 VIP 6-Seater</h3>
            <ul className="mt-3 space-y-1 text-sm text-neutral-800">
              <li>Battery: 51V 110Ah Li-ion</li>
              <li>Motor: AC 4.6 kW</li>
              <li>Seating: 6</li>
              <li>Reverse Seating: No</li>
              <li>Options: Canopy, Windscreen, Remote</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold">G2 Long Deck</h3>
            <ul className="mt-3 space-y-1 text-sm text-neutral-800">
              <li>Battery: 51V 110Ah Li-ion</li>
              <li>Motor: AC 4.6 kW</li>
              <li>Seating: 2</li>
              <li>Cargo: Long Deck</li>
              <li>Options: Canopy, Utility Box</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold">G3 Guidance</h3>
            <ul className="mt-3 space-y-1 text-sm text-neutral-800">
              <li>Battery: Li-ion</li>
              <li>Sensors: Ultrasonic / Magnet</li>
              <li>Guidance: Assisted</li>
              <li>Seating: 5/6 (옵션)</li>
              <li>Options: Remote, Safety Kit</li>
            </ul>
          </div>
        </div>

        {/* 상세 비교 표 */}
        <div id="specs" className="mt-12 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
          <table className="w-full table-auto text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-700">
                <th className="px-4 py-3">Model</th>
                <th className="px-4 py-3">Battery</th>
                <th className="px-4 py-3">Motor</th>
                <th className="px-4 py-3">Seating</th>
                <th className="px-4 py-3">Options</th>
              </tr>
            </thead>
            <tbody className="text-neutral-800">
              <tr className="border-b border-neutral-100">
                <td className="px-4 py-3 font-medium">G2 VIP 6-Seater</td>
                <td className="px-4 py-3">51V 110Ah Li-ion</td>
                <td className="px-4 py-3">AC 4.6 kW</td>
                <td className="px-4 py-3">6</td>
                <td className="px-4 py-3">Canopy, Windscreen, Remote</td>
              </tr>
              <tr className="border-b border-neutral-100 bg-neutral-50/50">
                <td className="px-4 py-3 font-medium">G2 Long Deck</td>
                <td className="px-4 py-3">51V 110Ah Li-ion</td>
                <td className="px-4 py-3">AC 4.6 kW</td>
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">Canopy, Utility Box</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">G3 Guidance</td>
                <td className="px-4 py-3">Li-ion</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">5/6</td>
                <td className="px-4 py-3">Remote, Safety Kit</td>
              </tr>
            </tbody>
          </table>
          <p className="px-4 pb-4 pt-2 text-xs text-neutral-500">
            * 사양은 안내 없이 변경될 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}

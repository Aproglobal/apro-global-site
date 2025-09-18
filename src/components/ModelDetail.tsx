// src/components/ModelDetail.tsx
import React, { useState } from "react";
import LeadModal from "./LeadModal";

interface ModelDetailProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  highlights?: string[];
  specs?: Record<string, string | number | null | undefined>;
  // 기존 코드에서 다른 prop을 넘겨도 에러 없도록
  [key: string]: any;
}

const ModelDetail: React.FC<ModelDetailProps> = ({
  title = "G2 VIP 6-Seater",
  subtitle = "Premium electric cart for golf & resort operations",
  imageSrc = "/models/g2-eg-vip-6_1.jpg",
  highlights = [
    "51V 110Ah Li-ion battery",
    "AC 4.6 kW motor",
    "Seating for 6",
    "Options: Canopy, Windscreen, Remote",
  ],
  specs = {
    Battery: "51V 110Ah Li-ion",
    Motor: "AC 4.6 kW",
    Seating: "6",
    Dimensions: "3200 × 1200 × 1900 mm",
  },
}) => {
  const [openLead, setOpenLead] = useState(false);

  return (
    <section className="w-full bg-white text-neutral-900">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-2">
        {/* Left: Image */}
        <div>
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <img
              src={imageSrc}
              alt={title}
              className="h-auto w-full object-cover"
              onError={(e) => ((e.currentTarget.style.opacity = "0"))}
            />
          </div>
        </div>

        {/* Right: Content */}
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-2 text-neutral-600">{subtitle}</p>

          {/* Highlights */}
          {highlights?.length ? (
            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-neutral-800">
              {highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          ) : null}

          {/* Specs */}
          {specs && Object.keys(specs).length ? (
            <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <table className="w-full table-auto text-left text-sm">
                <tbody className="divide-y divide-neutral-200">
                  {Object.entries(specs).map(([k, v]) => (
                    <tr key={k} className="hover:bg-neutral-50/60">
                      <th className="w-40 px-4 py-3 text-neutral-600">{k}</th>
                      <td className="px-4 py-3 text-neutral-900">
                        {v ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {/* CTA */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => setOpenLead(true)}
              className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Talk to Sales
            </button>
            <a
              href="#specs"
              className="rounded-full border border-neutral-300 px-5 py-3 text-sm font-medium hover:bg-neutral-50"
            >
              View Specs
            </a>
          </div>
        </div>
      </div>

      {/* Lead Modal */}
      <LeadModal open={openLead} onClose={() => setOpenLead(false)} />
    </section>
  );
};

export default ModelDetail;

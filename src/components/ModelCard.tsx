// src/components/ModelCard.tsx
import React, { useState } from "react";
import LeadModal from "./LeadModal";

interface ModelCardProps {
  title?: string;
  imageSrc?: string;
  caption?: string;
  bullets?: string[];
  onClickDetail?: () => void;
  // 기존 코드에서 다른 prop을 넘겨도 에러 없도록
  [key: string]: any;
}

const ModelCard: React.FC<ModelCardProps> = ({
  title = "G2 Long Deck",
  imageSrc = "/models/g2-long-deck_1.jpg",
  caption = "Utility-focused configuration with extended cargo deck",
  bullets = [
    "51V 110Ah Li-ion battery",
    "AC 4.6 kW motor",
    "Seating for 2",
    "Long deck for cargo",
  ],
  onClickDetail,
}) => {
  const [openLead, setOpenLead] = useState(false);

  return (
    <div className="group rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Image */}
      <div className="overflow-hidden rounded-xl border border-neutral-100">
        <img
          src={imageSrc}
          alt={title}
          className="h-44 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          onError={(e) => ((e.currentTarget.style.opacity = "0"))}
        />
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        <p className="mt-1 text-sm text-neutral-600">{caption}</p>

        {bullets?.length ? (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-800">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        ) : null}

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setOpenLead(true)}
            className="rounded-full bg-black px-4 py-2 text-sm text-white hover:opacity-90"
          >
            Talk to Sales
          </button>
          <button
            onClick={onClickDetail}
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
          >
            Details
          </button>
        </div>
      </div>

      {/* Lead Modal */}
      <LeadModal open={openLead} onClose={() => setOpenLead(false)} />
    </div>
  );
};

export default ModelCard;

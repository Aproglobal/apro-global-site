import React from "react";
import StageCarousel from "./StageCarousel";

export default function ServiceWarrantySection() {
  const slides = [
    {
      img: "/service/warranty-vehicle.jpg",
      title: "Vehicle Warranty",
      desc:
        "Comprehensive coverage for core vehicle systems. Extended coverage plans available for high-utilization fleets.",
      meta: "Coverage options vary by market",
    },
    {
      img: "/service/warranty-battery.jpg",
      title: "Battery Warranty",
      desc:
        "SK Mobile Energy lithium packs (in-house BMS / PACK / CELL) backed by a dedicated warranty and service process.",
      meta: "SK Mobile Energy • BMS/PACK/CELL",
    },
    {
      img: "/service/parts.jpg",
      title: "Genuine Parts & Logistics",
      desc:
        "Fast-moving spares stocked and shipped with tracking. Exploded diagrams and part codes for quick identification.",
      meta: "Global parts fulfillment",
    },
    {
      img: "/service/remote.jpg",
      title: "Remote & On-site Support",
      desc:
        "Troubleshooting, maintenance SOPs, and training. On-site support available for deployments and seasonal checks.",
      meta: "Training • SOP • On-site",
    },
  ];

  return (
    <div className="not-prose">
      <StageCarousel
        id="service-stage"
        title="Service & Warranty"
        note="Built for uptime—coverage, parts, and support that scale with your fleet."
        slides={slides}
      />
    </div>
  );
}

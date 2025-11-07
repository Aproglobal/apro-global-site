// src/components/ServiceWarrantyShowcase.tsx
import React from "react";
import StageCarousel, { StageItem } from "./StageCarousel";

export default function ServiceWarrantyShowcase() {
  const items: StageItem[] = [
    {
      img: "/assets/service/warranty.jpg",
      alt: "Warranty coverage",
      title: "Warranty Coverage",
      description:
        "Model-specific warranty terms with parts and labor support. Extended options available for fleets.",
    },
    {
      img: "/assets/service/maintenance.jpg",
      alt: "Maintenance program",
      title: "Maintenance Program",
      description:
        "Preventive schedules and quick diagnostics to reduce downtime and keep carts on course.",
    },
    {
      img: "/assets/service/parts.jpg",
      alt: "Parts & support",
      title: "Parts & Support",
      description:
        "Global parts access and trained service channels ensure your fleet runs season after season.",
    },
  ];

  return <StageCarousel items={items} ariaLabel="Service and warranty" />;
}

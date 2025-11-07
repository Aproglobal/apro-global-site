// src/components/ChargingPowerShowcase.tsx
import React from "react";
import StageCarousel, { StageItem } from "./StageCarousel";

export default function ChargingPowerShowcase() {
  const items: StageItem[] = [
    {
      img: "/assets/charging/ac.jpg",
      alt: "AC charging",
      title: "AC Charging",
      description:
        "On-board and off-board AC charging options for flexible overnight and turn-around needs.",
      kpis: [
        { label: "AC Input", value: "Regional" },
        { label: "On-board", value: "Optional" },
        { label: "Cycle Life", value: "Model-dependent" },
        { label: "Safety", value: "BMS protected" },
      ],
    },
    {
      img: "/assets/charging/dc.jpg",
      alt: "DC fast charging (if supported)",
      title: "Power Management",
      description:
        "Battery management safeguards pack health and balances cells for consistent performance.",
    },
    {
      img: "/assets/charging/storage.jpg",
      alt: "Energy storage & health",
      title: "Battery Health",
      description:
        "Thermal protections and smart cut-offs maintain longevity across seasons and usage patterns.",
    },
  ];

  return <StageCarousel items={items} ariaLabel="Charging and power" />;
}

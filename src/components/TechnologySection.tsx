// src/components/TechnologySection.tsx
import React from "react";
import StageCarousel, { StageItem } from "./StageCarousel";

export default function TechnologySection() {
  const items: StageItem[] = [
    {
      id: "safety",
      img: "/assets/tech/safety.jpg",
      alt: "Safety and sensing",
      title: "Safety & Sensing",
      subtitle: "Awareness that scales with your course",
      description:
        "Lighting, sensing and optional guidance improve visibility and course compliance, day or night.",
      kpis: [
        { label: "Lighting", value: "LED, DRL, Signals" },
        { label: "Sensing", value: "Proximity options" },
        { label: "Parking", value: "Electronic lock" },
        { label: "Compliance", value: "Regional options" },
      ],
    },
    {
      id: "body",
      img: "/assets/tech/body-storage.jpg",
      alt: "Body and storage",
      title: "Body & Storage",
      subtitle: "Design that works all day",
      description:
        "Durable body panels and practical storage choices—bags, coolers, and accessories—ready for fleet duty.",
      kpis: [
        { label: "Materials", value: "Impact-resistant" },
        { label: "Storage", value: "Configurable" },
        { label: "Seating", value: "VIP / Semi-VIP" },
        { label: "Deck", value: "Long / Short" },
      ],
    },
    {
      id: "service",
      img: "/assets/tech/service-updates.jpg",
      alt: "Service and updates",
      title: "Service & Updates",
      subtitle: "Keep fleets moving",
      description:
        "Modular components, diagnostics, and parts availability reduce downtime and streamline service windows.",
      kpis: [
        { label: "Diagnostics", value: "On-site" },
        { label: "Parts", value: "Global supply" },
        { label: "Updates", value: "Configurable" },
        { label: "Support", value: "Warranty + After-sales" },
      ],
    },
  ];

  return (
    <div>
      <StageCarousel
        items={items}
        ariaLabel="Technology features"
        controlsPosition="right"
      />
    </div>
  );
}

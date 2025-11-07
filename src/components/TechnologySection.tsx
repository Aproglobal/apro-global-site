// src/components/TechnologySection.tsx
import React, { useMemo } from "react";
import StageCarousel, { StageItem } from "./StageCarousel";
import TechFeatureTiles, { TechTile } from "./TechFeatureTiles";

export default function TechnologySection() {
  // Big one-at-a-time heroes (keep this concise, premium look)
  const heroItems: StageItem[] = [
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

  // Thumbnail feature grid (the pieces you mentioned like 12V vehicle charger)
  const tiles: TechTile[] = useMemo(
    () => [
      {
        img: "/assets/tech/12v-vehicle-charger.jpg",
        title: "12V Vehicle Charger",
        caption: "Charge accessory batteries safely from main pack",
      },
      {
        img: "/assets/tech/usb-ports.jpg",
        title: "USB-A / USB-C Ports",
        caption: "Front & rear device power, weather-protected",
      },
      {
        img: "/assets/tech/led-lighting.jpg",
        title: "LED Lighting Suite",
        caption: "DRL, indicators, and night visibility",
      },
      {
        img: "/assets/tech/proximity-sensor.jpg",
        title: "Proximity Sensing",
        caption: "Optional course compliance & safety alerts",
      },
      {
        img: "/assets/tech/guidance.jpg",
        title: "Guidance Module",
        caption: "Area limits & routing (where supported)",
      },
      {
        img: "/assets/tech/regen-brake.jpg",
        title: "Regen Braking",
        caption: "Energy recovery on descents",
      },
      {
        img: "/assets/tech/hill-hold.jpg",
        title: "Hill-Hold Logic",
        caption: "Confident starts on slopes",
      },
      {
        img: "/assets/tech/weather-enclosure.jpg",
        title: "Weather Enclosure",
        caption: "Rain/wind protection options",
      },
      // Add any other existing thumbnail items you were using:
      // cupholders, seat options, bag storage, cooler box, mirrors, etc.
    ],
    []
  );

  return (
    <div>
      {/* 1) Premium, one-at-a-time hero with arrows + numbers on the right */}
      <StageCarousel items={heroItems} ariaLabel="Technology features" controlsPosition="right" />

      {/* 2) Detailed Features (thumbnails) — restores the old grid you liked */}
      <TechFeatureTiles items={tiles} title="Detailed Features" />
    </div>
  );
}

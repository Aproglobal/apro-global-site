// src/components/IndustriesShowcase.tsx
import React from "react";
import StageCarousel, { StageItem } from "./StageCarousel";

export default function IndustriesShowcase() {
  const items: StageItem[] = [
    {
      img: "/assets/industries/golf.jpg",
      alt: "Golf course operations",
      title: "Golf Courses",
      description:
        "Course-ready fleets with guidance, charging, and maintenance workflows tailored for daily operations.",
    },
    {
      img: "/assets/industries/resort.jpg",
      alt: "Resort and hospitality",
      title: "Resorts & Hospitality",
      description:
        "Quiet, comfortable transport for guests, events, and VIP movements—custom branding available.",
    },
    {
      img: "/assets/industries/community.jpg",
      alt: "Campus and community",
      title: "Communities & Campuses",
      description:
        "Reliable mobility for campuses, logistics, and facilities with safety packages and storage options.",
    },
  ];

  return <StageCarousel items={items} ariaLabel="Industries served" />;
}

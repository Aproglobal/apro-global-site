// src/components/TechnologySection.tsx
import React, { useMemo } from "react";
import StageCarousel, { StageItem } from "./StageCarousel";
import TechFeatureTiles from "./TechFeatureTiles";
import { TECH_FEATURES } from "../data/tech_features";

/**
 * Premium layout:
 *  - One-at-a-time HUGE image (arrows + numbered pager at right corner)
 *  - Info below (title, subtitle/description, KPIs)
 *  - Then your original small tech tiles (from TECH_FEATURES) restored underneath
 */
export default function TechnologySection() {
  // Curate 1-row, click-to-advance hero items.
  // (Using existing /tech/* images you already have to avoid placeholders.)
  const heroItems: StageItem[] = useMemo(
    () => [
      {
        id: "powertrain",
        img: "/tech/01_motor.jpg",
        alt: "Powertrain & Battery",
        title: "Powertrain & Battery",
        subtitle: "Instant torque, efficient range",
        description:
          "High-output AC motor paired with lithium battery options. Confident hill starts, controlled descents, and energy recovery.",
        kpis: [
          { label: "Motor", value: "AC 4.6 kW" },
          { label: "Braking", value: "Regen + Hydraulic" },
          { label: "Charging", value: "12V vehicle / USB" },
          { label: "Range", value: "Configurable" },
        ],
      },
      {
        id: "suspension",
        img: "/tech/07_macpherson.jpg",
        alt: "Suspension & Chassis",
        title: "Suspension & Chassis",
        subtitle: "Control over uneven terrain",
        description:
          "MacPherson-type and independent suspension choices deliver a stable ride, precise steering, and durability for daily fleet use.",
        kpis: [
          { label: "Front", value: "MacPherson-type" },
          { label: "Ride", value: "Independent options" },
          { label: "Handling", value: "Balanced geometry" },
          { label: "Durability", value: "Fleet-ready" },
        ],
      },
      {
        id: "safety",
        img: "/tech/02_brake.jpg",
        alt: "Safety & Sensing",
        title: "Safety & Sensing",
        subtitle: "Awareness that scales with your course",
        description:
          "Hydraulic disc brakes, hill-hold logic, and optional proximity/guidance modules to enhance course compliance and safety.",
        kpis: [
          { label: "Brakes", value: "4-wheel hydraulic" },
          { label: "Hill", value: "Hill-hold logic" },
          { label: "Sensing", value: "Proximity options" },
          { label: "Guidance", value: "Area limits (opt.)" },
        ],
      },
      {
        id: "body",
        img: "/tech/12_frontstore.jpg",
        alt: "Body & Storage",
        title: "Body & Storage",
        subtitle: "Practical space, premium feel",
        description:
          "Front and rear multi-compartment storage plus comfort options like heated seats and split windscreen for all-season play.",
        kpis: [
          { label: "Front", value: "Organized storage" },
          { label: "Rear", value: "Multi-purpose locker" },
          { label: "Comfort", value: "Heated seats" },
          { label: "Weather", value: "Split windscreen" },
        ],
      },
      {
        id: "mcs",
        img: "/tech/08_hill.jpg",
        alt: "Motor Control System",
        title: "Motor Control System",
        subtitle: "Smooth, confident control",
        description:
          "Tuned acceleration, regenerative braking integration, and gradeability characteristics for player comfort and caddie confidence.",
        kpis: [
          { label: "Gradeability", value: "Optimized" },
          { label: "Regen", value: "Integrated" },
          { label: "Response", value: "Smooth torque" },
          { label: "Modes", value: "Configurable" },
        ],
      },
      {
        id: "service",
        img: "/tech/06_hatch.jpg",
        alt: "Service & Updates",
        title: "Service & Updates",
        subtitle: "Keep fleets moving",
        description:
          "Service-friendly access hatches and modular components reduce downtime. Diagnostic workflows streamline maintenance windows.",
        kpis: [
          { label: "Access", value: "Service hatch" },
          { label: "Modules", value: "Quick-swap" },
          { label: "Diagnostics", value: "On-site" },
          { label: "Support", value: "After-sales" },
        ],
      },
    ],
    []
  );

  return (
    <div>
      {/* 1) Big hero carousel (no horizontal scroll; arrows & numeric pager on right) */}
      <StageCarousel items={heroItems} ariaLabel="Technology overview" />

      {/* 2) Your original feature tiles (exactly from TECH_FEATURES) */}
      <TechFeatureTiles items={TECH_FEATURES} title="Detailed Technology Features" />
    </div>
  );
}

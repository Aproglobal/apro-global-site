// src/components/PerformanceSection.tsx
import React from "react";
import StageCarousel, { StageItem } from "./StageCarousel";

export default function PerformanceSection() {
  const items: StageItem[] = [
    {
      id: "powertrain",
      img: "/assets/tech/powertrain.jpg", // TODO: replace with your image
      alt: "Powerful lithium powertrain",
      title: "Powertrain & Battery",
      subtitle: "High-efficiency lithium system",
      description:
        "Long-life lithium packs, optimized BMS, and robust driveline deliver confident torque with stable voltage under load.",
      kpis: [
        { label: "Battery", value: "Lithium (LFP)" },
        { label: "Capacity", value: "Up to 105 Ah" },
        { label: "Controller", value: "High-current MOSFET" },
        { label: "Charging", value: "On/Off-board AC options" },
      ],
      note: "Specs vary by model/market.",
    },
    {
      id: "suspension",
      img: "/assets/tech/suspension.jpg",
      alt: "Advanced suspension & chassis",
      title: "Suspension & Chassis",
      subtitle: "Stable, durable ride",
      description:
        "Independent suspension and reinforced chassis geometry keep passengers comfortable across fairways and paths.",
      kpis: [
        { label: "Front", value: "Independent" },
        { label: "Rear", value: "Multi-link / Leaf" },
        { label: "Brakes", value: "Hydraulic + Parking" },
        { label: "Frame", value: "Anti-corrosion coated" },
      ],
    },
    {
      id: "motorcontrol",
      img: "/assets/tech/motor-control.jpg",
      alt: "Motor control system",
      title: "Motor Control System",
      subtitle: "Smooth, predictable acceleration",
      description:
        "Refined torque mapping and regen logic provide responsive starts, hill confidence, and effortless low-speed maneuvering.",
      kpis: [
        { label: "Rated Power", value: "Model-dependent" },
        { label: "Regen", value: "Energy recovery" },
        { label: "Modes", value: "Course / Service" },
        { label: "Protection", value: "Thermal / Current" },
      ],
    },
  ];

  return (
    <div>
      <StageCarousel
        items={items}
        ariaLabel="Performance features"
        controlsPosition="right"
      />
    </div>
  );
}

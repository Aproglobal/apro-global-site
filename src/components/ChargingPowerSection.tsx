import React from "react";
import StageCarousel from "./StageCarousel";

export default function ChargingPowerSection() {
  const slides = [
    {
      img: "/power/charging-ac.jpg",
      title: "AC Charging",
      desc:
        "Practical overnight AC charging suited for courses and venues. Typical 4–5 hours for standard packs.",
      meta: "48V system • ~4–5 h",
    },
    {
      img: "/power/battery-pack.jpg",
      title: "Lithium Options",
      desc:
        "51V 110Ah / 160Ah lithium packs from SK Mobile Energy with in-house BMS / PACK / CELL for quality and service consistency.",
      meta: "SK Mobile Energy • QC process",
    },
    {
      img: "/power/12v-accessory.jpg",
      title: "12V Accessory Power",
      desc:
        "Integrated 12V outlet for devices and course accessories—keep crews and guests powered throughout the day.",
      meta: "Convenient accessory power",
    },
  ];

  return (
    <div className="not-prose">
      <StageCarousel
        id="power-stage"
        title="Charging & Power"
        note="Right-sized energy for daily operations—simple, reliable, and safe."
        slides={slides}
      />
    </div>
  );
}

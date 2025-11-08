import React from "react";
import StageCarousel from "./StageCarousel";

export default function IndustriesSection() {
  const slides = [
    {
      img: "/industries/golf-course.jpg",
      title: "Golf Courses & Resorts",
      desc:
        "Reliable fleets for 18–36 hole operations, VIP shuttles for members and events, and robust parts support for peak season uptime.",
      meta: "Daily operations • VIP shuttle • Event support",
    },
    {
      img: "/industries/theme-park.jpg",
      title: "Parks & Venues",
      desc:
        "Quiet, low-emission transport for theme parks, convention centers, stadiums, and large campuses.",
      meta: "Low noise • Zero emissions • Flexible seating",
    },
    {
      img: "/industries/hospitality.jpg",
      title: "Hospitality & Property",
      desc:
        "Guest transport, housekeeping carts, and maintenance units with storage upgrades to fit your workflow.",
      meta: "Guest shuttle • Service carts • Custom storage",
    },
    {
      img: "/industries/industrial.jpg",
      title: "Industrial & Logistics",
      desc:
        "Tough, lithium-powered workhorses for facilities and last-mile logistics with dependable braking and safety sensing.",
      meta: "Lithium power • Safety systems • Payload options",
    },
  ];

  return (
    <div className="not-prose">
      <StageCarousel
        id="industries-stage"
        title="Industries"
        note="One platform, multiple use cases—built for real-world uptime."
        slides={slides}
      />
    </div>
  );
}

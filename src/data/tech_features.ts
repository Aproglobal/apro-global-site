// src/data/tech_features.ts
export type TechGroup = "performance" | "technology";

export type TechItem = {
  key: string;
  title: string;
  desc?: string;
  img: string;          // absolute path from /public (you can swap these to your real photos anytime)
  group: TechGroup;     // which section to show in
  system?: string;      // optional label (Powertrain & Battery, Safety & Sensing, etc.)
};

export const TECH_FEATURES: TechItem[] = [
  // =======================
  // PERFORMANCE
  // =======================
  {
    key: "motor_46kw",
    title: "AC 48V 4.6 kW Motor (LSIS/Hyosung)",
    desc:
      "Tuned for mountainous terrain with stable hill climbing and reduced rollback/judder. " +
      "AC efficiency typically +20–30% vs. comparable DC motors—no brushes/commutators and lower maintenance.",
    img: "/tech/01_motor.jpg",
    group: "performance",
    system: "Powertrain & Battery",
  },
  {
    key: "battery_skme",
    title: "SK Mobile Energy Lithium System (BMS / PACK / CELL)",
    desc:
      "51V 110Ah / 160Ah options, typical 4–5 h charge, and wide operating temperature range. " +
      "In-house BMS, PACK, and CELL for quality control and service consistency.",
    img: "/tech/04_12v.jpg", // TEMP: swap to your battery image when ready
    group: "performance",
    system: "Powertrain & Battery",
  },
  {
    key: "hydraulic_disc",
    title: "Hydraulic Disc Brakes + Motor Control",
    desc:
      "Confident stopping in wet or dry conditions with coordinated motor control. " +
      "Includes EM parking brake for secure holds on slopes.",
    img: "/tech/02_brake.jpg",
    group: "performance",
    system: "Safety & Braking",
  },
  {
    key: "independent_suspension",
    title: "4-Wheel Independent Suspension",
    desc:
      "Maintains ground contact and improves cornering stability across uneven fairways.",
    img: "/tech/05_susp.jpg",
    group: "performance",
    system: "Suspension & Chassis",
  },
  {
    key: "macpherson",
    title: "Ultra-Light MacPherson-Type Suspension",
    desc:
      "Sedan-class ride comfort with reduced unsprung mass for better compliance.",
    img: "/tech/07_macpherson.jpg",
    group: "performance",
    system: "Suspension & Chassis",
  },
  {
    key: "hill_climb",
    title: "Superior Hill-Climb Capability",
    desc: "Confident climbs on challenging terrain and long fairways.",
    img: "/tech/08_hill.jpg",
    group: "performance",
    system: "Powertrain & Battery",
  },

  // =======================
  // TECHNOLOGY
  // =======================
  {
    key: "heated_seats",
    title: "Heated Seats (Front & Rear)",
    desc: "Comfort across seasons for both players and caddies.",
    img: "/tech/03_heated.jpg",
    group: "technology",
    system: "Comfort & Climate",
  },
  {
    key: "charger_12v",
    title: "12V Vehicle Charger",
    desc: "Convenient power for phones and accessories during play.",
    img: "/tech/04_12v.jpg",
    group: "technology",
    system: "Electrical & Power",
  },
  {
    key: "service_hatch",
    title: "Service-Friendly Access Hatch",
    desc: "Quick inspections and easier maintenance.",
    img: "/tech/06_hatch.jpg",
    group: "technology",
    system: "Service & Updates",
  },
  {
    key: "split_windscreen",
    title: "2-Piece Lower Opening Windscreen",
    desc: "Flexible ventilation and protection from rain.",
    img: "/tech/09_windscreen.jpg",
    group: "technology",
    system: "Body & Storage",
  },
  {
    key: "auto_putter",
    title: "One-Touch Caddie Bag Holder",
    desc: "Open/lock the caddie bag clamp with a single touch for faster turnarounds.",
    img: "/tech/10_backholder.jpg",
    group: "technology",
    system: "Body & Storage",
  },
  {
    key: "rear_storage",
    title: "Concealed, Sealed Rear Locker",
    desc: "Keeps belongings secure and dry; simplified open/close mechanism.",
    img: "/tech/11_rearstore.jpg",
    group: "technology",
    system: "Body & Storage",
  },
  {
    key: "front_storage",
    title: "Larger Front Storage with Phone Bay",
    desc: "Organized compartments sized for daily essentials, with a dedicated phone area.",
    img: "/tech/12_frontstore.jpg",
    group: "technology",
    system: "Body & Storage",
  },
  {
    key: "abs_asa_body",
    title: "ABS+ASA Body (4-Piece Panels)",
    desc: "Durable, UV-resistant panels designed for easier service and cost-effective replacement.",
    img: "/tech/12_frontstore.jpg", // TEMP: replace with your body-panel image
    group: "technology",
    system: "Body & Storage",
  },
  {
    key: "ultrasonic_45",
    title: "Ultrasonic Obstacle Detection (Up to 4.5 m)",
    desc: "Staged deceleration and auto stop to help avoid collisions.",
    img: "/tech/02_brake.jpg", // TEMP: replace with sensing image
    group: "technology",
    system: "Safety & Sensing",
  },
  {
    key: "cart_guard_bumper",
    title: "Cart Guard & Impact-Sensing Bumper",
    desc: "Maintains ~1.2 m safe spacing between carts; impact sensing for added safety.",
    img: "/tech/09_windscreen.jpg", // TEMP: replace with guard/bumper image
    group: "technology",
    system: "Safety & Sensing",
  },
  {
    key: "agv_temp_validation",
    title: "Automotive-Grade Sensor Validation (−40 °C ~ +85 °C)",
    desc: "AGV, guidance, and magnet sensors validated for low/high temperature operation.",
    img: "/tech/06_hatch.jpg", // TEMP
    group: "technology",
    system: "Safety & Sensing",
  },
  {
    key: "patent_101860936",
    title: "Patent No. 10-1860936 — EV Brake Control System",
    desc: "Brake control system for electric vehicles designed to replace traditional hydraulics.",
    img: "/tech/02_brake.jpg", // TEMP
    group: "technology",
    system: "Motor Control System",
  },
];

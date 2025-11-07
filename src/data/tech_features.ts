export type TechGroup = "performance" | "technology";

export type TechItem = {
  key: string;
  title: string;
  desc?: string;
  img: string;          // absolute from /public
  group: TechGroup;     // <-- NEW
  system?: string;      // <-- NEW (Powertrain, Body & Storage, etc.)
};

export const TECH_FEATURES: TechItem[] = [
  // -------- Performance --------
  {
    key: "motor_46kw",
    title: "High-Output AC Motor (4.6 kW)",
    desc: "Responsive torque and stable speed for slopes and long fairways.",
    img: "/tech/01_motor.jpg",
    group: "performance",
    system: "Powertrain & Battery",
  },
  {
    key: "hydraulic_disc",
    title: "4-Wheel Hydraulic Disc Brakes",
    desc: "Confident stopping power in wet or dry conditions.",
    img: "/tech/02_brake.jpg",
    group: "performance",
    system: "Safety & Braking",
  },
  {
    key: "independent_suspension",
    title: "Independent Suspension",
    desc: "Smooth ride quality over uneven surfaces.",
    img: "/tech/05_susp.jpg",
    group: "performance",
    system: "Suspension & Chassis",
  },
  {
    key: "macpherson",
    title: "MacPherson-Type Suspension",
    desc: "Stable handling and durability for course operations.",
    img: "/tech/07_macpherson.jpg",
    group: "performance",
    system: "Suspension & Chassis",
  },
  {
    key: "hill_climb",
    title: "Superior Hill-Climb Capability",
    desc: "Confident climbs on challenging terrain.",
    img: "/tech/08_hill.jpg",
    group: "performance",
    system: "Powertrain & Battery",
  },

  // -------- Technology --------
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
    desc: "Convenient power for devices and accessories.",
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
    title: "Multi-Purpose Rear Locker",
    desc: "Extra storage for events and daily operation.",
    img: "/tech/11_rearstore.jpg",
    group: "technology",
    system: "Body & Storage",
  },
  {
    key: "front_storage",
    title: "Front Multi-Compartment Storage",
    desc: "Organized space for essentials and tools.",
    img: "/tech/12_frontstore.jpg",
    group: "technology",
    system: "Body & Storage",
  },
];

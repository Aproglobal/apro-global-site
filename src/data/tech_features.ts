// src/data/tech_features.ts

/**
 * NOTE:
 * - `groupId`는 Technology 사양 섹션(`copy.sections[].id`)과 연결하기 위한 선택 필드입니다.
 *   섹션 id와 일치하면 카테고리 칩·섹션 카드에 연동되어 사진이 함께 노출됩니다.
 *   아직 섹션 id가 정해지지 않았다면 비워둬도 됩니다(컴포넌트가 자동 폴백).
 * - `oneLiner`는 갤러리 카드/라이트박스에서 쓰는 짧은 요약 문구입니다(없으면 `desc` 사용).
 */

export type TechItem = {
  key: string;
  title: string;
  desc?: string;
  img: string;      // public/ 기준 절대경로
  groupId?: string; // copy.sections[].id 와 매칭 (선택)
  oneLiner?: string;
};

export const TECH_FEATURES: TechItem[] = [
  {
    key: "motor_46kw",
    title: "High-Output AC Motor (4.6 kW)",
    desc: "Responsive torque and stable speed for slopes and long fairways.",
    img: "/tech/01_motor.jpg",
    groupId: "drive_power",
    oneLiner: "Quiet, punchy torque from the first meter."
  },
  {
    key: "hydraulic_disc",
    title: "4-Wheel Hydraulic Disc Brakes",
    desc: "Confident stopping power in wet or dry conditions.",
    img: "/tech/02_brake.jpg",
    groupId: "braking_safety",
    oneLiner: "Stable, consistent braking in all weather."
  },
  {
    key: "heated_seats",
    title: "Heated Seats (Front & Rear)",
    desc: "Comfort across seasons for both players and caddies.",
    img: "/tech/03_heated.jpg",
    groupId: "comfort",
    oneLiner: "Season-ready comfort for every seat."
  },
  {
    key: "charger_12v",
    title: "12V Vehicle Charger",
    desc: "Convenient power for devices and accessories.",
    img: "/tech/04_12v.jpg",
    groupId: "electrical",
    oneLiner: "Keep devices powered on course."
  },
  {
    key: "independent_suspension",
    title: "Independent Suspension",
    desc: "Smooth ride quality over uneven surfaces.",
    img: "/tech/05_susp.jpg",
    groupId: "suspension",
    oneLiner: "Smooth, composed ride over rough turf."
  },
  {
    key: "service_hatch",
    title: "Service-Friendly Access Hatch",
    desc: "Quick inspections and easier maintenance.",
    img: "/tech/06_hatch.jpg",
    groupId: "serviceability",
    oneLiner: "Fast checks. Shorter downtime."
  },
  {
    key: "macpherson",
    title: "MacPherson-Type Suspension",
    desc: "Stable handling and durability for course operations.",
    img: "/tech/07_macpherson.jpg",
    groupId: "suspension",
    oneLiner: "Proven geometry for stable handling."
  },
  {
    key: "hill_climb",
    title: "Superior Hill-Climb Capability",
    desc: "Confident climbs on challenging terrain.",
    img: "/tech/08_hill.jpg",
    groupId: "terrain",
    oneLiner: "Climbs confidently on steep grades."
  },
  {
    key: "split_windscreen",
    title: "2-Piece Lower Opening Windscreen",
    desc: "Flexible ventilation and protection from rain.",
    img: "/tech/09_windscreen.jpg",
    groupId: "weather",
    oneLiner: "Vent when sunny, shield when rainy."
  },
  {
    key: "auto_putter",
    title: "Auto-Lock One-Touch Putter Holder",
    desc: "Secure and quick access during play.",
    img: "/tech/10_backholder.jpg",
    groupId: "convenience",
    oneLiner: "Click-in security. One-touch release."
  },
  {
    key: "rear_storage",
    title: "Multi-Purpose Rear Locker",
    desc: "Extra storage for events and daily operation.",
    img: "/tech/11_rearstore.jpg",
    groupId: "storage",
    oneLiner: "Room for gear, kits, and more."
  },
  {
    key: "front_storage",
    title: "Front Multi-Compartment Storage",
    desc: "Organized space for essentials and tools.",
    img: "/tech/12_frontstore.jpg",
    groupId: "storage",
    oneLiner: "Essentials organized up front."
  },
];

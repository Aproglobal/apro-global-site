// src/data/technology.ts
export type TechCopy = {
  highlights: string[];
  sections: Array<{
    id: string;
    title: string;
    bullets: string[];
  }>;
  footnote?: string;
};

// 사용자 제공 원문(모터/배터리/현가, 안전/센서, 분할 바디, 수납, 제동제어 특허, A/S)에서 핵심만 영문화
export function getTechCopy(): TechCopy {
  return {
    highlights: [
      "AC 48V 4.6 kW motor tuned for mountainous terrain",
      "SK Mobile Energy lithium pack with in-house BMS / PACK / CELL",
      "4-wheel independent suspension, MacPherson-type ride comfort",
    ],
    sections: [
      {
        id: "powertrain",
        title: "Powertrain & Battery",
        bullets: [
          "AC 48V 4.6 kW (LSIS/Hyosung) motor, stable hill climbing & reduced rollback/judder.",
          "High efficiency vs. DC motors (+20–30% in comparable capacity); no brushes/commutators, low maintenance.",
          "51V 110Ah / 160Ah lithium options; typical 4–5 h charge; wide temperature operating range.",
          "SK Mobile Energy: in-house BMS, PACK, CELL for quality control and service consistency.",
        ],
      },
      {
        id: "suspension",
        title: "Suspension & Chassis",
        bullets: [
          "Ultra-light MacPherson-type suspension for sedan-class ride quality.",
          "4-wheel independent suspension maintains ground contact and improves cornering stability.",
          "ABS+ASA body panels in 4-piece layout for easier service and cost-effective replacement.",
        ],
      },
      {
        id: "safety",
        title: "Safety & Sensing",
        bullets: [
          "Hydraulic disc brakes with motor control; EM parking brake.",
          "Ultrasonic obstacle detection up to 4.5 m with staged deceleration and auto stop.",
          "Cart guard sensor maintains safe spacing (~1.2 m) between carts; impact-sensing bumper.",
          "Low-/high-temperature validation for AGV, guidance, and magnet sensors (-40 °C to +85 °C).",
        ],
      },
      {
        id: "storage",
        title: "Body & Storage",
        bullets: [
          "Front: larger, organized storage with dedicated phone bay.",
          "Rear: concealed, sealed locker keeps belongings secure; simplified open/close.",
        ],
      },
      {
        id: "control",
        title: "Motor Control System",
        bullets: [
          "Patent No. 10-1860936 — Electric vehicle brake control system to replace hydraulic braking.",
        ],
      },
      {
        id: "service",
        title: "Service & Updates",
        bullets: [
          "Centralized C/S response; field team dispatch by case.",
          "Ongoing software campaigns & updates for carts and lithium batteries.",
        ],
      },
    ],
    footnote: "Specifications and features may vary by model and market.",
  };
}

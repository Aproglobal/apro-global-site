// src/data/timeline.ts
export type TimelineStep = {
  id: string;
  title: string;
  days?: number;           // calendar days
  role?: "APRO" | "Customer" | "Logistics" | "QC";
  deliverables?: string[];
  changeWindow?: string;
  asset?: { src: string; alt: string } | null;
};

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: "order-freeze",
    title: "Order & Spec Freeze",
    days: 2,
    role: "Customer",
    deliverables: ["PO & Spec lock", "Deposit invoice"],
    changeWindow: "Full spec changes allowed before freeze",
    asset: { src: "/timeline/01_order.jpg", alt: "Order confirmation" },
  },
  {
    id: "frame-welding",
    title: "Frame Welding",
    days: 5,
    role: "APRO",
    deliverables: ["Welded frame"],
    changeWindow: "Minor bracket changes only",
    asset: { src: "/timeline/02_weld.jpg", alt: "Frame welding" },
  },
  {
    id: "paint",
    title: "E-Coat & Paint",
    days: 4,
    role: "APRO",
    deliverables: ["Painted frame & panels"],
    changeWindow: "Color locked at paint start",
    asset: { src: "/timeline/03_paint.jpg", alt: "Paint line" },
  },
  {
    id: "powertrain-elec",
    title: "Powertrain & Electrical",
    days: 3,
    role: "APRO",
    deliverables: ["Motor, controller, harness"],
    changeWindow: "No spec changes",
    asset: { src: "/timeline/04_powertrain.jpg", alt: "Powertrain & electrical" },
  },
  {
    id: "interior-options",
    title: "Interior & Options",
    days: 3,
    role: "APRO",
    deliverables: ["Seats, storage, accessories"],
    changeWindow: "Seat trim/options until D-2",
    asset: { src: "/timeline/05_interior.jpg", alt: "Interior & options" },
  },
  {
    id: "qc-roadtest",
    title: "QC & Road Test",
    days: 3,
    role: "QC",
    deliverables: ["Road test report", "Final checklist"],
    changeWindow: "Spec changes locked",
    asset: { src: "/timeline/06_qc.jpg", alt: "QC road test" },
  },
  {
    id: "pack-ship",
    title: "Packing & Shipping",
    days: 5,
    role: "Logistics",
    deliverables: ["Packing list", "Shipping schedule"],
    changeWindow: "Delivery slot coordination",
    asset: { src: "/timeline/07_ship.jpg", alt: "Packing & shipping" },
  },
  {
    id: "onsite",
    title: "On-Site Commissioning",
    days: 2,
    role: "APRO",
    deliverables: ["Handover checklist", "Basic training"],
    changeWindow: "Branding decal final check",
    asset: { src: "/timeline/08_onsite.jpg", alt: "On-site handover" },
  },
];

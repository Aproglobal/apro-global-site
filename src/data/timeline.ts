// src/data/timeline.ts
export type StepStatus = "planned" | "in_progress" | "done";

export interface Step {
  day: number;            // Day number on the timeline
  title: string;          // Short headline
  desc?: string;          // One-line detail
  vendor?: string;        // Supplier / Partner (optional)
  status?: StepStatus;    // Optional explicit status (usually computed by currentIndex)
  img?: string;           // Optional 300x300 image path (if available)
}

/**
 * Domestic fulfillment flow.
 * Note: Export/overseas flow may differ by country, customs and incoterms.
 */
export const TIMELINE_STEPS: Step[] = [
  {
    day: 1,
    title: "Quotation sent to customer",
    desc: "Provide pricing and specifications for requested models and options.",
  },
  {
    day: 2,
    title: "Purchase Order template shared",
    desc: "Send PO form for confirmation if the customer decides to proceed.",
  },
  {
    day: 3,
    title: "Contract template shared",
    desc: "Share contract form to finalize commercial terms and timeline.",
  },
  {
    day: 4,
    title: "Production orders placed",
    desc: "Cart production to DY Innovate; options to Hanyangsa.",
    vendor: "DY Innovate / Hanyangsa",
  },
  {
    day: 20,
    title: "Decals ordered",
    desc: "Order number plates and logo decals for carts.",
    vendor: "Mikelan Planning",
  },
  {
    day: 21,
    title: "Truck dispatch booked",
    desc: "Arrange carrier; typically confirmed ~10 days before ship-out.",
    vendor: "Myungjin Logistics",
  },
  {
    day: 29,
    title: "Factory shipment",
    desc: "Units depart the factory and head to the site.",
    vendor: "DY Innovate",
  },
  {
    day: 30,
    title: "On-site delivery & install",
    desc: "Final hand-off; options installed on site.",
    vendor: "Hanyangsa",
  },
];

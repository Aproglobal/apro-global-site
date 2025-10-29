// src/data/timeline.ts
export type Step = {
  /** Day number (1-based) */
  day: number;
  /** Short, clear phase title */
  title: string;
  /** Optional note/context */
  note?: string;
};

/** Domestic delivery flow (export process may differ) */
export const TIMELINE_STEPS: Step[] = [
  {
    day: 1,
    title: "Send quotation",
    note: "Email the formal quotation to the customer.",
  },
  {
    day: 2,
    title: "Send PO template",
    note: "Provide our standard purchase order (PO) form to proceed.",
  },
  {
    day: 3,
    title: "Send contract template",
    note: "Share the contract draft for signature and approval.",
  },
  {
    day: 4,
    title: "Place production orders",
    note: "Carts: DY Innovate; Options: Hanyangsa.",
  },
  {
    day: 20,
    title: "Order numbers & logo stickers",
    note: "Artwork and print (Mikelan Design).",
  },
  {
    day: 21,
    title: "Dispatch booking",
    note: "Request trucking schedule (Myungjin Logistics). Typically 10 days prior to ship-out.",
  },
  {
    day: 29,
    title: "Factory release",
    note: "Ship-out from DY Innovate.",
  },
  {
    day: 30,
    title: "On-site delivery & install",
    note: "Deliver carts; mount options on site (Hanyangsa).",
  },
];

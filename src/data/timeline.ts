export type Step = {
  day: number;
  title: string;
  /** extra explanation shown in the card body */
  note?: string;
  /** partner / supplier name */
  vendor?: string;
  /** optional 300x300 image path (served from /public) */
  img?: string;
};

export const TIMELINE_STEPS: Step[] = [
  { day: 1,  title: "Send quotation to customer", note: "Formal price quote including scope, lead time, and commercial terms." },
  { day: 2,  title: "Issue Purchase Order (PO) template", note: "Share our PO form so the customer can proceed upon approval." },
  { day: 3,  title: "Issue contract template", note: "Provide contract document for review and signature." },
  { day: 4,  title: "Place production & option orders", vendor: "DY Innovate / Hanyangsa", note: "Cart production order to DY Innovate; option kit order to Hanyangsa." },
  { day: 20, title: "Order cart numbers & logo decals", vendor: "Mikelan Planning", note: "Artwork proof and decal production (cart numbers and course logo)." },
  { day: 21, title: "Book trucks (dispatch)", vendor: "Myungjin Logistics", note: "Logistics scheduled about 10 days before factory release." },
  {
    day: 29,
    title: "Factory release",
    vendor: "DY Innovate",
    note: "QC completed; units loaded and handed over for delivery.",
    img: "/timeline/factory-release.jpg", // ✅ only provide images for these two
  },
  {
    day: 30,
    title: "On-site delivery & installation",
    vendor: "Hanyangsa",
    note: "Deliver carts; install option kits on site.",
    img: "/timeline/on-site-delivery.jpg", // ✅ and this one
  },
];

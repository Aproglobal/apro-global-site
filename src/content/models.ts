import type { Model } from "../types/content";

export const MODELS: Model[] = [
  {
    slug: "g2-eg-5",
    name: "G2 Electric Guidance · 5-Seater",
    tagline: "Compact, efficient, and guidance-ready.",
    seats: 5,
    power: "lithium",
    guidance: "electronic",
    thumbnail: "/assets/models/g2-eg-5/thumb.jpg",
    brochure: "/downloads/APRO_G2_EG5_Brochure.pdf",
    highlights: ["Electronic Guidance", "Lithium pack", "Low TCO"],
    specs: {
      Motor: "AC High-Torque",
      Battery: "Lithium 105Ah",
      Seats: 5,
      Guidance: "Electronic",
    }
  },
  {
    slug: "g3-eg-5",
    name: "G3 Electric Guidance · 5-Seater",
    tagline: "Flagship ride quality for busy courses.",
    seats: 5,
    power: "lithium",
    guidance: "electronic",
    thumbnail: "/assets/models/g3-eg-5/thumb.jpg",
    brochure: "/downloads/APRO_G3_EG5_Brochure.pdf",
    highlights: ["Premium suspension", "Electronic guidance", "APAC-proven"],
    specs: {
      Motor: "AC High-Torque",
      Battery: "Lithium 130Ah",
      Seats: 5,
      Guidance: "Electronic",
    }
  }
];

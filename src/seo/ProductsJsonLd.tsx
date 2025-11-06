/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { MODELS, type ModelSpec } from "../data/models";
import { SPECS, type DetailedSpecs } from "../data/specs";

/**
 * Build a clean string (undefined-safe, trimmed).
 */
function s(val?: string) {
  return (val ?? "").toString().trim() || undefined;
}

/**
 * Map a model + specs to schema.org Product JSON-LD
 */
function toProductJsonLd(siteUrl: string, m: ModelSpec, spec?: DetailedSpecs) {
  const images: string[] = [
    `${siteUrl}/models/${m.code}.jpg`,
    `${siteUrl}/models/${m.code}_1.jpg`,
    `${siteUrl}/models/${m.code}_2.jpg`,
  ];

  const additionalProperty: any[] = [];

  // Core from ModelSpec
  if (m.seats) additionalProperty.push({ "@type": "PropertyValue", name: "Seating", value: String(m.seats) });
  if (m.guidance) additionalProperty.push({ "@type": "PropertyValue", name: "Guidance", value: m.guidance });
  if (m.deck) additionalProperty.push({ "@type": "PropertyValue", name: "Deck", value: m.deck });
  if (typeof m.reverse === "boolean")
    additionalProperty.push({ "@type": "PropertyValue", name: "Reverse seating", value: m.reverse ? "Yes" : "No" });

  // From DetailedSpecs (only key fields to avoid bloat)
  const specMap: Array<[keyof DetailedSpecs, string]> = [
    ["modelNo", "Model No."],
    ["battery", "Battery"],
    ["motor", "Motor"],
    ["dimensions", "Dimensions (L×W×H)"],
    ["wheelbase", "Wheelbase"],
    ["curbWeight", "Curb weight"],
    ["maxSpeed", "Max speed"],
    ["gradeability", "Gradeability"],
    ["range", "Range"],
    ["payload", "Payload"],
    ["cargoBed", "Cargo bed (L×W×H)"],
    ["charging", "Charging"],
    ["suspension", "Suspension"],
    ["steering", "Steering"],
    ["brakes", "Brakes"],
    ["parkingBrake", "Parking brake"],
  ];

  if (spec) {
    for (const [key, label] of specMap) {
      const v = spec[key];
      const val = Array.isArray(v) ? v.filter(Boolean).join(", ") : s(v as string | undefined);
      if (val) additionalProperty.push({ "@type": "PropertyValue", name: label, value: val });
    }
  }

  const nameParts = [m.name];
  const description = [
    m.guidance ? `${m.guidance} guidance` : "",
    m.seats ? `${m.seats}-seater` : "",
    spec?.battery ? `${spec.battery} battery` : "",
    spec?.motor ? `${spec.motor} motor` : "",
  ]
    .filter(Boolean)
    .join(" · ");

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": nameParts.join(" "),
    "sku": m.code,
    "brand": { "@type": "Brand", "name": "APRO" },
    "category": "GolfCart",
    "image": images,
    "description": description || "APRO golf cart model.",
    "additionalProperty": additionalProperty,
  };
}

/**
 * Injects Product JSON-LD for every APRO model using your data files.
 */
export default function ProductsJsonLd() {
  useEffect(() => {
    const siteUrl =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "https://apro.kukjeint.com";

    const data = MODELS.map((m) => toProductJsonLd(siteUrl, m, SPECS[m.code]));
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}

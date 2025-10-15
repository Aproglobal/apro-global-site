// src/lib/seo.tsx
import React from "react";

export function JsonLd({ json }: { json: any }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export function productJsonLd(model: {
  code: string;
  name: string;
  description?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": model.name,
    "sku": model.code,
    "image": model.image ? [model.image] : undefined,
    "description": model.description || "Electric golf cart by APRO.",
    "brand": { "@type": "Brand", "name": "APRO" }
  };
}

// src/components/FeatureGroupSection.tsx
import React, { useMemo } from "react";
import StepGallery from "./StepGallery";
import { TECH_FEATURES, type TechItem, type TechGroup } from "../data/tech_features";

export default function FeatureGroupSection({ group }: { group: TechGroup }) {
  const items = useMemo<TechItem[]>(
    () => TECH_FEATURES.filter((i) => i.group === group),
    [group]
  );

  return (
    <div>
      <StepGallery
        items={items}
        ariaLabel={group === "performance" ? "Performance features" : "Technology features"}
      />
    </div>
  );
}

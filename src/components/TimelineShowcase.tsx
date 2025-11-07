// src/components/TimelineShowcase.tsx
import React, { useMemo } from "react";
import StageCarousel, { StageItem } from "./StageCarousel";
import { TIMELINE_STEPS } from "../data/timeline";

export default function TimelineShowcase() {
  const items: StageItem[] = useMemo(() => {
    return TIMELINE_STEPS.map((s, i) => ({
      id: s.id || `step-${i}`,
      img: s.img || "/assets/timeline/placeholder.jpg",
      alt: s.title,
      title: s.title,
      subtitle: s.period ? `Typical: ${s.period}` : undefined,
      description: s.description,
      note: s.note,
    }));
  }, []);

  return (
    <StageCarousel
      items={items}
      ariaLabel="Production & delivery timeline"
      controlsPosition="right"
    />
  );
}

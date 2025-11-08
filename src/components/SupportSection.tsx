import React from "react";
import StageCarousel from "./StageCarousel";

export default function SupportSection() {
  const slides = [
    {
      img: "/support/training.jpg",
      title: "Staff Training",
      desc:
        "Onboarding, safety, and daily maintenance SOPs. Short video walkthroughs for new seasonal teams.",
      meta: "Onboarding • SOP • Safety",
    },
    {
      img: "/support/docs.jpg",
      title: "Documentation",
      desc:
        "Service manuals, exploded diagrams, and parts codes—organized and searchable for fast turnaround.",
      meta: "Manuals • Parts catalog",
    },
    {
      img: "/support/helpdesk.jpg",
      title: "Helpdesk & Escalation",
      desc:
        "Tiered support with clear SLAs. Remote diagnostics and guided checks reduce downtime.",
      meta: "SLA • Remote diagnostics",
    },
  ];

  return (
    <div className="not-prose">
      <StageCarousel
        id="support-stage"
        title="Support"
        note="When uptime matters—training, docs, and SLAs that keep fleets moving."
        slides={slides}
      />
    </div>
  );
}

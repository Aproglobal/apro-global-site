import type { ServiceStep, Warranty } from "../types/content";

export const SERVICE_STEPS: ServiceStep[] = [
  { title: "Site Assessment", desc: "Route profile, charge bays, service lane review." },
  { title: "Pilot & Training", desc: "Operator training and playbook handoff." },
  { title: "Delivery & Setup", desc: "Staging, guidance calibration, acceptance checklist." },
  { title: "After-Sales", desc: "Parts SLA and remote diagnostics with local partners." }
];

export const WARRANTY: Warranty = {
  summary: "Solid coverage with local partner support.",
  bullets: [
    "Vehicle: 24 months limited warranty",
    "Battery: 36 months performance coverage",
    "Guidance: firmware updates & calibration support"
  ]
};

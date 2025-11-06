import type { CaseStudy } from "../types/content";

export const CASES: CaseStudy[] = [
  {
    id: "cv-001",
    course: "Crystal Valley GC",
    title: "Reduced route deviations with EG tuning",
    modelSlug: "g3-eg-5",
    problem: "High deviation on steep segments caused starter delays.",
    solution: "Adjusted guidance parameters and upgraded pack firmware.",
    results: [
      { label: "Route Deviations", value: "−32%" },
      { label: "Starter Delays", value: "−18%" }
    ],
    cover: "/assets/cases/cv-001/cover.jpg"
  }
];

export type Model = {
  slug: string;
  name: string;
  tagline: string;
  seats: number;
  power: "lithium" | "lead-acid";
  guidance: "electronic" | "manual";
  thumbnail: string;
  brochure?: string;
  highlights?: string[];
  specs?: Record<string, string | number | boolean>;
};

export type TechItem = {
  id: string;
  title: string;
  summary: string;
  details?: string;
  icon?: string;
};

export type ServiceStep = {
  title: string;
  desc: string;
};

export type Warranty = {
  summary: string;
  bullets: string[];
};

export type CaseStudy = {
  id: string;
  course: string;
  title: string;
  modelSlug: string;
  problem: string;
  solution: string;
  results: { label: string; value: string }[];
  cover: string;
};

export type DownloadItem = {
  title: string;
  file: string;
  type: "pdf" | "doc" | "xls" | "link";
};

export type TechBlock = {
  id: string;        // stable key for merging/anchors
  title: string;
  body?: string;
  bullets?: string[];
};

export type TechCopy = {
  headline: string;
  intro?: string;
  blocks: TechBlock[];
};

/** ---------- Common (default) ---------- */
const COMMON: TechCopy = {
  headline: "Technology",
  intro:
    "Core systems engineered for steep terrain, safer fleet operations, and lower total cost of ownership.",
  blocks: [
    {
      id: "drivetrain",
      title: "Drivetrain (AC 48V 4.6 kW)",
      body:
        "AC drive offers a broader high-efficiency band versus typical DC, no brushes/commutators to service, quieter operation, and smoother control—ideal for steep climbs and controlled descents.",
      bullets: [
        "High-efficiency band (~20–30% advantage vs comparable DC)",
        "Reduced maintenance; longer service life",
        "Refined low-speed control suited for guidance modes",
      ],
    },
    {
      id: "battery",
      title: "Battery System (SK Mobile Energy)",
      bullets: [
        "51V 110Ah standard; 160Ah optional",
        "BMS / PACK / CELL produced in-house for quality and service continuity",
        "Typical charge time: 4–5 hours",
        "Stable output in cold weather; low maintenance; lighter mass",
        "Rated life ≈2,000 cycles @ 80% DoD",
      ],
    },
    {
      id: "guidance",
      title: "Guidance & Brake Control",
      bullets: [
        "Electronic guidance with FM remote (≈100 m)",
        "Speed profiles for guidance: 8 / 5 / 3.5 km/h",
        "Hydraulic disc brakes plus motor-control braking",
        "Patent (KR 10-1860936): EV braking control system",
      ],
    },
    {
      id: "safety",
      title: "Safety Sensors",
      bullets: [
        "Ultrasonic obstacle stop: detects ≈4.5 m; gentle decel; stops at ≈1.8–2.0 m",
        "Impact-sensing bumper triggers safe stop upon collision",
        "Cart-guard spacing (≥1.2 m) helps prevent pile-ups",
      ],
    },
    {
      id: "suspension",
      title: "Suspension & Chassis",
      bullets: [
        "MacPherson-type front with four-wheel independent suspension",
        "Consistent contact patch for comfort and cornering stability",
        "Tunings suited to mountainous course topography",
      ],
    },
    {
      id: "body",
      title: "Body & Windshield",
      bullets: [
        "ABS+ASA four-piece body enables quick, economical panel replacement",
        "Two-piece lower-vent windshield; scratch-resistant coating",
        "Easy cleaning; stable in winter temperatures",
      ],
    },
  ],
};

/** ---------- Per-model overrides (optional) ----------
 * 키: MODELS[].code 와 동일해야 합니다.
 * 규칙: 같은 id의 블록이 있으면 그 블록을 '대체(replace)'합니다.
 */
const OVERRIDES: Record<string, Partial<TechCopy>> = {
  // 예) 수동 모델에서 guidance 문구 제거/대체
  'g2-man-5': {
    blocks: [
      {
        id: 'guidance',
        title: 'Brake Control',
        bullets: [
          'Hydraulic disc brakes plus motor-control braking',
          'Consistent low-speed modulation for crowded areas',
        ],
      },
    ],
  },
};

/** ---------- Merge helper ---------- */
function mergeCopy(base: TechCopy, over?: Partial<TechCopy>): TechCopy {
  if (!over) return base;

  const headline = over.headline ?? base.headline;
  const intro = over.intro ?? base.intro;

  const baseMap = new Map(base.blocks.map(b => [b.id, b]));
  const overMap = new Map((over.blocks ?? []).map(b => [b.id, b]));

  const mergedBlocks: TechBlock[] = [];
  for (const b of base.blocks) {
    mergedBlocks.push(overMap.get(b.id) ?? b);
  }
  // append any new blocks present only in override
  for (const [id, b] of overMap.entries()) {
    if (!baseMap.has(id)) mergedBlocks.push(b);
  }

  return { headline, intro, blocks: mergedBlocks };
}

/** ---------- Public API ---------- */
export function getTechCopy(modelCode?: string): TechCopy {
  const over = modelCode ? OVERRIDES[modelCode] : undefined;
  return mergeCopy(COMMON, over);
}

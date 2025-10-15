// src/data/tech.ts
export type TechItem = {
  id: string;
  title: string;
  blurb: string;
  bullets?: string[];
  image?: string;       // /assets/tech/*.jpg 등
  models?: string[];    // 적용 모델 코드(옵션)
};

export const TECH_SECTIONS: TechItem[] = [
  {
    id: 'eg',
    title: 'Electronic Guidance',
    blurb:
      'Inductive route following with zone-based controls for consistent pace and safety on busy courses.',
    bullets: [
      'Wire-guided routing (installation required)',
      'Speed & stop zones by area',
      'Station stops for boarding & safety checks',
    ],
    image: '/assets/tech/eg.jpg',
    models: ['g2-eg-5','g2-eg-8','g2-eg-vip-4','g2-eg-vip-6','g2-eg-semi-vip-6'],
  },
  {
    id: 'powertrain',
    title: 'Powertrain & Energy',
    blurb:
      'High-efficiency drive units with model-specific battery options and smart charging integration.',
    bullets: [
      'High-torque drive system',
      'Smart charger integration',
      'Model-specific battery configurations',
    ],
    image: '/assets/tech/powertrain.jpg',
  },
  {
    id: 'safety',
    title: 'Safety & Control',
    blurb:
      'Redundant controls and fail-safes designed for predictable operation across all terrain sections.',
    bullets: [
      'Zone-based speed governance',
      'Boarding/parking interlocks',
      'Operator assist features (model dependent)',
    ],
    image: '/assets/tech/safety.jpg',
  },
  {
    id: 'ops',
    title: 'Course Operations',
    blurb:
      'Templates and best practices for layout, throughput, and maintenance to fit your tee sheet volume.',
    bullets: [
      'Route & station planning playbook',
      'Uptime & parts stocking plans',
      'Operator training materials',
    ],
    image: '/assets/tech/ops.jpg',
  },
];

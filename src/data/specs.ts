export type SpecValue = string | string[] | undefined;

export interface DetailedSpecs {
  dimensions?: string;
  wheelbase?: string;
  curbWeight?: string;
  battery?: string;
  motor?: string;
  maxSpeed?: string;
  gradeability?: string;
  range?: string;
  payload?: string;
  charging?: string;
  guidance?: string;
  seating?: string;
  deck?: string;
  reverseSeating?: string;
  options?: string[];
}

export const SPEC_LABELS: Record<keyof DetailedSpecs, string> = {
  dimensions: 'Dimensions (L×W×H)',
  wheelbase: 'Wheelbase',
  curbWeight: 'Curb weight',
  battery: 'Battery',
  motor: 'Motor',
  maxSpeed: 'Max speed',
  gradeability: 'Gradeability',
  range: 'Range',
  payload: 'Payload',
  charging: 'Charging',
  guidance: 'Guidance',
  seating: 'Seating',
  deck: 'Deck',
  reverseSeating: 'Reverse seating',
  options: 'Options',
};

export const SPECS: Record<string, DetailedSpecs> = {
  'g3-eg-5': {
    guidance: 'Electronic',
    seating: '5',
    deck: '—',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
    maxSpeed: '—',
    gradeability: '—',
    range: '—',
    payload: '—',
    charging: '—',
    options: ['Canopy', 'Windscreen'],
  },
  'g3-long-2': {
    guidance: 'Manual',
    seating: '2',
    deck: 'Long',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
    options: ['Cargo deck', 'Canopy'],
  },
  'g2-eg-semi-vip-6': { guidance: 'Electronic', seating: '6', deck: '—', reverseSeating: 'No', battery: '—', motor: '—', dimensions: '—', options: ['Semi VIP seating'] },
  'g2-eg-vip-6': { guidance: 'Electronic', seating: '6', deck: '—', reverseSeating: 'No', battery: '—', motor: '—', dimensions: '—', options: ['VIP seating'] },
  'g2-eg-vip-4': { guidance: 'Electronic', seating: '4', deck: '—', reverseSeating: 'No', battery: '—', motor: '—', dimensions: '—', options: ['VIP seating'] },
  'g2-eg-8': { guidance: 'Electronic', seating: '8', deck: '—', reverseSeating: 'No', battery: '—', motor: '—', dimensions: '—' },
  'g2-eg-5': { guidance: 'Electronic', seating: '5', deck: '—', reverseSeating: 'No', battery: '—', motor: '—', dimensions: '—' },
  'g2-man-11': { guidance: 'Manual', seating: '11', deck: '—', reverseSeating: 'No', battery: '—', motor: '—', dimensions: '—' },
  'g2-man-8': { guidance: 'Manual', seating: '8', deck: '—', reverseSeating: 'No', battery: '—', motor: '—', dimensions: '—' },
  'g2-man-5': { guidance: 'Manual', seating: '5', deck: '—', reverseSeating: 'No', battery: '—', motor: '—', dimensions: '—' },
  'g2-man-5-rev': { guidance: 'Manual', seating: '5', deck: '—', reverseSeating: 'Yes', battery: '—', motor: '—', dimensions: '—' },
  'g2-short-5': { guidance: 'Manual', seating: '5', deck: 'Short', reverseSeating: 'No', battery: '—', motor: '—', dimensions: '—' },
  'g2-long-2': { guidance: 'Manual', seating: '2', deck: 'Long', reverseSeating: 'No', battery: '—', motor: '—', dimensions: '—' },
};


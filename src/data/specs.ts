
export type SpecValue = string | string[] | undefined;

export interface DetailedSpecs {
  dimensions?: string;     // e.g., 3200 x 1200 x 1900 mm
  wheelbase?: string;      // e.g., 1650 mm
  curbWeight?: string;     // e.g., 480 kg
  battery?: string;        // e.g., 51V 110Ah Li-ion
  motor?: string;          // e.g., AC 4.6 kW
  maxSpeed?: string;       // e.g., 24 km/h (course limited)
  gradeability?: string;   // e.g., 20%
  range?: string;          // e.g., 36 holes typical
  payload?: string;        // e.g., 500 kg
  charging?: string;       // e.g., On-board 110/220V
  guidance?: string;       // Electronic / Manual
  seating?: string;        // 2 / 4 / 5 / 6 / 8 / 11
  deck?: string;           // Long / Short / —
  reverseSeating?: string; // Yes / No
  options?: string[];      // e.g., ['Canopy','Windscreen','Remote']
}

// Label map for rendering
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

// Per-model specs (EDIT HERE). '—' means TBA.
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
    options: ['Canopy','Windscreen'],
  },
  'g3-long-2': {
    guidance: 'Manual',
    seating: '2',
    deck: 'Long',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
    options: ['Cargo deck','Canopy'],
  },
  'g2-eg-semi-vip-6': { guidance: 'Electronic', seating: '6', deck: '—', reverseSeating: 'No', battery:'—', motor:'—', dimensions:'—', options:['Semi VIP seating'] },
  'g2-eg-vip-6': { guidance: 'Electronic', seating: '6', deck: '—', reverseSeating: 'No', battery:'—', motor:'—', dimensions:'—', options:['VIP seating'] },
  'g2-eg-vip-4': { guidance: 'Electronic', seating: '4', deck: '—', reverseSeating: 'No', battery:'—', motor:'—', dimensions:'—', options:['VIP seating'] },
  'g2-eg-8': { guidance: 'Electronic', seating: '8', deck: '—', reverseSeating: 'No', battery:'—', motor:'—', dimensions:'—' },
  'g2-eg-5': { guidance: 'Electronic', seating: '5', deck: '—', reverseSeating: 'No', battery:'—', motor:'—', dimensions:'—' },
  'g2-man-11': { guidance: 'Manual', seating: '11', deck: '—', reverseSeating: 'No', battery:'—', motor:'—', dimensions:'—' },
  'g2-man-8': { guidance: 'Manual', seating: '8', deck: '—', reverseSeating: 'No', battery:'—', motor:'—', dimensions:'—' },
  'g2-man-5': { guidance: 'Manual', seating: '5', deck: '—', reverseSeating: 'No', battery:'—', motor:'—', dimensions:'—' },
  'g2-man-5-rev': { guidance: 'Manual', seating: '5', deck: '—', reverseSeating: 'Yes', battery:'—', motor:'—', dimensions:'—' },
  'g2-short-5': { guidance: 'Manual', seating: '5', deck: 'Short', reverseSeing: 'No' as any, battery:'—', motor:'—', dimensions:'—' },
  'g2-long-2': { guidance: 'Manual', seating: '2', deck: 'Long', reverseSeating: 'No', battery:'—', motor:'—', dimensions:'—' },
};

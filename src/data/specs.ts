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
  // ---------------------------
  // G3 Series (placeholders)
  // ---------------------------
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

  // ---------------------------
  // G2 Series
  // ---------------------------

  // Semi VIP 6 (placeholder)
  'g2-eg-semi-vip-6': {
    guidance: 'Electronic',
    seating: '6',
    deck: '—',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
    options: ['Semi VIP seating'],
  },

  // VIP 6 (placeholder)
  'g2-eg-vip-6': {
    guidance: 'Electronic',
    seating: '6',
    deck: '—',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
    options: ['VIP seating'],
  },

  // VIP 4 (placeholder)
  'g2-eg-vip-4': {
    guidance: 'Electronic',
    seating: '4',
    deck: '—',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
    options: ['VIP seating'],
  },

  // G2 Electronic 8-seat (placeholder)
  'g2-eg-8': {
    guidance: 'Electronic',
    seating: '8',
    deck: '—',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
  },

  // ✅ G2 Electronic 5-seat (채움)
  'g2-eg-5': {
    guidance: 'Electronic (FM remote ~100 m)',
    seating: '5',
    deck: '—',
    reverseSeating: 'No',
    battery: '51V 110Ah (SK Mobile Energy), option 160Ah',
    motor: 'AC 48V 4.6 kW',
    dimensions: '3,350 × 1,355 × 1,850 mm', // L×W×H
    wheelbase: '2,150 mm',
    curbWeight: '490 kg (Lithium)',
    maxSpeed: 'Manual 0–19 km/h; E-guidance 8 / 5 / 3.5 km/h',
    gradeability: '25°',
    charging: 'Typical 4–5 h',
    options: [
      'Heated/Ventilated seats',
      'Wide armrests',
      '12V phone charger',
      'Rear 2-tier basket',
      'Putter case',
      'Rain cover / Curtains',
      'Urethane grab bars',
      'Rubber mats',
      'Room mirror',
      'Logo & number decals',
    ],
  },

  // ✅ G2 Manual 5-seat (전자유도 항목 제외하고 채움)
  'g2-man-5': {
    guidance: 'Manual',
    seating: '5',
    deck: '—',
    reverseSeating: 'No',
    battery: '51V 110Ah (SK Mobile Energy), option 160Ah',
    motor: 'AC 48V 4.6 kW',
    dimensions: '3,350 × 1,355 × 1,850 mm', // L×W×H
    wheelbase: '2,150 mm',
    curbWeight: '490 kg (Lithium)',
    maxSpeed: '0–19 km/h',
    gradeability: '25°',
    charging: 'Typical 4–5 h',
    options: [
      'Heated/Ventilated seats',
      'Wide armrests',
      '12V phone charger',
      'Rear 2-tier basket',
      'Putter case',
      'Rain cover / Curtains',
      'Urethane grab bars',
      'Rubber mats',
      'Room mirror',
      'Logo & number decals',
    ],
  },

  // Manual 11 (placeholder)
  'g2-man-11': {
    guidance: 'Manual',
    seating: '11',
    deck: '—',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
  },

  // Manual 8 (placeholder)
  'g2-man-8': {
    guidance: 'Manual',
    seating: '8',
    deck: '—',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
  },

  // Manual 5 reverse (placeholder)
  'g2-man-5-rev': {
    guidance: 'Manual',
    seating: '5',
    deck: '—',
    reverseSeating: 'Yes',
    battery: '—',
    motor: '—',
    dimensions: '—',
  },

  // Short deck 5 (placeholder)
  'g2-short-5': {
    guidance: 'Manual',
    seating: '5',
    deck: 'Short',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
  },

  // Long deck 2 (placeholder)
  'g2-long-2': {
    guidance: 'Manual',
    seating: '2',
    deck: 'Long',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
  },
};
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
  // ---------------------------
  // G3 Series (placeholders)
  // ---------------------------
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

  // ---------------------------
  // G2 Series
  // ---------------------------

  // Semi VIP 6 (placeholder)
  'g2-eg-semi-vip-6': {
    guidance: 'Electronic',
    seating: '6',
    deck: '—',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
    options: ['Semi VIP seating'],
  },

  // VIP 6 (placeholder)
  'g2-eg-vip-6': {
    guidance: 'Electronic',
    seating: '6',
    deck: '—',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
    options: ['VIP seating'],
  },

  // VIP 4 (placeholder)
  'g2-eg-vip-4': {
    guidance: 'Electronic',
    seating: '4',
    deck: '—',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
    options: ['VIP seating'],
  },

  // G2 Electronic 8-seat (placeholder)
  'g2-eg-8': {
    guidance: 'Electronic',
    seating: '8',
    deck: '—',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
  },

  // ✅ G2 Electronic 5-seat (채움)
  'g2-eg-5': {
    guidance: 'Electronic (FM remote ~100 m)',
    seating: '5',
    deck: '—',
    reverseSeating: 'No',
    battery: '51V 110Ah (SK Mobile Energy), option 160Ah',
    motor: 'AC 48V 4.6 kW',
    dimensions: '3,350 × 1,355 × 1,850 mm', // L×W×H
    wheelbase: '2,150 mm',
    curbWeight: '490 kg (Lithium)',
    maxSpeed: 'Manual 0–19 km/h; E-guidance 8 / 5 / 3.5 km/h',
    gradeability: '25°',
    charging: 'Typical 4–5 h',
    options: [
      'Heated/Ventilated seats',
      'Wide armrests',
      '12V phone charger',
      'Rear 2-tier basket',
      'Putter case',
      'Rain cover / Curtains',
      'Urethane grab bars',
      'Rubber mats',
      'Room mirror',
      'Logo & number decals',
    ],
  },

  // ✅ G2 Manual 5-seat (전자유도 항목 제외하고 채움)
  'g2-man-5': {
    guidance: 'Manual',
    seating: '5',
    deck: '—',
    reverseSeating: 'No',
    battery: '51V 110Ah (SK Mobile Energy), option 160Ah',
    motor: 'AC 48V 4.6 kW',
    dimensions: '3,350 × 1,355 × 1,850 mm', // L×W×H
    wheelbase: '2,150 mm',
    curbWeight: '490 kg (Lithium)',
    maxSpeed: '0–19 km/h',
    gradeability: '25°',
    charging: 'Typical 4–5 h',
    options: [
      'Heated/Ventilated seats',
      'Wide armrests',
      '12V phone charger',
      'Rear 2-tier basket',
      'Putter case',
      'Rain cover / Curtains',
      'Urethane grab bars',
      'Rubber mats',
      'Room mirror',
      'Logo & number decals',
    ],
  },

  // Manual 11 (placeholder)
  'g2-man-11': {
    guidance: 'Manual',
    seating: '11',
    deck: '—',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
  },

  // Manual 8 (placeholder)
  'g2-man-8': {
    guidance: 'Manual',
    seating: '8',
    deck: '—',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
  },

  // Manual 5 reverse (placeholder)
  'g2-man-5-rev': {
    guidance: 'Manual',
    seating: '5',
    deck: '—',
    reverseSeating: 'Yes',
    battery: '—',
    motor: '—',
    dimensions: '—',
  },

  // Short deck 5 (placeholder)
  'g2-short-5': {
    guidance: 'Manual',
    seating: '5',
    deck: 'Short',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
  },

  // Long deck 2 (placeholder)
  'g2-long-2': {
    guidance: 'Manual',
    seating: '2',
    deck: 'Long',
    reverseSeating: 'No',
    battery: '—',
    motor: '—',
    dimensions: '—',
  },
};

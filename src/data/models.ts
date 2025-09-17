export interface ModelSpec {
  code: string;
  name: string;
  guidance: 'Electronic' | 'Manual';
  seats: number;
  variant?: string;
  deck?: 'Long' | 'Short' | null;
  reverse?: boolean;
}

export const MODELS: ModelSpec[] = [
  { code: 'g3-eg-5', name: 'G3 Electronic Guidance 5-Seater', guidance: 'Electronic', seats: 5 },
  { code: 'g3-long-2', name: 'G3 Long Deck 2-Seater', guidance: 'Manual', seats: 2, deck: 'Long' },

  { code: 'g2-eg-semi-vip-6', name: 'G2 Electronic Guidance Semi VIP 6-Seater', guidance: 'Electronic', seats: 6, variant: 'Semi VIP' },
  { code: 'g2-eg-vip-6', name: 'G2 Electronic Guidance VIP 6-Seater', guidance: 'Electronic', seats: 6, variant: 'VIP' },
  { code: 'g2-eg-vip-4', name: 'G2 Electronic Guidance VIP 4-Seater', guidance: 'Electronic', seats: 4, variant: 'VIP' },
  { code: 'g2-eg-8', name: 'G2 Electronic Guidance 8-Seater', guidance: 'Electronic', seats: 8 },
  { code: 'g2-eg-5', name: 'G2 Electronic Guidance 5-Seater', guidance: 'Electronic', seats: 5 },

  { code: 'g2-man-11', name: 'G2 Manual 11-Seater', guidance: 'Manual', seats: 11 },
  { code: 'g2-man-8', name: 'G2 Manual 8-Seater', guidance: 'Manual', seats: 8 },
  { code: 'g2-man-5', name: 'G2 Manual 5-Seater', guidance: 'Manual', seats: 5 },
  { code: 'g2-man-5-rev', name: 'G2 Manual 5-Seater (Reverse)', guidance: 'Manual', seats: 5, reverse: true },

  { code: 'g2-short-5', name: 'G2 Short Deck 5-Seater', guidance: 'Manual', seats: 5, deck: 'Short' },
  { code: 'g2-long-2', name: 'G2 Long Deck 2-Seater', guidance: 'Manual', seats: 2, deck: 'Long' },
];

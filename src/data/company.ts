// src/data/company.ts
export const COMPANY = {
  nameEn: "KUKJE INTERTRADE Co., Ltd.",
  nameShort: "KUKJE INTERTRADE",
  ceo: "Donghyun Lee",
  homepage: "https://www.kukjeint.com",
  phone: "+82-31-739-3200",
  fax: "+82-31-739-3232~3",
  hq: {
    address:
      "Room 1208, Biz Center, SKn Techno Park, 124 Sagimakgol-ro, Jungwon-gu, Seongnam-si, Gyeonggi-do, Republic of Korea",
    tel: "+82-31-739-3200",
    fax: "+82-31-739-3232~3",
  },
};

export type Branch = {
  label: string;
  address: string;
  tel?: string;
  fax?: string;
};

export const BRANCHES: Branch[] = [
  {
    label: "Repair Plant",
    address: "435 Noseong-ro, Seoseong-myeon, Icheon-si, Gyeonggi-do",
    tel: "+82-31-643-3077",
    fax: "+82-31-643-3087",
  },
  {
    label: "Yeongnam Branch",
    address: "61 Bulgulsa-gil, Wachon-myeon, Gyeongsan-si, Gyeongsangbuk-do",
    tel: "+82-53-856-3360",
    fax: "+82-53-856-3361",
  },
  {
    label: "Honam Branch",
    address: "77 Cheomdang Science-ro, Ippam-myeon, Jeongeup-si, Jeollabuk-do",
    tel: "+82-63-538-7501",
    fax: "+82-63-538-7502",
  },
  {
    label: "Southern Branch",
    address: "497 Museonsan-ro, Geumgok-myeon, Jinju-si, Gyeongsangnam-do",
    tel: "+82-55-761-1811",
    fax: "+82-55-731-1811",
  },
  {
    label: "Jeju Agency",
    address: "561, Samdo 1-dong, Jeju-si, Jeju",
    tel: "+82-64-757-3877",
  },
];

export const LINEUP = [
  "JOHN DEERE golf course maintenance equipment (tractors, mowers, renovation equipment, utility vehicles, bunker rakes, grinders, etc.)",
  "Signature Control Systems (SCS) irrigation systems — design, installation, and sales",
  "APRO electric guidance passenger golf carts by DY Innovate / Dongyang Precision (battery-powered)",
  "Others: Wiedenmann, TURFCO, REDEXIM, T.W.T., snow equipment",
];

export type HistoryYear = { year: number; items: string[] };

export const HISTORY: HistoryYear[] = [
  { year: 2025, items: ["Jan: Yeongnam Branch — new building and relocation (Gyeongsangbuk-do, Gyeongsan-si, Wachon-myeon, Bulgulsa-gil 61)."] },
  { year: 2023, items: ["Nov: Repair Plant — new building and relocation (to Icheon-si, Seoseong-myeon, Gyeonggi-do)."] },
  { year: 2020, items: ["Jan: Southern Branch opened (Jinju, Gyeongsangnam-do)."] },
  {
    year: 2019,
    items: [
      "Sep: Appreciation plaque from Korea Golf University.",
      "Jul: Honam Branch — new building and relocation (from Gwangju to Jeongeup, Jeollabuk-do).",
      "Jan: JOHN DEERE Asia ‘Star Dealer’ award.",
    ],
  },
  {
    year: 2017,
    items: [
      "Oct: Top Dealer in Asia (JOHN DEERE).",
      "Apr: Certified as an INNO-BIZ company (2017.04.12 ~ 2020.04.11).",
    ],
  },
  {
    year: 2014,
    items: [
      "Oct: Launched KT cart guidance system business.",
      "Jul: Yeongnam Branch relocation (from Yangsan to Gyeongsan).",
      "Mar: Certified as an INNO-BIZ company.",
    ],
  },
  { year: 2013, items: ["Feb: 2012 JOHN DEERE Asia — Highest Sales Growth Dealer award."] },
  { year: 2012, items: ["May: Yeongnam Branch relocation (from Daegu to Yangsan)."] },
  {
    year: 2011,
    items: [
      "Nov: Honam Branch relocation (from Naju to Gwangju).",
      "Apr: New repair plant in Gwangju-si, Gyeonggi-do.",
      "Jan: Selected as ‘Job World Best 600 Companies’ by IBK Bank.",
    ],
  },
  {
    year: 2010,
    items: [
      "Sep: Selected as IBK FAMILY company (IBK Bank).",
      "Feb: 2009 JOHN DEERE Asia — Best in Irrigation Business award.",
    ],
  },
  {
    year: 2009,
    items: [
      "Nov: Golf cart sales contract with Dongyang Precision (domestic & export).",
      "Feb: 2008 JOHN DEERE Asia — Best in Irrigation Business award.",
    ],
  },
  { year: 2008, items: ["Sep: Expansion of repair plant in Gwangju-si, Gyeonggi-do.", "Mar: Certified as an INNO-BIZ company."] },
  { year: 2007, items: ["Feb: Honam Branch opened (Naju)."] },
  {
    year: 2006,
    items: [
      "Dec: Headquarters relocation and expansion (Seongnam-si, Gyeonggi-do).",
      "Sep: Selected as a member of ‘Foreign Exchange Prime Business Club’ (top-tier enterprise group by Korea Exchange Bank).",
    ],
  },
  { year: 2005, items: ["Dec: Southern Branch opened (Daegu).", "Feb: 2004 Overseas Dealer — Excellent Dealer award (JOHN DEERE HQ)."] },
  {
    year: 2004,
    items: [
      "Dec: Highest Market Share Dealer in JOHN DEERE Asia.",
      "May: Highest Market Share Dealer award from SANYO.",
      "Feb: Overseas Dealer — Market Share Excellence award (JOHN DEERE HQ).",
    ],
  },
  { year: 2003, items: ["Dec: Sales Promotion Excellence Dealer award in JOHN DEERE Asia."] },
  { year: 2002, items: ["Jun: Repair plant operation started in Gwangju-si, Gyeonggi-do."] },
  {
    year: 1998,
    items: [
      "Apr: Acquired domestic dealership for SANYO golf carts (Japan).",
      "Mar: Acquired domestic dealership for JOHN DEERE golf/course & construction equipment (USA).",
      "Feb: Established KUKJE INTERTRADE Co., Ltd. by experts with 10+ years of JD & SANYO sales/service experience.",
    ],
  },
];

export const ORG_TEXT = [
  "CEO",
  "Vice President, Auditor, Advisors",
  "Administration, Planning, Repair Business Division (Jeju Agency, Special Service Points, Yeongnam Branch, Honam Branch)",
  "Cart Business Division (Jeju Agency, Special Service Points, Yeongnam Branch, Honam Branch)",
  "Sprinkler & Total Service (Production Management, Repair Service, Golf Cart Service)",
];

export const PARTNERS_COPY = [
  "All JOHN DEERE golf course equipment bears the PGA (Professional Golfers’ Association of America) official supplier mark. Under the 2003 agreement with the PGA, TPC courses maintain tournament-level playing conditions using JOHN DEERE maintenance solutions.",
  "Weathermatic (Signature Control Systems) irrigation delivers proven performance in global and domestic projects.",
  "In partnership with DY Innovate and Dongyang Precision, APRO golf carts combine refined design with state-of-the-art technology.",
];

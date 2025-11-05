// src/data/company.ts
export const COMPANY = {
  nameKo: "국제인터트레이드 주식회사",
  nameEn: "KUKJE INTERTRADE Co., Ltd.",
  ceo: "이 동 현",
  homepage: "https://www.kukjeint.com",
  phone: "031-739-3200",
  fax: "031-739-3232~3",
  hq: {
    address: "경기도 성남시 중원구 사기막골로124 SKn테크노파크 비즈센터 1208호",
    tel: "031-739-3200",
    fax: "031-739-3232~3",
  },
};

export type Branch = {
  label: string;
  address: string;
  tel?: string;
  fax?: string;
};
export const BRANCHES: Branch[] = [
  { label: "정비공장", address: "경기도 이천시 설성면 노성로 435", tel: "031-643-3077", fax: "031-643-3087" },
  { label: "영남지점", address: "경상북도 경산시 와촌면 불굴사길 61", tel: "053-856-3360", fax: "053-856-3361" },
  { label: "호남지점", address: "전라북도 정읍시 입암면 첨단과학로77", tel: "063-538-7501", fax: "063-538-7502" },
  { label: "남부지점", address: "경상남도 진주시 금곡면 무선산로 497", tel: "055-761-1811", fax: "055-731-1811" },
  { label: "제주대리점", address: "제주 제주시 삼도1동 561번지", tel: "064-757-3877" },
];

export const LINEUP = [
  "미국 JOHN DEERE 코스관리장비(트랙터/모어/갱신장비/운반장치/벙커정리기/연마기 등)",
  "미국 Signature Control Systems 이리게이션 시스템(스프링클러 시스템 시공/판매)",
  "동양기전 국산 APRO 배터리식 전자유도 승용골프카",
  "기타: Wiedenmann, TURFCO, REDEXIM, T.W.T, 제설장비 外",
];

export type HistoryYear = { year: number; items: string[] };
export const HISTORY: HistoryYear[] = [
  { year: 2025, items: ["01 영남지점 신축이전(경상북도 경산시 와촌면 불굴사길61 이전)"] },
  { year: 2023, items: ["11 정비공장 신축이전(경기도 곤지암 → 경기도 이천시 설성면)"] },
  { year: 2020, items: ["01 남부지점 개설(경남 진주)"] },
  { year: 2019, items: [
    "09 한국골프대학교 감사패 수상",
    "07 호남지점 신축이전(광주광역시 → 전북 정읍)",
    "01 JohnDeere社 아시아 Star Dealer 수상",
  ]},
  { year: 2017, items: [
    "10 JohnDeere社 아시아 최고 대리점상 수상",
    "04 경영혁신형 중소기업 인증 (2017.04.12 ~ 2020.04.11)",
  ]},
  { year: 2014, items: [
    "10 KT 카트관제 시스템 사업 개시",
    "07 영남지점 이전(경남 양산 → 경북 경산)",
    "03 경영혁신형 중소기업 인증",
  ]},
  { year: 2013, items: ["02 2012년 JOHN DEERE ASIA 지역 판매성장 최고대리점상 수상(JD본사)"]},
  { year: 2012, items: ["05 영남지점 이전(경북 대구 → 경남 양산)"]},
  { year: 2011, items: [
    "11 호남지점 이전(전남 나주 → 광주광역시)",
    "04 경기도 광주시 정비공장 신축",
    "01 기업은행 주관 잡월드 베스트 600기업 선정(기업은행)",
  ]},
  { year: 2010, items: [
    "09 IBK FAMILY 기업 선정(기업은행)",
    "02 2009년 JOHN DEERE ASIA지역 스프링클러 사업 최우수상 수상(JD본사)",
  ]},
  { year: 2009, items: [
    "11 동양기전과 골프카 판매계약(국내 판매 및 해외수출)",
    "02 2008년 JOHN DEERE ASIA지역 스프링클러 사업 최우수상 수상(JD본사)",
  ]},
  { year: 2008, items: ["09 경기도 광주시 정비공장 확장", "03 경영혁신형 중소기업 인증"]},
  { year: 2007, items: ["02 호남지점 개설(나주)"]},
  { year: 2006, items: [
    "12 본사 사무실 확장 이전(경기도 성남시)",
    "09 외환은행 외환 프라임 비즈니스 클럽 회원사 선정(외환은행 지정 초우량 기업모임)",
  ]},
  { year: 2005, items: ["12 남부지점 개설(대구)", "02 2004년 해외딜러 우수대리점상 수상(JD본사)"]},
  { year: 2004, items: [
    "12 JOHN DEERE ASIA지역 시장점유율 최고 대리점상 수상(JD ASIA)",
    "05 SANYO社 시장점유율 최고 대리점상 수상(SANYO)",
    "02 해외딜러 시장점유율 우수대리점상 수상(JD본사)",
  ]},
  { year: 2003, items: ["12 JOHN DEERE ASIA지역 판매증진 우수대리점상 수상(JD ASIA)"]},
  { year: 2002, items: ["06 경기도 광주시 정비공장 가동"]},
  { year: 1998, items: [
    "04 일본 SANYO社 골프카트 국내 대리점 취득 및 영업",
    "03 미국 JOHN DEERE 골프장 관련 장비 및 건설장비 국내대리점 취득 및 영업",
    "02 10년간 JD & SANYO 영업/A·S 전문가들이 체계적 공급과 안정적 A/S를 위해 법인 설립",
    "02 국제인터트레이드 주식회사 법인 설립",
  ]},
];

export const ORG_TEXT = [
  "대표이사",
  "부사장, 감사, 고문",
  "관리부, 기획부, 정비사업부(제주대리점, 특수관리점, 영남지점, 호남지점)",
  "카트사업부(제주대리점, 특수관리점, 영남지점, 호남지점)",
  "스프링쿨러, 총괄서비스(생산관리팀, 정비서비스팀, 골프카서비스팀)",
];

export const PARTNERS_COPY = [
  "존디어 장비에는 미국 PGA(프로골프협회) 공식지정 관리장비 마크가 부착되어 있으며, TPC에서도 존디어 제품으로 프로게임 규격 수준의 코스관리가 이루어집니다.",
  "Weathermatic 이리게이션 시스템은 기술력과 성능으로 국내·해외에서 폭넓게 사용되고 있습니다.",
  "DY Innovate·동양기전과의 협업으로 세련된 디자인과 기술이 결합된 차세대 미래형 골프카 APRO를 공급합니다.",
];

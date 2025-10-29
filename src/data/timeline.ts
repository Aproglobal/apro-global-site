// src/data/timeline.ts
export type Step = {
  /** N일차 (자연수) */
  day: number;
  /** 단계 제목 (짧고 명확하게) */
  title: string;
  /** 부연 설명/거래처/비고 등 */
  note?: string;
};

/** 국내 납품 기준 타임라인 (해외 납품은 상이할 수 있음) */
export const domesticSteps: Step[] = [
  { day: 1,  title: "견적서 발송", note: "고객사에 기본/옵션 견적 송부" },
  { day: 2,  title: "발주서 양식 송부", note: "계약 진행 시, 고객사 발주서 양식 전달" },
  { day: 3,  title: "계약서 양식 송부", note: "계약서(서명 절차) 공유" },
  {
    day: 4,
    title: "카트 및 옵션 발주",
    note: "카트: DY Innovate, 옵션: 한양사"
  },
  {
    day: 20,
    title: "번호/로고 스티커 발주",
    note: "미켈란기획"
  },
  {
    day: 21,
    title: "배차 요청",
    note: "명진물류 (통상 출고일 10일 전 배차 완료)"
  },
  {
    day: 29,
    title: "카트 출고",
    note: "DY Innovate 출고"
  },
  {
    day: 30,
    title: "카트 납품",
    note: "현장 옵션 장착(한양사) 포함"
  },
];

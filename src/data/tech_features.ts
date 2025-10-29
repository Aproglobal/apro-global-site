import type TechFeatureGrid from "../components/TechFeatureGrid";
export type FeatureItem = Parameters<typeof TechFeatureGrid>[0]["items"][number];

export const TECH_FEATURES: FeatureItem[] = [
  { id: "motor_46kw",        title: "동급 최대 출력 모터 (AC 4.6 kW)", img: "/features/01_motor.png",       category: "Performance" },
  { id: "disc_brake",        title: "4륜 유압식 디스크 브레이크",       img: "/features/02_brake.png",       category: "Control" },
  { id: "heated_seats",      title: "앞/뒤 좌석 열선시트",               img: "/features/03_heated.png",      category: "Comfort" },
  { id: "12v_socket",        title: "차량용 12V 충전잭",                 img: "/features/04_12v.png",         category: "Comfort" },
  { id: "indep_susp",        title: "독립현가장치",                     img: "/features/05_susp.png",        category: "Comfort" },
  { id: "service_hatch",     title: "점검 편의성 극대화 점검구",         img: "/features/06_hatch.png",       category: "Service" },
  { id: "macpherson",        title: "맥퍼슨 타입 서스펜션",             img: "/features/07_macpherson.png",  category: "Comfort" },
  { id: "hill_climb",        title: "동급 최강 오르막 등판능력",         img: "/features/08_hill.png",        category: "Performance" },
  { id: "split_windscreen",  title: "2분할 하부 개폐식 윈드실드",       img: "/features/09_windscreen.png",  category: "Protection" },
  { id: "back_holder",       title: "자동잠금식 원터치 백홀더",          img: "/features/10_backholder.png",  category: "Storage" },
  { id: "rear_storage",      title: "다목적 후면 사물함",                img: "/features/11_rearstore.png",   category: "Storage" },
  { id: "front_storage",     title: "전면부 다양한 수납공간",            img: "/features/12_frontstore.png",  category: "Storage" },
];

import React from "react";

type Step = {
  day: number;
  title: string;
  detail?: string;
  vendor?: string;
};

export default function ProductionTimeline({
  steps,
  note = "※ 본 타임라인은 국내 납품 기준입니다. 해외 납품은 절차/리드타임이 상이할 수 있습니다.",
}: {
  steps?: Step[];
  note?: string;
}) {
  const domesticSteps: Step[] = [
    { day: 1, title: "견적서 고객에게 발송" },
    { day: 2, title: "계약 진행 시 발주서 양식 고객에게 발송" },
    { day: 3, title: "계약서 양식 고객에게 발송" },
    { day: 4, title: "카트 생산 발주", detail: "카트 옵션 발주 병행", vendor: "카트: DY Innovate / 옵션: 한양사" },
    { day: 20, title: "번호·로고 스티커 발주", detail: "차량 부착용 스티커", vendor: "미켈란기획" },
    {
      day: 21,
      title: "배차",
      detail: "출고일 기준 약 10일 전 배차 완료",
      vendor: "명진물류",
    },
    { day: 29, title: "카트 출고", vendor: "DY Innovate" },
    { day: 30, title: "카트 납품", detail: "현장에서 옵션 장착", vendor: "옵션 장착: 한양사" },
  ];

  const data = steps && steps.length ? steps : domesticSteps;

  return (
    <section id="timeline" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Production & Delivery Timeline</h2>
          <span className="hidden md:inline text-xs text-zinc-500 dark:text-zinc-400">{note}</span>
        </div>
        <p className="mt-2 md:hidden text-xs text-zinc-500 dark:text-zinc-400">{note}</p>

        {/* 수직 타임라인 */}
        <ol className="mt-8 relative">
          {/* 타임라인 축 */}
          <div
            aria-hidden
            className="absolute left-4 md:left-5 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800"
          />
          <div className="space-y-5">
            {data.map((s) => (
              <li key={s.day} className="relative pl-16 md:pl-20">
                {/* Day Badge */}
                <div className="absolute left-0 top-1">
                  <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs md:text-sm font-bold">
                    D{typeof s.day === "number" ? `+${s.day}` : `-${s.day}`}
                  </div>
                </div>

                {/* 카드 */}
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 md:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base md:text-lg font-semibold">{s.title}</h3>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">Day {s.day}</span>
                  </div>

                  {s.detail || s.vendor ? (
                    <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                      {s.detail ? <p>{s.detail}</p> : null}
                      {s.vendor ? (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          <span className="font-medium">Vendor:</span> {s.vendor}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </div>
        </ol>
      </div>
    </section>
  );
}

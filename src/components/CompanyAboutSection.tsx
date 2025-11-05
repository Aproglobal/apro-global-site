import React from "react";
import { COMPANY, BRANCHES, LINEUP } from "../data/company";

export default function CompanyAboutSection() {
  return (
    <section id="about" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">회사 소개</h2>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
            <h3 className="font-semibold">기본 정보</h3>
            <dl className="mt-3 text-sm space-y-1">
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <dt className="text-zinc-500">회사명</dt><dd>{COMPANY.nameKo}</dd>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <dt className="text-zinc-500">대표이사</dt><dd>{COMPANY.ceo}</dd>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <dt className="text-zinc-500">홈페이지</dt>
                <dd><a className="underline" href={COMPANY.homepage} target="_blank" rel="noreferrer">{COMPANY.homepage}</a></dd>
              </div>
            </dl>

            <h4 className="mt-5 font-semibold">주요 취급 품목</h4>
            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
              {LINEUP.map((t,i)=><li key={i}>{t}</li>)}
            </ul>
          </article>

          <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
            <h3 className="font-semibold">본사</h3>
            <address className="not-italic mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              {COMPANY.hq.address}<br/>
              TEL : {COMPANY.hq.tel} / FAX : {COMPANY.hq.fax}
            </address>

            <h4 className="mt-5 font-semibold">본·지점 및 정비공장</h4>
            <ul className="mt-2 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              {BRANCHES.map((b, i) => (
                <li key={i} className="pl-4 relative">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                  <span className="block">
                    <strong>{b.label}</strong> — {b.address}
                    {b.tel ? <> | TEL : {b.tel}</> : null}
                    {b.fax ? <> | FAX : {b.fax}</> : null}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

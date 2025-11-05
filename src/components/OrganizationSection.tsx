import React from "react";
import { ORG_TEXT } from "../data/company";

export default function OrganizationSection() {
  return (
    <section id="organization" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">조직도</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {ORG_TEXT.map((t,i)=>(
            <li key={i} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

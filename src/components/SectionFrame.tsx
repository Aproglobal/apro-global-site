import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ id?: string; title?: string; note?: string }>;

export default function SectionFrame({ id, title, note, children }: Props) {
  return (
    <section id={id} className="scroll-mt-24 py-16">
      <div className="max-w-6xl mx-auto px-5">
        {title ? (
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{title}</h2>
            {note ? <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{note}</p> : null}
          </div>
        ) : null}

        <div className="
          rounded-3xl border border-zinc-200 dark:border-zinc-800
          bg-white/70 dark:bg-zinc-950/70 backdrop-blur
          p-5 md:p-8
          shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]
          dark:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.5)]
        ">
          {children}
        </div>
      </div>
    </section>
  );
}

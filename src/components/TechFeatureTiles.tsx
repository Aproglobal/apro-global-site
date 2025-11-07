// src/components/TechFeatureTiles.tsx
import React from "react";

export default function TechFeatureTiles({
  items,
  title = "All Technology Features",
}: {
  items: { key: string; title: string; desc?: string; img: string }[];
  title?: string;
}) {
  return (
    <div className="mt-12">
      <h5 className="text-lg md:text-xl font-extrabold tracking-tight mb-4">{title}</h5>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          <li key={it.key} className="group">
            <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-900">
                <img
                  src={it.img}
                  alt={it.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="px-3 py-3">
                <div className="text-sm font-semibold">{it.title}</div>
                {it.desc ? (
                  <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">{it.desc}</div>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

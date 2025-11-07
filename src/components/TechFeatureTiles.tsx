// src/components/TechFeatureTiles.tsx
import React from "react";

export type TechTile = {
  img: string;
  title: string;
  caption?: string;
  alt?: string;
  onClick?: () => void;
};

export default function TechFeatureTiles({ items, title }: { items: TechTile[]; title?: string }) {
  return (
    <div className="mt-10">
      {title ? (
        <h5 className="text-lg md:text-xl font-extrabold tracking-tight mb-4">{title}</h5>
      ) : null}

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((it, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={it.onClick}
              className="group w-full text-left rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <img
                  src={it.img}
                  alt={it.alt || it.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="px-3 py-3">
                <div className="text-sm font-semibold">{it.title}</div>
                {it.caption ? (
                  <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">{it.caption}</div>
                ) : null}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from "react";

export interface ModelCardProps {
  name: string;
  imageSrc?: string;
  href?: string;
  highlights?: string[];
}

function ModelCard({ name, imageSrc, href = "#", highlights = [] }: ModelCardProps) {
  return (
    <article className="rounded-2xl border border-gray-200 p-4 shadow-sm">
      <a href={href} className="block">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            className="h-48 w-full rounded-xl object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center rounded-xl bg-gray-50 text-sm text-gray-400">
            Image coming soon
          </div>
        )}
        <h3 className="mt-3 text-lg font-semibold tracking-tight">{name}</h3>
        {highlights.length > 0 && (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
            {highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}
      </a>
    </article>
  );
}

export default ModelCard;
export { ModelCard };

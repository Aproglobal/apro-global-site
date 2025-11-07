import React from "react";

export type ModelCardProps = {
  title: string;
  imageUrl?: string;
  description?: string;
  href?: string;
  badge?: string;
};

export default function ModelCard({
  title,
  imageUrl,
  description,
  href,
  badge,
}: ModelCardProps) {
  const Card = (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-gray-100 text-sm text-gray-500">
          Image coming soon
        </div>
      )}

      <div className="p-5">
        <div className="mb-1 flex items-center gap-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          {badge && (
            <span className="rounded-full bg-gray-900 px-2 py-0.5 text-[10px] font-medium text-white">
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm leading-6 text-gray-600">{description}</p>
        )}
      </div>
    </article>
  );

  if (href) {
    return (
      <a href={href} className="block focus:outline-none focus:ring-2 focus:ring-black/50">
        {Card}
      </a>
    );
  }

  return Card;
}

// src/components/ModelCard.tsx
import React from "react";


export type ModelCardProps = {
title?: string;
imageUrl?: string;
description?: string;
href?: string;
className?: string;
};


export function ModelCard({ title = "Model", imageUrl, description, href = "#", className = "" }: ModelCardProps) {
return (
<article className={`rounded-2xl border border-gray-200 overflow-hidden bg-white ${className}`}>
{imageUrl ? (
<div className="aspect-[16/9] w-full bg-gray-100">
<img src={imageUrl} alt={title} className="h-full w-full object-cover" />
</div>
) : (
<div className="aspect-[16/9] w-full bg-gray-100" />
)}
<div className="p-4">
<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
{description ? <p className="mt-1 text-sm text-gray-600 line-clamp-2">{description}</p> : null}
<div className="mt-4">
<a href={href} className="inline-block rounded-xl bg-gray-900 px-3.5 py-2 text-sm text-white hover:bg-black">
Learn more
</a>
</div>
</div>
</article>
);
}


export default ModelCard;

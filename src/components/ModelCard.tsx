import React from 'react';
import { ModelSpec } from '../data/models';
import { openLead } from './LeadModal';
import { openModel } from './ModelDetail';

export default function ModelCard({ model }: { model: ModelSpec }) {
  return (
    <div className="group rounded-2xl overflow-hidden border bg-white border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950">
      <buttonimport React from "react";
import { ModelSpec } from "../data/models";
import { openLead } from "./LeadModal";
import { openModel } from "./ModelDetail";
import { MessageSquare, FileDown } from "lucide-react";
import React from "react";

export type ModelCardProps = {
  title: string;
  imageUrl?: string;
  bullets?: string[];
};

export const ModelCard: React.FC<ModelCardProps> = ({ title, imageUrl, bullets }) => {
  return (
    <article className="rounded-2xl border p-4">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        ) : null}
      </div>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      {bullets && bullets.length > 0 ? (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
};

export default ModelCard;

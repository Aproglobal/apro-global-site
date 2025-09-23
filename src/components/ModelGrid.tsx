import React from 'react';
import { MODELS } from '../data/models';
import ModelCard from './ModelCard';

export default function ModelGrid() {
  return (
    <section id="models" className="py-20 bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Models</h2>
          <a href="#compare" className="text-sm text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white">Compare all</a>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODELS.map(m => <ModelCard key={m.code} model={m} />)}
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, desc }: { eyebrow?: string; title: string; desc?: string }) {
  return (
    <div className="mb-8">
      {eyebrow && <div className="text-xs uppercase tracking-wider text-brand-600 font-semibold mb-2">{eyebrow}</div>}
      <h2 className="text-2xl sm:text-3xl font-extrabold">{title}</h2>
      {desc && <p className="mt-2 text-gray-600 dark:text-gray-300">{desc}</p>}
    </div>
  );
}

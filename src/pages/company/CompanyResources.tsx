// src/pages/company/CompanyResources.tsx
export default function CompanyResources() {
  const links = [
    { t: "Brochure (PDF)", href: "#" },
    { t: "Spec sheet (G2/G3)", href: "#" },
    { t: "Operations checklist", href: "#" },
  ];
  return (
    <main className="mx-auto max-w-4xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight mb-4">Resources</h1>
      <ul className="list-disc pl-5 space-y-2">
        {links.map((x) => (
          <li key={x.t}>
            <a className="underline underline-offset-2" href={x.href}>{x.t}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}

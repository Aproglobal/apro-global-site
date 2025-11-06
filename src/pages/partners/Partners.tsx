// src/pages/partners/Partners.tsx
import { Link } from "react-router-dom";

export default function Partners() {
  const benefits = [
    "Regional demo & install support",
    "Parts inventory access",
    "Co-marketing for events",
  ];
  return (
    <main className="mx-auto max-w-4xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight mb-4">Partner Program</h1>
      <ul className="list-disc pl-5 space-y-2">
        {benefits.map((b) => <li key={b}>{b}</li>)}
      </ul>
      <Link to="/partners/apply" className="inline-block mt-6 rounded-xl px-4 py-2 bg-black text-white dark:bg-white dark:text-black">
        Become a Partner
      </Link>
    </main>
  );
}

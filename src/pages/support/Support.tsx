// src/pages/support/Support.tsx
export default function Support() {
  return (
    <main className="mx-auto max-w-4xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight mb-4">Support</h1>
      <p className="text-neutral-600 dark:text-neutral-300">
        For technical help and parts, contact our support desk. Provide your model, serial/VIN, and a short description.
      </p>
      <ul className="mt-6 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
        <li>Email: <a className="underline" href="mailto:aproglobal@kukjeint.com">aproglobal@kukjeint.com</a></li>
        <li>Hours: Mon–Fri, 09:00–18:00 (KST)</li>
      </ul>
    </main>
  );
}

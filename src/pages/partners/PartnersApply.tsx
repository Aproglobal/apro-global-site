// src/pages/partners/PartnersApply.tsx
export default function PartnersApply() {
  return (
    <main className="mx-auto max-w-3xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">Partner Application</h1>
      <p className="text-neutral-600 dark:text-neutral-300 mb-6">
        Share your region, capabilities, and timing. We’ll follow up for a call.
      </p>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input required placeholder="Company name" className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2" />
        <input required placeholder="Region" className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2" />
        <input required type="email" placeholder="Work email" className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2" />
        <textarea placeholder="Capabilities / experience" className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2 h-28" />
        <button className="rounded-xl px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-semibold">Submit</button>
      </form>
    </main>
  );
}

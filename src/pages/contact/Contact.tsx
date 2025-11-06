// src/pages/contact/Contact.tsx
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle"|"sent">("idle");

  return (
    <main className="mx-auto max-w-3xl px-4 md:px-6 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">Talk to Sales</h1>
      <p className="text-neutral-600 dark:text-neutral-300 mb-6">
        Tell us your model interest, quantity, and site location. We’ll reply with pricing and lead time.
      </p>

      {/* 정적 폼 (메일to 대체). 실제 전송 로직은 Functions 복구 후 교체 가능 */}
      <form
        onSubmit={(e) => { e.preventDefault(); setStatus("sent"); }}
        className="space-y-4"
      >
        <input required placeholder="Your name" className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2" />
        <input required type="email" placeholder="Work email" className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2" />
        <input placeholder="Company" className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2" />
        <textarea placeholder="What models? How many carts? Where to deploy?" className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2 h-28" />
        <button className="rounded-xl px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-semibold">
          Send
        </button>
        {status === "sent" && (
          <div className="text-sm text-green-600 dark:text-green-400">Thanks — we’ll get back to you shortly.</div>
        )}
      </form>
    </main>
  );
}

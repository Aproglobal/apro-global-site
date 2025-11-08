import React from "react";
import { openLead } from "./LeadModal";

type QA = { q: string; a: string };

const FAQ: QA[] = [
  {
    q: "What is Electronic Guidance and how is it installed?",
    a: "Guidance lines are embedded beneath the cart path. On-cart sensors detect the line and signal the motor controller to keep the cart on its intended route. We provide layout guidance and validation steps for installers.",
  },
  {
    q: "How do Voice Guidance cues work?",
    a: "Start/stop announcements play through speakers whenever the cart begins to move or comes to a full stop, improving awareness around tees and crossings. Language, volume, and timing are configurable.",
  },
  {
    q: "What charging infrastructure do we need?",
    a: "Most fleets use a ventilated charging room with assigned bays and dedicated circuits. We’ll suggest a charger-per-fleet mix, labeling, and a daily SOP for your staff.",
  },
  {
    q: "How do we get parts and documentation?",
    a: "We supply parts and PDF documentation through regional partners. Operator quick-starts and maintenance checklists are available in multiple languages.",
  },
];

export default function SupportSection() {
  const salesEmail = (import.meta as any).env?.VITE_SALES_EMAIL || "sales@example.com";

  return (
    <div className="space-y-6">
      {/* FAQ */}
      <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h3 className="text-lg font-bold">Frequently Asked</h3>
        <div className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-800">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-3">
              <summary className="cursor-pointer list-none text-sm font-semibold marker:hidden">
                {item.q}
              </summary>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Direct contact */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-zinc-200 p-6 md:flex-row md:items-center dark:border-zinc-800">
        <div>
          <h4 className="text-lg font-bold">Didn’t find what you need?</h4>
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
            Send us your questions, request a call, or ask for specific documentation.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => openLead("Support: Ask a question")}
            className="rounded-full bg-black px-5 py-2 text-white dark:bg-white dark:text-black"
          >
            Ask Support
          </button>
          <a
            href={`mailto:${salesEmail}`}
            className="rounded-full border px-5 py-2 text-sm border-zinc-300 dark:border-zinc-700"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}

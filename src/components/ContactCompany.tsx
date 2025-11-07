import React from "react";
import { openLead } from "./LeadModal";
import { trackEvent } from "../services/analytics";

export default function ContactCompany() {
  const salesEmail = import.meta.env.VITE_SALES_EMAIL || "sales@example.com";

  return (
    <section id="contact" className="scroll-mt-24 py-20 bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Contact CTAs */}
          <div className="flex-1 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 bg-white dark:bg-zinc-900">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Contact</h2>
            <p className="mt-2 text-zinc-700 dark:text-zinc-200">
              Email us at{" "}
              <a href={`mailto:${salesEmail}`} className="underline">
                {salesEmail}
              </a>{" "}
              or open the form.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  openLead("Contact Section");
                  trackEvent("contactOpen", { where: "contact_section", label: "Talk to Sales" });
                }}
                className="px-5 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
              >
                Talk to Sales
              </button>

              <a
                href="/brochure.pdf"
                onClick={() => trackEvent("brochureDownload", { file: "/brochure.pdf", where: "contact_section" })}
                className="px-5 py-3 rounded-full border border-black/30 dark:border-white/40"
              >
                Download brochure (PDF)
              </a>
            </div>

            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>

          {/* Right: Company block */}
          <div className="md:w-[360px] rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 bg-white dark:bg-zinc-900">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
              Company
            </h3>
            <div className="mt-2 space-y-1 text-sm">
              <div className="font-semibold">KUKJE INTERTRADE Co., Ltd. (APRO)</div>
              <div>Floor 12, 124, Sagimakgol-ro, Jungwon-gu,</div>
              <div>Seongnam-si, Gyeonggi-do, Republic of Korea</div>
              <div className="mt-2">
                Email: <a className="underline" href={`mailto:${salesEmail}`}>{salesEmail}</a>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4 text-xs text-zinc-600 dark:text-zinc-300">
              <div className="font-semibold mb-1">Note</div>
              We are the official seller in Korea for <strong>John Deere</strong> carts and <strong>irrigation</strong>.
              For international sourcing/exports, contact the sales team.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

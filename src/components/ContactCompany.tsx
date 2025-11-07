import React from "react";
import { openLead } from "./LeadModal";
import { trackEvent } from "../services/analytics";

export default function ContactCompany() {
  const sales = (import.meta as any)?.env?.VITE_SALES_EMAIL || "sales@example.com";

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-20 bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white"
      aria-label="Contact & Company"
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Contact</h2>
            <p className="mt-2 text-zinc-700 max-w-prose dark:text-zinc-200">
              Email us at{" "}
              <a href={`mailto:${sales}`} className="underline">
                {sales}
              </a>{" "}
              or open the form below.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  openLead("Contact CTA");
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

            {/* reCAPTCHA policy note (mobile badge hidden via CSS) */}
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

          {/* Company (concise; partners removed) */}
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Company</h3>
            <div className="mt-3 space-y-1 text-sm text-zinc-700 dark:text-zinc-200">
              <p>KUKJE INTERTRADE Co., Ltd. (APRO)</p>
              <p>Floor 12, 124, Sagimakgol-ro, Jungwon-gu, Seongnam-si, Gyeonggi-do, Republic of Korea</p>
              <p>
                Business scope: Electric golf carts (APRO), official seller / distributor in Korea for selected brands
                (e.g., John Deere turf equipment, irrigation solutions).
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                * We do not operate a partner/dealer directory on this site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

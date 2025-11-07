import React from "react";
import { openLead } from "./LeadModal";
import { trackEvent } from "../services/analytics";

export default function ContactCompany() {
  const salesEmail = import.meta.env.VITE_SALES_EMAIL || "sales@example.com";

  return (
    <div className="py-16 bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Contact</h2>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">
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
                  trackEvent("contactOpen", { where: "contact_section" });
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

          {/* Company */}
          <div>
            <h3 className="text-xl font-semibold">Company</h3>
            <div className="mt-3 space-y-2 text-zinc-700 dark:text-zinc-300">
              <p>KUKJE INTERTRADE Co., Ltd. (APRO)</p>
              <p>Floor 12, 124, Sagimakgol-ro, Jungwon-gu, Seongnam-si, Gyeonggi-do, Republic of Korea</p>
              <p>Global sales & after-sales support available.</p>
              <p className="text-xs opacity-80">
                (Note) APRO is the authorized seller for key golf & utility solutions in Korea.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <a href="/brochure.pdf" className="block rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                <div className="text-sm font-medium">Brochure</div>
                <div className="text-xs text-zinc-500">PDF download</div>
              </a>
              <a href="#timeline" className="block rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                <div className="text-sm font-medium">Delivery timeline</div>
                <div className="text-xs text-zinc-500">See how we deliver</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

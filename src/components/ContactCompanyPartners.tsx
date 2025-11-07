import React from "react";
import { openLead } from "./LeadModal";
import { trackEvent } from "../services/analytics";

export default function ContactCompanyPartners() {
  const email = import.meta.env.VITE_SALES_EMAIL || "sales@example.com";

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-20 bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white"
      aria-label="Contact & Partners"
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Contact & Partners
          </h2>
          <a
            href="/brochure.pdf"
            onClick={() => trackEvent("brochureDownload", { file: "/brochure.pdf", where: "contact" })}
            className="px-4 py-2 rounded-full border border-black/30 dark:border-white/40 text-sm"
          >
            Download brochure (PDF)
          </a>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          {/* Company card */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 bg-white/70 dark:bg-black/30">
            <h3 className="text-lg font-semibold">Company</h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
              KUKJE INTERTRADE Co., Ltd. (APRO)
            </p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">
              Floor 12, 124, Sagimakgol-ro, Jungwon-gu, Seongnam-si, Gyeonggi-do
            </p>
            <a href={`mailto:${email}`} className="mt-3 inline-block text-sm underline">
              {email}
            </a>
          </div>

          {/* Sales card */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
            <h3 className="text-lg font-semibold">Talk to Sales</h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
              Get pricing, lead times, and fleet recommendations.
            </p>
            <button
              onClick={() => {
                openLead("Contact: Sales");
                trackEvent("contactOpen", { where: "contact", label: "Talk to Sales" });
              }}
              className="mt-4 px-5 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
            >
              Open contact form
            </button>
          </div>

          {/* Partner card */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
            <h3 className="text-lg font-semibold">Partner with APRO</h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
              Distributors & service partners: ask about regional programs.
            </p>
            <button
              onClick={() => {
                openLead("Contact: Partner");
                trackEvent("partnerOpen", { where: "contact", label: "Become a Partner" });
              }}
              className="mt-4 px-5 py-3 rounded-full border border-black/30 dark:border-white/40"
            >
              Become a partner
            </button>
          </div>
        </div>

        {/* reCAPTCHA policy note */}
        <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>
    </section>
  );
}

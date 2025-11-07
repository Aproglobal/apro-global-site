import React from "react";
import { trackEvent } from "../services/analytics";
import { openLead } from "./LeadModal";
import { Mail, Phone, MapPin, Building2, BadgeCheck } from "lucide-react";

export default function ContactCompany() {
  const salesEmail = import.meta.env.VITE_SALES_EMAIL || "sales@example.com";
  const salesPhone = import.meta.env.VITE_SALES_PHONE || ""; // optional
  const brochureHref = "/brochure.pdf";

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-20 bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white"
      aria-label="Contact & Company"
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Contact
          </h2>
          {/* Small “Authorized seller” chip */}
          <div className="hidden md:flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border border-zinc-300 dark:border-zinc-700">
            <BadgeCheck className="w-4 h-4" />
            <span>Official seller in Korea</span>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {/* Left: CTA & channels */}
          <div className="rounded-2xl p-6 bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-700">
            <p className="text-zinc-700 dark:text-zinc-200">
              Talk to our sales team for APRO golf carts and{" "}
              <strong>John Deere golf & irrigation solutions</strong> in Korea.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
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
                href={brochureHref}
                onClick={() =>
                  trackEvent("brochureDownload", { file: brochureHref, where: "contact_section" })
                }
                className="px-5 py-3 rounded-full border border-black/30 dark:border-white/40"
              >
                Download brochure (PDF)
              </a>
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 opacity-70" />
                <a href={`mailto:${salesEmail}`} className="underline">
                  {salesEmail}
                </a>
              </div>
              {salesPhone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 opacity-70" />
                  <a href={`tel:${salesPhone}`} className="underline">
                    {salesPhone}
                  </a>
                </div>
              )}
            </div>

            {/* reCAPTCHA note (mobile badge is hidden in CSS) */}
            <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
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

          {/* Right: Company box */}
          <div className="rounded-2xl p-6 bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5" />
              <h3 className="font-semibold">Company</h3>
            </div>

            <div className="mt-3 text-sm leading-relaxed">
              <p className="font-medium">KUKJE INTERTRADE Co., Ltd. (APRO)</p>
              <div className="mt-2 flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 opacity-70" />
                <p>
                  Floor 12, 124, Sagimakgol-ro, Jungwon-gu, Seongnam-si, Gyeonggi-do,
                  Republic of Korea
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4">
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  We are the <strong>official seller in Korea</strong> for{" "}
                  <strong>John Deere golf</strong> and <strong>irrigation</strong> solutions.
                  For availability, specifications, and deployments with APRO carts, contact sales.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile chip (shown at bottom on small screens) */}
        <div className="md:hidden mt-6 flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border border-zinc-300 dark:border-zinc-700 w-max">
          <BadgeCheck className="w-4 h-4" />
          <span>Official seller in Korea</span>
        </div>
      </div>
    </section>
  );
}

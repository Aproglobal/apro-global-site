import React from "react";
import { openLead } from "./LeadModal";
import { trackEvent } from "../services/analytics";
import {
  Mail,
  Building2,
  MapPin,
  Handshake,
  FileText,
} from "lucide-react";

export default function ContactCompanyPartners() {
  const email = import.meta.env.VITE_SALES_EMAIL || "sales@example.com";

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-20 bg-zinc-50 dark:bg-zinc-900"
      aria-label="Contact & Partners"
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Contact & Partners
          </h2>
          <a
            href="/brochure.pdf"
            onClick={() =>
              trackEvent("brochureDownload", { file: "/brochure.pdf", where: "contact" })
            }
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/20 dark:border-white/30 text-sm"
          >
            <FileText className="w-4 h-4" />
            Download brochure
          </a>
        </div>

        {/* 2-column: primary CTA block + stacked side cards */}
        <div className="mt-8 grid lg:grid-cols-12 gap-6">
          {/* Primary CTA / message */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-black/30 p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold">
                Tell us your fleet size and timeline — we’ll tailor a plan.
              </h3>
              <p className="mt-3 text-zinc-700 dark:text-zinc-200">
                We help courses and venues size lithium fleets, choose VIP/Semi-VIP
                seating, and plan charging layouts, roll-out, and after-sales support.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    openLead("Contact: Sales");
                    trackEvent("contactOpen", { where: "contact", label: "Talk to Sales" });
                  }}
                  className="px-5 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
                >
                  Talk to Sales
                </button>

                <a
                  href={`mailto:${email}`}
                  className="px-5 py-3 rounded-full border border-black/20 dark:border-white/30"
                >
                  {email}
                </a>
              </div>

              {/* Optional quick points */}
              <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
                  <Building2 className="w-4 h-4 shrink-0" />
                  Fleet sizing & lifecycle programs
                </li>
                <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
                  <MapPin className="w-4 h-4 shrink-0" />
                  On-site demos & roll-outs (KR)
                </li>
              </ul>
            </div>
          </div>

          {/* Side cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Company info */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white/70 dark:bg-black/30">
              <h4 className="text-base font-semibold">Company</h4>
              <dl className="mt-3 space-y-3 text-sm">
                <div className="flex gap-3">
                  <dt className="text-zinc-500 w-20">Name</dt>
                  <dd>KUKJE INTERTRADE Co., Ltd. (APRO)</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-zinc-500 w-20">Email</dt>
                  <dd className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${email}`} className="underline">{email}</a>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-zinc-500 w-20">Address</dt>
                  <dd className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>
                      Floor 12, 124, Sagimakgol-ro, Jungwon-gu, Seongnam-si,
                      Gyeonggi-do, Republic of Korea
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Partner card */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <h4 className="text-base font-semibold flex items-center gap-2">
                <Handshake className="w-4 h-4" />
                Partner with APRO
              </h4>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                Distributors & service providers — ask about regional programs.
              </p>
              <button
                onClick={() => {
                  openLead("Contact: Partner");
                  trackEvent("partnerOpen", { where: "contact", label: "Become a Partner" });
                }}
                className="mt-4 px-5 py-3 rounded-full border border-black/20 dark:border-white/30"
              >
                Become a partner
              </button>
            </div>
          </div>
        </div>

        {/* Policy note (mobile badge hidden via CSS) */}
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

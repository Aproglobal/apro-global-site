import React from "react";
import StageCarousel from "./StageCarousel";
import { openLead } from "./LeadModal";

export default function ContactCompany() {
  const slides = [
    {
      img: "/contact/hero.jpg",
      title: "Talk to Sales",
      desc: "Tell us about your course or venue. We’ll tailor configurations, deployment, and service plans.",
      meta: "Global inquiries welcome",
    },
  ];

  return (
    <div className="not-prose">
      <StageCarousel
        id="contact-stage"
        title="Contact"
        note="Global sales and support across courses, resorts, and large venues."
        slides={slides}
      />

      <div className="mt-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-5 md:p-6 bg-white/70 dark:bg-zinc-950/70 backdrop-blur">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-xs font-semibold tracking-wide text-zinc-500">COMPANY</div>
            <div className="mt-2">KUKJE INTERTRADE Co., Ltd. (APRO)</div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Floor 12, 124, Sagimakgol-ro, Jungwon-gu, Seongnam-si, Gyeonggi-do, Republic of Korea
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-wide text-zinc-500">SALES</div>
            <div className="mt-2">
              <a className="underline" href="mailto:sales@example.com">
                sales@example.com
              </a>
            </div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">English • Korean • Japanese</div>
          </div>

          <div className="flex items-end md:items-center">
            <button
              onClick={() => openLead("Contact Section")}
              className="w-full md:w-auto px-5 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
            >
              Open Contact Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

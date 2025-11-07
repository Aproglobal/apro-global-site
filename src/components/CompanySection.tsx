import React from "react";

export default function CompanySection() {
  return (
    <section id="company" className="scroll-mt-24 py-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Company
          </h2>
          <div className="flex gap-2">
            <a
              href="/company-profile.pdf"
              className="px-4 py-2 rounded-full border border-black/30 dark:border-white/40 text-sm"
            >
              Download company profile
            </a>
            <a
              href="/certifications.pdf"
              className="px-4 py-2 rounded-full border border-black/30 dark:border-white/40 text-sm"
            >
              Certifications
            </a>
          </div>
        </div>

        <p className="mt-3 max-w-3xl text-zinc-700 dark:text-zinc-200">
          KUKJE INTERTRADE Co., Ltd. operates the APRO golf-cart business,
          serving golf courses, resorts, and commercial venues with lithium fleet
          carts, VIP / Semi-VIP models, and after-sales support.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {/* Company facts */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h3 className="text-lg font-semibold mb-4">Legal & Contact</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex gap-3">
                <dt className="w-36 text-zinc-500">Company</dt>
                <dd>KUKJE INTERTRADE Co., Ltd. (APRO)</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-36 text-zinc-500">Address</dt>
                <dd>
                  Floor 12, 124, Sagimakgol-ro, Jungwon-gu, Seongnam-si,
                  Gyeonggi-do, Republic of Korea
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-36 text-zinc-500">Email</dt>
                <dd>
                  <a
                    className="underline"
                    href={`mailto:${import.meta.env.VITE_SALES_EMAIL || "sales@example.com"}`}
                  >
                    {import.meta.env.VITE_SALES_EMAIL || "sales@example.com"}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-36 text-zinc-500">Brands</dt>
                <dd>APRO (electric golf cart)</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-36 text-zinc-500">Focus</dt>
                <dd>Fleet operations, VIP seating, guidance & service</dd>
              </div>
            </dl>
          </div>

          {/* Partners / capabilities */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h3 className="text-lg font-semibold mb-4">Capabilities</h3>
            <ul className="space-y-3 text-sm list-disc pl-5">
              <li>Fleet configuration & lifecycle service programs</li>
              <li>Lithium power systems and charging options</li>
              <li>Guidance / routing & safety-first integrations</li>
              <li>Branding & custom trim options for VIP models</li>
              <li>On-site demo & roll-out support across Korea</li>
            </ul>
            <p className="mt-4 text-xs text-zinc-500">
              (For detailed specifications and availability, see the Resources section.)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

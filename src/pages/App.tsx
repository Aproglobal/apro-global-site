// src/pages/App.tsx
import React from "react";
import Header from "../components/Header";
import CompareTable from "../components/CompareTable";

export default function App() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Top Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-neutral-900 md:text-5xl">
            Premium Electric Carts by APRO
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            Tailored solutions for golf courses, resorts, and events
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() =>
                document
                  .getElementById("models")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full bg-black px-6 py-3 text-white hover:opacity-90"
            >
              Explore Models
            </button>
          </div>
        </div>
      </section>

      {/* Compare Models / Specs */}
      <CompareTable />

      {/* Footer */}
      <footer className="mt-16 border-t border-neutral-200 bg-white text-neutral-800">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
          {/* APRO Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/assets/apro-logo.svg"
                alt="APRO"
                className="h-8 w-auto"
                onError={(e) => ((e.currentTarget.style.display = "none"))}
              />
              <span className="text-lg font-bold">APRO</span>
            </div>
            <p className="text-sm leading-6 text-neutral-600">
              Premium electric cart solutions for golf courses, resorts, and events.
            </p>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-600">
              Company
            </h3>
            <div className="mt-3 space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/kukje-logo.png"
                  alt="KUKJE INTERTRADE Co., Ltd."
                  className="h-6 w-auto"
                  onError={(e) => ((e.currentTarget.style.display = "none"))}
                />
                <span className="font-medium">
                  KUKJE INTERTRADE Co., Ltd.
                </span>
              </div>
              <p>Business Reg. No.: 000-00-00000</p>
              <p>Representative: John Doe</p>
              <p>Address: Floor 0, 00 Building, 00-ro, 00-gu, Seoul, Korea</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-600">
              Contact
            </h3>
            <div className="mt-3 space-y-1 text-sm">
              <p>Tel: +82-2-000-0000</p>
              <p>Email: sales@aproglobal.com</p>
              <p>Hours: Mon–Fri 09:00–18:00 (KST)</p>
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href="mailto:sales@aproglobal.com"
                className="rounded-full border border-neutral-300 px-3 py-1 text-sm hover:bg-neutral-50"
              >
                Email us
              </a>
              <a
                href="tel:+8220000000"
                className="rounded-full border border-neutral-300 px-3 py-1 text-sm hover:bg-neutral-50"
              >
                Call us
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-neutral-500">
            <span>© {new Date().getFullYear()} APRO. All rights reserved.</span>
            <span>KUKJE INTERTRADE Co., Ltd.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

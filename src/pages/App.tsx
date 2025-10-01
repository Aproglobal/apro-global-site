// src/pages/App.tsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import ModelGrid from '../components/ModelGrid';
import CompareTable from '../components/CompareTable';
import TechSection from '../components/TechSection';
import FleetSection from '../components/FleetSection';
import LeadModal, { openLead } from '../components/LeadModal';
import ModelDetail from '../components/ModelDetail';
import { getVariant } from '../utils/ab';
import { setupScrollDepth, trackEvent } from '../services/analytics';
import { initThemeWatcher } from '../utils/theme';
import { getRecaptchaToken } from '../lib/recaptcha';   // ★ 추가

// 🔹 디버그 버튼 컴포넌트
function DebugRecaptcha() {
  async function handleClick() {
    try {
      const token = await getRecaptchaToken("lead");
      console.log("reCAPTCHA token:", token);
      alert("토큰 앞부분: " + token.substring(0, 40) + "...");
    } catch (e) {
      console.error("Recaptcha failed", e);
      alert("Recaptcha 실패: " + (e as Error).message);
    }
  }
  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 px-5 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg z-[200]"
    >
      🔑 Test reCAPTCHA
    </button>
  );
}

export default function App() {
  const variant = getVariant();

  useEffect(() => {
    setupScrollDepth();
    initThemeWatcher();
  }, []);

  const primaryCta = 'Talk to Sales';
  const secondaryCta = variant === 'A' ? 'Explore models' : 'Download brochure';

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Header />
      <main className="pt-16">
        {/* HERO */}
        <section id="home" className="relative">
          <div className="relative h-[70vh] md:h-[80vh] w-full">
            <img
              src="/assets/hero.jpg"
              className="absolute inset-0 w-full h-full object-cover"
              alt="APRO Golf Carts"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent dark:from-black dark:via-black/30 dark:to-transparent" />
            <div className="relative z-10 max-w-6xl mx-auto px-5 h-full flex flex-col justify-end pb-14">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                Electric Carts for Modern Courses
              </h1>
              <p className="mt-3 max-w-2xl text-zinc-700 dark:text-zinc-200">
                Premium guidance, flexible seating, and dependable service across APAC.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    openLead('Hero CTA');
                    trackEvent('cta_click', { where: 'hero', label: primaryCta, variant });
                  }}
                  className="px-5 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
                >
                  {primaryCta}
                </button>
                {secondaryCta === 'Explore models' ? (
                  <a
                    href="#models"
                    onClick={() =>
                      trackEvent('cta_click', { where: 'hero', label: secondaryCta, variant })
                    }
                    className="px-5 py-3 rounded-full border border-black/40 text-black dark:border-white/60 dark:text-white"
                  >
                    {secondaryCta}
                  </a>
                ) : (
                  <a
                    href="/brochure.pdf"
                    onClick={() =>
                      trackEvent('brochure_download', { file: '/brochure.pdf', where: 'hero' })
                    }
                    className="px-5 py-3 rounded-full border border-black/40 text-black dark:border-white/60 dark:text-white"
                  >
                    {secondaryCta}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        <ModelGrid />
        <CompareTable />
        <TechSection />
        <FleetSection />

        {/* SUPPORT */}
        <section id="support" className="py-20 bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Support</h2>
            <div className="mt-4 grid md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700">
                <h4 className="font-semibold">Installation</h4>
                <p className="text-sm text-zinc-600 mt-1 dark:text-zinc-300">
                  Onsite setup, guidance calibration, and safety training.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700">
                <h4 className="font-semibold">Maintenance</h4>
                <p className="text-sm text-zinc-600 mt-1 dark:text-zinc-300">
                  Preventive checks, genuine parts, and service SLAs.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700">
                <h4 className="font-semibold">Operations</h4>
                <p className="text-sm text-zinc-600 mt-1 dark:text-zinc-300">
                  Best practices for busy tee sheets and event logistics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Contact</h2>
            <p className="mt-2 text-zinc-700 max-w-2xl dark:text-zinc-200">
              Email us at{' '}
              <a
                href={`mailto:${import.meta.env.VITE_SALES_EMAIL || 'sales@example.com'}`}
                className="underline"
              >
                {import.meta.env.VITE_SALES_EMAIL || 'sales@example.com'}
              </a>{' '}
              or open the form above.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  openLead('Contact CTA');
                  trackEvent('cta_click', { where: 'contact', label: 'Talk to Sales' });
                }}
                className="px-5 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
              >
                Talk to Sales
              </button>
              <a
                href="/brochure.pdf"
                onClick={() =>
                  trackEvent('brochure_download', { file: '/brochure.pdf', where: 'contact' })
                }
                className="px-5 py-3 rounded-full border border-black/30 dark:border-white/40"
              >
                Download brochure (PDF)
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky CTA */}
      <button
        onClick={() => {
          openLead('Sticky CTA');
          trackEvent('cta_click', { where: 'sticky', label: 'Talk to Sales' });
        }}
        className="fixed bottom-6 right-6 px-5 py-3 rounded-full bg-black text-white font-semibold shadow-lg dark:bg-white dark:text-black"
      >
        Talk to Sales
      </button>

      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <div className="max-w-6xl mx-auto px-5 py-6 text-sm text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} APRO. All rights reserved.
          <div className="mt-4">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-500">
              Company information
            </h3>
            <p className="mt-1">KUKJE INTERTRADE Co., Ltd.</p>
            <p className="mt-1">
              Address: Floor 12, 124, Sagimakgol-ro, Jungwon-gu, Seongnam-si,
              Gyeonggi-do, Republic of Korea
            </p>
          </div>
        </div>
      </footer>

      <LeadModal />
      <ModelDetail />

      {/* 🔹 디버깅 버튼 */}
      <DebugRecaptcha />
    </div>
  );
}

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

export default function App() {
  const variant = getVariant();

  useEffect(() => {
    setupScrollDepth();
  }, []);

  const primaryCta = 'Talk to Sales';
  const secondaryCta = variant === 'A' ? 'Explore models' : 'Download brochure';

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-16">
        {/* HERO */}
        <section id="home" className="relative">
          <div className="relative h-[70vh] md:h-[80vh] w-full">
            <img src="/assets/hero.jpg" className="absolute inset-0 w-full h-full object-cover" alt="OPANDA EV Golf Carts" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="relative z-10 max-w-6xl mx-auto px-5 h-full flex flex-col justify-end pb-14">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Electric Carts for Modern Courses</h1>
              <p className="mt-3 max-w-2xl text-zinc-200">Premium guidance, flexible seating, and dependable service across APAC.</p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => { openLead('Hero CTA'); trackEvent('cta_click', { where: 'hero', label: primaryCta, variant }); }}
                        className="px-5 py-3 rounded-full bg-white text-black font-semibold">{primaryCta}</button>
                {secondaryCta === 'Explore models' ? (
                  <a href="#models" onClick={() => trackEvent('cta_click', { where: 'hero', label: secondaryCta, variant })}
                     className="px-5 py-3 rounded-full border border-white/60">{secondaryCta}</a>
                ) : (
                  <a href="/brochure.pdf" onClick={() => trackEvent('brochure_download', { file: '/brochure.pdf', where: 'hero' })}
                     className="px-5 py-3 rounded-full border border-white/60">{secondaryCta}</a>
                )}
              </div>
            </div>
          </div>
        </section>

        <ModelGrid />
        <CompareTable />
        <TechSection />
        <FleetSection />

        <section id="support" className="py-20 bg-white text-black">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Support</h2>
            <div className="mt-4 grid md:grid-cols-3 gap-6">
              <div className="rounded-2xl border p-6">
                <h4 className="font-semibold">Installation</h4>
                <p className="text-sm text-zinc-600 mt-1">Onsite setup, guidance calibration, and safety training.</p>
              </div>
              <div className="rounded-2xl border p-6">
                <h4 className="font-semibold">Maintenance</h4>
                <p className="text-sm text-zinc-600 mt-1">Preventive checks, genuine parts, and service SLAs.</p>
              </div>
              <div className="rounded-2xl border p-6">
                <h4 className="font-semibold">Operations</h4>
                <p className="text-sm text-zinc-600 mt-1">Best practices for busy tee sheets and event logistics.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-zinc-100 text-black">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Contact</h2>
            <p className="mt-2 text-zinc-700 max-w-2xl">
              Email us at <a href={`mailto:${import.meta.env.VITE_SALES_EMAIL || 'sales@example.com'}`} className="underline">{import.meta.env.VITE_SALES_EMAIL || 'sales@example.com'}</a> or open the form above.
            </p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => { openLead('Contact CTA'); trackEvent('cta_click', { where: 'contact', label: 'Talk to Sales' }); }}
                      className="px-5 py-3 rounded-full bg-black text-white font-semibold">Talk to Sales</button>
              <a href="/brochure.pdf" onClick={() => trackEvent('brochure_download', { file: '/brochure.pdf', where: 'contact' })}
                 className="px-5 py-3 rounded-full border">Download brochure (PDF)</a>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky CTA */}
      <button onClick={() => { openLead('Sticky CTA'); trackEvent('cta_click', { where: 'sticky', label: 'Talk to Sales' }); }}
              className="fixed bottom-6 right-6 px-5 py-3 rounded-full bg-white text-black font-semibold shadow-lg">
        Talk to Sales
      </button>

      <footer className="border-t border-zinc-800 bg-black">
        <div className="max-w-6xl mx-auto px-5 py-6 text-sm text-zinc-400">
          © {new Date().getFullYear()} OPANDA EV. All rights reserved.
        </div>
      </footer>

      <LeadModal />
      <ModelDetail />
    </div>
  );
}

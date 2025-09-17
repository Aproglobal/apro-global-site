import React from 'react';
import { openLead } from './LeadModal';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
        <a href="#home" className="text-white text-xl tracking-wide font-semibold">APRO</a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-zinc-200">
          <a href="#models" className="hover:text-white">Models</a>
          <a href="#technology" className="hover:text-white">Technology</a>
          <a href="#fleet" className="hover:text-white">Fleet & Leasing</a>
          <a href="#support" className="hover:text-white">Support</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
        <button
          onClick={() => openLead('Header CTA')}
          className="ml-4 px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition"
          aria-label="Talk to Sales"
        >
          Talk to Sales
        </button>
      </div>
    </header>
  );
}

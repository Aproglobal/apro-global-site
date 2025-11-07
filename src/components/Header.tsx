// src/components/Header.tsx
import React, { useEffect, useRef } from "react";
import { trackEvent } from "../services/analytics";
import { openLead } from "./LeadModal";

const HEADER_MIN = 64; // px

export default function Header() {
  const ref = useRef<HTMLDivElement | null>(null);

  // Keep a CSS var with the header height for top padding in <main>
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setVar = () => {
      const h = Math.max(el.getBoundingClientRect().height, HEADER_MIN);
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };

    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <header
      ref={ref}
      className="fixed top-0 inset-x-0 z-40 bg-white/75 backdrop-blur border-b border-zinc-200 dark:bg-black/50 dark:border-zinc-800"
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#home" className="font-semibold">APRO</a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#models">Models</a>
          <a href="#technology">Technology</a>
          <a href="#service">Service</a>
          <a href="#support">Support</a>
          <button
            onClick={() => {
              openLead("Header CTA");
              trackEvent("contactOpen", { where: "header", label: "Talk to Sales" });
            }}
            className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black"
          >
            Talk to Sales
          </button>
        </nav>
      </div>
    </header>
  );
}
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "../services/analytics";
import { openLead } from "./LeadModal";

/** -------------------------------
 *  Config (no TS types to avoid parser issues)
 * --------------------------------*/
const LABELS = {// src/components/Header.tsx
import React, { useEffect, useRef, useState } from "react";
import { trackEvent } from "../services/analytics";// src/components/Header.tsx
import React, { useEffect, useRef, useState } from "react";import React, { useEffect, useState } from "react";
import { openLead } from "./LeadModal";
import { trackEvent } from "../services/analytics";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "#home", label: "Home" },
  { href: "#models", label: "Models" },
  { href: "#technology", label: "Technology" },
  { href: "#industries", label: "Industries" },
  { href: "#timeline", label: "Timeline" },
  { href: "#service", label: "Service" },
  { href: "#charging", label: "Charging" },
  { href: "#resources", label: "Resources" },
  { href: "#tco", label: "TCO" },
  { href: "#configurator", label: "Configurator" },
  { href: "#fleet", label: "Fleet" },
  { href: "#support", label: "Support" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur-md border-b border-zinc-200 dark:bg-black/50 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#home" className="font-extrabold text-lg tracking-tight">APRO</a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              openLead("Header CTA");
              trackEvent("contactOpen", { where: "header", label: "Talk to Sales" });
            }}
            className="ml-2 rounded-full px-4 py-2 bg-black text-white text-sm font-semibold dark:bg-white dark:text-black"
          >
            Talk to Sales
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Menu</span>
          <div className="w-5 h-0.5 bg-current relative">
            <span className="absolute -top-1.5 left-0 w-5 h-0.5 bg-current" />
            <span className="absolute top-1.5 left-0 w-5 h-0.5 bg-current" />
          </div>
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60" onClick={() => setOpen(false)}>
          <div
            className="absolute top-0 right-0 h-full w-80 max-w-[80%] bg-white dark:bg-zinc-900 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-lg">APRO</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700"
              >
                ×
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-zinc-800 dark:text-zinc-200"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  openLead("Header (mobile) CTA");
                  trackEvent("contactOpen", { where: "header_mobile", label: "Talk to Sales" });
                }}
                className="mt-2 rounded-full px-4 py-2 bg-black text-white font-semibold dark:bg-white dark:text-black"
              >
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

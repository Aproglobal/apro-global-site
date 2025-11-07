import React, { useState } from "react";
import { Link } from "react-router-dom";

const NAV = [
  { label: "Models", href: "/#models" },
  { label: "Technology", href: "/#tech" },
  { label: "Industries", href: "/#industries" },
  { label: "Resources", href: "/#resources" },
  { label: "Support", href: "/#support" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-black" aria-hidden />
          <span className="text-base font-semibold tracking-tight">APRO</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm text-gray-700 hover:text-black"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Talk to Sales
          </a>
        </nav>

        {/* Mobile */}
        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="h-5 w-6">
            <div className="my-1 h-0.5 w-6 bg-black" />
            <div className="my-1 h-0.5 w-6 bg-black" />
            <div className="my-1 h-0.5 w-6 bg-black" />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-200 md:hidden">
          <nav className="mx-auto max-w-6xl px-6 py-4">
            <ul className="flex flex-col gap-3">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    className="block rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="block rounded-lg bg-black px-3 py-2 text-center text-sm font-medium text-white hover:opacity-90"
                  onClick={() => setOpen(false)}
                >
                  Talk to Sales
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

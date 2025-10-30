import React, { useEffect, useState, useCallback } from "react";
import { openLead } from "./LeadModal";

const LINKS = [
  { href: "#models", label: "Models" },
  { href: "#compare", label: "Compare" },
  { href: "#technology", label: "Technology" },
  { href: "#charging", label: "Charging" },
  { href: "#industries", label: "Industries" },
  { href: "#resources", label: "Resources" },
  { href: "#support", label: "Support" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onResize = () => window.innerWidth >= 1024 && close();
    document.addEventListener("keydown", onEsc);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onEsc);
      window.removeEventListener("resize", onResize);
    };
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-black/60 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-5">
        {/* ✅ 3열 그리드: 좌 로고 / 중 내비(가운데 고정) / 우 CTA */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 gap-3">
          {/* Left: Logo */}
          <a href="/" className="font-extrabold tracking-tight text-lg text-black dark:text-white">
            APRO
          </a>

          {/* Center: Desktop nav */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-6 text-sm font-medium">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-zinc-800 dark:text-zinc-200 hover:opacity-80"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: CTA (desktop) + Burger (mobile) */}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden inline-flex h-10 px-3 items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm"
            >
              Menu
            </button>

            {/* ✅ 데스크탑 CTA: 한 줄 고정 + 중앙 정렬 보장 */}
            <button
              type="button"
              onClick={() => openLead("Header CTA")}
              className="hidden lg:inline-flex h-10 px-4 items-center justify-center rounded-full
                         bg-black text-white dark:bg-white dark:text-black
                         text-sm font-semibold whitespace-nowrap leading-none tracking-tight
                         shrink-0"
            >
              Talk to Sales
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={close} />
          <aside
            role="dialog"
            aria-modal="true"
            className="absolute right-0 top-0 h-full w-[78%] max-w-sm bg-white dark:bg-zinc-900 shadow-xl
                       p-5 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold tracking-tight text-lg">APRO</span>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="inline-grid place-items-center h-9 w-9 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                ✕
              </button>
            </div>

            <nav className="mt-6">
              <ul className="space-y-2 text-base">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={close}
                      className="block rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto pt-4">
              <button
                type="button"
                onClick={() => {
                  close();
                  openLead("Header CTA (Mobile)");
                }}
                className="w-full inline-flex h-11 px-4 items-center justify-center rounded-full
                           bg-black text-white dark:bg-white dark:text-black
                           text-sm font-semibold"
              >
                Talk to Sales
              </button>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}

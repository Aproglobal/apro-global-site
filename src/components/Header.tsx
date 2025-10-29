import React from "react";
import { openLead } from "./LeadModal";
import { getThemeMode, setThemeMode, subscribeTheme } from "../utils/theme";
import { trackEvent } from "../services/analytics";

type Mode = "light" | "dark" | "system";

function ThemeToggle() {
  const [mode, setMode] = React.useState<Mode>(() => getThemeMode());
  React.useEffect(() => {
    const unsub = subscribeTheme(() => setMode(getThemeMode()));
    return () => {
      unsub();
    };
  }, []);

  const OPTIONS = ["system", "light", "dark"] as const;
  const LABEL: Record<Mode, string> = { system: "Auto", light: "Light", dark: "Dark" };

  return (
    <div
      className="hidden sm:flex rounded-full border border-black/20 dark:border-white/20 overflow-hidden text-sm"
      role="group"
      aria-label="Theme"
    >
      {OPTIONS.map((m) => (
        <button
          key={m}
          onClick={() => setThemeMode(m)}
          aria-pressed={mode === m}
          title={m === "system" ? "Follow OS theme" : LABEL[m]}
          className={[
            "px-3 py-1.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20",
            mode === m ? "bg-black text-white dark:bg-white dark:text-black" : "text-black dark:text-white",
          ].join(" ")}
        >
          {LABEL[m]}
        </button>
      ))}
    </div>
  );
}

function ThemeCycleButton() {
  const [mode, setMode] = React.useState<Mode>(() => getThemeMode());
  React.useEffect(() => {
    const unsub = subscribeTheme(() => setMode(getThemeMode()));
    return () => {
      unsub();
    };
  }, []);

  const order: Mode[] = ["system", "light", "dark"];
  const next = () => {
    const idx = order.indexOf(mode);
    const to = order[(idx + 1) % order.length];
    setThemeMode(to);
  };

  const label = mode === "system" ? "Auto" : mode === "light" ? "Light" : "Dark";
  const icon = mode === "system" ? "A" : mode === "light" ? "☀️" : "🌙";

  return (
    <button
      onClick={next}
      className="sm:hidden inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-black/20 dark:border-white/20 text-xs"
      title="Theme"
      aria-label={`Theme: ${label}`}
    >
      <span aria-hidden>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

type NavItem = { label: string; href: string };
const NAV: NavItem[] = [
  { label: "Models", href: "#models" },
  { label: "Technology", href: "#technology" },
  { label: "Industries", href: "#industries" },
  { label: "Service", href: "#service" },
  { label: "Charging", href: "#charging" },
  { label: "Resources", href: "#resources" },
  { label: "TCO", href: "#tco" },
  { label: "Configurator", href: "#configurator" },
  { label: "Fleet & Leasing", href: "#fleet" },
  { label: "Support", href: "#support" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const onNavClick = (item: NavItem) => {
    trackEvent("navClick", { link: item.label, href: item.href, position: "header" });
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
        <a
          href="#home"
          className="text-black dark:text-white text-xl tracking-wide font-semibold"
          onClick={() => trackEvent("brandClick", { where: "header" })}
        >
          APRO
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => onNavClick(n)}
              className="text-zinc-700 hover:text-black dark:text-zinc-200 dark:hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Mobile theme button / Desktop theme toggle */}
          <ThemeCycleButton />
          <ThemeToggle />

          {/* Mobile menu toggle */}
          <button
            className="md:hidden inline-flex h-9 px-3 rounded-full border border-black/20 dark:border-white/20 text-xs"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            Menu
          </button>

          {/* Header CTA */}
          <button
            onClick={() => {
              openLead("Header CTA");
              trackEvent("headerCtaClick", { where: "header", label: "Talk to Sales" });
            }}
            className="hidden sm:inline-flex ml-1 px-4 py-2 rounded-full bg-black text-white text-sm font-semibold hover:opacity-90 dark:bg-white dark:text-black transition"
            aria-label="Talk to Sales"
          >
            Talk to Sales
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-black/95"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-6xl mx-auto px-5 py-4">
            <ul className="grid gap-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => onNavClick(n)}
                    className="block w-full px-3 py-2 rounded-lg text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  openLead("Header CTA (mobile)");
                  trackEvent("headerCtaClick", { where: "header_mobile", label: "Talk to Sales" });
                  setMenuOpen(false);
                }}
                className="flex-1 px-4 py-2 rounded-full bg-black text-white text-sm font-semibold hover:opacity-90 dark:bg-white dark:text-black transition"
              >
                Talk to Sales
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

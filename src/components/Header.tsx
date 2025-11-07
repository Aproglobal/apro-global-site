import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Models", href: "#models" },
  { label: "Technology", href: "#technology" },
  { label: "Service", href: "#service" },
  { label: "Resources", href: "#resources" },import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Models", href: "#models" },
  { label: "Technology", href: "#technology" },
  { label: "Service", href: "#service" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#contact" },
];

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Initialize from localStorage or prefers-color-scheme
    const saved = (localStorage.getItem("theme") as "light" | "dark" | null) ?? null;
    const isDark = saved ? saved === "dark" : window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 bg-white/80 px-3 text-sm text-zinc-700 hover:bg-white
                 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:bg-zinc-900"
    >
      {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Scroll effects: header state + progress bar
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 4);

      const doc = document.documentElement;
      const total = (doc.scrollHeight - doc.clientHeight) || 1;
      setProgress(Math.min(1, Math.max(0, y / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection (if sections with these IDs exist)
  useEffect(() => {
    const ids = NAV.filter((n) => n.href.startsWith("#")).map((n) => n.href.slice(1));
    const opts: IntersectionObserverInit = { root: null, rootMargin: "-40% 0px -55% 0px", threshold: 0 };
    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]?.target?.id) setActive(visible[0].target.id);
    }, opts);

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const linkBase = "inline-flex items-center px-3 py-2 text-sm font-medium transition-colors";
  const linkIdle = "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white";
  const linkActive = "text-zinc-900 dark:text-white";

  return (
    <>
      {/* Sticky Header */}
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all",
          scrolled ? "backdrop-blur bg-white/70 shadow-sm dark:bg-black/50" : "bg-transparent",
        ].join(" ")}
      >
        {/* Progress bar */}
        <div
          className="h-0.5 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-sky-500 transition-[width]"
          style={{ width: `${progress * 100}%` }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Brand */}
            <a href="/" className="flex items-center gap-2" aria-label="APRO — go to home">
              <div className="h-6 w-6 rounded-md bg-black dark:bg-white" />
              <span className="text-lg font-semibold tracking-tight">APRO</span>
            </a>

            {/* Center: Nav (Desktop) */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((item) => {
                const isActive = active === item.href.replace("#", "");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={[linkBase, isActive ? linkActive : linkIdle].join(" ")}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden md:inline-flex items-center rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50
                           dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                Talk to Sales
              </a>

              <ThemeToggle />

              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-white
                           dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:bg-zinc-900"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div
          className={[
            "md:hidden overflow-hidden transition-[max-height,opacity] duration-300",
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <nav className="space-y-1 border-t border-zinc-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-zinc-700 hover:bg-zinc-50
                           dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-1 block rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base font-medium text-zinc-900 hover:bg-zinc-50
                         dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Talk to Sales
            </a>
          </nav>
        </div>
      </header>

      {/* Spacer to prevent content jump under fixed header */}
      <div className="h-16" />
    </>
  );
}

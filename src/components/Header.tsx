import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Models", href: "#models" },
  { label: "Technology", href: "#technology" },
  { label: "Service", href: "#service" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#contact" },
];

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
    const ids = NAV.filter(n => n.href.startsWith("#")).map(n => n.href.slice(1));
    const opts: IntersectionObserverInit = { root: null, rootMargin: "-40% 0px -55% 0px", threshold: 0 };
    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => (a.boundingClientRect.top - b.boundingClientRect.top));
      if (visible[0]?.target?.id) setActive(visible[0].target.id);
    }, opts);

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const linkBase =
    "inline-flex items-center px-3 py-2 text-sm font-medium transition-colors";
  const linkIdle = "text-gray-600 hover:text-gray-900";
  const linkActive = "text-gray-900";

  return (
    <>
      {/* Sticky Header */}
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all",
          scrolled ? "backdrop-blur bg-white/70 shadow-sm" : "bg-transparent",
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
            <a
              href="/"
              className="flex items-center gap-2"
              aria-label="APRO — go to home"
            >
              <div className="h-6 w-6 rounded-md bg-black" />
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
                    className={[
                      linkBase,
                      isActive ? linkActive : linkIdle,
                    ].join(" ")}
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
                className="hidden md:inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                Talk to Sales
              </a>

              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white/80 text-gray-700 hover:bg-white"
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
          <nav className="space-y-1 border-t border-gray-200 bg-white/90 px-4 py-3 backdrop-blur">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-1 block rounded-lg border border-gray-300 bg-white px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
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

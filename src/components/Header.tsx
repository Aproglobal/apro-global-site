import React, { useEffect, useMemo, useRef, useState } from "react";
import { openLead } from "./LeadModal";

type NavItem = { id: string; label: string };

const NAV: NavItem[] = [
  { id: "models", label: "Models" },
  { id: "technology", label: "Technology" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Scroll spy
  useEffect(() => {
    const ids = ["home", ...NAV.map(n => n.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id")!;
          if (entry.isIntersecting) setActive(id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Underline position
  useEffect(() => {
    const el = active && itemRefs.current[active];
    const bar = barRef.current;
    if (!el || !bar) return;
    const { left, width } = el.getBoundingClientRect();
    const headerLeft = el.closest("nav")?.getBoundingClientRect().left ?? 0;
    bar.style.transform = `translateX(${left - headerLeft}px)`;
    bar.style.width = `${width}px`;
  }, [active]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = useMemo(() => NAV, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors ${
        scrolled ? "backdrop-blur bg-white/70 dark:bg-black/50 border-b border-zinc-200/60 dark:border-zinc-800/60" : ""
      }`}
      style={{ ["--header-h" as any]: "64px" }}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#home" className="font-extrabold text-lg tracking-tight">APRO</a>

        <nav className="relative hidden md:flex items-center gap-6">
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              ref={(el) => (itemRefs.current[id] = el)}
              className={`pb-1 transition-colors ${
                active === id ? "text-black dark:text-white" : "text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
          {/* underline */}
          <div
            ref={barRef}
            className="absolute -bottom-[1px] h-[2px] bg-black dark:bg-white rounded-full transition-transform duration-200"
            style={{ width: 0 }}
          />
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/brochure.pdf"
            className="hidden sm:inline-flex px-3 py-2 rounded-full border border-black/30 dark:border-white/40 text-sm"
          >
            Brochure
          </a>
          <button
            onClick={() => openLead("Header CTA")}
            className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-semibold"
          >
            Talk to Sales
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

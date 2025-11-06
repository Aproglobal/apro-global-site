// src/components/Header.tsx
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

type NavItem =
  | { label: string; to: string }
  | { label: string; children: { label: string; to: string }[] };

const nav: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "Models",
    children: [
      { label: "All Models", to: "/models" },
      { label: "Compare", to: "/models/compare" },
      { label: "Configurator", to: "/models/configurator" },
      { label: "Technology", to: "/models/technology" },      // ⬅️ 이동
      { label: "Service & Warranty", to: "/models/service" },  // ⬅️ 이동
      { label: "Case Studies", to: "/models/cases" },          // ⬅️ 이동
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About", to: "/company/about" },
      { label: "Resources", to: "/company/resources" },
    ],
  },
  {
    label: "Partners",
    children: [
      { label: "Partner Program", to: "/partners" },
      { label: "Become a Partner", to: "/partners/apply" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ESC/외부클릭 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIdx(null);
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest?.("[data-nav-root]")) setOpenIdx(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  const linkBase =
    "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-neutral-800";
  const active =
    "text-black dark:text-white";
  const inactive =
    "text-neutral-600 dark:text-neutral-300";

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-950/70 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 md:px-6" data-nav-root>
        <div className="flex h-14 items-center justify-between">
          <Link to="/" className="font-extrabold tracking-tight text-lg">
            APRO
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item, i) => {
              if ("to" in item) {
                return (
                  <NavLink
                    key={i}
                    to={item.to}
                    className={({ isActive }) =>
                      `${linkBase} ${isActive ? active : inactive}`
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              }
              return (
                <div key={i} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className={`${linkBase} ${inactive} inline-flex items-center gap-1`}
                  >
                    {item.label}
                    <svg width="14" height="14" viewBox="0 0 20 20" className="opacity-70">
                      <path d="M5 7l5 6 5-6H5z" fill="currentColor" />
                    </svg>
                  </button>
                  {openIdx === i && (
                    <div className="absolute left-0 mt-2 min-w-56 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg p-1">
                      {item.children.map((c) => (
                        <NavLink
                          key={c.to}
                          to={c.to}
                          onClick={() => setOpenIdx(null)}
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-lg text-sm ${
                              isActive ? "bg-gray-100 dark:bg-neutral-800" : "hover:bg-gray-50 dark:hover:bg-neutral-800/60"
                            }`
                          }
                        >
                          {c.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              to="/contact"
              className="ml-2 inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
            >
              Talk to Sales
            </Link>
          </nav>

          {/* Mobile */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg px-2 py-2 border border-neutral-200 dark:border-neutral-800"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open Menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile panel */}
        {mobileOpen && (
          <div className="md:hidden pb-3">
            <div className="mt-2 rounded-xl border border-neutral-200 dark:border-neutral-800 p-2">
              {nav.map((item, i) => {
                if ("to" in item) {
                  return (
                    <NavLink
                      key={i}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-lg text-sm ${
                          isActive
                            ? "bg-gray-100 dark:bg-neutral-800"
                            : "hover:bg-gray-50 dark:hover:bg-neutral-800/60"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  );
                }
                return (
                  <details key={i} className="group">
                    <summary className="cursor-pointer list-none px-3 py-2 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-neutral-800/60">
                      {item.label}
                    </summary>
                    <div className="mt-1 pl-2">
                      {item.children.map((c) => (
                        <NavLink
                          key={c.to}
                          to={c.to}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-lg text-sm ${
                              isActive
                                ? "bg-gray-100 dark:bg-neutral-800"
                                : "hover:bg-gray-50 dark:hover:bg-neutral-800/60"
                            }`
                          }
                        >
                          {c.label}
                        </NavLink>
                      ))}
                    </div>
                  </details>
                );
              })}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block text-center rounded-xl px-3 py-2 text-sm font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

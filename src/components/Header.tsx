import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/models", label: "Models" },
  { to: "/company/about", label: "Company" },
  { to: "/partners", label: "Partners" },
  { to: "/contact", label: "Contact" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  const onToggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/70 dark:border-white/10 bg-white/80 dark:bg-gray-950/70 backdrop-blur">
      <div className="container-xl h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-extrabold">
          APRO
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-brand-600 dark:text-brand-500"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://forms.gle/9z6Z-example" /* TODO: 진짜 폼 URL로 교체 */
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            onClick={() => {
              // @ts-ignore
              if (typeof window.gtag === "function")
                window.gtag("event", "lead_click", { location: "header" });
            }}
          >
            Talk to Sales
          </a>
          <button
            className="btn btn-ghost"
            aria-label="Toggle theme"
            onClick={onToggleTheme}
          >
            Theme
          </button>
        </div>

        {/* Mobile */}
        <button className="md:hidden btn btn-ghost" onClick={() => setOpen((v) => !v)}>
          Menu
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200/70 dark:border-white/10 bg-white dark:bg-gray-950">
          <div className="container-xl py-4 flex flex-col gap-2">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className="py-2 text-gray-700 dark:text-gray-300"
              >
                {n.label}
              </NavLink>
            ))}
            <a
              href="https://forms.gle/9z6Z-example"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary mt-2"
            >
              Talk to Sales
            </a>
            <button className="btn btn-ghost" onClick={onToggleTheme}>Theme</button>
          </div>
        </div>
      )}
    </header>
  );
}

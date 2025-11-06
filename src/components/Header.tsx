import { NavLink, Link, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useClickOutside<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return ref;
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() =>
    document.documentElement.classList.contains("dark")
  );

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    const root = document.documentElement;
    root.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
      aria-label="Toggle dark mode"
    >
      {isDark ? "Dark" : "Light"}
    </button>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modelsOpen, setModelsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [partnersOpen, setPartnersOpen] = useState(false);
  const location = useLocation();

  // 라우트가 바뀌면 드롭다운/모바일 메뉴 닫기
  useEffect(() => {
    setMobileOpen(false);
    setModelsOpen(false);
    setCompanyOpen(false);
    setPartnersOpen(false);
  }, [location.pathname]);

  const modelsRef = useClickOutside<HTMLDivElement>(() => setModelsOpen(false));
  const companyRef = useClickOutside<HTMLDivElement>(() => setCompanyOpen(false));
  const partnersRef = useClickOutside<HTMLDivElement>(() => setPartnersOpen(false));

  const linkBase =
    "inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800";
  const activeBase =
    "text-black dark:text-white";
  const inactiveBase =
    "text-neutral-700 dark:text-neutral-300";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xl font-extrabold tracking-tight">
            APRO
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cx(linkBase, isActive ? activeBase : inactiveBase)
            }
            end
          >
            Home
          </NavLink>

          {/* Models (dropdown) */}
          <div className="relative" ref={modelsRef}>
            <button
              className={cx(linkBase, inactiveBase)}
              onClick={() => {
                setModelsOpen((v) => !v);
                setCompanyOpen(false);
                setPartnersOpen(false);
              }}
              aria-expanded={modelsOpen}
            >
              Models
              <span aria-hidden>▾</span>
            </button>
            {modelsOpen && (
              <div className="absolute left-0 mt-2 w-64 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                <ul className="p-2 text-sm">
                  <li>
                    <NavLink
                      to="/models"
                      className={({ isActive }) =>
                        cx(
                          "block rounded-lg px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                          isActive ? "font-semibold" : ""
                        )
                      }
                    >
                      All Models
                    </NavLink>
                  </li>
                  <li className="my-1 h-px bg-neutral-200 dark:bg-neutral-800" />
                  <li>
                    <NavLink
                      to="/models/technology"
                      className="block rounded-lg px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      Technology
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/models/service-warranty"
                      className="block rounded-lg px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      Service &amp; Warranty
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/models/cases"
                      className="block rounded-lg px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      Case Studies
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Company (dropdown) */}
          <div className="relative" ref={companyRef}>
            <button
              className={cx(linkBase, inactiveBase)}
              onClick={() => {
                setCompanyOpen((v) => !v);
                setModelsOpen(false);
                setPartnersOpen(false);
              }}
              aria-expanded={companyOpen}
            >
              Company <span aria-hidden>▾</span>
            </button>
            {companyOpen && (
              <div className="absolute left-0 mt-2 w-56 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                <ul className="p-2 text-sm">
                  <li>
                    <NavLink
                      to="/company/about"
                      className="block rounded-lg px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/company/resources"
                      className="block rounded-lg px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      Resources
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Partners (dropdown) */}
          <div className="relative" ref={partnersRef}>
            <button
              className={cx(linkBase, inactiveBase)}
              onClick={() => {
                setPartnersOpen((v) => !v);
                setModelsOpen(false);
                setCompanyOpen(false);
              }}
              aria-expanded={partnersOpen}
            >
              Partners <span aria-hidden>▾</span>
            </button>
            {partnersOpen && (
              <div className="absolute left-0 mt-2 w-56 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                <ul className="p-2 text-sm">
                  <li>
                    <NavLink
                      to="/partners"
                      className="block rounded-lg px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      Overview
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/partners/apply"
                      className="block rounded-lg px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      Apply
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              cx(linkBase, isActive ? activeBase : inactiveBase)
            }
          >
            Contact
          </NavLink>

          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="inline-flex items-center rounded-md border border-neutral-200 p-2 md:hidden dark:border-neutral-800"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 py-3 md:hidden dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex flex-col gap-1">
            <NavLink to="/" className="rounded-md px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800" end>
              Home
            </NavLink>

            <details>
              <summary className="cursor-pointer rounded-md px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                Models
              </summary>
              <div className="ml-3 mt-1 flex flex-col">
                <NavLink to="/models" className="rounded-md px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  All Models
                </NavLink>
                <NavLink to="/models/technology" className="rounded-md px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  Technology
                </NavLink>
                <NavLink to="/models/service-warranty" className="rounded-md px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  Service &amp; Warranty
                </NavLink>
                <NavLink to="/models/cases" className="rounded-md px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  Case Studies
                </NavLink>
              </div>
            </details>

            <details>
              <summary className="cursor-pointer rounded-md px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                Company
              </summary>
              <div className="ml-3 mt-1 flex flex-col">
                <NavLink to="/company/about" className="rounded-md px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  About
                </NavLink>
                <NavLink to="/company/resources" className="rounded-md px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  Resources
                </NavLink>
              </div>
            </details>

            <details>
              <summary className="cursor-pointer rounded-md px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                Partners
              </summary>
              <div className="ml-3 mt-1 flex flex-col">
                <NavLink to="/partners" className="rounded-md px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  Overview
                </NavLink>
                <NavLink to="/partners/apply" className="rounded-md px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  Apply
                </NavLink>
              </div>
            </details>

            <NavLink to="/contact" className="rounded-md px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
              Contact
            </NavLink>

            <div className="mt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

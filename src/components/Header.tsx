import React, { useState } from "react";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Models", href: "#models" },
  { label: "Technology", href: "#technology" },
  { label: "Charging", href: "#charging" },
  { label: "Compare", href: "#compare" },
  { label: "Resources", href: "#resources" },
  { label: "Support", href: "#support" },
];

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="font-bold text-xl tracking-tight">
            APRO
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Open menu"
            className="md:hidden rounded-lg border px-3 py-2 text-sm"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>

        {open && (
          <nav className="md:hidden border-t pb-4">
            <ul className="flex flex-col gap-2 pt-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
export { Header };

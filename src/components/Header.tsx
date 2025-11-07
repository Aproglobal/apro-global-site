// src/components/Header.tsx
import React from "react";


export type HeaderLink = { label: string; href: string };


export function Header(props: { links?: HeaderLink[]; className?: string }) {
const { links = [], className = "" } = props;
const defaultLinks: HeaderLink[] = links.length
? links
: [
{ label: "Models", href: "#models" },
{ label: "Technology", href: "#technology" },
{ label: "Charging", href: "#charging" },
{ label: "Support", href: "#support" },
{ label: "Contact", href: "#contact" }
];


return (
<header className={`w-full sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100 ${className}`}>
<div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
<a href="/" className="font-semibold tracking-tight text-gray-900">APRO</a>
<nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
{defaultLinks.map((l) => (
<a key={l.href} href={l.href} className="hover:text-gray-900 transition-colors">
{l.label}
</a>
))}
</nav>
<div className="flex items-center gap-2">
<a href="#lead" className="rounded-xl border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">Talk to Sales</a>
</div>
</div>
</header>
);
}


export default Header;

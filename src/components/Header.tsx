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
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="/" className="text-lg font-semibold">APRO</a>
        <nav className="hidden gap-6 md:flex">
          <a href="#models" className="hover:underline">Models</a>
          <a href="#technology" className="hover:underline">Technology</a>
          <a href="#charging" className="hover:underline">Charging</a>
          <a href="#compare" className="hover:underline">Compare</a>
          <a href="#contact" className="rounded-full border px-3 py-1.5 hover:bg-gray-50">Talk to Sales</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

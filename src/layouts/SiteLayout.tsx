import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function SiteLayout() {
  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

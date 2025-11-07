import React, { useMemo, useState } from "react";
import StepGallery from "./StepGallery";
import { TECH_FEATURES, type TechItem, type TechGroup } from "../data/tech_features";

export default function TechSection() {
  const [tab, setTab] = useState<TechGroup>("performance");

  const perfItems = useMemo<TechItem[]>(
    () => TECH_FEATURES.filter((i) => i.group === "performance"),
    []
  );
  const techItems = useMemo<TechItem[]>(
    () => TECH_FEATURES.filter((i) => i.group === "technology"),
    []
  );

  const items = tab === "performance" ? perfItems : techItems;

  return (
    <section aria-label="Performance & Technology">
      {/* Toggle */}
      <div className="flex w-full justify-center">
        <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950">
          {(["performance", "technology"] as TechGroup[]).map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={[
                  "px-4 py-1.5 text-sm rounded-full font-semibold",
                  active
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-zinc-700 dark:text-zinc-200"
                ].join(" ")}
                aria-pressed={active}
              >
                {t === "performance" ? "Performance" : "Technology"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery: one-at-a-time, big image, arrows + numbers (no horizontal scroll) */}
      <div className="mt-6">
        <StepGallery
          items={items}
          ariaLabel={tab === "performance" ? "Performance features" : "Technology features"}
        />
      </div>
    </section>
  );
}

import React, { useEffect, useState } from "react";

export function DotRail({ ids }: { ids: string[] }) {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("id")!;
            setActive(id);
          }
        });
      },
      { rootMargin: "-45% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return (
    <aside className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:block">
      <ul className="flex flex-col gap-3 items-center">
        {ids.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="group block"
              aria-label={`Go to ${id}`}
              title={id}
            >
              <span
                className={`block w-2.5 h-2.5 rounded-full transition-all ${
                  active === id ? "scale-125 bg-black dark:bg-white" : "bg-zinc-400/70 dark:bg-zinc-500/70 group-hover:scale-110"
                }`}
              />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

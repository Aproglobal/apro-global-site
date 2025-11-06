// src/services/ab.ts
export function getABVariant(): "A" | "B" {
  // 1) URL 우선
  const url = new URL(window.location.href);
  const q = url.searchParams.get("ab");
  if (q === "A" || q === "B") {
    try { localStorage.setItem("ab", q); } catch {}
    return q;
  }

  // 2) localStorage
  try {
    const saved = localStorage.getItem("ab");
    if (saved === "A" || saved === "B") return saved;
  } catch {}

  // 3) ENV (없으면 A)
  const env = (import.meta.env.VITE_AB_DEFAULT as string | undefined) ?? "A";
  return env === "B" ? "B" : "A";
}

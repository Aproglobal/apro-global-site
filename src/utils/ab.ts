type Variant = 'A' | 'B';
const KEY = 'ab_variant';
const DEF = (import.meta.env.VITE_AB_DEFAULT as Variant) || 'A';

export function getVariant(): Variant {
  const v = (localStorage.getItem(KEY) as Variant) || DEF;
  return (v === 'A' || v === 'B') ? v : 'A';
}

export function setVariant(v: Variant) {
  localStorage.setItem(KEY, v);
  window.location.reload();
}

// @ts-ignore
(window as any).setVariant = setVariant;

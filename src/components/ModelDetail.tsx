import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MODELS, type ModelSpec } from '../data/models';
import { trackEvent } from '../services/analytics';
import { openLead } from './LeadModal';
import { SPECS, SPEC_LABELS, type DetailedSpecs } from '../data/specs';

let openRef: (code: string) => void = () => {};
export function openModel(code: string) {
  openRef(code);
}

function imagesFor(code: string) {import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MODELS, type ModelSpec } from '../data/models';
import { trackEvent } from '../services/analytics';
import { openLead } from './LeadModal';
import { SPECS, SPEC_LABELS, type DetailedSpecs } from '../data/specs';

let openRef: (code: string) => void = () => {};
export function openModel(code: string) {
  openRef(code);
}

function imagesFor(code: string) {
  // 필요 시 이미지 개수 늘려도 자동 반영됩니다 (썸네일 스트립/도트/버튼 모두 연동)
  return [`/models/${code}_1.jpg`, `/models/${code}_2.jpg`];
}

const ORDER: (keyof DetailedSpecs)[] = [
  'guidance',
  'seating',
  'deck',
  'reverseSeating',
  'dimensions',
  'wheelbase',
  'curbWeight',
  'battery',
  'motor',
  'maxSpeed',
  'gradeability',
  'range',
  'payload',
  'charging',
  'options',
];

function renderValue(v: unknown) {
  if (v === undefined || v === null || v === '') return '—';
  if (Array.isArray(v)) return v.join(', ');
  return String(v);
}

export default function ModelDetail() {
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState<ModelSpec | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    openRef = (code: string) => {
      const m = MODELS.find((x) => x.code === code) || null;
      setModel(m);
      setImgIdx(0);
      setOpen(!!m);
      if (m) trackEvent('model_view', { code: m.code, name: m.name });
    };
  }, []);

  // ESC 닫기 + 키보드 네비 + 포커스 트랩
  useEffect(() => {
    if (!open) return;

    // 첫 포커스 이동
    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (!dialogRef.current) return;

      // ESC 닫기
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }

      // 이미지 좌우 네비
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
        setImgIdx((prev) => {
          const imgs = imagesFor(model!.code);
          let next = prev;
          if (e.key === 'ArrowLeft') next = (prev - 1 + imgs.length) % imgs.length;
          if (e.key === 'ArrowRight') next = (prev + 1) % imgs.length;
          if (e.key === 'Home') next = 0;
          if (e.key === 'End') next = imgs.length - 1;
          if (next !== prev) trackEvent('model_image_nav', { code: model!.code, index: next, via: 'keyboard' });
          return next;
        });
        return;
      }

      // 포커스 트랩 (Tab 순환)
      if (e.key === 'Tab') {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, model]);

  // ✅ 모달 오픈 시 바디 스크롤락
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const spec = useMemo(() => (model ? SPECS[model.code] || {} : {}), [model]);
  if (!open || !model) return null;

  const imgs = imagesFor(model.code);
  const specHref = `/specs/${model.code}.pdf`;

  const go = (dir: 'prev' | 'next') => {
    setImgIdx((prev) => {
      const next = dir === 'prev' ? (prev - 1 + imgs.length) % imgs.length : (prev + 1) % imgs.length;
      trackEvent('model_image_nav', { code: model.code, index: next, via: 'button' });
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay (클릭 시 닫힘) */}
      <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} aria-hidden />

      {/* Content (스크롤 가능) */}
      <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6">
        <div
          ref={dialogRef}
          className="mx-auto my-4 sm:my-8 w-full max-w-5xl rounded-2xl bg-white text-black shadow-xl dark:bg-zinc-900 dark:text-white outline-none"
          role="dialog"
          aria-modal="true"
          aria-labelledby="model-detail-title"
        >
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 flex items-center gap-3 p-3 sm:p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
            <h3 id="model-detail-title" className="flex-1 text-base sm:text-lg font-bold">
              {model.name}
            </h3>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close dialog"
              title="Close"
              className="inline-grid h-9 w-9 place-items-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-zinc-500"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="grid md:grid-cols-2">
            {/* 이미지: 가운데 정렬 + contain + 최대 높이 */}
            <div className="relative bg-black grid place-items-center p-2 md:p-3">
              <div className="relative w-full aspect-[16/9] max-w-full">
                <img
                  src={imgs[imgIdx]}
                  alt={model.name}
                  className="w-full h-full object-contain md:max-h-[70vh]"
                  decoding="async"
                  fetchPriority="high"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>

              {/* Prev/Next 버튼 */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
                <button
                  type="button"
                  onClick={() => go('prev')}
                  aria-label="Previous image"
                  className="pointer-events-auto inline-grid place-items-center h-9 w-9 rounded-full bg-white/80 text-black hover:bg-white shadow"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => go('next')}
                  aria-label="Next image"
                  className="pointer-events-auto inline-grid place-items-center h-9 w-9 rounded-full bg-white/80 text-black hover:bg-white shadow"
                >
                  ›
                </button>
              </div>

              {/* 인디케이터 도트 */}
              <div className="flex justify-center gap-2 py-2">
                {imgs.map((_, i) => (
                  <button
                    key={i}
                    aria-label={'thumb ' + (i + 1)}
                    aria-current={i === imgIdx}
                    onClick={() => {
                      setImgIdx(i);
                      trackEvent('model_image_nav', { code: model.code, index: i, via: 'dot' });
                    }}
                    className={[
                      'w-2.5 h-2.5 rounded-full transition',
                      i === imgIdx ? 'bg-white' : 'bg-white/50 hover:bg-white/70',
                    ].join(' ')}
                  />
                ))}
              </div>

              {/* ✅ 썸네일 스트립 (가로 스크롤) */}
              <div className="w-full overflow-x-auto py-2">
                <div className="flex gap-2 px-2">
                  {imgs.map((src, i) => (
                    <button
                      key={'thumb-strip-' + i}
                      onClick={() => {
                        setImgIdx(i);
                        trackEvent('model_image_nav', { code: model.code, index: i, via: 'thumb' });
                      }}
                      aria-current={i === imgIdx}
                      aria-label={`Select image ${i + 1}`}
                      className={[
                        'rounded-lg border transition',
                        i === imgIdx
                          ? 'border-white ring-2 ring-white'
                          : 'border-white/40 hover:border-white/70',
                      ].join(' ')}
                    >
                      <img
                        src={src}
                        alt={`Thumbnail ${i + 1}`}
                        className="h-14 w-24 object-cover rounded-md"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 스펙/CTA */}
            <div className="p-4 sm:p-6">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                {model.guidance} • {model.seats} seats {model.deck ? `• ${model.deck} deck` : ''}{' '}
                {model.variant ? `• ${model.variant}` : ''} {model.reverse ? '• Reverse Seating' : ''}
              </p>

              <div className="mt-4">
                <table className="w-full text-sm">
                  <thead className="sr-only">
                    <tr><th>Label</th><th>Value</th></tr>
                  </thead>
                  <tbody>
                    {ORDER.map((key) => {
                      const label = SPEC_LABELS[key];
                      // @ts-ignore tolerate missing keys
                      const value =
                        spec?.[key] ?? (key === 'reverseSeating' ? (model.reverse ? 'Yes' : 'No') : undefined);
                      if (value === undefined) return null;
                      return (
                        <tr key={key} className="border-t border-zinc-200 dark:border-zinc-800">
                          <td className="py-2 pr-3 text-zinc-500 dark:text-zinc-400 w-40">{label}</td>
                          <td className="py-2">{renderValue(value)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => openLead(`Model Detail ${model.code}`, { modelCode: model.code })}
                  className="px-5 py-3 rounded-full bg-black text-white font-semibold dark:bg-white dark:text-black"
                >
                  Talk to Sales
                </button>
                <a
                  href={specHref}
                  onClick={() => trackEvent('spec_download', { code: model.code })}
                  className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-700"
                >
                  Download specs (PDF)
                </a>
              </div>

              <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                To edit this table: open <code>src/data/specs.ts</code> and update <code>SPECS['{model.code}']</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



---
## Edit Guide (Images, Specs, Favicon/OG)

### A) Replace product images (renders/photos)
- File path: `/public/models/<code>_1.jpg` and `<code>_2.jpg` (hero: `/public/assets/hero.jpg`)
- Recommended: **JPG 1600×900** (or larger, 16:9), optimized.
- Model codes: see `src/data/models.ts` (e.g., `g2-eg-vip-6`).
- After replacement, run `npm run dev` (local) or push to `main` to deploy.

### B) Edit detailed spec table
- File: `src/data/specs.ts`
- Each model key (e.g., `SPECS['g2-eg-vip-6']`) has editable fields:
  ```ts
  {
    dimensions: '3200 × 1200 × 1900 mm',
    wheelbase: '1650 mm',
    curbWeight: '480 kg',
    battery: '51V 110Ah Li-ion',
    motor: 'AC 4.6 kW',
    maxSpeed: '24 km/h (limited)',
    gradeability: '20%',
    range: '36 holes',
    payload: '500 kg',
    charging: 'On-board 110/220V',
    guidance: 'Electronic',
    seating: '6',
    deck: '—',
    reverseSeating: 'No',
    options: ['Canopy','Windscreen','Remote'],
  }
  ```
- `—` means not yet set / N/A. Omit fields to hide that row.

### C) Replace per-model PDFs
- Path: `/public/specs/<code>.pdf` (e.g., `/public/specs/g2-eg-vip-6.pdf`)
- Replace with your official spec sheet PDFs to enable "Download specs".

### D) Favicon & OG images
- **Favicon**: the small icon in browser tabs. Replace `/public/favicon.ico` with your brand icon (multi-size ICO or PNG to ICO).
- **OG image**: the preview image when your site is shared on social/Slack etc. Replace `/public/assets/hero.jpg` and update meta in `index.html` if needed:
  ```html
  <meta property="og:image" content="/assets/og.jpg" />
  <meta name="twitter:image" content="/assets/og.jpg" />
  ```
- Recommended OG: **1200×630** JPG/PNG.

### E) Email for leads
- `.env` → `VITE_SALES_EMAIL=sales@yourdomain.com`

### F) Add a new model
1. Add an entry to `src/data/models.ts` with a unique `code`.
2. Drop images: `/public/models/<code>_1.jpg` and `_2.jpg`
3. (Optional) Add `SPECS['<code>']` in `src/data/specs.ts`
4. (Optional) Add `/public/specs/<code>.pdf`

### G) Change copy / CTAs
- Hero/sections: `src/pages/App.tsx`
- Header CTA: `src/components/Header.tsx`
- Modal copy: `src/components/LeadModal.tsx`

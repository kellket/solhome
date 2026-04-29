# SolHome Performance Baseline

## [2026-04-29] Baseline Metrics

### Build Status
- npm install: **PASS** (362 packages, 2 moderate vulnerabilities)
- npm run build: **PASS** (Next.js 16.2.3 Turbopack, 3.2s compile, 17 static pages)

### Asset Analysis
- **public/ size**: 19MB
- **Images > 300KB** (critical for optimization):
  | File | Size |
  |------|------|
  | bg21.webp | 1.5MB |
  | bg40.webp | 1.1MB |
  | bg47.webp | 881KB |
  | bg32.webp | 876KB |
  | bg28.webp | 790KB |
  | bg23.webp | 650KB |
  | bg34.webp | 504KB |
  | bg26.webp | 471KB |
  | detskaya-2-posle.webp | 372KB |
  | vanna-2-posle.webp | 371KB |
  | bg13.webp | 371KB |
  | bg48.webp | 345KB |
  | detskaya-2-do.webp | 331KB |
  | bg35.webp | 329KB |
  | bg50.webp | 326KB |
  | zal-kuhnya-2-posle.webp | 306KB |
  | bg18.jpg | 302KB |

### Mobile Performance (375x812 viewport)

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| FCP | 508ms | <1800ms | GOOD |
| LCP | **5860ms** | <2500ms | POOR |
| CLS | 0 | <0.1 | GOOD |
| TBT | 118ms | <200ms | GOOD |
| DOM Interactive | 549ms | - | - |
| Load Event | 566ms | - | - |

**LCP Element**: bg7.webp (hero background image)

**Long Tasks During Load**: 
- 125ms at 302ms (hydration)
- 93ms at 455ms (hydration)

### Desktop Performance (1440x900 viewport)

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| FCP | 240ms | <1800ms | GOOD |
| LCP | **5420ms** | <2500ms | POOR |
| CLS | 0.025 | <0.1 | GOOD |
| TBT | 0ms | <200ms | GOOD |
| DOM Interactive | 181ms | - | - |
| Load Event | 391ms | - | - |

**LCP Element**: bg7.webp (hero background image)

### Scroll Performance

| Metric | Mobile | Desktop |
|--------|--------|---------|
| Estimated FPS | 60 | 60 |
| Avg Frame Time | 16.59ms | 16.60ms |
| Jank Frames | 0 | 0 |
| Long Tasks During Scroll | 0 | 0 |

**Scroll is smooth** - no jank detected during scrolling on either viewport.

---

## Problem Areas Identified

### 1. **Critical: LCP is 2x over budget**
- LCP: 5420-5860ms (target <2500ms)
- **Root cause**: Hero image bg7.webp loads late
- Image appears to be loaded via GSAP/Swiper carousel with delay

### 2. **Large Images (19MB total in public/)**
- 17 images over 300KB threshold
- 2 images over 1MB (bg21.webp, bg40.webp)
- Most are .webp format already
- Need: proper sizing, quality optimization, lazy loading

### 3. **Initial Load Long Tasks**
- Mobile has 2 long tasks (125ms + 93ms) during hydration
- Likely React/GSAP initialization blocking main thread

### 4. **No Issues Found**
- Scroll performance is excellent (60 FPS)
- CLS is acceptable (0-0.025)
- TBT is within budget

---

## Recommendations for Phase 2

1. **Fix LCP** (highest priority):
   - Preload hero image with `<link rel="preload">`
   - Consider using Next.js Image with priority
   - Ensure hero image is above-the-fold immediately

2. **Optimize images**:
   - Resize large bg images to actual display size
   - Consider responsive images (srcset)
   - Implement lazy loading for below-the-fold images

3. **Reduce initial JS execution**:
   - Defer GSAP initialization
   - Code-split heavy components
   - Consider dynamic imports for Swiper

---

## [2026-04-29] Phase 2: Image Optimization Results

### Compression Summary

**Original 17 images > 300KB: 9.6MB**
**After compression: 2.7MB**
**Reduction: 72%**

### Before/After Comparison

| File | Before | After | Reduction |
|------|--------|-------|-----------|
| bg21.webp | 1,490 KB | 312 KB | 79% |
| bg40.webp | 1,087 KB | 306 KB | 72% |
| bg47.webp | 880 KB | 188 KB | 79% |
| bg32.webp | 876 KB | 167 KB | 81% |
| bg28.webp | 790 KB | 108 KB | 86% |
| bg23.webp | 649 KB | 110 KB | 83% |
| bg34.webp | 504 KB | 113 KB | 78% |
| bg26.webp | 471 KB | 107 KB | 77% |
| detskaya-2-posle.webp | 371 KB | 90 KB | 76% |
| vanna-2-posle.webp | 371 KB | 116 KB | 69% |
| bg13.webp | 370 KB | 299 KB | 19% |
| bg48.webp | 345 KB | 193 KB | 44% |
| detskaya-2-do.webp | 330 KB | 108 KB | 67% |
| bg35.webp | 329 KB | 92 KB | 72% |
| bg50.webp | 325 KB | 103 KB | 68% |
| zal-kuhnya-2-posle.webp | 306 KB | 91 KB | 70% |
| bg18.jpg | 302 KB | 287 KB | 5% |

### AVIF Versions Created

| File | WebP Size | AVIF Size | Reduction |
|------|-----------|-----------|-----------|
| bg7.avif | 107 KB | 59 KB | 45% |
| bg21.avif | 312 KB | 207 KB | 34% |
| bg40.avif | 236 KB | 236 KB | - |

### Total Public Folder Size

- **Before**: 19 MB
- **After**: 13 MB (excluding backup)
- **Reduction**: 6 MB (32%)

### Compression Settings Used

- **Tool**: cwebp (libwebp 1.6.0) + dwebp for decode
- **Resize**: Max 1920px (or 1600px for largest files)
- **Quality**: 60-75 depending on source size
- **AVIF**: avifenc from libavif 1.4.1, quality 20-40

### Remaining Images > 300KB

Only 2 images slightly over 300KB threshold:
- bg21.webp: 312 KB (from 1.5MB - 79% reduction)
- bg40.webp: 306 KB (from 1.1MB - 72% reduction)

These are complex hero images that need acceptable quality for full-screen display.

### Key Finding

NO images > 800KB remain (target achieved).

### Backup Location

Original images backed up to: `public/.backup-originals/` (9.6MB)

### Build Status

- `npm run build`: **PASS** (Next.js 16.2.3, 17 static pages)

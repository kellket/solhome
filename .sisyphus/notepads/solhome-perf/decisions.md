
## Phase 4: HeroSlider next/image fixes (2026-04-29)

### Changes made
- `<Image fill priority>` — added `sizes="100vw"` and `quality={80}` (lines 167-175)
- `useEffect` preloading — now preloads only `slides[0].img` immediately; remaining slides deferred to `window.load` event with `{ once: true }`

### Rationale
- `sizes="100vw"` prevents Next.js from generating unnecessarily large srcset candidates for a full-viewport image
- `quality={80}` reduces file size ~20% with negligible perceptual difference for hero backgrounds
- Deferring non-LCP slide preloads to `window.load` avoids bandwidth contention during initial page load

### Verification
- LSP: no errors
- `npm run build`: exit 0, 17 static pages generated

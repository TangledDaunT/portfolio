# Project Guidelines — Shreyansh Misra Portfolio

## Overview
Static portfolio website for an AI Systems Engineer. Vanilla HTML/CSS/JS — no frameworks, no bundler, no package manager. Served directly from `index.html`.

## Architecture
- **`index.html`** — Single-page layout with semantic sections: Hero, About, Skills, Projects, Architecture flow, Systems Lab, Footer
- **`index.css`** — Full design system with CSS custom properties (`:root` vars), aurora/grid backgrounds, scroll-reveal animations, tilt effects, card-swap visuals, responsive breakpoints
- **`main.js`** — IIFE containing: OGL WebGL particle background, custom cursor, blur-text hero animation, IntersectionObserver scroll reveals, tilt/magnetic effects, card-swap carousel, parallax, smooth scroll
- External dep: [OGL](https://cdn.jsdelivr.net/npm/ogl@1.0.8/dist/ogl.umd.min.js) loaded via CDN for WebGL particles

## Code Style
- Vanilla JS in strict-mode IIFE — no modules, no imports, no build step
- CSS uses custom properties from `:root` for all colors, spacing, radii, easing — reference these, never hardcode values
- Section comments use `═══` box-style delimiters in all three files for consistency
- Class naming: BEM-like but flat (`.hero-badge`, `.project-stack-tag`, `.arch-flow-node`)
- Interactive classes: `.tilt-card`, `.magnetic`, `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`, `.stagger-children`

## Design System
- Dark theme only. Primary bg: `#0A0A0F`, accent: `#7C8FE4`
- Font: Inter (Google Fonts), weights 300–900
- Spacing scale: `--space-xs` (8px) through `--space-2xl` (120px)
- Border radius: `--radius-sm` (8px), `--radius-md` (12px), `--radius-lg` (20px)
- Easing: `--ease` (cubic-bezier 0.16,1,0.3,1), `--duration` (0.4s)
- All interactive cards use `radial-gradient` mouse-follow via `--mouse-x`/`--mouse-y` CSS vars set by JS

## Adding New Sections / Components
1. Add HTML section in `index.html` following existing pattern: `<section class="[name] section" id="[name]">`
2. Add nav link in `.nav-links` `<ul>`
3. Add matching CSS block in `index.css` with `═══ SECTION N — NAME ═══` comment header
4. Use existing reveal classes (`reveal`, `stagger-children`) for scroll animation — JS auto-observes them
5. For interactive cards, add `.tilt-card` class and JS handles tilt via existing `mousemove` listener
6. For hover glow effect, set `--mouse-x`/`--mouse-y` in JS `gradientCards` selector

## Responsive Breakpoints
- Tablet: `max-width: 1024px` — grid collapses, cursor hidden
- Mobile: `max-width: 640px` — single column, hamburger nav, reduced spacing

## Key Patterns
- **Card Swap**: `data-cards` JSON attribute on `.card-swap-container` drives animated stack (see Projects section)
- **Magnetic buttons**: `.magnetic` class + `data-strength` attribute
- **Section separators**: `::before` pseudo-element with gradient line at top of alternating sections
- **Alternating bg**: Primary sections use transparent bg, even sections use `--bg-secondary`

## WebGL Particle System (OGL)
The background particle effect uses [OGL](https://cdn.jsdelivr.net/npm/ogl@1.0.8/dist/ogl.umd.min.js) loaded via CDN. Configuration lives in `PARTICLE_CONFIG` at the top of `main.js` and mirrors a ReactBits-style props API:

| Property | Type | Default | Purpose |
|---|---|---|---|
| `particleColors` | `string[]` | `['#ffffff']` | Hex colors assigned round-robin to particles |
| `particleCount` | `number` | `200` | Number of GL point sprites |
| `particleSpread` | `number` | `10` | Spatial spread multiplier (uniform `uSpread`) |
| `speed` | `number` | `0.1` | Animation delta multiplier |
| `particleBaseSize` | `number` | `100` | `gl_PointSize` base (uniform `uBaseSize`) |
| `moveParticlesOnHover` | `boolean` | `true` | Shift cloud toward cursor on mousemove |
| `alphaParticles` | `boolean` | `false` | Soft alpha falloff vs hard-disc fragment shader |
| `disableRotation` | `boolean` | `false` | Freeze ambient X/Y/Z cloud rotation |
| `pixelRatio` | `number` | `1` | Renderer DPR — keep at 1 for performance |

### Particle pipeline
1. Particles spawn uniformly inside a unit sphere, then scaled by `particleSpread`
2. Vertex shader adds per-particle sinusoidal drift using `random` attribute seeds
3. Fragment shader draws circular discs (hard or soft alpha) with subtle color oscillation
4. Animation loop applies speed-scaled time, optional mouse offset, and optional rotation
5. Container: `<div id="particles-bg">` with `position: fixed; inset: 0; z-index: -4`

To change colors or density, edit only `PARTICLE_CONFIG` — no shader changes needed.

## Build and Test
```bash
# No build step — open index.html directly or use any static server:
npx serve .
# or
python3 -m http.server 8000
```

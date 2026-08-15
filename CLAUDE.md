# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React + Vite portfolio website for Shreyansh Misra — AI Systems Engineer. Uses a minimal, card-based project layout with scroll-driven animations and magnetic hover effects.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (opens at localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + PostCSS
- **Animations**: Framer Motion
- **Font**: Kanit (Google Fonts)

## Architecture

### Entry Points
- `index.html` — HTML template with font preconnect
- `src/main.tsx` — React root mount point
- `src/App.tsx` — Main app component composing all sections
- `src/data/` — Centralized data files (`projects.ts`, `stats.ts`)

### Directory Structure
```
src/
├── sections/           # Page sections (one per route anchor)
│   ├── HeroSection.tsx
│   ├── MarqueeSection.tsx
│   ├── AboutSection.tsx
│   ├── ServicesSection.tsx
│   ├── ProjectsSection.tsx
│   └── PlaygroundSection.tsx    # Interactive mini-games
├── components/         # Reusable UI components
│   ├── FadeIn.tsx              # Scroll-triggered entrance animation
│   ├── Magnet.tsx              # Magnetic hover effect wrapper
│   ├── AnimatedText.tsx        # Character-by-character text reveal
│   ├── AnimatedCounter.tsx     # Number animation with counting effect
│   ├── ContactButton.tsx       # Contact CTA button
│   ├── LiveProjectButton.tsx   # External project link button
│   ├── ProjectFilter.tsx       # Category filter for projects
│   ├── ScrollProgress.tsx      # Fixed scroll progress indicator
│   ├── StatsCard.tsx           # Animated stats display
│   ├── Timeline.tsx            # Vertical timeline component
│   └── PacmanGame.tsx          # Canvas-based Pac-Man game
├── data/               # Centralized data
│   ├── projects.ts     # Project definitions and category config
│   └── stats.ts       # Portfolio stats, timeline, skills
└── index.css           # Global styles + Tailwind directives
```

### Section Composition Pattern
All sections are imported directly in `App.tsx` and rendered in order within a single-page layout. No routing — navigation uses anchor links (`#about`, `#projects`, etc.). `ScrollProgress` renders at the top level as a fixed progress bar.

### Key Animation Patterns

1. **FadeIn** — Wrapper for scroll-triggered entrance animations
   - Triggers once when element enters viewport
   - Configurable: `delay`, `duration`, `x`, `y` offsets
   - Uses `useInView` from Framer Motion with `once: true`

2. **Magnet** — Mouse-following magnetic effect
   - Uses global `mousemove` listener
   - Configurable: `padding` (activation zone), `strength` (pull intensity)
   - Auto-returns to origin when mouse leaves padding zone
   - Cleanup on unmount

3. **Scroll-based transforms** — Hero portrait and project cards
   - Hero: Uses `useScroll` + `useTransform` for progressive rotation, opacity fade, and scale
   - Project cards: Sticky stacking with progressive scale reduction (`1 → targetScale`)
   - ScrollProgress: Uses `useScroll` + `scaleX` transform for fixed progress bar

4. **AnimatedCounter** — Number counting animation
   - Uses `useMotionValue` + `useTransform` for smooth number transitions
   - Animated on scroll into view

### Design System

**Colors**
- Background: `#0C0C0C`
- Text: `#D7E2EA`
- Hero gradient: `#646973` → `#BBCCD7`

**Typography**
- Font family: Kanit (weights 300–900)
- Hero heading: `10vw` fluid sizing
- Section headings: `clamp(3rem, 12vw, 160px)`

**Spacing & Layout**
- Section padding: Responsive with `clamp()` or mobile/tablet/desktop breakpoints
- Rounded corners throughout: `clamp(40px, ~5vw, 60px)`
- Gradient text via `.hero-heading` class (CSS background-clip)

### Project Card Pattern
Projects are centralized in `src/data/projects.ts`:
```typescript
interface Project {
  name: string;
  description: string;
  tech: string[];
  stars: number;
  url: string;
  liveUrl?: string;
  category: 'featured' | 'production' | 'iot' | 'automation' | 'experiment' | 'coursework';
  highlights?: string[];
  longDescription?: string;
}
```

Categories have corresponding labels and colors exported from the same file. `ProjectsSection` renders projects in three card variants:
- **large**: Featured projects with full details, highlights, and tech stack
- **medium**: Grid cards for IoT/automation/experiments
- **compact**: Simple list items for coursework

`ProjectFilter` component handles category filtering and updates parent via `onSelect` callback.

### Responsive Breakpoints
Uses Tailwind's default breakpoints:
- `sm:` — 640px
- `md:` — 768px
- `lg:` — 1024px

Mobile-first approach — base styles target smallest screens, then scale up with breakpoint utilities.

## Key Patterns to Follow

### Adding New Sections
1. Create component in `src/sections/NewSection.tsx`
2. Use `FadeIn` for entrance animations
3. Add to `App.tsx` imports and render order
4. Link via anchor in `HeroSection.tsx` navbar
5. Use `rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]` for alternating sections
6. Alternate background colors: dark (`#0C0C0C`) → white → dark pattern

### Adding New Projects
1. Edit `src/data/projects.ts`
2. Add project object with required fields (name, description, tech, stars, url, category)
3. Optionally add highlights array and longDescription
4. Category will auto-route to appropriate card variant in `ProjectsSection`

### Adding Reusable Components
1. Place in `src/components/`
2. Export as default
3. If animating, use Framer Motion hooks (`useScroll`, `useTransform`, `useInView`)
4. Clean up global event listeners in `useEffect` return

### Styling Guidelines
- Use Tailwind utilities for layout, spacing, typography
- Custom CSS only when needed (complex animations, gradients)
- Reference global styles in `index.css` for repeated patterns
- Maintain `rounded-[40px] sm:rounded-[50px] md:rounded-[60px]` for card consistency

### Animation Performance
- Use `will-change: transform` sparingly (already in Magnet component)
- Prefer `transform` and `opacity` for animations (GPU-accelerated)
- Use `once: true` for entrance animations to prevent re-triggering

## Build Output

Vite outputs to `dist/` directory. The build is static HTML + JS bundles — deploy to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Assets

Static assets in `public/` directory:
- `my-photo.png` — Hero portrait
- `demo.mp4`, `IMG_5448.MOV` — Video assets (currently unused)

Images loaded from external CDN (`images.higgs.ai`) for project screenshots.

## Data Management

All portfolio content is centralized in `src/data/`:
- `projects.ts` — 22 projects across 6 categories (featured, iot, automation, experiment, coursework)
- `stats.ts` — Portfolio statistics, timeline events, and skill breakdowns

When adding new sections that display metrics or project data, import from these files rather than hardcoding values.

## TypeScript Configuration

- TypeScript 6.0 with strict mode
- Target: ES2020, module: ESNext
- JSX: react-jsx
- Vite handles transpilation — no separate `tsc` build step
- Type definitions: `@types/react`, `@types/react-dom`

# Portfolio UI/UX Rebuild Context
**Date:** 2026-05-24

## Overview
This document contains the complete context of the recent UI/UX overhaul for the portfolio website. It is intended to serve as a handoff document for another AI agent to continue development.

## What Has Been Completed

### 1. Architecture & Stack Migration
- Transitioned the project from a vanilla HTML/CSS/JS (with React initialized but largely unused for the UI previously) setup to a modern **React + TypeScript + Tailwind CSS + Framer Motion** stack.
- Installed new dependencies: `framer-motion`, `lucide-react`, `tailwindcss`, `postcss`, `autoprefixer`, `typescript`, `@types/react`, `@types/react-dom`.
- Removed old dependencies: `lenis`.
- Created configuration files: `tsconfig.json`, `tsconfig.node.json`, `tailwind.config.js` (extended with Kanit font), `postcss.config.js`.

### 2. File Cleanup
- Deleted legacy files: `src/main-effects.js`, `src/components/ScrollStack.jsx`, `src/components/ScrollStack.css`, `src/data/projects.js`, `src/App.jsx`, `src/main.jsx`, root `main.js`, root `index.css`.
- Removed CDN links for OGL and gl-matrix from `index.html`.

### 3. Global Styles & Entry Setup
- Updated `index.html` to point to `src/main.tsx`, added the **Kanit** Google Font, and changed the title to "Shreyansh — AI Systems Engineer".
- Created `src/index.css` with Tailwind directives, a global dark theme reset (`#0C0C0C` background), custom scrollbars, and a `.hero-heading` gradient text utility class.
- Created `src/main.tsx` (React root) and `src/App.tsx` (composing all UI sections).

### 4. Content & Persona Decision
- **Persona:** We adapted the UI to fit the actual "Shreyansh - AI Systems Engineer" identity instead of the original "Jack - 3D Creator" template prompt. 
- Retained the requested dark aesthetic, structure, and 3D visual elements (like corner icons and marquees), but populated it with real portfolio data (e.g., AI Systems Engineer taglines, real services like RAG pipelines and Full Stack Development, and real GitHub projects).

### 5. Reusable Components Created (`src/components/`)
- `FadeIn.tsx`: Wrapper using Framer Motion `whileInView` for entrance animations with configurable delays and `x/y` offsets.
- `Magnet.tsx`: A mouse-following magnetic effect wrapper that applies `translate3d` transforms based on cursor proximity (used on the hero portrait).
- `AnimatedText.tsx`: A component that applies a character-by-character opacity reveal driven by scroll progress.
- `ContactButton.tsx`: A highly stylized gradient pill button with inner glow and a white outline offset.
- `LiveProjectButton.tsx`: An outlined ghost pill button for project links.

### 6. Page Sections Created (`src/sections/`)
- **HeroSection.tsx**: Full viewport height section featuring a navbar, massive "Hi, i'm shreyansh" gradient heading, magnetic portrait image (`/my-photo.png`), and a bottom bar with a tagline.
- **MarqueeSection.tsx**: Two rows of GIF images (21 total, from motionsites.ai) that scroll horizontally in opposite directions based on page scroll position.
- **AboutSection.tsx**: Features 4 absolute-positioned decorative 3D corner images, a gradient heading, and a scroll-driven `AnimatedText` paragraph.
- **ServicesSection.tsx**: White background section with large rounded top corners, containing a list of 5 numbered services with staggered fade-in animations.
- **ProjectsSection.tsx**: Dark background section featuring 3 project cards (`Tandem Browser`, `AI Motion Detector`, `HomeSecuritySetup`). It implements a sticky-stacking effect where cards scale down as the user scrolls past them using Framer Motion's `useScroll` and `useTransform`.

## Current State & Known Issues
- The Vite development server runs and the UI renders in the browser (`npm run dev` works).
- **TypeScript Errors (Pending Fix):**
  Running `npx tsc --noEmit` currently outputs two errors:
  - `src/components/FadeIn.tsx(11,14): error TS2503: Cannot find namespace 'JSX'.`
  - `src/main.tsx(4,8): error TS2882: Cannot find module or type declarations for side-effect import of './index.css'.`

## Next Steps for the Agent
1. **Resolve TypeScript Errors:** Fix the `JSX` namespace issue (likely missing a `vite-env.d.ts` reference or needing `@types/react` configuration tweaks) and the CSS import typing issue.
2. **Review and Polish:** Verify mobile responsiveness, ensure all animations are buttery smooth, and check for any remaining layout inconsistencies.
3. **Continue Development:** Await further instructions from the user for any new sections, content updates, or deployment steps.

# Mukesh Kuiry — Portfolio (`folio`)

Personal engineering portfolio and technical blog for **Mukesh Kuiry** (Software Engineer @ Refyne India), built with **Next.js 16 (App Router)**, **React 19**, **TypeScript 5**, **GSAP ScrollTrigger**, and **Lenis Smooth Scroll**.

## Design System & Architecture

Engineered using the exact design tokens, typography scale, 3D perspective transforms, and micro-interaction patterns extracted from `majd-portfolio.framer.website`:

- **Color Palette (9 CSS Custom Property Tokens):**
  - Primary Surface: `#FAF7F3` (`--token-2fcd1089-c4fe-44ec-8e47-1defe3c9bd50`)
  - Primary Ink / Dark Cards: `#111111` (`--token-e44374f3-0aa3-4326-a0ec-25df52a31057`)
  - Muted Ink: `rgba(17, 17, 17, 0.5)` (`--token-fd5eaaad-cf25-4e7f-b54f-37a28b7e1282`)
  - Hairline Divider / Scroll Unfilled Text: `rgba(0, 0, 0, 0.1)` (`--token-050a7e9f-40b2-4d5e-8e58-10c5e629e538`)
  - Error Accent: `#EB4D6D` (`--token-f6bceadb-c212-4389-b1bb-e11537885a02`)
- **Typography:**
  - `Archivo` (`300`–`900`) for display headings (`174px` Hero `<h1>`, `76px` Section `<h2>`, `72px` Page `<h1>`, `68px` Display `<h2>`, `32px` Card `<h3>`) and body copy (`-0.02em` to `-0.04em` tight grotesque tracking).
  - `Clash Grotesk` (`400`) for metadata separators (`/`).
- **Interactive Primitives & Sections:**
  1. **Floating Pill Navbar (`Header.tsx`):** Fixed `320px` `#111111` pill at `top: 30px` with 3-dot-to-`X` morphing hamburger and staggered `RollingText` links.
  2. **Shared `200vh` Hero + Bio Wrapper (`HeroBioSection.tsx`):** Sticky portrait card (`400×456px`) that starts at `scale: 0.5` in grayscale inside the Hero section and 3D-flips `180deg` (`perspective: 1200px`) into full color at `scale: 1.0` as you scroll into the Bio section, accompanied by pointer-draggable 3D holographic shapes.
  3. **Scroll-Scrubbed Manifesto Quote (`ScrollColorText.tsx`):** `150vh` sticky track with GSAP ScrollTrigger word-by-word color scrubbing.
  4. **Services & Core Engineering Domains (`ServiceCard.tsx`):** `120px` horizontal rows with dot-separated capability tags.
  5. **Featured Projects (`ProjectCard.tsx`, `/work`, `/work/[slug]`):** 2-column showcase of 7 curated systems (`Runway`, `ClipBro`, `CodeArena`, `Order Processor`, `Reel Automation`, `Committee Khata`, `Smart Tab Grouper`) with `104%` spring hover zoom and full case-study pages.
  6. **Work Experience (`ExperienceSection.tsx`):** Chronological engineering timeline across Refyne India, Alchemyst AI, Forge Build & JustK8s, and Freeflow & Detectbox.
  7. **Open Source Contributions (`OpenSourceCard.tsx`):** 4-column `340px` `#111111` 3D scroll-flip cards highlighting contributions to KubeVirt, Meshery, Forge Build, and FlexAuth/BlockSuite.
  8. **Thoughts / Technical Blog (`BlogCard.tsx`, `/blog`, `/blog/[slug]`):** 26 longform engineering articles with syntax-highlighted code blocks and a sticky newsletter sidebar.
  9. **Contact & Footer (`ContactSection.tsx`, `Footer.tsx`):** Resend-powered dark contact form with multi-state `FormButton`, sliding `SocialIcon` buttons, and a giant `MUKESH` SVG footer watermark.

## Development & Verification

```bash
npm install
npm run dev      # Start local dev server on http://localhost:3000
npm run lint     # Run ESLint
npx tsc --noEmit # Run strict TypeScript check
node --test src/lib/portfolio.spec.mjs # Run data & asset verification tests
npm run build    # Build production bundle
```

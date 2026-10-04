# TIS — Animated Homepage Redesign

A ground-up redesign of the [Tulas International School](https://tis.edu.in/) homepage
(Dehradun, Uttarakhand) built as a single, production-ready page.

**Live:** `<add your Vercel URL here>` · **Stack:** Next.js 16 (App Router) · TypeScript ·
Tailwind CSS v4 · Framer Motion · Lenis

The brief was to keep TIS's branding and copy while rebuilding the page as a modern,
motion-led experience. Every word, statistic, name and link on this page is carried over
from the live site; only the presentation is new.

---

## Contents

- [Highlights](#highlights)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [npm scripts](#npm-scripts)
- [Project structure](#project-structure)
- [Architecture notes](#architecture-notes)
- [Design system](#design-system)
- [Deployment](#deployment)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Content & asset credits](#content--asset-credits)

---

## Highlights

All four bonus features from the brief are implemented, plus a few extras.

| Feature | Where | How it works |
| --- | --- | --- |
| **Custom cursor** | `components/chrome/custom-cursor.tsx` | A trailing ring plus a tight centre dot. Elements opt in with `data-cursor="link \| media \| text"` and an optional `data-cursor-label`; the ring scales, tints and prints the label on hover. Pointer position is written to Framer Motion values inside one rAF loop, so moving the mouse never re-renders React. |
| **Scroll-triggered reveals** | `components/motion/reveal.tsx` | Three primitives: `Reveal` (single element), `Stagger` / `StaggerItem` (parent–child lists and grids) and `SplitText` (word-by-word masked headline reveal). All share one viewport preset so every section fires at the same depth. |
| **Theme switcher** | `components/chrome/theme-toggle.tsx`, `lib/theme.ts` | Dark and light palettes driven entirely by CSS custom properties. The active theme is a `data-theme` attribute on `<html>`, applied by a blocking inline script before first paint — so there is no flash and no hydration mismatch, and no theme context or provider anywhere. |
| **Scroll progress bar** | `components/chrome/scroll-progress.tsx` | `useScroll` → `useSpring` → `scaleX` on a fixed gradient rail at the top of the viewport. |

Extras:

- **Inertial smooth scrolling** (Lenis) that hands scroll control to Framer Motion
  cleanly, and disables itself under `prefers-reduced-motion`.
- **Magnetic buttons** — call-to-action links pull gently towards the pointer.
- **Scroll-linked parallax** on hero and editorial imagery, via springs rather than
  raw scroll values.
- **Count-up statistics** (`22` acres, `16+` sports, `24×7` medical, `6:1` ratio) that
  write digits straight to the DOM inside the animation's `onUpdate`.
- **A rotating SVG seal** built with a real `<textPath>`, so the copy stays selectable.
- **WAI-ARIA tab switcher** for the notable-personalities section, with roving focus
  and arrow/Home/End key support.
- **Accessible enquiry form** with inline validation, `aria-invalid` / `aria-describedby`,
  focus moved to the first error, and a success state.

---

## Tech stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router, Turbopack) | Static-first rendering with per-request image optimisation; ISR keeps the copyright year fresh. |
| Language | **TypeScript** (`strict`) | Props, data shapes and variant maps are all typed. |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) | Tokens live in `globals.css` next to the theme blocks they feed. |
| Animation | **Framer Motion** (`framer-motion` v14) | `whileInView` variants for entrances, `useScroll` / `useSpring` for scroll-linked values. |
| Smooth scroll | **Lenis** | Inertia that still commits to native scroll, so nothing else has to change. |
| Fonts | `next/font/google` — Fraunces, Plus Jakarta Sans, JetBrains Mono | Self-hosted, preloaded, `display: swap`. No external font requests. |

---

## Getting started

Requires **Node.js 20.19+ or 22.13+** (Next 16's floor). Developed on Node 22.

```bash
git clone <your-repo-url>
cd tis-homepage
npm install
npm run dev
```

Open <http://localhost:3000>.

There is nothing to configure — no environment variables, no API keys, no external
services. All copy and imagery live in the repo.

### npm scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload on <http://localhost:3000>. |
| `npm run build` | Production build (type-checks as part of the build). |
| `npm run start` | Serves the production build. Add `-p <port>` to change the port. |
| `npm run lint` | ESLint over the whole project. |
| `npm run typecheck` | `tsc --noEmit`. |

---

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx          Root shell: fonts, metadata, theme bootstrap,
│  │                      smooth scroll, progress bar, custom cursor, skip link
│  ├─ page.tsx            Section order, revalidated daily
│  ├─ globals.css         Design tokens, theme blocks, base styles, utilities
│  ├─ icon.png            Favicon, generated from the school roundel
│  └─ apple-icon.png
├─ components/
│  ├─ chrome/             Page-level furniture
│  │  ├─ site-header.tsx      Fixed bar, scroll-aware, full-screen mobile menu
│  │  ├─ site-footer.tsx      Contact, quick links, back-to-top
│  │  ├─ custom-cursor.tsx    Ring + dot cursor
│  │  ├─ scroll-progress.tsx  Top reading-progress rail
│  │  ├─ smooth-scroll.tsx    Lenis lifecycle
│  │  └─ theme-toggle.tsx     Dark/light switch
│  ├─ motion/             Reusable motion primitives
│  │  ├─ reveal.tsx           Reveal · Stagger · StaggerItem · SplitText
│  │  ├─ parallax.tsx         Parallax · ScaleOnScroll · SectionProgress
│  │  └─ magnetic.tsx         Pointer-attracted wrapper
│  ├─ sections/           One file per homepage section, composed in page.tsx
│  └─ ui/                 Small presentational pieces
│     ├─ action-link.tsx      The one button/link, in three variants
│     ├─ section-heading.tsx  Shared eyebrow + masked title + lead
│     ├─ marquee.tsx          CSS-driven infinite marquee
│     ├─ counter.tsx          Count-up on enter
│     ├─ rotating-seal.tsx    SVG textPath badge
│     └─ …
├─ data/
│  └─ site.ts             Every string, link, number and image path on the page
├─ lib/
│  ├─ motion.ts           The easing curve and viewport presets
│  ├─ smooth-scroll.ts    Lenis singleton + scrollTo helpers
│  ├─ theme.ts            Theme read/write, no provider
│  └─ utils.ts            `cn`
└─ …

public/images/            Brand imagery, pre-resized and encoded as WebP (2.7 MB)
```

---

## Architecture notes

The parts most worth explaining in a technical review.

### 1. No theme provider, and no flash of the wrong theme

The obvious approach is a React context holding `"light" | "dark"`. That forces a
hydration question: the server cannot know the visitor's stored preference, so the
first client render has to guess.

Instead, the theme is treated as what it actually is — external DOM state:

- `lib/theme.ts` exports a **blocking inline script** that `layout.tsx` puts in
  `<head>`. It reads `localStorage` (falling back to `prefers-color-scheme`) and sets
  `data-theme` on `<html>` **before the first paint**.
- `useTheme()` is a thin `useSyncExternalStore` over that attribute, backed by a single
  shared `MutationObserver`. That is the supported way to read a mutable external
  value, and React reconciles the server snapshot (`"dark"`) with the client snapshot
  during hydration without a mismatch.
- Every colour in the app is a CSS custom property (`--bg`, `--text`, `--gold`, …)
  mapped into Tailwind through `@theme inline`. Switching themes swaps one attribute;
  no component re-renders and no class list changes.

The toggle's visuals are pure CSS (`light:` / `dark:` variants on a sliding knob), so
the control is already in the right position on first paint. `useTheme()` is used only
for `aria-pressed`.

### 2. Scroll-linked values never touch React state

`useScroll` → `useTransform` → `useSpring` → `style={{ y, scale }}` writes transforms
directly to the compositor. The progress bar, the hero parallax, the drifting portraits
and the custom cursor all work this way, so none of them schedule a render per frame.

The one place a value would have caused renders — the count-up numbers — writes
`textContent` inside `animate()`'s `onUpdate` instead, for the same reason.

### 3. One easing curve, one set of triggers

`lib/motion.ts` is deliberately three lines: one easing curve (`EASE_OUT`) and two
`whileInView` presets. Every entrance in the app imports them, so sections trigger at a
consistent scroll depth and nothing drifts out of sync.

### 4. Lenis does not break anything else

Lenis still commits to the native scroll position, which is why `position: sticky`
(the Boarding section), `useScroll`, and browser scroll behaviour keep working
untouched. The only coordination needed is `scrollToSection()` in
`lib/smooth-scroll.ts`, which routes in-page anchors through Lenis so they land clear
of the fixed header — used by the nav, the mobile menu, the footer and the hero's
scroll cue.

### 5. Cut-outs vs. photographs

Most of the school's original artwork is **cut-out PNG with transparency** (students,
sport icons, the pottery and dance illustrations); the campus aerial, the portraits and
the award images are ordinary photographs. The layouts reflect that: cut-outs sit on
tinted brand plates and float with parallax, photographs fill their frames and get
`object-cover` crops.

### 6. Imagery is pre-optimised

All 95 images were resized to their largest display size and encoded to WebP before
being committed (50 MB → 2.7 MB), and an ink-coloured variant of the wordmark was
generated for light surfaces. `next/image` then adds responsive `srcset`, lazy loading
and modern-format negotiation on top.

---

## Design system

Colours are sampled from TIS's own assets — gold `#C09D59` from the site's
`yellowLine` graphic, crimson `#B90124`, leaf `#5AB232`, cream `#F8F5F0` — so the
redesign still reads as TIS.

Tokens are declared once in `globals.css`:

- **Surfaces** — `bg`, `bg-soft`, `surface`
- **Text** — `ink`, `muted`, `subtle`
- **Lines** — `line`, `line-strong`
- **Brand** — `brand` (crimson), `brand-deep`, `gold`, `leaf`
- **Effects** — `glow`, `grain-opacity`

Two small Tailwind v4 utilities carry the recurring patterns: `shell` (page gutters and
max width) and `grain` (an inline-SVG film grain, no extra request). Motion primitives
that do not need JavaScript — the marquee, the idle drift, the pulse ring — are CSS
keyframes.

Typography pairs **Fraunces** (display, for the big statements) with **Plus Jakarta
Sans** (UI and body) and **JetBrains Mono** (labels, indices and metadata).

---

## Deployment

The page is fully static apart from image optimisation, so it deploys as an ISR route
with a one-day revalidate window.

### Vercel (recommended — zero config)

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

Or import the repository at [vercel.com/new](https://vercel.com/new); the framework
preset is detected automatically and no build settings need changing.

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --build
netlify deploy --build --prod
```

Or connect the repo in the Netlify UI with:

- build command `npm run build`
- publish directory `.next`

Netlify's Next.js runtime handles `next/image` automatically.

### GitHub Pages

GitHub Pages only serves static files, so the image optimiser has to be turned off:

1. In `next.config.ts`, add `output: "export"` and `images: { unoptimized: true }`.
2. In `package.json`, change the build script to `next build` (no server needed) and add
   a post-build copy of `out/` into a `gh-pages` branch.
3. Deploy with `actions/configure-pages` + `actions/upload-pages-artifact`.

Vercel or Netlify are the better fit for this build — the imagery is already compressed,
so only the responsive `srcset` benefits from the optimiser.

---

## Accessibility

- Semantic landmarks (`header` / `main` / `section` / `footer` / `nav` / `figure` /
  `blockquote` / `address`) and a skip-to-content link.
- The tab switcher implements the WAI-ARIA tabs pattern: `role="tablist"`, roving
  `tabindex`, arrow / Home / End keys.
- The custom cursor is **opt-in** and only mounts for fine pointers with no
  reduced-motion preference — otherwise the native cursor is left alone.
- Decorative artwork is `aria-hidden`; the marquee's duplicated copy is hidden from
  screen readers so content is not announced twice.
- Form fields are labelled, errors use `aria-invalid` + `aria-describedby`, and focus
  moves to the first invalid field on submit.
- Visible `:focus-visible` rings on a brand gold, at sufficient contrast in both themes.
- `prefers-reduced-motion` is honoured throughout: Lenis is not started, scroll
  behaviour falls back to instant, decorative loops stop, and reveal animations
  collapse to a fade.

## Performance

- Static prerender with a one-day revalidate; no client data fetching.
- `next/image` for every image, with accurate `sizes` and a single `priority` image
  (the hero) so LCP is not queued behind the fold.
- Motion is transform/opacity only, driven by springs, with `will-change` applied
  narrowly.
- Total image payload is 2.7 MB across the whole page; individual images are 3–40 KB.

---

## Content & asset credits

- **Copy, statistics, names, links and imagery** are taken from the live
  [tis.edu.in](https://tis.edu.in/) homepage and its published mandatory-disclosure
  documents. No claims were invented; the enquiry form is explicitly labelled as a
  front-end demo that transmits nothing.
- Images were resized and re-encoded for this repository. The wordmark is the school's
  own asset; `brand/wordmark-ink.webp` is a generated ink-coloured variant of the
  supplied white knockout mark, used on light surfaces.
- This is a design exercise and is not affiliated with or endorsed by Tulas
  International School.

---

<sub>Built with Next.js, Tailwind CSS and Framer Motion.</sub>

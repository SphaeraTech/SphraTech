# SpheraTech design schema

One schema, defined once. Every page and component derives from this file.
The brand is the red TS monogram logo (`public/navbar-logo.png`) — a single
confident red with circuit-trace details on a dark ground. The site must read
as engineered, sober, and professional. No rainbow accents, no gradient fills.

## Color

Tokens live in `app/globals.css` (`@theme`). Use utilities, never raw hex.

| Token | Value | Utility | Use |
|---|---|---|---|
| brand | `#EC3234` | `text-brand` `bg-brand` `border-brand` | The ONLY accent. Links, icons, labels, primary buttons, key words. |
| brand-strong | `#C9252B` | `bg-brand-strong` | Primary button hover. |
| base | `#0A0D14` | `bg-base` | Page ground. The one and only page background. |
| surface | `#10141D` | `bg-surface` | Cards, panels. |
| surface-2 | `#151B26` | `bg-surface-2` | Nested surfaces, inputs, hover fills. |
| edge | `#232936` | `border-edge` | Default 1px borders. |
| edge-strong | `#303950` | `border-edge-strong` | Hover borders (non-accent). |
| ink | `#F4F6F9` | `text-ink` | Headings, emphasized text. |
| body | `#9AA3B2` | `text-body` | Body copy. |
| faint | `#647084` | `text-faint` | Meta text, captions. |

Rules:
- **Gradient budget: one.** A single subtle red radial wash in the home hero.
  Nothing else on the site may use a gradient — no gradient text, no gradient
  card fills, no gradient buttons, no gradient icon tiles.
- Green/amber allowed only as functional form feedback (success/error states).
- `red-500`/`slate-*` Tailwind palette classes are legacy — migrate to tokens.

## Typography

Loaded via `next/font` in `app/layout.tsx`.

- **Display — Space Grotesk** (`font-display`): h1–h3, stats, the wordmark.
  Tight tracking (`tracking-tight`), bold.
- **Body — Inter** (`font-sans`): everything else. Default on `<body>`.
- **Mono — JetBrains Mono** (`font-mono`): eyebrows, category labels, section
  numbers, tech tags, form labels' meta. Uppercase + `tracking-[0.2em]` for
  eyebrows. This is the voice of the brand's engineering identity.

## Structure

- Section rhythm: `py-20 md:py-28`, container `max-w-7xl mx-auto px-6`.
- Section headers use `components/SectionHeader.tsx`: mono red eyebrow
  (`// LABEL`), display heading, optional body lede. Left-aligned.
- Cards: `bg-surface border border-edge rounded-xl` with `p-6`/`p-8`.
  Hover: `hover:border-brand/40` and/or `hover:-translate-y-0.5`. Never
  `hover:scale-*`, never `backdrop-blur`, never glow shadows.
- Buttons: `rounded-lg`. Primary: `bg-brand hover:bg-brand-strong text-ink`.
  Secondary: `border border-edge text-ink hover:border-brand`.
- Radius scale: `rounded-lg` (buttons, small), `rounded-xl` (cards). Nothing
  larger except avatars/dots (`rounded-full`).

## Signature

The circuit trace (`components/motion/CircuitTrace.tsx`): a thin line with
45° bends ending in a node dot, drawn from the logo's own traces. It appears
in the hero and as an occasional section divider. This is the one memorable
decorative element — everything else stays quiet.

## Motion — Anime.js only

`animejs` v4 (named imports). framer-motion is removed — do not reinstall.

- Scroll reveals: `components/motion/Reveal.tsx`. One pattern sitewide:
  fade + 12px rise, 550ms, `outCubic`, optional per-card stagger via `delay`.
- Hero: one orchestrated `createTimeline` load sequence (eyebrow → headline →
  lede → CTA → circuit draw). The only load animation on the site.
- Micro-interactions: CSS transitions on border/color/arrow-nudge only.
- Everything respects `prefers-reduced-motion` (global kill in globals.css,
  and Reveal renders content visible immediately).

## Copy

Sentence case headings. Plain verbs. No "digital powerhouse" filler. The
brand voice is the founder's: direct, honest, anti-corporate.

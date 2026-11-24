# Design Direction: Silas Howe Portfolio

Dial: ENERGY 3 / RHYTHM 3 / MOTION 3

## Identity & Audience

- **Owner:** Silas Howe, product designer and creative technologist in Boulder, Colorado (M.S. Creative Technology & Design at CU Boulder's ATLAS Institute; former Qualtrics Escalation Engineer and Technical Success Manager).
- **Primary audience:** Hiring managers, design/engineering leads, and creative-technology peers evaluating real shipped work and craft.
- **Personality:** Expressive physical-craft creative technology. Bookish editorial clarity meets vintage alpine ski-poster energy and playful, physics-inspired interactions drawn from Silas's own Creative Code sketches.
- **What it is not:** A generic monochrome SaaS template, a sterile blank-canvas portfolio, or cartoon ski clipart.

## Color Palette & Themes

Both light and dark themes are first-class and controlled via the header toggle (respecting `prefers-color-scheme` on first visit, saved in `localStorage`).

### Neutrals (Base Canvas & Text)
- **Light mode (Warm Paper):**
  - `--paper`: `#F4F1EA` (`244 241 234`)
  - `--ink`: `#1C1B19` (`28 27 25`)
  - `--muted`: `#6B675F` (`107 103 95`)
- **Dark mode (Warm Charcoal):**
  - `--paper`: `#181715` (`24 23 21`)
  - `--ink`: `#ECE8DF` (`236 232 223`)
  - `--muted`: `#A09A8F` (`160 154 143`)

### Core Colors (2 Vintage Alpine Poster Colors)
- **Alpine Pine (Core 1):** `#1E6641` (`30 102 65`, light, 6.14:1 on paper) / `#52B788` (`82 183 136`, dark, 7.24:1 on charcoal). Used for green-circle trail markers, craft/making moments, and selective structural color.
- **Trail Cobalt (Core 2):** `#1D5696` (`29 86 150`, light, 6.59:1 on paper) / `#6CA8E8` (`108 168 232`, dark, 7.17:1 on charcoal). Used for blue-square trail markers, technical/tooling cues, and selective structural color.

### Single Accent
- **Print Red (Accent):** `#B5472B` (`181 71 43`, light, 4.77:1 on paper) / `#E47456` (`228 116 86`, dark, 5.91:1 on charcoal).
- **Accent rule:** Reserved for primary interactive emphasis (hover/active links, focus rings, key callouts, text selection). In dark mode, text selection uses dark charcoal ink (`#181715`) on `#E47456` (5.91:1) rather than white.

### Product Reconstructions Carve-Out
- Interactive UI reconstructions (Call Light, Pretty Pulses, Recipe Agent, Instagram Digest, Jibbitz Generator) live inside `.theme-light` containers so light-mode software stays legible when the site is in dark mode.
- Colors inside reconstructions represent the real shipped tools, while still meeting WCAG AA contrast for readable labels.

## Typography

- **Display headings & dates:** `Newsreader` (serif, optical sizing, `-0.01em` tracking, `1.1` line height). Chosen to echo book arts, printmaking, and classic alpine print posters.
- **Body copy & UI labels:** `National Park` (sans-serif, `16.5px` base, `1.6` line height). Chosen for its direct tie to national parks, trail signage, and Colorado outdoor craft. Drop unused `Lexend` font loading from `index.html`.
- **Monospace:** System monospace (`ui-monospace`, `SFMono-Regular`, `Menlo`, `monospace`) reserved strictly for real technical metadata (ticket IDs, dimensions, timestamps, lift-ticket/elevation stamps) inside reconstructions and specs, never for decorative page headings.

## Layout, Radius & Elevation

- **Container & reading width:** `max-w-6xl` outer container, `max-w-prose` (`38rem`) for body copy on case studies so reading lines stay ~65 characters.
- **Rhythm (RHYTHM 3):** Sections vary visibly in composition: full-bleed night-sky hero, asymmetric `7/5` and `5/7` work grid, timeline experience list, mixed-ratio Making showcase, three-column About layout, and bold single-email Contact footer.
- **Responsive states:** Define smooth reflow across phone, tablet (2-column intermediate states), and desktop. Keep all interactive targets at least 44x44px with clear gaps.
- **Radii:** Two deliberate radii across site chrome: `4px` (`sm`) for controls/stamps and `10px` (`lg`) for media frames and panels. Avoid uniform pill shapes across controls.
- **Elevation:** Site chrome stays crisp and grounded with hairline borders (`border-line`) and vintage-print framing. Soft shadows are reserved strictly for elevated product UI frames and overlays so elevation signals depth.

## Identity Motifs (Alpine Craft & Trail Map)

Every motif serves structure or navigation rather than pure wallpaper:

1. **Topographic contour lines & trail-map geometry:** Subtle SVG contour lines and crisp map-frame dividers separate major sections or anchor surfaces, replacing generic dot or blueprint grids.
2. **Vintage ski-poster & lift-ticket details:** Structured metadata headers (year, role, stack, context) styled with crisp print borders and compact stamp-like alignment that pair naturally with `National Park` and `Newsreader`.
3. **Functional trail-difficulty markers (Green Circle, Blue Square, Black Diamond):** Used with an explicit legend and accessible text (never color alone, never decorative status dots) to signal project scope/category:
   - **Green Circle** (Alpine Pine): Creative experiments, sketches, photography, and short-form explorations.
   - **Blue Square** (Trail Cobalt): Shipped internal tools, automations, and focused utilities.
   - **Black Diamond** (Ink): End-to-end systems, multi-stakeholder product builds, and physical-hardware prototypes.

## Motion & Creative-Code Choreography (MOTION 3)

Motion draws directly from Silas's Creative Code sketches and must always serve attention, feedback, or workflow comprehension:

1. **Physics-inspired micro-interactions:** Springy weight, gravity settle, and subtle cursor/pointer attraction or magnetic response on interactive cards and controls (echoing `Color-Attraction Generator` and `Physics Clock`).
2. **Kinetic typography moments:** Choreographed letterform entrance and subtle typographic settle on the hero display headline and section headings (echoing `SILAS Loop`).
3. **Purposeful product reconstructions:** Step-driven interactive walkthroughs show how real tools work. Every loop running longer than 5 seconds provides a user pause control; no decorative `animate-ping`, `animate-pulse`, or endless idle floating loops.
4. **Reduced motion:** All non-essential motion, kinetic typography, physics springs, and auto-playing loops stop cleanly under `prefers-reduced-motion: reduce`, landing immediately on a clear rest frame.

## Writing Voice & Content Standards

- **Audience focus:** Tighter and punchier for hiring managers. Lead every project card and case study with the concrete problem, what Silas built, and the real outcome.
- **Tone:** Plain, honest, first-person maker voice. Keep specific details and explicit caveats (for example, marking estimates as estimates and clinical goals as untested).
- **Hygiene:** Zero AI buzzwords (`seamless`, `revolutionary`, `cutting-edge`, etc.), zero generic CTAs (`Explore`, `Learn More`), zero em dashes, and zero fabricated statistics or testimonials.

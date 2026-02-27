# Phase 2: Home / Landing - Research

**Researched:** 2026-02-27
**Domain:** Static HTML/CSS home page — hero layout, card grid, CSS textures, micro-interactions
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Hero layout**
- Philosophy statement appears first (top of hero), name and role/title below it
- Centered alignment on desktop
- Typography: philosophy in italic or light-weight Montserrat Alternates — contemplative, not bold; tone is quiet and reflective, NOT loud or display-huge. Claude should size relative to that mood.
- No explicit scroll CTA or arrow — the background texture provides the directional hint
- Hero flows directly into cards with whitespace only — no border, no rule, no explicit separator

**Hero background**
- CSS paper grain texture (SVG filter or CSS noise) as primary approach
- Texture should have a subtle downward-flow quality — not overdone
- Fallback if paper grain doesn't read well: soft radial gradient fading toward bottom

**Project cards**
- 3 cards in a horizontal row on desktop
- Each card shows: project title + short descriptor (1–2 lines) + thumbnail area
- Thumbnail area uses a subtle CSS/SVG pattern or texture fill — this is also the global default "no image" fallback for items that will never have a thumbnail (written work, etc.) — should be reusable
- Hover interaction: subtle lift (shadow increase + small translate-up) + CSS paper dog-ear / fold on one corner of the thumbnail — on-brand for Origami Games
- No section heading above the cards — they follow the hero naturally
- Phase 2: 3 hardcoded static cards (refactor to repeatable template in Phase 3 when real content arrives)

**Page structure**
- Top-to-bottom: Nav → Hero → Cards → Footer
- No additional sections (no bio block, no teaser)
- Footer content: email link + LinkedIn link + resume PDF download (exactly these three)
- Footer separated from page content by a thin rule / border-top
- Nav: use the Phase 1 shared fetch-injected nav — Claude decides whether to use standard position or transparent-to-solid scroll behavior based on what's simplest while fitting the aesthetic
- Mobile (375px): cards stack to single column, full width

**Visual personality**
- Origami-inspired CSS/SVG geometric accents used sparingly — 1–2 spots per page, not cluttered
- Phase 2 home page placements: near hero name/title, corner detail on project cards, near footer
- Accent colors: mix of terracotta (#c4614a) and peach (#f2d5aa) — NOT pixel art (don't imply pixel art is a skill)
- Accents are simple flat geometric fold shapes, not complex illustrations

### Claude's Discretion
- Exact sizing ratio between philosophy statement and name/role (tone-appropriate, not huge)
- Nav scroll behavior (transparent vs static — pick simplest that fits)
- Exact grain parameters for CSS texture
- Spacing and padding values within the token system
- Exact origami accent shapes and precise placements

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| REQ-H01 | Design philosophy statement visible above the fold on 1280px desktop without scrolling | Hero layout with min-height: calc(100svh - nav-height); philosophy sized at --text-xl or --text-md depending on line count |
| REQ-H02 | Designer's name and role/title appear in the hero section | Secondary typography block below philosophy in hero; Montserrat Alternates display face |
| REQ-H03 | 2–3 featured project cards visible on home page — static HTML with image, title, role | CSS Grid 3-col desktop layout; static cards in index.html |
| REQ-H04 | Featured project cards link directly to individual project pages | `<a href="/work/project-slug/">` wrapping each card; placeholder hrefs in Phase 2 |
| REQ-H05 | No splash screens, loading gates, or animations blocking content visibility | No animation on hero text; no GSAP on Phase 2 critical path; nav/footer fetch is non-blocking |
| REQ-H06 | Home page loads in under 3 seconds — hero images compressed before upload | No real images in Phase 2 (CSS/SVG texture placeholders); Google Fonts via preconnect already in Phase 1 head |
| REQ-N02 | Contact accessible within 2 clicks from any page | Footer already contains email link (Phase 1 footer.html); nav has Contact → /about#contact |
| REQ-N04 | All pages render correctly at 375px and 768px viewport widths | Cards: CSS Grid auto responsive with media query; hero: min-height with svh units; text doesn't overflow |
</phase_requirements>

---

## Summary

Phase 2 builds the home page on top of the complete Phase 1 foundation — tokens, shared nav/footer, 5-file CSS split, and GSAP CDN are already in place. The work is entirely in `index.html` and the existing CSS files (adding to `layout.css`, `components.css`, and potentially a new `home.css` or home-specific blocks in `components.css`). No new JavaScript is needed — the nav.js fetch-inject and animations.js stub already handle all scripting requirements.

The two technically interesting challenges are: (1) the CSS paper grain texture overlay for the hero background, and (2) the CSS-only dog-ear fold effect on card thumbnails. Both are pure-CSS/SVG techniques with no dependencies. The grain texture uses an inline SVG `feTurbulence` filter either as a hidden `<svg>` element in the DOM or as a data-URI background. The dog-ear uses a `clip-path: polygon()` cut on the thumbnail's `::after` pseudo-element, or a zero-width/height border trick on the thumbnail corner itself.

Performance is not a concern in Phase 2 because there are no real images — the thumbnail areas use CSS/SVG texture fills. The existing Google Fonts `preconnect` hints in the Phase 1 `<head>` are the correct approach. The primary above-the-fold risk is getting the hero height right: the sticky nav subtracts from viewport height, so the hero needs `min-height: calc(100svh - [nav height])` with a safe fallback to `100vh` for older browsers.

**Primary recommendation:** Build the home page as a single well-structured `index.html` with hero + cards sections, extend `components.css` with hero and card component styles, add the grain texture as a hidden inline SVG element referenced by CSS `filter: url(#grain)` on a hero pseudo-element, and use `clip-path: polygon()` for the dog-ear card thumbnail effect.

---

## Standard Stack

### Core (all already installed in Phase 1)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Montserrat Alternates | Google Fonts | Hero display typography | Locked decision; already loaded in Phase 1 `<head>` |
| Source Code Pro | Google Fonts | Body/UI text | Locked decision; already loaded |
| GSAP 3.14.2 | CDN jsDelivr | Animation (stub only in Phase 2) | Phase 1 CDN script already present; NOT used for Phase 2 content |
| CSS custom properties (tokens.css) | Built-in | All design values | Phase 1 foundation; complete token set available |

### No New Dependencies
Phase 2 requires zero new libraries or CDN additions. All needed capabilities are:
- CSS Grid / Flexbox — built into browsers
- CSS `clip-path: polygon()` — Baseline Widely Available (since January 2020, all modern browsers)
- SVG `feTurbulence` filter — supported in all modern browsers
- CSS `filter: url(#id)` referencing inline SVG — supported in all modern browsers

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline SVG `feTurbulence` for grain | External `.svg` file | Inline avoids extra HTTP request but slightly increases HTML size; for a single ~10-line SVG, inline wins |
| `clip-path: polygon()` for dog-ear | Border trick pseudo-element | Both work; `clip-path` is cleaner, has no color-matching problem, more flexible |
| CSS Grid for card row | Flexbox | Grid is simpler for equal-height 3-col layout with single-column fallback; use Grid |

**Installation:** None required. No new packages.

---

## Architecture Patterns

### File Locations
```
index.html                  # Home page — replace placeholder content with hero + cards
css/components.css          # Extend with: .hero, .hero__statement, .hero__identity,
                            #   .cards-grid, .project-card, .project-card__thumb,
                            #   .thumb-grain (texture fill reusable class)
css/layout.css              # No changes needed (container already handles width/padding)
css/animations.css          # No changes needed (hover uses CSS transitions, not GSAP)
_includes/footer.html       # Verify resume PDF link path — /assets/pdfs/resume.pdf
                            #   (file doesn't need to exist yet, but link must be correct)
assets/pdfs/               # Placeholder: resume.pdf will be added in Phase 7
```

### Pattern 1: Hero Section Structure
**What:** Centered hero with vertically-stacked philosophy → name/role, occupying enough viewport to be above-the-fold.
**When to use:** Any page that needs a branded above-fold statement.

```html
<!-- Source: established pattern; verified against Phase 1 structure -->

<!-- Hidden SVG providing the grain filter (place just after <body> open) -->
<svg width="0" height="0" aria-hidden="true" focusable="false"
     style="position:absolute;overflow:hidden;">
  <defs>
    <filter id="grain" color-interpolation-filters="sRGB"
            x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.72"
                    numOctaves="4" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
      <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended"/>
      <feComposite in="blended" in2="SourceGraphic" operator="in"/>
    </filter>
  </defs>
</svg>

<main id="main-content">
  <section class="hero" aria-label="Introduction">
    <div class="hero__inner">
      <p class="hero__statement">
        I design game systems that encourage players to reflect on their well-being
        and how they navigate pressure and meaning.
      </p>
      <div class="hero__identity">
        <span class="hero__name">Rebecca Anisman</span>
        <span class="hero__role">Narrative &amp; Experience Engineer</span>
      </div>
    </div>
  </section>

  <section class="cards-section" aria-label="Featured projects">
    <ul class="cards-grid" role="list">
      <li>
        <a class="project-card" href="/work/project-one/">
          <div class="project-card__thumb thumb-grain"></div>
          <div class="project-card__body">
            <h2 class="project-card__title">Project Title</h2>
            <p class="project-card__descriptor">Short descriptor — 1 to 2 lines.</p>
          </div>
        </a>
      </li>
      <!-- × 2 more cards -->
    </ul>
  </section>
</main>
```

### Pattern 2: CSS Paper Grain Texture
**What:** SVG `feTurbulence` filter applied via hidden inline `<svg>` to a pseudo-element overlay on the hero background.
**When to use:** Hero section background; any surface that needs a subtle warm paper feel.

```css
/* Source: CSS-Tricks Grainy Gradients + Frontend Masters Blog (2024) */

/* Hero section — grain applied via ::before pseudo-element overlay */
.hero {
  position: relative;
  min-height: calc(100svh - var(--nav-height, 72px));
  /* Fallback for browsers without svh: */
  min-height: calc(100vh - var(--nav-height, 72px));
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg);
  overflow: hidden;
}

/* Grain overlay — sits above background, below content */
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  /* Reference the inline SVG filter defined in the DOM */
  filter: url(#grain);
  opacity: 0.35;           /* Subtle — not overdone */
  pointer-events: none;
  z-index: 0;
  background-color: var(--color-bg); /* Feed a base color to the filter */
}

/* Ensure hero content sits above the grain overlay */
.hero__inner {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: var(--max-width-prose);
  padding: var(--space-20) var(--space-6);
}
```

**Key parameters for `feTurbulence`:**
- `baseFrequency="0.72"` — controls grain fineness; values 0.6–0.85 give paper-like grain
- `numOctaves="4"` — adds natural complexity; don't exceed 5 (performance)
- `stitchTiles="stitch"` — prevents visible seams when the noise tiles

### Pattern 3: Dog-Ear Fold on Card Thumbnail
**What:** A triangular corner cut on the card thumbnail using `clip-path: polygon()`, giving the "marked page" origami paper reference.
**When to use:** Project card thumbnail; any card that needs a paper bookmark quality.

```css
/* Source: MDN clip-path documentation (Baseline Widely Available) */

/* Reusable texture-fill class for thumbnails that have no real image */
.thumb-grain {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: var(--color-bg-surface);
  background-image:
    /* Subtle SVG diagonal crosshatch — data URI, no HTTP request */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Cpath d='M0 10L10 0' stroke='%23d9cdc0' stroke-width='0.5' opacity='0.5'/%3E%3C/svg%3E");
  position: relative;

  /* Dog-ear: cut the bottom-right corner */
  clip-path: polygon(
    0% 0%,
    100% 0%,
    100% 78%,    /* right edge, before fold starts */
    78% 100%,    /* bottom edge, where fold ends */
    0% 100%
  );

  /* Smooth reveal of dog-ear size on hover */
  transition: clip-path var(--duration-base) var(--ease-out);
}

/* On card hover: deepen the dog-ear fold */
.project-card:hover .thumb-grain,
.project-card:focus-within .thumb-grain {
  clip-path: polygon(
    0% 0%,
    100% 0%,
    100% 70%,
    70% 100%,
    0% 100%
  );
}
```

### Pattern 4: Card Lift Hover (Performant)
**What:** Lift + shadow increase on card hover using only `transform` and pseudo-element `opacity` — avoids repainting `box-shadow` directly.
**When to use:** Any interactive card component.

```css
/* Source: Tobias Ahlin — How to animate box-shadow (verified technique) */

.project-card {
  display: block;
  text-decoration: none;
  color: inherit;
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-base);
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 6px rgba(42, 31, 20, 0.08);
  transform: translateY(0);
  transition:
    transform var(--duration-base) var(--ease-out),
    border-color var(--duration-base);
}

/* Shadow pseudo-element: only opacity is animated, not box-shadow itself */
.project-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 8px 24px rgba(42, 31, 20, 0.14);
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out);
  pointer-events: none;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-border-strong);
}

.project-card:hover::after {
  opacity: 1;
}

/* Respect reduced motion — no translate, but allow subtle border/opacity change */
@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-card::after {
    transition: opacity var(--duration-base), border-color var(--duration-base);
  }
  .project-card:hover {
    transform: none;
  }
}
```

### Pattern 5: Responsive Card Grid
**What:** CSS Grid 3-column desktop layout that stacks to 1 column at 375px without media query magic — uses `auto-fill` with `minmax`.
**When to use:** Any card grid that needs mobile-first responsive behavior.

```css
/* Source: MDN CSS Grid layout documentation */

.cards-section {
  padding: var(--space-16) 0 var(--space-20);
}

.cards-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
  /* Container padding handled by .container wrapper */
}

/* Tablet: 2 columns */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
}

/* Mobile: 1 column, full width */
@media (max-width: 640px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}
```

### Pattern 6: Hero Typography Sizing
**What:** Philosophy statement sized to be readable but contemplative — NOT the largest element on screen.
**When to use:** The hero philosophy statement (REQ-H01 depends on this fitting above fold).

```css
/* Source: Phase 1 token system — perfect fourth scale */

.hero__statement {
  font-family: var(--font-display);
  font-size: var(--text-xl);       /* ~38px — prominent but not shouting */
  font-weight: var(--weight-normal); /* 400 — light, contemplative */
  font-style: italic;
  line-height: var(--leading-loose); /* 1.85 — breathing room for a long statement */
  color: var(--color-text);
  max-width: 52ch;                   /* Constrains line length for readability */
  margin-inline: auto;
  margin-bottom: var(--space-10);
}

.hero__identity {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  align-items: center;
}

.hero__name {
  font-family: var(--font-display);
  font-size: var(--text-lg);        /* ~28px — secondary to philosophy */
  font-weight: var(--weight-semibold);
  color: var(--color-text);
}

.hero__role {
  font-family: var(--font-body);
  font-size: var(--text-md);        /* ~21px */
  font-weight: var(--weight-normal);
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}

/* Mobile: scale down */
@media (max-width: 768px) {
  .hero__statement {
    font-size: var(--text-lg);  /* ~28px on mobile — still readable */
  }
  .hero__name {
    font-size: var(--text-md);
  }
}
```

### Anti-Patterns to Avoid
- **Animating `box-shadow` directly:** Causes layout repaints every frame. Use the pseudo-element opacity trick instead.
- **Using `100vh` alone for hero min-height on mobile:** iOS Safari's browser chrome eats into 100vh causing the hero to extend behind the address bar. Use `100svh` with `100vh` fallback.
- **Putting grain filter on the entire page body:** Grain filter applied to the whole `<body>` will run on every repaint of every element. Scope it to a single positioned pseudo-element.
- **SVG filter with very high `numOctaves`:** Values above 5 have significant CPU cost with no visible improvement. Keep at 3–4.
- **Hiding the `<svg>` filter element with `display:none`:** Browsers may not process SVG filters inside `display:none` elements. Use `width:0; height:0; position:absolute; overflow:hidden` instead.
- **Using `grid-template-columns: repeat(auto-fill, minmax(...))` without testing:** The minmax approach is elegant but can produce 2 awkward columns at some breakpoints. For exactly 3→2→1, explicit media queries are more predictable.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Paper grain texture | Custom PNG/JPG texture image | Inline SVG `feTurbulence` filter | SVG filter is <1KB, scales to any size, no HTTP request, no CLS |
| Thumbnail placeholder | `<img>` with onerror handler | CSS background on `.thumb-grain` div | No JS needed; gracefully degraded; same class reusable site-wide |
| Card shadow animation | Animating `box-shadow` on hover | `::after` pseudo-element with opacity transition | `box-shadow` triggers repaints; `opacity` + `transform` are GPU-composited |
| Mobile nav | JavaScript-based hamburger menu | Static CSS nav from Phase 1 (already works) | Phase 2 doesn't add hamburger; existing wrapping nav is acceptable for v1 |

**Key insight:** Every visual effect in Phase 2 is achievable with pure CSS/SVG. No JavaScript is needed for the home page beyond the existing nav.js inject.

---

## Common Pitfalls

### Pitfall 1: Hero Content Below the Fold
**What goes wrong:** The philosophy statement is partially hidden on a 1280px desktop because the hero min-height doesn't account for the sticky nav height.
**Why it happens:** The nav is `position: sticky; top: 0` and occupies ~72px. If the hero is `min-height: 100svh`, the viewport calculation doesn't subtract the nav, pushing content down.
**How to avoid:** Set `min-height: calc(100svh - 72px)` or use a CSS custom property `--nav-height: 72px` set explicitly (the nav height is deterministic from the token values: `padding: var(--space-4) × 2 + font-size + line-height ≈ 72px`).
**Warning signs:** On a 1280×800 viewport, the "role/title" text clips below the fold.

### Pitfall 2: SVG Filter Not Rendering
**What goes wrong:** The grain texture appears completely absent even though the CSS looks correct.
**Why it happens:** Either (a) the `<svg>` element is `display: none` which disables filter processing in many browsers, or (b) the CSS references `url(#grain)` but the `<svg>` element is not yet in the DOM when the CSS applies (timing issue with dynamically inserted content).
**How to avoid:** Place the hidden `<svg>` immediately after the opening `<body>` tag (before the nav inject div). Use `width:0; height:0; position:absolute; overflow:hidden` not `display:none`.
**Warning signs:** Hero background is the plain `--color-bg` colour with no texture.

### Pitfall 3: Dog-Ear Breaks with Rounded Border-Radius
**What goes wrong:** The card has `border-radius: var(--radius-base)` (8px) but the `clip-path: polygon()` clips straight edges, removing the border radius entirely.
**Why it happens:** `clip-path` overrides `border-radius` — both affect the painted shape of the element, and `clip-path` wins.
**How to avoid:** Apply `clip-path` to the `.thumb-grain` div only (the thumbnail area), NOT to the whole `.project-card`. The card keeps its `border-radius`; only the thumbnail gets the dog-ear cut. This is the correct architecture in the Pattern 3 code above.
**Warning signs:** Card corners appear square despite `border-radius` on `.project-card`.

### Pitfall 4: `fetch()` for Nav/Footer Fails in Local Dev
**What goes wrong:** Nav and footer don't render during local development.
**Why it happens:** `nav.js` uses `fetch()` which requires HTTP. If the file is opened directly in the browser via `file://` protocol, fetch is blocked.
**How to avoid:** Use VS Code Live Server (or any local HTTP server) for local development. This is documented in `js/nav.js`. Nothing to change — just reminder for the executor.
**Warning signs:** Nav div is empty, console shows `fetch` failed.

### Pitfall 5: CLS from Google Fonts Swap
**What goes wrong:** Layout shifts visible when Montserrat Alternates loads and replaces the system fallback, causing the hero statement to reflow.
**Why it happens:** The Google Fonts URL uses `display=swap` by default, causing a flash of the fallback font at its different metrics.
**How to avoid:** The Google Fonts link already uses `display=swap` (implied by the Phase 1 URL pattern). The main mitigation is sizing the philosophy statement with `max-width: 52ch` and `line-height: var(--leading-loose)` so the number of lines is stable between font loads. The hero text is also centered, so horizontal reflow is less visually jarring. For v1 this is acceptable; self-hosting with `size-adjust` is a v2 optimization.
**Warning signs:** Hero text jumps/reflows briefly on first load.

### Pitfall 6: Card Link Accessibility
**What goes wrong:** Screen readers announce "link" but the card content isn't clearly associated with the link's purpose.
**Why it happens:** When an `<a>` wraps complex content (thumbnail + title + descriptor), the accessible name is the concatenated text of all children, which can be verbose or confusing.
**How to avoid:** Use `aria-labelledby` pointing to the `<h2>` title element, OR use `aria-label` on the anchor. Alternatively, structure as card with the `<h2>` containing the anchor and an `::after` pseudo-element stretching the tap area across the card (`position: absolute; inset: 0`). The `::after` stretch approach keeps semantic heading structure clean.
**Warning signs:** VoiceOver reads "Project Title Short descriptor one to two lines" as the link label.

---

## Code Examples

Verified patterns from official sources:

### Above-the-Fold Hero Height (svh with fallback)
```css
/* Source: MDN viewport units + ishadeed.com new viewport units (2023) */
/* svh = small viewport height = stable even when browser chrome shows */
.hero {
  /* Fallback for browsers without svh support (< Chrome 108, < Safari 15.4) */
  min-height: calc(100vh - 72px);
  /* Modern: use svh which accounts for dynamic browser chrome */
  min-height: calc(100svh - 72px);
}
```

### clip-path Dog-Ear (from MDN polygon() documentation)
```css
/* Source: MDN clip-path + polygon() — Baseline Widely Available */
/* Cuts the bottom-right corner to create folded-page dog-ear */
.thumb-grain {
  clip-path: polygon(
    0% 0%,
    100% 0%,
    100% 78%,
    78% 100%,
    0% 100%
  );
}
```

### Performant Hover Shadow (pseudo-element opacity technique)
```css
/* Source: Tobias Ahlin — tobiasahlin.com/blog/how-to-animate-box-shadow/ */
/* Animates opacity (GPU composited) not box-shadow (triggers repaint) */
.project-card::after {
  content: "";
  position: absolute;
  inset: 0;
  box-shadow: 0 8px 24px rgba(42, 31, 20, 0.14);
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out);
  pointer-events: none;
}
.project-card:hover::after { opacity: 1; }
```

### Hidden SVG Filter Element (correct pattern)
```html
<!-- Source: Frontend Masters Blog — Grainy Gradients (2024) -->
<!-- width/height 0, position:absolute hides element without display:none -->
<!-- display:none can prevent browser from processing SVG filters -->
<svg width="0" height="0" aria-hidden="true" focusable="false"
     style="position:absolute;overflow:hidden;">
  <defs>
    <filter id="grain" color-interpolation-filters="sRGB"
            x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.72"
                    numOctaves="4" stitchTiles="stitch"/>
    </filter>
  </defs>
</svg>
```

### Thumbnail Texture Data URI (inline SVG crosshatch, no HTTP request)
```css
/* Source: verified inline SVG data URI technique — alexwlchan.net (2024) */
/* Characters that need escaping in data URI: # → %23, < → %3C, > → %3E, space → %20 */
.thumb-grain {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3E%3Cpath d='M0 12L12 0' stroke='%23d9cdc0' stroke-width='0.6' opacity='0.4'/%3E%3Cpath d='M0 6L6 0' stroke='%23d9cdc0' stroke-width='0.4' opacity='0.3'/%3E%3C/svg%3E");
  background-size: 12px 12px;
  background-color: var(--color-bg-surface);
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `height: 100vh` for full-screen sections | `min-height: 100svh` with `100vh` fallback | Chrome 108 / Safari 15.4 (2022-2023) | Prevents hero being cut off by iOS Safari browser chrome |
| Animating `box-shadow` directly | Animating pseudo-element `opacity` | Well-established but newly documented as best practice | 60fps animations without repaints |
| External texture image files | Inline SVG `feTurbulence` | Long-established technique, now standard | Zero HTTP requests, perfect scaling |
| `display: none` to hide SVG defs | `width:0; height:0; position:absolute; overflow:hidden` | Known browser quirk | SVG filters work correctly |

**Deprecated/outdated:**
- `height: 100vh` on mobile hero sections: Use `min-height: 100svh` + `100vh` fallback. Pure `100vh` is too tall on iOS Safari.
- Animating `box-shadow` directly on hover: Use the pseudo-element opacity technique. Direct `box-shadow` animation triggers layout repaints.

---

## Open Questions

1. **Nav height for above-fold calculation**
   - What we know: The nav uses `padding: var(--space-4) var(--space-6)` = 16px top + 16px bottom + ~28px for `--text-lg` logo text at ~line-height 1.4 ≈ 72px total
   - What's unclear: Whether the logo line-height renders exactly as calculated, or if it's a few pixels different across browsers
   - Recommendation: Set `--nav-height: 72px` as a CSS custom property in tokens.css, measure on first load, adjust if needed. The exact value affects REQ-H01.

2. **Resume PDF file**
   - What we know: Footer already links to `/assets/pdfs/resume.pdf`; the file doesn't need to exist for Phase 2 (the link can be a placeholder)
   - What's unclear: Whether the planner should instruct the executor to add a placeholder PDF or just leave the link pointing to a not-yet-existing file
   - Recommendation: Add a note in the plan to leave the resume link as-is (pointing to the correct future path) — the broken link is acceptable until Phase 7. REQ-N03 (footer links) is satisfied by structure; REQ-PL04 (tested working) is a Phase 10 concern.

3. **Card placeholder hrefs**
   - What we know: Cards must link to individual project pages (REQ-H04) but no project pages exist yet
   - What's unclear: Whether placeholder hrefs like `/work/project-one/` are acceptable or if the planner wants `href="#"` stubs
   - Recommendation: Use descriptive placeholder hrefs like `/work/wellbeing-game/` that match the expected final URL structure. This avoids refactoring later and demonstrates intentionality.

---

## Sources

### Primary (HIGH confidence)
- MDN Web Docs — `clip-path` property, `polygon()` function, Baseline Widely Available browser support
- MDN Web Docs — `filter: url()` CSS property, SVG filter element specifications
- Phase 1 codebase — `css/tokens.css`, `css/components.css`, `css/layout.css`, `index.html`, `js/nav.js`, `_includes/nav.html`, `_includes/footer.html` (directly read)

### Secondary (MEDIUM confidence)
- CSS-Tricks: "Grainy Gradients" — `feTurbulence` SVG filter technique (verified against MDN SVG filter specs)
- Frontend Masters Blog: "Grainy Gradients" — feDisplacementMap variant, color-interpolation-filters='sRGB' parameter importance
- Tobias Ahlin: "How to animate box-shadow" — pseudo-element opacity technique (verified: uses only `opacity` + `transform`, both GPU-composited properties)
- MDN: Viewport units (`svh`, `lvh`, `dvh`) — browser support verified as Chrome 108+, Safari 15.4+, Firefox 101+

### Tertiary (LOW confidence, flag for validation)
- Nicolas Gallagher: Pure CSS folded-corner effect — border trick pseudo-element approach (technique is old but verified as still functional; `clip-path` approach recommended instead as it's cleaner)
- WebSearch results on Google Fonts CLS / `size-adjust` — multiple consistent sources but not directly verified against Montserrat Alternates specifically

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Phase 1 foundation is read directly from codebase; no new dependencies
- Architecture: HIGH — patterns derived from Phase 1 existing structure; HTML/CSS only
- CSS grain texture: MEDIUM — technique verified in multiple authoritative sources; exact `baseFrequency` parameter needs visual tuning
- Dog-ear clip-path: HIGH — MDN polygon() Baseline Widely Available; exact percentage values need visual calibration
- Hover animation: HIGH — Tobias Ahlin technique is a well-known, widely-referenced pattern verified against compositing principles
- Pitfalls: HIGH — sourced from direct codebase reading (nav.js comment about file:// fetch) and verified browser behavior documentation

**Research date:** 2026-02-27
**Valid until:** 2026-03-27 (stable CSS/browser APIs; nothing here is fast-moving)

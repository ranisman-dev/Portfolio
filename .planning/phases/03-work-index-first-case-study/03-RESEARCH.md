# Phase 3: Work Index + First Case Study — Research

**Researched:** 2026-03-08
**Domain:** Static HTML/CSS — work index page, case study template, multi-page navigation
**Confidence:** HIGH (project-internal patterns; no new external libraries introduced)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Work Index layout**
- Slightly denser feel than the home page featured cards — not the same component reused verbatim
- Single column list (not a 2-column grid) — works identically on mobile, no reflow needed
- Each card shows: project title, specific role, platform/status as a text tag, then a short descriptor sentence
- Minimal page header — just "Work" (no intro paragraph; visitors came to see the work)
- Platform/status rendered as a visible text tag on the card face (not buried in body text)
- Card order = DOM order in `/work/index.html` — reordering means cut/paste the card block, nothing else

**Content and asset strategy**
- Template-first: build the full 8-section structure with placeholder content, not real copy
- Image slots use `.thumb-grain` placeholder (crosshatch pattern, same as Phase 2) throughout
- Bracketed placeholder text for all copy fields (e.g. `[Project title]`, `[2–4 sentence summary]`)
- Real content filled in after the site is structurally complete — Phase 3 validates structure only

**Case study page layout**
- Narrow reading column: 60–70ch, centered with generous side margins
- Hero (section 1): project title and metadata (role, platform, status) first — image/placeholder below
- Purely vertical scroll — no sticky sidebar, no in-page section nav
- Section separation: small-caps section labels in accent color (game-doc feel) + light origami accent mark between sections (echoes home page diamond geometry)
- Philosophy throughline (REQ-W04 — 1–3 sentences on well-being/pressure/meaning): rendered as a visual callout with terracotta left-border pull-quote treatment, matching home page philosophy statement style

**Project slugs and stubs**
- Slugs: `project-1`, `project-2`, `project-3` — generic and rearrangeable; actual project identity noted in HTML comments inside each stub's `index.html`
- `project-1`: the live template case study (full 8-section structure with placeholders)
- `project-2`, `project-3`: stub pages — full HTML shell with placeholder content, accessible at their URLs but their cards are **commented out** in `/work/index.html` until ready
- Work Index includes a code comment block explaining: (a) how to uncomment a card to make it visible, (b) how to add a 4th project (create folder, copy template, add card block)
- Display order is controlled by card order in the HTML — no routing config, no data layer

### Claude's Discretion
- Exact visual weight and spacing of the section labels vs. the origami accent mark
- Stub placeholder content (keep it minimal and clearly labeled — e.g. `[Project 2 — placeholder]`)
- Exact HTML comment format for the "how to add a project" instructions
- Whether the Work Index card component shares CSS classes with the home page cards or gets its own variant classes

### Deferred Ideas (OUT OF SCOPE)
- Sticky in-page section nav (table of contents) — candidate for Phase 9 polish if case studies get long
- Renaming project slugs after public launch requires a Netlify redirect — handle case-by-case, not in Phase 3
- Real project content and actual images — Phase 3 is template only; content fill-in is post-structure work
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| REQ-W01 | Work index at `/work` displays a curated grid of 3–6 projects | Work Index layout pattern; single-column list; card variant classes |
| REQ-W02 | Each Work card shows: project title, specific role, platform/format/status, one evocative image | Card component with `.project-card__tag` for platform/status; `.thumb-grain` for image slot |
| REQ-W03 | All project pages follow the 8-section template | Case study HTML template; section label + accent mark pattern; `<article>` + `<section>` semantic structure |
| REQ-W04 | Each project page includes 1–3 sentences connecting project to design philosophy throughline | Pull-quote callout pattern (terracotta left border, matches `.hero__statement`) |
| REQ-W05 | At least 1 complete case study with full 8-section structure is live at v1 launch | project-1/index.html as fully-structured placeholder template |
| REQ-W06 | Prototypes shown only when they add info screenshots cannot — each with a 2–4 sentence brief | Case study section 4 (process) pattern; `.artifact-brief` callout element |
| REQ-W07 | All projects given equal case study depth — no "screenshots + store link only" pages | Stub pages get same 8-section HTML shell as project-1 |
| REQ-W08 | Project pages include prev/next navigation and a link back to the Work index | Case study nav footer; `.case-study-nav` component with prev/next + back link |
| REQ-X04 | Every phase introducing custom CSS/JS includes a mobile viewport test before phase is marked complete | Mobile verification checkpoint in final plan; test at 375px before close |
</phase_requirements>

---

## Summary

Phase 3 introduces two new page types — the Work Index (`/work/index.html`) and the Case Study template (`/work/project-1/index.html`) — plus two additional stub pages (`/work/project-2/`, `/work/project-3/`). No new external libraries are introduced. The entire technical domain is project-internal: extending the established HTML/CSS pattern system already proven in Phases 1–2.

The Work Index requires a new card variant (denser than the home page featured cards, single-column, with a visible platform/status tag) and the Case Study requires a reading-column layout with 8 semantically distinct sections. Both are solved purely with CSS custom properties, existing tokens, and new component classes added to `components.css`. The `.thumb-grain` placeholder, card hover patterns, and shadow technique from Phase 2 carry forward unchanged.

The most consequential decision in this phase is the case study section structure — it must be right the first time because Phase 4 replicates it verbatim for every subsequent project. Getting the 8-section HTML template clean, semantic, and clearly commented is the primary quality gate.

**Primary recommendation:** Build the work-index card variant as a CSS modifier on the existing `.project-card` base (shared class, variant modifier class), write the 8-section case study as a single `<article>` with `<section>` elements, and place a standalone `.case-study-nav` footer component for prev/next + back-to-work navigation.

---

## Standard Stack

### Core
| Component | Version/Source | Purpose | Why Standard |
|-----------|---------------|---------|--------------|
| Raw HTML/CSS/JS | — | All markup and styling | Project-locked: no build tools, no SSG in v1 |
| CSS custom properties | `/css/tokens.css` (existing) | All spacing, color, type, animation values | Established in Phase 1 — all phases extend this |
| `.thumb-grain` class | `/css/components.css` (existing) | Crosshatch placeholder for image slots | Proven Phase 2 pattern; reused site-wide for all no-image slots |
| `components.css` | `/css/components.css` (existing) | Home of all new component classes | Established 5-file CSS split; new component classes go here |
| GSAP 3.14.2 | jsDelivr CDN (already loaded) | JS animation — not used in Phase 3 but loaded by default | Carried from Phase 1 template; no Phase 3 animation work needed |

### No New Libraries
Phase 3 introduces no new CDN dependencies. All implementation is vanilla HTML + CSS tokens already defined.

---

## Architecture Patterns

### Directory Structure (after Phase 3)
```
work/
├── index.html              # Work Index — full card list
└── project-1/
│   └── index.html          # Template case study — full 8 sections with placeholders
├── project-2/
│   └── index.html          # Stub — 8-section HTML shell, commented-out card
└── project-3/
    └── index.html          # Stub — 8-section HTML shell, commented-out card
```

All use root-relative paths (`/css/tokens.css`, `/js/nav.js`) — never relative (`../../css/`).

### Pattern 1: Work Index — Single-Column Card List

**What:** A `<ul>` of work cards, single column, each card showing title + role + platform tag + descriptor.
**When to use:** The Work Index only — NOT the home page grid (different density and metadata).
**Class recommendation:** Use `.work-card` as the block class (not `.project-card`) to allow independent styling, OR use `.project-card.project-card--work` modifier. Given the decision to allow discretion here, a clean `.work-card` class with shared token values is simpler and more readable than a modifier chain.

```html
<!-- work/index.html — card structure -->
<ul class="work-list" role="list">
  <li>
    <a class="work-card" href="/work/project-1/">
      <div class="work-card__thumb thumb-grain" aria-hidden="true"></div>
      <div class="work-card__body">
        <h2 class="work-card__title">[Project Title]</h2>
        <p class="work-card__meta">
          <span class="work-card__role">[Specific Role]</span>
          <span class="work-card__tag">[Platform / Status]</span>
        </p>
        <p class="work-card__descriptor">[One evocative sentence.]</p>
      </div>
    </a>
  </li>
  <!-- Stub cards: commented out — see comment block above for how to activate -->
  <!--
  <li>
    <a class="work-card" href="/work/project-2/">
      ...
    </a>
  </li>
  -->
</ul>
```

**CSS:** Single-column, no `grid-template-columns` split needed. Use `display: flex` with `flex-direction: column` gap or a simple `ul > li + li { margin-top }` approach. Cards are block-level `<a>` elements matching the `.project-card` hover pattern (lift + border-left snap + shadow via `::after` opacity).

### Pattern 2: Case Study Page — 8-Section Article

**What:** A single `<article>` wrapping 8 `<section>` elements, each with a visible small-caps label.
**When to use:** Every project page (`/work/project-*/index.html`).
**Semantic structure:** `<article>` is the correct element for a self-contained document (a case study is a complete, independently distributable piece). `<section>` is correct for major thematic divisions within it.

```html
<!-- work/project-1/index.html — full case study structure -->
<main id="main-content">
  <article class="case-study">

    <!-- Section 1: Title block -->
    <section class="case-study__section case-study__hero">
      <div class="case-study__label" aria-hidden="true">Project</div>
      <h1 class="case-study__title">[Project Title]</h1>
      <div class="case-study__meta">
        <span class="case-study__role">[Specific Role, e.g. Narrative Designer]</span>
        <span class="case-study__tag">[Platform / Status]</span>
      </div>
      <div class="case-study__hero-image thumb-grain" aria-hidden="true"></div>
    </section>

    <!-- Origami accent mark between sections -->
    <div class="section-divider" aria-hidden="true"></div>

    <!-- Section 2: Summary -->
    <section class="case-study__section">
      <div class="case-study__label" aria-hidden="true">Summary</div>
      <p>[2–4 sentence project summary for non-industry readers.]</p>
    </section>

    <div class="section-divider" aria-hidden="true"></div>

    <!-- Section 3: Challenge -->
    <section class="case-study__section">
      <div class="case-study__label" aria-hidden="true">Challenge</div>
      <p>[Design challenge / problem statement.]</p>
    </section>

    <div class="section-divider" aria-hidden="true"></div>

    <!-- Section 4: Process -->
    <section class="case-study__section">
      <div class="case-study__label" aria-hidden="true">Process</div>
      <p>[Process / approach narrative with supporting artifacts.]</p>
      <!-- Artifact brief (REQ-W06) — only when prototype/artifact adds info screenshots can't -->
      <!--
      <aside class="artifact-brief">
        <p>[What design question this artifact answers. What to notice. What was discovered.]</p>
        <div class="thumb-grain" aria-hidden="true"></div>
      </aside>
      -->
    </section>

    <div class="section-divider" aria-hidden="true"></div>

    <!-- Section 5: Outcome -->
    <section class="case-study__section">
      <div class="case-study__label" aria-hidden="true">Outcome</div>
      <p>[Outcome with qualitative evidence where available.]</p>
    </section>

    <div class="section-divider" aria-hidden="true"></div>

    <!-- Section 6: Reflection -->
    <section class="case-study__section">
      <div class="case-study__label" aria-hidden="true">Reflection</div>
      <p>[Reflection paragraph.]</p>
    </section>

    <div class="section-divider" aria-hidden="true"></div>

    <!-- Section 7: Writing / Documents -->
    <section class="case-study__section">
      <div class="case-study__label" aria-hidden="true">Writing</div>
      <p>[Attached writing/documents with inline excerpts — cross-linked from /writing/ in Phase 5.]</p>
    </section>

    <div class="section-divider" aria-hidden="true"></div>

    <!-- Section 8: Navigation footer -->
    <nav class="case-study-nav" aria-label="Project navigation">
      <a class="case-study-nav__back" href="/work/">← Back to Work</a>
      <div class="case-study-nav__siblings">
        <!-- prev/next: populated with real project links; use aria-label for screen readers -->
        <a class="case-study-nav__prev" href="/work/project-3/" aria-label="Previous project">[← Previous Project]</a>
        <a class="case-study-nav__next" href="/work/project-2/" aria-label="Next project">[Next Project →]</a>
      </div>
    </nav>

  </article>
</main>
```

### Pattern 3: Philosophy Throughline Callout (REQ-W04)

**What:** A visually distinct pull-quote block for the 1–3 sentences connecting the project to the design philosophy.
**Where:** Lives inside the Reflection section (section 6) or as a standalone callout within the Outcome section, depending on content.
**CSS treatment:** Reuse the same visual language as `.hero__statement` — terracotta left border (`border-left: 3px solid var(--color-accent)`), slightly italic, max-width constrained. This connects the case study back to the hero statement visually.

```html
<!-- Philosophy throughline callout — reuses hero__statement visual DNA -->
<blockquote class="philosophy-callout">
  <p>[1–3 sentences explicitly connecting this project to well-being, pressure, and meaning.]</p>
</blockquote>
```

```css
/* In components.css — philosophy callout reuses hero statement visual DNA */
.philosophy-callout {
  border-left: 3px solid var(--color-accent);
  padding-left: var(--space-6);
  margin: var(--space-8) 0;
  font-style: italic;
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: var(--text-md);
  line-height: var(--leading-loose);
  max-width: 52ch;
}

.philosophy-callout p {
  margin: 0;
}
```

### Pattern 4: Section Label — Game-Doc Aesthetic

**What:** Small-caps, terracotta or muted accent, sitting above section content.
**Visual feel:** Game design document section headers — confident and slightly formal, not blog-post `<h2>` headers.

```css
/* In components.css */
.case-study__label {
  font-family: var(--font-body);          /* Source Code Pro — monospace gives game-doc feel */
  font-size: var(--text-xs);              /* Small — label, not heading */
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-accent);             /* Terracotta — visible but not dominant */
  margin-bottom: var(--space-3);
  /* No margin-top needed — section-divider handles the gap above */
}
```

### Pattern 5: Section Divider — Origami Accent Mark

**What:** A small decorative element between case study sections — echoes the home page diamond geometry.
**What it is NOT:** It is not the `.cards-section::before` repeating diamond strip (that's for the home page hero-to-cards transition). This is a single, quieter mark.

```css
/* In components.css — single diamond divider between case study sections */
.section-divider {
  width: 100%;
  margin: var(--space-10) 0;
  text-align: center;
  position: relative;
}

.section-divider::before {
  content: "◆";
  font-size: 0.5rem;
  color: var(--color-secondary);          /* Peach — softer than terracotta; reads as breath not stop */
  letter-spacing: 0;
  opacity: 0.8;
}
```

### Pattern 6: Reading Column Layout

**What:** 60–70ch max-width centered column for all case study prose.
**Tokens already defined:** `--max-width-prose: 65ch` — use this directly.

```css
/* In layout.css (extend existing .prose utility) OR directly on .case-study */
.case-study {
  max-width: 65ch;                        /* --max-width-prose */
  margin-inline: auto;
  padding: var(--space-16) var(--space-6) var(--space-20);
}
```

Note: `--max-width-prose` is `65ch` which lands in the specified 60–70ch window. No new token needed.

### Pattern 7: Work Index Page Header

**What:** Minimal — just an `<h1>Work</h1>` with no intro paragraph.
**Implementation:** The existing `work/index.html` stub already has `<h1>Work</h1>`. Phase 3 replaces the placeholder `<p>` with the card list.

```html
<!-- work/index.html — minimal page header -->
<header class="page-header">
  <h1 class="page-header__title">Work</h1>
</header>
```

```css
/* In components.css — minimal page header (reusable for Writing, About, etc.) */
.page-header {
  padding: var(--space-12) 0 var(--space-8);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--space-10);
}

.page-header__title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  color: var(--color-text);
  line-height: var(--leading-tight);
}
```

### Anti-Patterns to Avoid

- **Duplicating nav/footer markup in new HTML files:** All new pages use `<div id="site-nav"></div>` and `<div id="site-footer"></div>` — never inline the nav/footer markup directly.
- **Using relative paths in new sub-pages:** `/work/project-1/index.html` is two levels deep. `../../css/tokens.css` will appear to work locally on Windows but will break on some environments. Use root-relative `/css/tokens.css` exclusively.
- **Applying clip-path to `.work-card` wrapper:** If a dog-ear fold effect is desired on work cards, apply `clip-path` to `.thumb-grain` only, never the card element itself (established Phase 2 rule — clip-path overrides border-radius on the wrapper).
- **Using CSS `display:none` on stub cards:** Stub cards must be commented out in HTML, not hidden with CSS. Display-none content is still in the DOM and can be accidentally discovered or activated. HTML comments make intent clear to any future reader of the source.
- **Hardcoding prev/next links without a comment:** With no data layer, prev/next links in the case study footer must be manually maintained. Add an HTML comment noting which file to update when project order changes.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image placeholders | Custom placeholder components | `.thumb-grain` class | Already built in Phase 2; crosshatch SVG pattern, fold effect, correct overflow behavior all included |
| Philosophy callout box | Custom styled `<div>` from scratch | Reuse `.hero__statement` visual DNA (border-left + italic + font-display) | Consistency is the feature — visual link between hero and each case study is intentional brand |
| Section dividers | Image files or complex SVG | CSS `::before` with `◆` glyph | Resolution-independent, no request, matches footer pattern established in Phase 2 |
| Card hover shadow | Direct `box-shadow` transition | `::after` opacity pattern | Phase 2 established this as the site-wide standard — direct box-shadow triggers repaints |
| Active nav state | JS-based router | `aria-current="page"` set in HTML | Static site; set `aria-current="page"` on the Work nav link in `work/index.html`. The fetch-inject nav.js does not set this automatically — it must be set per-page in the HTML that calls nav.js, OR nav.js can be extended to detect `location.pathname`. |

**Active nav state note (HIGH confidence, important):** The current `nav.js` injects `_includes/nav.html` verbatim — it does not set `aria-current="page"` dynamically. The `.site-nav__link[aria-current="page"]` CSS rule exists and is already styled (bold, dark text). Either: (a) extend `nav.js` to add `aria-current` based on `window.location.pathname`, or (b) each page manually sets the attribute via a small inline script after nav injection. Option (a) is cleaner and makes Phase 4+ automatic. This should be decided in the plan.

---

## Common Pitfalls

### Pitfall 1: Relative Paths Break at /work/project-1/ Depth
**What goes wrong:** Writing `<link rel="stylesheet" href="../../css/tokens.css">` appears to work locally but is fragile and inconsistent with the established pattern.
**Why it happens:** `/work/project-1/index.html` is two directory levels deep. Developers reach for relative paths instinctively.
**How to avoid:** All `<link>`, `<script>`, and `<a href>` tags in every file use root-relative paths starting with `/`. This is the established project standard from Phase 1.
**Warning signs:** Any path not starting with `/` in an HTML file is wrong.

### Pitfall 2: Nav.js Active State Not Set Automatically
**What goes wrong:** The Work nav link doesn't visually activate when on `/work/` or `/work/project-1/` because `nav.js` injects the nav HTML verbatim without reading `window.location`.
**Why it happens:** `_includes/nav.html` is a static include — no dynamic attribute injection exists yet.
**How to avoid:** Either extend `nav.js` to add `aria-current="page"` to the matching link (compare `link.getAttribute('href')` to `window.location.pathname`), OR per-page inline script after nav injection. Nav.js extension is the right call — it makes all future pages automatic.
**Warning signs:** The Work link does not appear bold/dark when on the Work index or any project page.

### Pitfall 3: Prev/Next Links Require Manual Maintenance
**What goes wrong:** Adding a 4th project later breaks the prev/next chain because the links are hardcoded in each project's HTML.
**Why it happens:** No routing layer — all navigation is static HTML.
**How to avoid:** Document the maintenance contract clearly in an HTML comment inside each case study's nav footer. Example: `<!-- MAINTENANCE: if you change project order, update prev/next hrefs in all project files -->`. This is the agreed approach — it is intentional, not an oversight.
**Warning signs:** Clicking "Next Project" lands on an unexpected page after reordering.

### Pitfall 4: `.thumb-grain` Hero Image Aspect Ratio on Case Study Page
**What goes wrong:** The `.thumb-grain` class sets `aspect-ratio: 16/9` — appropriate for small card thumbnails, but may be too squat for a large hero image slot on a case study page.
**Why it happens:** The class was designed for compact cards; the case study hero image slot is a different context.
**How to avoid:** On the case study hero, use `.thumb-grain` for the crosshatch pattern and fold effect, but add a modifier or override for aspect ratio: `.case-study__hero-image` can set `aspect-ratio: 3/2` or `aspect-ratio: 16/9` depending on feel. The baseline `.thumb-grain` ratio (16/9) is fine as a starting point and can be overridden without modifying the base class.
**Warning signs:** Case study hero feels cramped or disproportionate against the reading column.

### Pitfall 5: `<article>` vs. `<main>` Wrapping Confusion
**What goes wrong:** Nesting `<article class="case-study">` inside `<main>` is correct, but using `<article>` as the outer wrapper for the entire page (replacing `<main>`) is invalid.
**Why it happens:** `<article>` and `<main>` serve different purposes — `<main>` is the page's primary content landmark; `<article>` is a self-contained document within it.
**How to avoid:** The correct structure is `<main id="main-content"><article class="case-study">...</article></main>`. This is what the code examples in this document use.
**Warning signs:** Screen readers announce "article" instead of "main" as the landmark region.

### Pitfall 6: Work Index Card URLs Must Match Actual Directories
**What goes wrong:** The home page currently links to `/work/wellbeing-game/`, `/work/experience-design/`, and `/work/narrative-systems/` — but Phase 3 establishes slugs as `project-1`, `project-2`, `project-3`.
**Why it happens:** The home page placeholder cards were created with example slugs before Phase 3 established the actual directory structure.
**How to avoid:** When creating the real directory structure in Phase 3, update the home page featured card `href` values to match the real paths. The decision to use generic slugs means the home page cards should link to `/work/project-1/` (or whatever the final slug becomes), not the Phase 2 placeholder paths.
**Warning signs:** Clicking a home page card 404s because the URL was not updated.

---

## Code Examples

### Work Index — Full Page Structure
```html
<!-- work/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Work — Origami Games</title>
  <meta name="description" content="Game design and narrative case studies by Rebecca Anisman.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Code+Pro:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/tokens.css">
  <link rel="stylesheet" href="/css/base.css">
  <link rel="stylesheet" href="/css/layout.css">
  <link rel="stylesheet" href="/css/components.css">
  <link rel="stylesheet" href="/css/animations.css">
</head>
<body class="page-work">

  <div id="site-nav"></div>

  <main id="main-content">
    <div class="container">

      <header class="page-header">
        <h1 class="page-header__title">Work</h1>
      </header>

      <!-- Work card list — single column, one card per project.
           To show a project: uncomment its <li> block.
           To add a 4th project: create /work/project-4/index.html (copy project-1 template),
           then add a new <li> block below following the same structure. -->
      <ul class="work-list" role="list">

        <li>
          <a class="work-card" href="/work/project-1/">
            <div class="work-card__thumb thumb-grain" aria-hidden="true"></div>
            <div class="work-card__body">
              <h2 class="work-card__title">[Project Title]</h2>
              <p class="work-card__meta">
                <span class="work-card__role">[Specific Role]</span>
                <span class="work-card__tag">[Platform / Status]</span>
              </p>
              <p class="work-card__descriptor">[One sentence descriptor.]</p>
            </div>
          </a>
        </li>

        <!--
        <li>
          <a class="work-card" href="/work/project-2/">
            <div class="work-card__thumb thumb-grain" aria-hidden="true"></div>
            <div class="work-card__body">
              <h2 class="work-card__title">[Project 2 — placeholder]</h2>
              <p class="work-card__meta">
                <span class="work-card__role">[Role]</span>
                <span class="work-card__tag">[Platform / Status]</span>
              </p>
              <p class="work-card__descriptor">[Descriptor]</p>
            </div>
          </a>
        </li>
        -->

      </ul>

    </div>
  </main>

  <div id="site-footer"></div>

  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/ScrollTrigger.min.js" defer></script>
  <script src="/js/nav.js" defer></script>
  <script src="/js/animations.js" defer></script>
</body>
</html>
```

### Nav.js Active State Extension (recommended addition)
```javascript
// Add to js/nav.js after the nav is injected into the DOM:
// Sets aria-current="page" on the nav link matching the current URL path.
// This activates the .site-nav__link[aria-current="page"] CSS style (bold, dark text).

function setActiveNavLink() {
  var currentPath = window.location.pathname;
  var links = document.querySelectorAll('.site-nav__link');
  links.forEach(function(link) {
    var href = link.getAttribute('href');
    // Exact match OR current path starts with link href (for section sub-pages)
    // Guard: skip the root '/' link to avoid it matching everything
    if (href !== '/' && currentPath.startsWith(href)) {
      link.setAttribute('aria-current', 'page');
    } else if (href === '/' && currentPath === '/') {
      link.setAttribute('aria-current', 'page');
    }
  });
}
// Call after nav HTML is injected
```

### CSS — Work Index Card Variant (add to components.css)
```css
/* ── Work Index List ──────────────────────────────── */

/* Work list: single column — no grid reflow needed for mobile.
   Denser and more archival feel than the home page featured card grid.
   Same hover DNA (lift, border-left snap, shadow via ::after opacity)
   but narrower, with explicit role/platform metadata visible. */

.work-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.work-card {
  display: flex;
  flex-direction: row;
  text-decoration: none;
  color: inherit;
  background-color: var(--color-bg-surface);
  border: none;
  border-left: 3px solid var(--color-accent-subtle);
  border-radius: var(--radius-base);
  overflow: hidden;
  position: relative;
  box-shadow: none;
  transform: translateY(0);
  transition:
    transform var(--duration-base) var(--ease-out),
    border-left-color var(--duration-base);
}

.work-card::after {
  /* Shadow via opacity — no repaint (same pattern as .project-card) */
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 16px 20px -8px rgba(42, 31, 20, 0.18);
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out);
  pointer-events: none;
}

.work-card:hover,
.work-card:focus-within {
  transform: translateY(-2px);            /* Subtler lift than home page cards */
  border-left-color: var(--color-accent);
}

.work-card:hover::after,
.work-card:focus-within::after {
  opacity: 1;
}

.work-card:hover .work-card__title,
.work-card:focus-within .work-card__title {
  color: var(--color-accent);
}

.work-card__thumb {
  width: 120px;                           /* Fixed-width thumbnail strip — not full-width */
  flex-shrink: 0;
  aspect-ratio: unset;                    /* Override thumb-grain's 16/9 — fill the card height */
  align-self: stretch;
}

.work-card__body {
  padding: var(--space-5) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.work-card__title {
  font-family: var(--font-display);
  font-size: var(--text-md);              /* Slightly smaller than home page cards */
  font-weight: var(--weight-semibold);
  color: var(--color-text);
  margin: 0;
  line-height: var(--leading-snug);
  transition: color var(--duration-base);
}

.work-card__meta {
  display: flex;
  gap: var(--space-3);
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
}

.work-card__role {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

/* Platform/status tag — visible on card face, distinct from plain text */
.work-card__tag {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-accent);
  background-color: var(--color-accent-subtle);
  padding: 2px var(--space-2);
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.work-card__descriptor {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin: 0;
  line-height: var(--leading-normal);
}

/* Mobile: stack thumbnail above body at narrow widths */
@media (max-width: 480px) {
  .work-card {
    flex-direction: column;
  }

  .work-card__thumb {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
}

@media (prefers-reduced-motion: reduce) {
  .work-card,
  .work-card::after {
    transition: opacity var(--duration-base), border-color var(--duration-base);
  }

  .work-card:hover,
  .work-card:focus-within {
    transform: none;
  }
}
```

---

## State of the Art

This phase uses no new external dependencies. All patterns are established static-site conventions.

| Old Approach | Current Approach | Why Changed | Impact |
|--------------|------------------|-------------|--------|
| Placeholder `<h1>Work</h1>` + filler `<p>` in work/index.html | Full card list, single-column, with real structure | Phase 3 builds on Phase 1's stub | Work index becomes functional |
| Home page cards linking to example slugs | Cards updated to `/work/project-1/` etc. | Phase 3 establishes real directory structure | Home page cards must be updated (see Pitfall 6) |

---

## Open Questions

1. **nav.js active state: extend now or per-page inline script?**
   - What we know: The CSS rule for `[aria-current="page"]` exists and is styled. nav.js does not set it dynamically.
   - What's unclear: Should `nav.js` be extended with the `startsWith(href)` pattern in Phase 3, or deferred to Phase 9 polish?
   - Recommendation: Extend nav.js in Phase 3. Phase 3 introduces two new top-level sections (`/work/` and sub-pages). If not done now, every new page phase (5, 6, 7) will also have broken active states. The fix is ~10 lines of JS. Planner should include this as a task.

2. **Work Index card layout: row (thumbnail left, text right) vs. full-width thumbnail top?**
   - What we know: User decision says "single column, denser feel." No layout direction specified beyond that.
   - What's unclear: Whether denser means a horizontal row card (thumbnail + text side-by-side) or a full-width thumbnail above text (same as home page cards, but taller and single-column).
   - Recommendation: Horizontal row layout (thumbnail left, text right) — this is the standard "list view" pattern for archival/dense content, and it distinguishes the work index from the home page grid cards. Code examples in this document reflect this choice. Planner can confirm or override.

3. **Home page placeholder card hrefs need updating**
   - What we know: `index.html` links to `/work/wellbeing-game/`, `/work/experience-design/`, `/work/narrative-systems/` — none of which exist.
   - What's unclear: Should Phase 3 update the home page hrefs to point at the real slugs, or leave them pointing at future URLs?
   - Recommendation: Phase 3 should update home page card hrefs to `/work/project-1/` (and comment out the other two or point them at stubs). The current hrefs are broken — they 404. This is in scope as a dependency fix.

---

## Sources

### Primary (HIGH confidence)
- Project codebase — `/css/tokens.css`, `/css/components.css`, `/css/layout.css`, `/css/base.css`, `/js/animations.js`, `/index.html`, `/work/index.html` — all read directly; all patterns documented here are derived from the live project files
- `.planning/phases/03-work-index-first-case-study/03-CONTEXT.md` — user decisions read and copied verbatim above

### Secondary (MEDIUM confidence)
- MDN Web Docs — `<article>` vs `<main>` semantic usage — standard HTML semantics, well-established, no verification search needed given HIGH training confidence on this topic
- WCAG 2.1 — `aria-current="page"` attribute for nav active state — standard accessible pattern, HIGH training confidence

### Tertiary (LOW confidence)
- None — this phase introduces no new external libraries or APIs requiring verification

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new external dependencies; all tools are project-internal and already proven
- Architecture: HIGH — HTML/CSS patterns derived directly from reading the existing codebase
- Pitfalls: HIGH — grounded in observed project decisions (Phase 2 notes in MEMORY.md, STATE.md) and the specific directory structure introduced by this phase

**Research date:** 2026-03-08
**Valid until:** Indefinite — static HTML/CSS patterns; no version-sensitive dependencies introduced in this phase

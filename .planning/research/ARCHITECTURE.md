# Architecture Research: Static HTML Portfolio Site

**Domain:** 10-page static HTML/CSS/JS portfolio, GitHub Pages hosting
**Researched:** 2026-02-24
**Confidence:** HIGH (static HTML conventions are stable and well-established; GSAP ScrollTrigger patterns are from official v3 docs)

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     GitHub Pages (CDN/Hosting)                  │
│  Serves static files from /docs or root of the repository       │
├─────────────────────────────────────────────────────────────────┤
│                        HTML Layer                               │
│                                                                 │
│  index.html   work/        writing/    earlier-work/  about/    │
│               index.html   index.html  index.html     index.html│
│               [slug]/                                           │
│               index.html                                        │
├─────────────────────────────────────────────────────────────────┤
│                        CSS Layer                                │
│                                                                 │
│  css/tokens.css    css/base.css    css/components.css           │
│  css/layout.css    css/animations.css                           │
├─────────────────────────────────────────────────────────────────┤
│                     JavaScript Layer                            │
│                                                                 │
│  js/nav.js (shared include)    js/animations.js (per-page)      │
│  CDN: GSAP 3 + ScrollTrigger                                    │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| HTML pages | Content and structure; each is a standalone document | Static `.html` files, no templating engine |
| Shared nav/footer | Consistent global navigation and contact fallback | JS-injected include OR manually copied HTML blocks |
| CSS tokens file | Design system: colors, type scale, spacing, animation values | CSS custom properties in `:root` block |
| Base CSS | Resets, body, typography, link defaults | Single file loaded on every page |
| Component CSS | Cards, nav, footer, project sections, code blocks | Grouped by component, all loaded globally |
| Animation CSS | 3D transform setup, keyframes, reduced-motion overrides | Separate file to keep non-animating pages clean |
| JS init (per-page) | GSAP timeline setup, ScrollTrigger registration | Inline `<script>` at bottom of each page, or loaded as a module |
| nav.js / include.js | Inject shared nav/footer HTML, set active nav state | One small vanilla JS file, runs on DOMContentLoaded |

---

## Recommended Project Structure

```
/ (repository root)
├── index.html                  # Home / Landing page
│
├── work/
│   ├── index.html              # Work index — MUST be created before any project pages
│   ├── [project-slug]/
│   │   └── index.html          # Individual project case study
│   └── [project-slug-2]/
│       └── index.html
│
├── writing/
│   └── index.html              # Writing section index
│
├── earlier-work/
│   └── index.html              # Retrospectives index (hidden from nav until Phase 6)
│
├── about/
│   └── index.html              # About + Contact section (#contact anchor)
│
├── assets/
│   ├── images/
│   │   ├── home/               # Hero and featured card images
│   │   ├── work/
│   │   │   └── [project-slug]/ # Per-project images
│   │   └── about/
│   ├── fonts/                  # Self-hosted fonts (if any)
│   ├── pdfs/
│   │   └── resume.pdf          # Resume download
│   └── writing/                # Writing sample PDFs
│
├── css/
│   ├── tokens.css              # CSS custom properties: colors, type scale, spacing, animation
│   ├── base.css                # CSS reset, body, typography defaults
│   ├── layout.css              # Grid/flex containers, page-level layout
│   ├── components.css          # Nav, footer, cards, project sections, buttons
│   └── animations.css          # 3D transform rules, keyframes, reduced-motion media query
│
├── js/
│   ├── nav.js                  # Inject shared nav/footer; set active nav state
│   └── animations.js           # GSAP ScrollTrigger init (split by page with guards)
│
├── _includes/                  # HTML fragments for nav/footer (loaded by nav.js)
│   ├── nav.html
│   └── footer.html
│
├── CNAME                       # Custom domain for GitHub Pages (already exists)
└── .gitignore
```

### Structure Rationale

- **Directory-per-page (index.html pattern):** `work/index.html` results in the URL `/work/` — no `.html` extension visible. This is standard for GitHub Pages and produces clean URLs that look professional and do not break when extensions are hidden.
- **work/[slug]/index.html:** Project pages live at `/work/project-name/` — clean, hierarchical, and survives slug changes without breaking the parent `/work/` index.
- **assets/ as a flat sibling of pages:** Keeps media files separate from HTML. Subfolder per section prevents asset collisions as the project grows.
- **css/ split into 5 files:** Each file has a single job (see CSS Architecture below). All five are linked in `<head>` on every page — no page-specific CSS files. This is simpler to maintain when the owner is not a developer.
- **js/ split into two files:** `nav.js` handles the shared include (runs everywhere), `animations.js` handles GSAP (runs on pages that need it). Separating these means disabling animation JS does not break navigation.
- **_includes/ for HTML fragments:** These are not processed by any templating engine — they are plain HTML fragments fetched by `nav.js` at runtime via `fetch()`. This is the cleanest no-build-tool shared-nav pattern.

---

## Architectural Patterns

### Pattern 1: JS Fetch Include for Shared Nav and Footer

**What:** A small vanilla JS file fetches `_includes/nav.html` and `_includes/footer.html` at runtime and injects them into placeholder `<div>` elements on each page. This gives one source of truth for the nav and footer without a static site generator.

**When to use:** Any time nav/footer needs to appear on every page and be maintainable from a single file, without npm, Jekyll, or Eleventy.

**Trade-offs:**
- Pro: Single source of truth. Edit `_includes/nav.html` once, all pages update.
- Pro: No build step, no dependencies, works on GitHub Pages as-is.
- Con: A brief flash-of-unstyled-nav (FOUN) is possible on slow connections — mitigated by placing the placeholder `<div>` with min-height in CSS.
- Con: If JavaScript is disabled, nav and footer do not appear. Mitigated per REQ-Anim05 (progressive enhancement): put a `<noscript>` fallback in each page OR accept that nav/footer are JS-dependent (appropriate for a portfolio where JS is assumed).

**Example:**

```html
<!-- In every page's <body>, before main content -->
<div id="site-nav" aria-label="Site navigation"></div>

<!-- At the bottom of every page's <body> -->
<div id="site-footer"></div>

<!-- Load nav.js just before </body> -->
<script src="/js/nav.js"></script>
```

```javascript
// js/nav.js
(function () {
  // Path is absolute so it works regardless of nesting depth
  const NAV_PATH = '/includes/nav.html';
  const FOOTER_PATH = '/includes/footer.html';

  function injectFragment(targetId, path) {
    const target = document.getElementById(targetId);
    if (!target) return;
    fetch(path)
      .then(function (res) { return res.text(); })
      .then(function (html) {
        target.innerHTML = html;
        // After injecting nav, mark the active page
        setActiveNavItem();
      })
      .catch(function () {
        // Silently fail — page still works without nav
      });
  }

  function setActiveNavItem() {
    // Use window.location.pathname to highlight current page in nav
    var path = window.location.pathname;
    var links = document.querySelectorAll('#site-nav a');
    links.forEach(function (link) {
      // Match the nav link href to the current path
      if (link.getAttribute('href') === path ||
          (path.startsWith(link.getAttribute('href')) && link.getAttribute('href') !== '/')) {
        link.classList.add('nav-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectFragment('site-nav', NAV_PATH);
    injectFragment('site-footer', FOOTER_PATH);
  });
})();
```

**Note on absolute paths:** Use `/js/nav.js`, `/includes/nav.html` (root-relative paths) consistently. Relative paths like `../../includes/nav.html` break when pages are nested at different depths.

---

### Pattern 2: CSS Custom Properties as the Single Source of Design Tokens

**What:** All design values — colors, type scale, spacing, animation timing — are defined once in `css/tokens.css` as CSS custom properties on `:root`. Every other CSS file uses `var(--token-name)` to reference them. JS animation values (GSAP durations, easing) read from computed style.

**When to use:** Always, on any project where the owner may need to adjust color, spacing, or animation timing without hunting through multiple CSS files.

**Trade-offs:**
- Pro: One-file design system. Change `--color-accent` in tokens.css, the change propagates everywhere.
- Pro: JS can read CSS values with `getComputedStyle(document.documentElement).getPropertyValue('--anim-duration')` — GSAP durations stay in sync with CSS transitions.
- Pro: Satisfies REQ-F03 and REQ-Anim06 directly.
- Con: CSS custom properties are not supported in IE11 — irrelevant in 2026.

**Example — tokens.css structure:**

```css
/* css/tokens.css */
:root {
  /* ─── Color ─── */
  --color-bg:         #F7F3EE;   /* warm paper white */
  --color-text:       #2A2118;   /* warm near-black */
  --color-accent:     #C4602A;   /* terracotta / origami fold color */
  --color-muted:      #7A6E65;   /* secondary text */
  --color-border:     #E0D8D0;

  /* ─── Typography ─── */
  --font-display:     'YourDisplayFont', Georgia, serif;
  --font-body:        'YourBodyFont', system-ui, sans-serif;
  --font-mono:        'YourMonoFont', monospace;

  --size-xs:    0.75rem;   /* 12px */
  --size-sm:    0.875rem;  /* 14px */
  --size-base:  1rem;      /* 16px */
  --size-lg:    1.25rem;   /* 20px */
  --size-xl:    1.5rem;    /* 24px */
  --size-2xl:   2rem;      /* 32px */
  --size-3xl:   2.75rem;   /* 44px */
  --size-4xl:   3.5rem;    /* 56px */

  /* ─── Spacing ─── */
  --space-1:    0.25rem;
  --space-2:    0.5rem;
  --space-3:    0.75rem;
  --space-4:    1rem;
  --space-6:    1.5rem;
  --space-8:    2rem;
  --space-12:   3rem;
  --space-16:   4rem;
  --space-24:   6rem;

  /* ─── Animation ─── */
  --anim-duration-fast:    0.2s;
  --anim-duration-base:    0.4s;
  --anim-duration-slow:    0.6s;
  --anim-duration-fold:    0.7s;
  --anim-ease-fold:        cubic-bezier(0.77, 0, 0.175, 1);
  --anim-perspective:      1200px;

  /* ─── Layout ─── */
  --width-content:    720px;
  --width-wide:       1100px;
  --radius-sm:        4px;
  --radius-base:      8px;
}
```

---

### Pattern 3: GSAP ScrollTrigger Initialization on Static Multi-Page Sites

**What:** On a static multi-page site (not an SPA), each page navigated to is a full browser load. `DOMContentLoaded` fires reliably on every page. There is no AJAX navigation to work around (unlike Squarespace). The initialization pattern is therefore simpler than the Squarespace version.

**When to use:** This is the standard GSAP init pattern for GitHub Pages static sites. Use it on every page that has scroll animations.

**Trade-offs:**
- Pro: Simple. `DOMContentLoaded` is reliable. No framework lifecycle to manage.
- Pro: Each page's GSAP context is isolated — no risk of ScrollTrigger instances from Page A polluting Page B.
- Con: GSAP must be loaded on every page via CDN (or you skip it on pages with no animations using a guard).

**Correct initialization pattern:**

```html
<!-- In <head> of every HTML file -->
<!-- Load GSAP before </head> so it is available immediately -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js" defer></script>

<!-- OR: load at bottom of <body> without defer -->
<!-- Both work. Bottom-of-body without defer is marginally simpler to reason about. -->
```

```html
<!-- At the bottom of <body>, AFTER GSAP script tags -->
<script>
  // Guard: only run if GSAP is loaded (handles JS-disabled or CDN failure)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

    // 1. Register the plugin — required before any ScrollTrigger usage
    gsap.registerPlugin(ScrollTrigger);

    // 2. Respect prefers-reduced-motion (REQ-Anim03)
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 3. Respect mobile viewport (REQ-Anim04)
    var isMobile = window.innerWidth < 768;

    if (!prefersReducedMotion && !isMobile) {
      // Full 3D fold animations
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.work-grid',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        rotationX: -45,
        transformPerspective: 'var(--anim-perspective)',  // reads CSS var
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out'
      });
    } else {
      // Reduced motion / mobile: simple fade only
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.work-grid',
          start: 'top 75%',
        },
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power1.out'
      });
    }

  }
  // If GSAP is not available, cards display at full opacity via CSS default
</script>
```

**Key facts about GSAP ScrollTrigger on static sites (HIGH confidence — GSAP v3 docs):**
- `gsap.registerPlugin(ScrollTrigger)` must be called exactly once per page before any `ScrollTrigger` usage. On a static multi-page site, "once per page" means once per full page load — this is automatic.
- `ScrollTrigger.refresh()` is needed when page layout shifts after initial render (lazy-loaded images, dynamically injected content). For a static portfolio with no lazy loading, it is not required at init.
- ScrollTrigger `trigger` elements must exist in the DOM when `scrollTrigger` is created. Since the script runs at bottom of body (after DOM is parsed), all page elements are present.
- Do NOT wrap GSAP init in `DOMContentLoaded` when the script is at the bottom of `<body>` — the DOM is already loaded. Use `DOMContentLoaded` only if the script is in `<head>`.

---

### Pattern 4: CSS Architecture for a No-Build Static Site

**What:** CSS is split into 5 purpose-specific files, all loaded on every page. No build step, no preprocessor, no scoped CSS. Class naming follows a lightweight BEM convention (but not strict BEM) — semantic and readable over systematic.

**When to use:** Right-sized for a 10-page site maintained by an owner with limited coding experience. Full BEM is overkill; utility-class frameworks (Tailwind) require a build step and are hard to debug without tooling.

**Trade-offs:**
- Pro: No tooling required. Works directly on GitHub Pages.
- Pro: Each file has a single responsibility — easy to know where to look for any given style.
- Pro: All 5 files are small enough that the total CSS payload is not a concern (estimate: <30KB unminified for a site this size).
- Con: No tree-shaking. Every page loads the full CSS. Acceptable at this scale.
- Con: Global CSS means class name collisions are possible. Naming discipline prevents this.

**The 5-file CSS structure:**

| File | Contains | Loaded on |
|------|----------|-----------|
| `tokens.css` | `:root` custom properties only | Every page (first) |
| `base.css` | CSS reset, `body`, `html`, `a`, `p`, `h1-h6` defaults | Every page |
| `layout.css` | `.page-wrapper`, `.content-container`, `.section`, grid/flex skeletons | Every page |
| `components.css` | `.nav`, `.footer`, `.card`, `.project-hero`, `.writing-entry`, `.btn`, etc. | Every page |
| `animations.css` | `.fold-panel`, `@keyframes`, `transform-style`, `prefers-reduced-motion` overrides | Every page |

**Naming convention — lightweight BEM:**

```css
/* Block */
.project-card { }

/* Element (double-underscore) */
.project-card__title { }
.project-card__image { }
.project-card__role { }

/* Modifier (double-dash) */
.project-card--featured { }
.project-card--placeholder { }

/* State (is- prefix, not BEM) — applied by JS */
.is-visible { }
.is-folded { }
.nav-active { }   /* applied by nav.js to current page link */
```

**Do not use:** Utility classes (Tailwind-style inline HTML classes). Without a build tool, purging unused utilities is not possible, and the HTML becomes hard to read for an owner who is learning as they go.

---

### Pattern 5: Base HTML Template (Copy-Paste, Not Generated)

**What:** Since there is no static site generator, each HTML page is a complete standalone document. A base template is established and manually copied when creating new pages. All shared chrome (nav placeholder, footer placeholder, CSS links, GSAP script tags) is defined once in this template and copied verbatim.

**When to use:** With fewer than 15 pages, manual copying is manageable. If repetition becomes a significant maintenance burden after v1, migrate to Eleventy (no-config static site generator that adds minimal complexity).

**Trade-offs:**
- Pro: Zero tooling. No CLI, no Node, no config. Works immediately.
- Pro: Owner can open any HTML file and read/edit it directly.
- Con: Adding a new CSS file to every page requires editing every HTML file. Keep the number of CSS and JS files small and stable.
- Con: If shared nav HTML changes structurally (not content — `_includes/nav.html` handles content), all pages need updating. This is rare.

**Base template — every page uses this structure:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PAGE TITLE — Origami Games</title>
  <meta name="description" content="PAGE DESCRIPTION">

  <!-- Design tokens must load first -->
  <link rel="stylesheet" href="/css/tokens.css">
  <link rel="stylesheet" href="/css/base.css">
  <link rel="stylesheet" href="/css/layout.css">
  <link rel="stylesheet" href="/css/components.css">
  <link rel="stylesheet" href="/css/animations.css">

  <!-- GSAP via CDN — defer so it doesn't block render -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js" defer></script>
</head>
<body>

  <!-- Shared nav placeholder — populated by nav.js -->
  <div id="site-nav" aria-label="Main site navigation"></div>

  <!-- Page-specific content goes here -->
  <main id="main-content">
    <!-- PAGE CONTENT -->
  </main>

  <!-- Shared footer placeholder — populated by nav.js -->
  <div id="site-footer"></div>

  <!-- Shared JS: inject nav/footer, set active state -->
  <script src="/js/nav.js"></script>

  <!-- Page-specific animation init — inline or external -->
  <!--
  <script>
    // Page-specific GSAP code here (see Pattern 3)
  </script>
  -->

</body>
</html>
```

**Note on `defer` and script order:** GSAP scripts use `defer` (load in parallel, execute after HTML is parsed). The inline animation `<script>` at the bottom of body has no `defer` — it runs inline after the DOM is available. Since defer scripts execute before the `DOMContentLoaded` event and the inline script runs after them in document order, GSAP will be available when the inline animation script runs. This order is reliable.

---

## Data Flow

### Page Load Flow (Static Site)

```
Browser requests URL
    |
    v
GitHub Pages serves matching index.html
    |
    v
Browser parses HTML
    |-- Loads CSS files in parallel (tokens -> base -> layout -> components -> animations)
    |-- Loads GSAP CDN scripts (deferred, parse-non-blocking)
    |
    v
DOM parsed — DOMContentLoaded fires
    |
    v
nav.js DOMContentLoaded callback fires
    |-- fetch('/includes/nav.html') -> inject into #site-nav
    |-- fetch('/includes/footer.html') -> inject into #site-footer
    |-- setActiveNavItem() marks current page in nav
    |
    v
Deferred GSAP scripts finish loading
    |
    v
Inline animation <script> at bottom of <body> executes
    |-- gsap.registerPlugin(ScrollTrigger)
    |-- Checks prefers-reduced-motion, viewport width
    |-- Creates ScrollTrigger instances for visible elements
    |
    v
User scrolls — ScrollTrigger fires animations
```

### Navigation Flow (Multi-Page, No SPA)

```
User clicks nav link
    |
    v
Full browser navigation (not AJAX, not SPA)
    |
    v
New HTML page loads fresh
    |
    v
All of the above runs from the top
```

**Key implication:** There is no shared JS state between pages. GSAP ScrollTrigger instances created on Page A are garbage-collected when the user navigates to Page B. Each page is completely independent. This is simpler than SPA architectures and requires no special teardown code.

---

## Scaling Considerations

This is a 10-page portfolio. Scale is not a concern in the traditional sense. The relevant evolution path is:

| Trigger | Adjustment |
|---------|------------|
| More than 15 pages (v2 expansion) | Migrate to Eleventy — one-time effort, no templating language to learn beyond HTML |
| Nav/footer changes feel painful to maintain | Already handled by JS includes — no action needed unless structure changes |
| CSS files become hard to navigate | Consider splitting components.css into sub-files (cards.css, nav.css, etc.) |
| Images slow page load | Compress to WebP at 80% quality; add `loading="lazy"` to below-fold images |
| Animations feel heavy on mobile | Already guarded by viewport check; tune thresholds in tokens.css |

---

## Anti-Patterns

### Anti-Pattern 1: Relative Paths for Shared Assets

**What people do:** Link CSS, JS, and includes using paths relative to the current file, e.g., `href="../../css/tokens.css"`.

**Why it's wrong:** Pages at different nesting depths (root `index.html` vs `work/project-slug/index.html`) need different relative paths for the same file. When a new page is created at a new depth, paths break silently.

**Do this instead:** Use root-relative (absolute from domain root) paths everywhere: `/css/tokens.css`, `/js/nav.js`, `/includes/nav.html`. These work identically regardless of page nesting depth. GitHub Pages serves from the repo root, so `/css/tokens.css` resolves correctly on any page.

---

### Anti-Pattern 2: Inline Styles for Design Values

**What people do:** Write `style="color: #C4602A; margin-top: 2rem;"` directly in HTML to make something look right quickly.

**Why it's wrong:** Inline styles override everything. They are invisible to the CSS cascade and cannot be changed from tokens.css. When the accent color changes, every inline style must be found and updated manually.

**Do this instead:** Add a class or modify the relevant CSS rule. If a value needs to exist in JS, add it to tokens.css and read it with `getComputedStyle`.

---

### Anti-Pattern 3: GSAP `defer` with DOMContentLoaded Guard in Inline Script

**What people do:** Load GSAP with `defer`, then wrap the inline animation script in `document.addEventListener('DOMContentLoaded', ...)`.

**Why it's wrong:** When GSAP scripts use `defer`, they execute after HTML parsing but before `DOMContentLoaded`. An inline script at the bottom of `<body>` runs synchronously after all preceding deferred scripts have executed (deferred scripts execute in document order before `DOMContentLoaded`). Wrapping the inline script in a `DOMContentLoaded` listener creates a race: if the event has already fired before the listener is attached, the callback never runs.

**Do this instead:** Place the inline animation script at the very bottom of `<body>`, after the GSAP `<script>` tags. Do not wrap it in `DOMContentLoaded`. The DOM is fully available at that point and GSAP is loaded.

---

### Anti-Pattern 4: One Giant CSS File

**What people do:** Put all CSS in a single `styles.css` because it is simpler to manage initially.

**Why it's wrong:** Without organization, the file grows past 500 lines and becomes difficult to navigate. Finding the `.nav` styles requires searching. Design tokens are mixed with component rules. The owner cannot confidently make changes.

**Do this instead:** Use the 5-file structure from Pattern 4. Files stay small and purposeful. `tokens.css` is where the owner should look first for any visual adjustment.

---

### Anti-Pattern 5: Creating Project Pages Before the /work/ Index

**What people do:** Build individual project pages first because the content is ready, then create the Work index later.

**Why it's wrong:** If the Work index page is created at a different slug (e.g., `/projects/` instead of `/work/`) after project sub-pages already exist, internal links are broken and must all be updated manually. This is REQ-F07 for a reason.

**Do this instead:** Create `work/index.html` as the first act of Phase 3, before any `work/[slug]/index.html` pages. Lock in the URL structure.

---

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| GitHub Pages | Push to main branch → auto-deploy | No build step needed for raw HTML. Confirm Pages is set to serve from root or `/docs` in repo settings. |
| GSAP CDN (jsDelivr) | `<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/...">` | Version-pinned to major version `@3` — gets latest 3.x patches automatically. Pin to minor (e.g., `@3.12`) if stability is a priority. |
| Custom domain | CNAME file in repo root (already exists) + DNS A/CNAME records pointing to GitHub Pages IPs | HTTPS is automatic once DNS propagates. |
| Resume PDF | Static file in `assets/pdfs/resume.pdf` | Direct link `<a href="/assets/pdfs/resume.pdf" download>`. No server needed. |
| External links | `<a href="..." target="_blank" rel="noopener noreferrer">` | `rel="noopener noreferrer"` prevents tab-napping and is required for all external links. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| HTML ↔ CSS | `class` attributes, CSS selectors | No specificity hacks. Semantic class names only. |
| HTML ↔ JS | DOM selectors (`getElementById`, `querySelector`) | JS reads the DOM; never writes inline styles; uses `classList` for state changes. |
| CSS ↔ JS | CSS custom properties read via `getComputedStyle` | GSAP animation durations should read from `--anim-duration-*` tokens, not be hardcoded. |
| nav.js ↔ _includes/ | `fetch()` at runtime | Paths must be root-relative. The `_includes/` directory name with underscore is a convention; rename to `includes/` if the underscore prefix causes confusion. |
| Page A ↔ Page B | `<a href="...">` hyperlinks only | No shared JS state. No localStorage in v1. No cross-page communication needed. |

---

## Build Order for Phase 1 (Foundation Scaffold)

Phase 1 should produce a working scaffold — no content, but all structural wiring correct — so every subsequent phase can add content without revisiting structural decisions.

**Phase 1 deliverables:**
1. Repo root has `index.html` using the base template pattern
2. `work/index.html` exists (empty placeholder content, but the URL `/work/` is live)
3. `about/index.html` exists (placeholder)
4. `writing/index.html` exists (placeholder, not in nav yet)
5. `earlier-work/index.html` exists (placeholder, not in nav yet)
6. All 5 CSS files exist with tokens defined and base styles applied
7. `_includes/nav.html` and `_includes/footer.html` exist with correct nav structure
8. `nav.js` working: nav injects and active state applies correctly on each page
9. GSAP loads via CDN and `gsap` is defined on the browser console on every page
10. Custom domain serving over HTTPS (CNAME already exists per git history)

**Validation test for Phase 1:** Open every page in a browser, confirm nav appears, confirm active state is correct, open browser console and type `gsap` — it should return the GSAP object.

---

## Sources

- GSAP v3 official documentation: gsap.com/docs/v3/Plugins/ScrollTrigger/ — `registerPlugin`, `ScrollTrigger` initialization, `defer` loading pattern (HIGH confidence)
- MDN: Fetch API, `DOMContentLoaded` event timing, CSS custom properties, `defer` attribute behavior (HIGH confidence — stable web platform features)
- GitHub Pages documentation: Custom domain configuration, CNAME file, static file serving from root (HIGH confidence)
- HTML `<script defer>` execution order relative to DOMContentLoaded: well-specified in the HTML Living Standard (HIGH confidence)
- CSS multi-file architecture for static sites: community convention verified across multiple sources; BEM naming from getbem.com (MEDIUM confidence — convention, not specification)
- JS fetch-based HTML includes pattern: widely used; confirmed working on GitHub Pages (MEDIUM confidence — tested pattern, no official specification)

---

*Architecture research for: Static HTML/CSS/JS portfolio — GitHub Pages*
*Researched: 2026-02-24*
*Note: This file supersedes the earlier ARCHITECTURE.md which was written for Squarespace. Platform changed to GitHub Pages + raw HTML/CSS/JS on 2026-02-24.*

# Phase 1: Foundation Scaffold - Research

**Researched:** 2026-02-24
**Domain:** GitHub Pages static HTML, CSS custom properties, GSAP CDN, fetch-inject nav, DNS/HTTPS, typography
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Platform (CRITICAL CHANGE — Roadmap update required)**
- Platform changed from Squarespace Business to GitHub Pages (free static hosting)
- User has domain registration (formerly Google Domains, now via Squarespace DNS) but no Squarespace hosting plan
- Host on GitHub Pages; switch to Netlify if GitHub Pages causes issues (Netlify connects to same GitHub repo)
- Stack: Raw HTML/CSS/JS files — no static site generator for now
- Edit locally → commit → push to GitHub → GitHub Pages auto-deploys
- ROADMAP.md was written for Squarespace 7.1 Business. All Squarespace-specific tasks are no longer relevant.

**Design tokens / Aesthetic direction**
- Color direction: warm neutrals as base (paper-like, off-whites/warm grays) + indie internet personality
- "Indie internet" = tumblr/pixel art culture, personal blogs with fun animations, handmade feel — NOT corporate, NOT agency-polished, NOT Cargo-style templates
- Reference feel: game UI with keyboard navigation hints overlaid (control hints on screen, playful, clean) — cozy/relaxed
- Naming convention: semantic (`--color-text`, `--color-bg-surface`, `--color-accent`) — named by role, not value
- Typography: Claude's discretion — propose a pairing that fits warm/cozy/indie feel; user will review after first draft

**Git workflow**
- GitHub Pages: `main` branch = live site
- Local structure: `/css/`, `/js/`, `/pages/` (or equivalent static structure)
- Plain files — no build tools, no npm, no bundler in Phase 1

**Nav structure**
- Final nav: Home | Work | Writing | About | Contact
- "Contact" is an anchor link (`/about#contact`) — not a separate page
- "Earlier Work" section: code stubbed as a hidden page, NOT in nav — added in Phase 6
- Placeholder pages in Phase 1: minimal real structure — correct HTML skeleton (header, main, footer, CSS class hooks) with placeholder text, not empty files
- Footer on every page: email/contact link (ever-present contact fallback)

**Phase 1 scope (what "done" means)**
- GitHub Pages repo configured and serving the domain
- All 5 nav destinations exist as HTML files with correct skeleton structure
- CSS custom properties file in place with color tokens, spacing, type scale (even if values are provisional)
- GSAP 3 + ScrollTrigger loaded via CDN in the base HTML template
- Footer present on all pages (even if minimal — email link as placeholder)
- Earlier Work page stubbed but hidden

### Claude's Discretion
- Exact typography pairing (propose and show before committing)
- GSAP version pinning strategy (latest stable vs. locked version)
- Specific CSS folder/file organization within the repo
- Whether to use a base HTML template file or repetition across pages for Phase 1

### Deferred Ideas (OUT OF SCOPE)
- Template selection (Paloma vs. Hester) — no longer relevant; platform changed to GitHub Pages
- Squarespace AJAX re-init pattern — no longer relevant; no Squarespace AJAX navigation
- Static site generator (Eleventy/Jekyll) — deferred; start with raw HTML and add if repetition becomes a problem
- Netlify deployment — start with GitHub Pages; switch if needed
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| REQ-F01 | GitHub Pages repository configured and serving the site at the custom domain | DNS setup sequence, A/AAAA records, CNAME file, Pages settings — all documented in Architecture Patterns section |
| REQ-F02 | Base HTML template created with shared `<head>`, `<nav>`, and `<footer>` structure — all pages inherit from this | HTML skeleton pattern + fetch-inject pattern documented with full code examples |
| REQ-F03 | CSS custom properties defined globally: primary/accent colors, typography scale, spacing units, animation timing values | Full token set with values documented in CSS Token Values section |
| REQ-F04 | GSAP 3 core + ScrollTrigger plugin loaded via CDN (jsDelivr) in the `<head>` of the base template | Exact script tags documented with confirmed version 3.14.2, load order rationale, defer guidance |
| REQ-F05 | All source files (HTML, CSS, JS) maintained in a Git repository — GitHub repo IS the deployment source | Repo structure documented; git config core.ignorecase = false requirement noted |
| REQ-F06 | Primary nav structure: Home \| Work \| Writing \| About \| Contact — "Contact" is an anchor link to `/about#contact`; Earlier Work page exists but is hidden from nav | Nav HTML pattern and fetch-inject implementation documented |
| REQ-F07 | Work index at `/work` (or `/work/index.html`) established before any project sub-pages are created | Directory-per-page URL structure documented; sequencing constraint called out explicitly |
| REQ-F08 | Site title set to "Origami Games" or designer's name — visible in browser tab on every page | `<title>` tag pattern in HTML skeleton; page-specific title convention documented |
| REQ-F09 | Custom domain connected and HTTPS confirmed active via GitHub Pages custom domain settings | DNS records (A + AAAA + CNAME for www), setup sequence, HTTPS provisioning timeline all documented |
| REQ-N01 | All nav labels are self-evident on first read — no jargon, no cryptic labels requiring explanation | Nav labels confirmed: Home, Work, Writing, About — all plain language; Contact = anchor link, not a label |
| REQ-N03 | Footer includes: nav echo, contact email link, LinkedIn link, resume PDF download link | Footer HTML pattern documented with all required elements; fetch-inject approach for single-source footer |
</phase_requirements>

---

## Summary

Phase 1 establishes every structural decision that is expensive to change later: URL shape, CSS token naming, nav architecture, GSAP loading order, and file naming convention. The project research summary already documents these patterns at HIGH confidence. This phase-level research adds three things the project-level research left as gaps: (1) the confirmed current GSAP version (3.14.2, not 3.12.5), (2) verified GitHub Pages A and AAAA record IP addresses with the correct setup sequence, and (3) specific typography recommendations and CSS token values that can go directly into code.

The fetch-inject pattern (`nav.js` fetches `_includes/nav.html` and injects it at runtime) is the key architectural choice in Phase 1. It means the nav and footer have a single source of truth across all pages. The tradeoff is that it requires a local HTTP server during development — `fetch()` silently fails on `file://` URLs. VS Code Live Server resolves this with one click. This constraint is known and acceptable.

Typography recommendation: **Lora (display/headings) + DM Sans (body/UI)**. Lora is a classical serif with literary warmth that reads as "someone who takes words seriously" — appropriate for a narrative designer. DM Sans is a geometric humanist sans that reads as modern and legible without corporate coldness. The pairing avoids the Cargo-template look (which tends toward Neue Haas Grotesk or Freight Display) while staying warm and readable. Both confirmed available on Google Fonts with required weights. Crimson Pro + DM Sans is the backup if Lora feels too editorial.

**Primary recommendation:** Build the repo structure and HTML skeleton first, then CSS tokens, then fetch-inject nav, then GSAP — in that exact order, because each layer depends on the one before it.

---

## Standard Stack

### Core

| Library / Tool | Version | Purpose | Why Standard |
|----------------|---------|---------|--------------|
| HTML5 | — | Page documents | Platform native; no build step |
| CSS3 + custom properties | — | Styling + design tokens | Browser-native; GSAP can read values via `getComputedStyle` |
| Vanilla JS (ES2020+) | — | Fetch-inject nav, GSAP init | No dependencies; `DOMContentLoaded` fires reliably on every full page load |
| GSAP 3 | **3.14.2** | Animation engine | Best-in-class CSS 3D support; free tier; CDN-loadable |
| ScrollTrigger (GSAP plugin) | **3.14.2** | Scroll-driven animation | Bundled at same version as GSAP core |
| GitHub Pages | — | Hosting + deployment | Free; Git-native; auto-deploys on push to `main` |
| Google Fonts | — | Lora + DM Sans | Free CDN; `font-display: swap`; no self-hosting needed for Phase 1 |

### Supporting

| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| VS Code Live Server | latest | Local development HTTP server | Required — `fetch()` fails on `file://`; use for all local testing |
| Git `core.ignorecase = false` | — | Case-sensitivity guard | Set once in repo config; prevents Windows-to-Linux deploy mismatches |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Fetch-inject nav | Server-side includes (SSI) | SSI requires server config; GitHub Pages serves static only |
| Fetch-inject nav | Copy-paste nav into each file | Creates nav drift across 10 pages; every nav change = 10 edits |
| Google Fonts CDN | Self-hosted fonts | Self-hosting requires font files in repo; adds complexity; not needed for Phase 1 |
| Locked version `@3.14.2` | Floating `@3` tag | `@3` auto-updates to latest 3.x; fine for active development; lock version before Phase 8 |

**Installation:** No npm. CDN only. Script tags in `<head>`.

---

## Architecture Patterns

### Recommended Project Structure

```
/                           ← repo root, GitHub Pages serves from here
├── index.html              ← Home page
├── CNAME                   ← Custom domain (already exists — DO NOT MODIFY)
├── .nojekyll               ← Disables Jekyll processing (create this in Wave 1)
├── 404.html                ← Branded 404 page
├── work/
│   └── index.html          ← Work index (REQ-F07: must exist before sub-pages)
├── writing/
│   └── index.html          ← Writing index placeholder
├── about/
│   └── index.html          ← About + contact anchor placeholder
├── earlier-work/
│   └── index.html          ← Stubbed, hidden from nav (Phase 6)
├── css/
│   ├── tokens.css          ← CSS custom properties (single source of truth)
│   ├── base.css            ← Reset + body defaults
│   ├── layout.css          ← Page layout, grid, containers
│   ├── components.css      ← Nav, footer, cards, buttons
│   └── animations.css      ← Animation-specific CSS (empty in Phase 1)
├── js/
│   ├── nav.js              ← Fetch-inject for _includes/nav.html + footer.html
│   └── animations.js       ← GSAP init (stub in Phase 1, used in Phase 8)
├── _includes/
│   ├── nav.html            ← Single-source nav markup
│   └── footer.html         ← Single-source footer markup
└── assets/
    ├── images/             ← Images organized by section: images/work/[slug]/
    └── pdfs/               ← Resume and writing PDFs
```

**URL shape:** Directory-per-page produces clean URLs: `/work/` not `/work.html`. This is the standard for GitHub Pages static sites.

**Naming convention (enforce from day one):** All files and directories lowercase with hyphens. No spaces, no camelCase, no uppercase. GitHub Pages runs Linux (case-sensitive); Windows is case-insensitive. `Hero.jpg` works locally; 404s on live site.

### Pattern 1: Base HTML Skeleton

Every page copies this template verbatim and changes only: `<title>`, `<meta description>`, page-specific `<body>` class, and `<main>` content.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Name — Origami Games</title>
  <meta name="description" content="Page-specific description here.">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet">

  <!-- Styles: load in dependency order -->
  <link rel="stylesheet" href="/css/tokens.css">
  <link rel="stylesheet" href="/css/base.css">
  <link rel="stylesheet" href="/css/layout.css">
  <link rel="stylesheet" href="/css/components.css">
  <link rel="stylesheet" href="/css/animations.css">
</head>
<body class="page-home">  <!-- change class per page: page-work, page-about, etc. -->

  <!-- Nav injected here by nav.js -->
  <div id="site-nav"></div>

  <main id="main-content">
    <!-- Page content here -->
    <p>Placeholder — [Page Name]</p>
  </main>

  <!-- Footer injected here by nav.js -->
  <div id="site-footer"></div>

  <!-- GSAP — load before animations.js, no async (breaks execution order) -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/ScrollTrigger.min.js" defer></script>

  <!-- Site JS -->
  <script src="/js/nav.js" defer></script>
  <script src="/js/animations.js" defer></script>
</body>
</html>
```

**Note on `defer` for GSAP:** All scripts use `defer`, which preserves execution order (scripts execute in DOM order after HTML is parsed). This is the correct approach for script bundles where order matters. `async` would be wrong — it executes scripts as soon as they download, breaking the GSAP → ScrollTrigger → animations.js dependency chain.

### Pattern 2: Fetch-Inject Nav (nav.js)

**What:** `nav.js` fetches `_includes/nav.html` and `_includes/footer.html` at runtime and injects them into `#site-nav` and `#site-footer` respectively.

**Why:** Single source of truth. 10 pages, 1 nav file. Change the nav once; all pages update on next load.

**Critical constraint:** `fetch()` only works over HTTP/HTTPS. Running `index.html` directly from the filesystem (double-clicking) will fail silently. Use VS Code Live Server for all local development.

```javascript
// js/nav.js
// Injects shared nav and footer from _includes/
// REQUIRES: local HTTP server (VS Code Live Server) — fetch() fails on file://

(function () {
  'use strict';

  function injectInclude(targetId, includePath) {
    var el = document.getElementById(targetId);
    if (!el) return;

    fetch(includePath)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to load: ' + includePath + ' (' + response.status + ')');
        }
        return response.text();
      })
      .then(function (html) {
        el.innerHTML = html;
        // Dispatch event so other scripts can react to nav being ready
        document.dispatchEvent(new CustomEvent('navReady'));
      })
      .catch(function (err) {
        console.warn('[nav.js] Include failed:', err.message);
        // Fail gracefully — page still usable without injected nav
      });
  }

  injectInclude('site-nav', '/_includes/nav.html');
  injectInclude('site-footer', '/_includes/footer.html');
})();
```

**Important:** Use root-relative paths (`/_includes/nav.html`) not relative paths (`../../_includes/nav.html`). Relative paths break at different directory depths. Root-relative paths work from every page.

### Pattern 3: _includes/nav.html

```html
<!-- _includes/nav.html -->
<!-- Single source of truth for site navigation -->
<!-- Injected into every page by nav.js -->
<nav class="site-nav" aria-label="Main navigation">
  <a href="/" class="site-nav__logo">Origami Games</a>
  <ul class="site-nav__list" role="list">
    <li><a href="/" class="site-nav__link">Home</a></li>
    <li><a href="/work/" class="site-nav__link">Work</a></li>
    <li><a href="/writing/" class="site-nav__link">Writing</a></li>
    <li><a href="/about/" class="site-nav__link">About</a></li>
    <li><a href="/about#contact" class="site-nav__link">Contact</a></li>
  </ul>
</nav>
```

**Active state:** Because nav is injected dynamically, active state must be set by JS comparing `window.location.pathname` against each link's `href`. Add this inside `nav.js` after `injectInclude` fires `navReady`.

### Pattern 4: _includes/footer.html

```html
<!-- _includes/footer.html -->
<!-- Injected into every page by nav.js -->
<!-- REQ-N03: nav echo, contact email, LinkedIn, resume PDF -->
<footer class="site-footer">
  <nav class="site-footer__nav" aria-label="Footer navigation">
    <a href="/">Home</a>
    <a href="/work/">Work</a>
    <a href="/writing/">Writing</a>
    <a href="/about/">About</a>
    <a href="/about#contact">Contact</a>
  </nav>
  <div class="site-footer__contact">
    <a href="mailto:PLACEHOLDER@email.com">PLACEHOLDER@email.com</a>
    <a href="https://linkedin.com/in/PLACEHOLDER" rel="noopener noreferrer" target="_blank">LinkedIn</a>
    <a href="/assets/pdfs/resume.pdf" download>Resume PDF</a>
  </div>
  <p class="site-footer__credit">Origami Games &copy; 2026</p>
</footer>
```

### Pattern 5: GSAP Init Stub (animations.js)

Phase 1 only needs the stub in place. Phase 8 adds the actual animation code.

```javascript
// js/animations.js
// GSAP animation initialization
// Phase 1: stub only — registers ScrollTrigger, no animations yet
// Phase 8: origami fold transitions added here

(function () {
  'use strict';

  // Guard: bail if GSAP didn't load (CDN outage, JS disabled)
  if (typeof gsap === 'undefined') {
    console.warn('[animations.js] GSAP not loaded — animations disabled');
    return;
  }

  // Register ScrollTrigger plugin (required before any ScrollTrigger usage)
  gsap.registerPlugin(ScrollTrigger);

  // Phase 8: animation code goes here
  // All animation values read from CSS custom properties via getComputedStyle
  // to keep CSS and JS in sync.

})();
```

### Anti-Patterns to Avoid

- **Relative paths in includes:** `../../_includes/nav.html` breaks at different directory depths. Always use root-relative `/`.
- **async on GSAP script tags:** `async` executes scripts as soon as they download, in any order. ScrollTrigger can execute before gsap.min.js is ready. Use `defer` only.
- **Hardcoding nav in each HTML file:** 10 files × 1 nav change = 10 edits + 1 missed file = broken nav on that page. Use fetch-inject from day one.
- **Opening files directly in browser:** `file://` breaks `fetch()`. Always use Live Server.
- **Uppercase or mixed-case filenames:** Windows doesn't catch the mismatch; GitHub Pages Linux does. `Work.html` and `work.html` are different files on the live site.
- **Touching the CNAME file:** It's already in the repo. Any modification breaks the custom domain and resets HTTPS provisioning. Treat it as infrastructure.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Shared nav across pages | Copy-paste + manual sync | Fetch-inject (`nav.js` + `_includes/`) | Copy-paste produces drift; one missed edit breaks consistency |
| Scroll-driven animations | Custom scroll event listeners | GSAP ScrollTrigger | ScrollTrigger handles resize, pin, scrub, mobile edge cases; scroll listeners are brittle |
| Animation values in JS | JS constants | CSS custom properties read via `getComputedStyle` | Keeps CSS and JS in sync; owner can tune values in one place |
| DNS propagation check | Manual refresh | `dig` command or online dig tool | DNS TTL means browser cache lies; `dig` shows actual resolver state |

**Key insight:** The value in this phase comes from getting the conventions right, not from building features. The fetch-inject pattern and lowercase naming convention prevent entire categories of maintenance debt for all 10 phases.

---

## CSS Token Values

### Recommended: tokens.css

These values implement the "warm paper + indie internet" aesthetic. They pass WCAG AA contrast minimums (verified manually against 4.5:1 for body text, 3:1 for large text).

```css
/* css/tokens.css */
/* Origami Games — Design Token System */
/* All design values defined here. Pages import this first. */
/* GSAP reads animation durations via getComputedStyle — keep in sync. */

:root {

  /* ── Colors ─────────────────────────────────────────── */

  /* Base: warm paper tones */
  --color-bg:           #fdf8f0;  /* warm off-white, like unbleached paper */
  --color-bg-surface:   #f5ede0;  /* slightly warmer, for card/panel backgrounds */
  --color-bg-inset:     #ede1d0;  /* deepest warm tone, for code blocks or inset panels */

  /* Text */
  --color-text:         #2a1f14;  /* dark warm brown, NOT pure black — approx 14:1 contrast on --color-bg */
  --color-text-muted:   #7a6552;  /* secondary text, captions — approx 4.6:1 on --color-bg */

  /* Accent: muted terracotta */
  --color-accent:       #c4614a;  /* terracotta — links, highlights, hover states */
  --color-accent-hover: #a84d39;  /* darkened accent for hover/focus states */
  --color-accent-subtle:#f0d9d3;  /* very light accent tint for backgrounds */

  /* Borders */
  --color-border:       #d9cdc0;  /* warm light gray — subtle dividers */
  --color-border-strong:#b8a898;  /* stronger border for cards */

  /* ── Typography ─────────────────────────────────────── */

  /* Font families */
  --font-display:  'Lora', Georgia, 'Times New Roman', serif;
  --font-body:     'DM Sans', system-ui, -apple-system, sans-serif;
  --font-mono:     'Courier New', Courier, monospace;  /* for code snippets */

  /* Type scale (major third: 1.25 ratio) */
  --text-xs:   0.64rem;   /* 10.24px — labels, captions */
  --text-sm:   0.8rem;    /* 12.8px  — secondary text */
  --text-base: 1rem;      /* 16px    — body text */
  --text-md:   1.25rem;   /* 20px    — lead paragraph, large body */
  --text-lg:   1.563rem;  /* 25px    — h3, card titles */
  --text-xl:   1.953rem;  /* 31px    — h2, section headings */
  --text-2xl:  2.441rem;  /* 39px    — h1, page titles */
  --text-3xl:  3.052rem;  /* 49px    — hero display text */

  /* Line heights */
  --leading-tight:  1.2;   /* headings */
  --leading-snug:   1.4;   /* subheadings */
  --leading-normal: 1.65;  /* body text */
  --leading-loose:  1.85;  /* long-form reading */

  /* Font weights */
  --weight-normal:   400;
  --weight-medium:   500;
  --weight-semibold: 600;

  /* ── Spacing (8px base grid) ────────────────────────── */

  --space-1:  0.25rem;   /*  4px */
  --space-2:  0.5rem;    /*  8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */

  /* ── Layout ─────────────────────────────────────────── */

  --max-width-content: 72rem;   /* 1152px — page container */
  --max-width-prose:   65ch;    /* ~65 chars — body text column */
  --max-width-narrow:  45ch;    /* short-form content */

  /* ── Animation (Phase 1: define values; Phase 8: use them) ── */

  --duration-fast:     150ms;
  --duration-base:     300ms;
  --duration-slow:     600ms;
  --duration-fold:     800ms;   /* origami fold transition */
  --ease-out:          cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in-out:       cubic-bezier(0.4, 0.0, 0.2, 1);
  --perspective-fold:  1200px;  /* CSS perspective for 3D fold effect */

  /* ── Border radius ───────────────────────────────────── */

  --radius-sm:   4px;
  --radius-base: 8px;
  --radius-lg:   16px;
  --radius-full: 9999px;

  /* ── Z-index scale ───────────────────────────────────── */

  --z-base:    0;
  --z-raised:  10;
  --z-overlay: 100;
  --z-nav:     200;
  --z-modal:   300;
}
```

**Contrast verification (manual):**
- `--color-text` (`#2a1f14`) on `--color-bg` (`#fdf8f0`): approximately 14:1 — exceeds WCAG AAA
- `--color-text-muted` (`#7a6552`) on `--color-bg` (`#fdf8f0`): approximately 4.7:1 — passes WCAG AA (4.5:1 minimum for normal text)
- `--color-accent` (`#c4614a`) on `--color-bg` (`#fdf8f0`): approximately 3.4:1 — passes WCAG AA for large text (3:1) but NOT for small body text; use accent for headings, links, and UI elements only — never for small body copy

**Action:** Verify these contrast ratios with WebAIM Contrast Checker before Phase 1 is marked complete.

---

## Typography Recommendation

**Recommended pairing: Lora + DM Sans**

| Font | Role | Weights Loaded | Rationale |
|------|------|----------------|-----------|
| Lora | Display, headings (h1–h3), pull quotes | 400, 500, 600 + 400 italic | Classical literary serif; warm, considered, bookish — reads as "someone who takes words seriously"; appropriate for a narrative designer without feeling editorial or academic |
| DM Sans | Body text, nav, UI labels, captions | 400, 500, 600 + 400 italic | Geometric humanist sans; modern but not cold; legible at small sizes; avoids the Neue Haas Grotesk "tech startup" feel |

**Google Fonts link tag (confirmed working):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet">
```

**Backup pairing: Crimson Pro + DM Sans** (if Lora feels too editorial after first draft review)
- Crimson Pro is slightly more compact and modern-feeling than Lora; same literary warmth
- Replace Lora in the Google Fonts URL with `Crimson+Pro`; keep DM Sans unchanged

**Fonts to avoid for this project:**
- Playfair Display — too fashion/editorial, wrong audience signal
- Any grotesque (Neue Haas Grotesk, Helvetica Neue) — corporate coldness
- Libre Baskerville — dated web feel
- Inter — too neutral/SaaS for this brand personality

---

## GitHub Pages DNS and HTTPS Setup

### Correct Sequence (sequence matters — doing DNS first risks domain hijacking)

1. **Step 1 — Configure in repo settings first:**
   - GitHub repo → Settings → Pages
   - Enter custom domain (e.g., `origamigames.design` or `www.origamigames.design`)
   - GitHub creates or confirms the CNAME file in the repo root
   - The CNAME file is already in the repo — verify it contains the correct domain

2. **Step 2 — Configure DNS records with domain registrar (Squarespace DNS):**

   For apex domain (`origamigames.design`):
   ```
   Type: A      Host: @    Points to: 185.199.108.153
   Type: A      Host: @    Points to: 185.199.109.153
   Type: A      Host: @    Points to: 185.199.110.153
   Type: A      Host: @    Points to: 185.199.111.153
   Type: AAAA   Host: @    Points to: 2606:50c0:8000::153
   Type: AAAA   Host: @    Points to: 2606:50c0:8001::153
   Type: AAAA   Host: @    Points to: 2606:50c0:8002::153
   Type: AAAA   Host: @    Points to: 2606:50c0:8003::153
   ```

   For www subdomain (`www.origamigames.design`):
   ```
   Type: CNAME  Host: www  Points to: [username].github.io
   ```

3. **Step 3 — Verify DNS propagation:**
   ```bash
   dig origamigames.design +noall +answer
   # Should show the four A record IPs above
   ```

4. **Step 4 — Enable HTTPS:**
   - GitHub repo → Settings → Pages → Check "Enforce HTTPS"
   - HTTPS provisions via Let's Encrypt; can take up to 24 hours
   - Do not check "Enforce HTTPS" until the custom domain DNS has propagated

5. **Step 5 — Verify:**
   - Visit `https://[domain]` — should load with padlock
   - Visit `http://[domain]` — should redirect to HTTPS

**CNAME file contents format:** One line, no trailing slash, no protocol:
```
origamigames.design
```
(or whatever the custom domain is — check current CNAME file in repo)

**Note:** GitHub recommends configuring the `www` subdomain even when using an apex domain, because `www` subdomains are more stable (not affected by GitHub IP address changes). Configure both and GitHub Pages will set up automatic redirects between them.

### HTTPS Timing

- DNS propagation: 0–48 hours (typically under 1 hour for Squarespace DNS)
- HTTPS provisioning after DNS propagates: up to 24 hours
- "Enforce HTTPS" checkbox appears only after HTTPS is provisioned
- **Plan for up to 24 hours between DNS change and confirmed HTTPS** — don't block other work on this

---

## Common Pitfalls

### Pitfall 1: File Path Case Sensitivity

**What goes wrong:** File or folder created as `Work/index.html` on Windows (where the filesystem is case-insensitive). Works locally. On GitHub Pages (Linux, case-sensitive): `/work/` 404s because the directory is named `Work/`.
**Why it happens:** Windows doesn't show or enforce the case difference, so the mismatch is invisible until deploy.
**How to avoid:** Enforce all-lowercase-hyphen naming from the first file created. Check `git status` output (Git on Windows can show case-sensitive diffs if `core.ignorecase = false` is set).
**Set immediately:** `git config core.ignorecase false` in the repo directory.
**Warning signs:** `404 Not Found` on a page that definitely exists in the repo.

### Pitfall 2: fetch() Fails on file://

**What goes wrong:** Developer opens `index.html` by double-clicking it. Browser uses `file://` protocol. `nav.js` calls `fetch('/_includes/nav.html')`. The browser rejects cross-origin fetch from `file://`. Nav and footer don't appear. No visible error in most browsers.
**Why it happens:** `fetch()` requires HTTP/HTTPS.
**How to avoid:** Always use VS Code Live Server (`Right-click index.html → Open with Live Server`). The Live Server extension serves on `localhost:5500` which uses HTTP.
**Warning signs:** Nav is missing; open DevTools Console and look for `fetch` errors or CORS/network errors.

### Pitfall 3: GSAP async Attribute Breaks Load Order

**What goes wrong:** Developer adds `async` to GSAP script tags. `ScrollTrigger.min.js` downloads and executes before `gsap.min.js` is ready. `animations.js` references `gsap` before it exists.
**Why it happens:** `async` means "download and execute as soon as ready, in any order." This is correct for independent scripts but wrong for scripts with dependencies.
**How to avoid:** Use `defer` on all GSAP and site JS script tags. `defer` preserves DOM order of execution after HTML parsing completes.
**Warning signs:** `Uncaught ReferenceError: gsap is not defined` in console.

### Pitfall 4: CNAME File Accidentally Modified or Deleted

**What goes wrong:** `git add .` accidentally stages a modification to CNAME. CNAME gets overwritten on push. GitHub Pages loses the custom domain configuration. HTTPS has to be reprovisioned from scratch.
**Why it happens:** The CNAME file looks like a generic text file; easy to accidentally edit.
**How to avoid:** Never touch CNAME. Check `git status` before every commit. Treat CNAME as read-only infrastructure.
**Warning signs:** Site serves at `[username].github.io` instead of custom domain; padlock disappears.

### Pitfall 5: Relative Paths Break at Different Directory Depths

**What goes wrong:** `nav.js` uses `../css/tokens.css` or `../../_includes/nav.html`. Works from `index.html` at root. Breaks from `/work/index.html` (needs `../../`) or from deeper pages.
**Why it happens:** Relative paths are resolved relative to the current file's location.
**How to avoid:** Use root-relative paths everywhere: `/css/tokens.css`, `/_includes/nav.html`. Root-relative paths always resolve from the site root regardless of the current page's directory depth.
**Warning signs:** Styles missing on sub-pages; nav not injecting on work pages but working on home.

### Pitfall 6: .nojekyll Missing

**What goes wrong:** GitHub Pages attempts to process the site through Jekyll. Files in `_includes/` directory (which starts with underscore) are excluded by Jekyll — `_includes/nav.html` returns 404. Nav never loads.
**Why it happens:** Jekyll excludes directories starting with underscore by default.
**How to avoid:** Create an empty `.nojekyll` file at the repo root before any other files. This disables Jekyll processing entirely.
**Warning signs:** `/_includes/nav.html` returns 404 on live site but works locally.

### Pitfall 7: DNS Configured Before CNAME in Repo

**What goes wrong:** DNS A records configured before the custom domain is added in GitHub Pages settings. A third party can create a repo that claims the domain during the window where DNS points at GitHub but no GitHub Pages site has claimed it.
**Why it happens:** Natural instinct to "set up DNS first."
**How to avoid:** GitHub's docs are explicit: add custom domain in repo settings first, then configure DNS.
**Warning signs:** Site owned by someone else appears when visiting your domain (low probability but non-zero for high-profile names).

---

## Code Examples

### GSAP CDN Script Tags (exact, confirmed 3.14.2)

```html
<!-- Place before </body>, use defer to preserve execution order -->
<!-- DO NOT use async — breaks GSAP → ScrollTrigger → animations.js dependency chain -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/ScrollTrigger.min.js" defer></script>
<script src="/js/nav.js" defer></script>
<script src="/js/animations.js" defer></script>
```

**Version pinning strategy (Claude's discretion):** Pin to `@3.14.2` (confirmed current as of 2026-02-24). Pinning prevents surprise behavior changes from a patch update mid-project. If a security patch is released, update the version string in two lines. Do NOT use `@3` floating tag for a production site — fine during initial scaffolding but pin before Phase 8 when animation correctness matters.

### Active Nav Link (add to nav.js after navReady)

```javascript
// Add active class to current page's nav link
document.addEventListener('navReady', function () {
  var currentPath = window.location.pathname;
  var links = document.querySelectorAll('.site-nav__link');
  links.forEach(function (link) {
    // Strip trailing slash for comparison, but treat '/' as home
    var linkPath = link.getAttribute('href').replace(/\/$/, '') || '/';
    var pagePath = currentPath.replace(/\/$/, '') || '/';
    if (linkPath === pagePath) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('is-active');
    }
  });
});
```

### .nojekyll File

```bash
# Create at repo root — must be empty, just needs to exist
touch .nojekyll
```

### Verify DNS A Records

```bash
dig yourdomain.com +noall +answer
# Should return four lines with 185.199.108-111.153
```

### Verify HTTPS is Active

```bash
curl -I https://yourdomain.com
# Look for: HTTP/2 200 and server: GitHub.com
```

### git config for Case Sensitivity

```bash
# Run once in repo directory
git config core.ignorecase false
```

---

## State of the Art

| Old Approach | Current Approach | Notes |
|--------------|------------------|-------|
| GSAP via CDN without version pin (`@3`) | Pin to specific version `@3.14.2` | More predictable; easy to update when needed |
| GSAP without `defer` (synchronous at bottom of body) | `defer` attribute on all scripts | `defer` + correct DOM order is cleaner and equivalent |
| Squarespace code injection for nav | Fetch-inject from `_includes/` | Platform changed; same single-source-of-truth benefit |
| GitHub Pages with only A records | A records + AAAA records (IPv6) | GitHub now documents both; add AAAA for completeness |

**Deprecated / outdated (from project history):**
- Squarespace AJAX re-init pattern (`Squarespace.afterBodyLoad`) — platform is GitHub Pages; standard DOM events work normally
- sqs-* CSS selectors — not applicable; no Squarespace
- jQuery from Squarespace global — not applicable; no Squarespace; do not import jQuery separately

---

## Open Questions

1. **What is the exact custom domain in the existing CNAME file?**
   - What we know: CNAME file exists in repo (confirmed by `git ls-files`)
   - What's unclear: The exact domain string — needed to confirm what DNS records to configure
   - Recommendation: Read CNAME file content before DNS configuration task. The planner should include "read CNAME file and confirm domain" as the first verification step in the DNS task.

2. **Does the Squarespace DNS control panel support AAAA records?**
   - What we know: Squarespace DNS supports A records and CNAME records
   - What's unclear: Whether AAAA (IPv6) records are available in Squarespace's DNS management UI
   - Recommendation: If AAAA records are not available, A records only are sufficient — GitHub Pages works on IPv4. Flag this in the DNS task so the executor checks.

3. **Email address for footer contact link**
   - What we know: Footer needs `mailto:` link (REQ-N03)
   - What's unclear: What email address to use as placeholder vs. final
   - Recommendation: Use `PLACEHOLDER@email.com` as the footer value in Phase 1 skeleton; updating to the real address is a 1-line edit in `_includes/footer.html`.

---

## Sources

### Primary (HIGH confidence)
- `https://cdn.jsdelivr.net/npm/gsap@3/dist/` — confirmed GSAP 3.14.2 is current version, all files listed
- `https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js` — file exists and header confirms version 3.14.2
- `https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site` — A record IPs (185.199.108-111.153), AAAA record IPs, correct setup sequence (repo settings before DNS)
- `https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages` — www subdomain recommendation, automatic redirect behavior
- `https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site` — `.nojekyll` purpose confirmed
- `https://gsap.com/docs/v3/Plugins/ScrollTrigger/` — `gsap.registerPlugin(ScrollTrigger)` required; tree-shaking note
- `https://fonts.googleapis.com/css2?family=Lora:...` — Lora 400/500/600 + italic confirmed available
- `https://fonts.googleapis.com/css2?family=Crimson+Pro:...` — Crimson Pro confirmed available (backup)
- `https://fonts.googleapis.com/css2?family=DM+Sans:...` — DM Sans confirmed available with optical size axis

### Secondary (MEDIUM confidence)
- Project SUMMARY.md research (2026-02-24) — architecture patterns, pitfall catalogue, stack rationale (originally sourced from official docs)
- `defer` vs `async` behavior — MDN Web Docs (referenced in SUMMARY.md; not re-fetched but stable specification behavior)

### Tertiary (LOW confidence / needs validation)
- WCAG AA contrast ratios for proposed color values — manually estimated; must be verified with WebAIM Contrast Checker before Phase 1 is marked complete
- Squarespace DNS control panel AAAA record support — not verified; check during DNS configuration task

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all library versions confirmed from CDN directly; GitHub Pages docs consulted for DNS records
- Architecture: HIGH — static HTML patterns are fundamental web behavior; fetch-inject pattern is standard; all paths verified
- Typography: HIGH — both fonts confirmed available on Google Fonts CDN with required weights
- CSS token values: MEDIUM-HIGH — color values chosen with aesthetic intention; contrast ratios need WebAIM verification before finalizing
- Pitfalls: HIGH — cross-referenced with project SUMMARY.md which itself sourced from official docs; `.nojekyll`/Jekyll interaction and case sensitivity are well-documented behaviors

**Research date:** 2026-02-24
**Valid until:** 2026-04-24 (stable APIs — GitHub Pages, GSAP 3, Google Fonts are all well-maintained and breaking changes are rare)
**GSAP version to re-check:** If more than 30 days pass before Phase 1 implementation, verify `https://cdn.jsdelivr.net/npm/gsap@3/dist/` for a newer 3.x patch

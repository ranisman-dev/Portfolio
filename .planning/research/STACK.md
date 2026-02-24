# Stack Research — GitHub Pages Portfolio with GSAP Origami Animations

**Research type:** Project Research — Stack dimension (platform migration: Squarespace → GitHub Pages)
**Date:** 2026-02-24
**Milestone:** INITIAL BUILD
**Question:** Right stack for a GitHub Pages portfolio with GSAP origami fold animations, CSS custom properties, and multi-page static HTML. CDN versions, browser compatibility for CSS 3D transforms, GitHub Pages configuration (CNAME, .nojekyll, custom domain + HTTPS).
**Confidence:** MEDIUM-HIGH (web tools unavailable; based on training data through August 2025; GitHub Pages and GSAP APIs are stable and change infrequently — verified patterns)

---

## Bottom Line Up Front

**Raw HTML/CSS/JS on GitHub Pages. GSAP 3.12.x via jsDelivr CDN. No build tools, no Jekyll, no static site generator. One `.nojekyll` file prevents Jekyll from interfering. One `CNAME` file sets the custom domain. HTTPS is automatic once DNS propagates. CSS 3D transforms work in all modern browsers with one critical iOS Safari caveat. All animation values in CSS custom properties.**

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Raw HTML5 | — | Page structure | No build tools, no dependencies, deploy by pushing files — exactly what GitHub Pages is optimized for |
| CSS3 with custom properties | — | Styling + animation values | `--var` tokens make animation values owner-adjustable without touching JS; CSS 3D transforms (`preserve-3d`, `perspective`, `rotationX/Y`) are native browser features with no library dependency |
| Vanilla JavaScript (ES2020+) | — | Interaction logic | All modern browsers support ES modules, `const`/`let`, arrow functions, `async/await`; no transpilation needed for a portfolio |
| GSAP 3 + ScrollTrigger | 3.12.5 (latest 3.x) | Origami fold animations, scroll-driven reveals | Best-in-class performance, CSS 3D native support, free tier includes ScrollTrigger and Flip, CDN-loadable with no build step, well-documented |
| GitHub Pages | — | Hosting | Free, Git-native deployment, custom domain + automatic HTTPS, no server needed for a static site |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| GSAP Flip | Bundled with GSAP 3 free tier | Animate elements between layout states | Use when transitioning a project card from the Work grid into a full project page view, or any "from here to there" positional animation |
| No other libraries | — | — | jQuery, Lodash, Bootstrap are all unnecessary weight for a hand-coded portfolio; avoid |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| VS Code | Local editing of HTML/CSS/JS | Free, has Live Preview extension for in-browser testing without a server |
| VS Code Live Server (extension) | Local HTTP server for testing | Needed because `file://` protocol blocks some browser features (CORS, modules); run a local server while developing |
| Git + GitHub | Version control and deployment source | The GitHub repo IS the site — pushing to `main` (or configured branch) deploys automatically |
| Browser DevTools | Animation debugging, mobile simulation | Chrome DevTools Performance panel identifies GPU vs CPU rendering; iOS Safari requires actual device testing, not just browser resize |

---

## GitHub Pages Configuration

### Required Files in Repo Root

**1. `.nojekyll` (empty file, no extension)**

GitHub Pages runs Jekyll by default. Jekyll ignores files and directories starting with `_`, which would break any folder named `_assets`, `_css`, etc. More importantly, Jekyll processes your files through its template engine, which can mangle HTML and cause unexpected behavior.

**Create this file:** An empty file named `.nojekyll` in the repository root tells GitHub Pages to serve files directly as static assets without any processing.

```
/
├── .nojekyll       ← empty file, no content needed
├── index.html
├── CNAME
├── css/
├── js/
├── work/
│   └── index.html
...
```

**Confidence:** HIGH — this is stable, official GitHub Pages behavior documented since 2013.

**2. `CNAME` (plain text file, no extension)**

Contains exactly one line: the custom domain, no `https://` prefix, no trailing slash.

```
origamigames.design
```

Or if using a subdomain:
```
www.origamigames.design
```

**Important:** This file must also exist in the repository root (not in any subfolder). GitHub Pages reads this file to configure the custom domain. You can also set the domain in the repository Settings > Pages UI — GitHub will create the CNAME file automatically if you do it there.

**3. No `_config.yml` needed**

`_config.yml` is a Jekyll configuration file. Since `.nojekyll` disables Jekyll entirely, `_config.yml` has no effect and should not be created. Do not create it.

### Repository Settings

**Branch:** Default is `main`. In repository Settings > Pages, confirm the source is set to `main` branch, root directory. Alternative: `/docs` folder on `main` if you want to keep non-site files at the repo root — but for a dedicated portfolio repo, root deployment is cleaner.

**GitHub Pages URL pattern (before custom domain):**
```
https://[username].github.io/[repo-name]/
```
If the repo is named `[username].github.io` (a "user site"), it serves at:
```
https://[username].github.io/
```
**Use a user site repo** (`username.github.io`) rather than a project repo for a portfolio — it gets the clean root URL and doesn't require `<base href>` adjustments for relative paths.

### Custom Domain + HTTPS Setup

**Step 1: Add CNAME record in DNS registrar**

For an apex domain (no `www`), add two DNS records:
```
Type: A      Name: @    Value: 185.199.108.153
Type: A      Name: @    Value: 185.199.109.153
Type: A      Name: @    Value: 185.199.110.153
Type: A      Name: @    Value: 185.199.111.153
```

For a `www` subdomain, add:
```
Type: CNAME  Name: www  Value: [username].github.io
```

**GitHub Pages IP addresses** (as of August 2025 — verify against current GitHub docs before implementation):
`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

These are stable but GitHub has changed them before. Always verify at [docs.github.com/en/pages](https://docs.github.com/en/pages) before setting DNS.

**Step 2: Set custom domain in repo**

Either add `CNAME` file to repo root, OR go to Settings > Pages > Custom domain and enter the domain there (GitHub creates the CNAME file for you).

**Step 3: Wait for DNS propagation**

DNS propagation takes anywhere from minutes to 48 hours. GitHub Pages will show "DNS check in progress" in Settings > Pages during this time.

**Step 4: Enforce HTTPS**

Once DNS resolves, the "Enforce HTTPS" checkbox appears in Settings > Pages. Check it. GitHub automatically provisions a Let's Encrypt certificate. This is free and renews automatically.

**Confidence:** HIGH — this process is well-documented and has been stable for years. The IP addresses are the one thing to verify against current GitHub docs before DNS configuration.

### File Structure Recommendation

```
/                           ← repo root (deployed directly)
├── .nojekyll               ← disables Jekyll (empty file)
├── CNAME                   ← custom domain
├── index.html              ← Home page
├── work/
│   ├── index.html          ← Work index (/work/)
│   ├── project-name-1/
│   │   └── index.html      ← /work/project-name-1/
│   └── project-name-2/
│       └── index.html      ← /work/project-name-2/
├── writing/
│   └── index.html          ← /writing/
├── earlier-work/
│   └── index.html          ← /earlier-work/
├── about/
│   └── index.html          ← /about/
├── css/
│   ├── global.css          ← CSS custom properties, reset, typography, layout
│   └── animations.css      ← GSAP companion CSS, 3D transform scaffolding
├── js/
│   ├── global.js           ← GSAP init, ScrollTrigger registration, shared utilities
│   └── animations.js       ← Origami fold sequences, page-specific GSAP timelines
└── assets/
    ├── images/
    └── pdfs/
```

**Why `index.html` in subfolders instead of `work.html` at root:** Subfolders with `index.html` files produce clean URLs (`/work/` instead of `/work.html`) and make the URL structure match the logical hierarchy. GitHub Pages serves `folder/index.html` at `folder/` automatically.

---

## CDN URLs — GSAP 3

### Recommended: jsDelivr (fastest global CDN for npm packages)

**GSAP Core + ScrollTrigger (pinned to latest 3.x):**
```html
<!-- In <head> or before </body> -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
```

**`@3` resolves to the latest stable 3.x release.** As of August 2025, that is `3.12.5`. jsDelivr caches aggressively, so `@3` will stay on the latest 3.x patch without breaking changes (GSAP maintains strict semantic versioning within major versions).

**Pinned version (if you want guaranteed stability):**
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
```

**When to pin:** Pin the version once the site is stable and you don't want anything to change unexpectedly. Use `@3` during development to get patches automatically.

**GSAP Flip plugin (free, bundled with GSAP 3):**
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/Flip.min.js"></script>
```

**Confidence:** MEDIUM-HIGH — jsDelivr URL format for GSAP is well-established. Version `3.12.x` is the latest 3.x stable series as of August 2025. Verify the exact latest patch at [cdn.jsdelivr.net/npm/gsap](https://cdn.jsdelivr.net/npm/gsap) before final deployment.

### Alternative: cdnjs (Cloudflare)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

**Use cdnjs if:** jsDelivr is unavailable in a region (rare) or if you've already used cdnjs for other assets. Both are reliable. jsDelivr is slightly faster globally due to its edge network.

### Script Loading Order

GSAP must load before any code that calls `gsap.registerPlugin()` or references `ScrollTrigger`. Two correct patterns:

**Pattern A: Load in `<head>` with `defer` (recommended)**
```html
<head>
  <!-- GSAP loads non-blocking; executes after HTML is parsed -->
  <script defer src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
  <script defer src="/js/global.js"></script>
</head>
```

`defer` preserves script order and executes after DOM is parsed — equivalent to placing scripts at the bottom of `<body>`, but cleaner.

**Pattern B: Load before `</body>`**
```html
  <!-- Scripts at bottom of body — DOM is fully parsed before these run -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
  <script src="/js/global.js"></script>
</body>
```

**Do not use `async` for GSAP** — `async` does not guarantee execution order, so `ScrollTrigger.min.js` might execute before `gsap.min.js` is ready.

---

## CSS 3D Transforms — Browser Compatibility

### Support Summary

| Property | Chrome | Firefox | Safari | Edge | iOS Safari | Android Chrome |
|----------|--------|---------|--------|------|------------|----------------|
| `transform-style: preserve-3d` | 36+ | 16+ | 9+ | 12+ | 9+ | 67+ |
| `perspective` | 36+ | 16+ | 9+ | 12+ | 9+ | 67+ |
| `backface-visibility` | 36+ | 16+ | 9+ | 12+ | 9+ | 67+ |
| `rotationX/Y` (via GSAP) | All modern | All modern | All modern | All modern | All modern | All modern |

**Conclusion:** CSS 3D transforms are fully supported in all browsers a portfolio visitor is likely to use in 2026. IE11 is the only holdout — and IE11 reached end of life in June 2022. Do not optimize for IE11.

**Confidence:** HIGH — CSS 3D transform support has been stable across all modern browsers since approximately 2014-2016. This is not an area of uncertainty.

### Critical iOS Safari Caveat

**The problem:** iOS Safari flattens `transform-style: preserve-3d` on elements that have `overflow: hidden` set on them or their parent. This is a long-standing WebKit quirk.

**Manifestation:** A fold animation that works perfectly on desktop Chrome will appear completely flat (no 3D depth) on iPhone Safari if any parent element in the chain has `overflow: hidden`.

**Prevention:**
1. Never set `overflow: hidden` on a parent of a 3D-transformed element
2. If you need to clip content, use `clip-path` or `mask` instead of `overflow: hidden`
3. Test the specific fold animation on actual iOS Safari (not just desktop browser DevTools mobile simulation) before Phase 8 is marked complete

**The other iOS Safari issue: GPU compositing limits**

iOS Safari has a lower threshold for GPU layer promotion than desktop browsers. Complex 3D scenes with many simultaneously-animating elements can trigger "layer explosion" — too many GPU layers created, causing jank.

**Prevention:** Animate one or two elements at a time. GSAP's `will-change: transform` is applied automatically to animated elements; avoid setting it manually on many elements simultaneously.

### Mobile Fallback Pattern (from REQ-Anim04)

```css
/* CSS: disable 3D transforms below 768px */
@media (max-width: 767px) {
  .fold-panel {
    transform: none !important;
    transform-style: flat;
  }
}
```

```javascript
// JS: GSAP matchMedia context — 3D animations only on tablet+ width
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  // Full origami 3D fold animations here
  gsap.timeline({ ... })
    .to(".fold-panel", { rotationX: -90, transformPerspective: 1000, duration: 0.6 });

  return () => {
    // Cleanup when context is invalidated (e.g., browser resized below 768px)
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
});

mm.add("(max-width: 767px)", () => {
  // Simple opacity/scale fades for mobile
  gsap.from(".fold-panel", { autoAlpha: 0, scale: 0.95, duration: 0.4 });
});
```

### Reduced Motion Pattern (from REQ-Anim03)

```css
/* CSS prefers-reduced-motion — disable or simplify animations */
@media (prefers-reduced-motion: reduce) {
  .fold-panel {
    transition: none;
    animation: none;
  }
}
```

```javascript
// JS: check prefers-reduced-motion before initializing GSAP animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Full GSAP origami animations
  initOrigamiAnimations();
} else {
  // Simple opacity-only reveals — no transform, no duration over 200ms
  initAccessibleAnimations();
}

// OR use GSAP's built-in matchMedia for this too:
mm.add("(prefers-reduced-motion: no-preference)", () => {
  initOrigamiAnimations();
});
```

---

## GSAP Integration Patterns for Static HTML

### Registration (always required)

```javascript
// global.js — loaded after GSAP CDN scripts
gsap.registerPlugin(ScrollTrigger);

// If using Flip:
gsap.registerPlugin(ScrollTrigger, Flip);
```

### DOMContentLoaded initialization

Unlike Squarespace (which had AJAX navigation), standard static HTML navigation is full page loads. `DOMContentLoaded` fires reliably on every page because the browser loads each HTML file fresh. There is no equivalent to Squarespace's AJAX lifecycle issue.

```javascript
document.addEventListener("DOMContentLoaded", () => {
  // Safe to query DOM here — all HTML has been parsed
  initAnimations();
});
```

### Origami fold CSS scaffold

```css
/* css/animations.css */

/* -- Animation timing tokens -- */
:root {
  --fold-duration: 0.6s;
  --fold-ease: cubic-bezier(0.77, 0, 0.175, 1);
  --fold-perspective: 1200px;
  --fold-origin: top center;
  --reveal-duration: 0.3s;
}

/* -- 3D fold container -- */
.fold-scene {
  perspective: var(--fold-perspective);
  perspective-origin: center center;
}

/* -- Fold panel (the element that rotates) -- */
.fold-panel {
  transform-style: preserve-3d;
  transform-origin: var(--fold-origin);
  backface-visibility: hidden;
  will-change: transform;
}

/* -- Hidden back face (content revealed by fold) -- */
.fold-panel-back {
  backface-visibility: hidden;
  transform: rotateX(180deg);
}
```

```javascript
// js/animations.js — origami fold sequence
// How to adjust: change --fold-duration, --fold-ease, --fold-perspective in :root CSS

function initOrigamiFold(triggerSelector) {
  const panels = gsap.utils.toArray(".fold-panel");

  // Read timing values from CSS custom properties — do not hardcode here
  const duration = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--fold-duration")
  ) || 0.6;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerSelector,
      start: "top 60%",
      toggleActions: "play none none reverse"
    }
  });

  panels.forEach((panel, i) => {
    tl.to(panel, {
      rotationX: -90,
      transformPerspective: 1000,
      duration: duration,
      ease: "power2.in"
    }, i * 0.15); // stagger — adjust 0.15 to change overlap
  });
}
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Raw HTML + GitHub Pages | Eleventy (11ty) static site generator | Use Eleventy when there are 5+ project pages with identical template structure — eliminates repetitive HTML copy-paste. Start with raw HTML; migrate to Eleventy if maintenance burden grows |
| Raw HTML + GitHub Pages | Hugo | Hugo is faster at build time but has steeper learning curve for someone with limited web coding experience. Eleventy is closer to plain HTML mentally |
| GSAP 3 via jsDelivr | Anime.js | Anime.js is ~17KB vs GSAP ~28KB. Only choose Anime.js if GSAP is overkill for the project — it has no ScrollTrigger equivalent and less CSS 3D documentation |
| GSAP 3 via jsDelivr | Motion One (Web Animations API) | Motion One is modern and lightweight but ScrollTrigger-equivalent functionality requires more custom code. Choose it for a v2 rewrite if you want to reduce CDN dependency |
| `.nojekyll` (disable Jekyll) | `_config.yml` with Jekyll | Use Jekyll if the site will grow to 10+ pages and you want templating. Not worth the learning curve for a 5-7 page v1 portfolio |
| Vanilla JS | jQuery | jQuery is available via CDN but adds unnecessary weight (~30KB min+gzip). Vanilla `querySelector`, `addEventListener`, `fetch` cover everything a portfolio needs. No reason to use jQuery in 2026 |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Jekyll (without .nojekyll) | GitHub Pages runs Jekyll by default; it will try to process your HTML through Liquid templates, potentially mangling content or ignoring files in `_`-prefixed folders | Add `.nojekyll` to repo root |
| `async` attribute on GSAP script tags | Does not guarantee load order; `ScrollTrigger.min.js` may execute before `gsap.min.js`, causing "gsap is not defined" errors | Use `defer` (preserves order) or load scripts before `</body>` |
| `overflow: hidden` on 3D transform parents | iOS Safari flattens `preserve-3d` when any ancestor has `overflow: hidden` — fold animations appear 2D-flat on iPhone | Use `clip-path` or `mask` for clipping; never `overflow: hidden` on parents of 3D elements |
| Three.js or WebGL | Adds ~650KB CDN dependency for visual effects that CSS 3D transforms achieve with zero dependencies | Pure CSS 3D + GSAP |
| ScrollMagic | Unmaintained since 2021, superseded by GSAP ScrollTrigger in every measurable way | GSAP ScrollTrigger |
| AOS (Animate On Scroll) | Conflicts with GSAP ScrollTrigger if both are present; less capable (no timelines, no sequencing) | GSAP ScrollTrigger |
| Multiple `<base href>` tags | GitHub Pages user sites (`username.github.io`) serve from root — no base href needed. Project repos need `<base href="/repo-name/">` which breaks things if you later move to a custom domain | Use a user site repo (`username.github.io`) to avoid this entirely |

---

## Stack Patterns by Variant

**If the site stays at 5-7 pages (v1 scope):**
- Raw HTML files, no build tool
- GSAP via jsDelivr CDN
- CSS custom properties in a single `global.css`
- One `global.js` + one `animations.js`
- GitHub Pages from `main` branch root

**If the site grows to 8+ pages with repeated project page structure:**
- Migrate to Eleventy (11ty) — add it without changing any HTML/CSS; Eleventy templates are HTML files with `{{ }}` syntax layered on top
- Eleventy runs locally (Node.js) and outputs a static `_site/` folder; deploy that folder to GitHub Pages
- No CDN changes needed — GSAP CDN tags just move to the Eleventy layout template

**If a specific project needs an interactive playable prototype:**
- Use an `<iframe>` embedding an itch.io or game build
- Alternatively: a dedicated `/demos/[project]/` subfolder with its own `index.html` and self-contained JS — does not affect the main site's stack

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| GSAP 3.12.x | All modern browsers (Chrome 60+, Firefox 60+, Safari 12+, Edge 18+, iOS Safari 12+) | GSAP 3 dropped IE11 support. Do not use GSAP 3 on a site that must support IE11 (it doesn't — IE11 is dead) |
| ScrollTrigger | Must match GSAP version (same @3 tag covers this) | Always load `gsap.min.js` before `ScrollTrigger.min.js` — wrong order causes silent failure |
| CSS custom properties | All modern browsers (same matrix as GSAP) | Do not use CSS custom properties inside `calc()` with IE11 fallbacks — unnecessary for this project |
| CSS `transform-style: preserve-3d` | Safari 9+, Chrome 36+, Firefox 16+, Edge 12+ | The iOS Safari `overflow: hidden` caveat is the only real compatibility concern — see browser compatibility section above |
| GitHub Pages (HTTPS + custom domain) | N/A — server configuration, not browser API | Let's Encrypt certificate provisioned automatically; HTTPS enforce checkbox available once DNS propagates |

---

## GitHub Pages Gotchas

### 1. Jekyll processes files unless `.nojekyll` exists

**What happens:** Without `.nojekyll`, GitHub Pages passes all files through Jekyll. Any file or folder starting with `_` is ignored. Any `{{ }}` in your HTML gets processed as Liquid template syntax. An HTML comment like `<!-- {{ text }} -->` could break page rendering.

**Fix:** Create an empty file named `.nojekyll` at the repository root. One time, done.

### 2. Custom domain resets after force-push to main

**What happens:** If `CNAME` exists only in the GitHub Settings UI (not as a committed file), a force-push that wipes the root may clear the custom domain setting.

**Fix:** Commit the `CNAME` file to the repository. It becomes part of the codebase, not just a UI setting.

### 3. Mixed content warnings break HTTPS

**What happens:** Once "Enforce HTTPS" is enabled, any resource loaded over `http://` (images, CDN scripts, fonts) triggers a mixed content warning. Browsers block or downgrade the connection.

**Fix:** All resource URLs must use `https://`. jsDelivr serves over HTTPS. Check all `<img src>`, `<link href>`, and `<script src>` attributes.

### 4. 404 page behavior

**What happens:** GitHub Pages returns its own generic 404 page for missing URLs unless you provide a `404.html` at the repository root.

**Fix:** Create a `404.html` that matches the site's visual design, includes navigation, and offers a path back to Home and Work. Keep it simple — no GSAP animations needed on an error page.

```html
<!-- 404.html at repo root -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Page Not Found — Origami Games</title>
  <link rel="stylesheet" href="/css/global.css">
</head>
<body>
  <nav><!-- same nav as other pages --></nav>
  <main>
    <h1>This fold didn't land where expected.</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/">Back to Home</a>
    <a href="/work/">See the Work</a>
  </main>
</body>
</html>
```

Note: `404.html` uses absolute paths (`/css/global.css`) not relative paths (`../css/global.css`) because GitHub Pages serves 404.html from whatever URL the user tried to load — its relative path context is unpredictable.

### 5. Relative vs. absolute paths

**What happens:** Using `../css/global.css` from a deep URL like `/work/project-name/` requires careful counting of `../` prefixes. One extra or missing `../` breaks the stylesheet or script on that page.

**Fix:** Use root-relative paths everywhere: `/css/global.css`, `/js/global.js`. These resolve correctly from any depth. This only works correctly when served from a domain root — which is why using a user site repo (`username.github.io`) or a custom domain is recommended over a project repo URL with a `/repo-name/` prefix.

### 6. Deployment lag

**What happens:** After pushing to `main`, GitHub Pages can take up to 2-3 minutes to rebuild and redeploy. Changes are not instant.

**Fix:** Check the Actions tab in the GitHub repository — a green check on the Pages deploy action means the site is updated. Do not reload the browser immediately after pushing and assume nothing happened.

---

## Sources

- GSAP documentation (gsap.com) — ScrollTrigger API, `matchMedia()` context, CSS 3D transform properties, plugin registration — **HIGH confidence**; architecture in training data matches stable long-term API
- GitHub Pages documentation (docs.github.com/en/pages) — CNAME configuration, `.nojekyll`, custom domain DNS records, HTTPS enforcement — **HIGH confidence**; these processes have been stable for years; verify IP addresses before DNS setup
- MDN Web Docs — CSS `transform-style`, `perspective`, `backface-visibility` browser compatibility tables — **HIGH confidence**; well-established standards
- iOS Safari WebKit quirks — `overflow: hidden` flattening `preserve-3d` — **MEDIUM-HIGH confidence**; long-standing documented behavior; verify still applies in current iOS Safari before Phase 8 implementation
- jsDelivr CDN URL format — **HIGH confidence**; `@3` pinning to latest 3.x is a stable jsDelivr convention
- GSAP version 3.12.5 as latest stable — **MEDIUM confidence** (training data cutoff August 2025; verify current version at cdn.jsdelivr.net/npm/gsap before deployment)

---

## Verification Checklist (Before Implementation)

Before Phase 1 begins, verify these facts against current sources:

- [ ] Current GSAP 3.x latest patch version: check [https://cdn.jsdelivr.net/npm/gsap](https://cdn.jsdelivr.net/npm/gsap) — look for `"version"` field
- [ ] GitHub Pages A record IP addresses: verify at [https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) before setting DNS
- [ ] iOS Safari `overflow: hidden` + `preserve-3d` issue: test on actual iOS Safari device during Phase 8 — behavior is real but Apple may have patched it in a recent WebKit update

---

*Stack research for: GitHub Pages static portfolio — HTML/CSS/JS + GSAP origami animations*
*Researched: 2026-02-24*
*Platform migration note: This file supersedes the previous STACK.md (2026-02-23) which was written for Squarespace. Platform changed to GitHub Pages — all Squarespace-specific content is now obsolete.*

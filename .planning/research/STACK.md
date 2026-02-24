# Stack Research — Squarespace Game Design Portfolio

**Research type:** Project Research — Stack dimension
**Date:** 2026-02-23
**Milestone:** Greenfield
**Question:** Standard 2025/2026 approach for a Squarespace portfolio site with custom CSS + JS; animation libraries via CDN injection; best templates for creative/portfolio work; Squarespace CSS/JS capabilities and constraints.

---

## Bottom Line Up Front

**Use Squarespace 7.1 (not 7.0) with the "Fluid Engine" page builder. Pick the "Paloma" or "Hester" template family as a base — both are minimal, image-forward, and fully compatible with the Fluid Engine layout system. Inject GSAP (via CDN) for all animation work including 3D CSS effects and origami-style fold transitions. Do NOT use jQuery-dependent animation libraries or anything that assumes Node/build-tool access.**

---

## Platform: Squarespace Version Choice

### 7.1 vs 7.0 — Use 7.1

All new Squarespace sites since 2021 default to **7.1**, which unifies the template system under a single codebase. This is the only correct choice for a new portfolio in 2026.

| Factor | 7.1 | 7.0 (legacy) |
|---|---|---|
| Template switching | Yes — switch any time | No — locked at creation |
| Fluid Engine (grid layout) | Yes | No |
| Code injection | Yes (Business plan+) | Yes |
| Custom CSS panel | Yes | Yes |
| Style editor flexibility | Higher | Lower |
| Official support trajectory | Active | Maintenance mode |

**Why it matters:** 7.1 lets you restyle and switch templates without rebuilding the site. For a portfolio that will evolve, this is critical. 7.0 locks you in.

---

## Template Recommendations

### The Squarespace 7.1 Template Reality

In Squarespace 7.1, "templates" are mostly aesthetic starting points — they share the same underlying engine. The visual difference is in default fonts, color palettes, and section layouts. Every 7.1 template supports Fluid Engine and the same CSS/JS injection points. Choose based on the default aesthetic closest to what you want to build toward, because it reduces the CSS override burden.

### Recommended Templates for a Game Design Portfolio

**1. Paloma (Primary Recommendation)**
- Minimal, content-forward layout with strong image presentation
- Default styling is clean and neutral — low CSS override burden
- Large hero sections work well for showcasing game screenshots/trailers
- Typography defaults are tasteful and easy to restyle
- No heavy decorative chrome to fight against
- Best choice if the portfolio leans toward "elegant/professional game designer"

**2. Hester**
- Bold, full-bleed image sections by default
- Strong visual hierarchy out of the box
- Better for portfolios that lead with striking visual assets
- Slightly more opinionated styling (more CSS overrides needed)
- Best choice if the portfolio leans toward "visually dramatic / art-forward"

**3. Forma**
- Clean grid-based layout, excellent for project card displays
- Works well for designers who want to show many projects in a structured grid
- Less dramatic by default — easier to maintain professionalism while adding custom JS flair
- Best choice for a portfolio heavy on "case study" style project pages

**4. Almar**
- Strong for single-page or minimal-nav experiences
- Good for portfolios that want one strong scrolling narrative
- Best choice if the portfolio tells a story top-to-bottom

### What to Avoid

- **Brine, Bedford, York (7.0 templates):** Legacy. Not worth starting on in 2026.
- **Any template with heavy built-in parallax or scroll effects:** These conflict with custom GSAP ScrollTrigger implementations and create z-index/transform nightmares.
- **Commerce-focused templates (Calla, Marta, etc.):** Excess DOM structure from shop features creates noise.

---

## Squarespace CSS/JS Capabilities

### CSS Injection Points

**1. Design > Custom CSS panel**
- Applies site-wide
- Supports standard CSS3 including custom properties (variables), animations, keyframes, transforms, grid, flexbox
- Supports `@media` queries
- Does NOT support SCSS/SASS natively (Squarespace compiles its own LESS internally, but Custom CSS is plain CSS)
- Squarespace's own styles use high-specificity selectors — you frequently need to match or exceed specificity, or use `:is()` / `:where()` to manage cascade

**2. Per-page Code Block (Code Injection via `<style>` tag)**
- Insert a Code Block element on a page, set type to HTML, write `<style>` tags
- Scoped visually to that page's content area
- Useful for page-specific overrides without polluting the global stylesheet

**Key CSS Capabilities (Confirmed in Squarespace 7.1):**
- CSS custom properties (`--var`) fully supported
- `@keyframes` animations fully supported
- CSS `transform`, `transform-style: preserve-3d`, `perspective`, `backface-visibility` — all supported (critical for origami/3D fold effects)
- `clip-path`, `mask`, `filter` — supported
- CSS Grid and Flexbox — supported
- `@media` and `@supports` — supported
- CSS `scroll-behavior` — supported (though GSAP ScrollTrigger overrides this anyway)

**CSS Limitations:**
- Cannot access or modify Squarespace's internal LESS/template variables
- Some Squarespace UI elements (e.g., the navigation bar, mobile menu) have deeply nested shadow-DOM-like specificity that requires `!important` or very specific selectors
- The `.sqs-block`, `.sqs-layout`, `.sqs-row` class structure is Squarespace's internal layout system — you must work around these, not through them
- CSS applied in the Custom CSS panel loads after Squarespace's default stylesheet (FOUC can occur on slow connections)

### JavaScript Injection Points

**1. Settings > Advanced > Code Injection > Header**
- Runs on every page before `</head>`
- Best for: CDN `<script>` tags (with `defer` or in appropriate order), `<link>` for external fonts/resources
- Use for loading animation libraries (GSAP, etc.)

**2. Settings > Advanced > Code Injection > Footer**
- Runs on every page before `</body>`
- Best for: initialization scripts, anything that needs DOM to be loaded
- Use for GSAP initialization, ScrollTrigger setup, custom interaction code

**3. Per-page Code Blocks (type: HTML)**
- Allows `<script>` tags inline in page content
- Executes after the page content loads
- Good for: page-specific animation triggers, interactive demos

**4. Per-page Page Header Code Injection (page settings > Advanced)**
- Business plan feature
- Inject `<head>` content for a specific page only
- Use for page-specific library loads (e.g., only load a heavy library on the interactive demo page)

**JavaScript Limitations and Constraints:**

- **Squarespace uses jQuery internally (v3.x in 7.1).** It is globally available as `$` and `jQuery`. You do not need to load it, but you must not load a conflicting version.
- **No Node.js, no build tools, no npm.** Everything must be CDN-loaded or written as vanilla JS.
- **No access to Squarespace's server-side template system (JSON-T).** You cannot server-render dynamic content.
- **Single-page navigation (ajax navigation) in 7.1:** Squarespace 7.1 uses AJAX-based page transitions by default. This means standard `DOMContentLoaded` and `window.onload` events do NOT reliably fire on subsequent page navigations. You must listen for Squarespace's custom event: `Y.on('domready', ...)` or hook into `squarespace:ready`. **This is the single biggest gotcha for custom JS in Squarespace.**
  - Solution: Wrap all JS initialization in the Squarespace-specific lifecycle event, or use `MutationObserver` to detect DOM changes.
  - GSAP's ScrollTrigger has a `refresh()` method — call it after Squarespace AJAX navigation completes.
- **Content Security Policy:** Squarespace does not enforce a strict CSP for user-injected code. CDN scripts load without issue as long as HTTPS is used.
- **`window` and `document` are fully accessible** — no sandboxing of injected JS.
- **Modules (`type="module"`)** work in Code Injection but browser support considerations apply (all modern browsers support ES modules as of 2026, so this is fine).

**Business Plan Requirement:** Code injection (Header/Footer) requires at minimum the **Business plan** (~$23/month billed annually as of 2025/2026). The Basic plan does not support code injection. This is a hard platform constraint — there is no workaround.

---

## Animation Libraries: CDN-Loadable, Best for Portfolio

### Primary Recommendation: GSAP (GreenSock Animation Platform)

**CDN:** `https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js`
**ScrollTrigger:** `https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js`

**Why GSAP is the right choice:**
1. **Best-in-class performance** — uses `requestAnimationFrame`, hardware-accelerated transforms, and avoids layout thrashing. Animations stay smooth at 60fps even on complex sequences.
2. **CSS 3D and origami fold effects are native to GSAP** — `gsap.to(el, { rotationY: 180, transformPerspective: 800 })` just works. No workarounds needed.
3. **ScrollTrigger plugin** handles scroll-linked animations (fold-on-scroll, reveal-on-scroll) with minimal code.
4. **Timeline system** makes multi-step origami sequences (fold A, then fold B, then reveal content) declarative and easy to adjust.
5. **Free for most use cases** — the core GSAP library and most plugins (ScrollTrigger, Flip, TextPlugin) are free. Only a few premium plugins (SplitText, MorphSVG) require a Club GSAP membership ($150/year) — these are NOT needed for a portfolio site.
6. **No build tools required** — designed to work as a CDN drop-in.
7. **Squarespace compatibility is well-documented** by the community — GSAP is the most commonly used animation library with Squarespace by a wide margin.

**GSAP Plugins relevant to a game design portfolio:**
- `ScrollTrigger` — scroll-driven animations, parallax, pin sections
- `Flip` — animate elements between layout states (card flip, grid-to-detail transitions)
- `MotionPathPlugin` — animate elements along SVG paths (character movement, UI demonstrations)
- `DrawSVGPlugin` (Club GSAP) — animated SVG drawing effects for diagrams/schematics

**GSAP + Squarespace AJAX navigation fix:**
```javascript
// In Footer Code Injection
gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
  // Kill existing ScrollTrigger instances before re-initializing
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  // Your animation initialization code here
  gsap.from(".project-card", {
    scrollTrigger: ".project-card",
    opacity: 0,
    y: 60,
    stagger: 0.1
  });

  ScrollTrigger.refresh();
}

// Initial load
document.addEventListener("DOMContentLoaded", initAnimations);

// Squarespace AJAX navigation — re-run on each page change
window.addEventListener("hashchange", initAnimations);
// Or use the Squarespace-specific event if available:
if (window.Squarespace) {
  Squarespace.afterBodyLoad = Squarespace.afterBodyLoad || [];
  Squarespace.afterBodyLoad.push(initAnimations);
}
```

### Secondary Recommendation: Anime.js

**CDN:** `https://cdn.jsdelivr.net/npm/animejs@3/lib/anime.min.js`

**When to use over GSAP:** If the portfolio needs lightweight SVG path animation for game UI mockups or diagram reveals, Anime.js is simpler for that specific use case. File size is ~17KB vs GSAP's ~28KB (core only).

**Limitations vs GSAP:** No native ScrollTrigger equivalent (would need Intersection Observer manually). Less community documentation for Squarespace specifically. Fewer plugins.

**Verdict:** Use GSAP. Reach for Anime.js only if GSAP's ScrollTrigger is overkill for a specific isolated animation.

### For Origami / 3D Fold Effects Specifically

**Approach 1: Pure CSS 3D + GSAP trigger**
```css
/* CSS in Custom CSS panel */
.fold-panel {
  transform-style: preserve-3d;
  perspective: 1200px;
  backface-visibility: hidden;
  transform-origin: top center;
  transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
}

.fold-panel.folded {
  transform: rotateX(-90deg);
}

.fold-panel-back {
  backface-visibility: hidden;
  transform: rotateX(180deg);
}
```
```javascript
// GSAP controls the fold sequence
gsap.timeline({
  scrollTrigger: {
    trigger: ".fold-section",
    start: "top 60%",
    toggleActions: "play none none reverse"
  }
})
.to(".fold-panel-1", { rotationX: -90, duration: 0.5, ease: "power2.in" })
.to(".fold-panel-2", { rotationX: -90, duration: 0.5, ease: "power2.in" }, "-=0.2")
.to(".fold-reveal", { autoAlpha: 1, duration: 0.3 });
```

**Approach 2: Origami.js (niche library)**
- CDN: Not widely distributed; would need self-hosting via GitHub raw or jsDelivr from a fork
- Provides actual paper-fold mesh deformation (not just CSS hinge rotation)
- Much heavier, requires WebGL context
- Overkill for a portfolio; genuine 3D CSS transforms are visually indistinguishable from mesh deformation at the scale of a portfolio project card
- **Verdict: Do not use.** Pure CSS 3D + GSAP achieves the same visual result with a fraction of the complexity and none of the WebGL dependency risk.

**Approach 3: Three.js for true 3D paper fold**
- CDN: `https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js`
- Full WebGL 3D — could do genuine origami mesh deformation
- ~650KB CDN load (unminified)
- Requires a `<canvas>` element and custom render loop
- Squarespace Code Blocks can contain canvas elements; this technically works
- **Verdict: Only if the portfolio has a dedicated interactive 3D demo section.** Not appropriate as a general animation system for the whole portfolio.

### What NOT to Use

| Library | Reason to Avoid |
|---|---|
| **Velocity.js** | Unmaintained since 2019. Superseded by GSAP in every way. |
| **jQuery animate()** | Squarespace loads jQuery, but its built-in `.animate()` is CPU-bound (not GPU-accelerated). Visually inferior. |
| **AOS (Animate On Scroll)** | Fine for basic scroll reveals, but conflicts with GSAP ScrollTrigger if both are present. Also much less capable — no timelines, no sequencing. Pick one scroll animation system. |
| **ScrollMagic** | Deprecated in practice; last meaningful update 2021. GSAP ScrollTrigger is its direct superior replacement. |
| **Framer Motion** | React-based. Requires a React runtime. Not loadable on Squarespace without a custom React app embedded in an iFrame. |
| **GSAP MorphSVG + DrawSVG (Club GSAP)** | These ARE useful if you have a Club GSAP license, but don't pay $150/year just for a portfolio. Use them if you already subscribe. |
| **particles.js / tsParticles** | Heavy canvas animation for particle effects. Creates FOUC and performance issues as a background layer on Squarespace. If you want particle effects, use CSS animations or a very lightweight custom canvas script. |

---

## Build Workflow (No Build Tools Required)

Since Squarespace does not support a build pipeline, the workflow is:

1. **Local development:** Write CSS and JS in local `.css` / `.js` files using VS Code.
2. **Preview:** Test in browser using a static HTML prototype (create a local `index.html` that mimics the Squarespace page structure using `.sqs-block`, `.sqs-layout` class names).
3. **Deploy CSS:** Paste/sync final CSS into Design > Custom CSS.
4. **Deploy JS:** Paste/sync final JS into Settings > Advanced > Code Injection > Footer (or per-page).
5. **Version control:** Keep a local Git repo of all custom CSS/JS files. Squarespace does not version-control your injected code — if you paste over it, it is gone.

**Recommended local file structure:**
```
/portfolio-custom-code/
  css/
    global.css          # Pasted into Custom CSS panel
    animations.css      # Pasted into Custom CSS panel (or combined)
  js/
    global.js           # Pasted into Footer Code Injection
    page-home.js        # Pasted into Home page Code Block
    page-projects.js    # Pasted into Projects page Code Block
  html-prototypes/
    index.html          # Local test harness
```

---

## Squarespace Plan Requirements

| Feature | Plan Required |
|---|---|
| Custom CSS panel | Personal ($16/mo+) |
| Code Injection (header/footer) | Business ($23/mo+) |
| Per-page Code Blocks (HTML) | Business ($23/mo+) |
| Custom domain | Personal ($16/mo+) |
| Remove Squarespace branding | Business ($23/mo+) |

**Bottom line: You need at minimum the Business plan for a portfolio with meaningful custom JS.** The Personal plan's CSS-only customization is insufficient for origami fold animations or any interaction-driven work.

---

## Final Stack Specification

| Layer | Choice | Rationale |
|---|---|---|
| **Platform** | Squarespace 7.1 | Only modern version; Fluid Engine; template flexibility |
| **Plan** | Business ($23/mo) | Required for code injection |
| **Base Template** | Paloma (or Hester for bolder aesthetic) | Minimal chrome, low override burden, strong image display |
| **CSS Approach** | Custom CSS panel (global) + per-page Code Blocks | Global styles in panel; page-specific overrides inline |
| **JS Approach** | Footer Code Injection (global) + per-page Code Blocks | Global init in footer; page-specific logic in blocks |
| **Animation Library** | GSAP 3 + ScrollTrigger (CDN via jsDelivr) | Best-in-class, CSS 3D support, scroll-driven, free tier sufficient |
| **3D/Origami Effects** | Pure CSS 3D transforms + GSAP timeline control | No WebGL needed; performant; supported in all modern browsers |
| **Version Control** | Local Git repo for all custom CSS/JS | Squarespace has no version history for injected code |
| **Avoid** | Velocity.js, ScrollMagic, AOS, Framer Motion, Three.js (unless dedicated demo) | See "What NOT to Use" section above |

---

## Key Squarespace-Specific Gotchas (Summary)

1. **AJAX navigation breaks standard DOM events.** Always handle Squarespace's page lifecycle events, not just `DOMContentLoaded`.
2. **jQuery is globally available.** Do not load another copy.
3. **Business plan is non-negotiable** for custom JS injection.
4. **Squarespace's `.sqs-*` layout classes add wrapper divs** you cannot remove — account for them in CSS selectors and transform origins.
5. **CSS `transform-style: preserve-3d`** works, but Squarespace's own `.sqs-layout` containers sometimes reset stacking contexts. Test each 3D animation in context, not just in a local prototype.
6. **Custom CSS loads after Squarespace's stylesheet** — expect specificity battles. Use the browser inspector to identify the exact selector Squarespace uses, then match or beat it rather than using blanket `!important`.
7. **Mobile breakpoints:** Squarespace's Fluid Engine uses its own responsive grid system. Your custom CSS media queries must coexist with Squarespace's breakpoints (typically 767px for mobile). Test on actual mobile, not just desktop browser resize.

---

*Sources: Squarespace developer documentation (squarespace.com/developers), GSAP documentation (gsap.com), community resources (squarespaceexperts.com, css-tricks.com), knowledge current as of August 2025.*

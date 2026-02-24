# Pitfalls Research

**Domain:** Static portfolio site — GitHub Pages + raw HTML/CSS/JS + GSAP 3 + CSS 3D transforms
**Researched:** 2026-02-24
**Confidence:** HIGH (GitHub Pages behavior, GSAP API) / MEDIUM (CSS 3D mobile specifics — test required)

---

## Critical Pitfalls

### P-GH1 — File Path Case Sensitivity: Works on Windows, Breaks on GitHub Pages

**What goes wrong:**
You write `<img src="Images/Hero.jpg">` or `<link href="CSS/main.css">` on Windows. It works locally because Windows NTFS is case-insensitive. You push to GitHub Pages, which runs on Linux (case-sensitive). The file exists as `images/hero.jpg`. GitHub Pages returns a 404. The broken image or missing stylesheet is invisible until you look at the browser console on the live URL.

**Why it happens:**
Windows developers never encounter the problem locally. All file access "just works" regardless of case. The failure is silently deferred until deployment.

**How to avoid:**
Establish and strictly enforce a file naming convention before creating any files. Recommended: all lowercase, hyphens not underscores, no spaces. `images/hero-home.jpg`, `css/main.css`, `js/animations.js`. Never deviate. When copying filenames into HTML, copy-paste from the actual filename in your editor sidebar — do not retype them.

**Warning signs:**
- Any filename with an uppercase letter anywhere in `src`, `href`, `action`, or `url()` attributes
- Any path where the folder name case doesn't exactly match `href` case
- Images or stylesheets that load locally but 404 on the live site

**Phase to address:** Phase 1 (Foundation) — enforce the naming convention before any files are created. Document it as a project rule.

---

### P-GH2 — CNAME File Conflict After Custom Domain Setup

**What goes wrong:**
You configure a custom domain in GitHub Pages settings. GitHub creates (or expects) a `CNAME` file at the repository root containing the domain name. If you manually delete this file, rename it, accidentally overwrite it during a `git pull`, or create a second `CNAME` file, GitHub Pages stops serving on the custom domain. The site may fall back to the `username.github.io` URL or return no response. HTTPS provisioning via Let's Encrypt also fails or resets when the CNAME is missing or inconsistent.

**Why it happens:**
The `CNAME` file is not obviously critical — it looks like a text file containing one line. Developers don't treat it as infrastructure. It gets lost in merge operations or accidentally staged in a `git add .`.

**How to avoid:**
Treat the `CNAME` file as infrastructure, not content. Commit it once, add a comment in its git history noting its purpose, and never touch it again. If you use `git add .` to stage files, check `git status` before every commit to confirm CNAME has not been accidentally modified. Add a note in your repo README: "Do not delete or modify the CNAME file."

**Warning signs:**
- Custom domain suddenly showing as unverified in GitHub Pages settings
- Site unreachable at custom domain but reachable at `username.github.io`
- HTTPS certificate error after domain was previously working
- `CNAME` missing from repo root after any git operation

**Phase to address:** Phase 1 (Foundation — REQ-F09) — add CNAME to repo immediately after custom domain is configured. Mark it protected in your mental model.

---

### P-GH3 — HTTPS Certificate Not Automatically Provisioned

**What goes wrong:**
You set the custom domain in GitHub Pages settings and the CNAME DNS record points to GitHub. But `Enforce HTTPS` cannot be enabled — the checkbox is greyed out. This happens when DNS has not fully propagated or when the domain is configured as a root domain (apex domain like `origamigames.com`) using an A record instead of a CNAME. GitHub Pages uses Let's Encrypt for SSL certificates; provisioning takes up to 24 hours and fails if DNS is inconsistent during that window.

**Why it happens:**
Developers check HTTPS immediately after configuring DNS, find it greyed out, assume something is broken, make additional DNS changes, and reset the provisioning clock. The patience required (up to 24 hours) is unintuitive.

**How to avoid:**
Configure DNS correctly once and then wait. For apex domains, use four specific A records pointing to GitHub Pages IP addresses (documented in GitHub Pages docs). For `www` subdomains, use a CNAME. After configuring, do not make DNS changes for at least 24 hours. Verify propagation with a DNS checker before concluding something is wrong. Only then enable `Enforce HTTPS` in GitHub settings.

**Warning signs:**
- `Enforce HTTPS` greyed out immediately after setup (this is normal — wait)
- Multiple DNS records for the same subdomain/apex (conflict)
- Changing DNS providers mid-setup

**Phase to address:** Phase 1 (Foundation — REQ-F09). Allow a 24-hour window between DNS configuration and HTTPS verification.

---

### P-GH4 — 404 Page Behavior: No Server-Side Routing

**What goes wrong:**
GitHub Pages has no server-side routing. A URL like `origamigames.com/work/project-one` works only if the file `work/project-one/index.html` exists or `work/project-one.html` exists at exactly that path. There is no redirect, no fallback handler, no SPA routing. If someone bookmarks a URL or follows a shared link and the file at that path doesn't exist, they get GitHub's default `404.html` or a bare 404 page with no navigation back to your site.

**Why it happens:**
Developers who have used any framework (React, Vue, Next.js, even Squarespace) are accustomed to routing being handled. On GitHub Pages, the URL literally IS the file path.

**How to avoid:**
Use the `folder/index.html` pattern for every section. `/work/` should be `work/index.html`. `/about/` should be `about/index.html`. Never link to a URL that doesn't have a corresponding file. Create a custom `404.html` at the repo root with your site's nav and a friendly message — GitHub Pages serves this file when any path returns 404. Test all internal links before sharing any URL.

**Warning signs:**
- Any internal `href` that doesn't match an actual file path in the repo
- Linking to `/work` when the file is `work.html` (requires trailing slash handling)
- No custom `404.html` in the repo root

**Phase to address:** Phase 1 (Foundation — REQ-F07) for path structure; add custom `404.html` in Phase 1 or Phase 8 (Pre-Launch).

---

### P-GH5 — Relative vs. Absolute Paths: The Deep-Nesting Trap

**What goes wrong:**
Your CSS link works on the home page (`index.html`) at the repo root: `<link href="css/main.css">`. You create a project page at `work/project-one/index.html` and copy-paste the same link. It now resolves to `work/project-one/css/main.css`, which doesn't exist. The page renders with no styles. The same problem hits image `src` attributes, JS script paths, and navigation `href` links.

**Why it happens:**
Relative paths resolve relative to the current file's directory, not the repo root. Copy-pasting HTML between pages at different directory depths silently breaks paths.

**How to avoid:**
Use root-relative paths (starting with `/`) for all shared assets: `<link href="/css/main.css">`, `<script src="/js/animations.js">`. Root-relative paths always resolve from the site root regardless of how deeply nested the current HTML file is. The only exception: this does NOT work when opening HTML files directly in a browser from the filesystem (file:///) — you must use a local server (VS Code Live Server extension, Python `http.server`, etc.) to test root-relative paths correctly.

**Warning signs:**
- Any `src` or `href` that uses `../` to navigate up directories (brittle, breaks when files move)
- Styles or scripts that load on some pages but not others
- Nav links that work from the home page but break from a project sub-page

**Phase to address:** Phase 1 (Foundation) — establish the path convention in the base template before any pages are created.

---

### P-GSAP1 — GSAP/ScrollTrigger Loads After Inline Script Runs

**What goes wrong:**
You put the GSAP CDN `<script>` tag in the `<head>` and then immediately write a `<script>` block in the `<body>` that calls `gsap.to()` or registers a ScrollTrigger. If the CDN request is slow (network delay, CDN outage), the `gsap` variable is undefined when the inline script runs. You get `ReferenceError: gsap is not defined` in the console and no animations.

**Why it happens:**
Script execution order depends on network timing. The CDN `<script>` in `<head>` without `defer` blocks HTML parsing, but if the CDN is slow, scripts further down the page may try to use GSAP before it has loaded.

**How to avoid:**
Load GSAP and all GSAP plugins in the `<head>` with no `defer` or `async` attribute (this ensures sequential blocking load — GSAP is available when the rest of the page parses). Put all GSAP initialization code in a `DOMContentLoaded` event listener or at the bottom of `<body>`, after GSAP scripts. Never initialize GSAP animations inline in the middle of body HTML.

```html
<!-- In <head>: load GSAP synchronously so it's available -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>

<!-- At bottom of <body> or in external JS file: initialize -->
<script>
  gsap.registerPlugin(ScrollTrigger);
  document.addEventListener('DOMContentLoaded', function() {
    // All GSAP code here
  });
</script>
```

**Warning signs:**
- `ReferenceError: gsap is not defined` in browser console
- Animations work on fast connections but fail on slow/throttled connections
- ScrollTrigger not triggering on first page load

**Phase to address:** Phase 1 (Foundation — REQ-F04) — establish the correct loading pattern in the base template.

---

### P-GSAP2 — ScrollTrigger Calculates Wrong Positions on Page Load

**What goes wrong:**
ScrollTrigger calculates scroll positions and trigger points when the page loads. If images are not yet loaded, the page height is shorter than it will be once images fill in. All ScrollTrigger trigger points are calculated against a shorter page, so every animation fires too early or at the wrong scroll position. This is especially common with large hero images.

**Why it happens:**
`DOMContentLoaded` fires when HTML is parsed, not when images are loaded. If ScrollTrigger initializes at `DOMContentLoaded`, image heights are unknown. The page expands as images load, but ScrollTrigger's calculated positions do not update unless explicitly told to refresh.

**How to avoid:**
Initialize ScrollTrigger inside `window.addEventListener('load', ...)` rather than `DOMContentLoaded` — this fires after all images and resources are loaded. Alternatively, call `ScrollTrigger.refresh()` after the page's images have loaded. Also: set explicit `width` and `height` attributes on all `<img>` tags — this tells the browser how much space to reserve before the image loads, stabilizing layout early.

**Warning signs:**
- Scroll animations trigger too early (before the target element is in view)
- Pinned sections release at the wrong scroll position
- Animations work correctly after a page refresh (Cmd+Shift+R) but not on first load
- Page layout shifts visible as images load (also indicates missing width/height on images)

**Phase to address:** Phase 8 (Origami Fold Transitions — REQ-Anim01); verify during each phase that adds new images.

---

### P-GSAP3 — ScrollTrigger Does Not Re-Initialize on Page Navigation

**What goes wrong:**
On a static multi-page site, every page navigation is a full HTML document load. This is actually the correct behavior — unlike SPAs, there is no stale ScrollTrigger state from a previous page. However, the pitfall works in reverse: if you copy GSAP initialization code between pages and it has any state shared between pages (global variables, shared ScrollTrigger instances), those can conflict. More commonly: a ScrollTrigger animation that was built and tested on the home page stops working on a project page because the target element selectors don't exist on that page, generating silent console errors.

**Why it happens:**
Developers write GSAP initialization in a single shared JS file that runs on every page. Selectors like `#hero-fold` exist only on the home page. The code runs fine on the home page but generates `null` reference errors silently on all other pages.

**How to avoid:**
Write GSAP initialization code defensively. Before calling `gsap.to()` or registering a ScrollTrigger, check that the target element exists: `const hero = document.querySelector('#hero-fold'); if (hero) { /* animate it */ }`. Alternatively, organize JS so that page-specific animations live in page-specific `<script>` blocks at the bottom of that page's HTML, and only truly global behaviors (nav hover states, etc.) live in the shared JS file.

**Warning signs:**
- Console errors like `Cannot read properties of null` on any page
- Animations missing on specific pages when they should be present
- `ScrollTrigger` warning messages in console about missing targets

**Phase to address:** Phase 8 (Origami Fold Transitions); Phase 2 (Home/Landing) for initial pattern setup.

---

### P-GSAP4 — CSS `transform-style: preserve-3d` Not Applied to All Ancestors

**What goes wrong:**
You apply `transform-style: preserve-3d` to the element you want to fold. The 3D effect appears flat — it looks like a 2D rotation, not a genuine perspective fold. This happens because CSS 3D contexts require `transform-style: preserve-3d` on every ancestor element in the chain between the 3D-transformed element and the viewport. Any ancestor with `overflow: hidden`, `opacity` less than 1, `filter`, `will-change`, or `transform` resets the 3D context to flat, collapsing all child 3D transforms.

**Why it happens:**
The CSS 3D context inheritance rule is non-obvious. Developers apply `preserve-3d` to the target and expect it to work, but a parent element's default `overflow: hidden` (common on layout containers) silently flattens the 3D.

**How to avoid:**
When a 3D fold animation looks flat: inspect the element and all its ancestors in browser DevTools. Look for `overflow: hidden`, `opacity < 1`, `filter: any value`, `will-change`, or `backdrop-filter` on any ancestor. Remove or restructure these. The `.origami-wrapper` (or whatever contains the 3D scene) and all its ancestors up to the viewport need `transform-style: preserve-3d` or at minimum must avoid the listed flattening properties. Use a dedicated wrapper `<div>` with `perspective` set on it and `transform-style: preserve-3d` on its direct child that gets the GSAP transform applied.

**Warning signs:**
- 3D rotation appears as a flat 2D flip rather than a perspective fold
- The effect works in an isolated CodePen but not in the actual site layout
- Adding `overflow: hidden` to a layout container breaks the effect

**Phase to address:** Phase 8 (Origami Fold Transitions — REQ-Anim01). Test the isolated effect before integrating into the full page layout.

---

### P-GSAP5 — iOS Safari: 3D Transforms Flicker, Flash White, or Disappear

**What goes wrong:**
CSS 3D transforms with `rotateX()` or `rotateY()` on iOS Safari (particularly on older iPhones and iPads) cause the element to: flash white during animation, disappear entirely at certain rotation angles, show visible rendering artifacts (flickering, ghosting), or simply not animate smoothly. This is a known GPU compositing issue on iOS WebKit, not a code error.

**Why it happens:**
iOS Safari uses a separate GPU compositing path for 3D-transformed elements. When a large element (a full-page fold) is composited, the GPU layer creation can cause the existing content to temporarily disappear. Safari also applies a back-face visibility culling that can make elements invisible at exactly 90 degrees of rotation (the midpoint of a flip).

**How to avoid:**
Apply `backface-visibility: hidden` to elements being rotated in 3D — this prevents the invisible back face from showing but also prevents the white-flash on some devices. Add `-webkit-backface-visibility: hidden` for Safari. For the fold effect specifically: instead of rotating a single element from 0 to 180 degrees (which passes through 90-degree invisibility), use two panels — a "front" and a "back" — each rotating from 0 to 90 and from -90 to 0 respectively, with backface-visibility hidden on each. This simulates a true 3D card flip without passing through the problematic 90-degree angle on a single element.

Test on actual iOS Safari (real device or BrowserStack). Desktop browser resize is not a substitute. Safari's rendering engine on iOS differs from Safari on macOS.

**Warning signs:**
- White flash at the start or end of a rotation animation
- Element disappears at mid-animation point
- Animation that looks correct in Chrome mobile emulation but broken on iPhone Safari
- Jank or dropped frames visible during the fold transition on iPhone

**Phase to address:** Phase 8 (Origami Fold Transitions — REQ-Anim04). Requires real-device iOS Safari testing. Flag this as a mandatory pre-completion test.

---

### P-HTML1 — Nav/Footer Copy-Paste Drift Across Pages

**What goes wrong:**
You have 10 HTML pages. Each has a copied `<nav>` and `<footer>` block. You update the nav — add a link, fix a typo, change a label. You update it on the home page. You forget to update it on the about page, three project pages, and the writing page. Now navigation is inconsistent. Some pages have the old nav, some have the new one. Visitors notice. The site feels broken or unmaintained.

**Why it happens:**
Raw HTML has no component system. There is no shared nav file. Every change to a shared element must be made manually in every file. With 10 pages, even a single nav change requires 10 identical edits. One will be missed.

**How to avoid:**
Two strategies, in order of preference:

1. **Use JavaScript to inject nav/footer.** Write `nav.html` and `footer.html` as standalone HTML fragment files. In every page, add a placeholder `<div id="nav-placeholder"></div>` and a `<script>` that fetches and injects the fragment. This requires a local server to work during development (fetch() doesn't work on file:// URLs), but GitHub Pages serves files via HTTP so it works on the live site.

2. **If JavaScript injection feels too complex:** Accept the copy-paste pattern but create a formal checklist. Every time nav or footer is changed, the checklist lists every HTML file that must be updated. Never commit a nav/footer change without verifying all files.

Option 1 is strongly recommended. The 3rd time you forget to update the footer on one page, you will wish you had set this up in Phase 1.

**Warning signs:**
- Nav differs between any two pages (different items, different active states, different links)
- Footer on a project page has an outdated email address
- "Earlier Work" appears in nav on some pages but not others

**Phase to address:** Phase 1 (Foundation — REQ-F02). Decide on the injection vs. copy-paste strategy before creating any pages.

---

### P-HTML2 — `<title>` and `<meta>` Tags Forgotten on New Pages

**What goes wrong:**
You copy the base HTML template to create a new page. You forget to update the `<title>` tag, the `<meta name="description">` content, or both. Result: every page shows "Origami Games | Home" in the browser tab regardless of which page you're on. Browser history and bookmarks show confusing titles. Sharing the URL on LinkedIn or Discord shows the wrong preview description.

**Why it happens:**
The `<title>` and `<meta>` tags are at the top of the `<head>` block and are not visible in the viewport. When creating a new page, developers focus on the visible body content and forget the invisible metadata.

**How to avoid:**
In the base template, mark the title and description with a clear `<!-- UPDATE THIS -->` comment. Add the title and description as the first two items on the "new page checklist" (a checklist you write once and use every time you create an HTML file). Verify page titles across all pages before any URL is shared publicly.

**Warning signs:**
- Multiple browser tabs showing identical page titles
- Browser back button showing unhelpful history entries like "Origami Games | Home" for a project page
- LinkedIn/Slack unfurl previews showing wrong descriptions

**Phase to address:** Phase 1 (Foundation — REQ-F08, REQ-X06). Add explicit `<!-- UPDATE THIS -->` markers in the base template.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcode animation values in JS instead of CSS custom properties | Faster to write initially | Every timing or easing change requires editing JS, not CSS; owner cannot adjust without JS knowledge | Never — REQ-Anim06 requires CSS custom properties explicitly |
| Copy-paste full nav/footer HTML into every page | No JS fetch complexity, works on file:// | Every nav change requires editing all 10 pages; drift is inevitable by page 4 | Only if JS injection is confirmed too difficult; document the update checklist |
| Use `../` relative paths instead of root-relative `/` | Intuitive to write | Breaks silently when any file moves; harder to copy-paste between pages | Never — root-relative paths have no meaningful downside with a local server |
| Skip `width` and `height` attributes on `<img>` tags | Less HTML to write | Page layout shifts as images load; ScrollTrigger miscalculates positions | Never — always set image dimensions; use actual pixel values or aspect-ratio CSS |
| No custom `404.html` page | One less file to create | Dead-end experience for any broken link visitor | Never — a one-time 15-minute task |
| Inline all CSS in `<style>` blocks per page | No separate file management | Can't share styles between pages; making a global change requires editing every file | Never — use a shared `css/main.css` from day one |
| `git add .` for every commit | Faster staging | Risk of accidentally committing CNAME modification, OS cache files (.DS_Store), or sensitive content | Use sparingly; always check `git status` before committing |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| GSAP CDN (jsDelivr) | Loading with `async` or `defer` — GSAP may not be available when dependent scripts run | Load GSAP `<script>` tags without `async`/`defer` in `<head>`; put initialization code in `DOMContentLoaded` or at bottom of `<body>` |
| GSAP ScrollTrigger | Forgetting to call `gsap.registerPlugin(ScrollTrigger)` before using it | Add `gsap.registerPlugin(ScrollTrigger)` as the first line after GSAP loads, before any `ScrollTrigger.create()` calls |
| GitHub Pages custom domain | Configuring DNS before creating the `CNAME` file in the repo | Create `CNAME` file first, push it, then configure DNS; GitHub Pages reads the file to know which domain to accept |
| GitHub Pages + Let's Encrypt HTTPS | Making additional DNS changes while waiting for certificate provisioning | Configure DNS once, correctly, then wait up to 24 hours; do not make changes during the provisioning window |
| External embeds (itch.io iframes) | Embedding without `allow` attribute for fullscreen or gamepad APIs | Check itch.io embed code for required `allow` attributes; test the embed on the live GitHub Pages URL, not localhost (some cross-origin restrictions differ) |
| PDF downloads | Linking to a PDF without a download attribute | Use `<a href="/documents/design-brief.pdf" download>` for download intent; provide a descriptive `download` attribute filename |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Uncompressed hero images (3–10 MB per page) | Pages load slowly on mobile data; visible layout shift as image loads; Google PageSpeed score degraded | Compress all images to under 200 KB for hero images, under 100 KB for thumbnails; use WebP format with JPEG fallback | Immediately — even one 3 MB image makes a portfolio feel slow |
| GSAP animating `width`, `height`, `top`, `left` properties | Visible jank, low FPS during animation | Only animate `transform` and `opacity` — these are GPU-composited; never animate layout properties | Any device; worse on mobile |
| Animating too many elements simultaneously with ScrollTrigger | Scroll feels sluggish on mobile | Limit concurrent animations; simplify or remove animations on mobile viewports via `matchMedia` | Below ~768px viewport, older phones |
| No `will-change: transform` on animated elements | Minor jank at animation start as GPU layer is created mid-animation | Add `will-change: transform` to elements that will be GSAP-animated; remove it after animation completes to avoid memory overhead | Mostly affects mobile; subtle on desktop |
| Loading full GSAP bundle when only core is needed | Slightly larger download | Load only the plugins used: `gsap.min.js` + `ScrollTrigger.min.js` — do not load the full GSAP "all" bundle | Not critical at this scale, but good hygiene |

---

## Security Notes

This is a static site with no server-side code, user accounts, forms, or database. The security surface is very small. The relevant items:

| Item | Risk | Prevention |
|------|------|------------|
| Contact email displayed in plain text | Email scraped by spam harvesters | Acceptable tradeoff for a portfolio; consider `mailto:` link obfuscation if spam becomes an issue |
| External JS from CDN (jsDelivr) | CDN compromise would inject malicious code | Use Subresource Integrity (SRI) hash on CDN script tags — jsDelivr provides these; add `integrity` and `crossorigin` attributes to the `<script>` tags |
| Sensitive files accidentally committed | NDA project content, personal documents pushed to public repo | Check `.gitignore` before first commit; never store client files in the repo; use a separate private repo for NDA work |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Animations that block content visibility | Visitors wait for an animation to complete before seeing content; they bounce | REQ-Anim05 is explicit: content must be readable with JS disabled; animations are progressive enhancement only |
| No skip link for screen readers | Keyboard and screen reader users must tab through the entire nav on every page | Add `<a href="#main-content" class="skip-link">Skip to main content</a>` as first element in `<body>`; style it visible on focus |
| 3D fold transition on every page navigation | Navigation feels slow and theatrical; returning users find it annoying | Apply origami transitions only on key navigational moments (entering a project); use a faster or no transition for back-navigation |
| `target="_blank"` links without `rel="noopener"` | Minor security issue (opener access) and poor practice | All external links should use `target="_blank" rel="noopener noreferrer"` |
| Resume PDF opens in browser instead of downloading | Visitors lose their place on the page; some browsers struggle with large PDFs | Use `<a href="/resume.pdf" download="Rebecca-Resume.pdf">` to force download with a descriptive filename |

---

## "Looks Done But Isn't" Checklist

These items consistently appear complete but have a hidden gap that surfaces later.

- [ ] **HTTPS active:** GitHub Pages shows the custom domain as configured, but "Enforce HTTPS" is not yet checked — verify the checkbox is enabled, not just that the domain is listed
- [ ] **All internal links tested:** Every `href` in nav, footer, project cards, and cross-links resolves to a real page — open each in an incognito window and check the URL in the browser address bar
- [ ] **Images load on all pages:** Images that load on the home page may 404 on project pages due to path case or relative path issues — check every image on every page
- [ ] **GSAP registers ScrollTrigger:** If `gsap.registerPlugin(ScrollTrigger)` is missing, GSAP loads silently but ScrollTrigger has no effect — open DevTools console and confirm no warnings on every page that uses ScrollTrigger
- [ ] **`prefers-reduced-motion` is actually respected:** Add a temporary CSS rule that colors the background red when reduced-motion is active; enable reduced-motion in OS settings and verify the background turns red; remove the debug rule
- [ ] **Mobile nav works on iPhone Safari specifically:** Hamburger menu, tap targets, and any CSS hover states converted to tap states — test on real device or BrowserStack, not just Chrome DevTools device emulation
- [ ] **Resume PDF downloads correctly:** Click the PDF download link from the live site URL (not localhost) — some browsers handle PDF downloads differently depending on server headers; GitHub Pages serves correct `Content-Type` but verify it downloads rather than opening inline
- [ ] **Custom `404.html` is present and styled:** Navigate to `yourdomain.com/this-page-does-not-exist` — confirm your branded 404 page appears with navigation back to the site
- [ ] **Footer email link is correct:** `<a href="mailto:correct@email.com">` — the link text and the href email address should match; verify both
- [ ] **Page titles are unique across all pages:** Open all pages and look at the browser tab titles — each should be distinct and descriptive

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| File path case sensitivity — broken images/styles on live site | LOW | Rename files to lowercase in repo; update all references; push; verify on live site. Takes 15–60 minutes. |
| CNAME file lost — custom domain broken | LOW | Recreate `CNAME` file with domain name, commit, push; wait for GitHub Pages to redetect (5–10 minutes) |
| HTTPS certificate lost — site shows insecure | MEDIUM | Remove and re-add the custom domain in GitHub Pages settings; wait up to 24 hours for Let's Encrypt to provision; do not make DNS changes during this window |
| Nav/footer drift across pages | MEDIUM | If early: switch to JS injection pattern now. If late: do a full audit of every HTML file, update manually, document all files in a checklist for future |
| ScrollTrigger calculates wrong positions | LOW | Add `window.addEventListener('load', ...)` wrapper around ScrollTrigger init (instead of `DOMContentLoaded`); add `width`/`height` to all images |
| iOS Safari 3D transform flicker/flash | MEDIUM | Add `backface-visibility: hidden; -webkit-backface-visibility: hidden` to animated elements; if still broken, refactor to two-panel flip approach; allocate 2–4 hours for iOS-specific testing |
| GSAP animations not targeting elements correctly | LOW | Add null checks before every `gsap.to()` call; check console for null reference errors; move page-specific GSAP code from shared JS to page-specific `<script>` blocks |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| File path case sensitivity (P-GH1) | Phase 1 — establish naming convention | Run `git ls-files` and verify no uppercase letters in any filename; spot-check 3 paths on live site |
| CNAME conflict (P-GH2) | Phase 1 — commit CNAME immediately | `git log --all -- CNAME` confirms it exists and has not been modified since initial commit |
| HTTPS not provisioned (P-GH3) | Phase 1 — allow 24-hour window | Navigate to `https://yourdomain.com` — no certificate warning; `Enforce HTTPS` checkbox enabled in GitHub Pages settings |
| 404 routing / missing files (P-GH4) | Phase 1 — path structure; Phase 10 — full link audit | Create custom `404.html`; run link checker before any public URL sharing |
| Relative path deep-nesting (P-GH5) | Phase 1 — root-relative paths in base template | Open a project sub-page; confirm all CSS, JS, images, and nav links load correctly |
| GSAP CDN load order (P-GSAP1) | Phase 1 — base template script order | Open DevTools console on home page; no `gsap is not defined` errors |
| ScrollTrigger position miscalculation (P-GSAP2) | Phase 8 — animation implementation | Clear browser cache, hard reload; verify scroll animations trigger at correct scroll positions |
| GSAP null reference errors on wrong pages (P-GSAP3) | Phase 8 — animation JS organization | Open DevTools console on every page type; no null reference errors |
| CSS 3D context flattened by ancestor (P-GSAP4) | Phase 8 — origami fold implementation | Build fold in isolation first; then integrate into page layout; verify effect is still 3D |
| iOS Safari 3D flicker (P-GSAP5) | Phase 8 — MANDATORY real device test | Test on actual iPhone (real device or BrowserStack); not desktop Chrome DevTools |
| Nav/footer copy-paste drift (P-HTML1) | Phase 1 — choose injection strategy | After any nav change: open every HTML file, confirm nav matches; or use JS injection to eliminate the problem |
| Missing `<title>`/`<meta>` on new pages (P-HTML2) | Every phase that adds pages | Open each page; check browser tab title; verify it's unique and accurate |

---

## Sources

- GitHub Pages official documentation — custom domain setup, CNAME behavior, HTTPS provisioning, file serving behavior (confirmed against behavior known through August 2025; HIGH confidence)
- GSAP official documentation (gsap.com) — ScrollTrigger API, `registerPlugin`, `matchMedia`, `refresh()` behavior (HIGH confidence)
- CSS 3D transforms — MDN Web Docs — `transform-style`, `preserve-3d`, `backface-visibility`, stacking context flattening (HIGH confidence)
- iOS WebKit rendering behavior — known GPU compositing issues with CSS 3D transforms on iOS Safari — documented in WebKit bug tracker and community reports through 2025 (MEDIUM confidence — specific device behavior varies; real device testing required)
- Static multi-page HTML maintenance patterns — community consensus from web development discourse; copy-paste drift and path case issues are widely documented (HIGH confidence — these are fundamental to how static HTML works)

---

*Pitfalls research for: Static HTML portfolio — GitHub Pages + GSAP 3 + CSS 3D transforms*
*Researched: 2026-02-24*
*Replaces: Previous PITFALLS.md (Squarespace-focused — platform changed to GitHub Pages on 2026-02-24)*

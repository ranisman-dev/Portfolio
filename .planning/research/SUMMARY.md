# Project Research Summary

**Project:** Origami Games — Narrative and Experience Engineer Portfolio
**Domain:** Static personal portfolio — game design / narrative design
**Researched:** 2026-02-24
**Confidence:** HIGH (stack and architecture) / MEDIUM-HIGH (features and pitfalls)

## Executive Summary

This is a static personal portfolio for a narrative and experience designer whose brand is "Origami Games." The research converges on a clean, zero-dependency approach: raw HTML/CSS/JS served from GitHub Pages, GSAP 3 via CDN for origami fold animations, and no build tools for v1. This stack is appropriate precisely because the portfolio's credibility comes from case study quality and design philosophy, not from technical infrastructure sophistication. The recommended architecture is five CSS files, two JS files, and directory-per-page URL structure — simple enough for the owner to maintain without deep coding experience, opinionated enough to scale to 15 pages before requiring a migration to Eleventy.

The central finding from feature research is that the portfolio succeeds or fails on content, not code. A design philosophy statement must be drafted before any page copy is written — it is the throughline that makes the difference between a curated portfolio and an assembled one. Two complete 8-section case studies outperform ten lightly-documented project pages. The origami fold animations are a justified "extra" because they tie to the designer's thematic throughline (transformation, revelation, what lies beneath), but they are Phase 8 — added after all content pages are stable. Hiring managers decide in 10-30 seconds; any animation that blocks content access is an anti-feature.

The most impactful risks are infrastructure (file path case sensitivity on GitHub Pages, CNAME management, HTTPS provisioning timing) and CSS 3D on iOS Safari (overflow: hidden flattens preserve-3d; GPU compositing causes white-flash and element disappearance on real devices). Both categories are avoidable through disciplined conventions established in Phase 1 and mandatory real-device iOS Safari testing in Phase 8. The architecture is well-understood and patterns are consistent across all four research files — implementation risk is LOW for the foundation phases and MEDIUM for the GSAP 3D animation phase.

---

## Key Findings

### Recommended Stack

GitHub Pages serves the site directly from the repository root — pushing to `main` deploys automatically with no build step. A `.nojekyll` file disables Jekyll processing; a `CNAME` file (already committed) sets the custom domain. HTTPS is provisioned automatically via Let's Encrypt once DNS propagates (allow 24 hours). All paths use root-relative syntax (`/css/tokens.css`) so they resolve correctly from any directory depth.

GSAP 3.12.x (latest 3.x) loads via jsDelivr CDN using the `@3` tag, which auto-updates to latest 3.x patches. `ScrollTrigger` is the only plugin needed for v1 scroll-driven reveals; `Flip` is available on the free tier for future use. GSAP scripts load before `</body>` without `async` (which breaks execution order) to guarantee GSAP is available when animation code runs. jQuery, Three.js, AOS, and ScrollMagic are all explicitly ruled out.

**Core technologies:**
- Raw HTML5: Page structure — no build tools, deploy by pushing files, each page is a standalone document
- CSS3 + custom properties: Styling and animation tokens — all design values in `css/tokens.css`; GSAP reads durations from computed style so CSS and JS stay in sync
- Vanilla JavaScript (ES2020+): Interaction logic — `DOMContentLoaded` fires reliably on every full page load (no AJAX/SPA lifecycle concerns)
- GSAP 3 + ScrollTrigger (3.12.x via jsDelivr): Origami fold animations and scroll-driven reveals — best-in-class CSS 3D support, free tier, CDN-loadable
- GitHub Pages: Hosting — free, Git-native deployment, custom domain plus automatic HTTPS

**Migration path:** If the site grows past 15 pages, migrate to Eleventy — adds minimal complexity, templates are HTML-plus-mustache syntax, outputs a static `_site/` folder, requires no CDN or stack changes.

### Expected Features

**Must have — table stakes (P1, required for v1 launch):**
- Design philosophy statement written first, before any other copy — the throughline that makes the portfolio coherent
- Identity statement above the fold on the home page — hiring managers decide in 10-30 seconds; role and philosophy must be legible without scrolling
- Work index at `/work/` with 3-6 project cards (title, role, platform, one image)
- At least one complete 8-section case study — problem statement, process artifacts with annotation, honest reflection, outcome, throughline connection to philosophy
- About page with design philosophy, professional identity, resume PDF download, and `#contact` anchor
- Footer on every page with email link and nav echo
- Mobile-readable layout at 375px and 768px — verified on real devices, not just DevTools resize
- Resume PDF download (one click from About and footer)
- No broken links or placeholder text on any shared page

**Should have — differentiators (P2, add after template validation):**
- Second complete case study — once first template is validated by reviewer feedback
- Writing section with inline excerpts (not download-only PDFs) — critical for collaborator audience
- Origami fold GSAP 3D transitions — brand expression after all content pages are stable
- Throughline paragraph on each project page connecting it to the design philosophy
- Prev/next project navigation for low-friction portfolio scanning
- Annotated process artifacts in case studies (mood boards, dialogue trees, playtesting notes)

**Defer to v2+:**
- Earlier Work / Retrospectives section — requires rest of site identity to be solid first
- Design briefs as speculative work
- SEO and meta descriptions (portfolios are shared directly, not discovered via search)
- Analytics (add once public URL is live)
- Three.js / WebGL interactive demos (not needed for narrative design audience)

**Anti-features — explicitly avoid:**
- Splash or intro animation that blocks content access
- Password-protected work without NDA explanation
- Screenshots-only project pages with no case study
- Exhaustive archive giving equal weight to all projects (curation is the portfolio)
- Social feed embeds
- Generic resume-summary About page voice

### Architecture Approach

The site is a directory-per-page static HTML structure where each section (`/work/`, `/about/`, etc.) is a folder containing `index.html`. This produces clean URLs without `.html` extensions and survives slug changes without breaking parent pages. Five CSS files (tokens, base, layout, components, animations) loaded in order on every page form a lightweight design system — no preprocessor, no tree-shaking, estimated total CSS payload under 30KB unminified. Two JS files handle shared behavior: `nav.js` fetches and injects `_includes/nav.html` and `_includes/footer.html` at runtime (single source of truth for all navigation), and `animations.js` handles GSAP initialization with per-page guards. Every page uses a base HTML template copied verbatim; `<title>` and `<meta description>` are the only elements that change between copies.

**Major components:**
1. HTML page layer — standalone documents; each page is independently deployable; no shared JS state between pages (every navigation is a full browser load)
2. CSS token system (`tokens.css`) — single source of truth for all design values; GSAP animation durations read via `getComputedStyle` so CSS and JS stay in sync
3. JS fetch include (`nav.js` + `_includes/`) — nav and footer maintained in one file, injected at runtime; eliminates copy-paste drift across 10 pages
4. GSAP ScrollTrigger layer — initialized at bottom of `<body>` after DOM is parsed; guards against null targets on pages where animated elements do not exist; respects `prefers-reduced-motion` and viewport width via `matchMedia`
5. Assets hierarchy — images organized per section (`assets/images/work/[slug]/`), PDFs in `assets/pdfs/`, explicit `width` and `height` attributes on all images to prevent ScrollTrigger position miscalculation at page load

### Critical Pitfalls

1. **File path case sensitivity (P-GH1)** — Windows is case-insensitive; GitHub Pages runs Linux (case-sensitive). `Images/Hero.jpg` works locally, 404s on the live site. Prevention: establish all-lowercase-hyphen naming convention before creating any files in Phase 1; copy-paste filenames from editor sidebar rather than retyping; verify on live site after each deploy.

2. **CSS 3D context flattened by ancestor overflow and iOS Safari GPU issues (P-GSAP4 + P-GSAP5)** — `overflow: hidden` on any ancestor of a `preserve-3d` element silently flattens 3D transforms to 2D on all browsers. On iOS Safari specifically, GPU compositing also causes white-flash, ghosting, or element disappearance at 90-degree rotation midpoints. Prevention: never use `overflow: hidden` on parents of 3D-animated elements (use `clip-path` or `mask` instead); apply `backface-visibility: hidden; -webkit-backface-visibility: hidden` to animated elements; use the two-panel flip approach (front panel rotates 0 to -90, back panel rotates 90 to 0) to avoid the invisible-at-90-degrees issue; test on actual iOS Safari device before Phase 8 is marked complete.

3. **Nav/footer copy-paste drift (P-HTML1)** — 10 HTML pages with copied nav; one change requires editing all 10; one missed file produces inconsistent navigation. Prevention: implement JS fetch include pattern in Phase 1 (`_includes/nav.html` injected by `nav.js`) so nav has a single source of truth from day one.

4. **CNAME file loss breaks custom domain (P-GH2)** — CNAME file already exists in the repository; any `git add .` that accidentally stages a modification, or a merge that overwrites it, breaks the custom domain and resets HTTPS provisioning. Prevention: treat CNAME as infrastructure, never touch it, check `git status` before every commit.

5. **GSAP CDN load order causes silent failures (P-GSAP1)** — Loading GSAP with `async` breaks execution order; `ScrollTrigger.min.js` may execute before `gsap.min.js` is ready. Prevention: load GSAP without `async`; place all GSAP initialization code at the very bottom of `<body>` after the GSAP script tags; guard all GSAP code with `if (typeof gsap !== 'undefined')` to handle CDN outages gracefully.

---

## Implications for Roadmap

Based on cross-research dependency analysis, 10 phases are recommended. The critical ordering constraints are: (a) URL structure and CSS tokens must precede all content; (b) philosophy statement must precede all copy; (c) first case study template must be validated before replication; (d) GSAP animations are additive — added only after all content pages are stable; (e) cross-device polish and accessibility are verified continuously but formalized before launch.

### Phase 1: Foundation Scaffold
**Rationale:** Architecture research identifies 10 specific deliverables for a working scaffold — repo structure, URL patterns, CSS token system, JS fetch includes, GSAP CDN integration, custom domain and HTTPS. All subsequent phases add content to this scaffold. Six of the twelve documented pitfalls (P-GH1, P-GH2, P-GH3, P-GH5, P-GSAP1, P-HTML1) are resolved here or never become problems. Establishing root-relative paths, lowercase naming convention, and JS fetch includes in Phase 1 eliminates entire categories of maintenance debt.
**Delivers:** Repo with all placeholder pages live at correct URLs; CSS tokens defined; nav/footer injecting correctly on all pages; GSAP loading and available in console; HTTPS active on custom domain; 404.html present and branded.
**Addresses:** REQ-F01 through REQ-F09 (infrastructure requirements)
**Avoids:** P-GH1 (case sensitivity), P-GH2 (CNAME), P-GH3 (HTTPS timing), P-GH5 (relative paths), P-GSAP1 (load order), P-HTML1 (nav drift)

### Phase 2: Home / Landing Page
**Rationale:** The home page establishes the visual and tonal register for everything built after it and houses the philosophy statement that every other page references. Feature research is unambiguous: philosophy statement must be drafted before home page copy; identity above the fold is the highest-value single element on the site. The warm indie-internet aesthetic (typography tokens, color tokens, CSS gradient paper texture) is established here and governs all subsequent pages.
**Delivers:** Home page with identity statement above fold; philosophy statement; featured project cards (placeholders pointing to `/work/`); footer with email and nav echo. CSS aesthetic tokens finalized.
**Uses:** CSS token system, warm-palette indie aesthetic (Lora/Crimson Pro typography, `#fdf8f0` base, terracotta accent), GSAP-ready but no animations yet
**Implements:** Identity and philosophy layer — the written content that makes or breaks the portfolio

### Phase 3: Work Index + First Case Study
**Rationale:** The Work index URL (`/work/`) must be committed before any project sub-pages are created — this is architecture anti-pattern 5 (and pitfall P-GH4): creating project pages before the parent index means broken links if the index URL changes later. The first case study is built to the full 8-section structure (problem statement, process artifacts with annotation, outcome, reflection, throughline paragraph, prev/next navigation) and validated by a trusted reviewer before any other project pages are created. That first case study is the template.
**Delivers:** Work index at `/work/` with project cards; one complete 8-section case study at `/work/[slug]/`.
**Addresses:** Table stakes — case studies with visible process; problem statement hook; honest reflection; playable/viewable artifact link
**Avoids:** Architecture anti-pattern 5 (project pages before work index), P-GH4 (missing file 404), P-HTML2 (missing page titles on new pages)

### Phase 4: Additional Work Content
**Rationale:** Only after the Phase 3 template is validated by reviewer feedback does replication make sense. Feature research is explicit: build one, validate, then replicate — building all project pages in parallel without validating the template means reworking all of them if the template needs changes. Phase 4 adds 1-2 more case studies using the validated template, bringing the total to 2-3, and updates the home page featured cards to point to real pages.
**Delivers:** 2-3 total complete case studies; Work index updated with all cards; home page featured cards pointing to real project pages.
**Uses:** Validated case study template from Phase 3; no new patterns introduced

### Phase 5: Writing Section
**Rationale:** Writing is a primary work product for a narrative designer and a critical differentiator for the collaborator audience — the research identifies it as often more interesting to collaborators than the Work section. It requires curated samples with inline excerpts (not download-only PDFs) to be effective. The Writing section is built after Work because cross-links from project pages to writing samples require project pages to exist first, and the writing section gains credibility from contrast with the work.
**Delivers:** Writing section at `/writing/` with 2-3 curated samples; inline excerpts; cross-links to relevant project pages.
**Addresses:** Differentiator — writing as first-class artifact; collaborator audience pathway (Home → About → Writing → Work)

### Phase 6: Retrospectives / Earlier Work
**Rationale:** The "What I'd Change" retrospective framing is a genuine differentiator (rare in game design portfolios; signals intellectual honesty and growth mindset) but only makes sense once the rest of the site's identity is established. Feature research is explicit: retrospectives answer "where I came from" — this is only meaningful once "where I am" is clearly visible. This section is hidden from nav until content is ready. The framing must be confident, not apologetic.
**Delivers:** Earlier Work section at `/earlier-work/` with structured retrospective entries (description, design intent, what happened, what I'd change, what carried forward).
**Addresses:** Retrospective framing differentiator; solving the student-work inclusion problem without misrepresenting quality

### Phase 7: About + Contact
**Rationale:** About is built late in the content sequence because it is a synthesis of everything: it references the philosophy (Phase 2), points to the work (Phases 3-4), connects to the writing (Phase 5), and closes with the contact pathway. Feature research notes that for a narrative designer, the About page is evaluated as a writing sample — voice quality matters as much as information content. The `#contact` anchor and footer email have existed from Phase 1; Phase 7 builds the full About page and finalizes the resume PDF.
**Delivers:** Complete About page with design philosophy in personal voice; professional identity; resume PDF download; `#contact` section; nav "Contact" link pointing to `/about#contact`.
**Addresses:** Table stakes About page; resume PDF one-click access; three-audience information flow without explicit routing

### Phase 8: Origami Fold Transitions
**Rationale:** Animations are additive, not structural. Feature research is definitive: GSAP fold transitions are added only after all content pages are stable — animating placeholder content requires recalibration when content changes, and stable target elements are required for accurate ScrollTrigger positioning. This phase is the highest-risk phase technically: iOS Safari 3D issues (P-GSAP4, P-GSAP5) require real-device testing and may require the two-panel flip refactor. `prefers-reduced-motion` and mobile viewport fallbacks must be implemented before this phase is marked complete.
**Delivers:** Origami fold scroll reveals on project cards and key navigational moments; reduced-motion fallback (opacity/scale only, max 200ms duration); mobile fallback (opacity/scale below 768px via GSAP matchMedia); real iOS Safari device test completed and documented.
**Avoids:** P-GSAP2 (ScrollTrigger position miscalculation — initialize on `window.load` not `DOMContentLoaded` when images are present), P-GSAP3 (null reference errors — guard all GSAP selectors with existence checks), P-GSAP4 (3D context flattened by ancestor), P-GSAP5 (iOS Safari 3D flicker)
**Research flag:** This phase needs `/gsd:research-phase` — specific origami fold creative sequences and the iOS Safari two-panel flip implementation are technically specific and may need deeper research before implementation planning.

### Phase 9: Cross-Device Polish + Accessibility
**Rationale:** Mobile responsiveness is verified continuously (feature research specifies: test immediately after each phase, not deferred) but Phase 9 formalizes WCAG AA compliance, keyboard navigation, skip links, focus styles, alt text audit, and a complete cross-browser matrix. This phase is distinct because it requires all content to be present to audit completely.
**Delivers:** WCAG AA contrast ratios verified; all images have descriptive alt text; skip link present and visible on focus; focus styles visible and styled; keyboard navigation complete through all pages; mobile verified on 375px, 768px, and actual iOS Safari device.
**Addresses:** REQ-A01 through REQ-A05 (accessibility requirements)

### Phase 10: Pre-Launch Audit
**Rationale:** The final gate before the URL is shared publicly. Feature research is unambiguous: a portfolio with broken links, placeholder text, or inconsistent navigation signals carelessness — especially for an experience designer. The "Looks Done But Isn't" checklist from PITFALLS.md defines the verification set for this phase. Launching with fewer complete pages and excellent content outperforms launching more pages with any gaps.
**Delivers:** All internal links tested in incognito; page titles unique and descriptive across all pages; HTTPS active with "Enforce HTTPS" checkbox confirmed enabled; resume PDF downloads correctly from live URL; branded 404.html reachable via non-existent URL; footer email link correct and matches href; GSAP registers ScrollTrigger without console warnings on every animated page; `prefers-reduced-motion` verified by toggling OS setting.
**Avoids:** P-GH3 (HTTPS not enforced), P-GH4 (missing 404.html), P-HTML2 (missing page titles) — all items from the "Looks Done But Isn't" checklist

### Phase Ordering Rationale

- **Infrastructure before content:** Phase 1 locks in URL structure, CSS tokens, nav architecture, and GSAP loading pattern. Changing any of these after content exists is expensive — ripples through all HTML files.
- **Philosophy before copy:** Phase 2 (home page) establishes the written throughline. Phases 3-7 reference it. Reversing this order produces a portfolio where the philosophy feels retrofitted rather than foundational.
- **Template before replication:** Phase 3 validates one case study before Phase 4 replicates. This prevents rework across all project pages if the template needs changes.
- **Content before animation:** Phases 3-7 stabilize all content pages. Phase 8 adds GSAP transitions to stable targets. Animating placeholder or unstable content is wasteful and requires recalibration.
- **Continuous mobile testing:** Mobile verification is required after every phase that adds CSS or animation, not deferred to Phase 9. Phase 9 formalizes WCAG compliance and runs the complete audit.

### Research Flags

**Needs `/gsd:research-phase` during planning:**
- **Phase 8 (Origami Fold Transitions):** The two-panel CSS 3D flip implementation to avoid iOS Safari 90-degree invisibility is technically specific. The specific creative sequences for the "paper fold reveals content" brand metaphor also need design decisions. Recommend phase-specific research before implementation planning begins.

**Standard patterns — skip research-phase:**
- **Phase 1 (Foundation):** All patterns (GitHub Pages config, CSS tokens, JS fetch includes, GSAP CDN loading order) are documented at HIGH confidence in ARCHITECTURE.md and STACK.md. Implement directly from the patterns in those files.
- **Phase 2 (Home):** HTML/CSS implementation is standard. The hard work is writing the philosophy statement, not the code.
- **Phases 3-4 (Work Content):** Case study template structure is fully specified in FEATURES.md. No new technical patterns beyond Phase 1 scaffold.
- **Phases 5-7 (Writing, Retrospectives, About):** Content and standard HTML. No new technical complexity.
- **Phase 9 (Accessibility):** WCAG AA patterns are well-established. Standard checklist work.
- **Phase 10 (Pre-Launch Audit):** Checklist execution against the "Looks Done But Isn't" list from PITFALLS.md. No research needed.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | GitHub Pages, GSAP 3, CSS custom properties — all stable APIs with consistent documentation; GSAP version should be verified at cdn.jsdelivr.net/npm/gsap before deployment; GitHub Pages IP addresses should be verified at docs.github.com before DNS setup |
| Features | HIGH | Table stakes derived from consistent GDC and hiring manager discourse through August 2025; 8-section case study structure reflects industry consensus; anti-features are widely validated; indie internet aesthetic CSS patterns are community-verified |
| Architecture | HIGH | Static HTML patterns are fundamental web platform behavior; GSAP v3 ScrollTrigger API is stable and well-documented (HIGH confidence from official docs); CSS multi-file architecture and JS fetch include pattern are established and tested on GitHub Pages |
| Pitfalls | HIGH (infrastructure) / MEDIUM (iOS Safari 3D) | GitHub Pages pitfalls are well-documented and deterministic; GSAP load order is from official docs; iOS Safari 3D GPU compositing behavior is documented through 2025 but device-specific — real device testing required for final verification |

**Overall confidence:** HIGH

### Gaps to Address

- **iOS Safari 3D behavior on current devices:** The `overflow: hidden` flattening of `preserve-3d` and GPU compositing white-flash are documented through August 2025, but Apple may have patched specific issues in recent WebKit updates. The two-panel flip approach is a reliable workaround regardless of Apple's patch status. Verify behavior and apply workarounds during Phase 8.
- **Current GSAP version:** `3.12.5` is the latest 3.x as of August 2025. Verify the current patch version at `https://cdn.jsdelivr.net/npm/gsap` before Phase 1 implementation.
- **GitHub Pages IP addresses:** The four A record IP addresses (`185.199.108-111.153`) should be verified against current GitHub Pages documentation at `docs.github.com/en/pages` before Phase 1 DNS configuration.
- **Origami fold animation sequences:** The research establishes the CSS 3D scaffold, the two-panel flip technique, and the reduced-motion/mobile fallback patterns, but the specific creative sequences for the "paper folds to reveal content" brand metaphor need design decisions. These are content and aesthetic decisions, not technical ones — they should be made during Phase 8 planning.

---

## Sources

### Primary (HIGH confidence)
- GSAP v3 official documentation (gsap.com) — ScrollTrigger API, `registerPlugin`, `matchMedia`, `defer` loading pattern, CSS 3D transform properties, plugin registration order
- GitHub Pages official documentation (docs.github.com/en/pages) — CNAME configuration, `.nojekyll`, custom domain DNS records, HTTPS enforcement via Let's Encrypt
- MDN Web Docs — CSS `transform-style`, `perspective`, `backface-visibility`, `DOMContentLoaded` vs `window.load` timing, `defer` attribute execution order per HTML Living Standard
- REQUIREMENTS.md and PROJECT.md (this project) — feature scope, platform constraints, v1 definition

### Secondary (MEDIUM-HIGH confidence)
- Game design portfolio discourse — GDC talks, narrative design community (Narrative Design Slack, Writers Guild), hiring manager feedback through August 2025 — table stakes features, case study structure, anti-features
- UX patterns for creative portfolios — information architecture for dual-audience sites, 5-item navigation patterns, case study readability research
- jsDelivr CDN `@3` version pinning convention — community-verified stable pattern

### Tertiary (MEDIUM confidence)
- Indie internet aesthetic CSS patterns — community-documented frontend patterns; specific implementation choices should be tested against WCAG AA contrast requirements before finalizing
- iOS WebKit CSS 3D GPU compositing behavior — documented in WebKit bug tracker and community reports through August 2025; device-specific behavior requires real-device verification in Phase 8

---

*Research completed: 2026-02-24*
*Updated from 2026-02-23 version: platform changed from Squarespace to GitHub Pages; all Squarespace-specific content replaced with GitHub Pages static HTML architecture*
*Ready for roadmap: yes*

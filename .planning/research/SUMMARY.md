# Project Research Summary

**Project:** Origami Games — Narrative & Experience Engineer Portfolio
**Domain:** Personal portfolio / game design / narrative design
**Researched:** 2026-02-23
**Confidence:** HIGH

## Executive Summary

This is a Squarespace-hosted personal portfolio for a narrative and experience designer whose work centers on player well-being, pressure, and meaning. Experts in this space build portfolios on two pillars: a clear, opinionated design philosophy stated immediately (before any project work is shown), and case studies that make design thinking visible rather than just documenting outcomes. The recommended approach is Squarespace 7.1 Business plan with the Paloma or Hester template, GSAP 3 + ScrollTrigger via CDN for origami fold animations, and a content-first architecture organized around three distinct visitor paths (studios, collaborators, freelance clients). The origami aesthetic is not mere decoration — when tied explicitly to the designer's throughline of transformation and revelation, it becomes a brand element that reinforces the work's meaning.

The key risk is building in the wrong order: most portfolio failures in this domain happen when the technical implementation or project page content gets built before the design philosophy is articulated. Every piece of copy — the home headline, the About page, each case study hook — must flow from a written philosophy statement that should be drafted first, before any Squarespace template is touched. A secondary risk is scope creep: the v1 "linkable and professional" goal is correctly constrained, and the single biggest threat to it is launching with incomplete sections that signal a work-in-progress rather than a working designer.

The third risk is platform-specific: Squarespace's AJAX navigation breaks standard DOM events, its internal `.sqs-*` class structure can silently break CSS overrides on platform updates, and GSAP 3D transforms degrade on mobile without explicit fallbacks. All three are well-documented and preventable with the right initialization patterns, but they must be built in from the start rather than patched later.

---

## Key Findings

### Recommended Stack

Squarespace 7.1 on the Business plan ($23/month) is the only viable foundation for a portfolio with meaningful custom JS — the Personal plan lacks code injection, which is required for GSAP. Within 7.1, the Paloma template is the primary recommendation: minimal chrome, strong image display, and low CSS override burden. Hester is an acceptable alternative if the portfolio leans visually dramatic. All custom CSS goes into the Design > Custom CSS panel (site-wide) plus per-page Code Blocks for page-specific overrides. All JS is injected via Footer Code Injection for reliable DOM access, with GSAP loaded via CDN in the Header injection.

The local development workflow is paste-based (no build tools): write CSS/JS locally in a version-controlled repo, prototype against a local HTML harness using Squarespace's `.sqs-*` class names, then paste final code into the appropriate injection points. This is the correct approach — there is no build pipeline on Squarespace, and any solution requiring Node.js, npm, or a bundler is incompatible with the platform.

**Core technologies:**
- **Squarespace 7.1 (Business plan):** Platform — only version with template flexibility, Fluid Engine, and code injection support
- **Paloma template:** Base aesthetic — minimal chrome, low CSS override burden, strong image/hero sections
- **GSAP 3 + ScrollTrigger (CDN via jsDelivr):** Animation — best-in-class CSS 3D support, scroll-driven timelines, free tier sufficient, well-documented Squarespace compatibility
- **Pure CSS 3D transforms (`transform-style: preserve-3d`, `perspective`, `rotationX/Y`):** Origami effects — no WebGL dependency, performant in modern browsers, GSAP controls the timeline
- **Local Git repo (custom CSS/JS files):** Version control — Squarespace has no version history for injected code; this is a non-negotiable safety layer

### Expected Features

**Must have (table stakes):**
- Immediate identity + philosophy statement above the fold — visitors need to know who this is and what they stand for within 5 seconds
- 1-2 complete case studies with visible design process — hiring managers care about how you think, not just what shipped
- At least one playable or viewable artifact (itch.io link, embedded video, or build) — "show don't tell" is non-negotiable in game design portfolios
- About page framing design philosophy, professional identity, and contact pathway — this is also a writing sample for a narrative designer
- Contact accessible within two clicks from any page — friction kills leads
- Self-evident navigation (Work, Writing, About) — no cryptic labels
- Mobile responsiveness verified after every custom CSS/JS injection

**Should have (competitive differentiators):**
- Explicit design philosophy statement — most game design portfolios show work without arguing for a worldview; this is the single strongest differentiator for a narrative/experience designer
- Writing samples as standalone work in a dedicated Writing section — narrative designers who treat writing as a primary artifact (not just support documentation) signal higher craft
- "What I'd Change" retrospectives on earlier work — rare in game design portfolios; signals intellectual honesty and growth mindset; requires its own section, not a footnote
- Annotated process artifacts within case studies — raw artifacts without annotation are noise; annotated artifacts are evidence of a working designer's mind
- Origami fold transitions tied to brand meaning — the transition should connect to the designer's throughline (transformation, revelation, what lies beneath) rather than being applied as decoration
- Audience-specific information architecture — studios, collaborators, and clients each have a natural path through the site without explicit routing prompts

**Defer to v2+:**
- Full Writing section (launch hidden from nav until content is ready)
- Earlier Work / Retrospectives section (launch hidden from nav until content is ready)
- Design briefs as speculative work (strong differentiator but not needed for v1 "linkable" goal)
- SEO optimization (game design portfolios are shared directly, not discovered via search)
- Social feed integration (actively avoid — introduces noise and platform dependency)

### Architecture Approach

The site uses Squarespace's native page type system mapped deliberately to portfolio needs: a Portfolio Page for the Work index (with sub-pages per project), Regular Pages for Home/About/Contact, and a second Portfolio Page for Earlier Work/Retrospectives. The Home page displays featured project cards via Squarespace Summary Blocks pointed at the Work Portfolio collection — no manual duplication. Navigation is minimal (5 items max: Home, Work, Writing, Earlier Work, About) with Contact as a section within About for v1. The information hierarchy is strict: identity + philosophy first (Home, above the fold), proof of craft second (Work/project pages), voice and thinking third (Writing + Retrospectives), and the human fourth (About + Contact).

**Major components:**
1. **Home page** — identity + philosophy statement hero, featured project cards (Summary Blocks), footer; the highest-value real estate; built before any other content
2. **Work Portfolio + project sub-pages** — curated to 3-6 projects; each project page follows a fixed template (title block, summary, design challenge, process, outcome, reflection, attached writing, nav footer); Work page slug `/work` must be locked before first project is published
3. **Project page template** — the first project page is the template for all others; validate with trusted reviewers before replicating; equalizes depth between shipped and unshipped work
4. **About page** — philosophy made personal; also functions as a writing sample; includes resume PDF download; links to Work and Contact
5. **Writing section** — standalone writing samples with inline excerpts (not download-only PDFs); built after Work is populated
6. **Earlier Work / Retrospectives section** — structured as: project description → design intent → what happened → what to change → what carried forward; built last; requires the rest of the site's identity to be established first
7. **GSAP animation layer** — loaded site-wide via CDN; initialized in Footer Code Injection; re-initialized on Squarespace AJAX navigation events; mobile fallbacks via `matchMedia()` and `prefers-reduced-motion`

### Critical Pitfalls

1. **Leading with work before establishing identity (P1.1)** — The home page must open with the design philosophy statement, not a project grid. Prevent by wireframing the home page hero section before building anything else, and writing the philosophy statement before writing any other copy.

2. **GSAP animations degrade on mobile (P3.4)** — 3D CSS transforms are GPU-accelerated but still fail on mobile GPUs. Prevent by using GSAP `matchMedia()` to conditionally apply full origami animations only above tablet width, replacing them with simple opacity/scale fades on mobile. Also implement `prefers-reduced-motion`. Test on actual iOS Safari, not just desktop browser resize.

3. **JavaScript injected before DOM ready (P3.3)** — Header-injected scripts run before page content is parsed. Prevent by loading GSAP CDN in the header (so it's available early) but initializing all ScrollTrigger and animation logic in Footer Code Injection or inside `DOMContentLoaded`. Also handle Squarespace's AJAX navigation lifecycle — standard `DOMContentLoaded` does not fire on subsequent page navigations.

4. **Case studies that describe instead of analyze (P1.3)** — Case study text narrates what happened rather than articulating design thinking. Prevent by drafting a brief for each project that answers three questions before writing the case study: What was the design problem? What didn't work? What decision mattered most and why?

5. **Animation as decoration rather than brand expression (P5.1)** — Origami transitions applied to every interaction without semantic connection to the site's meaning create friction without payoff. Prevent by defining the origami metaphor explicitly (transformation, what lies beneath the fold) in the About page or visual language documentation, and applying transitions selectively on key navigational moments rather than every scroll event.

---

## Implications for Roadmap

Based on combined research across all four dimensions, the correct build order is philosophy-first, structure-second, content-third, polish-fourth. Dependencies are strict: the design philosophy must be written before any copy; the home page hero must be built before any project page; the first project page must be validated before replicating the template; and Writing/Retrospectives sections must be hidden from nav until content is ready.

### Phase 1: Foundation and Philosophy
**Rationale:** The design philosophy is the load-bearing element of the entire portfolio. Every other piece of copy, every case study hook, the About page framing, and the home headline all flow from it. Building Squarespace infrastructure before this is written results in incoherent sites. This phase also sets the platform constraints that all subsequent phases operate within.
**Delivers:** Written design philosophy statement; Squarespace site created with correct template, plan, navigation structure, and code injection points configured; site-wide typography, color, and spacing defined; GSAP loaded via CDN in header; local Git repo for version control
**Addresses:** Identity statement (table stakes #1), design philosophy differentiator (D1), navigation clarity (table stakes #5)
**Avoids:** P1.1 (leading with work before identity), P3.1 (template that fights design vision), P5.2 (expressive design that becomes illegible), P2.1 (navigation labels that require explanation)

### Phase 2: Home Page
**Rationale:** The home page is the highest-value real estate on the site and sets the visual and tonal register for everything built after it. It must be right before any project pages exist, because project cards on the home page (via Summary Blocks) will inherit the visual language established here. Building this second also means the philosophy statement (Phase 1) can be immediately applied to its primary location.
**Delivers:** Hero section (name + philosophy statement + atmospheric visual), placeholder featured project cards (via Summary Blocks), footer with contact link and nav echo
**Uses:** GSAP for hero section animation (if any), Squarespace Summary Blocks for project card display
**Implements:** Identity + philosophy hierarchy (first tier in information architecture), home page structure from ARCHITECTURE.md
**Avoids:** P5.1 (animation as decoration), P2.3 (contact too hard to find)

### Phase 3: Work Index and First Project Page
**Rationale:** The Work Portfolio page and first case study are the core credibility engine. One complete project page must exist before the URL is shared — it is the primary thing a hiring manager clicks through to. The first project page is also the template for all subsequent project pages; validate it before replicating. The Work page slug must be locked at this stage.
**Delivers:** Work Portfolio index page at `/work`; one complete case study with title block, design challenge, process documentation (including visual artifacts), outcome, reflection, and navigation footer; project page template validated by trusted reviewers
**Addresses:** Case studies with process visibility (table stakes #2), playable/viewable work (table stakes #3)
**Avoids:** P2.2 (project pages with no reading path), P4.1 (prototypes without design context), P4.3 (no throughline connecting projects), P4.4 (shipped vs. designed treated differently), P1.3 (case studies that describe not analyze)

### Phase 4: About Page and Contact
**Rationale:** About benefits from knowing the Work is in place — the About narrative can reference specific projects, and the contrast between "here's what I made" (Work) and "here's why I make it" (About) is stronger when both exist. Contact is simplest as a section within About for v1. This phase completes the v1 minimum viable site.
**Delivers:** About page with design philosophy (personal framing), professional identity, credits/resume PDF, design throughline, and contact section; v1 site is now linkable and professional
**Addresses:** About page (table stakes #8), contact pathway (table stakes #4), audience-specific entry points (D6)
**Avoids:** P1.4 (failing to serve multiple audiences), P2.3 (contact too hard to find), anti-feature A6 (generic About page without design voice)

### Phase 5: Second Case Study and Mobile Validation
**Rationale:** A single case study is the minimum viable portfolio; two is the minimum professional portfolio. The second project page can be built faster by replicating the validated template from Phase 3. Mobile validation belongs here as a dedicated step because GSAP 3D transforms on Squarespace are mobile-specific failure points that must be caught before the URL is shared widely.
**Delivers:** Second complete case study; mobile validation pass across all pages; `prefers-reduced-motion` implemented; `matchMedia()` fallbacks for origami animations on mobile viewports
**Avoids:** P3.4 (GSAP animations degrade on mobile), anti-feature A4 (work-in-progress public site)

### Phase 6: Writing Section
**Rationale:** The Writing section is a strong differentiator for a narrative designer but requires real content to be more than a placeholder. It is appropriately deferred until Work and About are solid. Each writing sample needs an inline excerpt (not download-only) before launch.
**Delivers:** Writing index page; 2-3 curated writing samples with inline excerpts and clearly labeled download options; cross-links from relevant project pages to writing samples
**Addresses:** Writing samples as standalone work (D2), embedded/linked writing within project pages (D8)
**Avoids:** P4.2 (writing samples as unpreviewable PDFs)

### Phase 7: Earlier Work / Retrospectives
**Rationale:** Retrospectives require the most careful framing and benefit from having the rest of the site's identity established. They are built last because they answer "where have I come from" — a question that makes more sense once "where I am and where I'm going" is fully visible. The section must feel confident, not apologetic.
**Delivers:** Earlier Work / Retrospectives section with 2-3 entries following the structured retrospective format (project description → design intent → what happened → what to change → what carried forward)
**Addresses:** Retrospective differentiator (D3), earlier work handling (FEATURES.md N3)
**Avoids:** P1.5 (burying/mishandling school work)

### Phase 8: Polish and Cross-Linking
**Rationale:** Cross-linking, SEO basics, and final visual polish are genuinely last — not because they don't matter but because they can only be done correctly once all pages exist.
**Delivers:** Cross-linking audit (Home → Projects → About → Contact → all); alt text on all images; page titles and meta descriptions; custom domain connected; final CSS cleanup; documentation comments in all injected code
**Avoids:** P3.2 (CSS that breaks on platform updates), P3.5 (code too complex for owner to maintain)

### Phase Ordering Rationale

- **Philosophy before structure, structure before content:** The single most common failure mode in game design portfolios (confirmed by FEATURES.md, PITFALLS.md, and ARCHITECTURE.md independently) is building infrastructure before the philosophy is articulated. The dependency is non-negotiable.
- **Home before project pages:** The home page sets the visual and tonal register. Building project pages first means reworking them after the home page establishes the template.
- **First project page as template, validated before replication:** Building one and validating it saves rework on all subsequent pages. ARCHITECTURE.md is explicit about this.
- **Writing and Retrospectives after Work:** These sections gain credibility from the contrast with Work. Launching them empty or with minimal content undermines their differentiating purpose.
- **Mobile as a dedicated phase step, not a final check:** PITFALLS.md is clear that GSAP 3D transforms fail silently on mobile. Each phase that adds animation should include a mobile check; Phase 5 is the formal validation before wider URL sharing.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1 (template selection):** STACK.md recommends Paloma/Hester but acknowledges the need to test with custom CSS injected before committing. Template behavior with specific origami CSS needs hands-on validation.
- **Phase 3 (GSAP + Squarespace AJAX):** The AJAX navigation lifecycle (`hashchange`, `Squarespace.afterBodyLoad`) should be tested against the current Squarespace 7.1 build before ScrollTrigger initialization patterns are finalized. Platform behavior may have changed since August 2025.
- **Phase 6 (PDF embeds):** ARCHITECTURE.md notes Squarespace supports PDF embedding via file blocks or embeds "with some configuration" — the specific configuration method should be confirmed during implementation.

Phases with standard patterns (skip research-phase):
- **Phase 2 (Home page):** Standard Squarespace block layout; Summary Blocks are well-documented; GSAP hero animations are straightforward.
- **Phase 4 (About + Contact):** Standard Squarespace pages; contact form is a native block; no custom animation required.
- **Phase 8 (Polish):** CSS cleanup, alt text, meta descriptions, and cross-linking are standard and well-documented.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Squarespace 7.1 + GSAP 3 is a well-documented combination; platform requirements (Business plan, CDN injection) are confirmed against official Squarespace documentation; GSAP compatibility is confirmed by community consensus |
| Features | HIGH | Findings reflect strong consensus from game industry hiring discourse and narrative design community; the table stakes and differentiators are consistent across multiple independent sources |
| Architecture | HIGH | Page type mapping (Portfolio Page for Work, Regular Page for Home/About) is confirmed against Squarespace 7.1 capabilities; information hierarchy and build order align with both STACK.md and FEATURES.md independently |
| Pitfalls | MEDIUM-HIGH | Platform-specific pitfalls (P3.x) are confirmed against Squarespace developer documentation; content strategy pitfalls (P1.x, P4.x) reflect community consensus; animation pitfalls (P3.4, P5.1) are informed by known GPU behavior rather than direct testing |

**Overall confidence:** HIGH

### Gaps to Address

- **Squarespace AJAX navigation event API:** The exact event names (`Squarespace.afterBodyLoad`, `squarespace:ready`) and their reliability in current Squarespace 7.1 should be confirmed during Phase 3 implementation. The August 2025 knowledge cutoff means minor platform API changes are possible.
- **Template CSS override burden in practice:** STACK.md recommends Paloma/Hester based on documented behavior, but actual CSS specificity battles with the origami fold CSS should be tested in a real Squarespace environment before committing to a template. Allocate time for this in Phase 1.
- **Writing section page type decision:** ARCHITECTURE.md flags the choice between a Portfolio Page (visual card grid) vs. a Regular Page with a styled list for the Writing section as a decision that should be made at content inventory time. This should be resolved before Phase 6 begins.
- **PDF embed configuration:** Squarespace's PDF embedding capability is noted as requiring "some configuration" without a specific method documented. Confirm the current implementation path (file block, embed code block, or external link) during Phase 6 planning.

---

## Sources

### Primary (HIGH confidence)
- Squarespace developer documentation (squarespace.com/developers) — platform capabilities, page types, code injection points, plan requirements
- GSAP documentation (gsap.com) — ScrollTrigger API, `matchMedia()` context, CSS 3D transform support

### Secondary (MEDIUM confidence)
- Game industry hiring discourse and portfolio review feedback from GDC, narrative design community, game design education contexts (through August 2025) — table stakes, differentiators, case study standards
- Squarespace community resources (squarespaceexperts.com, CSS-Tricks) — GSAP + Squarespace AJAX navigation patterns, CSS specificity workarounds

### Tertiary (LOW confidence — confirm during implementation)
- Inferred from platform update patterns — CSS targeting `.sqs-*` class stability; should be validated against current Squarespace 7.1 build
- Inferred from GPU rendering behavior — GSAP 3D transform mobile performance; should be tested on actual iOS Safari before finalizing animation implementation

---

*Research completed: 2026-02-23*
*Ready for roadmap: yes*

# Roadmap: Origami Games Portfolio

## Overview

Ten phases take the Origami Games portfolio from an empty repository to a
linkable, professional site that communicates identity and design philosophy before any case
study is read. The build order is strict: infrastructure and CSS tokens before any content;
philosophy statement before any page copy; first case study template validated before
replication; GSAP fold transitions applied only after all content pages are stable. The
site's job at v1 is to not embarrass itself when someone clicks through from a job
application — not to be comprehensive.

Platform: Netlify (auto-deploys from GitHub `main` branch — raw HTML/CSS/JS, no build tools,
no static site generator). GSAP 3 + ScrollTrigger via jsDelivr CDN.

---

## Phases

**Phase Numbering:**
- Integer phases (1–10): Planned v1 milestone work
- Decimal phases (e.g., 2.1): Urgent insertions created via `/gsd:insert-phase`

- [ ] **Phase 1: Foundation Scaffold** - Netlify configured, CSS tokens defined, JS fetch includes, GSAP CDN loaded, placeholder pages at correct URLs, HTTPS active
- [ ] **Phase 2: Home / Landing** - Philosophy statement above fold, featured project cards, footer with email and nav echo — visual and tonal register established
- [ ] **Phase 3: Work Index + First Case Study** - `/work/` URL locked, one complete 8-section case study built and validated as the template for all subsequent project pages
- [ ] **Phase 4: Additional Work Content** - 2–3 total case studies from the validated Phase 3 template; home page cards updated to real projects
- [ ] **Phase 5: Writing Section** - Writing section at `/writing/` with inline excerpts; cross-linked from project pages
- [ ] **Phase 6: Retrospectives / Earlier Work** - Earlier Work section at `/earlier-work/` with "What I'd Change" framing; added to nav in this phase
- [ ] **Phase 7: About + Contact** - About page in design voice; resume PDF; `/about#contact` anchor; contact pathway tested end-to-end
- [ ] **Phase 8: Origami Fold Transitions** - GSAP 3D fold transitions on key navigational moments; reduced-motion and mobile fallbacks in place; real iOS Safari device test required (NOTE: run `/gsd:research-phase 8` before planning this phase)
- [ ] **Phase 9: Cross-Device Polish + Accessibility** - WCAG AA verified, keyboard nav, alt text audit, mobile tested at 375px and 768px, meta titles and descriptions set
- [ ] **Phase 10: Pre-Launch Audit** - All links resolve, no placeholder text, external links verified, domain + HTTPS confirmed, "Looks Done But Isn't" checklist passed

---

## Phase Details

### Phase 1: Foundation Scaffold
**Goal**: All infrastructure that every subsequent phase depends on is in place — Netlify
serving the custom domain over HTTPS, correct URL structure locked in before any content is
created, CSS tokens defined, nav injected from a single source of truth, GSAP available in
the browser console, and placeholder pages at every destination so no URL ever 404s.

**Depends on**: Nothing (first phase)

**Requirements**: REQ-F01, REQ-F02, REQ-F03, REQ-F04, REQ-F05, REQ-F06, REQ-F07, REQ-F08,
REQ-F09, REQ-N01, REQ-N03

**Success Criteria** (what must be TRUE):
  1. The site loads at the custom domain with HTTPS active (padlock visible) and shows "Origami Games" or the designer's name in the browser tab — no Netlify default page
  2. All five nav destinations (Home, Work, Writing, About, and the Contact anchor) are reachable — clicking each nav item loads a page that exists, even if it only has a skeleton structure
  3. Opening browser DevTools on any page shows GSAP and ScrollTrigger loaded with no console errors, and `typeof gsap` returns `'object'`
  4. The CSS tokens file (`/css/tokens.css`) is loaded on every page — changing `--color-accent` in that file visibly changes the accent color across the whole site after one deploy
  5. The nav and footer are maintained in `_includes/` and injected by `nav.js` — editing `_includes/nav.html` once updates every page

**Plans**: 4 plans

Plans:
- [x] 01-01-PLAN.md — Repo directory structure and CSS design token system
- [x] 01-02-PLAN.md — HTML skeleton pages and _includes/ nav/footer markup
- [x] 01-03-PLAN.md — JS fetch-inject nav + GSAP init stub + local browser verification
- [ ] 01-04-PLAN.md — Netlify deploy, custom domain DNS, and HTTPS verification

---

### Phase 2: Home / Landing
**Goal**: A visitor who lands on the home page understands who this designer is and what she
stands for before reading a single case study. The page establishes the visual and tonal
register — warm, indie-internet, cozy, personal — that every subsequent page inherits.

**Depends on**: Phase 1

**Requirements**: REQ-H01, REQ-H02, REQ-H03, REQ-H04, REQ-H05, REQ-H06, REQ-N02, REQ-N04

**Success Criteria** (what must be TRUE):
  1. A visitor landing on the home page can read the designer's name, role/title, and the full philosophy statement without scrolling on a 1280px desktop viewport
  2. Two or three project cards are visible on the home page — each card links directly to its project page, not to the Work index
  3. The footer appears on the home page and contains a working email link, a LinkedIn link, and a resume PDF download link
  4. Contact is reachable in 2 clicks from any point on the home page — either the footer email link or the About page contact section via nav
  5. The home page loads in under 3 seconds on a standard connection with no visible content shift or animation-blocked render
  6. The layout is readable and correctly proportioned at 375px mobile width — no text overflow, no broken card layout

**Plans**: TBD

---

### Phase 3: Work Index + First Case Study
**Goal**: The site's core credibility engine is operational — one complete case study exists
at a real URL that a hiring manager can read through from start to finish, and that case
study is the validated template for every subsequent project page. The `/work/` URL is locked
before any project sub-pages are created.

**Depends on**: Phase 2

**Requirements**: REQ-W01, REQ-W02, REQ-W03, REQ-W04, REQ-W05, REQ-W06, REQ-W07, REQ-W08,
REQ-X04

**Success Criteria** (what must be TRUE):
  1. A visitor can navigate from the home page to the Work index at `/work/` and click through to a complete project page — all 8 sections are present with real content, no placeholder text
  2. The project page explicitly states the connection to the design philosophy throughline (well-being, pressure, meaning) — not implied, written out
  3. The project page footer has working prev/next navigation and a "Back to Work" link that returns to `/work/`
  4. The Work index at `/work/` shows at least one card with project title, specific role, platform/status, and one image — the card links to the correct project page
  5. The project page is readable on a 375px mobile viewport — all text legible, images scaled correctly, no horizontal overflow

**Plans**: TBD

---

### Phase 4: Additional Work Content
**Goal**: The Work section has the depth expected of a professional portfolio — 2–3 complete
case studies from the validated Phase 3 template, each connected to the design throughline,
so the curated set tells a coherent story rather than showing a single data point.

**Depends on**: Phase 3 (template validated before replication)

**Requirements**: REQ-W01, REQ-W02, REQ-W03, REQ-W04, REQ-W06, REQ-W07, REQ-W08

**Success Criteria** (what must be TRUE):
  1. The Work index at `/work/` shows 2–3 project cards, each with title, specific role, platform/status, and image — no placeholder cards
  2. Each project page is complete: all 8 sections present, no placeholder text, philosophy throughline stated
  3. A visitor reading two project pages back-to-back can identify the connecting thread — the design philosophy throughline is visible across both
  4. The home page featured cards reflect the strongest 2–3 projects and link to the real, complete project pages
  5. All new project pages are readable at 375px mobile width before this phase is marked complete

**Plans**: TBD

---

### Phase 5: Writing Section
**Goal**: The Writing section demonstrates that this designer treats writing as primary craft,
not documentation support — each sample is readable inline without downloading, connected to
the projects it informs, and filed at a dedicated URL reachable from primary nav.

**Depends on**: Phase 4

**Requirements**: REQ-Wr01, REQ-Wr02, REQ-Wr03, REQ-Wr04

**Success Criteria** (what must be TRUE):
  1. Clicking "Writing" in the primary nav leads to a page at `/writing/` that lists curated writing samples — no 404, no "coming soon"
  2. At least one writing sample is fully readable on the page without downloading — the inline excerpt contains at minimum 2 full paragraphs of the actual document
  3. Download links for writing samples use descriptive filenames (e.g., `origami-games-narrative-design-doc-2025.pdf`) — not auto-generated strings
  4. At least one project page links to a related writing sample and that writing sample page links back to the project — the cross-links resolve correctly in both directions

**Plans**: TBD

---

### Phase 6: Retrospectives / Earlier Work
**Goal**: Earlier work is framed with analytical confidence — the Retrospectives section reads
as demonstrated critical thinking that strengthens the portfolio's overall credibility, and
the Earlier Work page is added to the primary nav now that the rest of the site's identity
is established.

**Depends on**: Phase 5 (full site identity established before retrospectives can be framed)

**Requirements**: REQ-R01, REQ-R02, REQ-R03, REQ-R04

**Success Criteria** (what must be TRUE):
  1. Clicking "Earlier Work" in the primary nav leads to a page at `/earlier-work/` that lists retrospective entries — no 404, no "coming soon"
  2. Each retrospective entry contains all five structured components: project description, design goal, what happened, what I'd change, what carried forward
  3. Reading a retrospective entry leaves the impression of a self-aware, growing designer — not of someone apologizing for past work (qualitative check: read it as a stranger would)
  4. No earlier or school work appears in the main Work section at `/work/` — the sections are cleanly separated

**Plans**: TBD

---

### Phase 7: About + Contact
**Goal**: Visitors who have read the work now understand the human behind it — the About page
functions simultaneously as a writing sample, a philosophy statement, and a clear invitation
to reach out, serving studios, collaborators, and freelance clients without explicit audience
labels.

**Depends on**: Phase 3 (at least one project page live so About can reference it; can be
built in parallel with Phases 5 and 6 if Phase 3 is complete)

**Requirements**: REQ-A01, REQ-A02, REQ-A03, REQ-A04, REQ-A05, REQ-A06, REQ-A07

**Success Criteria** (what must be TRUE):
  1. Reading the About page before viewing any project leaves a clear impression of the designer's values and design philosophy — not a list of credentials
  2. The About page explicitly names the design philosophy throughline and links to at least two specific project pages as evidence
  3. A visitor can download the resume PDF from the About page in one click — the PDF opens correctly and the filename is descriptive
  4. A visitor can send a contact message from within the About page at the `#contact` anchor (visible email address or working contact form) without navigating to a separate page
  5. A test contact submission is received in the designer's inbox before the URL is shared publicly

**Plans**: TBD

---

### Phase 8: Origami Fold Transitions
**Goal**: The site's signature brand interaction is implemented correctly — GSAP 3D fold
transitions on key navigational moments reinforce the designer's throughline of
transformation and revelation, degrade gracefully on mobile and for users who prefer reduced
motion, and remain maintainable by someone with limited web coding experience.

**Depends on**: Phase 7 (all content pages stable before the animation layer is applied)

**NOTE**: Run `/gsd:research-phase 8` before planning this phase. The iOS Safari two-panel
flip implementation and the specific origami fold creative sequences need design decisions
and technical verification before implementation planning begins.

**Requirements**: REQ-Anim01, REQ-Anim02, REQ-Anim03, REQ-Anim04, REQ-Anim05, REQ-Anim06,
REQ-Anim07

**Success Criteria** (what must be TRUE):
  1. Navigating from a project card to a project page triggers a visible origami fold transition — the fold is recognizable as the site's brand gesture
  2. With JavaScript disabled in the browser, every page is fully readable and all navigation links work — no content is hidden or inaccessible
  3. On a 375px mobile viewport, transitions are simple opacity/scale fades — no 3D transform artifacts or GPU-related visual glitches
  4. With `prefers-reduced-motion` enabled in the OS, transitions reduce to simple fades — no fold animation plays
  5. All animation duration, easing, and perspective values are in CSS custom properties — none are hardcoded numbers in JS files
  6. The real iOS Safari device test is completed and documented before this phase is marked complete

**Plans**: TBD

---

### Phase 9: Cross-Device Polish + Accessibility
**Goal**: Every page on the live site is accessible to users with assistive technologies,
readable at mobile viewports, and correct in all the quiet ways that signal craftsmanship —
the site is fully ready to be shared without caveats.

**Depends on**: Phase 8 (accessibility and polish audit must happen after all content and
animations are in place)

**Requirements**: REQ-X01, REQ-X02, REQ-X03, REQ-X04, REQ-X05, REQ-X06, REQ-N04

**Success Criteria** (what must be TRUE):
  1. Running any page through a WCAG AA contrast checker shows all body text passing at 4.5:1 and all large/display text passing at 3:1
  2. Every image on every page has a non-empty, descriptive alt attribute — a screen reader traversal encounters no images with empty or missing alt text
  3. Loading each page on a 375px viewport shows readable text, no horizontal scrolling, and working navigation with no elements cut off
  4. Every published page has a unique, descriptive `<title>` and a `<meta name="description">` set — not left as the default template value
  5. CSS uses semantic class names throughout — no vendor-specific selectors without comments explaining their purpose

**Plans**: TBD

---

### Phase 10: Pre-Launch Audit
**Goal**: The site is verified clean and professional end-to-end — every link resolves, every
page has real content, the contact pathway works, and the domain is properly configured —
so the URL can be shared in a job application or sent to a collaborator without risk of an
embarrassing first impression.

**Depends on**: Phase 9

**Requirements**: REQ-PL01, REQ-PL02, REQ-PL03, REQ-PL04, REQ-PL05, REQ-PL06

**Success Criteria** (what must be TRUE):
  1. Clicking every link in the primary nav, footer, project prev/next, and all cross-links leads to a page with real content — no 404 errors, no placeholder pages, no broken anchors
  2. Reading through every published page finds no placeholder text, empty sections, or "coming soon" notices
  3. Clicking each external link (itch.io, Steam, LinkedIn, resume PDF) opens the correct destination and the link is live
  4. The contact pathway is tested end-to-end: a form submission or email link is confirmed working and the message is received before launch
  5. The site loads at the custom domain with HTTPS active (padlock in address bar) and certificate is confirmed active in Netlify domain management

**Plans**: TBD

---

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation Scaffold | 3/4 | In progress | - |
| 2. Home / Landing | 0/TBD | Not started | - |
| 3. Work Index + First Case Study | 0/TBD | Not started | - |
| 4. Additional Work Content | 0/TBD | Not started | - |
| 5. Writing Section | 0/TBD | Not started | - |
| 6. Retrospectives / Earlier Work | 0/TBD | Not started | - |
| 7. About + Contact | 0/TBD | Not started | - |
| 8. Origami Fold Transitions | 0/TBD | Not started | - |
| 9. Cross-Device Polish + Accessibility | 0/TBD | Not started | - |
| 10. Pre-Launch Audit | 0/TBD | Not started | - |

---

## Requirement Coverage

Every v1 requirement maps to exactly one phase.

**Phase 4 note:** REQ-W01 through REQ-W08 are assigned to Phase 3 as the primary delivery
point (template built and validated). Phase 4 applies the same standard to additional project
pages using that template. The requirements are met in Phase 3; Phase 4 maintains them. This
is content expansion, not a gap. REQ-W05 ("at least 1 complete case study") is not listed
under Phase 4 because it is satisfied by Phase 3 alone.

**REQ-X04 note:** This requirement ("every phase that introduces custom CSS/JS includes a
mobile viewport test before the phase is marked complete") is cross-cutting by design. It is
assigned to Phase 3 as the formal first verification point and applies as a standing rule in
every subsequent phase that introduces new CSS or JS.

| Requirement | Phase | Status |
|-------------|-------|--------|
| REQ-F01 | Phase 1 | Pending |
| REQ-F02 | Phase 1 | Pending |
| REQ-F03 | Phase 1 | Pending |
| REQ-F04 | Phase 1 | Pending |
| REQ-F05 | Phase 1 | Pending |
| REQ-F06 | Phase 1 | Pending |
| REQ-F07 | Phase 1 | Pending |
| REQ-F08 | Phase 1 | Pending |
| REQ-F09 | Phase 1 | Pending |
| REQ-N01 | Phase 1 | Pending |
| REQ-N03 | Phase 1 | Pending |
| REQ-H01 | Phase 2 | Pending |
| REQ-H02 | Phase 2 | Pending |
| REQ-H03 | Phase 2 | Pending |
| REQ-H04 | Phase 2 | Pending |
| REQ-H05 | Phase 2 | Pending |
| REQ-H06 | Phase 2 | Pending |
| REQ-N02 | Phase 2 | Pending |
| REQ-N04 | Phase 2 | Pending |
| REQ-W01 | Phase 3 | Pending |
| REQ-W02 | Phase 3 | Pending |
| REQ-W03 | Phase 3 | Pending |
| REQ-W04 | Phase 3 | Pending |
| REQ-W05 | Phase 3 | Pending |
| REQ-W06 | Phase 3 | Pending |
| REQ-W07 | Phase 3 | Pending |
| REQ-W08 | Phase 3 | Pending |
| REQ-X04 | Phase 3 | Pending |
| REQ-W01 | Phase 4 | Pending |
| REQ-W02 | Phase 4 | Pending |
| REQ-W03 | Phase 4 | Pending |
| REQ-W04 | Phase 4 | Pending |
| REQ-W06 | Phase 4 | Pending |
| REQ-W07 | Phase 4 | Pending |
| REQ-W08 | Phase 4 | Pending |
| REQ-Wr01 | Phase 5 | Pending |
| REQ-Wr02 | Phase 5 | Pending |
| REQ-Wr03 | Phase 5 | Pending |
| REQ-Wr04 | Phase 5 | Pending |
| REQ-R01 | Phase 6 | Pending |
| REQ-R02 | Phase 6 | Pending |
| REQ-R03 | Phase 6 | Pending |
| REQ-R04 | Phase 6 | Pending |
| REQ-A01 | Phase 7 | Pending |
| REQ-A02 | Phase 7 | Pending |
| REQ-A03 | Phase 7 | Pending |
| REQ-A04 | Phase 7 | Pending |
| REQ-A05 | Phase 7 | Pending |
| REQ-A06 | Phase 7 | Pending |
| REQ-A07 | Phase 7 | Pending |
| REQ-Anim01 | Phase 8 | Pending |
| REQ-Anim02 | Phase 8 | Pending |
| REQ-Anim03 | Phase 8 | Pending |
| REQ-Anim04 | Phase 8 | Pending |
| REQ-Anim05 | Phase 8 | Pending |
| REQ-Anim06 | Phase 8 | Pending |
| REQ-Anim07 | Phase 8 | Pending |
| REQ-X01 | Phase 9 | Pending |
| REQ-X02 | Phase 9 | Pending |
| REQ-X03 | Phase 9 | Pending |
| REQ-X04 | Phase 9 | Pending |
| REQ-X05 | Phase 9 | Pending |
| REQ-X06 | Phase 9 | Pending |
| REQ-N04 | Phase 9 | Pending |
| REQ-PL01 | Phase 10 | Pending |
| REQ-PL02 | Phase 10 | Pending |
| REQ-PL03 | Phase 10 | Pending |
| REQ-PL04 | Phase 10 | Pending |
| REQ-PL05 | Phase 10 | Pending |
| REQ-PL06 | Phase 10 | Pending |

**Coverage:** 36 unique v1 requirements, 100% mapped.
(REQ-W01–W08 and REQ-X04 appear in both Phase 3 and Phase 4/9 as noted above;
REQ-N04 appears in both Phase 2 and Phase 9 as first delivery and final verification.)

---

*Roadmap created: 2026-02-24 (replaced Squarespace roadmap with static site roadmap)*
*Platform corrected: Netlify (GitHub repo → Netlify auto-deploy) — updated 2026-02-25*
*Platform: Netlify — raw HTML/CSS/JS, no build tools, GSAP via CDN*
*Depth: Comprehensive (10 phases)*
*Coverage: 36 v1 requirements, 100% mapped*

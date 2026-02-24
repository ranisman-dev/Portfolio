# REQUIREMENTS: Origami Games Portfolio — v1

**Milestone:** v1 — "Just enough to share"
**Platform:** Squarespace 7.1 Business + custom CSS/JS injection
**Last updated:** 2026-02-23

Each requirement is specific and testable — it should be possible to verify pass/fail for every item.

---

## Category 1: Foundation

| ID | Requirement |
|----|-------------|
| REQ-F01 | Squarespace 7.1 Business plan (or higher) is active — code injection capability confirmed |
| REQ-F02 | Paloma template selected as the base (or Hester if bolder aesthetic is preferred after testing) |
| REQ-F03 | CSS custom properties defined site-wide: primary/accent colors, typography scale, spacing units, animation timing values |
| REQ-F04 | GSAP 3 core + ScrollTrigger plugin loaded via CDN (jsDelivr) in header code injection |
| REQ-F05 | All custom CSS/JS maintained in a local Git repository — Squarespace has no version history for injected code |
| REQ-F06 | Primary nav structure configured: Home \| Work \| Writing \| Earlier Work \| About (max 5 items) |
| REQ-F07 | Work Portfolio page slug set to `/work` **before** any project sub-pages are published |
| REQ-F08 | Site title set to "Origami Games" or designer's name as appropriate — no Squarespace default placeholder |
| REQ-F09 | Custom domain connected and HTTPS confirmed active |

---

## Category 2: Navigation & Global UX

| ID | Requirement |
|----|-------------|
| REQ-N01 | All nav labels are self-evident on first read — no jargon, no cryptic labels requiring explanation |
| REQ-N02 | Contact is accessible within 2 clicks from any page (via persistent footer or Within About page) |
| REQ-N03 | Footer includes: nav echo, contact link/email, LinkedIn link, resume PDF download link |
| REQ-N04 | All pages render correctly and readably at 375px (mobile) and 768px (tablet) viewport widths |
| REQ-N05 | GSAP/ScrollTrigger AJAX fix implemented: all ScrollTrigger instances killed and re-initialized on each Squarespace page transition |

---

## Category 3: Home / Landing

| ID | Requirement |
|----|-------------|
| REQ-H01 | Design philosophy statement is visible above the fold on desktop without scrolling: "I design game systems that encourage players to reflect on their well-being and how they navigate pressure and meaning" (or the designer's refined version) |
| REQ-H02 | Designer's name and role/title appear in the hero section |
| REQ-H03 | Featured project cards use a Squarespace Summary Block pointed at the Work Portfolio collection — content is not manually duplicated |
| REQ-H04 | 2–3 featured project cards visible on the home page |
| REQ-H05 | Featured project cards link directly to individual project pages — not to the Work index |
| REQ-H06 | No splash screens, loading gates, or animations that block or delay content visibility |
| REQ-H07 | Home page loads in under 3 seconds on a standard connection — all hero images compressed before upload |

---

## Category 4: Work

| ID | Requirement |
|----|-------------|
| REQ-W01 | Work Portfolio page at `/work` displays a curated grid of 3–6 projects |
| REQ-W02 | Each Work card shows: project title, designer's role (specific, e.g. "Narrative Designer" not just "Designer"), platform/format/status, one evocative image |
| REQ-W03 | All project pages follow the 8-section template: (1) title block with hero image/video, (2) 2–4 sentence project summary for non-industry readers, (3) design challenge/problem statement, (4) process/approach with supporting artifacts, (5) outcome with qualitative evidence where available, (6) reflection paragraph, (7) attached writing/documents with inline excerpts, (8) navigation footer with prev/next + back to Work |
| REQ-W04 | Each project page includes 1–3 sentences explicitly connecting the project to the design philosophy throughline (well-being, pressure, meaning) |
| REQ-W05 | At least 1 complete case study with full 8-section structure is live at v1 launch |
| REQ-W06 | Prototypes are shown only when they add information screenshots cannot convey — each accompanied by a 2–4 sentence brief: what design question it answers, what to notice, what was discovered |
| REQ-W07 | All projects (shipped and unshipped) are given equal case study depth — no project page is "screenshots + store link only" |
| REQ-W08 | Project pages include prev/next navigation and a link back to the Work index |

---

## Category 5: Writing

| ID | Requirement |
|----|-------------|
| REQ-Wr01 | Writing section exists at a dedicated URL (e.g. `/writing`) and is reachable from primary nav |
| REQ-Wr02 | Every writing sample displays an inline excerpt (minimum 2–4 paragraphs) visible without downloading — download link offered after the excerpt |
| REQ-Wr03 | All writing sample download links use descriptive filenames — not auto-generated or undescriptive |
| REQ-Wr04 | Writing samples that are attached to specific projects are cross-linked from the relevant project page (and vice versa) |

---

## Category 6: Earlier Work / Retrospectives

| ID | Requirement |
|----|-------------|
| REQ-R01 | Retrospectives section exists at a dedicated URL (e.g. `/earlier-work`), clearly labeled, and reachable from primary nav |
| REQ-R02 | Each retrospective entry follows the structure: project description → design goal → what happened → what I'd change → what carried forward |
| REQ-R03 | Retrospective framing is analytical and forward-looking — entries read as demonstrated critical thinking, not apology |
| REQ-R04 | School/early work does not appear in the main Work section — it lives only in the Retrospectives section with clear context labeling |

---

## Category 7: About + Contact

| ID | Requirement |
|----|-------------|
| REQ-A01 | About page is written with design voice — reads as a reflection of communication skill and values, not a resume summary |
| REQ-A02 | Design philosophy throughline stated explicitly on the About page and traced to specific projects via links |
| REQ-A03 | About page content serves all three audiences (studios, collaborators, clients) without explicit audience labels — through framing, tone, and content structure |
| REQ-A04 | Resume PDF downloadable from the About page — formatted to match the site's visual register |
| REQ-A05 | Contact form or visible email address present within the About page |
| REQ-A06 | About page contains links to the Work section and to Contact |
| REQ-A07 | Contact pathway is tested end-to-end (form submitted → message received) before any public URL is shared |

---

## Category 8: Origami Animations (GSAP Fold Transitions)

| ID | Requirement |
|----|-------------|
| REQ-Anim01 | Origami fold transitions implemented with GSAP 3 + CSS 3D transforms (`rotationX/Y`, `transformPerspective`, `transform-origin`) |
| REQ-Anim02 | Animations applied to key navigational moments only (entering a project, returning home, scroll-reveal of major sections) — not on every scroll event |
| REQ-Anim03 | `prefers-reduced-motion` media query honored — animations simplified to opacity/scale fades when the user has enabled reduced motion |
| REQ-Anim04 | Mobile fallback: 3D fold animations replaced with simple opacity/scale fades below 768px viewport width |
| REQ-Anim05 | Site content is fully readable and navigable with JavaScript disabled — all animations are progressive enhancement only |
| REQ-Anim06 | All animation values (duration, easing, perspective distance) stored in CSS custom properties — not hardcoded in JS |
| REQ-Anim07 | Every non-obvious code block includes a plain-language comment explaining what it does and how to adjust it |
| REQ-Anim08 | Squarespace AJAX lifecycle handled: ScrollTrigger instances killed before each re-initialization on page change |

---

## Category 9: Cross-Device, Accessibility & Performance

| ID | Requirement |
|----|-------------|
| REQ-X01 | All body text meets WCAG AA contrast ratio (minimum 4.5:1) against its background |
| REQ-X02 | All large/display text meets WCAG AA large-text contrast ratio (minimum 3:1) |
| REQ-X03 | All images have descriptive alt text |
| REQ-X04 | Every phase that introduces custom CSS/JS includes a mobile viewport test before the phase is marked complete — not deferred to an end-of-build review |
| REQ-X05 | Custom CSS uses custom class names wherever possible; any rules targeting `sqs-*` Squarespace internal selectors include a comment: "Squarespace internal class — verify after platform updates" |
| REQ-X06 | Page titles and meta descriptions are set for all published pages |

---

## Category 10: Pre-Launch / Operational

| ID | Requirement |
|----|-------------|
| REQ-PL01 | No placeholder text ("Coming soon," "Lorem ipsum," empty sections) appears on any linked or publicly shared page |
| REQ-PL02 | All navigation links resolve to real content — no 404s or broken internal links |
| REQ-PL03 | All external links (itch.io, Steam, LinkedIn, etc.) verified active before launch |
| REQ-PL04 | Resume PDF download link tested and confirmed working |
| REQ-PL05 | Contact form submission tested end-to-end: form submitted → message received by designer |
| REQ-PL06 | Custom domain connected with HTTPS confirmed active — Squarespace branding removed |

---

## Requirement Coverage by Phase

| Phase | Requirements Addressed |
|-------|------------------------|
| Phase 1: Foundation + global styles + GSAP | REQ-F01–F09, REQ-N01, REQ-N03, REQ-N05 |
| Phase 2: Home / Landing | REQ-H01–H07, REQ-N02, REQ-N04 |
| Phase 3: Work index + first project page (template) | REQ-W01–W08 |
| Phase 4: Second project page + more work content | REQ-W01–W08 (additional entries) |
| Phase 5: Writing section | REQ-Wr01–Wr04 |
| Phase 6: Retrospectives section | REQ-R01–R04 |
| Phase 7: About + Contact | REQ-A01–A07 |
| Phase 8: Origami animations | REQ-Anim01–Anim08 |
| Phase 9: Cross-device polish + accessibility | REQ-X01–X06, REQ-N04 |
| Phase 10: Pre-launch audit | REQ-PL01–PL06 |

---

## Deferred to v2 (Out of Scope for v1)

- SEO optimization and search discoverability
- Analytics integration
- Social feed embeds (explicitly excluded as anti-feature)
- Blog / frequent publishing workflow
- Password-protected case studies (unless NDA-required for specific projects)
- Heavy interactive demos (Three.js / WebGL) — assess after v1 is live
- Design Briefs as speculative work section — scaffold only, populate in v2

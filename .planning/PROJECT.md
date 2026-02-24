# Origami Games Portfolio

## What This Is

A personal portfolio website for a Narrative and Experience Engineer, built as a static site on GitHub Pages with custom HTML, CSS, and JavaScript. The site showcases shipped games, case studies, design briefs, writing samples, and reflective retrospectives on earlier work — speaking to studios, collaborators, and clients simultaneously.

## Core Value

Visitors immediately understand who she is and what she stands for — that she designs game systems encouraging players to reflect on their well-being and how they navigate pressure and meaning — before reading a single case study.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Home / landing page that leads with identity, design philosophy, and curated featured work
- [ ] Work section showcasing shipped games, case studies, and design briefs
- [ ] Project pages that can include attached writing (narrative docs, design notes) alongside the case study
- [ ] Prototypes shown selectively — only to highlight a specific mechanic, design intent, or theme
- [ ] Writing section for standalone writing samples (narrative docs, design essays, etc.)
- [ ] Earlier Work / Retrospectives section for school projects framed as "What I'd Change"
- [ ] About page with the designer's story, throughline, and contact information
- [ ] Origami fold transitions as the signature brand interaction (CSS 3D transforms + GSAP via CDN)
- [ ] Site feel: indie internet personality — warm, quirky, cozy, personal — not corporate or template-like

### Out of Scope

- Blog / frequent updates — portfolio only, not a publishing platform
- E-commerce — not selling products
- User accounts / login — public-facing only
- Mobile app — web only
- Server-side code — static site only (GitHub Pages; no custom backend)

## Context

**Brand:** Origami Games

**Design philosophy throughline:** "I design game systems that encourage players to reflect on their well-being and how they navigate pressure and meaning in their own lives." This isn't just biography — it's a curatorial lens. Every project on the site connects back to this.

**Platform:** GitHub Pages (free static hosting). Raw HTML/CSS/JS — no framework, no build tooling, no bundler. Custom domain via DNS redirect. GSAP loaded via CDN in HTML `<head>`. Fallback: Netlify if GitHub Pages causes issues (same repo, different deployment target).

**Aesthetic direction:** Warm neutrals (paper-like base) + indie internet personality. "It's MY website and it represents ME." Reference: personal web / tumblr / pixel art culture — cozy, quirky, fun animations. Game UI chrome inspiration (keyboard navigation hints, control overlays). Not agency-polished, not template-like.

**Audiences:**
- Game studios and hiring managers — looking for proof of craft and intentionality
- Indie devs and collaborators — looking for a thinking partner with compatible values
- Freelance clients — looking for someone who can design experiences with purpose

**Content inventory:**
- Shipped games (primary work)
- Case studies and design briefs
- Prototypes (selective, for illustrating specific design thinking)
- Writing samples — some standalone, some attached to projects
- School work — reframed as retrospectives ("What I'd Change")

**Nav structure (confirmed):** Home | Work | Writing | About | Contact
- "Contact" = anchor link to `/about#contact` section
- "Earlier Work" = HTML page stubbed and hidden from nav until Phase 6
- Footer on every page: email link as ever-present contact fallback

## Constraints

- **Platform**: GitHub Pages — static HTML/CSS/JS only; no server-side code, no npm/build tools in v1
- **Animation**: GSAP 3 + ScrollTrigger via CDN in HTML `<head>`; CSS 3D transforms for origami fold effects
- **Maintainability**: Owner has limited web coding experience — solutions should be debuggable and approachable; all animation values in CSS custom properties
- **Scope**: v1 is "just enough to share" — structure + 1-2 featured projects, everything linkable and professional
- **Budget**: Zero ongoing hosting cost — GitHub Pages free tier

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| GitHub Pages over Squarespace | No Squarespace hosting plan; user has domain registration only. GitHub Pages = free, full CSS/JS control, Git-native deployment | — Pending |
| Raw HTML/CSS/JS (no static site generator) | Start simple; add Eleventy/Jekyll later if repetition becomes a problem | — Pending |
| CSS + JS customization over templates-only | "Expressive and personal" feel requires creative control beyond template constraints | — Pending |
| GSAP for origami transitions | Powerful animation library, CDN-loadable, well-documented, debuggable | — Pending |
| Retrospectives as separate section | School work deserves honest framing — not buried or hidden, but clearly contextualized | — Pending |
| Contact as nav anchor, not page | Reduces site structure complexity; contact lives in About page (#contact section) | — Pending |
| Squarespace rejected | ~$23/month ongoing cost for Business plan not desired; GitHub Pages achieves same result at $0 | ⚠️ Revisit if static site limitations cause friction |

---
*Last updated: 2026-02-24 after platform change — Squarespace → GitHub Pages (discovered no hosting plan exists; only domain registration)*

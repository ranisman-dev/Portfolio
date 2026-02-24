# Origami Games Portfolio

## What This Is

A personal portfolio website for a Narrative and Experience Engineer, built on Squarespace with custom CSS and JavaScript. The site showcases shipped games, case studies, design briefs, writing samples, and reflective retrospectives on earlier work — speaking to studios, collaborators, and clients simultaneously.

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
- [ ] Site feel: expressive and personal — thoughtful, layered, a little unexpected

### Out of Scope

- Blog / frequent updates — portfolio only, not a publishing platform
- E-commerce — not selling products
- User accounts / login — public-facing only
- Mobile app — web only
- Server-side code — Squarespace only, no custom backend

## Context

**Brand:** Origami Games

**Design philosophy throughline:** "I design game systems that encourage players to reflect on their well-being and how they navigate pressure and meaning in their own lives." This isn't just biography — it's a curatorial lens. Every project on the site connects back to this.

**Platform:** Squarespace with custom CSS + JavaScript injection. No framework, no build tooling — Squarespace handles CMS, hosting, and deployment. Animation libraries (e.g. GSAP) loaded via CDN through Squarespace's header code injection.

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

## Constraints

- **Platform**: Squarespace — all customization via CSS/JS injection, no npm, no custom server
- **Animation**: GSAP or vanilla CSS 3D transforms — loaded via CDN
- **Maintainability**: Owner has limited web coding experience — solutions should be debuggable and approachable
- **Scope**: v1 is "just enough to share" — structure + 1-2 featured projects, everything linkable and professional

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Squarespace as platform | Already hosting there, handles CMS/deployment complexity | — Pending |
| CSS + JS customization over templates-only | "Expressive and personal" feel requires creative control beyond template constraints | — Pending |
| GSAP for origami transitions | Powerful animation library, CDN-loadable, well-documented, debuggable | — Pending |
| Retrospectives as separate section | School work deserves honest framing — not buried or hidden, but clearly contextualized | — Pending |

---
*Last updated: 2026-02-23 after initialization*

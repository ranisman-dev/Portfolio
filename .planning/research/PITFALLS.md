# PITFALLS — Origami Games Portfolio

**Project:** Origami Games — Narrative & Experience Engineer Portfolio
**Research type:** Pitfalls — Greenfield
**Milestone:** What do game design / narrative design portfolio projects commonly get wrong?
**Date:** 2026-02-23

---

## Overview

This document catalogues critical mistakes made in game design and narrative design portfolio projects — specifically in content strategy, UX, Squarespace customization, CSS/JS implementation, and how the work itself is presented. Each pitfall maps to a warning sign, a prevention strategy, and the phase where it must be addressed.

Pitfalls are organized by domain. They are specific to this project's context: a Squarespace-hosted portfolio for a narrative/experience designer with a clear design philosophy throughline, speaking to multiple audiences (studios, collaborators, freelance clients), using custom CSS/JS injection and GSAP for origami fold transitions.

---

## Domain 1: Content Strategy

### P1.1 — Leading with work before establishing identity

**The mistake:** The portfolio opens with a project grid or case study list, leaving visitors to reverse-engineer who the designer is from the work itself. Hiring managers skim; if they can't immediately locate a clear POV, they move on.

**Why it happens:** Designers assume the work speaks for itself. They treat the portfolio as a gallery rather than an argument.

**Warning signs:**
- The home page's first scroll section is a project grid
- "About" exists only as a buried nav link with a short bio paragraph
- There is no stated design philosophy anywhere above the fold

**Prevention strategy:** Lead with identity, not inventory. The home page must answer "who is this person and what do they stand for" before presenting a single case study. For this project, the throughline — "designing game systems that encourage players to reflect on their well-being and how they navigate pressure and meaning" — must be present on the landing page, not gatekept behind an About page.

**Phase:** Information architecture / home page wireframe (before any build work begins)

---

### P1.2 — Treating all work as equally important

**The mistake:** Every project — shipped games, school projects, prototypes, jams — appears in the same grid with the same visual weight. This flattens the hierarchy and forces visitors to do curation work the designer should have done.

**Why it happens:** Designers are emotionally attached to all their work. They fear removing anything looks like they have less experience.

**Warning signs:**
- More than 6-8 items in the main work section with no visual differentiation
- School work displayed with the same framing as shipped commercial work
- Prototypes presented as full projects without contextualizing their scope

**Prevention strategy:** Enforce explicit tiers before building any project page. For this project: shipped games are primary; case studies/design briefs are secondary; prototypes appear only when they illustrate a specific mechanic or design intent; school work lives in a clearly labeled "Retrospectives" section with honest reframing. Commit to this hierarchy in IA before content creation.

**Phase:** Information architecture / content inventory (greenfield)

---

### P1.3 — Writing case studies that describe instead of analyze

**The mistake:** Case study text narrates what happened during development ("I made a puzzle system, then I iterated on it") rather than articulating design thinking ("The puzzle system needed to create a moment of internal conflict — here's how I got there and what I learned when it didn't work").

**Why it happens:** It feels vulnerable to expose reasoning that led to wrong turns. Description feels safer.

**Warning signs:**
- Case studies are structured as project summaries or timelines
- No mention of constraints, failures, or pivots
- The word "I" is followed by verbs of action, not verbs of reasoning ("I built" vs. "I realized")

**Prevention strategy:** For each project, write a brief that answers three questions before writing the case study: What was the design problem? What did I try that didn't work? What decision mattered most and why? Use these as the structural skeleton of the case study narrative. For this project, each case study should connect back to the throughline — how does this game help players reflect on well-being or meaning?

**Phase:** Content creation (before any project page is built)

---

### P1.4 — Failing to serve multiple audiences from a single site

**The mistake:** The portfolio is implicitly written for one audience (usually studios/hiring managers) and becomes illegible or off-putting to other audiences (indie collaborators, freelance clients). The voice, framing, and calls to action don't flex.

**Why it happens:** Multi-audience strategy requires deliberate architecture. Without it, the default is to write for whoever feels most important at the moment.

**Warning signs:**
- No clear call to action for collaborators or clients (only "hire me" or application-oriented CTAs)
- Writing assumes industry vocabulary (e.g. "GDD," "systems design") without defining it for non-studio audiences
- The "About" page talks only about job history, not values or ways of working

**Prevention strategy:** Define what each audience needs to walk away with, then map that to site sections. For this project: studios need proof of craft + intentionality (case studies, design briefs); collaborators need evidence of compatible values (philosophy, writing samples, process notes); clients need proof of purposeful design (about page framing, project scope/outcomes). Write the About page to speak to all three. Avoid jargon without context.

**Phase:** Information architecture + about page / writing (greenfield, before content)

---

### P1.5 — Burying or hiding retrospectives on school work

**The mistake:** School work either gets displayed as if it were commercial work (misleading), omitted entirely (wastes learning), or buried in an unlabeled archive (invisible). None of these serve the designer.

**Why it happens:** School work feels embarrassing — either too amateur to show or too old to be relevant.

**Prevention strategy:** A "What I'd Change" retrospective section is a differentiator, not a liability. Hiring managers consistently say they want to see designers who can critically evaluate their own work. The retrospective framing — honest, analytical, forward-looking — demonstrates exactly that. The section needs clear labeling ("Earlier Work / Retrospectives") so no one is confused about context. This project has already identified this structure; the pitfall is failing to execute it with genuine critical analysis rather than surface-level "I learned a lot."

**Warning signs:**
- Retrospective entries read like apologies rather than analysis
- School projects appear in the main work section without distinguishing labels
- The "What I'd Change" framing is used but the writing doesn't actually critique anything specific

**Phase:** Content creation / retrospectives section

---

## Domain 2: UX and Navigation

### P2.1 — Navigation that doesn't match the mental model of any audience

**The mistake:** The nav uses internal jargon or designer-centric labels ("Artifacts," "Explorations," "Playground") that mean nothing to a studio recruiter scanning the site in 30 seconds.

**Why it happens:** Designers want the navigation to feel expressive and on-brand. This trades clarity for personality.

**Warning signs:**
- Nav labels require explanation
- Users can't predict what they'll find before clicking
- The "Work" section is labeled something other than "Work," "Projects," or "Games"

**Prevention strategy:** Nav labels must be self-evident on first read. Personality comes from visual design and content — not from making navigation cryptic. Use: Work, Writing, About. If the Retrospectives section needs to exist in navigation, label it clearly. Only use unconventional labels if user testing confirms zero confusion.

**Phase:** Information architecture (before any Squarespace template selection)

---

### P2.2 — Project pages with no clear reading path

**The mistake:** Project pages are a collage — screenshots, a wall of text, a PDF embed, some links — with no hierarchy guiding the visitor through the design story. Visitors scan, bounce, and conclude the designer can't communicate.

**Why it happens:** Designers pack everything in because they don't want to leave anything out. Editing feels like losing.

**Warning signs:**
- Project pages open with a full-bleed screenshot and immediately present a wall of body text
- No visual breaks, pull quotes, or structured sections within the case study
- PDFs are embedded inline without context for what they contain

**Prevention strategy:** Design a reusable project page template before building any individual project pages. Define the sections: hook (1-2 sentence summary of design problem), context (scope, role, constraints), process (key decisions + reasoning, not timeline), outcomes (what shipped, what worked, what didn't), attached writing (clearly labeled). Build this in Squarespace as a page template or use consistent block ordering.

**Phase:** Project page template design (before first project page)

---

### P2.3 — Making contact / collaboration too hard to find

**The mistake:** There's no clear "contact" CTA accessible from any page. Visitors who are interested have to hunt for an email address or form. They don't.

**Why it happens:** Designers add contact info to the About page and assume that's sufficient.

**Warning signs:**
- "Contact" doesn't appear in the main nav
- No email address or contact form reachable within two clicks from the home page
- The footer doesn't include contact info or social links

**Prevention strategy:** Contact should be accessible from every page — either as a nav item, a persistent footer, or a CTA block on the home page. For this project (targeting studios, collaborators, and clients), each of whom may want different kinds of contact, a simple contact form with a brief framing ("Whether you're looking to hire, collaborate, or just talk about design...") handles multi-audience gracefully.

**Phase:** Site structure / Squarespace template setup

---

## Domain 3: Squarespace-Specific Customization

### P3.1 — Choosing a template that fights the design vision

**The mistake:** Picking a Squarespace template that looks close enough to the desired layout, then spending hours fighting the template's structural assumptions to make it work differently. Squarespace templates have opinionated layouts — some fight custom CSS harder than others.

**Why it happens:** Template selection feels like an early, reversible decision. It isn't — templates determine block behavior, section constraints, and what CSS can and can't override.

**Warning signs:**
- CSS overrides require `!important` on more than 20-30% of rules
- Intended animations or layout changes require removing or hiding elements the template generates automatically
- The template's mobile behavior conflicts with the custom desktop layout

**Prevention strategy:** Choose the template by testing it with custom CSS injected, not by eyeballing the demo. For a portfolio with origami fold transitions, expressive typography, and a distinctive grid — test the template with a rough version of the custom CSS before committing. Squarespace's "Blank" or minimal templates (e.g. Brine family, Five, Horizon) offer the fewest layout constraints. Identify the template decision as a Phase 1 milestone gate.

**Phase:** Technical setup / template selection (before any content entry)

---

### P3.2 — CSS injection that breaks on Squarespace updates

**The mistake:** Custom CSS targets Squarespace's internal class names (e.g. `.sqs-block`, `.sqs-layout`) or relies on DOM structure that Squarespace can change with platform updates. The site breaks silently after an update.

**Why it happens:** Squarespace doesn't expose stable CSS hook points by default. Developers reach for whatever selector works at the time.

**Warning signs:**
- CSS rules select by Squarespace-internal class names beginning with `sqs-` without a wrapper custom class
- No custom class names or data attributes applied via HTML blocks or Custom CSS hooks
- The site has never been tested after a Squarespace platform update

**Prevention strategy:** Use custom class names applied through Squarespace's Custom CSS field or via HTML blocks wherever possible. When you must target `sqs-` classes, document them explicitly with a comment noting they may break on platform updates. Scope CSS with a site-specific wrapper class applied to the body (this can be done via Code Injection in the header). Review Squarespace's changelog or community forum after major platform updates.

**Phase:** CSS implementation (throughout build)

---

### P3.3 — JavaScript injection that loads before the DOM is ready

**The mistake:** JavaScript is injected via Squarespace's header Code Injection, runs before the page content is parsed, and throws reference errors because the target elements don't exist yet.

**Why it happens:** The header is the most commonly mentioned injection point. Developers assume it works like a `<script defer>` — it doesn't unless explicitly deferred.

**Warning signs:**
- JavaScript errors appear in the browser console on first load
- Animations trigger inconsistently — sometimes work, sometimes don't
- Code works fine in isolation but fails on the live site

**Prevention strategy:** Always inject JavaScript either in the footer Code Injection (which executes after DOM parsing) or wrap header-injected scripts in a `DOMContentLoaded` event listener. For GSAP-based origami transitions specifically: load GSAP from CDN in the header (so it's available early), but initialize all ScrollTrigger or transition logic inside a `DOMContentLoaded` or `window.load` listener. Test on multiple page types — Squarespace's page lifecycle varies between collection pages, index pages, and standalone pages.

**Phase:** JavaScript implementation (origami transitions)

---

### P3.4 — GSAP animations that degrade poorly on mobile

**The mistake:** Origami fold transitions built with GSAP and CSS 3D transforms are visually impressive on desktop but janky, broken, or performance-killing on mobile. The site feels unfinished on phone screens — which is where many recruiters do a first pass.

**Why it happens:** 3D CSS transforms and GSAP timeline animations are GPU-accelerated but still depend on the device's rendering capability. Mobile GPUs handle complex 3D transforms poorly, and Squarespace's mobile experience is already more constrained.

**Warning signs:**
- Transitions stutter on any iOS Safari test
- The animation triggers "paint" or "layout" in Chrome DevTools Performance panel on mobile
- No conditional logic to reduce or disable animations below a certain viewport width or `prefers-reduced-motion` query

**Prevention strategy:** Build animations mobile-first or with an explicit mobile fallback. Use `@media (max-width: ...)` in CSS to disable 3D transforms below tablet width, replacing them with simpler opacity/scale fades. In GSAP, use a `matchMedia()` context to conditionally apply the full origami animation only on wider viewports. Always implement `prefers-reduced-motion` — both as a legal accessibility consideration and because it signals craft.

**Phase:** Animation implementation (origami transitions phase)

---

### P3.5 — Over-engineering custom code that the owner can't maintain

**The mistake:** The CSS/JS implementation becomes so complex — nested CSS custom properties, GSAP timelines with multiple plugins, JavaScript classes — that the site owner (who has limited web coding experience) cannot debug or modify it. The site becomes abandoned or broken when something inevitably needs updating.

**Why it happens:** The developer solves the problem well for now but doesn't consider the handoff. Elegant engineering can be a maintainability liability.

**Warning signs:**
- More than one JavaScript file injected via different Squarespace Code Injection points
- CSS requires understanding of cascade specificity to modify without breaking other rules
- No comments explaining what any block of code does or how to change a value

**Prevention strategy:** Treat the code injection as a handoff document. Write all custom CSS and JavaScript with the site owner as the primary reader. Use CSS custom properties (variables) for every value the owner might want to change — colors, timing, font sizes, spacing. Comment every non-obvious block. Keep GSAP usage to the simplest effective animation. Write a short "How to update X" note for every custom component, either in comments or in a separate plain-language doc.

**Phase:** Throughout build; enforce at every code review point

---

## Domain 4: Work Presentation

### P4.1 — Prototypes presented without design context

**The mistake:** A playable prototype or demo is embedded or linked without explaining what it's demonstrating. Visitors play it, don't understand what they're supposed to notice, and move on. The prototype becomes a curiosity rather than evidence of design intent.

**Why it happens:** Designers think "showing" is self-explanatory. It usually isn't outside the context of the design conversation that produced it.

**Warning signs:**
- Prototype links are labeled "Play the Demo" with no surrounding text
- No explanation of what mechanic or theme the prototype was built to test
- The prototype is the centerpiece of the project page rather than supporting evidence

**Prevention strategy:** Every prototype needs a brief (2-4 sentences) before the embed: what design question it was built to answer, what to notice while playing, what was discovered. After the prototype, add an outcome note — did it work? What changed as a result? Prototypes should appear only when they add information a screenshot can't convey.

**Phase:** Content creation / project page template

---

### P4.2 — Writing samples presented as downloadable PDFs with no preview

**The mistake:** Narrative writing samples — dialogue scripts, lore documents, design briefs — are only accessible as PDF downloads. Visitors have to commit to a download to see the quality of the work. Most won't.

**Why it happens:** PDFs are easy to upload. Squarespace's file storage makes them the path of least resistance.

**Warning signs:**
- The Writing section consists entirely of PDF download links
- No excerpt, pull quote, or inline display of any writing content
- PDF filenames are auto-generated or undescriptive

**Prevention strategy:** For every writing sample, display at least an excerpt (2-4 paragraphs) inline on the page or in a styled text block. Use the excerpt to demonstrate voice, craft, and purpose — then offer the full document as a download for those who want more. Label downloads descriptively (e.g., "Download: Narrative Design Brief — The Unraveling"). For longer documents, a summary paragraph explaining the document's purpose is required before the download link.

**Phase:** Writing section build / content entry

---

### P4.3 — No visible throughline connecting projects to design philosophy

**The mistake:** The project case studies are good individually but don't add up to anything. Visitors who read two or three case studies can't articulate what this designer believes or what makes them distinctive.

**Why it happens:** The throughline exists in the designer's head but was never explicitly translated into the way each project is framed.

**Warning signs:**
- Each case study could be from a different designer — the voice and framing don't connect
- The design philosophy statement on the home page has no echo in individual project pages
- No consistent framing device across case studies (e.g., every case study connects to player well-being or meaning, or none do)

**Prevention strategy:** Define a framing device for the case study template that explicitly ties each project back to the throughline. For this project: each case study should include a brief (1-3 sentences) that explains how this specific game relates to the designer's core interest in player well-being, pressure, and meaning. It doesn't have to be a separate section — it can be woven into the hook. But it must be present and genuine, not formulaic.

**Phase:** Content strategy / case study writing

---

### P4.4 — Treating shipped games differently from "designed" games

**The mistake:** Shipped games are shown as finished products (screenshots, store link) while unshipped design work is buried in case studies. This inverts the portfolio's value — for a narrative/experience designer, the design thinking is the product, not the shipping.

**Why it happens:** Shipping feels more legitimate. Designers undervalue their own process documentation.

**Warning signs:**
- Shipped game pages are image-heavy with little text
- Design brief / case study pages have no images or visual artifacts
- The site implicitly treats "shipped" as the credential rather than "designed well"

**Prevention strategy:** Every project page — shipped or not — should foreground design thinking. For shipped games, this means going beyond screenshots and a store link: what was the design problem, what was solved, what would you change? For unshipped design work, use visual artifacts from the process (wireframes, diagrams, mood boards) to make the thinking tangible. Equalize the depth across project types.

**Phase:** Project page template / content creation

---

## Domain 5: Visual Design and Brand Expression

### P5.1 — Animation as decoration rather than brand expression

**The mistake:** The origami fold transitions are implemented because they look impressive, but they're not connected to the site's meaning or the designer's identity. The animation is a style choice rather than a statement.

**Why it happens:** Origami transitions are technically interesting to build. The visual wow factor can become the goal rather than the communication.

**Warning signs:**
- Transitions occur on every interaction regardless of semantic appropriateness
- The origami metaphor is never mentioned or explained anywhere on the site
- The animation slows navigation and creates friction without adding meaning

**Prevention strategy:** Make the origami transition a deliberate brand element with meaning, not a decoration. Consider a brief note on the About page or in the site's visual language that connects origami (transformation, layering, precision, the reveal beneath the fold) to the designer's philosophy. Use the animation selectively — on key navigational moments (entering a project, returning home) rather than every scroll event. If the animation isn't earning its friction cost, it should be simpler or removed.

**Phase:** Design/brand definition (before animation implementation)

---

### P5.2 — "Expressive and personal" that becomes illegible

**The mistake:** Pursuing an expressive visual design results in typography, color, or layout choices that make the content hard to read. The portfolio looks distinctive but visitors can't absorb the work.

**Why it happens:** Designers who value expressiveness over accessibility make decisions that look right in isolation but fail in context (e.g., light text on light backgrounds, decorative fonts at body size, layout that prioritizes visual tension over reading flow).

**Warning signs:**
- Body text uses a display or decorative font at any size
- Contrast ratios on text fall below WCAG AA standards (4.5:1 for body text)
- Layout choices cause confusion about where to read next
- The "expressive" elements compete with the case study content for attention

**Prevention strategy:** Separate expressive decisions (brand colors, display type, signature interactions) from legibility decisions (body type, content layout, contrast). Treat case study content as sacred — it must be presented in conditions that maximize reading comprehension. Use the visual distinctiveness for framing elements (headers, transitions, hero sections) and pull back to clarity for case study bodies. Run contrast ratios before any color palette is finalized.

**Phase:** Visual design / type and color system definition

---

## Summary Table

| ID | Pitfall | Domain | Phase |
|----|---------|--------|-------|
| P1.1 | Leading with work before identity | Content strategy | IA / home page |
| P1.2 | Treating all work as equally important | Content strategy | IA / content inventory |
| P1.3 | Case studies that describe, not analyze | Content strategy | Content creation |
| P1.4 | Failing to serve multiple audiences | Content strategy | IA + About page |
| P1.5 | Burying / mishandling school work | Content strategy | Content creation |
| P2.1 | Navigation labels that require explanation | UX | IA |
| P2.2 | Project pages with no reading path | UX | Project page template |
| P2.3 | Contact / collaboration too hard to find | UX | Site structure |
| P3.1 | Template that fights the design vision | Squarespace | Technical setup |
| P3.2 | CSS that breaks on platform updates | Squarespace | CSS implementation |
| P3.3 | JavaScript injected before DOM ready | Squarespace / JS | JS implementation |
| P3.4 | GSAP animations degrade on mobile | Squarespace / JS | Animation phase |
| P3.5 | Code too complex for owner to maintain | Squarespace / JS | Throughout build |
| P4.1 | Prototypes without design context | Work presentation | Content creation |
| P4.2 | Writing samples as unpreviewable PDFs | Work presentation | Writing section build |
| P4.3 | No throughline connecting projects | Work presentation | Content strategy |
| P4.4 | Shipped vs. designed treated differently | Work presentation | Project page template |
| P5.1 | Animation as decoration, not brand | Visual design | Design/brand definition |
| P5.2 | Expressive design that's illegible | Visual design | Visual design phase |

---

*Research complete. 19 pitfalls documented across 5 domains. All prevention strategies are specific to this project's platform (Squarespace), audience (studios/collaborators/clients), and design philosophy (player well-being and meaning throughline).*

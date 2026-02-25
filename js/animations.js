// js/animations.js
// GSAP animation initialization.
// Phase 1: stub only — registers ScrollTrigger plugin, no animations yet.
// Phase 8: origami fold transitions are added here.
//
// All animation timing values live in css/tokens.css (--duration-*, --ease-*, --perspective-fold).
// GSAP reads them via getComputedStyle() to keep CSS and JS in sync.

(function () {
  'use strict';

  // Guard: bail if GSAP did not load (CDN failure, or JS disabled)
  // Pages must be fully readable without this script — animations are progressive enhancement.
  if (typeof gsap === 'undefined') {
    console.warn('[animations.js] GSAP not loaded — animations disabled.');
    return;
  }

  // ScrollTrigger must be registered before any ScrollTrigger usage.
  // This must happen before Phase 8 scroll-driven animations are defined.
  gsap.registerPlugin(ScrollTrigger);

  // ── Phase 8 animation code goes here ──────────────────────────────────
  // Pattern: read timing from CSS custom properties, not hardcoded values:
  //   var styles = getComputedStyle(document.documentElement);
  //   var duration = parseFloat(styles.getPropertyValue('--duration-fold')) / 1000;
  // ──────────────────────────────────────────────────────────────────────

})();

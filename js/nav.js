// js/nav.js
// Injects shared nav and footer from _includes/ into every page.
// REQUIRES local HTTP server (e.g. VS Code Live Server) — fetch() fails on file://
//
// To update nav links: edit _includes/nav.html — one edit updates all pages.
// To update footer: edit _includes/footer.html — one edit updates all pages.
//
// Uses root-relative paths (/_includes/...) so this works from any page depth.

(function () {
  'use strict';

  // Fetch an HTML fragment and inject it into a target element by ID.
  // Dispatches a custom event when injection is complete so other scripts can react.
  function injectInclude(targetId, includePath, eventName) {
    var el = document.getElementById(targetId);
    if (!el) return; // Target element not in page — bail silently

    fetch(includePath)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to load ' + includePath + ' (' + response.status + ')');
        }
        return response.text();
      })
      .then(function (html) {
        el.innerHTML = html;
        // Signal that this include is ready (e.g. so active state can run)
        document.dispatchEvent(new CustomEvent(eventName));
      })
      .catch(function (err) {
        // Fail gracefully — page remains readable; only nav/footer appearance is affected
        console.warn('[nav.js]', err.message);
      });
  }

  // Inject nav and footer from single-source include files
  injectInclude('site-nav', '/_includes/nav.html', 'navReady');
  injectInclude('site-footer', '/_includes/footer.html', 'footerReady');

  // Set active state on nav links after nav is injected
  // Compares window.location.pathname to each link's href attribute
  // Sets aria-current="page" and class="is-active" on the matching link
  document.addEventListener('navReady', function () {
    var currentPath = window.location.pathname;
    var links = document.querySelectorAll('.site-nav__link');

    links.forEach(function (link) {
      var linkHref = link.getAttribute('href');

      // Normalize: strip trailing slash, but keep root '/' as-is
      var linkPath = linkHref.replace(/\/$/, '') || '/';
      var pagePath = currentPath.replace(/\/$/, '') || '/';

      // Exact match only — prevents /work matching /work/project-name
      if (linkPath === pagePath) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('is-active');
      }
    });
  });

})();

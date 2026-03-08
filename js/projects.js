/* projects.js
   Single source of truth for project card rendering.
   Reads /data/projects.json and renders the appropriate card type:
   - .cards-grid (home page)  → .project-card (thumbnail + title + descriptor)
   - .work-list  (work index) → .work-card    (thumbnail + role + tag + descriptor)

   To add/update a project: edit /data/projects.json only.
   To add a thumbnail: set "thumbnail": "/img/projects/your-image.jpg"
   To show a project on the work index: set "visible": true
   To show a project on the home page:  set "featured": true */

(function () {
  const cardsGrid = document.querySelector('.cards-grid');
  const workList  = document.querySelector('.work-list');

  if (!cardsGrid && !workList) return;

  function thumb(p, baseClass) {
    var inner = p.thumbnail
      ? '<img src="' + p.thumbnail + '" alt="" aria-hidden="true">'
      : '';
    return '<div class="' + baseClass + ' thumb-grain" aria-hidden="true">' + inner + '</div>';
  }

  fetch('/data/projects.json')
    .then(function (res) { return res.json(); })
    .then(function (projects) {

      if (cardsGrid) {
        var featured = projects.filter(function (p) { return p.featured; });
        cardsGrid.innerHTML = featured.map(function (p) {
          return [
            '<li>',
            '  <a class="project-card" href="/work/' + p.slug + '/">',
            '    ' + thumb(p, 'project-card__thumb'),
            '    <div class="project-card__body">',
            '      <h2 class="project-card__title">' + p.title + '</h2>',
            '      <p class="project-card__descriptor">' + p.descriptor + '</p>',
            '    </div>',
            '  </a>',
            '</li>'
          ].join('\n');
        }).join('\n');
      }

      if (workList) {
        var visible = projects.filter(function (p) { return p.visible; });
        workList.innerHTML = visible.map(function (p) {
          return [
            '<li>',
            '  <a class="work-card" href="/work/' + p.slug + '/">',
            '    ' + thumb(p, 'work-card__thumb'),
            '    <div class="work-card__body">',
            '      <h2 class="work-card__title">' + p.title + '</h2>',
            '      <p class="work-card__meta">',
            '        <span class="work-card__role">' + p.role + '</span>',
            '        <span class="work-card__tag">' + p.tag + '</span>',
            '      </p>',
            '      <p class="work-card__descriptor">' + p.descriptor + '</p>',
            '    </div>',
            '  </a>',
            '</li>'
          ].join('\n');
        }).join('\n');
      }

    })
    .catch(function (err) {
      console.warn('projects.js: could not load /data/projects.json', err);
    });
}());

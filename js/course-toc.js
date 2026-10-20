/* ===================================================================
   Sommaire latéral — généré depuis course-data.js.
   Conteneur : <div data-course-toc></div>
   La page de leçon porte <body data-lesson="m2-l3" data-root="../">.
   =================================================================== */
(function () {
  'use strict';

  const Course = window.NotionCourse;
  const Progress = window.NotionProgress;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text) { node.textContent = text; }
    return node;
  }

  function render(container) {
    const root = document.body.dataset.root || '';
    const currentId = document.body.dataset.lesson || '';
    const current = Course.findLesson(currentId);
    const overall = Progress.overall();

    container.innerHTML = '';

    const label = el('p', 'course-toc__progress-label');
    label.appendChild(el('span', '', 'Progression'));
    label.appendChild(el('span', '', overall.done + ' / ' + overall.total + ' leçons'));
    container.appendChild(label);

    const bar = el('div', 'progress course-toc__progress');
    bar.setAttribute('role', 'img');
    bar.setAttribute('aria-label', overall.done + ' leçons terminées sur ' + overall.total);
    const fill = el('div', 'progress__fill');
    fill.style.width = Progress.percent(overall) + '%';
    bar.appendChild(fill);
    container.appendChild(bar);

    const list = el('ul', 'toc');

    Course.MODULES.forEach(function (module) {
      const item = el('li', 'toc__module');
      const moduleProgress = Progress.forModule(module);
      const isCurrentModule = current && current.moduleId === module.id;
      const isModuleDone = moduleProgress.done === moduleProgress.total;

      if (isCurrentModule) {
        item.classList.add('is-current');
        const title = el('span', '', module.title + ' ');
        title.appendChild(el('span', 'toc__count', '· ' + moduleProgress.done + ' / ' + moduleProgress.total));
        item.appendChild(title);

        const lessons = el('ol', 'toc__lessons');
        module.lessons.forEach(function (lesson) {
          const li = el('li');
          const done = Progress.isDone(lesson.id);
          const prefix = done ? '✓ ' : '';
          if (lesson.file) {
            const link = el('a', '', prefix + lesson.title);
            link.href = root + lesson.file;
            if (lesson.id === currentId) { link.setAttribute('aria-current', 'page'); }
            if (done) { link.appendChild(el('span', 'sr-only', ' (terminée)')); }
            li.appendChild(link);
          } else {
            const span = el('span', '', lesson.title);
            span.appendChild(el('span', 'toc__soon', '· bientôt'));
            li.appendChild(span);
          }
          lessons.appendChild(li);
        });
        item.appendChild(lessons);
      } else {
        const link = el('a', '', (isModuleDone ? '✓ ' : '') + module.title);
        link.href = root + 'mon-parcours.html#' + module.id;
        if (isModuleDone) { link.appendChild(el('span', 'sr-only', ' (module terminé)')); }
        item.appendChild(link);
      }

      list.appendChild(item);
    });

    container.appendChild(list);
  }

  function syncDetails() {
    const details = document.querySelector('.course-toc__details');
    if (!details || !window.matchMedia) { return; }
    const desktop = window.matchMedia('(min-width: 1024px)');
    function apply() { details.open = desktop.matches; }
    apply();
    desktop.addEventListener('change', apply);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('[data-course-toc]');
    if (!container) { return; }
    render(container);
    syncDetails();
    document.addEventListener('progress:change', function () { render(container); });
  });
})();

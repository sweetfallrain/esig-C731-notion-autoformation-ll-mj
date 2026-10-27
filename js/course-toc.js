/* ===================================================================
   Sommaire latéral — généré depuis course-data.js.
   Affiche uniquement le module en cours, numéroté :
     Module 1 · Découvrir Notion
       1.1 À quoi sert Notion
         1.1.1 Comprendre · 1.1.2 Voir · 1.1.3 Faire · 1.1.4 Vérifier
       1.2 Se repérer dans l'interface
       1.3 Entrer dans Studio Nova
     ← Les modules
   Les étapes ne sont listées que pour la leçon ouverte ; leurs liens
   (#comprendre, #voir…) sont pris en charge par lesson.js.
   Conteneur : <div data-course-toc></div>
   La page de leçon porte <body data-lesson="m2-l3" data-root="../">.
   =================================================================== */
(function () {
  'use strict';

  const Course = window.NotionCourse;
  const Progress = window.NotionProgress;

  let currentStep = 0;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text) { node.textContent = text; }
    return node;
  }

  function slugify(text) {
    return String(text)
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /** Libellés des étapes de la leçon ouverte, lus dans le repère d'étapes. */
  function stepLabels() {
    return Array.from(document.querySelectorAll('[data-step-target]'))
      .map(function (button) { return button.dataset.stepLabel; });
  }

  function render(container) {
    const root = document.body.dataset.root || '';
    const currentId = document.body.dataset.lesson || '';
    const current = Course.findLesson(currentId);
    if (!current) { return; }
    const module = Course.MODULES.find(function (item) { return item.id === current.moduleId; });
    const lessons = Course.allLessons().filter(function (item) { return item.moduleId === module.id; });
    const moduleProgress = Progress.forModule(module);

    container.innerHTML = '';

    container.appendChild(el('p', 'toc__kicker', 'Module ' + current.moduleNumber));
    container.appendChild(el('p', 'toc__module-title', module.title));

    const label = el('p', 'course-toc__progress-label');
    label.appendChild(el('span', '', 'Progression du module'));
    label.appendChild(el('span', '', moduleProgress.done + ' / ' + moduleProgress.total));
    container.appendChild(label);

    const bar = el('div', 'progress course-toc__progress');
    bar.setAttribute('role', 'img');
    bar.setAttribute('aria-label', moduleProgress.done + ' leçons terminées sur ' + moduleProgress.total + ' dans ce module');
    const fill = el('div', 'progress__fill');
    fill.style.width = Progress.percent(moduleProgress) + '%';
    bar.appendChild(fill);
    container.appendChild(bar);

    const list = el('ol', 'toc__lessons');

    lessons.forEach(function (lesson) {
      const li = el('li');
      const done = Progress.isDone(lesson.id);
      const isCurrent = lesson.id === currentId;

      if (lesson.file) {
        const link = el('a', 'toc__lesson');
        link.href = root + lesson.file;
        link.appendChild(el('span', 'toc__num', lesson.number));
        link.appendChild(el('span', 'toc__title', lesson.title));
        if (done) {
          link.appendChild(el('span', 'toc__done', '✓'));
          link.lastChild.setAttribute('aria-hidden', 'true');
          link.appendChild(el('span', 'sr-only', ' (terminée)'));
        }
        if (isCurrent) { link.setAttribute('aria-current', 'page'); }
        li.appendChild(link);
      } else {
        const span = el('span', 'toc__lesson');
        span.appendChild(el('span', 'toc__num', lesson.number));
        span.appendChild(el('span', 'toc__title', lesson.title));
        span.appendChild(el('span', 'toc__soon', 'bientôt'));
        li.appendChild(span);
      }

      if (isCurrent) {
        const steps = el('ol', 'toc__steps');
        stepLabels().forEach(function (stepLabel, i) {
          const stepItem = el('li');
          const stepLink = el('a', 'toc__step');
          stepLink.href = '#' + slugify(stepLabel);
          stepLink.appendChild(el('span', 'toc__num', lesson.number + '.' + (i + 1)));
          stepLink.appendChild(el('span', 'toc__title', stepLabel));
          if (i === currentStep) { stepLink.setAttribute('aria-current', 'step'); }
          stepItem.appendChild(stepLink);
          steps.appendChild(stepItem);
        });
        li.appendChild(steps);
      }

      list.appendChild(li);
    });

    container.appendChild(list);

    const back = el('a', 'btn btn-outline btn--compact toc__back', 'Les modules');
    back.href = root + 'mon-parcours.html#' + module.id;
    container.appendChild(back);
  }

  function markStep(container) {
    container.querySelectorAll('.toc__step').forEach(function (link, i) {
      if (i === currentStep) {
        link.setAttribute('aria-current', 'step');
      } else {
        link.removeAttribute('aria-current');
      }
    });
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
    document.addEventListener('lesson:step', function (event) {
      currentStep = event.detail.index;
      markStep(container);
    });
  });
})();

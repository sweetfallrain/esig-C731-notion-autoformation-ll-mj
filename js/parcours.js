/* ===================================================================
   Page Mon parcours : progression globale, bouton « Reprendre »,
   accordéon des 9 modules (généré depuis course-data.js).
   =================================================================== */
(function () {
  'use strict';

  const Course = window.NotionCourse;
  const Progress = window.NotionProgress;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text !== undefined) { node.textContent = text; }
    return node;
  }

  function moduleState(module) {
    const p = Progress.forModule(module);
    if (p.done === p.total) { return { label: 'Terminé ✓', className: 'pill pill--done', cta: 'Revoir le module' }; }
    if (p.done > 0) { return { label: 'En cours', className: 'pill pill--doing', cta: 'Continuer' }; }
    return { label: 'À venir', className: 'pill', cta: 'Commencer' };
  }

  function renderSummary() {
    const overall = Progress.overall();
    const count = document.querySelector('[data-overall-count]');
    const fill = document.querySelector('[data-overall-fill]');
    const bar = document.querySelector('[data-overall-bar]');
    const resumeTitle = document.querySelector('[data-resume-title]');
    const resumeLink = document.querySelector('[data-resume-link]');

    const total = document.querySelector('[data-overall-total]');
    if (count) { count.textContent = String(overall.done); }
    if (total) { total.textContent = String(overall.total); }
    if (fill) { fill.style.width = Progress.percent(overall) + '%'; }
    if (bar) { bar.setAttribute('aria-label', overall.done + ' leçons terminées sur ' + overall.total); }

    const next = Progress.nextLesson();
    if (next && resumeTitle && resumeLink) {
      resumeTitle.textContent = next.title;
      resumeLink.href = next.file;
      resumeLink.textContent = overall.done === 0 ? 'Commencer →' : 'Reprendre →';
    }
  }

  function renderModules(list) {
    const openId = (window.location.hash || '').replace('#', '') || null;
    const next = Progress.nextLesson();
    list.innerHTML = '';

    Course.MODULES.forEach(function (module) {
      const p = Progress.forModule(module);
      const state = moduleState(module);
      const containsNext = next && next.moduleId === module.id;
      const startOpen = openId ? openId === module.id : containsNext;

      const item = el('li', 'module-list__item');
      item.id = module.id;

      const head = el('button', 'module-list__head');
      head.type = 'button';
      head.setAttribute('aria-expanded', String(startOpen));
      head.setAttribute('aria-controls', module.id + '-body');
      head.appendChild(el('span', 'module-list__num', module.num));
      const title = el('span', 'module-list__title');
      title.appendChild(el('strong', '', module.title));
      title.appendChild(el('span', '', module.lessons.length + ' leçons · ' + p.done + ' terminée' + (p.done > 1 ? 's' : '')));
      head.appendChild(title);
      head.appendChild(el('span', state.className, state.label));
      const sign = el('span', 'module-list__sign', startOpen ? '−' : '+');
      sign.setAttribute('aria-hidden', 'true');
      head.appendChild(sign);
      item.appendChild(head);

      const body = el('div', 'module-list__body');
      body.id = module.id + '-body';
      body.hidden = !startOpen;
      body.appendChild(el('p', '', module.desc));

      const bar = el('div', 'progress');
      bar.setAttribute('role', 'img');
      bar.setAttribute('aria-label', p.done + ' leçons terminées sur ' + p.total);
      const fill = el('div', 'progress__fill');
      fill.style.width = Progress.percent(p) + '%';
      bar.appendChild(fill);
      body.appendChild(bar);

      const lessons = el('ol', 'lesson-list');
      let firstLink = null;
      module.lessons.forEach(function (lesson) {
        const done = Progress.isDone(lesson.id);
        const isNext = next && next.id === lesson.id;
        const li = el('li', done ? 'is-done' : (isNext ? 'is-current' : ''));
        const dot = el('span', 'lesson-list__dot', done ? '✓' : '');
        dot.setAttribute('aria-hidden', 'true');
        li.appendChild(dot);
        if (lesson.file) {
          const link = el('a', '', lesson.title);
          link.href = lesson.file;
          li.appendChild(link);
          if (isNext || !firstLink) { firstLink = lesson.file; }
        } else {
          li.appendChild(el('span', '', lesson.title));
        }
        const stateText = done ? 'Terminée' : (isNext ? 'Prochaine leçon' : (lesson.file ? lesson.minutes + ' min' : 'Bientôt'));
        li.appendChild(el('span', 'lesson-list__state', stateText));
        lessons.appendChild(li);
      });
      body.appendChild(lessons);

      if (firstLink) {
        const cta = el('a', 'btn btn-outline', state.cta + ' →');
        cta.href = firstLink;
        body.appendChild(cta);
      }

      head.addEventListener('click', function () {
        const open = head.getAttribute('aria-expanded') !== 'true';
        head.setAttribute('aria-expanded', String(open));
        body.hidden = !open;
        sign.textContent = open ? '−' : '+';
      });

      item.appendChild(body);
      list.appendChild(item);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const list = document.querySelector('[data-module-list]');
    if (!list) { return; }
    renderSummary();
    renderModules(list);
  });
})();

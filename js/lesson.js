/* ===================================================================
   Leçon : étapes (Comprendre · Voir · Faire · Vérifier),
   bouton « Marquer comme terminée », liens précédent / suivant.
   =================================================================== */
(function () {
  'use strict';

  const Course = window.NotionCourse;
  const Progress = window.NotionProgress;

  function setupSteps() {
    const buttons = Array.from(document.querySelectorAll('[data-step-target]'));
    const steps = Array.from(document.querySelectorAll('[data-step]'));
    const prev = document.querySelector('[data-step-prev]');
    const next = document.querySelector('[data-step-next]');
    if (steps.length === 0) { return; }

    let current = 0;

    function show(index, moveFocus) {
      current = Math.max(0, Math.min(index, steps.length - 1));

      steps.forEach(function (step, i) { step.hidden = i !== current; });
      buttons.forEach(function (button, i) {
        button.classList.toggle('is-reached', i <= current);
        if (i === current) {
          button.setAttribute('aria-current', 'step');
        } else {
          button.removeAttribute('aria-current');
        }
      });

      if (prev) { prev.hidden = current === 0; }
      if (next) {
        const last = current === steps.length - 1;
        next.hidden = last;
        if (!last) {
          next.textContent = 'Étape suivante : ' + buttons[current + 1].dataset.stepLabel + ' →';
        }
      }

      if (moveFocus) {
        const heading = steps[current].querySelector('h2');
        const target = heading || steps[current];
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        document.querySelector('.lesson-steps').scrollIntoView({ block: 'start' });
      }
    }

    buttons.forEach(function (button, i) {
      button.addEventListener('click', function () { show(i, true); });
    });
    if (prev) { prev.addEventListener('click', function () { show(current - 1, true); }); }
    if (next) { next.addEventListener('click', function () { show(current + 1, true); }); }

    show(0, false);
  }

  function setupDoneButton(lessonId) {
    const button = document.querySelector('[data-lesson-done]');
    if (!button) { return; }

    function update() {
      const done = Progress.isDone(lessonId);
      button.setAttribute('aria-pressed', String(done));
      button.textContent = done ? '✓ Leçon terminée' : 'Marquer comme terminée';
    }

    button.addEventListener('click', function () {
      Progress.setDone(lessonId, !Progress.isDone(lessonId));
      update();
    });
    update();
  }

  function setupLessonNav(lessonId) {
    const root = document.body.dataset.root || '';
    const lessons = Course.allLessons();
    const index = lessons.findIndex(function (lesson) { return lesson.id === lessonId; });
    const prevLink = document.querySelector('[data-lesson-prev]');
    const nextLink = document.querySelector('[data-lesson-next]');

    function fill(link, lesson, arrowFirst) {
      if (!link) { return; }
      if (!lesson || !lesson.file) {
        // Leçon voisine pas encore rédigée : un seul lien « Mon parcours » suffit.
        link.hidden = !arrowFirst;
        link.href = root + 'mon-parcours.html';
        link.textContent = '← Mon parcours';
        return;
      }
      link.href = root + lesson.file;
      link.textContent = arrowFirst ? '← ' + lesson.title : lesson.title + ' →';
    }

    fill(prevLink, lessons[index - 1], true);
    fill(nextLink, lessons[index + 1], false);
  }

  function setupMeta(lessonId) {
    const meta = document.querySelector('[data-lesson-meta]');
    const lesson = Course.findLesson(lessonId);
    if (!meta || !lesson) { return; }
    const root = document.body.dataset.root || '';
    meta.innerHTML = '';
    const link = document.createElement('a');
    link.href = root + 'mon-parcours.html#' + lesson.moduleId;
    link.textContent = lesson.moduleTitle;
    meta.appendChild(link);
    meta.appendChild(document.createTextNode(' · Leçon ' + lesson.index + ' sur ' + lesson.moduleCount + ' · ' + lesson.minutes + ' min'));
  }

  document.addEventListener('DOMContentLoaded', function () {
    const lessonId = document.body.dataset.lesson;
    if (!lessonId) { return; }
    setupSteps();
    setupDoneButton(lessonId);
    setupLessonNav(lessonId);
    setupMeta(lessonId);
  });
})();

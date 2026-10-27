/* ===================================================================
   Leçon : étapes (Comprendre · Voir · Faire · Vérifier) affichées
   comme des pages, numérotation (1.1.1, 1.1.2…), bouton « Marquer comme
   terminée », boutons Étape précédente / Étape suivante / Chapitre
   suivant / Module suivant.
   - Chaque étape a une adresse : lecon.html#comprendre, #voir, #faire,
     #verifier. Un lien vers ces adresses ouvre l'étape correspondante.
   - Chaque changement d'étape ramène en haut de la page.
   - Les étapes sont listées dans le sommaire latéral (course-toc.js) ;
     la carte de leçon n'affiche plus d'onglets.
   - Événement émis : « lesson:step » { index, slug } (lu par le sommaire).
   =================================================================== */
(function () {
  'use strict';

  const Course = window.NotionCourse;
  const Progress = window.NotionProgress;
  const STEP_LABELS = ['Comprendre', 'Voir', 'Faire', 'Vérifier'];

  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  function slugify(text) {
    return String(text)
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  /** Cible du bouton de la dernière étape : chapitre suivant, module suivant ou retour aux modules. */
  function nextTarget(lesson) {
    const root = document.body.dataset.root || '';
    const lessons = Course.allLessons();
    const index = lessons.findIndex(function (item) { return item.id === lesson.id; });
    const next = lessons[index + 1];

    if (!next || !next.file) {
      return { href: root + 'mon-parcours.html', text: 'Retour aux modules →' };
    }
    if (next.moduleId === lesson.moduleId) {
      return { href: root + next.file, text: 'Chapitre suivant : ' + next.number + ' ' + next.title + ' →' };
    }
    return { href: root + next.file, text: 'Module suivant : ' + next.moduleNumber + ' · ' + next.moduleTitle + ' →' };
  }

  function setupSteps(lesson) {
    const steps = Array.from(document.querySelectorAll('[data-step]'));
    const prev = document.querySelector('[data-nav-prev]');
    const next = document.querySelector('[data-nav-next]');
    if (steps.length === 0) { return; }

    const labels = STEP_LABELS.slice(0, steps.length);
    const slugs = labels.map(slugify);
    const last = steps.length - 1;
    const finalTarget = nextTarget(lesson);
    let current = 0;

    function indexFromHash() {
      const slug = decodeURIComponent((window.location.hash || '').replace('#', ''));
      return slugs.indexOf(slug);
    }

    function updateNav() {
      if (prev) {
        prev.hidden = current === 0;
        if (current > 0) {
          prev.href = '#' + slugs[current - 1];
          prev.textContent = '← Étape précédente : ' + labels[current - 1];
        }
      }
      if (next) {
        if (current < last) {
          next.href = '#' + slugs[current + 1];
          next.textContent = 'Étape suivante : ' + labels[current + 1] + ' →';
        } else {
          next.href = finalTarget.href;
          next.textContent = finalTarget.text;
        }
      }
    }

    function show(index, moveFocus) {
      current = Math.max(0, Math.min(index, last));

      steps.forEach(function (step, i) { step.hidden = i !== current; });

      updateNav();

      if (moveFocus) {
        const heading = steps[current].querySelector('h2');
        const target = heading || steps[current];
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
      scrollToTop();

      document.dispatchEvent(new CustomEvent('lesson:step', {
        detail: { index: current, slug: slugs[current] }
      }));
    }

    function go(index) {
      try {
        window.history.replaceState(null, '', '#' + slugs[index]);
      } catch (error) {
        // Adresse non modifiable (certains contextes locaux) : l'étape s'affiche quand même.
      }
      show(index, true);
    }

    // Tout lien vers « #voir », « #faire »… (boutons du bas, sommaire latéral) ouvre l'étape.
    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[href^="#"]');
      if (!link) { return; }
      const index = slugs.indexOf(link.getAttribute('href').slice(1));
      if (index === -1) { return; }
      event.preventDefault();
      go(index);
    });

    window.addEventListener('hashchange', function () {
      const index = indexFromHash();
      if (index !== -1 && index !== current) { show(index, true); }
    });

    const start = indexFromHash();
    show(start === -1 ? 0 : start, false);
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

  function setupHeading(lesson) {
    const meta = document.querySelector('[data-lesson-meta]');
    const root = document.body.dataset.root || '';
    if (meta) {
      meta.innerHTML = '';
      const link = document.createElement('a');
      link.href = root + 'mon-parcours.html#' + lesson.moduleId;
      link.textContent = 'Module ' + lesson.moduleNumber + ' · ' + lesson.moduleTitle;
      meta.appendChild(link);
      meta.appendChild(document.createTextNode(' · ' + lesson.minutes + ' min'));
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const lessonId = document.body.dataset.lesson;
    const lesson = lessonId ? Course.findLesson(lessonId) : null;
    if (!lesson) { return; }
    setupHeading(lesson);
    setupSteps(lesson);
    setupDoneButton(lessonId);
  });

  window.addEventListener('load', function () {
    if (document.body.dataset.lesson) { scrollToTop(); }
  });
})();

/* ===================================================================
   Affichage « appli » sur téléphone (< 600 px)
   1. En-tête qui se cache quand on descend et revient quand on remonte.
   2. Barre fixe en bas des leçons : Précédent · étape en cours · Suivant.
      Les boutons reprennent les liens du bas de page (lesson.js), donc la
      logique (étapes, leçon terminée, chapitre suivant) reste la même.
   3. Sommaire du module en panneau qui monte du bas (touche le centre
      de la barre).
   Sur ordinateur, rien ne change.
   =================================================================== */
(function () {
  'use strict';

  if (!window.matchMedia) { return; }
  const phone = window.matchMedia('(max-width: 599px)');

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text) { node.textContent = text; }
    return node;
  }

  /* ---------- 1. En-tête masquable ---------- */
  function setupHeader() {
    const header = document.querySelector('.site-header');
    if (!header) { return; }
    let last = window.scrollY;
    let ticking = false;

    function update() {
      const y = window.scrollY;
      const down = y > last + 4;
      const up = y < last - 4;
      if (!phone.matches || y < 80 || up) {
        header.classList.remove('is-hidden');
        document.body.classList.remove('header-hidden');
      } else if (down) {
        header.classList.add('is-hidden');
        document.body.classList.add('header-hidden');
      }
      if (down || up) { last = y; }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  /* ---------- 3. Sommaire en panneau ---------- */
  function setupSheet() {
    const toc = document.querySelector('.course-toc');
    const details = toc && toc.querySelector('.course-toc__details');
    if (!toc || !details) { return null; }

    const backdrop = el('div', 'sheet-backdrop');
    backdrop.hidden = true;
    document.body.appendChild(backdrop);

    const head = el('div', 'sheet__head');
    head.appendChild(el('span', 'sheet__grip'));
    const close = el('button', 'sheet__close', 'Fermer');
    close.type = 'button';
    head.appendChild(close);
    toc.insertBefore(head, toc.firstChild);

    let opener = null;

    function setOpen(open) {
      toc.classList.toggle('is-open', open);
      backdrop.hidden = !open;
      document.body.classList.toggle('sheet-open', open);
      if (open) {
        details.open = true;
        toc.setAttribute('role', 'dialog');
        toc.setAttribute('aria-modal', 'true');
        close.focus();
      } else {
        toc.removeAttribute('role');
        toc.removeAttribute('aria-modal');
        if (opener) { opener.focus(); }
      }
    }

    function applyMode() {
      toc.classList.toggle('course-toc--sheet', phone.matches);
      if (phone.matches) { details.open = true; } else { setOpen(false); }
    }

    close.addEventListener('click', function () { setOpen(false); });
    backdrop.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toc.classList.contains('is-open')) { setOpen(false); }
    });
    // Choisir une étape dans le panneau le referme
    toc.addEventListener('click', function (event) {
      if (event.target.closest('a')) { setOpen(false); }
    });

    applyMode();
    phone.addEventListener('change', applyMode);

    return {
      open: function (from) { opener = from; setOpen(true); }
    };
  }

  /* ---------- 2. Barre du bas ---------- */
  function setupBar(sheet) {
    const navPrev = document.querySelector('[data-nav-prev]');
    const navNext = document.querySelector('[data-nav-next]');
    if (!navNext || !document.body.dataset.lesson) { return; }

    const steps = Array.from(document.querySelectorAll('[data-step]'));
    const labels = steps.map(function (step) { return step.dataset.step; });

    const bar = el('nav', 'app-bar');
    bar.setAttribute('aria-label', 'Navigation de la leçon');

    const prev = el('a', 'app-bar__btn app-bar__prev');
    prev.innerHTML = '<span aria-hidden="true">‹</span><span class="sr-only">Étape précédente</span>';

    const middle = el('button', 'app-bar__middle');
    middle.type = 'button';
    const middleLabel = el('span', 'app-bar__label');
    const middleTitle = el('span', 'app-bar__title');
    const dots = el('span', 'app-bar__dots');
    dots.setAttribute('aria-hidden', 'true');
    steps.forEach(function () { dots.appendChild(el('span', 'app-bar__dot')); });
    middle.appendChild(middleLabel);
    middle.appendChild(middleTitle);
    if (steps.length) { middle.appendChild(dots); }

    const next = el('a', 'app-bar__btn app-bar__next');

    bar.appendChild(prev);
    bar.appendChild(middle);
    bar.appendChild(next);
    document.body.appendChild(bar);
    document.body.classList.add('has-app-bar');

    prev.addEventListener('click', function (event) {
      if (!navPrev || navPrev.hidden) { event.preventDefault(); return; }
      event.preventDefault();
      navPrev.click();
    });
    next.addEventListener('click', function (event) {
      event.preventDefault();
      navNext.click();
    });
    middle.addEventListener('click', function () { if (sheet) { sheet.open(middle); } });
    if (!sheet) { middle.disabled = true; }

    function update() {
      const current = Math.max(0, steps.findIndex(function (step) { return !step.hidden; }));
      const last = steps.length - 1;

      prev.href = navPrev ? navPrev.getAttribute('href') : '#';
      const noPrev = !navPrev || navPrev.hidden;
      prev.classList.toggle('is-disabled', noPrev);
      prev.setAttribute('aria-disabled', String(noPrev));

      next.href = navNext.getAttribute('href');
      let nextText = 'Suivant';
      if (!steps.length || current === last) {
        const text = navNext.textContent;
        if (/^Module suivant/.test(text)) { nextText = 'Module suivant'; }
        else if (/^Chapitre suivant/.test(text)) { nextText = 'Leçon suivante'; }
        else { nextText = 'Terminer'; }
      }
      next.innerHTML = '';
      next.appendChild(el('span', '', nextText));
      next.appendChild(el('span', 'app-bar__arrow', '›'));
      next.setAttribute('aria-label', navNext.textContent.replace(/[→←]/g, '').trim());

      if (steps.length) {
        middleLabel.textContent = 'Étape ' + (current + 1) + ' sur ' + steps.length;
        middleTitle.textContent = labels[current];
        Array.from(dots.children).forEach(function (dot, i) {
          dot.classList.toggle('is-done', i < current);
          dot.classList.toggle('is-current', i === current);
        });
      } else {
        middleLabel.textContent = 'Sommaire';
        middleTitle.textContent = 'du module';
      }
      middle.setAttribute('aria-label', middleLabel.textContent + ' : ' + middleTitle.textContent + '. Ouvrir le sommaire du module');
    }

    update();
    document.addEventListener('lesson:step', update);
    document.addEventListener('progress:change', update);
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupHeader();
    const sheet = setupSheet();
    setupBar(sheet);
  });
})();

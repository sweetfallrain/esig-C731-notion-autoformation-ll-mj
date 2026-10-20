/* ===================================================================
   Simulations inspirées de l'interface de Notion.

   1. Fausse page Notion « survolable »
      <div data-notion-sim>
        <div class="notion-block notion-block--h1" data-block-info="…">
          <button class="notion-block__btn" aria-describedby="…">…</button>
          <span class="notion-block__label" aria-hidden="true">Bloc titre 1</span>
        </div> …
        <p data-notion-info aria-live="polite">…</p>
      </div>

   2. (La base « Projets » est simulée par js/db-sim.js.)
   =================================================================== */
(function () {
  'use strict';

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text !== undefined) { node.textContent = text; }
    return node;
  }

  /* ---------- 1. Fausse page Notion ---------- */

  function setupPageSim(sim) {
    const blocks = Array.from(sim.querySelectorAll('.notion-block'));
    const info = sim.querySelector('[data-notion-info]');

    function activate(block) {
      blocks.forEach(function (other) { other.classList.toggle('is-active', other === block); });
      const label = block.querySelector('.notion-block__label').textContent;
      info.innerHTML = '';
      const strong = document.createElement('strong');
      strong.textContent = label + '. ';
      info.appendChild(strong);
      info.appendChild(document.createTextNode(block.dataset.blockInfo));
    }

    blocks.forEach(function (block) {
      const button = block.querySelector('.notion-block__btn');
      button.addEventListener('mouseenter', function () { activate(block); });
      button.addEventListener('focus', function () { activate(block); });
      button.addEventListener('click', function () { activate(block); });
    });
  }

  /* ---------- 3. Interface simulée avec points numérotés ----------
     <div data-ui-sim> … <button class="hotspot" data-hotspot
       data-title="…" data-info="…">1</button> … <p data-ui-info aria-live="polite"></p></div> */

  function setupUiSim(sim) {
    const spots = Array.from(sim.querySelectorAll('[data-hotspot]'));
    const info = sim.querySelector('[data-ui-info]');

    function show(spot) {
      spots.forEach(function (other) { other.setAttribute('aria-pressed', String(other === spot)); });
      info.innerHTML = '';
      info.appendChild(el('strong', '', spot.textContent + '. ' + spot.dataset.title + '. '));
      info.appendChild(document.createTextNode(spot.dataset.info));
    }

    spots.forEach(function (spot) {
      spot.setAttribute('aria-pressed', 'false');
      spot.setAttribute('aria-label', 'Point ' + spot.textContent + ' : ' + spot.dataset.title);
      spot.addEventListener('click', function () { show(spot); });
    });
  }

  /* ---------- 4. Carte de l'espace Studio Nova ----------
     <li data-built-by="m1-l3"> … <span class="pill" data-built-state></span></li>
     La partie est « Créée » quand la leçon qui la construit est terminée. */

  function setupSpaceMap(map) {
    function render() {
      map.querySelectorAll('[data-built-by]').forEach(function (item) {
        const done = window.NotionProgress && window.NotionProgress.isDone(item.dataset.builtBy);
        const state = item.querySelector('[data-built-state]');
        state.className = done ? 'pill pill--done' : 'pill';
        state.textContent = done ? 'Créée ✓' : state.dataset.todo;
      });
    }
    render();
    document.addEventListener('progress:change', render);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-ui-sim]').forEach(setupUiSim);
    document.querySelectorAll('[data-space-map]').forEach(setupSpaceMap);
    document.querySelectorAll('[data-notion-sim]').forEach(setupPageSim);
  });
})();

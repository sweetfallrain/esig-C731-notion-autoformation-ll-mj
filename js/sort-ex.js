/* ===================================================================
   Exercice de classement à correction immédiate (modules 6 et 7).

   <div class="sort-ex" data-sort-ex>
     <div class="sort-ex__row" data-answer="projets" data-explain="…">
       <label for="x1" class="sort-ex__label">« Maquette Orion v2 »</label>
       <select id="x1"> <option value="">Choisis…</option> … </select>
       <p class="sort-ex__feedback" hidden></p>
     </div> …
     <button data-sort-check>Vérifier mes réponses</button>
     <button data-sort-reset>Recommencer</button>
     <p data-sort-score role="status"></p>
   </div>
   =================================================================== */
(function () {
  'use strict';

  function setup(ex) {
    const rows = Array.from(ex.querySelectorAll('.sort-ex__row'));
    const score = ex.querySelector('[data-sort-score]');
    const check = ex.querySelector('[data-sort-check]');
    const reset = ex.querySelector('[data-sort-reset]');

    function clear(row) {
      row.classList.remove('is-correct', 'is-wrong');
      const fb = row.querySelector('.sort-ex__feedback');
      fb.hidden = true;
      fb.textContent = '';
    }

    rows.forEach(function (row) {
      row.querySelector('select').addEventListener('change', function () { clear(row); score.textContent = ''; });
    });

    check.addEventListener('click', function () {
      let good = 0;
      let empty = 0;
      rows.forEach(function (row) {
        const select = row.querySelector('select');
        const fb = row.querySelector('.sort-ex__feedback');
        clear(row);
        if (!select.value) { empty++; return; }
        const ok = select.value === row.dataset.answer;
        if (ok) { good++; }
        row.classList.add(ok ? 'is-correct' : 'is-wrong');
        const answerText = select.querySelector('option[value="' + row.dataset.answer + '"]').textContent;
        fb.textContent = (ok ? '✓ Bonne réponse. ' : '✗ Réponse attendue : ' + answerText + '. ') + row.dataset.explain;
        fb.hidden = false;
      });
      score.textContent = empty
        ? 'Choisis une réponse pour chaque ligne (' + empty + ' sans réponse).'
        : good + ' bonne' + (good > 1 ? 's' : '') + ' réponse' + (good > 1 ? 's' : '') + ' sur ' + rows.length + '.';
    });

    if (reset) {
      reset.addEventListener('click', function () {
        rows.forEach(function (row) { row.querySelector('select').value = ''; clear(row); });
        score.textContent = '';
        rows[0].querySelector('select').focus();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-sort-ex]').forEach(setup);
  });
})();

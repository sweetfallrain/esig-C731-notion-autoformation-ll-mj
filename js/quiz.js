/* ===================================================================
   Quiz à correction immédiate, avec sauvegarde des réponses.
   Structure attendue :
   <div class="quiz" data-quiz>
     <fieldset> <legend>…</legend>
       <label class="quiz__option"><input type="radio" name="q1" value="a"
         data-correct> <span class="quiz__option-text">…</span>
         <span class="quiz__tag" aria-hidden="true"></span></label> …
     </fieldset>
     <p class="quiz__error" data-quiz-error hidden>…</p>
     <p class="quiz__feedback" data-quiz-feedback role="status" hidden>…</p>
     <button data-quiz-validate>…</button> <button data-quiz-reset>…</button>
   </div>
   Le texte de correction est écrit dans data-quiz-feedback ; le script
   ajoute seulement « Bonne réponse. » ou « Pas tout à fait. » devant.

   Sauvegarde : la réponse choisie et son état (validée ou non) sont
   gardés dans le navigateur (localStorage, via progress.js), sous la clé
   notion-formation:quiz:<leçon>:<numéro du quiz dans la page>.
   Ils restent sur cet appareil et ce navigateur ; « Recommencer » les efface.
   =================================================================== */
(function () {
  'use strict';

  const Store = window.NotionProgress && window.NotionProgress.storage;

  function load(key) {
    if (!Store || !key) { return null; }
    try {
      return JSON.parse(Store.get(key) || 'null');
    } catch (error) {
      return null;
    }
  }

  function save(key, data) {
    if (!Store || !key) { return; }
    Store.set(key, data ? JSON.stringify(data) : null);
  }

  function setupQuiz(quiz, key) {
    const inputs = Array.from(quiz.querySelectorAll('input[type="radio"]'));
    const error = quiz.querySelector('[data-quiz-error]');
    const feedback = quiz.querySelector('[data-quiz-feedback]');
    const verdict = quiz.querySelector('[data-quiz-verdict]');
    const validate = quiz.querySelector('[data-quiz-validate]');
    const reset = quiz.querySelector('[data-quiz-reset]');

    function clearMarks() {
      inputs.forEach(function (input) {
        const option = input.closest('.quiz__option');
        option.classList.remove('is-correct', 'is-wrong');
        option.querySelector('.quiz__tag').textContent = '';
      });
      if (feedback) { feedback.hidden = true; }
    }

    function correct(chosen) {
      clearMarks();

      inputs.forEach(function (input) {
        const option = input.closest('.quiz__option');
        const tag = option.querySelector('.quiz__tag');
        if (input.hasAttribute('data-correct')) {
          option.classList.add('is-correct');
          tag.textContent = 'Bonne réponse';
        } else if (input === chosen) {
          option.classList.add('is-wrong');
          tag.textContent = 'Ta réponse';
        }
      });

      const right = chosen.hasAttribute('data-correct');
      verdict.textContent = right ? 'Bonne réponse. ' : 'Pas tout à fait. ';
      feedback.hidden = false;
    }

    inputs.forEach(function (input) {
      input.addEventListener('change', function () {
        if (error) { error.hidden = true; }
        clearMarks();
        save(key, { value: input.value, validated: false });
      });
    });

    validate.addEventListener('click', function () {
      const chosen = inputs.find(function (input) { return input.checked; });
      if (!chosen) {
        error.hidden = false;
        return;
      }
      correct(chosen);
      save(key, { value: chosen.value, validated: true });
    });

    if (reset) {
      reset.addEventListener('click', function () {
        inputs.forEach(function (input) { input.checked = false; });
        if (error) { error.hidden = true; }
        clearMarks();
        save(key, null);
        inputs[0].focus();
      });
    }

    // Réponse enregistrée lors d'une visite précédente
    const saved = load(key);
    if (saved && saved.value) {
      const chosen = inputs.find(function (input) { return input.value === saved.value; });
      if (chosen) {
        chosen.checked = true;
        if (saved.validated) { correct(chosen); }
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const lessonId = document.body.dataset.lesson || '';
    document.querySelectorAll('[data-quiz]').forEach(function (quiz, index) {
      const key = lessonId ? 'notion-formation:quiz:' + lessonId + ':' + (index + 1) : null;
      setupQuiz(quiz, key);
    });
  });
})();

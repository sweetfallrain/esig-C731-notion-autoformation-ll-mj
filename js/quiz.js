/* ===================================================================
   Quiz à correction immédiate.
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
   =================================================================== */
(function () {
  'use strict';

  function setupQuiz(quiz) {
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

    inputs.forEach(function (input) {
      input.addEventListener('change', function () {
        if (error) { error.hidden = true; }
        clearMarks();
      });
    });

    validate.addEventListener('click', function () {
      const chosen = inputs.find(function (input) { return input.checked; });
      if (!chosen) {
        error.hidden = false;
        return;
      }
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
    });

    if (reset) {
      reset.addEventListener('click', function () {
        inputs.forEach(function (input) { input.checked = false; });
        if (error) { error.hidden = true; }
        clearMarks();
        inputs[0].focus();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-quiz]').forEach(setupQuiz);
  });
})();

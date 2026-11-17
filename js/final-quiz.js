/* ===================================================================
   Questionnaire final (module 9) : on répond à toutes les questions,
   puis un seul bouton corrige l'ensemble et donne le score.
   Structure attendue :
   <div data-final-quiz>
     <div data-fq-question> <fieldset> … <input type="radio" name="fq1"
       value="a" data-correct> … </fieldset>
       <p data-fq-explain hidden><strong data-fq-verdict></strong>…</p> </div> …
     <p data-fq-error hidden></p>
     <button data-fq-check>…</button> <button data-fq-reset>…</button>
     <div data-fq-result hidden><p data-fq-score></p><p data-fq-message></p></div>
   </div>
   Sauvegarde : réponses et état corrigé gardés dans le navigateur
   (via progress.js), clé notion-formation:final:<leçon>.
   =================================================================== */
(function () {
  'use strict';

  const Store = window.NotionProgress && window.NotionProgress.storage;

  function load(key) {
    if (!Store) { return null; }
    try { return JSON.parse(Store.get(key) || 'null'); } catch (error) { return null; }
  }

  function save(key, data) {
    if (!Store) { return; }
    Store.set(key, data ? JSON.stringify(data) : null);
  }

  function setup(root, key) {
    const questions = Array.from(root.querySelectorAll('[data-fq-question]'));
    const error = root.querySelector('[data-fq-error]');
    const check = root.querySelector('[data-fq-check]');
    const reset = root.querySelector('[data-fq-reset]');
    const result = root.querySelector('[data-fq-result]');
    const score = root.querySelector('[data-fq-score]');
    const message = root.querySelector('[data-fq-message]');
    const total = questions.length;
    let corrected = false;

    function inputsOf(question) { return Array.from(question.querySelectorAll('input[type="radio"]')); }
    function chosenOf(question) { return inputsOf(question).find(function (input) { return input.checked; }) || null; }

    function answers() {
      const data = {};
      questions.forEach(function (question, i) {
        const chosen = chosenOf(question);
        if (chosen) { data[i] = chosen.value; }
      });
      return data;
    }

    function clearMarks() {
      questions.forEach(function (question) {
        inputsOf(question).forEach(function (input) {
          const option = input.closest('.quiz__option');
          option.classList.remove('is-correct', 'is-wrong');
          option.querySelector('.quiz__tag').textContent = '';
          input.disabled = false;
        });
        question.querySelector('[data-fq-explain]').hidden = true;
      });
      result.hidden = true;
      corrected = false;
    }

    function correctAll() {
      let good = 0;
      questions.forEach(function (question) {
        const chosen = chosenOf(question);
        const right = Boolean(chosen && chosen.hasAttribute('data-correct'));
        if (right) { good++; }
        inputsOf(question).forEach(function (input) {
          const option = input.closest('.quiz__option');
          const tag = option.querySelector('.quiz__tag');
          if (input.hasAttribute('data-correct')) {
            option.classList.add('is-correct');
            tag.textContent = 'Bonne réponse';
          } else if (input === chosen) {
            option.classList.add('is-wrong');
            tag.textContent = 'Ta réponse';
          }
          input.disabled = true;
        });
        question.querySelector('[data-fq-verdict]').textContent = right ? 'Bonne réponse. ' : 'Pas tout à fait. ';
        question.querySelector('[data-fq-explain]').hidden = false;
      });
      score.textContent = 'Ton score : ' + good + ' sur ' + total;
      if (good >= total - 3) {
        message.textContent = 'Bravo, tu maîtrises les bases de Notion. Relis quand même les explications de tes erreurs.';
      } else if (good >= Math.ceil(total / 2)) {
        message.textContent = 'Bonne base. Revois les leçons indiquées sous tes erreurs, puis recommence le questionnaire.';
      } else {
        message.textContent = 'Reprends les leçons indiquées sous tes erreurs, puis recommence le questionnaire : tu verras la différence.';
      }
      result.hidden = false;
      corrected = true;
    }

    questions.forEach(function (question) {
      inputsOf(question).forEach(function (input) {
        input.addEventListener('change', function () {
          if (error) { error.hidden = true; }
          save(key, { answers: answers(), corrected: false });
        });
      });
    });

    check.addEventListener('click', function () {
      if (corrected) { result.focus(); return; }
      const missing = [];
      questions.forEach(function (question, i) { if (!chosenOf(question)) { missing.push(i + 1); } });
      if (missing.length) {
        error.textContent = missing.length === 1
          ? 'Il te reste une question sans réponse : la question ' + missing[0] + '.'
          : 'Il te reste ' + missing.length + ' questions sans réponse : ' + missing.join(', ') + '.';
        error.hidden = false;
        inputsOf(questions[missing[0] - 1])[0].focus();
        return;
      }
      correctAll();
      save(key, { answers: answers(), corrected: true });
      result.focus();
    });

    reset.addEventListener('click', function () {
      clearMarks();
      questions.forEach(function (question) { inputsOf(question).forEach(function (input) { input.checked = false; }); });
      if (error) { error.hidden = true; }
      save(key, null);
      inputsOf(questions[0])[0].focus();
    });

    // Réponses enregistrées lors d'une visite précédente
    const saved = load(key);
    if (saved && saved.answers) {
      questions.forEach(function (question, i) {
        const value = saved.answers[i];
        const input = inputsOf(question).find(function (item) { return item.value === value; });
        if (input) { input.checked = true; }
      });
      if (saved.corrected) { correctAll(); }
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const lessonId = document.body.dataset.lesson || 'page';
    document.querySelectorAll('[data-final-quiz]').forEach(function (root) {
      setup(root, 'notion-formation:final:' + lessonId);
    });
  });
})();

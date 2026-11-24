/* ===================================================================
   Mini-quiz : toutes les questions d'une étape sont corrigées en une fois.
   Structure attendue pour chaque question :
   <div class="quiz" data-quiz>
     <fieldset> <legend>…</legend>
       <label class="quiz__option"><input type="radio" name="q1" value="a"
         data-correct> <span class="quiz__option-text">…</span>
         <span class="quiz__tag" aria-hidden="true"></span></label> …
     </fieldset>
     <p class="quiz__error" data-quiz-error hidden>…</p>
     <p class="quiz__feedback" data-quiz-feedback role="status" hidden>…</p>
     <div class="quiz__actions">…</div>
   </div>
   Le script masque les boutons de chaque question et ajoute, après la
   dernière question de l'étape, un seul bloc : « Vérifier mes réponses »,
   le score (« 2 bonnes réponses sur 3 ») et « Recommencer ».
   Le texte de correction est écrit dans data-quiz-feedback ; le script
   ajoute seulement « Bonne réponse. » ou « Pas tout à fait. » devant.

   Sauvegarde : la réponse choisie et son état (corrigée ou non) sont
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

  /** Une question : lit la réponse, affiche ou efface la correction. */
  function makeQuestion(quiz, key, onChange) {
    const inputs = Array.from(quiz.querySelectorAll('input[type="radio"]'));
    const error = quiz.querySelector('[data-quiz-error]');
    const feedback = quiz.querySelector('[data-quiz-feedback]');
    const verdict = quiz.querySelector('[data-quiz-verdict]');

    quiz.classList.add('quiz--grouped');

    function chosen() {
      return inputs.find(function (input) { return input.checked; }) || null;
    }

    function clear() {
      quiz.classList.remove('is-missing', 'is-right', 'is-wrong-answer');
      inputs.forEach(function (input) {
        const option = input.closest('.quiz__option');
        option.classList.remove('is-correct', 'is-wrong');
        option.querySelector('.quiz__tag').textContent = '';
      });
      if (feedback) { feedback.hidden = true; }
      if (error) { error.hidden = true; }
    }

    /** Affiche la correction ; renvoie true si la réponse est juste. */
    function correct() {
      const answer = chosen();
      clear();
      inputs.forEach(function (input) {
        const option = input.closest('.quiz__option');
        const tag = option.querySelector('.quiz__tag');
        if (input.hasAttribute('data-correct')) {
          option.classList.add('is-correct');
          tag.textContent = 'Bonne réponse';
        } else if (input === answer) {
          option.classList.add('is-wrong');
          tag.textContent = 'Ta réponse';
        }
      });
      const right = answer.hasAttribute('data-correct');
      quiz.classList.add(right ? 'is-right' : 'is-wrong-answer');
      if (verdict) { verdict.textContent = right ? 'Bonne réponse. ' : 'Pas tout à fait. '; }
      if (feedback) { feedback.hidden = false; }
      save(key, { value: answer.value, validated: true });
      return right;
    }

    function markMissing() {
      quiz.classList.add('is-missing');
      if (error) {
        error.textContent = 'Choisis une réponse à cette question.';
        error.hidden = false;
      }
    }

    function reset() {
      inputs.forEach(function (input) { input.checked = false; });
      clear();
      save(key, null);
    }

    inputs.forEach(function (input) {
      input.addEventListener('change', function () {
        clear();
        save(key, { value: input.value, validated: false });
        onChange();
      });
    });

    // Réponse enregistrée lors d'une visite précédente
    let validated = false;
    const saved = load(key);
    if (saved && saved.value) {
      const answer = inputs.find(function (input) { return input.value === saved.value; });
      if (answer) {
        answer.checked = true;
        validated = !!saved.validated;
      }
    }

    return {
      quiz: quiz,
      chosen: chosen,
      correct: correct,
      clear: clear,
      markMissing: markMissing,
      reset: reset,
      wasValidated: validated,
      focus: function () { inputs[0].focus(); }
    };
  }

  /** Un bloc « Vérifier mes réponses » pour toutes les questions d'une étape. */
  function setupGroup(quizzes, keys) {
    let questions = [];
    const total = quizzes.length;

    const box = document.createElement('div');
    box.className = 'quiz-check';
    const score = document.createElement('p');
    score.className = 'quiz-check__score';
    score.setAttribute('role', 'status');
    score.hidden = true;
    const missing = document.createElement('p');
    missing.className = 'quiz-check__missing';
    missing.setAttribute('role', 'alert');
    missing.hidden = true;
    const actions = document.createElement('div');
    actions.className = 'quiz-check__actions';
    const check = document.createElement('button');
    check.type = 'button';
    check.className = 'btn btn-primary';
    check.textContent = total > 1 ? 'Vérifier mes réponses' : 'Vérifier ma réponse';
    const again = document.createElement('button');
    again.type = 'button';
    again.className = 'btn btn-outline';
    again.textContent = 'Recommencer';
    again.hidden = true;
    actions.appendChild(check);
    actions.appendChild(again);
    box.appendChild(missing);
    box.appendChild(score);
    box.appendChild(actions);
    const last = quizzes[quizzes.length - 1];
    last.parentNode.insertBefore(box, last.nextSibling);

    function stale() {
      // Une réponse modifiée après correction : le score n'est plus à jour
      score.hidden = true;
      missing.hidden = true;
      box.classList.remove('is-done');
      check.hidden = false;
    }

    function showScore(right) {
      let text;
      if (right === total) {
        text = total > 1 ? 'Bravo, ' + right + ' bonnes réponses sur ' + total + ' ! Tu peux passer à la suite.' : 'Bravo, c\'est la bonne réponse ! Tu peux passer à la suite.';
      } else {
        text = (right > 1 ? right + ' bonnes réponses' : right + ' bonne réponse') + ' sur ' + total + '. Lis les corrections sous chaque question, puis réessaie si tu veux.';
      }
      score.textContent = text;
      score.hidden = false;
      box.classList.add('is-done');
      check.hidden = true;
      again.hidden = false;
    }

    function verify() {
      const empty = questions.filter(function (q) { return !q.chosen(); });
      if (empty.length) {
        empty.forEach(function (q) { q.markMissing(); });
        const numbers = empty.map(function (q) { return questions.indexOf(q) + 1; });
        missing.textContent = numbers.length > 1
          ? 'Il te manque les questions ' + numbers.slice(0, -1).join(', ') + ' et ' + numbers[numbers.length - 1] + '.'
          : 'Il te manque la question ' + numbers[0] + '.';
        missing.hidden = false;
        score.hidden = true;
        empty[0].quiz.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      missing.hidden = true;
      let right = 0;
      questions.forEach(function (q) { if (q.correct()) { right++; } });
      showScore(right);
      box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    questions = quizzes.map(function (quiz, i) { return makeQuestion(quiz, keys[i], stale); });

    check.addEventListener('click', verify);
    again.addEventListener('click', function () {
      questions.forEach(function (q) { q.reset(); });
      stale();
      again.hidden = true;
      questions[0].quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
      questions[0].focus();
    });

    // Toutes les questions déjà corrigées lors d'une visite précédente
    if (questions.every(function (q) { return q.wasValidated && q.chosen(); })) {
      let right = 0;
      questions.forEach(function (q) { if (q.correct()) { right++; } });
      showScore(right);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const lessonId = document.body.dataset.lesson || '';
    const all = Array.from(document.querySelectorAll('[data-quiz]'));
    const groups = new Map();
    all.forEach(function (quiz, index) {
      const key = lessonId ? 'notion-formation:quiz:' + lessonId + ':' + (index + 1) : null;
      const owner = quiz.closest('[data-step]') || quiz.parentNode;
      if (!groups.has(owner)) { groups.set(owner, { quizzes: [], keys: [] }); }
      groups.get(owner).quizzes.push(quiz);
      groups.get(owner).keys.push(key);
    });
    groups.forEach(function (group) { setupGroup(group.quizzes, group.keys); });
  });
})();

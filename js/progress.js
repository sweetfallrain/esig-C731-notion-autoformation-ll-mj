/* ===================================================================
   Progression — leçons terminées, stockées en localStorage.
   Clé : notion-formation:lecon-terminee:<id>
   localStorage peut être indisponible (navigation privée, fichier local
   bloqué) : chaque accès est protégé et le site reste utilisable.
   =================================================================== */
(function () {
  'use strict';

  const PREFIX = 'notion-formation:lecon-terminee:';
  const memory = {};

  function read(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return memory[key] || null;
    }
  }

  function write(key, value) {
    try {
      if (value === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      if (value === null) {
        delete memory[key];
      } else {
        memory[key] = value;
      }
    }
  }

  function isDone(lessonId) {
    return read(PREFIX + lessonId) === 'true';
  }

  function setDone(lessonId, done) {
    write(PREFIX + lessonId, done ? 'true' : null);
    document.dispatchEvent(new CustomEvent('progress:change', { detail: { lessonId: lessonId, done: done } }));
  }

  /** { done, total } sur l'ensemble du parcours. */
  function overall() {
    const lessons = window.NotionCourse.allLessons();
    const done = lessons.filter(function (lesson) { return isDone(lesson.id); }).length;
    return { done: done, total: lessons.length };
  }

  /** { done, total } pour un module. */
  function forModule(module) {
    const done = module.lessons.filter(function (lesson) { return isDone(lesson.id); }).length;
    return { done: done, total: module.lessons.length };
  }

  /** Première leçon non terminée qui possède une page, sinon la première leçon disponible. */
  function nextLesson() {
    const available = window.NotionCourse.allLessons().filter(function (lesson) { return lesson.file; });
    return available.find(function (lesson) { return !isDone(lesson.id); }) || available[0] || null;
  }

  function percent(part) {
    return part.total === 0 ? 0 : Math.round((part.done / part.total) * 100);
  }

  window.NotionProgress = {
    isDone: isDone,
    setDone: setDone,
    overall: overall,
    forModule: forModule,
    nextLesson: nextLesson,
    percent: percent
  };
})();

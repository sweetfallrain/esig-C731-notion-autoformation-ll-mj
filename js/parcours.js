(function () {
  'use strict';

  var TEMPLATE_PREFIX = 'notion-guide:modele-marque:';

  function markTemplate(id) {
    localStorage.setItem(TEMPLATE_PREFIX + id, 'true');
  }

  function unmarkTemplate(id) {
    localStorage.removeItem(TEMPLATE_PREFIX + id);
  }

  function isTemplateMarked(id) {
    return localStorage.getItem(TEMPLATE_PREFIX + id) === 'true';
  }

  function getMarkedTemplates() {
    var ids = [];
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key && key.indexOf(TEMPLATE_PREFIX) === 0) {
        ids.push(key.slice(TEMPLATE_PREFIX.length));
      }
    }
    return ids;
  }

  function updateMarkButton(button, marked) {
    button.setAttribute('aria-pressed', String(marked));
    button.textContent = marked ? '✓' : '🔖';
    button.setAttribute('aria-label', marked ? 'Retirer des modèles marqués' : 'Marquer ce modèle');
  }

  function setupMarkButtons() {
    document.querySelectorAll('[data-mark-template]').forEach(function (button) {
      var id = button.getAttribute('data-mark-template');
      updateMarkButton(button, isTemplateMarked(id));

      button.addEventListener('click', function () {
        var marked = isTemplateMarked(id);
        if (marked) {
          unmarkTemplate(id);
        } else {
          markTemplate(id);
        }
        updateMarkButton(button, !marked);
      });
    });
  }

  window.NotionGuide = window.NotionGuide || {};
  window.NotionGuide.markTemplate = markTemplate;
  window.NotionGuide.unmarkTemplate = unmarkTemplate;
  window.NotionGuide.isTemplateMarked = isTemplateMarked;
  window.NotionGuide.getMarkedTemplates = getMarkedTemplates;

  document.addEventListener('DOMContentLoaded', setupMarkButtons);
})();

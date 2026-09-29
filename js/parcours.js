(function () {
  'use strict';

  var TEMPLATE_PREFIX = 'notion-guide:modele-marque:';
  var SECTION_PREFIX = 'notion-guide:section-lue:';

  var GUIDE_SECTIONS = [
    { id: 'les-bases', page: 'index.html', label: 'Les bases de Notion' },
    { id: 'methode-apercu', page: 'index.html', label: 'Méthode (aperçu)' },
    { id: 'c-est-quoi-notion', page: 'methode.html', label: "C'est quoi Notion ?" },
    { id: 'les-pages', page: 'methode.html', label: 'Les pages' },
    { id: 'les-bases-de-donnees', page: 'methode.html', label: 'Les bases de données' },
    { id: 'les-vues', page: 'methode.html', label: 'Les vues' }
  ];

  var TEMPLATES = {
    'tableau-de-bord-personnel': {
      title: 'Tableau de bord personnel',
      description: "Un espace d'accueil avec vos priorités, tâches en cours et liens utiles.",
      badge: 'populaire'
    },
    'suivi-de-projet': {
      title: 'Suivi de projet',
      description: "Suivez vos projets de l'idée à la livraison avec un Kanban simple et efficace.",
      badge: 'essentiel'
    },
    'base-de-notes': {
      title: 'Base de notes',
      description: 'Centralisez vos notes, idées et références dans un espace consultable et organisé.',
      badge: 'nouveau'
    },
    'base-de-contacts': {
      title: 'Base de contacts',
      description: "Retrouvez tous vos contacts professionnels avec leurs coordonnées et l'historique des échanges.",
      badge: 'populaire'
    },
    'suivi-budgetaire': {
      title: 'Suivi budgétaire',
      description: "Suivez les dépenses par catégorie et gardez une vue d'ensemble sur le budget de l'équipe.",
      badge: 'essentiel'
    },
    'bibliotheque-de-ressources': {
      title: 'Bibliothèque de ressources',
      description: "Rassemblez les documents et liens utiles à toute l'équipe dans un espace unique.",
      badge: 'nouveau'
    }
  };

  var BADGE_LABELS = {
    populaire: 'Populaire',
    essentiel: 'Essentiel',
    nouveau: 'Nouveau'
  };

  // --- Modèles marqués ---------------------------------------------------

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

  // --- Sections lues -------------------------------------------------------

  function markSectionRead(id) {
    localStorage.setItem(SECTION_PREFIX + id, 'true');
  }

  function isSectionRead(id) {
    return localStorage.getItem(SECTION_PREFIX + id) === 'true';
  }

  function getReadingProgress() {
    var read = GUIDE_SECTIONS.filter(function (section) {
      return isSectionRead(section.id);
    }).length;
    return { read: read, total: GUIDE_SECTIONS.length };
  }

  function setupMarkSectionButtons() {
    document.querySelectorAll('[data-mark-section]').forEach(function (button) {
      var id = button.getAttribute('data-mark-section');

      function markAsRead() {
        button.setAttribute('aria-pressed', 'true');
        button.disabled = true;
        button.textContent = 'Section lue ✓';
      }

      if (isSectionRead(id)) {
        markAsRead();
      }

      button.addEventListener('click', function () {
        markSectionRead(id);
        markAsRead();
      });
    });
  }

  // --- Page mon-parcours.html ---------------------------------------------

  function renderProgress() {
    var track = document.querySelector('[data-progress-track]');
    var label = document.querySelector('[data-progress-label]');
    var fill = document.querySelector('[data-progress-fill]');
    if (!track && !label && !fill) {
      return;
    }
    var progress = getReadingProgress();
    var percent = progress.total === 0 ? 0 : Math.round((progress.read / progress.total) * 100);
    if (label) {
      label.textContent = progress.read + ' / ' + progress.total;
    }
    if (fill) {
      fill.style.width = percent + '%';
    }
  }

  function renderChecklist() {
    var list = document.querySelector('[data-section-checklist]');
    if (!list) {
      return;
    }
    list.innerHTML = '';
    GUIDE_SECTIONS.forEach(function (section) {
      var read = isSectionRead(section.id);
      var item = document.createElement('li');

      var box = document.createElement('span');
      box.className = 'check-box' + (read ? ' checked' : '');
      box.setAttribute('aria-hidden', 'true');
      box.textContent = read ? '✓' : '';
      item.appendChild(box);

      var text = document.createElement('span');
      text.textContent = section.label;
      item.appendChild(text);

      var link = document.createElement('a');
      link.href = section.page + '#' + section.id;
      link.textContent = read ? 'Revoir →' : 'Lire →';
      item.appendChild(link);

      list.appendChild(item);
    });
  }

  function renderMarkedTemplates() {
    var grid = document.querySelector('[data-marked-templates]');
    var empty = document.querySelector('[data-empty-templates]');
    if (!grid) {
      return;
    }
    var ids = getMarkedTemplates().filter(function (id) {
      return TEMPLATES[id];
    });

    grid.innerHTML = '';

    if (ids.length === 0) {
      if (empty) {
        empty.hidden = false;
      }
      return;
    }

    if (empty) {
      empty.hidden = true;
    }

    ids.forEach(function (id) {
      var data = TEMPLATES[id];
      var card = document.createElement('div');
      card.className = 'template-card';
      card.innerHTML =
        '<span class="template-badge ' + data.badge + '">' + BADGE_LABELS[data.badge] + '</span>' +
        '<h3>' + data.title + '</h3>' +
        '<p>' + data.description + '</p>' +
        '<a href="ressources.html" class="template-card__link">Voir dans Ressources →</a>';
      grid.appendChild(card);
    });
  }

  function renderResumeLink() {
    var link = document.querySelector('[data-resume-link]');
    if (!link) {
      return;
    }
    var next = GUIDE_SECTIONS.filter(function (section) {
      return !isSectionRead(section.id);
    })[0];

    if (next) {
      link.href = next.page + '#' + next.id;
      link.textContent = 'Reprendre la lecture →';
    } else {
      link.href = 'index.html';
      link.textContent = 'Revoir le guide →';
    }
  }

  function setupMonParcoursPage() {
    renderProgress();
    renderChecklist();
    renderMarkedTemplates();
    renderResumeLink();
  }

  window.NotionGuide = window.NotionGuide || {};
  window.NotionGuide.markTemplate = markTemplate;
  window.NotionGuide.unmarkTemplate = unmarkTemplate;
  window.NotionGuide.isTemplateMarked = isTemplateMarked;
  window.NotionGuide.getMarkedTemplates = getMarkedTemplates;
  window.NotionGuide.markSectionRead = markSectionRead;
  window.NotionGuide.isSectionRead = isSectionRead;
  window.NotionGuide.getReadingProgress = getReadingProgress;

  document.addEventListener('DOMContentLoaded', function () {
    setupMarkButtons();
    setupMarkSectionButtons();
    setupMonParcoursPage();
  });
})();

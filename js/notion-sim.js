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

   2. Simulation de base de données (base Projets de Studio Nova)
      <div data-db-sim></div>  → rendu entièrement par ce script.
   =================================================================== */
(function () {
  'use strict';

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

  /* ---------- 2. Base Projets ---------- */

  const PROJECTS = [
    {
      id: 'orion', name: 'Site Orion', status: 'En cours', owner: 'Emma', priority: 'Haute', day: 15,
      summary: 'Refonte du site vitrine du client Orion : nouvelle arborescence, nouvelle maquette et intégration des contenus.',
      todos: [['Valider l’arborescence avec le client', true], ['Finaliser la maquette du site Orion', false], ['Intégrer les retours de la réunion client', false]]
    },
    {
      id: 'luna', name: 'Identité Luna', status: 'À faire', owner: 'Lucas', priority: 'Moyenne', day: 28,
      summary: 'Création du logo et de la charte graphique de la marque Luna.',
      todos: [['Recueillir les inspirations du client', false], ['Proposer trois pistes de logo', false], ['Rédiger la charte graphique', false]]
    },
    {
      id: 'atlas', name: 'Campagne Atlas', status: 'Terminé', owner: 'Emma', priority: 'Basse', day: 5,
      summary: 'Campagne de lancement sur les réseaux sociaux pour le client Atlas.',
      todos: [['Créer les visuels', true], ['Programmer les publications', true], ['Envoyer le bilan au client', true]]
    }
  ];

  const STATUS_CLASS = { 'À faire': 'status', 'En cours': 'status status--doing', 'Terminé': 'status status--done' };
  const VIEWS = [['table', 'Table'], ['board', 'Board'], ['calendar', 'Calendrier']];

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text !== undefined) { node.textContent = text; }
    return node;
  }

  function due(project) {
    return project.day + ' novembre';
  }

  function setupDbSim(sim) {
    const state = { view: 'table', open: 'orion' };

    const frame = el('div', 'notion-page db-sim');
    const bar = el('div', 'notion-page__bar');
    bar.appendChild(document.createTextNode('Studio Nova / '));
    bar.appendChild(el('strong', '', 'Projets'));
    bar.appendChild(document.createTextNode(' · simulation'));
    const views = el('div', 'db-sim__views');
    views.setAttribute('role', 'group');
    views.setAttribute('aria-label', 'Choisir une vue');
    VIEWS.forEach(function (view) {
      const button = el('button', 'db-sim__view', view[1]);
      button.type = 'button';
      button.dataset.view = view[0];
      button.addEventListener('click', function () { state.view = view[0]; renderView(); });
      views.appendChild(button);
    });
    bar.appendChild(views);
    frame.appendChild(bar);

    const viewArea = el('div');
    frame.appendChild(viewArea);

    const message = el('p', 'notion-info');
    message.setAttribute('aria-live', 'polite');

    const pageArea = el('div');

    sim.appendChild(frame);
    sim.appendChild(message);
    sim.appendChild(pageArea);

    function openButton(project, className) {
      const button = el('button', className);
      button.type = 'button';
      button.addEventListener('click', function () {
        state.open = project.id;
        renderPage();
        const title = pageArea.querySelector('.db-page__title');
        if (title) { title.focus(); }
      });
      return button;
    }

    function renderTable() {
      const scroll = el('div', 'db-sim__scroll');
      const table = el('table', 'db-table');
      const head = el('tr');
      ['Nom', 'Statut', 'Responsable', 'Priorité', 'Échéance'].forEach(function (label) {
        const th = el('th', '', label);
        th.scope = 'col';
        head.appendChild(th);
      });
      const thead = el('thead');
      thead.appendChild(head);
      table.appendChild(thead);
      const tbody = el('tbody');
      PROJECTS.forEach(function (project) {
        const row = el('tr');
        const nameCell = el('td');
        const button = openButton(project, 'db-open');
        button.textContent = project.name;
        nameCell.appendChild(button);
        row.appendChild(nameCell);
        const statusCell = el('td');
        statusCell.appendChild(el('span', STATUS_CLASS[project.status], project.status));
        row.appendChild(statusCell);
        row.appendChild(el('td', '', project.owner));
        row.appendChild(el('td', '', project.priority));
        row.appendChild(el('td', '', due(project)));
        tbody.appendChild(row);
      });
      table.appendChild(tbody);
      scroll.appendChild(table);
      return scroll;
    }

    function renderBoard() {
      const board = el('div', 'db-board');
      ['À faire', 'En cours', 'Terminé'].forEach(function (status) {
        const items = PROJECTS.filter(function (project) { return project.status === status; });
        const col = el('div', 'db-board__col');
        const head = el('div', 'db-board__head');
        head.appendChild(el('span', '', status));
        head.appendChild(el('span', '', String(items.length)));
        col.appendChild(head);
        items.forEach(function (project) {
          const card = openButton(project, 'db-card');
          card.appendChild(el('strong', '', project.name));
          card.appendChild(el('span', '', project.owner + ' · ' + due(project) + ' · priorité ' + project.priority.toLowerCase()));
          col.appendChild(card);
        });
        board.appendChild(col);
      });
      return board;
    }

    function renderCalendar() {
      const wrap = el('div');
      wrap.appendChild(el('p', 'db-cal__month', 'Novembre 2026'));
      const scroll = el('div', 'db-sim__scroll');
      const grid = el('div', 'db-cal');
      ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].forEach(function (d) {
        grid.appendChild(el('div', 'db-cal__dow', d));
      });
      // Le 1er novembre 2026 est un dimanche : 6 cases vides avant.
      const cells = [];
      for (let i = 0; i < 6; i++) { cells.push(null); }
      for (let d = 1; d <= 30; d++) { cells.push(d); }
      while (cells.length % 7 !== 0) { cells.push(null); }
      cells.forEach(function (day) {
        const cell = el('div', day ? 'db-cal__day' : 'db-cal__day db-cal__day--empty', day ? String(day) : '');
        PROJECTS.filter(function (project) { return project.day === day; }).forEach(function (project) {
          const event = openButton(project, 'db-cal__event');
          event.textContent = project.name;
          cell.appendChild(event);
        });
        grid.appendChild(cell);
      });
      scroll.appendChild(grid);
      wrap.appendChild(scroll);
      return wrap;
    }

    function renderView() {
      views.querySelectorAll('button').forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.dataset.view === state.view));
      });
      viewArea.innerHTML = '';
      if (state.view === 'board') {
        viewArea.appendChild(renderBoard());
      } else if (state.view === 'calendar') {
        viewArea.appendChild(renderCalendar());
      } else {
        viewArea.appendChild(renderTable());
      }
      const name = VIEWS.find(function (v) { return v[0] === state.view; })[1];
      message.innerHTML = '';
      message.appendChild(el('strong', '', 'Vue ' + name + '. '));
      message.appendChild(document.createTextNode('Tu n’as pas créé trois bases : tu regardes la même base de trois façons différentes.'));
    }

    function renderPage() {
      pageArea.innerHTML = '';
      const project = PROJECTS.find(function (p) { return p.id === state.open; });
      if (!project) { return; }

      const page = el('section', 'notion-page db-page');
      page.setAttribute('aria-label', 'Page du projet ' + project.name);

      const pbar = el('div', 'notion-page__bar');
      pbar.appendChild(document.createTextNode('Projets / '));
      pbar.appendChild(el('strong', '', project.name));
      const close = el('button', 'db-close', '✕');
      close.type = 'button';
      close.setAttribute('aria-label', 'Fermer la page du projet');
      close.addEventListener('click', function () { state.open = null; renderPage(); });
      pbar.appendChild(close);
      page.appendChild(pbar);

      const body = el('div', 'db-page__body');
      const title = el('h3', 'db-page__title', project.name);
      title.tabIndex = -1;
      body.appendChild(title);

      const props = el('dl', 'db-props');
      [['Statut', null], ['Responsable', project.owner], ['Priorité', project.priority], ['Échéance', due(project) + ' 2026']].forEach(function (pair) {
        props.appendChild(el('dt', '', pair[0]));
        const dd = el('dd');
        if (pair[1] === null) {
          dd.appendChild(el('span', STATUS_CLASS[project.status], project.status));
        } else {
          dd.textContent = pair[1];
        }
        props.appendChild(dd);
      });
      body.appendChild(props);

      const content = el('div', 'db-page__content');
      content.appendChild(el('p', '', project.summary));
      content.appendChild(el('p', 'db-page__subtitle', 'Prochaines étapes'));
      const list = el('ul', 'db-todos');
      project.todos.forEach(function (todo) {
        const li = el('li', todo[1] ? 'is-done' : '', (todo[1] ? '☑ ' : '☐ ') + todo[0]);
        li.appendChild(el('span', 'sr-only', todo[1] ? ' (fait)' : ' (à faire)'));
        list.appendChild(li);
      });
      content.appendChild(list);
      body.appendChild(content);
      page.appendChild(body);
      pageArea.appendChild(page);
    }

    renderView();
    renderPage();
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
    document.querySelectorAll('[data-db-sim]').forEach(setupDbSim);
  });
})();

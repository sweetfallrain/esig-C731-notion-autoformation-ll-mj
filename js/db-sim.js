/* ===================================================================
   Simulation de la base « Projets » de Studio Nova (modules 4 et 5).

   <div data-db
        data-views="table,board,calendar"   vues proposées (1re = vue de départ)
        data-columns="basic|full"           propriétés affichées dans la table
        data-tools="true"                   filtre, tri et regroupement
        data-open="orion"></div>            page ouverte au départ (facultatif)

   Les données sont TOUJOURS les mêmes, quelle que soit la vue :
   c'est le message pédagogique du module 5.
   =================================================================== */
(function () {
  'use strict';

  const PROJECTS = [
    {
      id: 'orion', name: 'Site Orion', status: 'En cours', owner: 'Emma', priority: 'Haute',
      start: 20, startMonth: 10, day: 15, client: 'Orion SA', budget: 12000, tags: ['Web', 'Design'], billed: false,
      summary: 'Refonte du site vitrine du client Orion : nouvelle arborescence, nouvelle maquette et intégration des contenus.',
      todos: [['Valider l’arborescence avec le client', true], ['Finaliser la maquette du site Orion', false], ['Intégrer les retours de la réunion client', false]]
    },
    {
      id: 'luna', name: 'Identité Luna', status: 'Pas commencé', owner: 'Lucas', priority: 'Moyenne',
      start: 10, startMonth: 11, day: 28, client: 'Luna Cosmétiques', budget: 6500, tags: ['Design'], billed: false,
      summary: 'Création du logo et de la charte graphique de la marque Luna.',
      todos: [['Recueillir les inspirations du client', false], ['Proposer trois pistes de logo', false], ['Rédiger la charte graphique', false]]
    },
    {
      id: 'atlas', name: 'Campagne Atlas', status: 'Terminé', owner: 'Emma', priority: 'Basse',
      start: 15, startMonth: 10, day: 5, client: 'Atlas Sport', budget: 4000, tags: ['Réseaux sociaux'], billed: true,
      summary: 'Campagne de lancement sur les réseaux sociaux pour le client Atlas.',
      todos: [['Créer les visuels', true], ['Programmer les publications', true], ['Envoyer le bilan au client', true]]
    }
  ];

  const STATUSES = ['Pas commencé', 'En cours', 'Terminé'];
  const STATUS_CLASS = { 'Pas commencé': 'status', 'En cours': 'status status--doing', 'Terminé': 'status status--done' };
  const VIEW_NAMES = { table: 'Table', list: 'Liste', board: 'Kanban', calendar: 'Calendrier', gallery: 'Galerie', timeline: 'Chronologie' };
  const FILTERS = {
    none: { label: 'Tous les projets', test: function () { return true; } },
    doing: { label: 'Statut = En cours', test: function (p) { return p.status === 'En cours'; } },
    emma: { label: 'Responsable = Emma', test: function (p) { return p.owner === 'Emma'; } }
  };

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text !== undefined) { node.textContent = text; }
    return node;
  }

  function due(p) { return p.day + ' novembre'; }
  function chf(n) { return n.toLocaleString('fr-CH') + ' CHF'; }

  function setupDb(sim) {
    const views = (sim.dataset.views || 'table').split(',');
    const full = sim.dataset.columns === 'full';
    const withTools = sim.dataset.tools === 'true';
    const state = { view: views[0], open: sim.dataset.open || null, filter: 'none', sort: false, group: false };

    const frame = el('div', 'notion-page db-sim');
    const bar = el('div', 'notion-page__bar');
    bar.appendChild(document.createTextNode('Studio Nova / '));
    bar.appendChild(el('strong', '', 'Projets'));
    bar.appendChild(document.createTextNode(' · simulation'));
    const viewGroup = el('div', 'db-sim__views');
    viewGroup.setAttribute('role', 'group');
    viewGroup.setAttribute('aria-label', 'Choisir une vue');
    if (views.length > 1) {
      views.forEach(function (v) {
        const b = el('button', 'db-sim__view', VIEW_NAMES[v]);
        b.type = 'button';
        b.dataset.view = v;
        b.addEventListener('click', function () { state.view = v; render(); });
        viewGroup.appendChild(b);
      });
      bar.appendChild(viewGroup);
    }
    frame.appendChild(bar);

    let tools = null;
    if (withTools) {
      tools = el('div', 'db-tools');
      tools.appendChild(select('Filtre', Object.keys(FILTERS).map(function (k) { return [k, FILTERS[k].label]; }), function (v) { state.filter = v; render(); }));
      tools.appendChild(select('Tri', [['off', 'Aucun'], ['on', 'Échéance la plus proche d’abord']], function (v) { state.sort = v === 'on'; render(); }));
      tools.appendChild(select('Regrouper', [['off', 'Aucun'], ['on', 'Par statut']], function (v) { state.group = v === 'on'; render(); }));
      frame.appendChild(tools);
    }

    const area = el('div');
    frame.appendChild(area);
    const message = el('p', 'notion-info');
    message.setAttribute('aria-live', 'polite');
    const pageArea = el('div');
    sim.appendChild(frame);
    sim.appendChild(message);
    sim.appendChild(pageArea);

    function select(label, options, onChange) {
      const wrap = el('label', 'db-tools__field');
      wrap.appendChild(el('span', '', label));
      const s = el('select');
      options.forEach(function (o) { const opt = el('option', '', o[1]); opt.value = o[0]; s.appendChild(opt); });
      s.addEventListener('change', function () { onChange(s.value); });
      wrap.appendChild(s);
      return wrap;
    }

    function rows() {
      let list = PROJECTS.filter(FILTERS[state.filter].test);
      if (state.sort) { list = list.slice().sort(function (a, b) { return a.day - b.day; }); }
      return list;
    }

    function opener(p, className, text) {
      const b = el('button', className, text);
      b.type = 'button';
      b.addEventListener('click', function () {
        state.open = p.id;
        renderPage();
        const t = pageArea.querySelector('.db-page__title');
        if (t) { t.focus(); }
      });
      return b;
    }

    function table(list) {
      const scroll = el('div', 'db-sim__scroll');
      const t = el('table', 'db-table');
      const head = el('tr');
      const cols = full
        ? ['Nom', 'Statut', 'Responsable', 'Échéance', 'Client', 'Budget', 'Tags', 'Facturé']
        : ['Nom', 'Statut', 'Responsable', 'Priorité', 'Échéance'];
      cols.forEach(function (c) { const th = el('th', '', c); th.scope = 'col'; head.appendChild(th); });
      const thead = el('thead');
      thead.appendChild(head);
      t.appendChild(thead);
      const groups = state.group ? STATUSES : [null];
      groups.forEach(function (g) {
        const items = list.filter(function (p) { return g === null || p.status === g; });
        if (g !== null) {
          const gr = el('tr', 'db-table__group');
          const td = el('td', '', g + ' · ' + items.length);
          td.colSpan = cols.length;
          gr.appendChild(td);
          t.appendChild(gr);
        }
        items.forEach(function (p) {
          const r = el('tr');
          const name = el('td');
          name.appendChild(opener(p, 'db-open', p.name));
          r.appendChild(name);
          const st = el('td');
          st.appendChild(el('span', STATUS_CLASS[p.status], p.status));
          r.appendChild(st);
          r.appendChild(el('td', '', p.owner));
          if (full) {
            r.appendChild(el('td', '', due(p)));
            r.appendChild(el('td', '', p.client));
            r.appendChild(el('td', 'db-num', chf(p.budget)));
            const tg = el('td');
            p.tags.forEach(function (x) { tg.appendChild(el('span', 'db-tag', x)); });
            r.appendChild(tg);
            r.appendChild(el('td', '', p.billed ? '☑ Oui' : '☐ Non'));
          } else {
            r.appendChild(el('td', '', p.priority));
            r.appendChild(el('td', '', due(p)));
          }
          t.appendChild(r);
        });
      });
      scroll.appendChild(t);
      return scroll;
    }

    function listView(list) {
      const ul = el('ul', 'db-list');
      list.forEach(function (p) {
        const li = el('li');
        li.appendChild(opener(p, 'db-open', p.name));
        li.appendChild(el('span', 'db-list__meta', p.owner + ' · ' + due(p)));
        ul.appendChild(li);
      });
      return ul;
    }

    function board(list) {
      const b = el('div', 'db-board');
      STATUSES.forEach(function (s) {
        const items = list.filter(function (p) { return p.status === s; });
        const col = el('div', 'db-board__col');
        const h = el('div', 'db-board__head');
        h.appendChild(el('span', '', s));
        h.appendChild(el('span', '', String(items.length)));
        col.appendChild(h);
        items.forEach(function (p) {
          const card = opener(p, 'db-card');
          card.appendChild(el('strong', '', p.name));
          card.appendChild(el('span', '', p.owner + ' · ' + due(p) + ' · priorité ' + p.priority.toLowerCase()));
          col.appendChild(card);
        });
        b.appendChild(col);
      });
      return b;
    }

    function calendar(list) {
      const wrap = el('div');
      wrap.appendChild(el('p', 'db-cal__month', 'Novembre 2026'));
      const scroll = el('div', 'db-sim__scroll');
      const grid = el('div', 'db-cal');
      ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].forEach(function (d) { grid.appendChild(el('div', 'db-cal__dow', d)); });
      const cells = [];
      for (let i = 0; i < 6; i++) { cells.push(null); }
      for (let d = 1; d <= 30; d++) { cells.push(d); }
      while (cells.length % 7 !== 0) { cells.push(null); }
      cells.forEach(function (day) {
        const c = el('div', day ? 'db-cal__day' : 'db-cal__day db-cal__day--empty', day ? String(day) : '');
        list.filter(function (p) { return p.day === day; }).forEach(function (p) { c.appendChild(opener(p, 'db-cal__event', p.name)); });
        grid.appendChild(c);
      });
      scroll.appendChild(grid);
      wrap.appendChild(scroll);
      return wrap;
    }

    function gallery(list) {
      const g = el('div', 'db-gallery');
      list.forEach(function (p) {
        const card = opener(p, 'db-gallery__card');
        const cover = el('span', 'db-gallery__cover', p.tags.join(' · '));
        cover.setAttribute('aria-hidden', 'true');
        card.appendChild(cover);
        card.appendChild(el('strong', '', p.name));
        card.appendChild(el('span', '', p.client));
        g.appendChild(card);
      });
      return g;
    }

    function timeline(list) {
      // Axe : du 13 octobre au 30 novembre (49 jours).
      const startAxis = 13;
      function dayIndex(day, month) { return month === 10 ? day - startAxis : 31 - startAxis + day; }
      const total = dayIndex(30, 11) + 1;
      const wrap = el('div', 'db-timeline');
      const axis = el('div', 'db-timeline__axis');
      axis.appendChild(el('span', '', 'Octobre'));
      axis.appendChild(el('span', '', 'Novembre'));
      wrap.appendChild(axis);
      list.forEach(function (p) {
        const row = el('div', 'db-timeline__row');
        row.appendChild(el('span', 'db-timeline__label', p.name));
        const track = el('div', 'db-timeline__track');
        const s = dayIndex(p.start, p.startMonth);
        const e = dayIndex(p.day, 11);
        const bar = opener(p, 'db-timeline__bar', p.start + (p.startMonth === 10 ? ' oct.' : ' nov.') + ' → ' + p.day + ' nov.');
        bar.style.marginLeft = (s / total * 100) + '%';
        bar.style.width = ((e - s + 1) / total * 100) + '%';
        track.appendChild(bar);
        row.appendChild(track);
        wrap.appendChild(row);
      });
      return wrap;
    }

    function render() {
      viewGroup.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.view === state.view)); });
      if (tools) { tools.hidden = ['table', 'list', 'gallery'].indexOf(state.view) === -1; }
      const list = withTools ? rows() : PROJECTS.slice();
      area.innerHTML = '';
      const renderers = { table: table, list: listView, board: board, calendar: calendar, gallery: gallery, timeline: timeline };
      area.appendChild(renderers[state.view](list));
      message.innerHTML = '';
      if (withTools && (state.filter !== 'none' || state.sort || state.group)) {
        message.appendChild(el('strong', '', list.length + ' projet' + (list.length > 1 ? 's' : '') + ' affiché' + (list.length > 1 ? 's' : '') + ' sur 3. '));
        message.appendChild(document.createTextNode('Le filtre, le tri et le regroupement changent l’affichage seulement : aucun projet n’est supprimé ni modifié.'));
      } else if (views.length > 1) {
        message.appendChild(el('strong', '', 'Vue ' + VIEW_NAMES[state.view] + '. '));
        message.appendChild(document.createTextNode('Tu n’as pas créé plusieurs bases : tu regardes la même base de plusieurs façons différentes.'));
      } else {
        message.appendChild(el('strong', '', 'Clique sur le nom d’un projet. '));
        message.appendChild(document.createTextNode('Chaque ligne de la base est une page que tu peux ouvrir.'));
      }
    }

    function renderPage() {
      pageArea.innerHTML = '';
      const p = PROJECTS.find(function (x) { return x.id === state.open; });
      if (!p) { return; }
      const page = el('section', 'notion-page db-page');
      page.setAttribute('aria-label', 'Page du projet ' + p.name);
      const pbar = el('div', 'notion-page__bar');
      pbar.appendChild(document.createTextNode('Projets / '));
      pbar.appendChild(el('strong', '', p.name));
      const close = el('button', 'db-close', '✕');
      close.type = 'button';
      close.setAttribute('aria-label', 'Fermer la page du projet');
      close.addEventListener('click', function () { state.open = null; renderPage(); });
      pbar.appendChild(close);
      page.appendChild(pbar);
      const body = el('div', 'db-page__body');
      const title = el('h3', 'db-page__title', p.name);
      title.tabIndex = -1;
      body.appendChild(title);
      const props = el('dl', 'db-props');
      const pairs = [['Statut', null], ['Responsable', p.owner], ['Priorité', p.priority], ['Échéance', due(p) + ' 2026']];
      if (full) { pairs.push(['Client', p.client], ['Budget', chf(p.budget)], ['Tags', p.tags.join(', ')], ['Facturé', p.billed ? 'Oui' : 'Non']); }
      pairs.forEach(function (pair) {
        props.appendChild(el('dt', '', pair[0]));
        const dd = el('dd');
        if (pair[1] === null) { dd.appendChild(el('span', STATUS_CLASS[p.status], p.status)); } else { dd.textContent = pair[1]; }
        props.appendChild(dd);
      });
      body.appendChild(props);
      const content = el('div', 'db-page__content');
      content.appendChild(el('p', '', p.summary));
      content.appendChild(el('p', 'db-page__subtitle', 'Prochaines étapes'));
      const ul = el('ul', 'db-todos');
      p.todos.forEach(function (t) {
        const li = el('li', t[1] ? 'is-done' : '', (t[1] ? '☑ ' : '☐ ') + t[0]);
        li.appendChild(el('span', 'sr-only', t[1] ? ' (fait)' : ' (à faire)'));
        ul.appendChild(li);
      });
      content.appendChild(ul);
      body.appendChild(content);
      page.appendChild(body);
      const note = el('p', 'db-page__note', 'Les propriétés, en haut, décrivent le projet. En dessous, c’est une page comme les autres : notes, tâches, documents.');
      body.appendChild(note);
      pageArea.appendChild(page);
    }

    render();
    renderPage();
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-db]').forEach(setupDb);
  });
})();

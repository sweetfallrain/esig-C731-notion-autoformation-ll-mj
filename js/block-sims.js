/* ===================================================================
   Simulations de manipulation de blocs (module 2 et suivants).

   1. Menu « / »        <div data-slash-sim></div>
   2. Menu de poignée   <div data-block-menu-sim></div>
   3. Sous-pages        <div data-subpage-sim></div>
   Tout est rendu par ce script ; sans JavaScript, la leçon reste
   lisible grâce au texte qui entoure chaque simulation.
   =================================================================== */
(function () {
  'use strict';

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text !== undefined) { node.textContent = text; }
    return node;
  }

  function frame(title) {
    const page = el('div', 'notion-page');
    const bar = el('div', 'notion-page__bar');
    bar.appendChild(document.createTextNode('Studio Nova / '));
    bar.appendChild(el('strong', '', title));
    bar.appendChild(el('span', 'notion-page__tag', 'Simulation'));
    page.appendChild(bar);
    const body = el('div', 'notion-page__body');
    page.appendChild(body);
    return { page: page, body: body };
  }

  function sayIn(info, title, text) {
    info.innerHTML = '';
    info.appendChild(el('strong', '', title + ' '));
    info.appendChild(document.createTextNode(text));
  }

  /* ---------- 1. Menu « / » ---------- */

  const SLASH_BLOCKS = [
    { name: 'Texte', keys: 'texte paragraphe', info: 'Un paragraphe simple. C’est le bloc par défaut.', preview: 'Un paragraphe de texte.' },
    { name: 'Titre 1', keys: 'titre 1 h1', info: 'Le plus grand titre : le sujet principal de la page.', preview: 'Titre 1' },
    { name: 'Titre 2', keys: 'titre 2 h2', info: 'Un titre de partie, comme « Cette semaine ».', preview: 'Cette semaine' },
    { name: 'Titre 3', keys: 'titre 3 h3', info: 'Un titre de sous-partie.', preview: 'Titre 3' },
    { name: 'Liste à puces', keys: 'liste puces', info: 'Une liste sans ordre particulier.', preview: '• Un élément de liste' },
    { name: 'Liste numérotée', keys: 'liste numerotee numero', info: 'Une liste d’étapes dans l’ordre.', preview: '1. Première étape' },
    { name: 'Liste de tâches', keys: 'liste taches checklist case', info: 'Des cases à cocher pour les choses à faire.', preview: '☐ Une tâche à faire' },
    { name: 'Bascule', keys: 'bascule replier toggle', info: 'Un contenu repliable, qui se déplie d’un clic.', preview: '▸ Une ligne repliable' },
    { name: 'Encadré', keys: 'encadre callout', info: 'Un message mis en avant avec une icône.', preview: 'Information importante' },
    { name: 'Citation', keys: 'citation quote', info: 'Une phrase mise en valeur par une barre verticale.', preview: '« Une phrase à retenir. »' },
    { name: 'Séparateur', keys: 'separateur ligne', info: 'Une ligne horizontale entre deux parties.', preview: '' },
    { name: 'Image', keys: 'image photo', info: 'Une image importée depuis ton ordinateur.', preview: 'Image' },
    { name: 'Page', keys: 'page sous-page', info: 'Une sous-page rangée dans la page actuelle.', preview: 'Nouvelle sous-page' }
  ];

  function normalize(text) {
    return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function setupSlashSim(sim) {
    const f = frame('Accueil — Studio Nova');
    const uid = 'slash-' + Math.random().toString(36).slice(2, 7);
    const row = el('div', 'slash-sim__row');
    const label = el('label', 'sr-only', 'Tape le nom d’un bloc après la barre oblique');
    label.htmlFor = uid;
    const slash = el('span', 'slash-sim__slash', '/');
    slash.setAttribute('aria-hidden', 'true');
    const input = el('input', 'slash-sim__input');
    input.id = uid;
    input.type = 'text';
    input.autocomplete = 'off';
    input.placeholder = 'tape par exemple « titre » ou « liste »';
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-expanded', 'true');
    input.setAttribute('aria-controls', uid + '-list');
    row.appendChild(label);
    row.appendChild(slash);
    row.appendChild(input);
    f.body.appendChild(row);

    const list = el('ul', 'slash-sim__menu');
    list.id = uid + '-list';
    list.setAttribute('role', 'listbox');
    list.setAttribute('aria-label', 'Blocs disponibles');
    f.body.appendChild(list);

    const result = el('div', 'slash-sim__result');
    f.body.appendChild(result);

    const info = el('p', 'notion-info');
    info.setAttribute('aria-live', 'polite');
    sayIn(info, 'Tape quelques lettres.', 'La liste se réduit au fur et à mesure. Flèches haut et bas pour choisir, Entrée pour valider.');

    sim.appendChild(f.page);
    sim.appendChild(info);

    let matches = SLASH_BLOCKS.slice();
    let active = 0;

    function renderList() {
      list.innerHTML = '';
      matches.forEach(function (block, i) {
        const option = el('li', 'slash-sim__option' + (i === active ? ' is-active' : ''), block.name);
        option.id = uid + '-' + i;
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', String(i === active));
        option.addEventListener('mousedown', function (event) { event.preventDefault(); choose(block); });
        list.appendChild(option);
      });
      if (matches.length === 0) {
        list.appendChild(el('li', 'slash-sim__empty', 'Aucun bloc ne correspond. Efface quelques lettres.'));
        input.removeAttribute('aria-activedescendant');
      } else {
        input.setAttribute('aria-activedescendant', uid + '-' + active);
      }
    }

    function filter() {
      const query = normalize(input.value.trim());
      matches = SLASH_BLOCKS.filter(function (block) {
        return !query || normalize(block.name + ' ' + block.keys).indexOf(query) !== -1;
      });
      active = 0;
      renderList();
    }

    function choose(block) {
      result.innerHTML = '';
      const kind = normalize(block.name).replace(/[^a-z0-9]+/g, '-');
      result.appendChild(el('div', 'slash-sim__preview slash-sim__preview--' + kind, block.preview));
      sayIn(info, block.name + ' ajouté.', block.info);
      input.value = '';
      filter();
    }

    input.addEventListener('input', filter);
    input.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowDown') { event.preventDefault(); active = Math.min(active + 1, matches.length - 1); renderList(); }
      if (event.key === 'ArrowUp') { event.preventDefault(); active = Math.max(active - 1, 0); renderList(); }
      if (event.key === 'Enter' && matches[active]) { event.preventDefault(); choose(matches[active]); }
      if (event.key === 'Escape') { input.value = ''; filter(); }
    });

    renderList();
  }

  /* ---------- 2. Menu de la poignée ---------- */

  const INITIAL_TASKS = [
    { text: 'Finaliser la maquette du site Orion', type: 'todo' },
    { text: 'Préparer la réunion client', type: 'todo' },
    { text: 'Mettre à jour les ressources', type: 'todo' }
  ];

  function copyTasks(list) {
    return list.map(function (b) { return Object.assign({}, b); });
  }

  function setupBlockMenuSim(sim) {
    let blocks = copyTasks(INITIAL_TASKS);
    const history = [];
    let openIndex = null;

    const f = frame('Accueil — Studio Nova');
    f.body.appendChild(el('p', 'block-sim__heading', 'Cette semaine'));
    const list = el('ul', 'block-sim__list');
    f.body.appendChild(list);

    const tools = el('div', 'block-sim__tools');
    const undo = el('button', 'btn btn-outline btn--compact', 'Annuler (Ctrl + Z)');
    undo.type = 'button';
    const reset = el('button', 'btn btn-outline btn--compact', 'Réinitialiser');
    reset.type = 'button';
    tools.appendChild(undo);
    tools.appendChild(reset);

    const info = el('p', 'notion-info');
    info.setAttribute('aria-live', 'polite');
    sayIn(info, 'Clique sur une poignée ⋮⋮.', 'Son menu propose les actions possibles sur le bloc.');

    sim.appendChild(f.page);
    sim.appendChild(tools);
    sim.appendChild(info);

    function apply(change, title, text) {
      history.push(copyTasks(blocks));
      change();
      openIndex = null;
      render();
      sayIn(info, title, text);
    }

    function render() {
      list.innerHTML = '';
      blocks.forEach(function (block, i) {
        const item = el('li', 'block-sim__item');
        const handle = el('button', 'block-sim__handle', '⋮⋮');
        handle.type = 'button';
        handle.setAttribute('aria-label', 'Actions du bloc « ' + block.text + ' »');
        handle.setAttribute('aria-expanded', String(openIndex === i));
        handle.addEventListener('click', function () {
          openIndex = openIndex === i ? null : i;
          render();
          const first = list.querySelector('.block-sim__menu button');
          if (first) { first.focus(); }
        });
        item.appendChild(handle);
        const marker = el('span', 'block-sim__marker', block.type === 'todo' ? '☐' : '•');
        marker.setAttribute('aria-hidden', 'true');
        item.appendChild(marker);
        item.appendChild(el('span', 'block-sim__text', block.text));
        item.appendChild(el('span', 'sr-only', block.type === 'todo' ? ' (case à cocher)' : ' (liste à puces)'));

        if (openIndex === i) {
          const menu = el('div', 'block-sim__menu');
          menu.setAttribute('role', 'group');
          menu.setAttribute('aria-label', 'Actions du bloc');
          const actions = [
            ['Monter', i > 0, function () { const b = blocks.splice(i, 1)[0]; blocks.splice(i - 1, 0, b); }, 'Bloc déplacé.', 'Dans Notion, tu glisses la poignée vers le haut. Les autres blocs se décalent tout seuls.'],
            ['Descendre', i < blocks.length - 1, function () { const b = blocks.splice(i, 1)[0]; blocks.splice(i + 1, 0, b); }, 'Bloc déplacé.', 'Dans Notion, tu glisses la poignée vers le bas.'],
            ['Dupliquer', true, function () { blocks.splice(i + 1, 0, Object.assign({}, blocks[i])); }, 'Bloc dupliqué.', 'Une copie identique apparaît juste en dessous. Raccourci : Ctrl + D.'],
            ['Supprimer', true, function () { blocks.splice(i, 1); }, 'Bloc supprimé.', 'Les autres blocs remontent. Tu peux annuler avec Ctrl + Z.'],
            [block.type === 'todo' ? 'Transformer en liste à puces' : 'Transformer en case à cocher', true, function () { blocks[i].type = blocks[i].type === 'todo' ? 'bullet' : 'todo'; }, 'Bloc transformé.', 'Le texte ne change pas : seul le type du bloc change.']
          ];
          actions.forEach(function (action) {
            if (!action[1]) { return; }
            const button = el('button', 'block-sim__action', action[0]);
            button.type = 'button';
            button.addEventListener('click', function () { apply(action[2], action[3], action[4]); });
            menu.appendChild(button);
          });
          item.appendChild(menu);
        }
        list.appendChild(item);
      });
      if (blocks.length === 0) {
        list.appendChild(el('li', 'block-sim__empty', 'Plus aucune tâche. Clique sur « Annuler » ou « Réinitialiser ».'));
      }
    }

    undo.addEventListener('click', function () {
      if (history.length === 0) { sayIn(info, 'Rien à annuler.', 'Tu n’as encore fait aucune action.'); return; }
      blocks = history.pop();
      openIndex = null;
      render();
      sayIn(info, 'Action annulée.', 'La page revient à l’état précédent, comme avec Ctrl + Z dans Notion.');
    });

    reset.addEventListener('click', function () {
      blocks = copyTasks(INITIAL_TASKS);
      history.length = 0;
      openIndex = null;
      render();
      sayIn(info, 'Page réinitialisée.', 'Les trois tâches sont revenues dans leur ordre d’origine.');
    });

    render();
  }

  /* ---------- 3. Sous-pages ---------- */

  const PAGES = {
    root: { title: 'Studio Nova', icon: '', blocks: [
      { kind: 'text', text: 'Espace de travail de l’agence Studio Nova.', label: 'Bloc texte', info: 'Il vit dans la page : c’est du contenu que tu lis directement.' },
      { kind: 'toggle', text: 'Règles de l’espace', label: 'Bloc bascule', info: 'Un bloc de contenu replié. Il fait partie de la page « Studio Nova ».' },
      { kind: 'page', target: 'accueil', label: 'Bloc page', info: 'Une porte vers la sous-page « Accueil — Studio Nova ». Clique pour l’ouvrir.' },
      { kind: 'page', target: 'projets', label: 'Bloc page', info: 'Une porte vers la sous-page « Projets », vide pour l’instant.' },
      { kind: 'page', target: 'ressources', label: 'Bloc page', info: 'Une porte vers la sous-page « Ressources », vide pour l’instant.' }
    ] },
    accueil: { title: 'Accueil — Studio Nova', icon: '⌂', blocks: [
      { kind: 'text', text: 'Bienvenue dans l’espace de travail de Studio Nova.', label: 'Bloc texte', info: 'Le contenu propre à la page d’accueil.' },
      { kind: 'text', text: 'Cette semaine : 3 tâches à faire', label: 'Blocs titre et checklist', info: 'Les blocs que tu as créés aux leçons 2.4 à 2.7.' }
    ] },
    projets: { title: 'Projets', icon: '', blocks: [
      { kind: 'text', text: 'Cette page est encore vide. Tu y créeras la base des projets au module 4.', label: 'Bloc texte', info: 'Une sous-page a son propre contenu, indépendant de la page qui la contient.' }
    ] },
    ressources: { title: 'Ressources', icon: '', blocks: [
      { kind: 'text', text: 'Cette page est encore vide. Tu la rempliras au module 6.', label: 'Bloc texte', info: 'Une sous-page a son propre contenu, indépendant de la page qui la contient.' }
    ] }
  };

  function setupSubpageSim(sim) {
    let current = 'root';

    const wrap = el('div', 'notion-page');
    const bar = el('div', 'notion-page__bar');
    wrap.appendChild(bar);
    const win = el('div', 'ui-sim__window');
    const side = el('nav', 'ui-sim__sidebar');
    side.setAttribute('aria-label', 'Barre latérale simulée');
    const main = el('div', 'ui-sim__main');
    const pageBody = el('div', 'ui-sim__page');
    main.appendChild(pageBody);
    win.appendChild(side);
    win.appendChild(main);
    wrap.appendChild(win);

    const info = el('p', 'notion-info');
    info.setAttribute('aria-live', 'polite');

    sim.appendChild(wrap);
    sim.appendChild(info);

    function title(id) {
      return (PAGES[id].icon ? PAGES[id].icon + ' ' : '') + PAGES[id].title;
    }

    function go(id) {
      current = id;
      render();
      pageBody.querySelector('.ui-sim__page-title').focus();
      if (id === 'root') {
        sayIn(info, 'Page « Studio Nova ».', 'Les trois dernières lignes sont des blocs page : ce sont les mêmes pages que dans la barre latérale.');
      } else {
        sayIn(info, 'Sous-page ouverte.', 'Regarde le fil d’Ariane : la page est rangée dans « Studio Nova ». Elle a son propre contenu.');
      }
    }

    function sideRow(id, indent) {
      const row = el('button', 'ui-sim__row ui-sim__nav' + (indent ? ' ui-sim__row--indent' : '') + (current === id ? ' ui-sim__row--current' : ''), title(id));
      row.type = 'button';
      if (current === id) { row.setAttribute('aria-current', 'page'); }
      row.addEventListener('click', function () { go(id); });
      return row;
    }

    function render() {
      bar.innerHTML = '';
      if (current !== 'root') { bar.appendChild(document.createTextNode('Studio Nova / ')); }
      bar.appendChild(el('strong', '', PAGES[current].title));
      bar.appendChild(el('span', 'notion-page__tag', 'Simulation'));

      side.innerHTML = '';
      side.appendChild(el('p', 'ui-sim__section', 'Privé'));
      side.appendChild(sideRow('root', false));
      ['accueil', 'projets', 'ressources'].forEach(function (id) { side.appendChild(sideRow(id, true)); });

      pageBody.innerHTML = '';
      if (current !== 'root') {
        const back = el('button', 'btn btn-outline btn--compact subpage-sim__back', '← Retour à Studio Nova');
        back.type = 'button';
        back.addEventListener('click', function () { go('root'); });
        pageBody.appendChild(back);
      }
      const heading = el('p', 'ui-sim__page-title', title(current));
      heading.tabIndex = -1;
      pageBody.appendChild(heading);

      PAGES[current].blocks.forEach(function (block) {
        const line = el('div', 'notion-block' + (block.kind === 'page' ? ' subpage-sim__block--page' : ''));
        const btn = el('button', 'notion-block__btn');
        btn.type = 'button';
        const handle = el('span', 'notion-block__handle', '⋮⋮');
        handle.setAttribute('aria-hidden', 'true');
        btn.appendChild(handle);
        if (block.kind === 'page') {
          const doc = el('span', 'subpage-sim__doc', PAGES[block.target].icon || '▤');
          doc.setAttribute('aria-hidden', 'true');
          btn.appendChild(doc);
          btn.appendChild(el('span', 'subpage-sim__link', PAGES[block.target].title));
          btn.addEventListener('click', function () { go(block.target); });
        } else {
          btn.appendChild(document.createTextNode((block.kind === 'toggle' ? '▸ ' : '') + block.text));
        }
        const label = el('span', 'notion-block__label', block.label);
        label.setAttribute('aria-hidden', 'true');
        function show() {
          pageBody.querySelectorAll('.notion-block').forEach(function (other) { other.classList.toggle('is-active', other === line); });
          sayIn(info, block.label + '.', block.info);
        }
        btn.addEventListener('mouseenter', show);
        btn.addEventListener('focus', show);
        line.appendChild(btn);
        line.appendChild(label);
        pageBody.appendChild(line);
      });
    }

    render();
    sayIn(info, 'Page « Studio Nova ».', 'Survole chaque ligne, puis clique sur un bloc page pour l’ouvrir.');
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-slash-sim]').forEach(setupSlashSim);
    document.querySelectorAll('[data-block-menu-sim]').forEach(setupBlockMenuSim);
    document.querySelectorAll('[data-subpage-sim]').forEach(setupSubpageSim);
  });
})();

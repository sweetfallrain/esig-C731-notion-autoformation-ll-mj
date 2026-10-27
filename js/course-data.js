/* ===================================================================
   Source unique du parcours : modules, leçons, fichiers, durées.
   - id    : identifiant stable (sert de clé localStorage, ne pas renommer)
   - file  : chemin depuis la racine du site, ou null si la leçon
             n'est pas encore rédigée (affichée « bientôt »)
   - minutes : durée indicative
   allLessons() ajoute la numérotation : moduleNumber (1) et number (« 1.2 »).
   =================================================================== */
(function () {
  'use strict';

  const MODULES = [
    {
      id: 'm1', num: '01', title: 'Découvrir Notion',
      desc: 'Comprendre à quoi sert Notion et te repérer dans son interface.',
      lessons: [
        { id: 'm1-l1', title: 'À quoi sert Notion', file: 'lecons/m01-l01-a-quoi-sert-notion.html', minutes: 4 },
        { id: 'm1-l2', title: 'Se repérer dans l’interface', file: 'lecons/m01-l02-se-reperer-dans-l-interface.html', minutes: 6 },
        { id: 'm1-l3', title: 'Entrer dans Studio Nova', file: 'lecons/m01-l03-entrer-dans-studio-nova.html', minutes: 4 }
      ]
    },
    {
      id: 'm2', num: '02', title: 'Pages et blocs',
      desc: 'La logique de base : une page est composée de blocs que tu crées, déplaces et transformes.',
      lessons: [
        { id: 'm2-l1', title: 'Qu’est-ce qu’une page', file: 'lecons/m02-l01-quest-ce-qu-une-page.html', minutes: 4 },
        { id: 'm2-l2', title: 'Créer et nommer une page', file: 'lecons/m02-l02-creer-et-nommer-une-page.html', minutes: 5 },
        { id: 'm2-l3', title: 'Comprendre les blocs', file: 'lecons/m02-l03-comprendre-les-blocs.html', minutes: 6 },
        { id: 'm2-l4', title: 'La commande « / »', file: 'lecons/m02-l04-la-commande-slash.html', minutes: 5 },
        { id: 'm2-l5', title: 'Titres et listes', file: 'lecons/m02-l05-titres-et-listes.html', minutes: 7 },
        { id: 'm2-l6', title: 'Bascules, encadrés, liens et médias', file: 'lecons/m02-l06-bascules-encadres-liens-medias.html', minutes: 7 },
        { id: 'm2-l7', title: 'Déplacer, dupliquer, supprimer, transformer', file: 'lecons/m02-l07-deplacer-dupliquer-supprimer-transformer.html', minutes: 6 },
        { id: 'm2-l8', title: 'Créer une sous-page', file: 'lecons/m02-l08-creer-une-sous-page.html', minutes: 6 }
      ]
    },
    {
      id: 'm3', num: '03', title: 'Organiser et naviguer',
      desc: 'Ranger tes pages, les relier entre elles et retrouver une information rapidement.',
      lessons: [
        { id: 'm3-l1', title: 'L’arborescence', file: 'lecons/m03-l01-l-arborescence.html', minutes: 5 },
        { id: 'm3-l2', title: 'Les liens entre pages', file: 'lecons/m03-l02-les-liens-entre-pages.html', minutes: 5 },
        { id: 'm3-l3', title: 'Barre latérale et favoris', file: 'lecons/m03-l03-barre-laterale-et-favoris.html', minutes: 4 },
        { id: 'm3-l4', title: 'La recherche', file: 'lecons/m03-l04-la-recherche.html', minutes: 3 }
      ]
    },
    {
      id: 'm4', num: '04', title: 'Bases de données',
      desc: 'Une base est une collection de pages décrites par des propriétés. Tu crées la base « Projets ».',
      lessons: [
        { id: 'm4-l1', title: 'Pourquoi une base', file: 'lecons/m04-l01-pourquoi-une-base.html', minutes: 5 },
        { id: 'm4-l2', title: 'Une entrée est une page', file: 'lecons/m04-l02-une-entree-est-une-page.html', minutes: 5 },
        { id: 'm4-l3', title: 'Les propriétés essentielles', file: 'lecons/m04-l03-les-proprietes-essentielles.html', minutes: 6 },
        { id: 'm4-l4', title: 'Sélection, statut, personne', file: 'lecons/m04-l04-selection-statut-personne.html', minutes: 6 },
        { id: 'm4-l5', title: 'Créer la base Projets', file: 'lecons/m04-l05-creer-la-base-projets.html', minutes: 8 },
        { id: 'm4-l6', title: 'Ajouter, ouvrir, modifier', file: 'lecons/m04-l06-ajouter-ouvrir-modifier.html', minutes: 6 }
      ]
    },
    {
      id: 'm5', num: '05', title: 'Vues, filtres et tris',
      desc: 'Une même base, plusieurs présentations. Les données ne sont jamais dupliquées.',
      lessons: [
        { id: 'm5-l1', title: 'Une base, plusieurs vues', file: 'lecons/m05-l01-une-base-plusieurs-vues.html', minutes: 5 },
        { id: 'm5-l2', title: 'Table, liste et board', file: 'lecons/m05-l02-table-liste-board.html', minutes: 6 },
        { id: 'm5-l3', title: 'Calendrier, galerie, timeline', file: 'lecons/m05-l03-calendrier-galerie-timeline.html', minutes: 6 },
        { id: 'm5-l4', title: 'Filtrer, trier, regrouper', file: 'lecons/m05-l04-filtrer-trier-regrouper.html', minutes: 8 }
      ]
    },
    {
      id: 'm6', num: '06', title: 'Construire un espace pro',
      desc: 'Un bon espace n’est pas le plus rempli : c’est celui où l’équipe trouve vite ce qu’elle cherche.',
      lessons: [
        { id: 'm6-l1', title: 'Les 5 parties de Studio Nova', file: 'lecons/m06-l01-les-5-parties-de-studio-nova.html', minutes: 6 },
        { id: 'm6-l2', title: 'Nommer clairement', file: 'lecons/m06-l02-nommer-clairement.html', minutes: 4 },
        { id: 'm6-l3', title: 'Une page d’accueil simple', file: 'lecons/m06-l03-une-page-d-accueil-simple.html', minutes: 6 },
        { id: 'm6-l4', title: 'Ranger régulièrement', file: 'lecons/m06-l04-ranger-regulierement.html', minutes: 6 }
      ]
    },
    {
      id: 'm7', num: '07', title: 'Partager et collaborer',
      desc: 'Emma partage un projet avec Lucas : choisir le bon niveau d’accès, commenter, mentionner.',
      lessons: [
        { id: 'm7-l1', title: 'Le bouton Partager', file: 'lecons/m07-l01-le-bouton-partager.html', minutes: 4 },
        { id: 'm7-l2', title: 'Les niveaux d’accès', file: 'lecons/m07-l02-les-niveaux-d-acces.html', minutes: 7 },
        { id: 'm7-l3', title: 'Commentaires et mentions', file: 'lecons/m07-l03-commentaires-et-mentions.html', minutes: 5 },
        { id: 'm7-l4', title: 'Avant de partager', file: 'lecons/m07-l04-avant-de-partager.html', minutes: 5 }
      ]
    },
    {
      id: 'm8', num: '08', title: 'Cas pratique Studio Nova',
      desc: 'Assembler tout ce que tu as appris dans un espace complet et cohérent.',
      lessons: [
        { id: 'm8-l1', title: 'Le brief', file: 'lecons/m08-l01-le-brief.html', minutes: 4 },
        { id: 'm8-l2', title: 'Construire l’espace', file: 'lecons/m08-l02-construire-l-espace.html', minutes: 10 },
        { id: 'm8-l3', title: 'Vérifier le résultat', file: 'lecons/m08-l03-verifier-le-resultat.html', minutes: 5 }
      ]
    },
    {
      id: 'm9', num: '09', title: 'Quiz final et conclusion',
      desc: 'Valider ton parcours et repartir avec les bons réflexes.',
      lessons: [
        { id: 'm9-l1', title: 'Quiz final', file: 'lecons/m09-l01-quiz-final.html', minutes: 10 },
        { id: 'm9-l2', title: 'Récapitulatif', file: 'lecons/m09-l02-recapitulatif.html', minutes: 4 },
        { id: 'm9-l3', title: 'Et maintenant ?', file: 'lecons/m09-l03-et-maintenant.html', minutes: 3 }
      ]
    }
  ];

  /** Toutes les leçons à plat, dans l'ordre du parcours. */
  function allLessons() {
    const list = [];
    MODULES.forEach(function (module) {
      module.lessons.forEach(function (lesson, index) {
        list.push(Object.assign({}, lesson, {
          moduleId: module.id,
          moduleTitle: module.title,
          moduleNumber: Number(module.num),
          number: Number(module.num) + '.' + (index + 1),
          index: index + 1,
          moduleCount: module.lessons.length
        }));
      });
    });
    return list;
  }

  function findLesson(id) {
    return allLessons().find(function (lesson) { return lesson.id === id; }) || null;
  }

  window.NotionCourse = Object.assign(window.NotionCourse || {}, {
    MODULES: MODULES,
    allLessons: allLessons,
    findLesson: findLesson
  });
})();

# CLAUDE.md — Notion pour l'entreprise (Travail pratique ESIG)

> **État actuel (nov. 2026).** Parcours d'autoformation en **9 modules et
> 36 leçons**, construit autour du cas fil rouge « Studio Nova », au
> tutoiement. Les leçons des modules 1 à 7 sont découpées en **3 étapes**
> (Comprendre · Faire · Vérifier) ; les modules 8 et 9 sont des **pages
> simples**, sans étapes. Le style visuel est défini dans **`@DESIGN.md`**, à
> lire en entier avant tout travail CSS. Historique complet dans « Notes de
> migration » (la plus récente en premier).

## Contexte du projet

Site web **« Notion pour l'entreprise »**, réalisé dans le cadre d'un travail
pratique ESIG (filière Informaticienne de gestion, module C731), par Lennie
et Jessica.

C'est un **site d'autoformation à Notion** pour des collaborateurs
d'entreprise qui n'ont jamais utilisé Notion ou le connaissent très peu.
Le site doit être à la fois une formation pédagogique complète, un guide
interactif, un parcours progressif pour débutant, et un site agréable,
moderne et très simple à utiliser. Il doit permettre d'apprendre **sans
formateur à côté**.

## Public cible

Collaborateurs débutants, tous métiers confondus, qui ont déjà utilisé un
ordinateur. On considère que l'apprenant ne sait pas ce qu'est un bloc, ne
distingue pas page et base de données, ne connaît ni les propriétés, ni les
vues, ni le Kanban, ni le vocabulaire de Notion. **Ne jamais présumer qu'un
concept est déjà compris.**

L'apprenant s'entraîne dans un **espace Notion gratuit, seul** : il n'a pas
de collègues dans son espace (voir « Règles propres à l'espace gratuit »).

## Objectif final

À la fin, l'apprenant sait : (1) à quoi sert Notion ; (2) se repérer dans
l'interface ; (3) créer et organiser des pages ; (4) comprendre et manipuler
les blocs ; (5) créer des sous-pages et une navigation simple ; (6) ce
qu'est une base de données Notion ; (7) en créer une simple ; (8) utiliser
les propriétés principales ; (9) créer plusieurs vues d'une même base ;
(10) filtrer, trier et regrouper ; (11) créer un Kanban simple ;
(12) organiser un petit espace professionnel ; (13) partager correctement une
page ; (14) comprendre les principaux niveaux d'autorisation ; (15) appliquer
de bonnes pratiques pour garder un espace simple.

## Principe pédagogique

Du plus simple au plus complexe. Pour chaque notion, autant que possible :
expliquer ce que c'est → à quoi ça sert → exemple concret → comment le faire
pas à pas (avec captures) → astuce → erreur fréquente → mini-exercice → 1 à 3
questions de vérification.

Une leçon se lit en **3 à 8 minutes**. Si elle devient trop longue, on la
découpe. Jamais deux concepts complexes à la fois. Quand une notion dépend
d'une précédente, on la rappelle en une phrase.

**Pas de doublon** : quand une simulation répète le texte, on garde le plus
clair des deux. Un passage qui n'apporte rien est proposé à la suppression
à l'utilisatrice, jamais supprimé sans son accord.

## Style rédactionnel

- Français simple, naturel et professionnel. **Tutoiement partout.**
- Phrases courtes, exemples, comparaisons simples, listes, étapes numérotées.
- Pas de jargon inutile, de gros paragraphes, de définitions compliquées ni
  de fonctionnalités avancées inutiles au débutant.
- **Aucun placeholder pédagogique** : pas de Lorem Ipsum, « TODO », « contenu
  à compléter », « mettre une vidéo ». Tout texte affiché est réellement
  rédigé. (Seule exception : l'emplacement d'une capture d'écran pas encore
  réalisée, qui décrit précisément la capture attendue.)
- **Libellés de Notion** : toujours ceux de l'interface française actuelle,
  **tels qu'ils apparaissent sur les captures de l'utilisatrice** (voir
  « Libellés Notion vérifiés »). Le nom anglais peut suivre entre parenthèses.
- **Touches** : « Enter », « Esc », « Shift + Enter », « Ctrl + K (Cmd + K sur
  Mac) ».
- **Titres à taper dans Notion** : tiret court entouré d'espaces, comme sur
  les captures : « Accueil - Studio Nova », « Réunion d'équipe - 3 novembre »,
  « Procédure - Envoyer une facture ». Le tiret long reste réservé au texte
  courant.
- Ne jamais présenter une base de données comme un simple tableau Excel :
  **une base est une collection de pages**, les propriétés donnent du
  contexte, une base peut avoir plusieurs vues sans dupliquer les données.
- Si un comportement actuel de Notion est incertain, le signaler au lieu de
  l'inventer.

## Cas fil rouge : Studio Nova

Petite agence créative qui centralise dans Notion ses projets, tâches,
ressources, notes et infos d'équipe. L'espace se construit au fil des
modules, dans la page « Studio Nova » rangée dans « Pages privées » :

```
Studio Nova                          (1.3, page)
├── Accueil - Studio Nova            (2.2, page ; refaite en 6.3)
├── Projets                          (page vide en 2.8 → base pleine page en 4.5)
├── Tâches                           (6.1, base pleine page)
├── Ressources                       (2.8, page)
└── Notes & réunions                 (3.1, page)
    └── Réunion d'équipe - 3 novembre
```

Au module 8 (cas pratique), l'apprenant ajoute une sixième partie,
« Matériel » (base pleine page), et « Procédure - Prêt du matériel » dans
Ressources (solution du corrigé).

### Personnes

- **Emma** : responsable de projet, gère l'espace (Accès complet).
- **Lucas** : graphiste.
- **Sarah** : chargée de clientèle, membre de l'équipe.
- **Hugo** : futur stagiaire, qui rejoindra bientôt l'équipe (Lecture seule).

### Base « Projets » (propriétés de la 4.5)

Nom (Titre) · Statut (État) · Responsable (Personne) · Échéance (Date) ·
Priorité (Sélectionner : Haute, Moyenne, Basse).

| Projet          | Statut à la 4.5 | Responsable (scénario) | Priorité | Échéance    |
|-----------------|-----------------|------------------------|----------|-------------|
| Site Orion      | En cours        | Emma                   | Haute    | 15 novembre |
| Identité Luna   | Pas commencé    | Lucas                  | Moyenne  | 28 novembre |
| Campagne Atlas  | Terminé         | Emma                   | Basse    | 5 novembre  |
| Brochure Vega   | Pas commencé    | (ajoutée en 4.6)       | Moyenne  | 4 décembre  |

Évolution au fil du cours : **4.6** Site Orion passe en Terminé et Brochure
Vega est ajoutée (contenu : « Brochure de 8 pages pour le client Vega. » + une
checklist de deux tâches) ; **5.1** Identité Luna passe en En cours.

Vues créées : « Tous les projets » (Table, 5.1), « Suivi » (Kanban, 5.1),
« Coup d'œil » (Liste, 5.2), « Échéances » (Calendrier, 5.3), « En cours »
(Table filtrée, 5.4), « Archives » (Table filtrée sur Terminé, 6.4).

### Base « Tâches » (6.1)

Statut (État) · Responsable (Personne) · Échéance (Date). Vues : « Toutes les
tâches », « Suivi » (Kanban), « Mes tâches » (filtre « Responsable : Contient »).

| Tâche                                | Statut       | Échéance    |
|--------------------------------------|--------------|-------------|
| Finaliser la maquette du site Orion  | En cours     | 15 novembre |
| Préparer la réunion client           | Pas commencé | 18 novembre |
| Mettre à jour les ressources         | Pas commencé | 20 novembre |

### Page « Accueil - Studio Nova »

- **Module 2** : titre 1 « Studio Nova », phrase « Bienvenue dans l'espace de
  travail de Studio Nova. », encadré « Réunion d'équipe chaque lundi à 9 h. »,
  titre 2 « Cette semaine » avec trois tâches en checklist, séparateur, titre 2
  « Liens utiles » (@Projets, @Ressources ; @Notes & réunions ajouté en 3.2).
- **Leçon 6.3** : la phrase d'accueil devient un encadré, l'ancienne section
  « Cette semaine » est supprimée, « Liens utiles » devient « Accès rapides »
  (Projets, Tâches, Ressources, Notes & réunions), puis un titre « Cette
  semaine » avec une vue liée de la base « Tâches » filtrée sur l'échéance.

Studio Nova rend les notions concrètes, mais toutes les phrases ne deviennent
pas une histoire.

## Règles propres à l'espace gratuit

- **Propriété Personne** : l'apprenant n'a pas d'autres membres dans son
  espace. Partout où il faut choisir une personne, il **se choisit
  lui-même** ; les prénoms (Emma, Lucas, Sarah) indiquent qui le ferait dans
  la vraie équipe (encadré de la 4.5, rappel en 6.1 et au module 8).
- **Mentions et partage** : « mentionne-toi toi-même » si personne n'a accès ;
  inviter un collègue seulement s'il est d'accord, sinon passer l'étape.
- **Niveaux d'accès** : « Modifications autorisées » est marqué « Plus »
  (réservé aux offres payantes) ; le cours le signale en 7.2.

## Libellés Notion vérifiés (sur les captures)

- **Interface** : « Chercher ou demander », « Nouvelle page », « Pages
  partagées », « Pages privées », « + Ajouter », « Personnaliser la barre
  latérale », « 1 lien entrant », filtres de recherche « Titres uniquement »,
  « Créée par », « Dans », « + Filtrer ».
- **Blocs** : menu dépliant par « /liste » puis « Menu dépliant » (Shift +
  Enter pour une deuxième ligne, après avoir cliqué dans le menu) ; checklist
  par « /liste » puis « Liste de tâches ».
- **Créer une base pleine page** : dans une page **vide**, sans rien taper,
  option grise « Base de données » sous « Premiers pas… », puis « Base de
  données vide » en haut à droite de la fenêtre des modèles. Ne pas utiliser
  « /base de données » → « Pleine page », qui crée une sous-page.
  Base intégrée (brouillon de la 4.2) : « /database » puis « Vue Table »
  (« Vue Tableau » = Kanban).
- **Propriétés** : types « État » (Pas commencé / En cours / Terminé),
  « Sélectionner », « Sélection multiple », « Personne », « Date » ; options
  par nom de colonne → « Modifier la propriété » → Options → « + » ;
  « Masquer », « Visibilité des propriétés ».
- **Vues** : Table, Kanban, Galerie, Liste, Graphique, Dashboard, Chronologie,
  Fil d'actualité, Carte, Calendrier, Formulaire. La vue de départ s'appelle
  « Table » ; on la renomme dans le panneau « Afficher les paramètres » (icône
  des curseurs) ; on ajoute une vue avec le « + » à droite des onglets.
- **Filtrer / trier / grouper** : icône Filtrer (trois traits, filtre affiché
  par exemple « Statut: In progress »), icône Trier (deux flèches, ordre
  « Ancien → Nouveau » ou « Nouveau → Ancien »), « Grouper » → « Grouper par »
  dans le panneau des réglages.
- **Vue liée** : « /linked » → « Vue liée de la source de données » ; filtre
  « Échéance : Ce(tte) semaine ».
- **Partage** : onglets « Partager » / « Publier », accès général
  « Uniquement les personnes invitées », « Avancé », « Copier le lien » ;
  niveaux « Accès complet », « Modifications autorisées », « Modifications de
  contenu autorisées », « Commentaires autorisés », « Lecture seule »,
  « Supprimer ».
- **Commentaires** : sélectionner un passage → « Commenter » dans le menu ;
  résoudre avec l'icône ✓ ; clic droit dans la barre latérale → « Renommer ».

## Stack technique

- **HTML5 / CSS3 / JavaScript vanilla (ES6+)**, sans framework, sans backend.
- **Zéro CDN** : polices auto-hébergées dans `fonts/`, aucune dépendance
  externe. Le site fonctionne hors connexion.
- **Multi-pages statiques**, navigation par liens `<a>`.
- **Persistance locale** (`localStorage`, clés préfixées `notion-formation:`) :
  leçons terminées, réponses des mini-quiz
  (`notion-formation:quiz:<leçon>:<n>`), réponses du questionnaire final
  (`notion-formation:final:<leçon>`).
- Aucune build step : un serveur statique (Live Server / WebStorm) suffit.

## Structure du projet

```
esig-C731-notion-autoformation-ll-mj/
├── index.html                 Accueil (illustration, programme, Studio Nova, méthode)
├── mon-parcours.html          Page « Les modules » : sommaire des 9 modules + progression
├── lecons/                    36 leçons : mXX-lYY-slug.html
│   └── m02-l03-comprendre-les-blocs.html   Leçon gabarit (leçon en 3 étapes)
├── css/
│   ├── variables.css          Tokens DESIGN.md + @font-face
│   ├── base.css               Reset, typographie, boutons, utilitaires
│   ├── layout.css             En-tête, layout de leçon, sommaire latéral, panneau
│   ├── components.css         Composants pédagogiques, simulations, questionnaire final
│   └── responsive.css         Breakpoints DESIGN.md
├── js/
│   ├── course-data.js         Source unique : modules, leçons, fichiers, durées
│   ├── progress.js            API localStorage (leçons terminées)
│   ├── nav.js                 Menu mobile de l'en-tête
│   ├── course-toc.js          Sommaire latéral généré depuis course-data.js
│   ├── lesson.js              Étapes de leçon (ou page simple), bouton « terminée », suite
│   ├── quiz.js                Mini-quiz à correction immédiate
│   ├── final-quiz.js          Questionnaire final : correction de tout à la fin, score
│   ├── sort-ex.js             Exercices « choisis la bonne réponse » (listes déroulantes)
│   ├── notion-sim.js          Fausses pages Notion
│   ├── block-sims.js          Simulations de blocs et de sous-pages (module 2)
│   ├── db-sim.js              Simulation de la base Projets (modules 4 et 5)
│   └── parcours.js            Page « Les modules » (accordéon, progression)
├── images/
│   ├── captures/              Captures Notion de l'utilisatrice (m<module>-<sujet>.png)
│   └── illustrations/         Schémas SVG (m<module>-<sujet>.svg) + accueil-hero.webp
├── fonts/
├── styleguide.html            Référence visuelle (ancienne, à mettre à jour)
├── DESIGN.md
├── CLAUDE.md / AGENTS.md      Ce document (les deux fichiers sont identiques)
└── README.md
```

## Les 9 modules et leurs leçons

L'ordre, les titres et les durées vivent dans `js/course-data.js` (source
unique). Une leçon sans fichier apparaît dans le sommaire comme « bientôt ».

1. **Découvrir Notion** — À quoi sert Notion · Se repérer dans l'interface · Entrer dans Studio Nova
2. **Pages et blocs** — Qu'est-ce qu'une page · Créer et nommer une page · Comprendre les blocs · La commande « / » · Titres et listes · Menus dépliants, encadrés, liens et médias · Déplacer, dupliquer, supprimer, transformer · Créer une sous-page
3. **Organiser et naviguer** — L'arborescence · Les liens entre pages · Barre latérale et favoris · La recherche
4. **Bases de données** — Pourquoi une base · Une entrée est une page · Les propriétés essentielles · Sélection, statut, personne · Créer la base Projets · Ajouter, ouvrir, modifier
5. **Vues, filtres et tris** — Une base, plusieurs vues · Table, liste et Kanban · Calendrier, galerie, chronologie · Filtrer, trier, regrouper
6. **Construire un espace pro** — Les 5 parties de Studio Nova · Nommer clairement · Une page d'accueil simple · Ranger régulièrement
7. **Partager et collaborer** — Le bouton Partager · Les niveaux d'accès · Commentaires et mentions · Avant de partager
8. **Cas pratique Studio Nova** (pages simples) — Le cas pratique · Le corrigé
9. **Questionnaire final** (page simple) — Questionnaire final

Certains noms de fichiers gardent un ancien libellé (`m02-l06-bascules-…`,
`m05-l02-table-liste-board`, `m05-l03-…-timeline`) : ne pas les renommer,
les identifiants et la progression en dépendent.

## Anatomie d'une leçon (modules 1 à 7)

Fichier `lecons/mXX-lYY-slug.html`, copié depuis la leçon gabarit. Le
`<body>` porte `data-lesson="mX-lY"` et `data-root="../"` ; le sommaire, la
progression et le bouton de suite se génèrent depuis `course-data.js`.

En tête : ligne du module (« Module X · titre · durée ») avec « Étape x sur 3 ·
nom » à droite, puis le H1. Ensuite 3 étapes, chacune dans une
`<section data-step="Comprendre|Faire|Vérifier">` affichée comme une page
(adresses `#comprendre`, `#faire`, `#verifier`) :

1. **Comprendre** — introduction, explication, **image explicative** (schéma SVG), définition, erreur fréquente (bandeau Attention), simulation éventuelle.
2. **Faire** — exercice de tri éventuel, tutoriel pas à pas avec captures, astuce (bandeau Astuce), mini-exercice « dans Notion » + résultat attendu.
3. **Vérifier** — objectif de la leçon (« Tu sais maintenant… »), mini-quiz (1-3 questions, correction expliquée), bouton « Marquer comme terminée ».

Navigation du bas : « Étape précédente » / « Étape suivante », puis à la
dernière étape « Chapitre suivant », « Module suivant » ou « Retour aux
modules » (ce clic marque la leçon comme terminée). La numérotation (1.1,
1.1.1…) n'apparaît que dans le sommaire latéral.

## Pages simples (modules 8 et 9)

Pas de `data-step` : le contenu est dans `<section class="lesson-page prose">`,
suivi du bouton « Marquer comme terminée » et d'un seul bouton vers la suite.
`lesson.js` et `course-toc.js` gèrent ce cas (aucune étape listée).

- **8.1 Le cas pratique** : nouveau besoin « le matériel de l'agence », **sans
  pas-à-pas** (brief d'Emma en 8 demandes, inventaire de 5 objets, règles du
  jeu, coup de pouce repliable `details.hint`, grille de vérification, test du
  nouveau venu).
- **8.2 Le corrigé** : une solution expliquée choix par choix, avec les autres
  solutions acceptables, et 8 emplacements de captures `m08-corrige-*`.
- **9.1 Questionnaire final** : 15 questions sur les modules 1 à 7, corrigées
  **toutes à la fin** (`final-quiz.js` : questions sans réponse signalées,
  score sur 15, leçon à revoir sous chaque question), puis la fiche mémo des
  raccourcis et le message « Bravo, tu as terminé la formation ! ».

## Captures d'écran

- Faites par l'utilisatrice dans son espace Notion, rangées dans
  `images/captures/` (`m<module>-<sujet>.png`, paires `-1` / `-2` côte à côte
  dans `.screenshot__pair`).
- Intégrées avec `width` / `height` réels et `loading="lazy"`, et un `alt` qui
  décrit **ce que montre vraiment l'image** (éléments entourés, flèches).
- Le texte de la leçon suit la capture : si l'interface diffère, on adapte le
  texte (libellés, emplacement des boutons).
- Tant qu'une capture manque, l'emplacement `.screenshot__placeholder` décrit
  la capture attendue et son nom de fichier.
- **État** : modules 1 à 7 complets ; il reste les 8 captures du corrigé du
  module 8 (`m08-corrige-barre-laterale`, `-base`, `-fiche-objet`,
  `-prets-en-cours`, `-mes-emprunts`, `-procedure`, `-accueil`, `-partage`).
  Les captures du module 7 montrent des adresses e-mail réelles (à flouter si
  le site devient public).

## Règles impératives

1. **HTML sémantique** : `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`,
   un seul `<h1>` par page, titres hiérarchisés.
2. **Mobile-first**, breakpoints de `DESIGN.md`.
3. **Design system unique** : couleurs et valeurs dérivées uniquement via
   `variables.css`.
4. **Typographie** : Playfair Display pour titres, définitions, numéros ;
   Inter partout ailleurs. Polices locales uniquement.
5. **Langue** : tout en français, tutoiement.
6. **Accessibilité** : navigation clavier complète, focus visible
   (`--focus-ring`), labels sur tous les champs, `alt` pertinents, contraste
   suffisant, information jamais portée par la couleur seule, `aria-live`
   pour les retours dynamiques.
7. **Amélioration progressive** : sans JavaScript, une leçon reste lisible
   (les 3 étapes s'affichent à la suite).
8. **JS vanilla modulaire** : un fichier = une responsabilité, pas
   d'`onclick=""` inline, pas de `<form action>`.
9. **Icônes** : SVG inline au trait, `aria-hidden="true"`. Pas d'emojis.
10. **Simulations** : « inspirées de l'interface de Notion », toujours
    marquées « Simulation », jamais présentées comme l'application réelle.
11. **Fichiers** : fins de ligne CRLF ; texte justifié dans les leçons
    uniquement.

## Méthode de travail avec l'utilisatrice

- **Jamais de modification sur `main`** : chaque série de corrections se fait
  sur une **nouvelle branche** ; l'utilisatrice pousse, ouvre la PR et la
  fusionne elle-même.
- Elle relit le site module par module en recréant tout dans Notion, puis
  envoie ses corrections et ses captures.
- Avant une modification importante ou ambiguë, **reformuler et demander**.
  Les passages jugés inutiles sont **proposés** à la suppression, jamais
  supprimés d'office.
- Après chaque série : vérifier le site (test des 36 leçons, rendu à l'écran),
  committer, puis résumer ce qui a changé et ce qui reste à faire.

Le contenu validé est la **source de vérité** : ne jamais le raccourcir pour
faciliter l'intégration, ne jamais supprimer exemples, exercices,
corrections, astuces ou encadrés sans accord.

---

## Notes de migration

### v10 — relecture des modules 1 à 7 et mise à jour de ce document (nov. 2026)

- **Personnages fixés** : Emma responsable de projet, Lucas graphiste, Sarah
  chargée de clientèle, Hugo futur stagiaire (1.3, schéma de l'équipe, 7.2).
  **[confirmé]**
- **Responsable = soi-même** partout dans l'espace gratuit ; prénoms = scénario.
  **[décision de l'utilisatrice]**
- **Tirets courts** dans tous les titres à taper dans Notion (texte,
  simulations, schémas). **[décision de l'utilisatrice]**
- **Supprimés** (validés) : encadré « le paragraphe ne descend pas » (2.3),
  étape masquer / réafficher la barre (3.3, déjà en 1.2), étape « renommer la
  réunion en 3 nov. » (6.2) ; la réunion garde le titre « Réunion d'équipe -
  3 novembre ». **[décision de l'utilisatrice]**
- 3.1 : schéma sans la « Réunion client Orion », jamais créée (remplacée par
  « Brouillon »). 4.5 : étape pour recréer les liens vers « Projets » (accueil,
  réunion, favori) après la transformation en base. 6.1 : statut de chaque
  tâche. 6.4 : vue « Archives » à côté de « En cours ». 7.3 : exercice sur
  « Brochure Vega ». 7.4 : « Budget confidentiel » rangé dans Ressources.
- **Accueil du site** : illustration `images/illustrations/accueil-hero.webp`
  (32 Ko) à droite du titre, à la place de l'emplacement de capture.
- **CLAUDE.md / AGENTS.md** : partie haute réécrite selon l'état actuel ; les
  notes plus anciennes sont gardées comme historique (certains détails y sont
  dépassés, la partie haute fait foi).

### v9 — modules 8 et 9 en pages simples (nov. 2026)

- **Module 8** : deux pages sans étapes (pas de Comprendre / Faire / Vérifier).
  8.1 « Le cas pratique » : nouveau besoin « le matériel de l'agence », sans
  pas-à-pas (brief, inventaire, règles, coup de pouce, grille) ; 8.2 « Le
  corrigé » : une solution expliquée (base Matériel pleine page, propriétés,
  vues Prêts en cours / Mes emprunts, procédure, vue liée, partage en Lecture
  seule), 8 emplacements de captures m08-corrige-*. **[décision de l'utilisatrice]**
- **Module 9** : une seule page « Questionnaire final » : 15 questions corrigées
  toutes à la fin (js/final-quiz.js, score sur 15, leçon à revoir sous chaque
  erreur), puis la fiche mémo et le message de fin. **[décision de l'utilisatrice]**
- lesson.js : une page sans `data-step` n'affiche qu'un bouton vers la suite ;
  course-toc.js ne liste pas d'étapes pour ces pages. Parcours : 36 leçons.
- Module 7 aligné sur les libellés Notion : Modifications autorisées,
  Modifications de contenu autorisées, Commentaires autorisés, Lecture seule,
  Supprimer ; accès général « Uniquement les personnes invitées ».

### v8 — « Projets » et « Tâches » en bases pleine page (nov. 2026)

- « Projets » et « Tâches » sont des **bases pleine page** : la page vide créée
  au module 2 devient la base (option grise « Base de données » en bas d'une
  page vide, puis « Base de données vide » en haut à droite de la fenêtre des modèles). Le titre de la
  page est le nom de la base : plus de base intégrée « 2026 ». **[décision de
  l'utilisatrice]** Ne pas utiliser « /base de données » → « Pleine page » dans
  la page : cela crée une sous-page (Projets → Projets).
- 4.5 réécrite (théorie, étapes, quiz) ; modules 5 à 7 alignés ; 6.1 : « Tâches »
  créée avec la même méthode, statut de type État, première vue « Toutes les tâches ».
- Captures refaites (v15) : m04-projets-option-base,
  m04-projets-nouvelle-base (nouvelles), m04-projets-remplie, m04-ajout-projet,
  m05-nom-vue, m05-ajouter-vue, m05-kanban-glisser, m05-vue-calendrier,
  m05-filtre-statut, m05-regrouper-statut.

### v7 — captures des modules 3 et 4 (nov. 2026)

- Captures des modules 3 et 4 intégrées ; captures des modules 1-2 refaites.
- **Libellés Notion actuels (vérifiés sur captures)** : « liens entrants »
  (plus « rétroliens »), filtres de recherche « Titres uniquement », « Créée
  par », « Dans », « + Filtrer » ; barre latérale avec « Nouvelle page » et
  « + Ajouter » ; menu dépliant créé avec « /liste ».
- **Bases** : création avec « /database » puis « Vue Table » (« Vue Tableau » =
  board) ; types « État » (options Pas commencé / En cours / Terminé),
  « Sélectionner », « Sélection multiple », « Personne », « Date » ; options
  d'une sélection via « Modifier la propriété » → Options → + (la base intégrée « 2026 » de
  la page « Projets » est remplacée en v8 par une base pleine page). Valeur de statut « À faire » remplacée
  par « Pas commencé » partout (données Studio Nova). **[confirmé]**
- **Noms des vues (vérifiés sur capture)** : Table, Kanban, Galerie, Liste,
  Graphique, Dashboard, Chronologie, Fil d'actualité, Carte, Calendrier,
  Formulaire. « Board » → « Kanban » et « Timeline » → « Chronologie » dans toute
  la formation ; seule la commande « / » affiche « Vue Tableau » pour le Kanban.
  Une vue se nommait alors avec « Nom de la vue » et s'ajoutait par le « + » à
  droite du nom de la base intégrée ; remplacé en v8 (voir « Libellés Notion
  vérifiés »). **[confirmé]**

### v6 — allègement et captures des modules 1-2 (nov. 2026)

Retours de relecture de l'utilisatrice (branche `corrections-modules-1-2`).

- **Leçons en 3 étapes** : Comprendre · Faire · Vérifier. L'étape Voir est
  supprimée (elle répétait Comprendre et Faire) ; ses simulations interactives,
  ainsi que les contenus propres aux modules 8-9, sont placés à la fin de
  Comprendre (le corrigé de m08-l03 est au début de Vérifier). « À retenir » est
  supprimé : Vérifier = objectif + quiz. Les noms d'étapes sont lus sur
  `data-step`. **[confirmé]**
- **Pas de doublon texte / simulation** : quand une simulation répète le texte,
  on garde le plus clair des deux (souvent le texte). Simulations retirées en
  1.2, 2.1, 3.3, 4.5 et 7.1 ; paragraphes redondants retirés en 4.3, 4.4, 4.6,
  5.1, 5.2 et 5.4. **[confirmé]**
- **Exercice récapitulatif et quiz de fin de module** supprimés (modules 2 à 8).
  **[confirmé]**
- **Touches** : « Enter » et « Esc » (plus « Entrée » ni « Échap »). **[confirmé]**
- **« Bascule » → « menu dépliant »** (libellé réel de Notion) ; leçon 2.6
  renommée « Menus dépliants, encadrés, liens et médias » (fichier inchangé).
  Dans un menu dépliant, Shift + Enter passe à la ligne. **[confirmé]**
- **Ctrl + \** retiré partout (ne fonctionne pas) ; on masque la barre latérale
  avec le bouton en haut à gauche. **[confirmé]**
- **Grand écran** : conteneur 1440 px, carte de leçon jusqu'à 980 px ; texte,
  encadrés et visuels alignés sur toute la largeur de la carte. **[confirmé]**
- **Captures des modules 1 et 2** intégrées (`images/captures/`), paires
  côte à côte (`-1` / `-2`, classe `.screenshot__pair`). Favicon = logo Notion.
- Corrections ponctuelles : « home » pour l'icône (2.2), « /liste » puis « Liste
  de tâches » (2.5, astuce « # » supprimée), « un espace », « Ajouter une image
  de couverture » (2.1).

### v5 — corrections Accueil et module 1 (oct. 2026)

Retours de relecture de l'utilisatrice (branche `corrections-accueil-module1`).

- **Nom affiché** : « Notion » dans l'en-tête et le pied de page (au lieu de
  « Notion pour l'entreprise »), pied de page signé « Lennie & Jessica ».
  Titres d'onglet : « … — Formation Notion ». Logo officiel :
  `images/logo-notion.png`. **[confirmé]**
- **En-tête** : liens « La formation », « Studio Nova » et « La méthode »
  supprimés ; un seul bouton « Les modules » (fichier `mon-parcours.html`
  inchangé, page renommée « Les modules », sans colonne latérale). **[confirmé]**
- **Accueil** : simulation remplacée par l'emplacement de capture
  `images/captures/accueil-espace-finalise.png` (espace Notion finalisé) ;
  bouton « Voir le programme » supprimé ; descriptions du programme allongées
  pour remplir les cartes. **[confirmé]**
- **Leçons** : numérotation dans le sommaire latéral (module 1 → leçon 1.1 →
  étapes 1.1.1 à 1.1.4), pas devant le titre ; plus d'onglets d'étapes sur la
  carte (les étapes se choisissent dans le sommaire) ; chaque étape a son
  adresse (`#comprendre`, `#voir`, `#faire`, `#verifier`) et s'ouvre en haut de
  page ; le sommaire latéral ne montre que le module en cours, les étapes de la
  leçon ouverte et un bouton « Les modules ». Boutons du bas : « Étape
  précédente » à gauche (absent à l'étape 1), « Étape suivante » à droite, puis
  « Chapitre suivant » (ou « Module suivant », ou « Retour aux modules ») à la
  dernière étape ; ce clic marque aussi la leçon comme terminée. À droite de la
  ligne du module, « Étape 2 sur 4 · Voir » indique l'étape en cours. **[confirmé]**
- **Objectif de la leçon** : retiré du haut de la carte (remplacé par une barre
  sous le titre) et placé en tête de « À retenir », à l'étape Vérifier. **[confirmé]**
- **Quiz** : réponses sauvegardées dans le navigateur
  (`notion-formation:quiz:<leçon>:<n>`), effacées par « Recommencer ». Le site
  reste statique : la sauvegarde est propre à un appareil et un navigateur.
  **[confirmé]**
- **Texte justifié** dans les leçons, avec césure automatique ; l'accueil reste
  aligné à gauche (colonnes trop étroites, mots trop espacés). **[confirmé]**
- **Interface Notion 2026** : leçon 1.2 réécrite d'après une capture de
  l'interface actuelle (icônes Boîte de réception / Nouvel élément en haut,
  « Chercher ou demander », onglets, « Pages partagées » / « Pages privées »,
  « Personnaliser la barre latérale », nom de l'espace en bas). Sections renommées
  dans tous les modules. **À vérifier sur l'interface réelle** : emplacement de la
  Corbeille, des Paramètres et des Modèles (en bas de la barre latérale selon
  l'aide Notion, mais absents de la capture), « + » au survol de « Pages
  privées », filtres de la recherche (m03-l04).
- **Modules 2 à 9 relus avec l'aide officielle Notion (oct. 2026)**, sans captures :
  « + Nouveau » pour ajouter une entrée, création de base par « /base de données »
  ou « Tableau » sous le titre d'une page vide, filtres / tris / regroupement et
  « Visibilité des propriétés » dans le menu des réglages de la vue,
  « Enregistrer pour tous », « Nouvelle vue » sur écran étroit, icône de lien en
  haut à droite. Libellés français déduits de l'anglais, **à vérifier** pendant la
  réalisation des captures, ainsi que : commande « /vue liée » (m06-l03),
  colonnes par défaut « Nom » / « Étiquettes » (m04-l02), options par défaut du
  type Statut (m04-l05), vues Graphique et Formulaire non présentées (m05).

### v4 — plateforme de formation (oct. 2026)

Nouveau cahier des charges de l'utilisatrice + maquette validée (canevas
« Maquette formation Notion », écrans Accueil, Mon parcours, Leçon épurée
3b, Simulation base Projets).

- **Type de site** : guide de référence (v3) → **plateforme de formation en
  9 modules** avec leçons, progression et quiz. **[confirmé]**
- **Pages** : Méthode, Ressources et À propos **supprimées** ; il reste
  Accueil, Mon parcours et les pages de leçon. **[confirmé]**
- **Studio Nova** : réintégré comme fil rouge (annule la décision v3).
  **[confirmé]**
- **Ton** : vouvoiement (v3) → **tutoiement**. **[confirmé]**
- **Leçon en 4 étapes** (Comprendre · Voir · Faire · Vérifier) au lieu d'une
  longue page. **[confirmé sur maquette]**
- **Visuel épuré** : beige = navigation, panneau clair = contenu, un seul
  bloc foncé par page, deux bandeaux seulement, plus d'eyebrows en
  majuscules dans les leçons. **[confirmé sur maquette]**
- **Icônes** : emojis → SVG inline. **[décision d'intégration]**
- **Progression** : clés `notion-guide:*` (v2-v3) abandonnées au profit de
  `notion-formation:lecon-terminee:<id>`. **[décision d'intégration]**
- **Module 2 découpé en 8 leçons** (« Les blocs essentiels » dépassait 8 min). **[décision d'intégration]**
- **Module 4 passé à 6 leçons** (pourquoi une base, une entrée est une page,
  propriétés essentielles, sélection/statut/personne, créer la base Projets,
  ajouter/ouvrir/modifier) : **parcours de 39 leçons**. **[décision d'intégration]**
- **Modules 3 à 9 intégrés directement**, sans validation intermédiaire ;
  l'utilisatrice relit et corrige l'ensemble à la fin. **[confirmé]**
- **Libellés français de Notion à vérifier** sur l'interface réelle (seuls les
  libellés anglais ont été confirmés sur l'aide officielle ; ils sont donnés
  entre parenthèses dans les leçons) : niveaux d'accès (« Accès complet »,
  « Peut modifier », « Peut modifier le contenu », « Peut commenter »,
  « Peut consulter »), accès général, « Déplacer vers », « Ajouter aux
  favoris », « Lien vers une page », « Copier le lien », « Rétroliens »,
  noms des vues, « Vue liée », « Nouvelle page », démarrage d'une page vide
  par « Tableau » (m04-l05), groupes du type Statut.
- **Captures d'écran** : tous les emplacements `images/captures/m0X-*.png`
  sont des placeholders à remplir par l'utilisatrice.
- **Sommaire latéral généré en JS** depuis `course-data.js`, pour ne pas
  recopier 39 liens dans chaque leçon. **[décision d'intégration]**
- **À vérifier dans Notion** : le titre d'une page n'est pas présenté comme
  un bloc dans la simulation (comportement actuel de Notion à confirmer sur
  l'espace de démo).

### v3 — contenu généralisé (sept. 2026)

Studio Nova supprimé, contenu regroupé sur `methode.html` en 5 parties,
accueil en teaser. **Remplacé par la v4.**

### v2 — hub de ressources (sept. 2026)

Passage d'un LMS à 5 modules à un guide de référence (Accueil · Méthode ·
Ressources · À propos + Mon parcours), quiz supprimé, nouveaux composants
(cards concept, modèle, ressource, article, bandeau inversé). **Remplacé par
la v4**, qui revient à un parcours de formation tout en conservant la
palette et la typographie.

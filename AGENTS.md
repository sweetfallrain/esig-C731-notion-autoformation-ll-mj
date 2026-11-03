# AGENTS.md — Notion pour l'entreprise (Travail pratique ESIG)

> **v4 — plateforme de formation (oct. 2026).** Le site redevient un parcours
> d'autoformation en 9 modules, construit autour du cas fil rouge
> « Studio Nova », au tutoiement, avec une leçon découpée en 4 étapes.
> Les pages Méthode, Ressources et À propos de la v3 sont supprimées.
> Le style visuel est défini dans **`@DESIGN.md` (v4)**, à lire en entier
> avant tout travail CSS. Historique complet dans « Notes de migration ».

## Contexte du projet

Site web **« Notion pour l'entreprise »**, réalisé dans le cadre d'un travail
pratique ESIG (filière Informaticienne de gestion, module C731).

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
pas à pas → démonstration Studio Nova → astuce → erreur fréquente →
mini-exercice → 1 à 3 questions de vérification.

Une leçon se lit en **3 à 8 minutes**. Si elle devient trop longue, on la
découpe. Jamais deux concepts complexes à la fois. Quand une notion dépend
d'une précédente, on la rappelle en une phrase.

## Style rédactionnel

- Français simple, naturel et professionnel. **Tutoiement partout.**
- Phrases courtes, exemples, comparaisons simples, listes, étapes numérotées.
- Pas de jargon inutile, de gros paragraphes, de définitions compliquées ni
  de fonctionnalités avancées inutiles au débutant.
- **Aucun placeholder pédagogique** : pas de Lorem Ipsum, « TODO », « contenu
  à compléter », « mettre une vidéo ». Tout texte affiché est réellement
  rédigé. (Seule exception : l'emplacement d'une capture d'écran pas encore
  réalisée, qui décrit précisément la capture attendue.)
- Ne jamais présenter une base de données comme un simple tableau Excel :
  **une base est une collection de pages**, les propriétés donnent du
  contexte, une base peut avoir plusieurs vues sans dupliquer les données.
- Si un comportement actuel de Notion est incertain, le signaler au lieu de
  l'inventer.

## Cas fil rouge : Studio Nova

Petite agence créative qui centralise dans Notion ses projets, tâches,
ressources, notes et infos d'équipe. L'espace se construit au fil des
modules, chaque partie apparaît quand la notion est enseignée :

```
Studio Nova
├── Accueil            (module 2)
├── Projets            (module 4 — base de données)
├── Tâches             (module 6)
├── Ressources         (module 6)
└── Notes & réunions   (module 6)
```

Données à réutiliser **à l'identique** partout :

| Projet          | Statut   | Responsable | Priorité | Échéance    |
|-----------------|----------|-------------|----------|-------------|
| Site Orion      | En cours | Emma        | Haute    | 15 novembre |
| Identité Luna   | À faire  | Lucas       | Moyenne  | 28 novembre |
| Campagne Atlas  | Terminé  | Emma        | Basse    | 5 novembre  |

Personnes : **Emma** (responsable de projet), **Lucas** (membre de l'équipe),
**Sarah** (cliente), **Hugo** (collaborateur hors projet).

Page « Accueil — Studio Nova » : titre « Studio Nova », texte « Bienvenue dans
l'espace de travail de Studio Nova. », section « Cette semaine » (Finaliser
la maquette du site Orion · Préparer la réunion client · Mettre à jour les
ressources), section « Liens utiles » (Projets · Ressources).

Studio Nova rend les notions concrètes, mais toutes les phrases ne deviennent
pas une histoire.

## Stack technique

- **HTML5 / CSS3 / JavaScript vanilla (ES6+)**, sans framework, sans backend.
- **Zéro CDN** : polices auto-hébergées dans `fonts/`, aucune dépendance
  externe. Le site fonctionne hors connexion.
- **Multi-pages statiques**, navigation par liens `<a>`.
- **Persistance locale** : progression en `localStorage` (clés préfixées
  `notion-formation:`).
- Aucune build step : un serveur statique (Live Server / WebStorm) suffit.

## Structure du projet

```
esig-C731-notion-autoformation-ll-mj/
├── index.html                 Accueil (présentation, programme, Studio Nova, méthode)
├── mon-parcours.html          Page « Les modules » : sommaire des 9 modules + progression
├── lecons/
│   ├── m01-l01-a-quoi-sert-notion.html
│   ├── m01-l02-se-reperer-dans-l-interface.html
│   ├── m01-l03-entrer-dans-studio-nova.html
│   └── m02-l03-comprendre-les-blocs.html   Leçon gabarit (modèle de toutes les leçons)
├── css/
│   ├── variables.css          Tokens DESIGN.md §2-3 + @font-face
│   ├── base.css               Reset, typographie, boutons, utilitaires
│   ├── layout.css             En-tête, layout de leçon, sommaire latéral, panneau
│   ├── components.css         Composants pédagogiques et simulations
│   └── responsive.css         Breakpoints DESIGN.md §8
├── js/
│   ├── course-data.js         Source unique : modules, leçons, fichiers, durées
│   ├── progress.js            API localStorage (leçons terminées)
│   ├── nav.js                 Menu mobile de l'en-tête
│   ├── course-toc.js          Sommaire latéral généré depuis course-data.js
│   ├── lesson.js              Étapes de leçon, bouton « terminée », précédent/suivant
│   ├── quiz.js                Quiz à correction immédiate
│   ├── notion-sim.js          Fausses pages Notion et simulation de base
│   └── parcours.js            Page Mon parcours (accordéon, progression)
├── images/
│   ├── captures/              Captures d'écran Notion (m<module>-<sujet>.png), faites par l'utilisatrice
│   └── illustrations/         Schémas SVG aux couleurs du site (m<module>-<sujet>.svg)
├── fonts/
├── styleguide.html            Référence visuelle (v2, à mettre à jour)
└── DESIGN.md
```

## Les 9 modules et leurs leçons

L'ordre et les identifiants vivent dans `js/course-data.js` (source unique).
Une leçon sans fichier apparaît dans le sommaire comme « bientôt ».

1. **Découvrir Notion** — À quoi sert Notion · Se repérer dans l'interface · Entrer dans Studio Nova
2. **Pages et blocs** — Qu'est-ce qu'une page · Créer et nommer une page · Comprendre les blocs · La commande « / » · Titres et listes · Bascules, encadrés, liens et médias · Déplacer, dupliquer, supprimer, transformer · Créer une sous-page (+ exercice récapitulatif et quiz du module)
3. **Organiser et naviguer** — L'arborescence · Les liens entre pages · Barre latérale et favoris · La recherche
4. **Bases de données** — Pourquoi une base · Une entrée est une page · Les propriétés · Créer la base Projets · Modifier les propriétés
5. **Vues, filtres et tris** — Une base, plusieurs vues · Table, liste et board · Calendrier, galerie, timeline · Filtrer, trier, regrouper
6. **Construire un espace pro** — Les 5 parties de Studio Nova · Nommer clairement · Une page d'accueil simple · Ranger régulièrement
7. **Partager et collaborer** — Le bouton Partager · Les niveaux d'accès · Commentaires et mentions · Avant de partager
8. **Cas pratique Studio Nova** — Le brief · Construire l'espace · Vérifier le résultat
9. **Quiz final et conclusion** — Quiz final · Récapitulatif · Et maintenant ?

## Anatomie d'une leçon

Fichier `lecons/mXX-lYY-slug.html`, copié depuis la leçon gabarit. Le
`<body>` porte `data-lesson="mX-lY"` ; le sommaire, la progression et les
boutons précédent/suivant se génèrent depuis `course-data.js`.

En tête : ligne du module (module · durée) avec « Étape x sur 4 » à droite,
puis H1 séparé du contenu par une barre. Puis 3 étapes, chacune dans une
`<section data-step="Comprendre|Faire|Vérifier">` :

1. **Comprendre** — introduction (2-4 phrases), explication, **image explicative** (schéma SVG ou capture annotée), définition, erreur fréquente (bandeau Attention).
2. **Faire** — tutoriel pas à pas avec captures, astuce (bandeau Astuce), mini-exercice + résultat attendu.
3. **Vérifier** — objectif de la leçon (« Tu sais maintenant… »), mini-quiz (1-3 questions, correction expliquée), bouton « Marquer comme terminée ».

## Règles impératives

1. **HTML sémantique** : `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`,
   un seul `<h1>` par page, titres hiérarchisés.
2. **Mobile-first**, breakpoints de `DESIGN.md` §8.
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
   (les 4 étapes s'affichent à la suite).
8. **JS vanilla modulaire** : un fichier = une responsabilité, pas
   d'`onclick=""` inline, pas de `<form action>`.
9. **Icônes** : SVG inline au trait, `aria-hidden="true"`. Plus d'emojis.
10. **Captures d'écran** : `images/captures/`, `alt` décrivant le contenu
    réel. Tant qu'une capture manque, utiliser l'emplacement
    `.screenshot__placeholder` qui décrit la capture attendue.
11. **Simulations** : « inspirées de l'interface de Notion », toujours
    marquées « Simulation », jamais présentées comme l'application réelle.

## Ordre de travail

1. Structure générale ✔ (v4 initiale)
2. Navigation ✔
3. Composants pédagogiques ✔ (démontrés dans la leçon gabarit m2-l3)
4. Module 1 ✔ et module 2 ✔ : rédigés dans les documents « Module 1 — Découvrir
   Notion » et « Module 2 — Pages et blocs », puis intégrés. Captures encore à réaliser.
5. **Décision de l'utilisatrice (oct. 2026)** : les modules 3 à 9 sont rédigés et
   intégrés directement dans le site, sans validation intermédiaire ; elle relit et
   corrige l'ensemble à la fin. Chaque module reste commité séparément.


Après chaque étape : résumer les fichiers modifiés, ce qui fonctionne, ce qui
reste à faire, et les décisions prises. Si un point est ambigu ou change une
décision importante, demander avant d'implémenter.

Le contenu validé est la **source de vérité** : ne jamais le raccourcir pour
faciliter l'intégration, ne jamais supprimer exemples, exercices,
corrections, astuces ou encadrés.

---

## Notes de migration

### v6 — allègement et captures des modules 1-2 (nov. 2026)

Retours de relecture de l'utilisatrice (branche `corrections-modules-1-2`).

- **Leçons en 3 étapes** : Comprendre · Faire · Vérifier. L'étape Voir est
  supprimée (elle répétait Comprendre et Faire) ; ses simulations interactives,
  ainsi que les contenus propres aux modules 8-9, sont placés à la fin de
  Comprendre (le corrigé de m08-l03 est au début de Vérifier). « À retenir » est
  supprimé : Vérifier = objectif + quiz. Les noms d'étapes sont lus sur
  `data-step`. **[confirmé]**
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

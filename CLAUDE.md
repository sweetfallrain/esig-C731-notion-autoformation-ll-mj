# CLAUDE.md — Notion pour l'entreprise (Travail pratique ESIG)

> **v2 — réadapté à la nouvelle maquette (accueil, sept. 2026).** Le projet
> passe d'un LMS à 5 modules progressifs + quiz noté à un **guide de
> référence type hub de ressources** (nav Accueil · Méthode · Ressources ·
> À propos + CTA « Mon parcours »). Voir « Notes de migration » en bas de
> fichier pour le détail de ce qui change et les hypothèses prises en
> l'absence de maquette pour les pages intérieures.

## Contexte du projet

Site web de formation professionnelle **« Notion pour l'entreprise »**, réalisé
dans le cadre d'un travail pratique ESIG (filière Informaticienne de gestion).
Le site apprend à un collaborateur à structurer l'information dans Notion, à
travers le cas pratique fictif de **Studio Nova**, une PME de 30 collaborateurs
qui veut centraliser ses informations dispersées (mails, Excel, Drive, Teams,
papier) dans un espace Notion unique.

Le site est désormais un **guide de référence consultable librement** (plutôt
qu'un parcours linéaire obligatoire) : accueil qui donne un aperçu de
l'ensemble du contenu, page Méthode (comment Notion est construit), page
Ressources (modèles, tutoriels, vidéos, documents, articles), page À propos
(le projet, Studio Nova, l'équipe), et un espace personnel « Mon parcours »
qui remplace l'ancien tableau de progression des 5 modules.

## Stack technique

* **HTML5 / CSS3 / JavaScript vanilla (ES6+)** — pas de framework front-end.
* **Zéro CDN** : polices auto-hébergées, aucune dépendance externe chargée à
l'exécution (cohérent avec `DESIGN.md`).
* **Responsive mobile-first**, un seul design system partagé entre toutes les pages.
* **Persistance locale** : progression de lecture et modèles/ressources
« marqués » dans « Mon parcours » stockés en `localStorage` (pas de backend
pour ce livrable).
* **Multi-pages statiques** (pas de SPA/routeur) : navigation classique par liens `<a>`.
* Aucune build step obligatoire (livrable ouvrable en local ou déployable tel quel) ;
un simple serveur statique (ex. Live Server) suffit pour le développement.

> Le style visuel complet (couleurs, typographies, composants, responsive) est
> défini dans **`@DESIGN.md`** — à lire intégralement avant tout travail CSS.
> `DESIGN.md` > maquette PNG > intuition de Claude en cas de conflit.

## Structure du projet

```
notion-pour-lentreprise/
├── index.html                       (Accueil — aperçu de tout le guide)
├── methode.html                     (Comment Notion est construit)
├── ressources.html                  (Modèles, tutoriels, vidéos, documents, articles)
├── a-propos.html                    (Le projet, Studio Nova, l'équipe)
├── mon-parcours.html                (Espace personnel — lecture, modèles marqués)
├── css/
│   ├── variables.css                (design tokens issus de DESIGN.md)
│   ├── base.css                     (reset, typographie, layout, bandes de section)
│   ├── components.css               (nav, cards, boutons, kanban, bandeau inversé…)
│   └── responsive.css
├── js/
│   ├── nav.js                       (menu mobile, lien actif)
│   ├── parcours.js                  (lecture/écriture localStorage : sections lues, modèles marqués)
│   └── accordion.js                 (si FAQ conservée sur a-propos.html ou ressources.html)
├── fonts/
│   ├── PlayfairDisplay-Regular.woff2
│   ├── PlayfairDisplay-Italic.woff2
│   └── Inter-variable.woff2
├── images/
│   ├── mockups/                     (illustration hero + mockup kanban, en SVG/PNG statiques)
│   └── articles/                    (visuels 4:3 des cards "aller plus loin")
└── DESIGN.md
```

## Règles impératives (à respecter dans chaque prompt)

1. **HTML sémantique** : `<nav>`, `<main>`, `<section>`, `<article>`, titres
hiérarchisés (un seul `<h1>` par page). Pas de `<div>` à la place d'un
élément sémantique existant.
2. **Mobile-first** : écrire le CSS de base pour mobile, puis étendre avec
`min-width` selon les breakpoints de `DESIGN.md` (768px, 1024px).
3. **Design system unique** : toutes les couleurs, tailles, radius viennent
des variables CSS définies dans `css/variables.css` (copie exacte de la
section 2 de `DESIGN.md`). Aucune couleur ou taille codée en dur ailleurs.
4. **Typographie** : `--font-display` (Playfair Display) uniquement pour
titres, citations et nombres/numéros de card mis en avant ; `--font-body`
(Inter) partout ailleurs. Polices chargées en local via `@font-face`, jamais
via Google Fonts CDN.
5. **Grilles pour les ensembles comparables** (concepts, modèles,
ressources, articles) : toujours une grille de cards (cf. `DESIGN.md`
section 5/7 — règle inversée par rapport à la v1). Les listes à séparateurs
`--color-border` ne servent plus qu'au contenu *interne* d'une card
(éléments clés, sous-liste tutoriels/vidéos/documents).
6. **Langue** : toute l'interface est en **français**.
7. **Navigation** : barre fixe en haut, identique sur toutes les pages
(`Accueil · Méthode · Ressources · À propos`), avec le lien de la page
courante en `--color-accent`, et le CTA `Mon parcours` à droite (bouton
primaire compact). Plus de barre de progression globale dans le nav (cf.
Notes de migration).
8. **Mon parcours** : chaque section de guide lue (scroll ou clic « lu »,
selon implémentation retenue) et chaque modèle marqué depuis
`ressources.html` sont sauvegardés en `localStorage` ; `mon-parcours.html`
les affiche.
9. **Accessibilité** : contraste suffisant (texte sur `--color-bg`/`--color-surface`
déjà validé par la palette), focus clavier toujours visible via `box-shadow`
(jamais `outline: none` seul), navigation utilisable au clavier, `alt` sur
toutes les images, landmarks ARIA sur le menu mobile.
10. **Pas de `<form action>`** : les interactions (marquer un modèle, cocher
« mon parcours », accordéon FAQ) sont gérées en JavaScript, sans rechargement
de page.
11. **Emojis comme pictogrammes** de section (🏠 📚 🚀 📅 ❓ 🛠️ 📝 ✅) —
pas de librairie d'icônes externe.
12. **JS vanilla modulaire** : un fichier = une responsabilité (`nav.js`,
`parcours.js`, `accordion.js`), pas de logique métier mélangée dans le HTML
(pas d'`onclick=""` inline).

---

## Structure de contenu (résumé)

* **Accueil** (`index.html`) — aperçu du guide en une seule page longue :
  * Hero 2 colonnes : eyebrow « ACCUEIL · Guide débutant », H1
    « Apprendre à utiliser Notion, étape par étape. », sous-titre, mockup
    produit à droite (aperçu d'un espace Notion factice « Studio Nova »).
  * **Les bases de Notion** : eyebrow « LES BASES DE NOTION », H2
    « Quatre notions essentielles pour démarrer. », note à droite, grille de
    4 concept cards foncées numérotées (01 C'est quoi Notion ? / 02 Les
    pages / 03 Les bases de données / 04 Les vues).
  * **Méthode (aperçu)** : eyebrow « MÉTHODE », H2 « Comprendre comment
    Notion est construit. », paragraphe + card « Les éléments clés » (3
    points numérotés + encart validé) ; puis mini-Kanban « Tâches — vue
    Kanban » à gauche / H2 « Une base de données = un tableau structuré. » à
    droite.
  * **Bandeau plein écran inversé** : H2 « Les bons réflexes à adopter dès
    le départ. », 3 colonnes texte (Rester simple / Nommer clairement /
    Ranger régulièrement).
  * **Modèles prêts à l'emploi** : eyebrow « MODÈLES PRÊTS À L'EMPLOI », H2
    « Démarrez avec un modèle existant. », grille de 3 cards modèle avec
    badge (Populaire / Essentiel / Nouveau) — **sans icône** au-dessus du
    titre — + bouton « Voir tous les templates → » vers `ressources.html`.
  * **Ressources** : eyebrow « RESSOURCES », H2 « Apprendre au format qui
    vous convient. », grille de 3 cards ressource foncées (Tutoriels /
    Vidéos / Documents) avec liste interne.
  * **Aller plus loin** : eyebrow « ALLER PLUS LOIN », H2 « Continuez votre
    apprentissage. », lien « Voir toute la bibliothèque → » vers
    `ressources.html`, grille de 3 cards article (image 4:3 + catégorie +
    titre + durée de lecture).
  * **Fin du guide** : H2 « Vous savez utiliser les bases de Notion. »,
    paragraphe, card « Et maintenant ? » avec bouton « Télécharger le
    lexique → ».

* **Méthode** (`methode.html`) — développe en profondeur ce que l'accueil ne
  fait qu'introduire : les 4 notions essentielles (une section par notion,
  avec exemples Studio Nova), le détail de la construction d'une base de
  données (propriétés, vues), et le cas pratique fil rouge (arborescence
  cible Studio Nova : Accueil, Projets, Équipe, Ressources, reprend le
  contenu ex-« cas pratique » de la v1).

* **Ressources** (`ressources.html`) — bibliothèque complète : grille des 6
  modèles à dupliquer (au lieu des 3 mis en avant sur l'accueil), les 3
  blocs ressources (tutoriels / vidéos / documents) au complet, et la
  bibliothèque d'articles « aller plus loin » (au lieu des 3 mis en avant).
  Chaque modèle peut être « marqué » pour `mon-parcours.html`.

* **À propos** (`a-propos.html`) — présentation du projet et de Studio Nova
  (repris de l'ex-page « Avant de commencer » de la v1 : objectifs, public,
  prérequis, périmètre), + éventuellement la FAQ helpdesk (accordéon,
  reprise de la v1) si l'on ne crée pas de page dédiée.

* **Mon parcours** (`mon-parcours.html`) — remplace l'ancien
  `construisez-votre-espace.html` + `test-final.html` : liste des sections
  du guide déjà lues (progression en %), liste des modèles marqués depuis
  `ressources.html`, bouton pour reprendre la lecture là où elle s'est
  arrêtée. **Pas de quiz noté** dans cette version (supprimé, cf. Notes de
  migration).

---

## Prompts par étape

---

### P1 — Design system (variables, polices, reset)

```
Crée @css/variables.css, @css/base.css et @css/responsive.css :

- Recopie exactement les design tokens de la section 2 et 3 de @DESIGN.md
  dans :root (couleurs — y compris --color-bg-soft, --font-display, --font-body).
- @font-face pour Playfair Display (regular + italic) et Inter (variable),
  chargées depuis @fonts/, font-display: swap.
- Reset CSS minimal (box-sizing, marges par défaut, line-height).
- Classes utilitaires de layout : .container (max-width 1120px, padding
  latéral responsive 24px/40px/64px selon @DESIGN.md section 8), .eyebrow,
  .btn-primary, .btn-primary--inverse, .section (padding 80px/48px, fond
  hérité de la classe .bg / .bg-soft posée sur la section).
- Media queries de base aux breakpoints 768px et 1024px (mobile-first).

Respecte @DESIGN.md strictement (aucune couleur/taille hors spec).

Critère de succès : un fichier HTML de test avec un titre en --font-display
et un bouton .btn-primary affiche exactement les styles de DESIGN.md,
aux trois largeurs d'écran (mobile/tablette/desktop), et deux sections
consécutives .bg / .bg-soft montrent bien l'alternance de fond.
```

---

### P2 — Navigation globale

```
Crée @js/nav.js et le composant de navigation (à inclure en haut de chaque
page HTML, section "Nav globale + CTA" de @DESIGN.md) :

- Nav fixe, logo carré (--color-accent) + « Notion pour l'entreprise »
  (Playfair Display), 4 liens (Accueil, Méthode, Ressources, À propos).
- Lien de la page courante détecté automatiquement (comparaison
  window.location.pathname) et mis en --color-accent, aria-current="page".
- CTA « Mon parcours → » à droite (bouton primaire compact) → mon-parcours.html.
- Menu hamburger < 768px : overlay plein écran --color-surface, liens
  verticaux + CTA en bas, fermeture par ✕, piégeage du focus au clavier.

Respecte @DESIGN.md (section "Nav globale + CTA") et les règles
d'accessibilité de @CLAUDE.md.

Critère de succès : le même composant de nav, copié sur 2 pages différentes,
met en évidence le bon lien actif sur chacune ; le menu mobile s'ouvre/se
ferme au clic et au clavier (Échap).
```

---

### P3 — Page Accueil (index.html)

```
Crée @index.html, page longue en sections alternant --color-bg / --color-bg-soft
(cf. @DESIGN.md section 5) :

1. Hero (2 colonnes ≥ 1024px) : eyebrow « ACCUEIL · GUIDE DÉBUTANT », H1
   « Apprendre à utiliser Notion, étape par étape. », sous-titre, mockup
   produit à droite (composant "Hero — aperçu produit" de @DESIGN.md).
2. Les bases de Notion : eyebrow, H2, note à droite, grille de 4 concept
   cards numérotées (composant "Card concept" de @DESIGN.md).
3. Méthode (aperçu) : eyebrow « MÉTHODE », H2, card "Les éléments clés" +
   mini-Kanban (composant "Mini-Kanban" de @DESIGN.md) à côté du texte
   "Une base de données = un tableau structuré".
4. Bandeau plein écran inversé "Les bons réflexes à adopter dès le départ"
   (composant dédié de @DESIGN.md, bord à bord, pas de border-radius).
5. Modèles prêts à l'emploi : grille de 3 "Card modèle" avec badges +
   bouton outline "Voir tous les templates →" vers ressources.html.
6. Ressources : grille de 3 "Card ressource" (Tutoriels / Vidéos / Documents).
7. Aller plus loin : grille de 3 "Card article" + lien "Voir toute la
   bibliothèque →" vers ressources.html.
8. Fin du guide : H2 + card "Et maintenant ?" avec bouton "Télécharger le
   lexique →".

Respecte @DESIGN.md (typographie, cartes, grilles, bandeau inversé) et le
mobile-first (grilles empilées < breakpoints définis section 8).

Critère de succès : page fonctionnelle à 375px, 768px et 1440px de large,
les sections alternent bien de fond, le bandeau "bons réflexes" va bord à
bord sans marge résiduelle à aucune largeur.
```

---

### P4 — Page À propos

```
Crée @a-propos.html :

- Nav globale.
- Eyebrow « À PROPOS », H1 « Poser les bases, ensemble. », paragraphe de
  contexte Studio Nova.
- Grille de 4 cards courtes (Objectifs / Public / Prérequis / Périmètre),
  1 colonne < 768px.
- Bloc Avant/Après (composant conservé de la v1, cf. @DESIGN.md — Avant en
  card claire, Après en card inversée, flèche de transition ≥ 1024px) :
  « L'information se disperse » → « Un espace Notion centralisé ».
- (Optionnel selon arbitrage) FAQ en accordéon reprise de l'ex-helpdesk v1,
  si aucune page dédiée n'est créée pour elle.

Respecte @DESIGN.md.

Critère de succès : le bloc Avant/Après s'affiche côte à côte ≥ 1024px et
empilé < 1024px, sans jamais casser la mise en page à 375px.
```

---

### P5 — Page Méthode

```
Crée @methode.html :

- Nav globale.
- Eyebrow « MÉTHODE », H1 « Comprendre comment Notion est construit. »,
  sous-titre.
- Reprend et développe la grille de 4 concept cards de l'accueil, mais avec
  une section détaillée par notion (H2 + paragraphe + éventuel visuel) :
  01 C'est quoi Notion, 02 Les pages, 03 Les bases de données, 04 Les vues.
- Section "Une base de données = un tableau structuré" développée : mini-
  Kanban (composant de @DESIGN.md) + explication des propriétés et des vues
  (tableau, calendrier, liste).
- Cas pratique fil rouge Studio Nova (repris de la v1) : blockquote « Une
  bonne architecture se comprend avant même qu'on l'explique. », arborescence
  cible en grille de cards (pas de sidebar à séparateurs, cf. règle grille
  généralisée de @DESIGN.md v2).

Respecte @DESIGN.md.

Critère de succès : chaque notion a sa propre ancre (id), navigable depuis
un sommaire en tête de page ; layout correct à 375/768/1440px.
```

---

### P6 — Page Ressources

```
Crée @ressources.html et @js/parcours.js (partie "marquer un modèle") :

- Nav globale.
- Eyebrow « RESSOURCES », H1 « Tout ce qu'il faut pour démarrer. »,
  sous-titre.
- Grille complète des 6 modèles à dupliquer (composant "Card modèle" de
  @DESIGN.md — badge, titre, description, lien, sans icône décorative —
  badges alternés, jamais deux identiques consécutifs) ; chaque card a un
  bouton "Marquer" (icône) qui l'ajoute à mon-parcours.html via localStorage.
- Les 3 blocs ressources au complet (Tutoriels / Vidéos / Documents),
  composant "Card ressource" de @DESIGN.md, avec toutes les entrées (pas
  seulement les 3 de l'accueil).
- Bibliothèque complète d'articles "aller plus loin" (composant "Card
  article"), grille extensible (6+ articles).

Respecte @DESIGN.md.

Critère de succès : les 6 modèles s'affichent avec badges/avatars alternés,
marquer un modèle le fait apparaître dans mon-parcours.html après
rechargement (localStorage) ; grilles responsives sans casse à 375px.
```

---

### P7 — Page Mon parcours + progression de lecture

```
Crée @mon-parcours.html et @js/parcours.js (API complète) :

parcours.js :
- API simple, tout en localStorage (clé préfixée, ex.
  "notion-guide:section-lue:les-bases", "notion-guide:modele-marque:wiki") :
    markSectionRead(id), isSectionRead(id), getReadingProgress()
      (proportion de sections de guide marquées lues sur le total)
    markTemplate(id), unmarkTemplate(id), getMarkedTemplates()
- Utilisé par index.html/methode.html (bouton ou scroll-observer marquant
  une section comme lue) et ressources.html (P6).

mon-parcours.html :
- Nav globale.
- Eyebrow « MON PARCOURS », H1 « Votre progression, en un coup d'œil. »
- Card "Progression avec label" (composant conservé de la v1, cf.
  @DESIGN.md) : "Progression" / "x / total" + piste/remplissage.
- Grille des modèles marqués (réutilise "Card modèle"), état vide géré
  ("Vous n'avez encore marqué aucun modèle — direction Ressources →").
- Bouton "Reprendre la lecture →" qui renvoie vers la première section non
  lue (index.html ou methode.html selon la donnée).

Respecte @DESIGN.md (composants progression + card modèle).

Critère de succès : marquer/démarquer un modèle depuis ressources.html met
à jour instantanément la grille de mon-parcours.html au rechargement ; la
barre de progression reflète le nombre réel de sections lues.
```

---

### P8 — Responsive final & accessibilité

```
Sur l'ensemble des pages créées (@index.html, @methode.html,
@ressources.html, @a-propos.html, @mon-parcours.html), vérifie et
corrige si besoin :

- Les 3 breakpoints de @DESIGN.md section 8 (< 768px, 768–1023px, ≥ 1024px)
  sur CHAQUE page, y compris le bandeau inversé et les grilles de cards.
- Focus clavier visible partout (box-shadow --color-accent), jamais
  d'outline supprimé sans remplacement.
- Contraste texte suffisant sur --color-surface-inverse (texte toujours en
  --color-text-inverse ou sa variante rgba, jamais --color-text par erreur).
- alt descriptif sur toutes les <img> (mockups, illustrations d'articles),
  aria-current="page" sur le lien de nav actif, aria-expanded si un
  accordéon est conservé.
- Aucune console error/warning au chargement de chaque page.

Respecte @DESIGN.md et les règles d'accessibilité de @CLAUDE.md.

Critère de succès : les 5 pages passent sans erreur visuelle aux 3
breakpoints, navigation clavier complète possible du hero à mon-parcours.html.
```

---

## Ordre d'exécution recommandé

```
P1 (design system) → P2 (nav) → P3 (Accueil) → P4 (À propos)
→ P5 (Méthode) → P6 (Ressources) → P7 (Mon parcours)
→ P8 (Responsive & accessibilité)
```

---

## Notes de migration (v1 → v2)

Changements dictés par la nouvelle maquette (accueil uniquement — les autres
pages n'ont pas de maquette fournie, les points ci-dessous marqués **[hypothèse]**
sont des propositions à valider, pas des faits déduits de la maquette) :

- **Nav** : `Accueil · Formation · Cas pratique · Outils · Bonnes pratiques ·
  Helpdesk` (6 liens) → `Accueil · Méthode · Ressources · À propos` (4 liens)
  + CTA « Mon parcours ». **[confirmé par la maquette]**
- **Fin du parcours de formation en 5 modules cloisonnés**, remplacé par un
  guide en une page consultable librement + des pages d'approfondissement
  (Méthode, Ressources). **[confirmé par la maquette pour l'accueil ;
  hypothèse pour le découpage exact de methode.html/ressources.html]**
- **Barre de progression globale dans le nav** : supprimée (elle n'apparaît
  plus dans la maquette). La progression vit désormais uniquement sur
  `mon-parcours.html`. **[confirmé]**
- **Quiz noté (`test-final.html`, 15 questions, score conseillé 80 %)** :
  absent de la nouvelle maquette, remplacé par un lead magnet « Télécharger
  le lexique ». **[hypothèse]** : le quiz est supprimé plutôt que déplacé —
  à confirmer avec l'utilisatrice si elle souhaite le garder ailleurs
  (ex. dans `mon-parcours.html`).
- **Checklist de projet final (7 items, `construisez-votre-espace.html`)** :
  n'apparaît plus dans la maquette. **[hypothèse]** : fusionnée dans le
  concept de « Mon parcours » (marquer sections lues / modèles utilisés)
  plutôt que reprise telle quelle — à confirmer.
- **Ligne "Dupliquer" (liste à séparateurs)** → grille de "Card modèle" avec
  badges. **[confirmé par la maquette]**
- **Icône/emoji sur la card modèle** : présente dans une première itération
  de la maquette, retirée par l'utilisatrice dans la version courante — la
  card modèle n'affiche plus que badge + titre + description + lien.
  **[confirmé par la maquette]**
- **Sidebar liste (cas pratique)** → grille de cards. **[hypothèse]** : la
  maquette ne montre pas cette page ; on applique la règle générale « grille
  pour les ensembles comparables » de DESIGN.md v2 par cohérence, mais une
  liste à séparateurs resterait défendable si l'utilisatrice préfère
  conserver ce composant pour une arborescence hiérarchique.
- **Helpdesk (page dédiée, FAQ + sidebar + CTA inversée)** : pas de trace
  dans la nouvelle maquette. **[hypothèse]** : rapatriée dans `a-propos.html`
  en fin de page plutôt que supprimée, à confirmer — l'accordéon FAQ reste
  un composant valide du design system (section 4 de `DESIGN.md`) même s'il
  n'a pas de page dédiée dans la nouvelle IA.

Tout ce qui est marqué **[hypothèse]** ci-dessus est une proposition
raisonnable pour combler l'absence de maquette sur les pages intérieures —
à valider avant de lancer les prompts P4 à P7.

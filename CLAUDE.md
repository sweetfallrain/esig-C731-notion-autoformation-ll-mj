# CLAUDE.md — Notion pour l'entreprise (Travail pratique ESIG)

> **v3 — contenu généralisé, structure inspirée d'un tutoriel vidéo (sept.
> 2026).** Le contenu abandonne le prisme "Studio Nova" (PME fictive) pour
> s'adresser à un public général qui découvre Notion. La page `methode.html`
> devient une page longue qui déroule 5 parties dans l'ordre : Pourquoi
> Notion → Les bases → Types de blocs → Collaboration & partage → Modèles/
> bases de données. `index.html` redevient un teaser court (visuel, peu
> textuel) qui renvoie vers `methode.html`. Voir « Notes de migration » en
> bas de fichier pour l'historique complet (v1 → v2 → v3).
>
> *(v2 — réadapté à la nouvelle maquette (accueil, sept. 2026) : passage d'un
> LMS à 5 modules progressifs + quiz noté à un guide de référence type hub de
> ressources (nav Accueil · Méthode · Ressources · À propos + CTA « Mon
> parcours »). Toujours d'actualité pour l'architecture générale des pages —
> seul le contenu change en v3.)*

## Contexte du projet

Site web **« Notion pour l'entreprise »**, réalisé dans le cadre d'un travail
pratique ESIG (filière Informaticienne de gestion). Le site apprend à
**n'importe qui** — pas seulement un profil "entreprise" — à comprendre et à
utiliser Notion : pourquoi l'utiliser, comment il est construit (pages,
blocs, bases de données), comment collaborer et partager, et comment aller
plus loin avec des modèles. Le ton s'adresse directement au lecteur ("vous"),
sans mise en scène d'une entreprise fictive.

> **v3 — abandon du cas pratique "Studio Nova"** : la v1/v2 s'appuyait sur une
> PME fictive de 30 collaborateurs comme fil rouge. Ce cadrage est supprimé :
> le contenu est désormais 100 % généraliste (aucune référence à une
> entreprise en particulier), conformément au retour de l'utilisatrice
> ("je voulais quelque chose qui s'adresse à tout le monde"). Le nom du site
> et le sujet ("Notion pour l'entreprise" / usage professionnel de Notion)
> restent inchangés — seul l'habillage narratif disparaît.

Le site est un **guide de référence consultable librement** (plutôt qu'un
parcours linéaire obligatoire) : accueil = teaser court et visuel, page
Méthode = le cœur pédagogique (déroulé complet, structuré comme un tutoriel),
page Ressources (modèles, tutoriels, vidéos, documents, articles), page À
propos (le projet, ses objectifs, son autrice), et un espace personnel « Mon
parcours » qui remplace l'ancien tableau de progression des 5 modules.

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
├── a-propos.html                    (Le projet : objectifs, public, contexte ESIG)
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
13. **Captures d'écran Notion réelles** (nouveau v3) : à utiliser dans
`methode.html` partie 2 "Les bases" (arborescence de pages) et partie 3
"Types de blocs" (un ou deux exemples de blocs en situation), en
remplacement des placeholders/mockups génériques quand une capture est
disponible. Règles :
  - Stockées dans `images/captures/`, nommées par sujet
    (`arborescence-pages.png`, `bloc-liste-taches.png`…).
  - `border-radius: 12px` + `box-shadow` légère (cf. niveau 1 de
    `DESIGN.md` section 6) pour rester cohérentes avec le reste du design
    system — jamais une capture brute sans cadre.
  - `alt` toujours descriptif du contenu réel de la capture (pas juste
    "capture d'écran Notion") — cf. règle d'accessibilité section 9.
  - Peuvent recevoir une légende courte en dessous (`<figcaption>`, Inter
    0.8rem color-text-muted) si le contexte n'est pas évident sans elle.
  - Ne remplacent pas le mockup générique du hero (P3), pensé comme un
    visuel de marque, pas une capture pédagogique.

---

## Structure de contenu (résumé) — v3

* **Accueil** (`index.html`) — **teaser court et visuel**, pas de
  développement (le contenu dense vit sur `methode.html`) :
  * Hero 2 colonnes : eyebrow « ACCUEIL · Guide débutant », H1
    « Apprendre à utiliser Notion, étape par étape. », sous-titre, mockup
    produit générique à droite (aperçu neutre d'un espace Notion — pas de
    nom d'entreprise, libellés génériques type « Mon espace », « Projets »,
    « Notes »).
  * **Pourquoi Notion ?** (aperçu) : eyebrow « POURQUOI NOTION », H2 courte,
    grille de 3-4 cards concept parmi les 6 raisons développées sur
    `methode.html` (cf. ci-dessous), + lien « Voir toutes les raisons → »
    vers `methode.html#pourquoi-notion`.
  * **Bandeau plein écran inversé** (conservé de la v2) : H2 « Les bons
    réflexes à adopter dès le départ. », 3 colonnes texte (Rester simple /
    Nommer clairement / Ranger régulièrement).
  * **Modèles prêts à l'emploi** : grille de 3 cards modèle avec badge
    (Populaire / Essentiel / Nouveau, sans icône) + bouton « Voir tous les
    templates → » vers `ressources.html`.
  * **Aller plus loin** : grille de 3 cards article + lien « Voir toute la
    bibliothèque → » vers `ressources.html`.
  * **Fin** : card « Et maintenant ? » avec bouton « Découvrir la méthode
    complète → » vers `methode.html` (remplace le lien vers un lexique à
    télécharger, qui n'a plus de raison d'être en position de clôture
    puisque la méthode elle-même n'a pas encore été lue à ce stade).

* **Méthode** (`methode.html`) — **le cœur du site**, structurée comme un
  tutoriel en 5 parties, dans cet ordre, chacune avec sa propre ancre :

  1. **Pourquoi utiliser Notion** (`#pourquoi-notion`) — eyebrow « POURQUOI
     NOTION », H1/H2 d'ouverture. Grille de 6 concept cards (composant
     "Card concept" de `DESIGN.md`, numérotées 01-06) : Centraliser les
     informations · Planifier un projet · Prendre des notes · Planifier ses
     finances · Partager un calendrier · Travailler à plusieurs
     (collaboration). Chaque card : titre court + 1 phrase, pas de pavé de
     texte. Peut ouvrir sur le bloc Avant/Après existant (« L'information se
     disperse » → « Un espace centralisé »), toujours générique.
  2. **Les bases** (`#les-bases`) — explique le fonctionnement structurel
     avant les détails : une page peut contenir plusieurs sous-pages (pas de
     limite de profondeur), Notion n'a pas de concept de dossier — tout est
     une page, et le contenu d'une page est un empilement de blocs. Prévoir
     un visuel schématique (arborescence de pages en cascade, ou captures
     d'écran annotées si disponibles) + card "Les éléments clés" (composant
     `DESIGN.md`) résumant ces 3 règles.
  3. **Les types de blocs** (`#types-de-blocs`) — la section la plus dense,
     organisée en 3 groupes, chacun en "Card ressource" (composant
     `DESIGN.md`, réutilisé tel quel — icône + titre + liste interne) :
     * *Blocs classiques* : texte, page, titre (utile pour une table des
       matières), liste (à puces / numérotée / menu déroulant / tâche),
       citation ou encadré.
     * *Blocs médias* : image, vidéo, lien (avec ou sans mise en page/aperçu).
     * *Blocs d'intégration* : connecteurs vers d'autres outils (Google
       Maps, Figma, etc.).
  4. **Collaboration & partage** (`#collaboration`) — travailler à plusieurs
     dans le même espace, gérer le partage d'une page, et **publier une
     page en site web** pour la rendre accessible sans compte Notion.
     Peut reprendre le format bandeau inversé ou une grille de 2-3 cards
     concept.
  5. **Modèles & bases de données** (`#modeles-bases-de-donnees`) — transition
     naturelle vers la pratique : rappel du concept de base de données/vues
     (mini-Kanban + texte déjà rédigés en v2, conservés), puis teaser de 3
     cards modèle (composant "Card modèle") + lien « Voir tous les
     templates → » vers `ressources.html`.

  Un sommaire (liste de 5 liens ancrés) en tête de page permet de sauter
  directement à une partie.

* **Ressources** (`ressources.html`) — inchangé sur le fond (v2) : grille
  complète des 6 modèles à dupliquer, les 3 blocs ressources (tutoriels /
  vidéos / documents) au complet, bibliothèque d'articles « aller plus
  loin ». Chaque modèle peut être « marqué » pour `mon-parcours.html`.

* **À propos** (`a-propos.html`) — présentation du **projet** (objectif du
  guide, à qui il s'adresse — "toute personne qui découvre Notion", pas un
  profil entreprise en particulier — contexte du travail de diplôme ESIG),
  **sans** présentation de Studio Nova. Le bloc Avant/Après (déjà générique
  dans son contenu — mails introuvables / Excel isolés / dossiers sans
  logique → source de vérité unique) peut être conservé ici en clôture, ou
  déplacé dans `methode.html` partie 1 (cf. ci-dessus) — à choisir selon ce
  qui rend chaque page la plus légère. + éventuellement la FAQ (accordéon,
  déjà générique, aucune référence Studio Nova à retirer).

* **Mon parcours** (`mon-parcours.html`) — inchangé (v2) : liste des
  sections de `methode.html` déjà lues (progression en %, une entrée par
  ancre des 5 parties), liste des modèles marqués depuis `ressources.html`,
  bouton pour reprendre la lecture là où elle s'est arrêtée. Toujours pas de
  quiz noté.

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
Crée @index.html — page COURTE et visuelle (le contenu dense vit sur
methode.html, ne pas le dupliquer ici), sections alternant --color-bg /
--color-bg-soft (cf. @DESIGN.md section 5) :

1. Hero (2 colonnes ≥ 1024px) : eyebrow « ACCUEIL · GUIDE DÉBUTANT », H1
   « Apprendre à utiliser Notion, étape par étape. », sous-titre, mockup
   produit générique à droite (composant "Hero — aperçu produit" de
   @DESIGN.md — aucun nom d'entreprise dans les libellés du mockup, rester
   sur du générique : "Mon espace", "Projets", "Notes"…).
2. Pourquoi Notion (aperçu) : eyebrow « POURQUOI NOTION », H2 courte,
   grille de 3-4 "Card concept" (composant de @DESIGN.md) reprenant les
   raisons les plus parlantes parmi les 6 développées sur methode.html
   (ex. Centraliser les informations / Planifier un projet / Travailler à
   plusieurs), + lien "Voir toutes les raisons →" vers
   methode.html#pourquoi-notion.
3. Bandeau plein écran inversé "Les bons réflexes à adopter dès le départ"
   (composant dédié de @DESIGN.md, bord à bord, pas de border-radius).
4. Modèles prêts à l'emploi : grille de 3 "Card modèle" avec badges (sans
   icône) + bouton outline "Voir tous les templates →" vers ressources.html.
5. Aller plus loin : grille de 3 "Card article" + lien "Voir toute la
   bibliothèque →" vers ressources.html.
6. Fin : H2 + card "Et maintenant ?" avec bouton "Découvrir la méthode
   complète →" vers methode.html (pas de lexique à télécharger ici, la
   méthode n'a pas encore été lue à ce stade du parcours).

Respecte @DESIGN.md (typographie, cartes, grilles, bandeau inversé) et le
mobile-first (grilles empilées < breakpoints définis section 8). Aucune
référence à une entreprise fictive dans le texte ou les visuels.

Critère de succès : page fonctionnelle à 375px, 768px et 1440px de large,
les sections alternent bien de fond, le bandeau "bons réflexes" va bord à
bord sans marge résiduelle à aucune largeur, la page reste courte (pas de
pavé de texte long — c'est le rôle de methode.html).
```

---

### P4 — Page À propos

```
Crée @a-propos.html :

- Nav globale.
- Eyebrow « À PROPOS », H1 « Un guide pour apprendre Notion, sans jargon. »,
  paragraphe de contexte généraliste : à qui s'adresse ce guide (toute
  personne qui découvre Notion, aucun profil "entreprise" présupposé) et
  pourquoi il existe. Le contexte du travail de diplôme ESIG peut être
  mentionné en une phrase, sans devenir le sujet de la page.
- Grille de 4 cards courtes (Objectifs / Public / Prérequis / Périmètre),
  1 colonne < 768px — contenu générique, aucune mention d'entreprise fictive.
- Bloc Avant/Après (composant conservé de la v1/v2, cf. @DESIGN.md — Avant en
  card claire, Après en card inversée, flèche de transition ≥ 1024px) :
  « L'information se disperse » → « Un espace Notion centralisé ». Contenu
  déjà générique — à garder ici en clôture, ou à déplacer dans
  methode.html#pourquoi-notion (P5) selon ce qui allège le mieux chaque page.
- (Optionnel selon arbitrage) FAQ en accordéon reprise de l'ex-helpdesk v1
  (déjà générique, rien à retirer), si aucune page dédiée n'est créée pour elle.

Respecte @DESIGN.md. Aucune référence à Studio Nova ou à toute autre
entreprise fictive.

Critère de succès : le bloc Avant/Après s'affiche côte à côte ≥ 1024px et
empilé < 1024px, sans jamais casser la mise en page à 375px ; aucun texte de
la page ne suppose un contexte "entreprise" particulier.
```

---

### P5 — Page Méthode

```
Crée @methode.html — page longue, structurée comme un tutoriel en 5 parties
numérotées, chacune avec un id d'ancre, précédées d'un sommaire (liste de 5
liens) en tête de page :

- Nav globale.
- Eyebrow « MÉTHODE », H1 « Comprendre comment Notion est construit. »,
  sous-titre, sommaire des 5 parties (liens ancrés).

- **1. Pourquoi utiliser Notion** (`id="pourquoi-notion"`) :
  eyebrow « POURQUOI NOTION », H2. Grille de 6 "Card concept" numérotées
  (composant de @DESIGN.md, 01-06) : Centraliser les informations /
  Planifier un projet / Prendre des notes / Planifier ses finances /
  Partager un calendrier / Travailler à plusieurs (collaboration) — chaque
  card : titre court + 1 phrase, pas de paragraphe. Peut précéder ce bloc
  d'un Avant/Après (composant conservé de @DESIGN.md — repris de
  a-propos.html si l'arbitrage P4 le déplace ici) : « L'information se
  disperse » → « Un espace centralisé ».

- **2. Les bases** (`id="les-bases"`) : eyebrow, H2. Explique dans l'ordre :
  une page peut contenir plusieurs sous-pages (pas de limite de
  profondeur) ; Notion n'a pas de concept de dossier — tout est une page ;
  le contenu d'une page est un empilement de blocs. Prévoir un visuel
  schématique (arborescence de pages en cascade — SVG simple ou image
  annotée) + card "Les éléments clés" (composant de @DESIGN.md) qui résume
  ces 3 règles en liste numérotée.

- **3. Les types de blocs** (`id="types-de-blocs"`) : eyebrow, H2. 3 "Card
  ressource" (composant de @DESIGN.md — icône + titre + liste interne),
  en grille :
    * Blocs classiques : texte, page, titre (utile pour une table des
      matières), liste (puces / numérotée / menu déroulant / tâche),
      citation ou encadré.
    * Blocs médias : image, vidéo, lien (avec ou sans mise en page).
    * Blocs d'intégration : connecteurs vers d'autres outils (Google Maps,
      Figma, etc.).

- **4. Collaboration & partage** (`id="collaboration"`) : eyebrow, H2.
  Travailler à plusieurs dans le même espace, partager une page avec des
  droits différenciés, et publier une page en site web pour la rendre
  accessible sans compte Notion. Bandeau plein écran inversé (composant de
  @DESIGN.md) ou grille de 2-3 "Card concept" selon ce qui reste le plus
  lisible.

- **5. Modèles & bases de données** (`id="modeles-bases-de-donnees"`) :
  eyebrow, H2. Reprend le mini-Kanban (composant de @DESIGN.md) +
  explication des propriétés et des vues (tableau, calendrier, liste) —
  contenu déjà rédigé en v2, conservé tel quel. Termine par un teaser de 3
  "Card modèle" (sans icône, cf. section 4 de @DESIGN.md) + lien "Voir tous
  les templates →" vers ressources.html.

Respecte @DESIGN.md. Aucune référence à Studio Nova ou à toute autre
entreprise fictive — le "vous" s'adresse à n'importe quel lecteur.

Critère de succès : chaque partie a sa propre ancre (id), navigable depuis
le sommaire en tête de page ; layout correct à 375/768/1440px ; la partie 3
(types de blocs) est la plus dense visuellement mais reste scannable (listes
courtes dans chaque card, pas de paragraphes).
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

## Notes de migration (v3 — sept. 2026)

Suite au premier jet de contenu produit à partir de la v2, retour de
l'utilisatrice : contenu jugé "pas très clair", "trop textuel", et surtout
mal cadré ("il se positionne du point de vue de l'entreprise Studio Nova
alors que je voulais quelque chose qui s'adresse à tout le monde"). Elle a
fourni une structure inspirée d'un tutoriel vidéo, en 5 parties (Pourquoi
Notion → Les bases → Types de blocs → Collaboration & partage → Modèles/
bases de données), validée comme suit :

- **Emplacement du contenu** : tout regroupé sur `methode.html`, qui devient
  la page longue en 5 parties. `index.html` redevient un teaser court et
  visuel. **[confirmé par l'utilisatrice]**
- **Cas pratique Studio Nova** : supprimé entièrement — plus aucune
  référence à une entreprise fictive nulle part sur le site, contenu 100 %
  généraliste. **[confirmé par l'utilisatrice, tranche définitivement
  l'hypothèse "sidebar liste (cas pratique)" restée ouverte en v2]**
- **Page À propos** : recentrée sur le projet lui-même (objectifs, public,
  contexte ESIG en une phrase) plutôt que sur la présentation de Studio
  Nova. Le bloc Avant/Après (déjà générique dans son contenu) peut y rester
  ou être déplacé en ouverture de la partie 1 de methode.html — cette
  micro-décision reste un arbitrage libre en l'absence de préférence
  exprimée, sans impact structurel.
- **Fin du guide sur l'accueil** : le bouton "Télécharger le lexique" cède sa
  place à "Découvrir la méthode complète →" — le lexique n'a plus de sens en
  clôture d'accueil puisque la méthode (qui contient tout le contenu dense)
  n'a pas encore été lue à ce stade du parcours. Le lexique téléchargeable
  peut réapparaître en fin de methode.html si souhaité (non spécifié par
  l'utilisatrice — à proposer plus tard si besoin).
- **Densité de texte** : consigne explicite à observer sur toutes les pages,
  pas seulement methode.html — cards courtes (titre + 1 phrase), listes
  plutôt que paragraphes, visuels/schémas quand c'est possible (ex. partie
  "Les bases" — arborescence de pages).

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

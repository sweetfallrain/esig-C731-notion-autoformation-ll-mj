# CLAUDE.md — Notion pour l'entreprise (Travail pratique ESIG)

## Contexte du projet

Site web de formation professionnelle **« Notion pour l'entreprise »**, réalisé
dans le cadre d'un travail pratique ESIG (filière Informaticienne de gestion).
Le site apprend à un collaborateur à structurer l'information dans Notion, à
travers le cas pratique fictif de **Studio Nova**, une PME de 30 collaborateurs
qui veut centraliser ses informations dispersées (mails, Excel, Drive, Teams,
papier) dans un espace Notion unique.

Le site est un parcours de formation en ligne : hero d'accueil, page de
contexte, 5 modules progressifs, une boîte à outils de templates, un cas
pratique fil rouge, une checklist de projet final, un helpdesk et un test
final noté.

## Stack technique

* **HTML5 / CSS3 / JavaScript vanilla (ES6+)** — pas de framework front-end.
* **Zéro CDN** : polices auto-hébergées, aucune dépendance externe chargée à
l'exécution (cohérent avec `DESIGN.md`).
* **Responsive mobile-first**, un seul design system partagé entre toutes les pages.
* **Persistance locale** : progression des modules et checklist du projet
final stockées en `localStorage` (pas de backend pour ce livrable).
* **Multi-pages statiques** (pas de SPA/routeur) : navigation classique par liens `<a>`.
* Aucune build step obligatoire (livrable ouvrable en local ou déployable tel quel) ;
un simple serveur statique (ex. Live Server) suffit pour le développement.

> Le style visuel complet (couleurs, typographies, composants, responsive) est
> défini dans \\\\\\\*\\\\\\\*`@DESIGN.md`\\\\\\\*\\\\\\\* — à lire intégralement avant tout travail CSS.
> `DESIGN.md` > maquette PNG > intuition de Claude en cas de conflit.

## Structure du projet

```
notion-pour-lentreprise/
├── index.html                       (Accueil)
├── avant-de-commencer.html
├── formation.html                   (liste des 5 modules)
├── formation/
│   ├── module-01-decouvrir-notion.html
│   ├── module-02-structurer-linformation.html
│   ├── module-03-espace-collaboratif.html
│   ├── module-04-gerer-un-projet.html
│   └── module-05-bonnes-pratiques.html
├── cas-pratique.html
├── outils.html
├── construisez-votre-espace.html    (projet final + checklist)
├── helpdesk.html
├── fin-de-formation.html
├── test-final.html                  (quiz noté)
├── css/
│   ├── variables.css                (design tokens issus de DESIGN.md)
│   ├── base.css                     (reset, typographie, layout)
│   ├── components.css               (nav, cards, boutons, listes, accordéon…)
│   └── responsive.css
├── js/
│   ├── nav.js                       (menu mobile, lien actif, barre de progression globale)
│   ├── progress.js                  (lecture/écriture localStorage, calcul %)
│   ├── checklist.js                 (projet final)
│   ├── accordion.js                 (FAQ helpdesk)
│   └── quiz.js                      (test final : score, correction)
├── fonts/
│   ├── PlayfairDisplay-Regular.woff2
│   ├── PlayfairDisplay-Italic.woff2
│   └── Inter-variable.woff2
├── images/
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
titres, citations et nombres mis en avant ; `--font-body` (Inter) partout
ailleurs. Polices chargées en local via `@font-face`, jamais via Google Fonts CDN.
5. **Listes séquentielles** (modules, sidebar cas pratique, templates, FAQ) :
toujours une liste à séparateurs `--color-border`, jamais une grille de cards.
6. **Langue** : toute l'interface est en **français**.
7. **Navigation** : barre fixe en haut, identique sur toutes les pages
(`Accueil · Formation · Cas pratique · Outils · Bonnes pratiques · Helpdesk`),
avec le lien de la page courante en `--color-accent`. Barre de progression
globale à droite du nav, recalculée à chaque chargement de page.
8. **Progression** : chaque module coché « terminé » (bouton en fin de module,
ou quiz réussi) met à jour `localStorage` ; la page `formation.html` et la
barre du nav reflètent le pourcentage réel.
9. **Accessibilité** : contraste suffisant (texte sur `--color-bg`/`--color-surface`
déjà validé par la palette), focus clavier toujours visible via `box-shadow`
(jamais `outline: none` seul), navigation utilisable au clavier, `alt` sur
toutes les images, landmarks ARIA sur le menu mobile.
10. **Pas de `<form action>`** : les interactions (quiz, checklist, accordéon
FAQ, recherche templates) sont gérées en JavaScript, sans rechargement de page.
11. **Emojis comme pictogrammes** de section (🏠 👥 📚 🚀 📅 ❓ 🆘 🎬 📝 ✅) —
pas de librairie d'icônes externe.
12. **JS vanilla modulaire** : un fichier = une responsabilité (`nav.js`,
`progress.js`, `checklist.js`, `accordion.js`, `quiz.js`), pas de logique
métier mélangée dans le HTML (pas d'`onclick=""` inline).

\---

## Structure de contenu (résumé)

* **Accueil** : hero (titre, sous-titre, méta « 2 soirées · 5 modules · Niveau
débutant · X % accompli »), carte visuelle « Journal d'apprentissage »,
CTA « Commencer ».
* **Avant de commencer** : pourquoi la formation, objectifs pédagogiques (6
items), présentation de Studio Nova, bloc Avant (info dispersée) / Après
(espace centralisé).
* **Formation — 5 modules** (chacun : durée, format vidéo/exercice/quiz, % de progression) :

  1. Découvrir Notion — interface, espaces, pages, blocs, navigation
  2. Structurer l'information — arborescence, bases de données, propriétés, vues
  3. Créer un espace collaboratif — centre de ressources, procédures, FAQ
  4. Gérer un projet — tableau Kanban, responsable/échéance/priorité/statut
  5. Les bonnes pratiques — droits d'accès, organisation, recherche, maintenance
* **Cas pratique Studio Nova** : arborescence cible (Actualités, Équipe,
Ressources, Projets, Calendrier, Helpdesk), citation, CTA « Ouvrir le cas pratique ».
* **Boîte à outils** : 6 templates à dupliquer (Projet, Wiki, Équipe,
Calendrier, Réunion, Knowledge base), avatar pastel + description.
* **Construisez votre espace** (projet final) : checklist de 7 items,
progression « x / 7 », CTA « Continuer le projet ».
* **Helpdesk** : FAQ accordéon (4+ questions), sidebar (Tutoriels,
Documentation, Questions fréquentes) + CTA inversée « Encore besoin d'aide ? ».
* **Fin de formation** : récapitulatif des acquis (5 items), carte « Test
final » (15 questions, \~12 min, score conseillé 80 %) → `test-final.html`.

\---

## Prompts par étape

\---

### P1 — Design system (variables, polices, reset)

```
Crée @css/variables.css, @css/base.css et @css/responsive.css :

- Recopie exactement les design tokens de la section 2 et 3 de @DESIGN.md
  dans :root (couleurs, --font-display, --font-body).
- @font-face pour Playfair Display (regular + italic) et Inter (variable),
  chargées depuis @fonts/, font-display: swap.
- Reset CSS minimal (box-sizing, marges par défaut, line-height).
- Classes utilitaires de layout : .container (max-width 1120px, padding
  latéral responsive 24px/40px/64px selon @DESIGN.md section 8), .eyebrow,
  .btn-primary, .btn-primary--inverse.
- Media queries de base aux breakpoints 768px et 1024px (mobile-first).

Respecte @DESIGN.md strictement (aucune couleur/taille hors spec).

Critère de succès : un fichier HTML de test avec un titre en --font-display
et un bouton .btn-primary affiche exactement les styles de DESIGN.md,
aux trois largeurs d'écran (mobile/tablette/desktop).
```

\---

### P2 — Navigation globale + barre de progression

```
Crée @js/nav.js et le composant de navigation (à inclure en haut de chaque
page HTML, section "Navigation" de @DESIGN.md) :

- Nav fixe, logo carré (--color-accent) + « Notion pour l'entreprise »
  (Playfair Display), 6 liens (Accueil, Formation, Cas pratique, Outils,
  Bonnes pratiques, Helpdesk).
- Lien de la page courante détecté automatiquement (comparaison
  window.location.pathname) et mis en --color-accent.
- Barre de progression globale (piste + remplissage, cf. DESIGN.md) : calculée
  en JS à partir de @js/progress.js (voir P10), avec le label "X %" à droite.
- Menu hamburger < 768px : overlay plein écran --color-surface, liens
  verticaux, fermeture par ✕, piégeage du focus au clavier.

Respecte @DESIGN.md (section Navigation) et les règles d'accessibilité de @CLAUDE.md.

Critère de succès : le même composant de nav, copié sur 2 pages différentes,
met en évidence le bon lien actif sur chacune ; le menu mobile s'ouvre/se
ferme au clic et au clavier (Échap).
```

\---

### P3 — Page Accueil (index.html)

```
Crée @index.html :

- Nav globale (P2).
- Hero en 2 colonnes (texte / carte visuelle) selon la grille hero de
  @DESIGN.md section 5 :
    Eyebrow « PARCOURS PROFESSIONNEL · STUDIO NOVA »
    H1 « Maîtriser Notion en entreprise »
    Sous-titre « Organisez, centralisez et partagez efficacement
      l'information — sans jargon, au rythme de deux soirées guidées. »
    Méta : « 2 soirées · 5 modules · Niveau débutant · X % accompli »
      (X = valeur dynamique depuis @js/progress.js)
    Bouton primaire « Commencer → » → formation.html
    Carte à droite : eyebrow « JOURNAL D'APPRENTISSAGE · 01 », image,
      citation « De l'information dispersée à un espace commun. »,
      légende « Un parcours concret pour les 30 collaborateurs de Studio Nova. »

Respecte @DESIGN.md (typographie, cartes, boutons) et le mobile-first
(colonnes empilées < 1024px, cf. section 5/8).

Critère de succès : page fonctionnelle à 375px, 768px et 1440px de large,
le % du hero correspond à la progression réelle stockée en localStorage.
```

\---

### P4 — Page « Avant de commencer »

```
Crée @avant-de-commencer.html :

- Nav globale.
- Eyebrow « AVANT DE COMMENCER », H1 « Poser les bases, ensemble. »,
  paragraphe de contexte Studio Nova.
- Ligne de 4 colonnes (Objectifs / Public / Prérequis / Périmètre),
  empilées en 1 colonne < 768px.
- Bloc Avant/Après (cf. @DESIGN.md, composant dédié) :
    Avant : « L'information se disperse » + 3 points en tirets
    Après (panneau inversé) : « Un espace Notion centralisé » + 3 points cochés
    Flèche de transition entre les deux, verticale sur mobile.

Respecte @DESIGN.md.

Critère de succès : le bloc Avant/Après s'affiche côte à côte ≥ 1024px et
empilé < 1024px, sans jamais casser la mise en page à 375px.
```

\---

### P5 — Page Formation (liste des modules) + gabarit de module

```
Crée @formation.html et le gabarit @formation/module-01-decouvrir-notion.html
(à dupliquer pour les modules 02 à 05 avec leur contenu propre, cf. section
« Structure de contenu » de @CLAUDE.md) :

formation.html :
- Eyebrow « LE PROGRAMME · 5 CHAPITRES », H1 « Apprendre en faisant. »,
  note explicative à droite du titre.
- Liste des 5 modules (composant "ligne de module" de @DESIGN.md) : numéro,
  titre, description, méta (durée · format), mini progress bar + bouton
  « Commencer →» (texte devient « Continuer →» ou « Revoir →» selon
  @js/progress.js si le module est en cours/terminé).

Gabarit de module :
- Nav globale, fil d'ariane simple (« Formation / Module 0X »).
- Titre du module, objectifs du module (liste à puces).
- Zone vidéo (placeholder <video> ou <iframe> commenté), mini-exercice
  (encart --color-surface), quiz de validation (3-5 questions, réutilise
  le composant de @js/quiz.js en version courte).
- Bouton « Marquer comme terminé » en fin de page → met à jour @js/progress.js
  et redirige vers le module suivant (ou formation.html si c'est le dernier).

Respecte @DESIGN.md.

Critère de succès : les 5 modules sont accessibles depuis formation.html,
terminer un module met à jour son état ET le % global du nav sur toutes les pages.
```

\---

### P6 — Page Cas pratique

```
Crée @cas-pratique.html :

- Nav globale.
- Eyebrow « CAS PRATIQUE · STUDIO NOVA », H1 « Construire un espace qui
  ressemble à l'entreprise. », paragraphe de contexte.
- Blockquote « Une bonne architecture se comprend avant même qu'on l'explique. »
  (composant blockquote de @DESIGN.md).
- Bouton primaire « Ouvrir le cas pratique →».
- Sidebar à droite (composant "card liste sidebar" de @DESIGN.md) avec les 7
  entrées de l'arborescence Studio Nova (Accueil, Équipe, Ressources, Projets,
  Calendrier, FAQ, Helpdesk), emoji + libellé + sous-texte + flèche.

Respecte @DESIGN.md (2 colonnes ≥ 1024px, empilé en dessous).

Critère de succès : la sidebar liste les 7 entrées avec séparateurs, sans
bordure sur la dernière ligne ; layout correct à 375/768/1440px.
```

\---

### P7 — Page Outils (boîte à outils)

```
Crée @outils.html :

- Nav globale.
- Eyebrow « BOÎTE À OUTILS », H1 « Ne partez pas de zéro. », sous-titre.
- Liste des 6 templates (composant "ligne Dupliquer" de @DESIGN.md) : avatar
  pastel (lettre), titre, description, lien « Dupliquer ↘ » — pastels
  alternés (--color-accent-soft / --color-accent-soft-2) entre chaque ligne.

Respecte @DESIGN.md.

Critère de succès : les 6 templates s'affichent avec avatars alternés (jamais
deux couleurs identiques consécutives), liste responsive sans grille.
```

\---

### P8 — Page Construisez votre espace (projet final)

```
Crée @construisez-votre-espace.html et @js/checklist.js :

- Nav globale.
- Eyebrow « PROJET FINAL », H1 « Votre espace, prêt à vivre. », paragraphe.
- Carte (composant "checklist" de @DESIGN.md) avec les 7 items :
    Créer la page d'accueil Studio Nova / Structurer l'espace Équipe /
    Importer les ressources prioritaires / Créer la base Projets et sa vue
    Kanban / Ajouter le calendrier partagé / Publier la FAQ et le Helpdesk /
    Mon espace est facilement navigable
  Chaque case cliquable, état persisté en localStorage (clé dédiée, distincte
  de la progression des modules).
- Barre « Progression » + « x / 7 » qui se met à jour en direct.
- Bouton « Continuer le projet →».

Respecte @DESIGN.md (composants checklist + barre de progression avec label).

Critère de succès : cocher/décocher un item met à jour le compteur et la
barre instantanément, l'état survit à un rechargement de page (localStorage).
```

\---

### P9 — Page Helpdesk

```
Crée @helpdesk.html et @js/accordion.js :

- Nav globale.
- Eyebrow « HELPDESK », H1 « Une question ne doit jamais bloquer l'élan. »,
  sous-titre.
- FAQ en accordéon (composant de @DESIGN.md) avec au moins ces 4 questions :
    « Comment retrouver une page rapidement ? »
    « Qui peut modifier une base de données ? »
    « Comment partager sans ouvrir tout l'espace ? »
    « Que faire si une page a été supprimée ? »
  Une seule question ouverte à la fois, icône "+" → "×" animée (< 250ms).
- Sidebar à droite : 3 cards claires (Tutoriels · 7 guides pas à pas,
  Documentation · Les notions essentielles, Questions fréquentes · Réponses
  courtes et concrètes) + card CTA inversée « Encore besoin d'aide ? / Écrire
  au helpdesk → » (mailto: ou lien commenté).

Respecte @DESIGN.md.

Critère de succès : cliquer une question l'ouvre et ferme les autres ;
navigation clavier (Tab + Entrée) fonctionnelle sur l'accordéon.
```

\---

### P10 — Progression globale + Fin de formation + Test final

```
Crée @js/progress.js, @fin-de-formation.html, @test-final.html et @js/quiz.js :

progress.js :
- API simple : getModuleProgress(id), setModuleProgress(id, pourcentage),
  getGlobalProgress() (moyenne des 5 modules), tout en localStorage
  (clé préfixée, ex. "notion-formation:module-01").
- Utilisé par nav.js (P2), formation.html (P5) et les gabarits de module.

fin-de-formation.html :
- Nav globale (barre à 100 % si tous les modules sont terminés).
- Eyebrow « FIN DU PARCOURS », H1 récapitulatif, liste des 5 acquis.
- Carte « DERNIÈRE ÉTAPE » : « Validez vos acquis avec le test final. »,
  méta « 15 questions · environ 12 minutes · résultat immédiat », ligne
  « Score conseillé » / « 80 % », bouton « Lancer le test final →» → test-final.html.

test-final.html + quiz.js :
- 15 questions à choix multiple (contenu à rédiger à partir des 5 modules),
  une question affichée à la fois, barre de progression du quiz.
- Correction et score affichés à la fin, comparés au score conseillé (80 %).
- Résultat stocké en localStorage.

Respecte @DESIGN.md.

Critère de succès : terminer les 5 modules → nav affiche 100 %, la carte
« dernière étape » se déverrouille visuellement ; terminer le quiz affiche un
score cohérent avec les réponses choisies.
```

\---

### P11 — Responsive final \& accessibilité

```
Sur l'ensemble des pages créées (@index.html → @test-final.html), vérifie et
corrige si besoin :

- Les 3 breakpoints de @DESIGN.md section 8 (< 768px, 768–1023px, ≥ 1024px)
  sur CHAQUE page, y compris les gabarits de module et le quiz.
- Focus clavier visible partout (box-shadow --color-accent), jamais
  d'outline supprimé sans remplacement.
- Contraste texte suffisant sur --color-surface-inverse (texte toujours en
  --color-text-inverse, jamais --color-text par erreur).
- alt descriptif sur toutes les <img>, aria-expanded sur les triggers
  d'accordéon, aria-current="page" sur le lien de nav actif.
- Aucune console error/warning au chargement de chaque page.

Respecte @DESIGN.md et les règles d'accessibilité de @CLAUDE.md.

Critère de succès : les 12 pages passent sans erreur visuelle aux 3
breakpoints, navigation clavier complète possible du hero au test final.
```

\---

## Ordre d'exécution recommandé

```
P1 (design system) → P2 (nav + progress bar) → P3 (Accueil)
→ P4 (Avant de commencer) → P5 (Formation + modules) → P6 (Cas pratique)
→ P7 (Outils) → P8 (Construisez votre espace) → P9 (Helpdesk)
→ P10 (Fin de formation + test final) → P11 (Responsive \\\\\\\& accessibilité)
```


# DESIGN.md — Notion pour l'entreprise

> **v4 — plateforme de formation (oct. 2026).** Remplace la v2 (hub de
> ressources éditorial). Le site redevient un parcours de formation en
> 9 modules, avec une mise en page épurée validée sur maquette : le fond
> beige porte la navigation, le contenu vit sur un panneau clair, et un seul
> élément foncé ressort par page. Voir `CLAUDE.md` § « Notes de migration »
> pour l'historique (v1 → v2 → v3 → v4).

---

## 1. Visual Theme & Atmosphere

Une **plateforme d'autoformation calme et lisible**, entre un cours en ligne
et un guide interactif, avec l'esthétique claire et minimaliste associée à
Notion. L'apprenant doit toujours savoir où il se trouve (module, leçon,
étape) et ce qu'on attend de lui.

Principe de lecture en deux plans :

- **Plan « navigation »** : fond `--color-bg` (beige). Il porte l'en-tête,
  le sommaire latéral et la progression.
- **Plan « contenu »** : panneau `--color-surface` (blanc cassé), coins
  arrondis, ombre douce. Il porte tout ce qui est à lire ou à faire.

Mots-clés : chaleureux · posé · pédagogique · épuré · rythmé par étapes.

---

## 2. Color Palette & Roles

*(palette inchangée depuis la v2 — seuls les usages évoluent)*

```
--color-bg:              #f6f1e8   /* plan navigation : fond de page, sommaire, en-tête de fausse page Notion */
--color-bg-soft:         #fbf8f3   /* survol / sélection dans un panneau clair */
--color-surface:         #fffdf8   /* plan contenu : panneau de leçon, cartes claires, fausses pages Notion */
--color-surface-2:       #eee6d9   /* pistes de progression, emplacements de capture, cases du board */
--color-surface-inverse: #47342c   /* LE bloc foncé de la page (exercice, ou bandeau final de l'accueil) */
--color-accent:          #7a5a45   /* brun café — bouton primaire, numéros, liens actifs */
--color-accent-hover:    #614433   /* hover du bouton primaire */
--color-accent-soft:     #e3d6c8   /* bandeau « Attention », leçon courante, statut « En cours » */
--color-accent-soft-2:   #dee3d3   /* bandeau « Astuce », statut « Terminé », bonne réponse */
--color-text:            #33281f   /* texte principal */
--color-text-inverse:    #fdf9f3   /* texte sur --color-surface-inverse */
--color-text-muted:      #7b6f63   /* texte secondaire, légendes, métadonnées */
--color-border:          #e6ddd0   /* séparateurs, contours de fausse page, options de quiz */
--color-success:         #6b7a5c   /* coches, pastille « Astuce », bonne réponse */
--color-error:           #b8493f   /* pastille « Attention », message d'erreur de quiz */
```

Valeurs dérivées (déclarées dans `variables.css`, jamais réécrites ailleurs) :

```
--color-text-inverse-muted: rgba(253, 249, 243, 0.8)    /* texte secondaire sur fond foncé */
--color-inverse-line:       rgba(253, 249, 243, 0.15)   /* séparateurs sur fond foncé */
--focus-ring:               0 0 0 3px rgba(122, 90, 69, 0.35)
--shadow-1:                 0 4px 24px rgba(51, 29, 25, 0.05)
```

Règles d'usage :

- **Un seul élément `--color-surface-inverse` par page.** Dans une leçon,
  c'est l'exercice. Sur l'accueil, c'est le bandeau final. Ni la définition,
  ni le sommaire, ni le module actif ne sont foncés.
- `--color-accent` : un seul bouton primaire visible par zone.
- Jamais de blanc pur `#ffffff`, y compris dans les fausses pages Notion
  (elles utilisent `--color-surface` + contour `--color-border`).
- Aucune couleur hors palette. Le rouge `--color-error` ne sert qu'en petite
  pastille ou en texte d'erreur, jamais en fond.

---

## 3. Typography Rules

```
--font-display: 'Playfair Display', Georgia, serif
--font-body:    'Inter', system-ui, sans-serif
```

Polices auto-hébergées dans `fonts/` (`@font-face` dans `variables.css`),
jamais via un CDN.

| Rôle                         | Famille                  | Taille   | Graisse | Line-height |
|------------------------------|--------------------------|----------|---------|-------------|
| H1 accueil                   | Playfair Display         | 3.1rem   | 500     | 1.12        |
| H1 leçon / page              | Playfair Display         | 2.5rem   | 500     | 1.15        |
| H2 de section                | Playfair Display         | 1.5rem   | 500     | 1.25        |
| H3 (exercice, carte)         | Playfair Display         | 1.375rem | 500     | 1.3         |
| Phrase de définition         | Playfair Display         | 1.75rem  | 400     | 1.3         |
| Numéro (programme, étapes)   | Playfair Display italic  | 1.05rem  | 400     | 1 — color-accent |
| Chapô (objectif de leçon)    | Inter                    | 1.06rem  | 400     | 1.6 — color-text-muted |
| Corps de leçon               | Inter                    | 1.03rem  | 400     | 1.75 |
| Body muted                   | Inter                    | 0.9rem   | 400     | 1.55 — color-text-muted |
| Meta (fil d'Ariane, durée)   | Inter                    | 0.8rem   | 400     | 1.4 — color-text-muted |
| Bouton                       | Inter                    | 0.85rem  | 600     | 1 |
| Statut (pill)                | Inter                    | 0.8rem   | 600     | 1 |

Règles :
- Playfair Display uniquement pour les titres, la phrase de définition et
  les numéros. Jamais pour le corps de texte ni les libellés d'interface.
- **Plus d'eyebrows en majuscules** dans les leçons (retour utilisatrice :
  trop de petits labels = bruit visuel). Le contexte est porté par le fil
  d'Ariane (`Module · Leçon x sur y · durée`).
- Les seuls libellés « encadré » qui restent sont **Astuce**, **Attention**,
  **Exercice** et **Résultat attendu**, en gras Inter dans le texte.

---

## 4. Component Stylings

### En-tête global (`.site-header`)
```
background: var(--color-surface); border-bottom: 1px solid var(--color-border)
Contenu : logo carré 36px --color-surface-inverse avec « N » Playfair italic
  + wordmark « Notion pour l'entreprise » (Playfair 1.2rem 500).
Liens : « La formation » · « Studio Nova » · « La méthode » (Inter 0.875rem,
  muted ; actif en --color-accent 600, aria-current="page").
CTA « Mon parcours → » : bouton primaire compact.
< 768px : liens repliés derrière un bouton « Menu » (menu déroulant sous
  l'en-tête, pas d'overlay plein écran).
```

### Layout de leçon (`.course-layout`)
```
Conteneur max-width 1240px, padding 40px, flex wrap, gap 40px.
Gauche  : .course-toc — sommaire latéral, sur le fond beige, 240–260px.
Droite  : .course-panel — panneau --color-surface, border-radius 24px,
          padding 48px 56px 40px, --shadow-1, max-width 860px.
< 1024px : le sommaire passe au-dessus du panneau, replié dans un
          <details> « Sommaire du cours ».
< 768px  : padding du panneau 28px 20px.
```

### Sommaire latéral (`.course-toc`)
```
Progression globale : libellé muted + « x / 37 leçons », barre 4px.
Modules terminés : « ✓ Titre » muted. Module courant : titre 600 + « x / y ».
Leçons du module courant : liste indentée ; leçon courante en pill
  --color-accent-soft, 600, aria-current="page".
Leçons sans page (pas encore rédigées) : texte muted, non cliquable,
  mention « bientôt » lue par les lecteurs d'écran.
Aucune carte, aucun fond : texte posé sur le beige.
```

### Repère d'étapes (`.lesson-steps`)
```
4 boutons en grille 4 colonnes : Comprendre · Voir · Faire · Vérifier.
Chaque bouton : barre 4px en haut (--color-accent si étape atteinte, sinon
  --color-border) + numéro Playfair italic + libellé.
Étape courante : texte --color-text 600, aria-current="step".
Le contenu des étapes est dans 4 <section data-step>. Sans JavaScript, les
  4 sections s'affichent à la suite (amélioration progressive).
```

### Définition (`.definition`)
```
Pas d'encadré. Une phrase Playfair 1.75rem, suivie d'un paragraphe normal.
```

### Bandeaux Astuce / Attention (`.callout`)
```
display flex, gap 14px, border-radius 14px, padding 16px 20px.
Pastille ronde 22px à gauche (icône SVG inline, aria-hidden).
.callout--tip     : fond --color-accent-soft-2, pastille --color-success (ampoule)
.callout--warning : fond --color-accent-soft,   pastille --color-error (« ! »)
Texte : « Astuce : » / « Attention : » en gras, puis la phrase.
Ce sont les DEUX SEULS types de bandeau du site.
```

### Tutoriel pas à pas (`.tutorial`)
```
<ol> sans puces : numéro « 1. » Inter 600 --color-accent + texte 1rem.
Une capture d'écran peut s'intercaler sous l'étape qu'elle illustre
  (indentée au niveau du texte).
```

### Capture d'écran (`.screenshot`)
```
<figure> ; image border-radius 14px, --shadow-1, contour --color-border.
Légende optionnelle <figcaption> Inter 0.85rem muted.
Tant que la capture n'existe pas : .screenshot__placeholder — ratio 16:9,
  fond --color-surface-2, icône image + « Capture d'écran Notion » + sujet
  à capturer. role="img" + aria-label décrivant la capture attendue.
Fichiers : images/captures/<module>-<sujet>.png
```

### Fausse page Notion (`.notion-page`)
```
Contour 1px --color-border, border-radius 16px, fond --color-surface.
Barre du haut : fond --color-bg, fil « Studio Nova / Nom de la page »,
  mention « Simulation » à droite (on ne prétend jamais être l'application).
Blocs : <button> pleine largeur (survol, focus clavier et clic affichent le
  type de bloc). Bloc actif : fond --color-bg-soft, contour --color-accent,
  poignée « ⋮⋮ » visible, étiquette pill --color-accent à droite.
Le titre de la page n'est PAS un bloc : étiquette --color-surface-2.
Zone d'explication sous la page, aria-live="polite".
```

### Simulation de base de données (`.db-sim`)
```
Même cadre que la fausse page Notion. Sélecteur de vue (boutons pill,
  aria-pressed) : Table · Board · Calendrier.
Toujours les MÊMES données (base Projets de Studio Nova) quelle que soit
  la vue — c'est le message pédagogique.
Cliquer un nom de projet ouvre sa page (propriétés en <dl> + contenu).
Table : overflow-x auto sur mobile. Calendrier : grille 7 colonnes.
```

### À retenir (`.key-points`)
```
H2 « À retenir » + liste à puces simple (pas de carte, pas de numérotation).
2 à 4 idées.
```

### Exercice (`.exercise`) — le bloc foncé de la leçon
```
background --color-surface-inverse ; color --color-text-inverse ;
border-radius 20px ; padding 28px 30px.
Mention « Exercice · dans Notion » (Inter 0.8rem 600, inverse-muted),
  titre H3 Playfair, étapes en <ol>, puis séparateur --color-inverse-line
  et « Résultat attendu : » en gras.
```

### Quiz (`.quiz`)
```
<fieldset> + <legend> ; question en Playfair 1.375rem.
Options : <label> contenant un <input type="radio">, contour --color-border,
  border-radius 14px. Option cochée : contour --color-accent.
Après validation : bonne réponse fond --color-accent-soft-2 + « Bonne
  réponse » ; réponse fausse choisie fond --color-accent-soft + « Ta réponse ».
  L'information n'est jamais portée par la couleur seule (libellé texte).
Sans réponse : message --color-error « Choisis une réponse avant de valider. »
Correction : paragraphe role="status" sous les options.
```

### Barre de progression (`.progress`)
```
Piste 4px --color-surface-2, remplissage --color-accent, border-radius 999px.
Toujours accompagnée d'un libellé texte (« 5 / 37 leçons »).
```

### Accordéon de module (`.module-list`) — page Mon parcours
```
Liste à séparateurs --color-border dans le panneau clair.
En-tête = <button aria-expanded> : numéro, titre Playfair 1.25rem, nombre de
  leçons, statut (pill : À venir --color-surface-2 / En cours
  --color-accent-soft / Terminé ✓ --color-accent-soft-2), signe + / −.
Contenu : description, barre de progression du module, leçons (pastille
  ronde : ✓ --color-success si terminée, pleine --color-accent si en cours,
  contour sinon) et bouton outline.
```

### Boutons
```
.btn-primary  : fond --color-accent, texte --color-text-inverse, pill,
                padding 13px 24px, Inter 0.85rem 600, hover --color-accent-hover.
.btn-outline  : fond transparent, contour --color-border, texte --color-text.
.btn-light    : (sur fond foncé uniquement) fond --color-text-inverse, texte --color-text.
Hauteur minimale 44px pour tous les boutons cliquables.
```

### Icônes
```
SVG inline au trait (stroke 1.5–2.5, currentColor), aria-hidden="true".
Plus d'emojis comme pictogrammes (v4) : rendu inégal selon les systèmes et
  ton trop décoratif pour la nouvelle direction épurée.
```

---

## 5. Layout Principles

- **Deux plans** : beige = navigation, panneau clair = contenu. On ne pose
  jamais une carte dans une carte : à l'intérieur du panneau, le texte est
  posé directement, seuls les bandeaux, l'exercice, les fausses pages et
  les captures ont un fond.
- **Colonne de lecture** : le panneau ne dépasse pas 860px (≈ 70 caractères
  par ligne au corps 1.03rem).
- **Une leçon = 4 étapes** affichées une à la fois (Comprendre · Voir ·
  Faire · Vérifier). Une étape doit tenir sans défilement excessif.
- Accueil : sections en panneaux clairs sur le beige, espacées de 40px.
- Espacements : 8 / 12 / 16 / 20 / 28 / 40 / 48px.

---

## 6. Depth & Elevation

| Niveau | Usage | Valeur |
|--------|-------|--------|
| 0 | Fond de page (navigation) | `--color-bg` |
| 1 | Panneau de contenu, cartes claires | `--color-surface` + `--shadow-1` |
| 2 | Pistes, emplacements de capture, colonnes du board | `--color-surface-2` |
| 3 | Bloc foncé unique (exercice / bandeau final) | `--color-surface-inverse`, sans ombre |

---

## 7. Do's and Don'ts

**Do**
- Un seul bloc foncé par page.
- Texte posé directement dans le panneau clair.
- Bandeaux limités à Astuce et Attention.
- Une capture d'écran par manipulation importante, placée sous l'étape.
- Toujours un libellé texte en plus de la couleur (statuts, quiz, progression).
- Tutoiement partout, phrases courtes.

**Don't**
- Pas de carte dans une carte.
- Pas d'eyebrow en majuscules dans les leçons.
- Pas d'emoji comme pictogramme.
- Pas de `#ffffff`, pas de couleur hors palette.
- Pas d'`outline: none` sans `box-shadow: var(--focus-ring)`.
- Pas d'animation > 250ms.
- Pas de `<form action>` : tout est géré en JavaScript.

---

## 8. Responsive Behavior

| Breakpoint | Comportement |
|------------|-------------|
| ≥ 1024px | Sommaire à gauche + panneau à droite ; accueil en 2 colonnes |
| 768px–1023px | Sommaire au-dessus du panneau, replié dans un `<details>` |
| < 768px | Menu de l'en-tête replié, padding du panneau 28px 20px, H1 2rem, tables de simulation en défilement horizontal |

Vérifier au minimum : 360px, 414px, 768px, 1280px, 1600px.

---

## 9. Agent Prompt Guide

Lire ce fichier en entier avant tout travail CSS. Ordre de priorité en cas de
conflit : `DESIGN.md` > maquette validée (canevas « Maquette formation
Notion ») > intuition de l'agent.

Checklist avant chaque commit CSS :
- [ ] Toutes les couleurs sont des `var(--color-*)` (ou valeurs dérivées de `variables.css`).
- [ ] Un seul bloc `--color-surface-inverse` par page.
- [ ] Aucune carte imbriquée dans le panneau de contenu.
- [ ] Focus visible partout (`--focus-ring`).
- [ ] Information jamais portée par la couleur seule.
- [ ] Rendu vérifié aux breakpoints de la section 8.

# DESIGN.md — Notion pour l'entreprise
> Spec Google Stitch — https://stitch.withgoogle.com/docs/design-md/specification/
> **v2 — réadapté à la nouvelle maquette (accueil, sept. 2026).** Remplace la v1
> (carnet d'apprentissage / LMS à 5 modules cloisonnés). Voir `CLAUDE.md`
> section « Notes de migration » pour le détail de ce qui change.

---

## 1. Visual Theme & Atmosphere

« Notion pour l'entreprise » devient un **guide de référence éditorial**,
plutôt qu'un parcours de formation cloisonné en modules avec quiz noté. On
garde l'ambiance chaleureuse (crème, brun café, serif élégant), mais la mise
en page emprunte davantage au site vitrine / hub de ressources qu'au LMS :
cards foncées mises en avant, bandeau plein écran inversé, cards « modèle »
avec badge, cards « ressource » listant tutoriels/vidéos/documents, cards
« article » pour aller plus loin, et un aperçu produit illustré en hero
(mockup d'interface, mini-Kanban) plutôt qu'un simple visuel statique.

Mots-clés : chaleureux · éditorial · posé · professionnel · pédagogique ·
**orienté ressources** (nouveau)

---

## 2. Color Palette & Roles

```
--color-bg:              #f6f1e8   /* fond principal — crème chaud */
--color-bg-soft:         #fbf8f3   /* fond des sections alternées — presque blanc cassé */
--color-surface:         #fffdf8   /* cards claires — cards modèle, card "éléments clés", card "et maintenant ?" */
--color-surface-2:       #eee6d9   /* pistes de progress bar, séparateurs marqués, fond du mockup produit */
--color-surface-inverse: #47342c   /* cards foncées — concept cards, cards ressource, bandeau plein écran */
--color-accent:          #7a5a45   /* brun café — CTA, liens actifs, eyebrows, icônes */
--color-accent-hover:    #614433   /* brun plus foncé — hover sur CTA */
--color-accent-soft:     #e3d6c8   /* beige — badge "Nouveau", avatars pastel (variante 1) */
--color-accent-soft-2:   #dee3d3   /* vert sauge pastel — badge "Essentiel", avatars pastel (variante 2), coche validée */
--color-text:            #33281f   /* texte principal — titres, corps fort */
--color-text-inverse:    #fdf9f3   /* texte sur --color-surface-inverse */
--color-text-muted:      #7b6f63   /* texte secondaire, légendes, nav inactive */
--color-border:          #e6ddd0   /* séparateurs, bordures de listes internes aux cards */
--color-success:         #6b7a5c   /* vert sauge — coches, encarts validés */
--color-error:           #b8493f   /* erreurs de formulaire (non illustré en maquette) */
```

Règles d'usage :
- `--color-accent` : un seul élément interactif dominant par zone (bouton
  primaire, lien actif, icône de card).
- `--color-surface-inverse` s'utilise maintenant à **deux échelles** :
  - en card (concept card, card ressource) → `border-radius` grand, contenue
    dans la grille de section ;
  - en **bandeau plein écran** (section « bons réflexes ») → pas de
    `border-radius`, la couleur va bord à bord, contenu recentré dans un
    `.container` interne.
- `--color-bg` / `--color-bg-soft` alternent d'une section à l'autre sur
  chaque page (bandes horizontales), cf. section 5.
- `--color-accent-soft` / `--color-accent-soft-2` : badges de card modèle
  (« Nouveau », « Essentiel »), avatars/initiales, et petits indicateurs —
  jamais deux badges identiques consécutifs dans une même grille.
- Jamais de blanc pur (#ffffff) : toujours `--color-surface`, `--color-bg-soft`
  ou `--color-text-inverse`.
- Jamais de couleur hors palette sans validation explicite.

---

## 3. Typography Rules

*(inchangé depuis la v1 — la nouvelle maquette conserve le même système
typographique)*

```
--font-display: 'Playfair Display', Georgia, serif
--font-body:    'Inter', system-ui, sans-serif
```

```css
@font-face {
  font-family: 'Playfair Display';
  src: url('fonts/PlayfairDisplay-Regular.woff2') format('woff2');
  font-weight: 400 700; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Playfair Display';
  src: url('fonts/PlayfairDisplay-Italic.woff2') format('woff2');
  font-weight: 400 700; font-style: italic; font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('fonts/Inter-variable.woff2') format('woff2');
  font-weight: 100 900; font-style: normal; font-display: swap;
}
```

| Rôle              | Famille          | Taille   | Graisse | Line-height |
|--------------------|------------------|----------|---------|-------------|
| H1 hero            | Playfair Display | 2.75rem  | 500     | 1.15        |
| H1 page            | Playfair Display | 2.25rem  | 500     | 1.2         |
| H2 section         | Playfair Display | 1.75rem  | 500     | 1.25        |
| H3 card            | Playfair Display | 1.25rem  | 500     | 1.3         |
| Numéro (concept card) | Playfair Display italic | 1.4rem | 400 | 1 — color-text-inverse |
| Eyebrow            | Inter            | 0.7rem   | 700     | 1.4 — majuscules, letter-spacing 0.1em, couleur accent |
| Body               | Inter            | 1rem     | 400     | 1.6 — color-text |
| Body muted         | Inter            | 0.9rem   | 400     | 1.5 — color-text-muted |
| Meta (durée, tags) | Inter            | 0.8rem   | 400     | 1.4 — color-text-muted |
| Nav link           | Inter            | 0.85rem  | 500     | 1 — color-text-muted, actif en color-accent |
| Bouton             | Inter            | 0.85rem  | 600     | 1 |
| Citation (quote)   | Playfair Display italic | 1.25rem | 400 | 1.4 — color-text |
| Badge              | Inter            | 0.7rem   | 700     | 1 — majuscules, letter-spacing 0.05em |

Règle typographique signature (inchangée) : chaque page/section démarre par
un triptyque **Eyebrow → Titre (Playfair Display) → Sous-titre (Inter
muted)**, dans cet ordre, gap `12px`.

---

## 4. Component Stylings

### Nav globale + CTA
```
position: fixed; top: 0; width: 100%; z-index: 100
background: var(--color-bg)
border-bottom: 1px solid var(--color-border)
Logo: carré 32px, border-radius 8px, background var(--color-accent) + wordmark
  "Notion pour l'entreprise" en Playfair Display 1.05rem 500
Liens (Accueil, Méthode, Ressources, À propos) : Inter 0.85rem 500,
  color: var(--color-text-muted) ; actif → color: var(--color-accent)
CTA à droite : "Mon parcours" — bouton primaire plein (pill), plus compact
  que le bouton hero (padding 10px 20px)
```
> Changement vs v1 : plus de barre de progression globale dans le nav (elle
> était liée aux modules). La progression, si on la garde, vit uniquement
> sur `mon-parcours.html`.

### Hero — aperçu produit (nouveau, remplace le visuel statique v1)
```
Grille 2 colonnes ≥ 1024px (texte ~55% / illustration ~45%), gap 64px ;
empilé en mobile.
Colonne texte : Eyebrow ("ACCUEIL · Guide débutant") → H1 hero → sous-titre.
Illustration : card --color-surface, border-radius 28px, padding 24px,
  box-shadow niveau 1, contenant :
    - une "barre de titre" factice (3 points, --color-text-muted, en haut)
    - un panneau gauche --color-surface-2 simulant une sidebar d'app
      (liste d'items courts, une icône générique par ligne)
    - un panneau droit --color-surface avec un titre H3, un sous-texte muted,
      et une rangée de 2 mini "stat cards" (--color-bg-soft, border-radius 16px,
      label muted + nombre en Playfair Display italic accent)
    - un bloc vide --color-surface-2 en bas, décoratif (simule du contenu)
Toujours un mockup d'interface, jamais une vraie capture d'écran Notion.
```

### Card concept — numérotée, foncée (nouveau, remplace la "ligne de module")
```
background: var(--color-surface-inverse)
color: var(--color-text-inverse)
border-radius: 20px
padding: 28px
Numéro (01–04) : Playfair Display italic 1.4rem, color: var(--color-text-inverse)
  légèrement atténué (opacity .8), margin-bottom 24px
Titre : Playfair Display 1.15rem 500, color: var(--color-text-inverse)
Description : Inter 0.85rem, color: rgba(253,249,243,0.7), margin-top 6px
Disposition : grille 4 colonnes ≥ 1024px, 2 colonnes ≥ 640px, 1 colonne en
  dessous — gap 16-20px (grille, pas de liste à séparateurs : ce sont des
  items parallèles/comparables, pas une séquence à parcourir dans l'ordre).
```

### Card "éléments clés" (nouveau)
```
background: var(--color-surface); border-radius: 24px; padding: 32px
Titre H3 en tête de card.
Liste interne numérotée (01/02/03…) : chaque ligne padding 14px 0, séparateur
  --color-border (dernier élément sans bordure) ; numéro en Playfair Display
  italic color-accent devant le texte Inter 0.9rem color-text.
Encart de validation en pied de card : background var(--color-accent-soft-2)
  (ou bg-soft), border-radius 14px, padding 14px 16px, icône "✓" dans un
  cercle --color-success + color-text-inverse, texte Inter 0.85rem color-text.
```

### Mini-Kanban — aperçu produit (nouveau)
```
Card --color-surface-2, border-radius 20px, padding 20px, sur fond de section.
3 colonnes (À faire / En cours / Terminé) :
  en-tête colonne : Inter 0.75rem 600 color-text-muted + compteur
  tâche : card --color-surface, border-radius 12px, padding 10px 12px,
    puce ronde --color-accent + titre Inter 0.85rem + sous-texte muted 0.75rem
Colonnes empilées verticalement < 768px.
```

### Bandeau plein écran inversé — "bons réflexes" (nouveau)
```
background: var(--color-surface-inverse)   /* bord à bord, pas de border-radius */
color: var(--color-text-inverse)
padding: 64px 0 (48px mobile)
Contenu recentré dans .container.
Titre H2 Playfair Display, color-text-inverse, margin-bottom 32px.
3 colonnes (empilées < 768px) : titre Inter 0.95rem 600 + description Inter
  0.85rem rgba(253,249,243,0.7), pas de card — juste du texte, séparé par un
  gap généreux (32-40px) plutôt que des bordures.
```

### Card modèle — avec badge, sans icône (remplace la "ligne Dupliquer" v1)
```
background: var(--color-surface); border-radius: 20px; padding: 24px
position: relative (pour le badge)
Badge (haut-gauche, en tête de card, pas absolute) : pill, Inter 0.7rem 700
  uppercase, padding 4px 10px, border-radius 999px —
    "Populaire" → background var(--color-surface-inverse), color-text-inverse
    "Essentiel" → background var(--color-accent-soft-2), color-text
    "Nouveau"   → background var(--color-accent-soft), color-text
Titre : Playfair Display 1.1rem 500, margin-top 16px
Description : Inter 0.85rem color-text-muted, margin-top 6px
Lien "Utiliser ce modèle →" : Inter 0.8rem 600, color-accent, margin-top 16px
Disposition : grille 3 colonnes ≥ 1024px, 1 colonne < 768px.
Bouton pill outline "Voir tous les templates →" centré sous la grille :
  border 1px solid var(--color-border), background transparent,
  color-text, border-radius 999px, padding 12px 22px.
```
> Changement (retour utilisateur sur la maquette) : la card modèle n'a **plus
> d'icône/emoji carré** au-dessus du titre — seulement le badge, le titre, la
> description et le lien. Ne pas réintroduire d'icône ici.

### Card ressource — foncée, avec liste interne (nouveau)
```
background: var(--color-surface-inverse); color: var(--color-text-inverse)
border-radius: 20px; padding: 28px
Icône : carré 40px, border-radius 10px, background rgba(253,249,243,0.12)
Titre : Playfair Display 1.2rem 500, margin-top 16px
Description : Inter 0.85rem rgba(253,249,243,0.7), margin-top 6px
Liste interne (tutoriels / vidéos / documents) : margin-top 20px,
  chaque ligne padding 8px 0, séparateur rgba(253,249,243,0.12) ;
  affiche selon le type :
    tutoriel  → libellé + durée alignée à droite (Inter 0.8rem)
    vidéo     → miniature 32×32 --color-surface-2 + libellé + timecode
    document  → libellé + tag fichier ("PDF") en petit pill translucide
Disposition : grille 3 colonnes ≥ 1024px, 1 colonne < 768px.
```

### Card article — "aller plus loin" (nouveau)
```
background: transparent (pas de card container, juste l'image + texte)
Image : ratio 4:3, border-radius 16px, object-fit cover, margin-bottom 16px
Eyebrow catégorie : Inter 0.7rem 700 uppercase color-accent
Titre : Playfair Display 1.05rem 500, margin-top 6px, color-text
Lien "X min de lecture →" : Inter 0.8rem color-text-muted, margin-top 8px,
  devient color-accent au hover
Disposition : grille 3 colonnes ≥ 1024px, 1 colonne < 768px.
```

### Section de clôture — "fin du guide" (remplace la card score/quiz v1)
```
Grille 2 colonnes ≥ 1024px (texte / card), empilée en dessous.
Colonne texte : Eyebrow "FIN DU GUIDE" + H2 + paragraphe muted.
Card --color-surface, border-radius 24px, padding 28px :
  Titre H3 "Et maintenant ?"
  Paragraphe Inter 0.85rem color-text-muted
  Bouton primaire (foncé) pleine largeur "Télécharger le lexique →"
```
> Le test noté (quiz 15 questions, score conseillé 80 %) de la v1 n'apparaît
> plus dans cette maquette — remplacé par un lead magnet (téléchargement du
> lexique). Voir `CLAUDE.md` pour la décision sur `mon-parcours.html`.

### Badge / tag pill (générique)
```
display: inline-flex; padding: 4px 10px; border-radius: 999px
font: 700 0.7rem/1 var(--font-body); text-transform: uppercase;
letter-spacing: 0.05em;
Variantes de fond : voir "Card modèle" ci-dessus (3 variantes, jamais deux
identiques consécutives dans une grille).
```

### Bouton primaire (inchangé)
```
background: var(--color-accent); color: var(--color-text-inverse)
border-radius: 999px; padding: 13px 24px
font: Inter 0.85rem 600; icône flèche "→" à droite, gap 8px
transition: background 150ms ease; hover → var(--color-accent-hover)
```

### Bouton sur panneau inversé (inchangé)
```
Même forme que le bouton primaire, mais utilisé sur fond
--color-surface-inverse :
background: transparent
color: var(--color-text-inverse)
soulignement au hover uniquement, pas de fond
```

### Footer (simplifié — plus de contenu que la simple mention v1)
```
padding: 40px 0
border-top: 1px solid var(--color-border)
Ligne : wordmark à gauche (Playfair Display 0.95rem) ;
  liste de liens à droite, séparés par " · " —
  "Guides · Ressources · À propos · Contact" — Inter 0.8rem color-text-muted
Empilé (wordmark au-dessus des liens) < 640px.
```

---

## 5. Layout Principles

- **Largeur max du contenu** : 1120px, centré avec `margin: 0 auto`.
- **Padding latéral** : `64px` desktop → `24px` mobile.
- **Bandes de section alternées** (nouveau) : chaque `<section>` pleine
  largeur alterne `--color-bg` / `--color-bg-soft` comme fond, à l'exception
  du bandeau "bons réflexes" qui est toujours `--color-surface-inverse` quel
  que soit son ordre. Pas de `border-top`/`border-bottom` entre les bandes —
  la rupture de couleur suffit (fini les séparateurs `--color-border` entre
  sections de la v1).
- **Grilles vs listes** (règle révisée, voir section 7) : les items
  *parallèles/comparables* (concepts, modèles, ressources, articles) vont en
  **grille de cards**. Seules les listes *internes à une card* (éléments
  clés, tutoriels/vidéos/documents dans une card ressource) gardent des
  séparateurs `--color-border`.
- **Grille hero** : texte (~55%) / illustration produit (~45%), gap `64px` ;
  empilée en mobile.
- **Eyebrow → Titre → Sous-titre** : toujours dans cet ordre, gap `12px`.
- **Sections** : `padding: 80px 0` (`48px` mobile) — sauf le bandeau inversé,
  cf. section 4.

---

## 6. Depth & Elevation

| Niveau | Usage | Valeur |
|--------|-------|--------|
| 0 | Fond de section | `--color-bg` / `--color-bg-soft` (alternance) |
| 1 | Cards claires (hero, éléments clés, modèle, et-maintenant) | `--color-surface` + `box-shadow: 0 4px 24px rgba(51,29,25,0.05)` |
| 2 | Piste de progress bar, mockup sidebar, kanban background | `--color-surface-2` |
| 3 | Nav fixe | `box-shadow: 0 1px 0 var(--color-border)` |
| 4 | Cards / bandeau inversés (concept, ressource, bons réflexes) | `--color-surface-inverse`, sans ombre |
| 5 | Bouton au hover | `background: var(--color-accent-hover)` |

Aucun overlay sombre sur les images d'articles — netteté conservée.

---

## 7. Do's and Don'ts

**✅ Do**
- Utiliser exclusivement les couleurs de la palette définie en section 2.
- Garder un seul bouton primaire visible par section.
- Faire alterner les fonds de section `--color-bg` / `--color-bg-soft`.
- Utiliser une **grille de cards** pour les ensembles d'items comparables :
  concepts, modèles, ressources, articles (**changement vs v1**).
- Garder des **listes à séparateurs** uniquement pour le contenu interne
  d'une card (éléments clés, sous-listes tutoriels/vidéos/documents).
- Faire alterner `--color-accent-soft` et `--color-accent-soft-2` sur les
  badges et avatars, jamais deux identiques consécutifs.
- Utiliser Playfair Display uniquement pour titres, citations, nombres et
  numéros de card (jamais pour le corps de texte ou les libellés d'UI).
- Garder les emojis comme pictogrammes uniquement là où la maquette les
  montre réellement (icônes des cards ressource : 📖 🎬 📄) — **pas** sur les
  cards modèle, qui n'en ont plus (voir composant "Card modèle" section 4).

**❌ Don't**
- Ne jamais utiliser `#ffffff` pur comme fond ou comme texte.
- Ne jamais ajouter de couleur hors palette.
- ~~Ne jamais utiliser de grille de cards pour les modules/sidebar/FAQ~~ —
  **règle supprimée en v2** : la nouvelle maquette généralise la grille de
  cards pour les ensembles comparables (voir Do's ci-dessus). Ne conserver
  une liste à séparateurs que pour le contenu *interne* d'une card.
- Ne jamais utiliser un `border-radius` < 6px sur les composants interactifs.
- Ne jamais utiliser un `outline` navigateur par défaut sur focus — le
  remplacer par un `box-shadow` visible en `--color-accent`.
- Ne jamais déclencher de `<form action>` — toute soumission reste gérée en JS.
- Ne jamais utiliser d'animation > 250ms.

---

## 8. Responsive Behavior

| Breakpoint | Comportement |
|------------|-------------|
| ≥ 1024px | Grilles à 3-4 colonnes (concepts, modèles, ressources, articles), hero 2 colonnes, padding latéral 64px |
| 768px–1023px | Grilles à 2 colonnes (concepts) ou 1 colonne (modèles/ressources/articles restent lisibles empilés dès cette largeur si le contenu est dense), padding 40px |
| < 768px | Une seule colonne partout, nav hamburger, padding 24px, H1 hero 2rem, bandeau "bons réflexes" en colonnes empilées |

**Nav mobile** : bouton hamburger (☰) remplace les liens ; le CTA "Mon
parcours" reste visible, compacté. Clic → menu overlay `--color-surface`
plein écran, liens verticaux + CTA en bas, fermeture par ✕.

**Bandeau "bons réflexes"** : 3 colonnes → empilées avec un `gap` généreux
(32px) sur mobile, pas de séparateur visuel entre elles.

---

## 9. Agent Prompt Guide

**Instruction obligatoire pour Claude** : lire ce fichier (`DESIGN.md`) en
entier avant tout travail sur le style, les composants, ou le CSS. Ne jamais
dériver de la palette de la section 2. Ne jamais inventer une couleur, une
taille ou un radius absent de ce fichier. Ce fichier est en v2 : si un ancien
composant de la v1 (barre de progression du nav, ligne de module, ligne
"Dupliquer", card score/quiz) est encore référencé ailleurs dans le projet,
il est obsolète — se référer à la section correspondante ci-dessus.

Checklist avant chaque commit CSS :
- [ ] Toutes les couleurs sont des variables CSS `var(--color-*)`.
- [ ] Aucune couleur hardcodée hors des déclarations `:root {}`.
- [ ] Les titres utilisent `--font-display`, jamais le corps de texte.
- [ ] Les ensembles d'items comparables utilisent une **grille de cards**,
      pas une liste à séparateurs (sauf contenu interne d'une card).
- [ ] Les sections alternent `--color-bg` / `--color-bg-soft`.
- [ ] Le bandeau "bons réflexes" va bord à bord (pas de `border-radius`,
      pas de `.container` en dehors du contenu).
- [ ] Les hover states utilisent `transition` (jamais de changement brutal).
- [ ] Le responsive suit les breakpoints de la section 8.
- [ ] Aucun `outline: none` seul — toujours un `box-shadow` focus visible.

Ordre de priorité en cas de conflit : `DESIGN.md` > maquette PNG > intuition de Claude.

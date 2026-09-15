# DESIGN.md — Notion pour l'entreprise
> Spec Google Stitch — https://stitch.withgoogle.com/docs/design-md/specification/

---

## 1. Visual Theme & Atmosphere

« Notion pour l'entreprise » est une plateforme de formation professionnelle qui
apprend à une équipe à structurer son information dans Notion, à travers le cas
pratique fictif de **Studio Nova** (PME de 30 collaborateurs). L'interface incarne
**le carnet d'apprentissage éditorial** : fond crème chaleureux, accents bruns
café, typographie serif élégante pour les titres et sans-serif neutre pour le
contenu. L'ambiance est studieuse et rassurante — jamais technique ou froide,
comme un cahier de formation haut de gamme qu'on a envie d'ouvrir.

Mots-clés : chaleureux · éditorial · posé · professionnel · pédagogique

---

## 2. Color Palette & Roles

```
--color-bg:             #f3eee6   /* fond principal — crème chaud */
--color-surface:        #fffcf7   /* cards claires — cartes, panneaux, sidebar */
--color-surface-2:      #e9ded0   /* pistes de progress bar, séparateurs marqués, hover de surface */
--color-surface-inverse:#4e3931   /* panneaux inversés — carte "Après", CTA "Encore besoin d'aide ?" */
--color-accent:         #765443   /* brun café — CTA, liens actifs, eyebrows, remplissage progress bar */
--color-accent-hover:   #5f4436   /* brun plus foncé — hover sur CTA */
--color-accent-soft:    #ded5ca   /* beige rosé — badges/avatars pastel (variante 1) */
--color-accent-soft-2:  #dde2d6   /* vert sauge pastel — badges/avatars pastel (variante 2) */
--color-text:           #332d29   /* texte principal — titres, corps fort */
--color-text-inverse:   #fffcf7   /* texte sur --color-surface-inverse */
--color-text-muted:     #746b64   /* texte secondaire, légendes, nav inactive */
--color-border:         #e3ded6   /* séparateurs, bordures de listes */
--color-success:        #69785e   /* vert sauge — coches validées (checklist) */
--color-error:          #c0524b   /* erreurs de formulaire (non illustré en maquette, cohérent avec la palette) */
```

Règles d'usage :
- `--color-accent` : un seul élément interactif dominant par zone (bouton
  principal, lien actif, remplissage de barre de progression).
- `--color-surface-inverse` : réservé aux panneaux de contraste fort (bloc
  « après », CTA d'aide) — toujours avec `--color-text-inverse`.
- `--color-accent-soft` / `--color-accent-soft-2` : uniquement pour les petits
  avatars/badges circulaires (initiales de templates), en alternance.
- Jamais de blanc pur (#ffffff) : toujours `--color-surface` ou `--color-text-inverse`.
- Jamais de couleur hors palette sans validation explicite.

---

## 3. Typography Rules

```
--font-display: 'Playfair Display', Georgia, serif
--font-body:    'Inter', system-ui, sans-serif
```

Déclaration dans `style.css` (self-hosted, zéro CDN) :
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
| Numéro de module   | Playfair Display italic | 1.4rem | 400 | 1 — color-accent |
| Eyebrow            | Inter            | 0.7rem   | 700     | 1.4 — majuscules, letter-spacing 0.1em, couleur accent |
| Body               | Inter            | 1rem     | 400     | 1.6 — color-text |
| Body muted         | Inter            | 0.9rem   | 400     | 1.5 — color-text-muted |
| Meta (durée, tags) | Inter            | 0.8rem   | 400     | 1.4 — color-text-muted |
| Nav link           | Inter            | 0.85rem  | 500     | 1 — color-text-muted, actif en color-accent |
| Bouton             | Inter            | 0.85rem  | 600     | 1 |
| Citation (quote)   | Playfair Display italic | 1.25rem | 400 | 1.4 — color-text |

Règle typographique signature : chaque page démarre par un triptyque
**Eyebrow → Titre (Playfair Display) → Sous-titre (Inter muted)**, toujours
dans cet ordre, avec un gap de `12px`.

---

## 4. Component Stylings

### Bouton primaire
```
background: var(--color-accent)
color: var(--color-text-inverse)
border-radius: 999px          /* pill */
padding: 13px 24px
font: Inter 0.85rem 600
icône flèche "→" à droite, gap 8px
transition: background 150ms ease
hover → background: var(--color-accent-hover)
```

### Bouton sur panneau inversé
```
Même forme que le bouton primaire, mais utilisé sur fond
--color-surface-inverse (ex. lien "Écrire au helpdesk →") :
background: transparent
color: var(--color-text-inverse)
soulignement au hover uniquement, pas de fond
```

### Navigation
```
position: fixed; top: 0; width: 100%; z-index: 100
background: var(--color-bg)
border-bottom: 1px solid var(--color-border)
Logo: carré 32px, border-radius 8px, background var(--color-accent) + wordmark
  "Notion pour l'entreprise" en Playfair Display 1.05rem 500
Liens: Inter 0.85rem 500, color: var(--color-text-muted)
Lien actif: color: var(--color-accent)
Barre de progression globale (à droite du nav):
  piste 90px × 3px, border-radius 999px, background var(--color-surface-2)
  remplissage: background var(--color-accent)
  label "%" : Inter 0.75rem, color: var(--color-text-muted), margin-left 8px
```

### Card claire (hero, sidebar, FAQ, checklist, quiz)
```
background: var(--color-surface)
border-radius: 24px
padding: 32px (desktop) / 24px (mobile)
box-shadow: 0 4px 24px rgba(51,29,25,0.05)   /* très discrète, jamais dure */
```

### Bloc « Avant / Après »
```
Avant :
  background: var(--color-surface); border-radius: 20px; padding: 32px
  Eyebrow "AVANT" color accent
  Titre H3 Playfair Display
  Liste en tirets « — », color text-muted

Après :
  background: var(--color-surface-inverse); border-radius: 20px; padding: 32px
  color: var(--color-text-inverse)
  Eyebrow "APRÈS" color: rgba(255,252,247,0.7)
  Titre H3 Playfair Display, color text-inverse
  Liste avec coche "✓", color text-inverse

  Flèche de transition entre les deux blocs : icône "→", color text-muted,
  centrée verticalement, visible uniquement ≥ 1024px.
```

### Ligne de module (liste "Apprendre en faisant")
```
display: flex; align-items: flex-start; gap: 24px
padding: 32px 0
border-bottom: 1px solid var(--color-border)  /* dernier élément : aucune bordure */

Numéro (01–05): Playfair Display italic 1.4rem, color: var(--color-accent), width 48px
Titre: Playfair Display 1.25rem 500, color: var(--color-text)
Description: Inter 0.9rem, color: var(--color-text-muted), margin-top 4px
Meta (durée · format · quiz): Inter 0.8rem, color: var(--color-text-muted),
  séparateur " · ", margin-top 8px

Bloc de droite (flex-shrink 0, align self center):
  Mini progress bar 90px × 3px (mêmes styles que celle du nav) + label "%"
    au-dessus, aligné à gauche
  Bouton primaire "Commencer →" à droite, margin-left 24px
```

### Card liste sidebar (ex. plan du cas pratique)
```
background: var(--color-surface); border-radius: 24px; padding: 8px 24px

Ligne :
  display: flex; align-items: center; gap: 16px; padding: 16px 0
  border-bottom: 1px solid var(--color-border)  /* dernière ligne : aucune bordure */
  Emoji/icône: 1.25rem, width 24px
  Titre: Playfair Display 1.05rem 500, color: var(--color-text)
  Sous-texte: Inter 0.8rem, color: var(--color-text-muted), margin-left auto
    (aligné à droite, avant la flèche)
  Flèche "→": color: var(--color-text-muted), margin-left 12px
```

### Blockquote (citation cas pratique)
```
border-left: 3px solid var(--color-accent)
padding-left: 20px
font: Playfair Display italic 1.25rem, color: var(--color-text)
margin: 24px 0
```

### Avatar / badge de template (boîte à outils)
```
width: 40px; height: 40px; border-radius: 50%
background: alterner var(--color-accent-soft) / var(--color-accent-soft-2)
display: flex; align-items: center; justify-content: center
Lettre: Playfair Display 1rem 500, color: var(--color-text)
```

### Ligne "Dupliquer" (template)
```
display: flex; align-items: center; gap: 20px; padding: 20px 0
border-bottom: 1px solid var(--color-border)
Titre: Playfair Display 1.1rem 500
Description: Inter 0.875rem, color: var(--color-text-muted); margin-right: auto
Lien "Dupliquer ↘": Inter 0.8rem 600, color: var(--color-accent)
```

### Checklist (projet final)
```
Case cochée:
  width: 22px; height: 22px; border-radius: 6px
  background: var(--color-success); display: flex; center
  icône "✓" color: var(--color-text-inverse), 0.8rem
Case non cochée:
  width: 22px; height: 22px; border-radius: 6px
  background: transparent; border: 1.5px solid var(--color-border)
Texte de la tâche: Inter 0.9rem, color: var(--color-text)
Ligne: display flex; align-items center; gap 12px; padding 12px 0
```

### Barre de progression avec label (ex. "4 / 6")
```
Ligne label: display flex; justify-content space-between; margin-bottom 8px
  "Progression" Inter 0.8rem color text-muted
  "4 / 6" Playfair Display italic 1.1rem color text
Piste: height 6px; border-radius 999px; background var(--color-surface-2)
Remplissage: background var(--color-accent); border-radius 999px
```

### Accordéon FAQ
```
Ligne question: display flex; justify-content space-between; align-items center
  padding: 20px 0; border-bottom: 1px solid var(--color-border)
Question: Inter 0.95rem 500, color: var(--color-text)
Icône "+" : color: var(--color-accent), rotate 45deg quand ouvert (→ "×")
Réponse (ouverte): Inter 0.9rem, color: var(--color-text-muted), padding-top 12px
```

### Card CTA inversée (ex. "Encore besoin d'aide ?")
```
background: var(--color-surface-inverse)
color: var(--color-text-inverse)
border-radius: 20px; padding: 24px
Titre: Playfair Display 1.15rem 500
Lien: Inter 0.85rem, color: rgba(255,252,247,0.75), icône "→"
```

### Card score / test final
```
background: var(--color-surface); border-radius: 24px; padding: 32px
Eyebrow: "DERNIÈRE ÉTAPE" — color accent
Titre: Playfair Display 1.5rem 500
Meta (nb questions · durée · résultat): Inter 0.85rem color text-muted
Ligne séparée par border-top var(--color-border), padding-top 16px:
  "Score conseillé" Inter 0.8rem color text-muted
  "80 %" Playfair Display italic 1.4rem color text — aligné à droite
Bouton primaire pleine largeur en bas
```

---

## 5. Layout Principles

- **Largeur max du contenu** : 1120px, centré avec `margin: 0 auto`.
- **Padding latéral** : `64px` desktop → `24px` mobile.
- **Grille hero** : texte à gauche (ratio ~55%) / carte visuelle à droite (~45%),
  gap `64px` ; empilé en colonne sur mobile.
- **Grille "Avant / Après"** : deux colonnes égales séparées par une flèche
  centrale ; empilée en colonne sur mobile (flèche masquée ou tournée à 90°).
- **Eyebrow → Titre → Sous-titre** : toujours dans cet ordre, gap `12px` entre eux.
- **Sections** : séparées par `padding: 80px 0` ; `48px` sur mobile.
- **Listes (modules, sidebar, templates, FAQ)** : toujours dans une colonne
  unique avec séparateurs `--color-border`, jamais de grille de cards pour ces
  contenus séquentiels.

---

## 6. Depth & Elevation

| Niveau | Usage | Valeur |
|--------|-------|--------|
| 0 | Fond page | `--color-bg` |
| 1 | Cards claires (hero, sidebar, FAQ, checklist) | `--color-surface` + `box-shadow: 0 4px 24px rgba(51,29,25,0.05)` |
| 2 | Piste de progress bar, hover de surface | `--color-surface-2` |
| 3 | Nav fixe | `box-shadow: 0 1px 0 var(--color-border)` |
| 4 | Panneaux inversés (Après, CTA aide) | `--color-surface-inverse`, sans ombre |
| 5 | Bouton au hover | `background: var(--color-accent-hover)` |

Aucun overlay d'image en hero : le visuel de la carte (photo du journal
d'apprentissage) reste net, sans dégradé sombre superposé.

---

## 7. Do's and Don'ts

**✅ Do**
- Utiliser exclusivement les couleurs de la palette définie en section 2.
- Garder un seul bouton primaire visible par section.
- Faire alterner `--color-accent-soft` et `--color-accent-soft-2` sur les
  avatars de templates, jamais deux badges identiques consécutifs.
- Afficher la progression (globale ou par module) toujours avec le même
  composant piste/remplissage défini en section 4.
- Utiliser Playfair Display uniquement pour les titres, citations et nombres
  mis en avant (jamais pour les paragraphes ou les libellés d'interface).
- Garder les emojis tels quels comme pictogrammes de section (🏠 👥 📚 🚀 📅 ❓ 🆘).

**❌ Don't**
- Ne jamais utiliser `#ffffff` pur comme fond ou comme texte.
- Ne jamais ajouter de couleur hors palette.
- Ne jamais utiliser de grille de cards pour les modules, la sidebar ou la FAQ
  — toujours une liste à séparateurs.
- Ne jamais utiliser un `border-radius` < 6px sur les composants interactifs.
- Ne jamais utiliser un `outline` navigateur par défaut sur focus — le
  remplacer par un `box-shadow` visible en `--color-accent`.
- Ne jamais déclencher de `<form action>` — toute soumission (quiz, checklist)
  est gérée en JS.
- Ne jamais utiliser d'animation > 250ms (l'interface doit rester posée, pas lente).

---

## 8. Responsive Behavior

| Breakpoint | Comportement |
|------------|-------------|
| ≥ 1024px | Grilles à deux colonnes (hero, Avant/Après, cas pratique + sidebar), padding latéral 64px |
| 768px–1023px | Colonnes empilées, sidebar sous le contenu, padding 40px |
| < 768px | Une seule colonne partout, nav hamburger, padding 24px, H1 hero 2rem |

**Nav mobile** : le bouton hamburger (☰) remplace les liens ; la barre de
progression reste visible, compactée. Clic → menu overlay `--color-surface`
plein écran, liens verticaux, fermeture par ✕.

**Modules et listes sidebar** : sur mobile, le bouton "Commencer" passe sous
le titre/description (plus à droite), la mini progress bar reste au-dessus du
bouton.

**Bloc Avant/Après** : empilé verticalement sur mobile, flèche remplacée par
une flèche pointant vers le bas entre les deux cards.

---

## 9. Agent Prompt Guide

**Instruction obligatoire pour Claude** : lire ce fichier (`DESIGN.md`) en
entier avant tout travail sur le style, les composants, ou le CSS. Ne jamais
dériver de la palette de la section 2. Ne jamais inventer une couleur, une
taille ou un radius absent de ce fichier.

Checklist avant chaque commit CSS :
- [ ] Toutes les couleurs sont des variables CSS `var(--color-*)`.
- [ ] Aucune couleur hardcodée hors des déclarations `:root {}`.
- [ ] Les titres utilisent `--font-display` (Playfair Display), jamais le corps de texte.
- [ ] Les listes séquentielles (modules, sidebar, FAQ, templates) utilisent des
      séparateurs `--color-border`, pas des cards en grille.
- [ ] Les hover states utilisent `transition` (jamais de changement brutal).
- [ ] Le responsive suit les breakpoints de la section 8.
- [ ] Aucun `outline: none` seul — toujours accompagné d'un `box-shadow` focus visible.

Ordre de priorité en cas de conflit : `DESIGN.md` > maquette PNG > intuition de Claude.

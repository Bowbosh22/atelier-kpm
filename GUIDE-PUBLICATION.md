# Guide de publication — l'Atelier KPM sur GitHub Pages

Suis ces étapes dans l'ordre. Ton site Cyrflo n'est **jamais** touché : c'est un dépôt totalement séparé.

---

## Ce que tu as reçu

Un dossier `atelier-kpm-github/` contenant :
- `index.html` — ta landing page (déjà renommée pour GitHub Pages)
- `tarifs.html` — la grille tarifaire
- `demos/` — les 5 démos, avec les liens du portfolio déjà connectés
- `README.md`

Tous les liens sont déjà câblés : la section Réalisations de la landing page ouvre chaque démo, et les démos renvoient vers la landing.

---

## Étape 1 — Créer le dépôt sur GitHub

1. Va sur github.com (connecté au compte **bowbosh22**)
2. Clique sur le bouton **+** en haut à droite → **New repository**
3. Repository name : **atelier-kpm**
4. Laisse **Public** coché
5. Ne coche PAS "Add a README" (tu en as déjà un)
6. Clique **Create repository**

Laisse la page ouverte, tu en auras besoin à l'étape 3.

---

## Étape 2 — Envoyer les fichiers

### Option A — Sans terminal (le plus simple)

1. Sur la page de ton nouveau dépôt vide, clique sur le lien **uploading an existing file**
2. Glisse-dépose **tout le contenu** du dossier `atelier-kpm-github` (le fichier `index.html`, `tarifs.html`, `README.md` ET le dossier `demos`)
3. En bas, dans "Commit changes", écris : `Ajout site Atelier KPM avec démos`
4. Clique **Commit changes**

> Note : quand tu glisses le dossier `demos`, GitHub garde bien la structure. Vérifie après upload que tu vois bien `demos/restaurant.html` etc.

### Option B — Avec le terminal

Depuis le dossier `atelier-kpm-github` :

```bash
git init
git add .
git commit -m "Ajout site Atelier KPM avec démos"
git branch -M main
git remote add origin https://github.com/bowbosh22/atelier-kpm.git
git push -u origin main
```

---

## Étape 3 — Activer GitHub Pages

1. Sur ton dépôt → onglet **Settings** (en haut)
2. Menu de gauche → **Pages**
3. Sous **Source** : choisis **Deploy from a branch**
4. Sous **Branch** : sélectionne **main** puis **/ (root)** → clique **Save**
5. Attends 1 à 2 minutes

Ton site sera en ligne à :
```
https://bowbosh22.github.io/atelier-kpm/
```

Les démos seront accessibles à :
```
https://bowbosh22.github.io/atelier-kpm/demos/restaurant.html
```
(et pareil pour hotel, formation, dentaire, dashboard)

---

## Vérification finale

Ouvre `https://bowbosh22.github.io/atelier-kpm/` et vérifie :
- La landing page s'affiche
- La section "Réalisations" montre les 6 cartes
- Cliquer sur une carte ouvre bien la démo correspondante
- Le bouton retour / logo de la démo ramène à la landing

Si une démo ne s'ouvre pas : vérifie que le dossier `demos` a bien été uploadé avec ses 5 fichiers.

---

## Pour modifier plus tard

- **Sans terminal** : va sur le fichier dans GitHub, clique sur l'icône crayon, modifie, commit.
- **Avec terminal** : modifie en local, puis `git add .` → `git commit -m "ma modif"` → `git push`.

GitHub Pages met à jour le site automatiquement après chaque push, en 1-2 minutes.

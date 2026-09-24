# 🍄 Super Saut 3D

Un jeu de plateforme 3D façon Mario, jouable dans le navigateur. Tout tient dans un seul fichier `index.html` (Three.js chargé depuis un CDN, aucune installation).

## Jouer

Ouvrir `index.html` dans un navigateur récent (connexion Internet nécessaire au premier chargement pour Three.js).

| Action | Clavier | Mobile |
| --- | --- | --- |
| Se déplacer | ZQSD / WASD / flèches | joystick à gauche |
| Sauter (maintenir = plus haut) | Espace | bouton SAUT |
| Courir | Maj | pousser le joystick à fond |
| Tourner la caméra | glisser la souris, A / E (Q / E en QWERTY) | glisser sur la moitié droite |
| Pause | Échap | — |

## Contenu du niveau 1-1

- Blocs **?** : pièce, champignon rouge (Super : encaisse un coup) ou champignon vert (1-UP).
- Briques qui rebondissent et éjectent les ennemis posés dessus.
- **Grognons** à écraser en leur sautant dessus (maintenir Espace pour rebondir plus haut).
- Tuyaux, escaliers, trous, plateformes mobiles.
- Deux points de contrôle, puis l'escalier final, le drapeau (plus tu le touches haut, plus le bonus est gros) et le château.
- **Triple saut** : enchaîner les sauts juste à l'atterrissage en courant.
- 100 pièces = 1 vie. Sons synthétisés en direct (Web Audio).

## Technique

- Three.js 0.160 (module ES via importmap), textures dessinées sur canvas.
- Collisions AABB par axe, physique à pas fixe (1/60 s) pour un comportement identique quelle que soit la fréquence d'images.

# 🐻 Cozy Bear Island — Le jardin des découvertes

Une aventure paisible et éducative en HTML5 Canvas, sans framework ni dépendance. Le joueur explore, observe et fait pousser un tournesol pour construire un coin de lecture avec Lili.

## Jouer

Ouvrir `index.html` dans un navigateur moderne. Le jeu fonctionne sans connexion ; les liens documentaires du carnet nécessitent Internet.

- Clavier : WASD / flèches, Maj pour sprinter, E pour interagir (et ferrer à la pêche), F pour manger un fruit, C pour contempler, Échap pour ranger la canne.
- Mobile : pavé directionnel ou glissement sur le terrain, bouton d’action contextuel, 💨 à maintenir pour sprinter, 🗺️ pour la carte. Marcher range la canne à pêche.
- 📖 Carnet : relire les découvertes et leurs sources.
- 🌻 Projet : consulter les étapes du jardin de Lili.
- 📋 et 🎒 : panneaux repliables sur mobile.
- 🔊 Son : coupe ou rétablit la musique et les effets (choix mémorisé).
- Les panneaux de lecture mettent la simulation en pause. Échap ou × pour fermer.

## Parcours éducatif

1. Semer le tournesol dans la jardinière à droite de la cabane.
2. Comparer un emplacement ombragé avec un emplacement ensoleillé, vérifier l’humidité de la terre puis arroser si nécessaire.
3. Explorer les pommiers : Gala, Golden Delicious et Granny Smith ont des couleurs et des caractéristiques différentes. Une première récolte ajoute une fiche au carnet.
4. Observer les étapes graine, pousse, bouton et fleur. La pluie humidifie aussi la terre. Répéter l’arrosage sur une terre déjà humide n’apporte aucun bonus.
5. Après la floraison et les trois découvertes de pommes, réunir 5 bois et 20 pièces. Rejoindre le panneau 🌻 au nord du pont, sur la rive du village, pour construire le coin de lecture.
6. Lili rejoint le banc ; le tournesol est installé à proximité. Une lanterne à 50 pièces chez Pépé permet d’éclairer le jardin la nuit.

Le carnet comprend sept découvertes persistantes. La progression récompense l’observation et les gestes adaptés, sans note, sanction ni obligation de revenir chaque jour.

### Nature réelle et simplifications du jeu

La croissance dure environ 90 secondes de simulation active dans les conditions favorables du jeu. Dans la réalité, le développement d’un tournesol jusqu’à la floraison prend des semaines à des mois. Le jeu le signale dans le jardin et le carnet. Le modèle d’humidité et le choix soleil/ombre sont pédagogiques et simplifiés : ils ne simulent pas les saisons, la température, les différences de sol ou toutes les conditions horticoles. Les dessins sont stylisés.

Textes rédigés en français à partir de ces références consultées le 15 septembre 2026 :

- [Gala — New York Apple Association](https://www.applesfromny.com/varieties/gala/)
- [Golden Delicious — New York Apple Association](https://www.applesfromny.com/varieties/golden-delicious/)
- [Granny Smith — New York Apple Association](https://www.applesfromny.com/varieties/granny-smith/)
- [Semer et cultiver un tournesol — Royal Horticultural Society](https://www.rhs.org.uk/education-learning/children-young-people/family-activities/grow-it/sunflower)
- [Observer la terre et arroser — Royal Horticultural Society](https://www.rhs.org.uk/garden-jobs/watering)

## La grande île

L’île est environ sept fois plus vaste qu’à l’origine, avec une côte découpée et des régions distinctes :

- forêt de pins à l’ouest, avec champignons et lucioles la nuit ;
- falaises au nord, d’où tombe une cascade dans un lac bordé de roseaux et de nénuphars ;
- verger de cerisiers et phare à rayures au nord-est et à l’est ;
- champ de lavande au sud-est ;
- plage de sable, coquillages, crabes et ponton avec sa barque au sud ;
- trois ponts, des chemins de terre et des réverbères qui s’allument au crépuscule.

Une carte (en haut à droite, ou 🗺️ sur mobile) situe l’ours et la prochaine lanterne de la course.

### À contempler

- Éclairage jour/nuit : aube rosée, coucher de soleil doré, nuit bleutée où les fenêtres, réverbères, lucioles et le faisceau tournant du phare creusent de vrais halos de lumière.
- Mer animée : reflets scintillants, hauts-fonds turquoise, écume qui respire le long de la côte.
- Cascade avec embruns, fontaine du village, fumée de cheminée, ombres de nuages qui glissent sur l’île.
- Arc-en-ciel après la pluie, étoiles filantes la nuit.
- Mode contemplation (🌅, C, le phare ou le banc face à la cascade) : la caméra recule, un ciel panoramique apparaît avec soleil ou lune, étoiles, nuages et parfois une aurore ; le temps défile dix fois plus vite.
- Les arbres devant l’ours deviennent translucides.

### Action

- Défi de Milo (panneau 🏁 près de Milo) : passer par 9 lanternes réparties sur l’île en moins de 55 secondes. Une flèche au bord de l’écran indique la suivante. Récompense selon le temps restant, record mémorisé.
- Sprint : Maj ou 💨.
- Album photo : 8 espèces (Machaon, Paon-du-jour, Citron, Azuré, crabe, grenouille, luciole, mouette), chacune avec ses heures et son lieu. Les papillons s’envolent si l’on arrive trop près ou en sprintant, les crabes s’enfouissent, les grenouilles plongent, les mouettes s’envolent. Première photo d’une espèce : 20 pièces.
- Étoile filante : appuyer sur E pendant son passage pour faire un vœu (pièces, pommes ou énergie).
- Coquillages à ramasser sur la plage (12 pièces chez Pépé), renouvelés à l’aube.

## Autres fonctionnalités

- Météo dynamique : beau temps, nuages, pluie et orage.
- Cycle jour/nuit et renouvellement des activités à l’aube.
- Fruits, bois, fleurs, pêche et échanges avec les habitants.
- Pêche d’adresse : un curseur va et vient ; il faut ferrer quand il passe dans la zone verte. Un échec laisse le coin de pêche disponible. La pluie et la canne souple élargissent la zone.
- Demandes du jour : à chaque aube, Lili, Milo et Noisette demandent quelques fruits, poissons, fleurs ou bois (le bois seulement après la construction du coin de lecture). Leur parler avec les objets dans le sac livre la demande : pièces et un cœur d’amitié (5 au maximum). L’amitié rend les petits cadeaux plus fréquents.
- Les voisins varient leurs répliques et gardent leurs conseils tant qu’ils sont utiles à la progression.
- Outils chez Pépé : canne à pêche souple (60 pièces) et panier d’osier (45 pièces, une pomme de plus par récolte).
- La marche et la discussion ne consomment pas d’énergie. Récolter (4), pêcher (6) et cueillir (1) en demandent : sous ce seuil, le jeu invite à manger une pomme ou à faire une sieste.
- Collisions : les troncs, les voisins et la cabane ne se traversent plus.
- Musique d’ambiance générée (gamme pentatonique), plus grave la nuit et plus discrète sous la pluie.
- Pépé ouvre un comptoir : chaque vente porte sur un objet choisi, sans vider automatiquement le sac.
- Sauvegarde automatique, après les interactions et à la mise en arrière-plan.
- Interface responsive, boutons nommés, dialogues fermables au clavier, retour haptique si disponible, préférence de mouvements réduits pour les transitions CSS.

## Sauvegardes

La sauvegarde (format 4) utilise toujours la clé `cozyBearIsland_v3` et y ajoute les amitiés, les demandes du jour et les outils achetés ; les sauvegardes v3 existantes restent lisibles. La version 3 utilise `cozyBearIsland_v3` dans le stockage local du navigateur. En l’absence d’une sauvegarde v3, elle reprend `cozyBearIsland_v2` et conserve cette ancienne entrée. L’inventaire, les pièces, la météo et la journée sont repris ; la nouvelle aventure éducative commence avec son accueil.

Le carnet, la plante, les constructions et la disposition des fleurs sont sauvegardés. La génération initiale des fleurs est désormais déterministe. Les anciennes sauvegardes v2 ne contenaient pas leurs coordonnées : leur disposition exacte ne peut pas être reconstruite.

La progression reste propre au navigateur et à l’origine du jeu. Il n’y a pas de synchronisation entre appareils.

## Vérifications

Depuis le dossier du projet :

```sh
node --test tests/nature.test.cjs
```

Trente et un tests sans dépendance (Node 18+) couvrent le démarrage et la pause, les conditions de croissance, la pluie, les découvertes, les ventes sélectives, le paiement unique de la construction et des outils, les demandes des voisins et l’amitié, le renouvellement à l’aube, la pêche d’adresse, l’énergie, les collisions, la restauration de sauvegarde, la migration v2, la marche et les valeurs invalides, ainsi que la grande île (zones interdites, ponts, ponton), le décor, le sprint, la course, l’album photo, les coquillages, la contemplation et les vœux.

Ces tests exécutent le script avec un DOM et un Canvas simulés : ils ne remplacent pas un essai visuel et tactile sur appareil réel. Des captures Chromium (bureau 1280 px et téléphone 390 px) ont été vérifiées pour la pêche, les demandes et l’étal ; un essai tactile sur appareil réel reste à faire.

## Crédits

Fait pour les moments calmes, la curiosité et le plaisir d’apprendre.

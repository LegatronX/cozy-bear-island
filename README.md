# 🐻 Cozy Bear Island — Le jardin des découvertes

Une aventure paisible et éducative en HTML5 Canvas, sans framework ni dépendance. Le joueur explore, observe et fait pousser un tournesol pour construire un coin de lecture avec Lili.

## Jouer

Ouvrir `index.html` dans un navigateur moderne. Le jeu fonctionne sans connexion ; les liens documentaires du carnet nécessitent Internet.

- Clavier : WASD / flèches, E pour interagir, F pour manger un fruit.
- Mobile : pavé directionnel ou glissement sur le terrain, bouton d’action contextuel.
- 📖 Carnet : relire les découvertes et leurs sources.
- 🌻 Projet : consulter les étapes du jardin de Lili.
- 📋 et 🎒 : panneaux repliables sur mobile.
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

## Autres fonctionnalités

- Météo dynamique : beau temps, nuages, pluie et orage.
- Cycle jour/nuit et renouvellement des activités à l’aube.
- Fruits, bois, fleurs, pêche et échanges avec les habitants.
- La marche ne consomme plus d’énergie et ne ralentit plus lorsque la jauge est basse. Les activités conservent leurs coûts ; fruits et repos restaurent l’énergie.
- Pépé ouvre un comptoir : chaque vente porte sur un objet choisi, sans vider automatiquement le sac.
- Sauvegarde automatique, après les interactions et à la mise en arrière-plan.
- Interface responsive, boutons nommés, dialogues fermables au clavier, retour haptique si disponible, préférence de mouvements réduits pour les transitions CSS.

## Sauvegardes

La version 3 utilise `cozyBearIsland_v3` dans le stockage local du navigateur. En l’absence d’une sauvegarde v3, elle reprend `cozyBearIsland_v2` et conserve cette ancienne entrée. L’inventaire, les pièces, la météo et la journée sont repris ; la nouvelle aventure éducative commence avec son accueil.

Le carnet, la plante, les constructions et la disposition des fleurs sont sauvegardés. La génération initiale des fleurs est désormais déterministe. Les anciennes sauvegardes v2 ne contenaient pas leurs coordonnées : leur disposition exacte ne peut pas être reconstruite.

La progression reste propre au navigateur et à l’origine du jeu. Il n’y a pas de synchronisation entre appareils.

## Vérifications

Depuis le dossier du projet :

```sh
node --test tests/nature.test.cjs
```

Dix tests sans dépendance couvrent le démarrage et la pause, les conditions de croissance, la pluie, les découvertes, les ventes sélectives, les conditions et le paiement unique de la construction, la lanterne, la restauration v3, la migration v2, la marche et les valeurs invalides de sauvegarde.

Ces tests exécutent le script avec un DOM et un Canvas simulés : ils ne remplacent pas un essai visuel et tactile sur appareil réel. L’ouverture du serveur local a été bloquée par le navigateur distant lors de cette révision ; la validation visuelle iPhone reste à effectuer.

## Crédits

Fait pour les moments calmes, la curiosité et le plaisir d’apprendre.

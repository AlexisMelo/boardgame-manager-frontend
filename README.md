_Ce readme traite à la fois des projets [Boardgame Manager (frontend)](https://github.com/AlexisMelo/boardgame-manager-frontend) et [Boardgame Manager (backend)](https://github.com/AlexisMelo/boardgame-manager-backend)_

# Boardgame Manager (frontend)

Boardgame manager est un site web proposant une multitude de petits “modules” permettant de simuler des jeux de société en réseau. Aucune règle du jeu n'est imposée, nous mettons uniquement à disposition les outils aux joueurs, c’est à eux de jouer comme ils l’auraient fait dans la vie réelle. 

L’objectif principal est de modéliser une table “bac à sable” vue du dessus et de pouvoir manipuler les objets en 2.5d comme dans l’exemple suivant : https://brm.io/matter-js/demo/#mixed (gravité à 0 dans les paramètres à droite pour un meilleur rendu).

## Cahier des charges de base

## Conception

En amont du projet, l'équipe a essayé de représenter sous forme de diagramme l'entiereté des types d'objets pouvant être utilisés lors d'une partie de jeux de société. L'objectif est d'avoir une vue exhaustive des objets à implémenter par la suite et anticiper toutes les interactions possible entre l'utilisateur et le système. 

Le résultat se trouve dans le diagramme suivant : 


D'autres diagrammes complémentaires ayant mené à ce résultat sont aussi disponibles dans le dossier suivant et témoignent du travail de réflexion mené par l'équipe. De plus, ils peuvent donner des pistes d'amélioration pour le diagramme final introduit précédemment de part leur nombre et la diversité des points de vue représentés qui ont pu être bridés lors de la mise en commun : 


## Technologies utilisées

### VueJS

### Node.JS & Express

### Socket.io

### Fabric.js

## Installation et lancement de l'application

### Installation des dépendances
```
npm install
```

### Compilation et hot-reload (pour developpement)
```
npm run serve
```

### Compilation et minification (pour production)
```
npm run build
```

### Configuration (Vue)
See [Configuration Reference](https://cli.vuejs.org/config/).

## Utilisation de l'application

## Bugs connus

## Pistes d'amélioration

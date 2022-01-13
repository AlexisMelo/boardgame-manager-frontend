_Ce readme traite à la fois des projets [Boardgame Manager (frontend)](https://github.com/AlexisMelo/boardgame-manager-frontend) et [Boardgame Manager (backend)](https://github.com/AlexisMelo/boardgame-manager-backend)_

# Boardgame Manager (frontend)

Boardgame manager est un site web proposant une multitude de petits “modules” permettant de simuler des jeux de société en réseau. Aucune règle du jeu n'est imposée, nous mettons uniquement à disposition les outils aux joueurs, c’est à eux de jouer comme ils l’auraient fait dans la vie réelle. 

L’objectif principal est de modéliser une table “bac à sable” vue du dessus et de pouvoir manipuler les objets en 2.5d comme dans l’exemple suivant : https://brm.io/matter-js/demo/#mixed (gravité à 0 dans les paramètres à droite pour un meilleur rendu).

## Cahier des charges de base

Avant le début du projet, nous avions établi un cahier des charges listant les objectifs du projet et des pistes de fonctionnalités à implémenter.
Ce cahier des charges est accessible directement au format pdf en [cliquant ici]()

## Conception

En amont du projet, l'équipe a essayé de représenter sous forme de diagramme l'entiereté des types d'objets pouvant être utilisés lors d'une partie de jeux de société. L'objectif est d'avoir une vue exhaustive des objets à implémenter par la suite et anticiper toutes les interactions possible entre l'utilisateur et le système. 

Le résultat se trouve dans le diagramme suivant : 


D'autres diagrammes complémentaires ayant mené à ce résultat sont aussi disponibles dans le dossier suivant et témoignent du travail de réflexion mené par l'équipe. De plus, ils peuvent donner des pistes d'amélioration pour le diagramme final introduit précédemment de part leur nombre et la diversité des points de vue représentés qui ont pu être bridés lors de la mise en commun : 


## Technologies utilisées

### VueJS

Tout ce projet a été développé avec VueJS, un framework frontend Javascript. Nous utilisons VueCLI pour gérer des fichiers .vue contenant le Javascript, l'HTML et le CSS de chaque composant. Attention, la version utilisée dans ce projet est **Vue 3.0**.

- Tutoriel Openclassroom VueJS : https://openclassrooms.com/fr/courses/6390311-creez-une-application-web-avec-vue-js (Vue 2)
- Différences entre Vue 2 et 3 : https://v3.vuejs.org/guide/migration/introduction.html#overview
- Documentation officielle de VueJS : https://v3.vuejs.org/guide/introduction.html

### Socket.io

Point essentiel de l'application, socket.io permet d'échanger des messages avec le serveur backend en temps réel et de façon légère. La bibliothèque fonctionne avec des Websocket et est basé sur un système d'évènements.

- Documentation officielle de Socket.io : https://socket.io/
- Documentation sur les websockets : https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API

### Fabric.js

Parmi toutes les solutions étudiées, l'équipe a choisi d'utiliser Fabric.js comme bibliothèque Javascript pour gérer la manipulation d'objets par l'utilisateur. La librarie se base sur le canvas html5 et propose des fonctionnalités de base permettant de : déplacer, sélectionner, ajouter, superposer ou encore tourner des objets dessinés sur le canvas. De plus, la bibliothèque a une documentation détaillée et propose des moyens pour sous-classer les classes de base proposés. 

- Documentation officielle de Fabric.js : http://fabricjs.com/docs/
- Exemples de choses réalisables avec Fabric.js : http://fabricjs.com/demos/
- Tutoriel Fabric.js pour bien démarrer : http://fabricjs.com/articles/

### Node.JS & Express

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

## Autres liens utiles

### CSS

Menu stylé 1 : https://codepen.io/VisionLine/pen/xslIu
Menu stylé 2 : https://codepen.io/barhatsor/pen/YzwxaQV

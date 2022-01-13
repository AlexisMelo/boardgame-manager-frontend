_Ce readme traite à la fois des projets [Boardgame Manager (frontend)](https://github.com/AlexisMelo/boardgame-manager-frontend) et [Boardgame Manager (backend)](https://github.com/AlexisMelo/boardgame-manager-backend)_

# Boardgame Manager (frontend)

Boardgame manager est un site web proposant une multitude de petits “modules” permettant de simuler des jeux de société en réseau. Aucune règle du jeu n'est imposée, nous mettons uniquement à disposition les outils aux joueurs, c’est à eux de jouer comme ils l’auraient fait dans la vie réelle. 

L’objectif principal est de modéliser une table “bac à sable” vue du dessus et de pouvoir manipuler les objets en 2.5d comme dans l’exemple suivant : https://brm.io/matter-js/demo/#mixed (gravité à 0 dans les paramètres à droite pour un meilleur rendu).

Ce projet a été réalisé lors d'un PAO (Projet d'approfondissement et d'ouverture) à l'INSA Rouen Normandie, à l'initiative de 3 élèves : Alexis Melo da Silva, Léo Pacary et Alexandre Vigneron. En cas de reprise du projet ou de toute autre question nous sommes disponibles pour vous répondre par mail à l'adresse Alexis.Robotiik@hotmail.fr.

## Cahier des charges de base

Avant le début du projet, nous avions établi un cahier des charges listant les objectifs du projet et des pistes de fonctionnalités à implémenter.
Ce cahier des charges est accessible directement au format pdf en [**cliquant ici**]().

## Conception

En amont du projet, l'équipe a essayé de représenter sous forme de diagramme l'entiereté des types d'objets pouvant être utilisés lors d'une partie de jeux de société. L'objectif est d'avoir une vue exhaustive des objets à implémenter par la suite et anticiper toutes les interactions possible entre l'utilisateur et le système. 

Le résultat se trouve dans le diagramme suivant : 

![Game_elements_final](https://user-images.githubusercontent.com/24303733/149376978-e6788d8a-aa83-401c-bc86-0502d5098096.png)

D'autres diagrammes complémentaires ayant mené à ce résultat sont aussi disponibles en [**cliquant ici**]() et témoignent du travail de réflexion mené par l'équipe. De plus, ils peuvent donner des pistes d'amélioration pour le diagramme final introduit précédemment de part leur nombre et la diversité des points de vue représentés qui ont pu être bridés lors de la mise en commun.

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

Suivant le choix de Fabric.js comme librairie pour le projet, l'équipe a réalisé un travail de recherche sur des 

### Node.JS & Express

Au niveau du serveur, l'équipe a choisi de partir sur le duo classique Node.JS et Express.

- Documentation officielle de Node : https://nodejs.org/en/docs/
- Documentation officielle d'Express (+ tutoriel) : https://expressjs.com/en/starter/installing.html

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

Un déploiement du logiciel est disponible sur github à l'adresse suivante : https://alexismelo.github.io/boardgame-manager-frontend/#/game/create/Default.

Ce déploiement est mis à jour automatiquement grâce aux Github Actions et Github Pages à chaque commit sur la branche main. Lors de la phase de développement, il est conseillé de lancer le logiciel sur sa propre machine [comme indiqué plus haut](https://github.com/AlexisMelo/boardgame-manager-frontend#installation-et-lancement-de-lapplication). Pour que l'application fonctionne complétement, il faut également [lancer la partie backend du projet](https://github.com/AlexisMelo/boardgame-manager-backend) qui n'est malheureusement pas possible d'héberger avec github pages.  

Lorsqu'on arrive sur la page principale, il est possible de rejoindre une partie en cours ou bien d'en créer une nouvelle. Le choix d'un pseudonyme est obligatoire dans les deux cas.

Pour rejoindre une partie, il suffit de renseigner le nom de la partie qui sert d'identifiant et de cliquer sur Join Room, aucune identification n'est requise pour l'instant, et aucune limite de joueurs n'est mise en place non plus. Il n'est pas possible de rejoindre une partie qui n'existe pas.

Pour créer une partie, il faut cliquer sur Create Room. Il n'est pas possible de créer une partie avec un nom qui est déjà pris. Une fois dans l'interface de création de partie, il faut utiliser les boutons à disposition pour placer sur le canvas tous les objets qui seront utiles au jeu. La façon dont ils sont placés dans cette page sera leur vraie position au démarrage de la partie, il ne faut donc pas hésiter à organiser les objets en les répartissant sur tout le plateau comme dans une vraie partie de jeu de société. 

**Remarque** : _A l'heure actuelle, la plupart des boutons disponibles dans l'interface de création de partie donnent des objets hard-codés car nous voulions faciliter la démonstration lors de la dernière séance. Plus d'information dans la partie [pistes d'améliorations](https://github.com/AlexisMelo/boardgame-manager-frontend#pistes-dam%C3%A9lioration)._

Une fois le plateau initialisé, il suffit de cliquer sur le bouton "Démarrer la partie" pour quitter l'interface de création et arriver dans la vraie partie. Une fois dans la vraie partie, les autres joueurs peuvent la rejoindre depuis l'écran d'accueil en renseignant son identifiant, et le jeu est immédiatement jouable. Sur cet écran on peut voir le plateau, un encadré affichant ce qui se passe en temps réel dans la partie, et un indicateur en bas à droite de l'écran indiquant les joueurs connectés et l'état de la socket qui tourne au rouge lorsque le serveur n'est plus accessible.

**Remarque** : _Il existe un bug où, lorsqu'il y a trop d'éléments sur le plateau, la requête envoyée au serveur est trop grosse et est bloquée, ce qui rend la création de partie impossible. Plus d'information dans la partie [bugs connus](https://github.com/AlexisMelo/boardgame-manager-frontend#bugs-connus)._

## Explications du code

## Bugs connus

## Pistes d'amélioration

- Fusionner le backend et le frontend dans une seule application, un tutoriel exemple est disponible à l'adresse suivante : https://vegibit.com/vue-js-express-tutorial/

- Système d'authentification (répercussion sur qui peut rejoindre les parties)

## Autres liens utiles

### CSS

Menu stylé 1 : https://codepen.io/VisionLine/pen/xslIu
Menu stylé 2 : https://codepen.io/barhatsor/pen/YzwxaQV

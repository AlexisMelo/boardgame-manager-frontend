_Ce readme traite à la fois des projets [Boardgame Manager (frontend)](https://github.com/AlexisMelo/boardgame-manager-frontend) et [Boardgame Manager (backend)](https://github.com/AlexisMelo/boardgame-manager-backend)_

# Boardgame Manager (frontend)

Boardgame manager est un site web proposant une multitude de petits “modules” permettant de simuler des jeux de société en réseau. Aucune règle du jeu n'est imposée, nous mettons uniquement à disposition les outils aux joueurs, c’est à eux de jouer comme ils l’auraient fait dans la vie réelle. 

L’objectif principal est de modéliser une table “bac à sable” vue du dessus et de pouvoir manipuler les objets en 2.5d comme dans l’exemple suivant : https://brm.io/matter-js/demo/#mixed (gravité à 0 dans les paramètres à droite pour un meilleur rendu).

Ce projet a été réalisé lors d'un PAO (Projet d'approfondissement et d'ouverture) à l'INSA Rouen Normandie, à l'initiative de 3 élèves : Alexis Melo da Silva, Léo Pacary et Alexandre Vigneron. En cas de reprise du projet ou de toute autre question nous sommes disponibles pour vous répondre par mail à l'adresse Alexis.Robotiik@hotmail.fr.

## Cahier des charges de base

Avant le début du projet, nous avions établi un cahier des charges listant les objectifs du projet et des pistes de fonctionnalités à implémenter.
Ce cahier des charges est accessible directement au format pdf en [**cliquant ici**](https://github.com/AlexisMelo/boardgame-manager-frontend/blob/main/.github/documents/Boardgame_manager_CDC.pdf).

## Conception

En amont du projet, l'équipe a essayé de représenter sous forme de diagramme l'entiereté des types d'objets pouvant être utilisés lors d'une partie de jeux de société. L'objectif est d'avoir une vue exhaustive des objets à implémenter par la suite et anticiper toutes les interactions possibles entre l'utilisateur et le système. 

Le résultat se trouve dans le diagramme suivant : 

![Game_elements_final](https://user-images.githubusercontent.com/24303733/149376978-e6788d8a-aa83-401c-bc86-0502d5098096.png)

D'autres diagrammes complémentaires ayant mené à ce résultat sont aussi disponibles en [**cliquant ici**](https://github.com/AlexisMelo/boardgame-manager-frontend/tree/main/.github/documents) et témoignent du travail de réflexion mené par l'équipe. De plus, ils peuvent donner des pistes d'amélioration pour le diagramme final introduit précédemment de part leur nombre et la diversité des points de vue représentés qui ont pu être bridés lors de la mise en commun.

## Technologies utilisées

### VueJS

Tout ce projet a été développé avec VueJS, un framework frontend Javascript. Nous utilisons VueCLI pour gérer des fichiers .vue contenant le Javascript, l'HTML et le CSS de chaque composant. Attention, la version utilisée dans ce projet est **Vue 3.0**.

- Tutoriel Openclassroom VueJS : https://openclassrooms.com/fr/courses/6390311-creez-une-application-web-avec-vue-js (Vue 2)
- Différences entre Vue 2 et 3 : https://v3.vuejs.org/guide/migration/introduction.html#overview
- Documentation officielle de VueJS : https://v3.vuejs.org/guide/introduction.html

### Socket.io

Point essentiel de l'application, socket.io permet d'échanger des messages avec le serveur backend en temps réel et de façon légère. La bibliothèque fonctionne avec des Websocket et fonctionne avec un système d'évènements.

- Documentation officielle de Socket.io : https://socket.io/
- Documentation sur les websockets : https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API

### Fabric.js

Parmi toutes les solutions étudiées, l'équipe a choisi d'utiliser Fabric.js comme bibliothèque Javascript pour gérer la manipulation d'objets par l'utilisateur. La librarie se base sur le canvas html5 et propose des fonctionnalités de base permettant de : déplacer, sélectionner, ajouter, superposer ou encore tourner des objets dessinés sur le canvas. De plus, la bibliothèque a une documentation détaillée et propose des moyens pour sous-classer les classes de base proposées. 

- Documentation officielle de Fabric.js : http://fabricjs.com/docs/
- Exemples de choses réalisables avec Fabric.js : http://fabricjs.com/demos/
- Tutoriel Fabric.js pour bien démarrer : http://fabricjs.com/articles/

Après le choix de Fabric.js comme librairie pour le projet, l'équipe a réalisé un travail de recherche sur des projets existants mêlant Fabric avec des fonctionnalités en réseau. Le résultat de cette phase de recherche est trouvable dans un pdf en [**cliquant ici**](https://github.com/AlexisMelo/boardgame-manager-frontend/blob/main/.github/documents/Recherches%20_%20Fabric%20et%20R%C3%A9seau.pdf). Les applications trouvées sont majoritairement des "Whiteboard" et utilisent aussi socket.io pour gérer la collaboration en temps réel.

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

Un déploiement du logiciel est disponible sur github à l'adresse suivante : https://alexismelo.github.io/boardgame-manager-frontend/#/.

Ce déploiement est mis à jour automatiquement grâce aux Github Actions et Github Pages à chaque commit sur la branche main. Lors de la phase de développement, il est conseillé de lancer le logiciel sur sa propre machine [comme indiqué plus haut](https://github.com/AlexisMelo/boardgame-manager-frontend#installation-et-lancement-de-lapplication). Pour que l'application fonctionne complétement, il faut également [lancer la partie backend du projet](https://github.com/AlexisMelo/boardgame-manager-backend) qui n'est malheureusement pas possible d'héberger avec github pages.  

Lorsqu'on arrive sur la page principale, il est possible de rejoindre une partie en cours ou bien d'en créer une nouvelle. Le choix d'un pseudonyme est obligatoire dans les deux cas.

Pour rejoindre une partie, il suffit de renseigner le nom de la partie qui sert d'identifiant et de cliquer sur Join Room, aucune identification n'est requise pour l'instant, et aucune limite de joueurs n'est mise en place non plus. Il n'est pas possible de rejoindre une partie qui n'existe pas.

Pour créer une partie, il faut cliquer sur Create Room. Il n'est pas possible de créer une partie avec un nom qui est déjà pris. Une fois dans l'interface de création de partie, il faut utiliser les boutons à disposition pour placer sur le canvas tous les objets qui seront utiles au jeu. La façon dont ils sont placés dans cette page sera leur vraie position au démarrage de la partie, il ne faut donc pas hésiter à organiser les objets en les répartissant sur tout le plateau comme dans une vraie partie de jeu de société. On peut noter qu'à tout moment, il est possible d'enregistrer la configuration actuelle de la partie au format json en cliquant sur "Save" puis de la réutiliser plus tard en cliquant sur "Upload".

**Remarque** : _A l'heure actuelle, la plupart des boutons disponibles dans l'interface de création de partie donnent des objets hard-codés car nous voulions faciliter la démonstration lors de la dernière séance. Plus d'information dans la partie [pistes d'améliorations](https://github.com/AlexisMelo/boardgame-manager-frontend#pistes-dam%C3%A9lioration)._

Une fois le plateau initialisé, il suffit de cliquer sur le bouton "Démarrer la partie" pour quitter l'interface de création et arriver dans la vraie partie. Une fois dans la vraie partie, les autres joueurs peuvent la rejoindre depuis l'écran d'accueil en renseignant son identifiant, et le jeu est immédiatement jouable. Sur cet écran on peut voir le plateau, un encadré affichant ce qui se passe en temps réel dans la partie, et un indicateur en bas à droite de l'écran. Cet indicateur renseigne sur les joueurs connectés et l'état de la socket qui tourne au rouge lorsque le serveur est inaccessible.

**Remarque** : _Il existe un bug où, lorsqu'il y a trop d'éléments sur le plateau, la requête envoyée au serveur est trop grosse et est bloquée, ce qui rend la création de partie impossible. Plus d'information dans la partie [bugs connus](https://github.com/AlexisMelo/boardgame-manager-frontend#bugs-connus)._

## Explications du code

_Pour avoir une bonne compréhension de la structure du code du projet il est conseillé de se référer à la documentation officielle de [VueJS Cli](https://v3.vuejs.org/guide/installation.html#cli) qui a permis de générer l'architecture de base._

Le dossier `src` contenant le code source du projet est divisé selon les sous-dossiers suivants : 

- `assets` : Tous les fichiers statiques du projet. On y retrouve les images, des fonctions javascript réutilisées à plusieurs endroits, ainsi que du SCSS aussi utilisé dans plusieurs composants.
- `components` : Les composants Vue.
- `gameObjects` : Tous les objets javascript relatifs aux jeux de société. A terme, il devrait contenir l'ensemble des objets identifiés lors de la phase de conception.
- `mixins` : Les mixins sont des objets javascript réutilisables pouvant être injectés dans les composants Vue. Plus d'infos https://vuejs.org/v2/guide/mixins.html. 
- `router` : Routage des pages frontend. Plus d'infos https://router.vuejs.org/.
- `store` : Store VueX global à l'application. Plus d'infos https://vuex.vuejs.org/.
- `views` : Composants Vue qui sont considérés comme des pages car utilisés dans `router`.

Parmi les views, on retrouve les trois pages que propose l'application pour l'instant : Home.vue contient la page d'accueil, GameCreate.vue la page de création d'une partie et Game.vue la page obtenue en rejoignant une partie existante.

Pour faire fonctionner Fabric avec Vue, on peut voir, dans GameCreate.vue par exemple, qu'il faut créer une balise html canvas. Ensuite, on récupère cet élément une fois la page chargée (évènement vue mounted) et on l'affecte à une variable dans les data du composant pour rendre le canvas accessible depuis l'entierté de celui-ci et se faciliter la tâche. A chaque nouvel objet fabric créé grâce aux boutons d'initialisation de partie, on peut dessiner sur le canvas en faisant `this.canvas.add(monObject)` puis en demandant le rendu du canvas avec la méthode `canvas.requestRenderAll()`.

Un des gros avantages de Fabric est d'avoir tout une gestion évènementielle sur ce qui se passe dans le canvas. On peut voir à plusieurs reprises dans le code des choses du type `this.canvas.on("object:moving", function)`, cela permet d'intercepter chaque déplacement d'objet sur le canvas et y attribuer un callback. En utilisant à bon escient tous les évènements de Fabric, on peut facilement les transmettre à travers les websockets pour re-effectuer les mêmes modifications sur tous les clients connectés à la partie. C'est comme ça que notre logiciel arrive à avoir une communication en temps-réel.

Point important, pour que tous les objets soient synchronisés à travers les clients, il faut impérativement leur attribuer un id et répercuter les changements en fonction de ce même id sur tous les clients. Pour attribuer un identifiant à un objet, on peut s'inspirer du code présent dans les objets du dossier `src/gameObjects`. Il faut définir l'id dans le constructeur en en générant un par défaut si aucun n'est spécifié, et ne pas oublier d'ajouter cette nouvelle propriété dans la fonction `toObject` de l'objet pour qu'il soit bien transmis à travers le réseau !

## Bugs connus

- Lorsqu'il y a trop d'objets instanciés dans le canvas de la page "Create game", la requête au moment de créer la partie est trop grosse pour être traitée par le serveur, ce qui lance systématiquement une erreur (Request too big). Une piste de résolution est d'instancier les objets normalement, puis cliquer sur "Save objects" pour obtenir le Json et regarder à l'intérieur ce qui pose problème. Généralement, c'est de la faute des images une fois transformées en url : certaines donnent des url normaux (www.domaine.truc/bidule/image.png) tandis que d'autres sont directement encodées en base 64 et prennent une place colossale dans le fichier. On pourrait imaginer corriger ce bug pour avoir un encodage systématique sous forme d'url, mais on pourrait aussi diviser les requêtes si elles sont trop grosses, ou bien trouver un moyen d'augmenter la taille des requêtes autorisées côté serveur.

## Pistes d'amélioration

- La plus grande amélioration possible serait de trouver un moyen pour stocker toutes les images de l'utilisateur sur serveur. En effet, pour l'instant, l'utilisateur ne peut pas enregistrer ses nouvelles images importées car elles ne sont pas stockées en backend. Plusieurs facteurs rendent cette partie compliquée car il y a beaucoup d'images en général dans un jeu de société, donc les stocker coté serveur prendrait beaucoup de place. Il faudrait trouver un moyen pour rendre les images réutilisables entre les utilisateurs ou bien les compresser.
 
- Actuellement, lorsqu'on souhaite créer les objets dans l'interface "Create game", les objets sont hard codés et instanciés avec des images issues du projet frontend peu importe l'input de l'utilisateur. Une première étape serait de supprimer ces mesures qui avaient été mises en place pour une démo et remettre le fonctionnement par défaut. 

- Fusionner le backend et le frontend dans une seule application, un tutoriel exemple est disponible à l'adresse suivante : https://vegibit.com/vue-js-express-tutorial/.

- Réel système d'authentification (et l'étendre sur qui peut rejoindre les parties, mettre un nombre de joueurs maximal par partie, faire des parties privées, ...)

- Réaliser tout ce qui avait été imaginé dans le cahier des charges, ajouter d'autres types d'objets, améliorer ceux existants, ...

## Autres liens utiles

### CSS

- Menu stylé 1 : https://codepen.io/VisionLine/pen/xslIu
- Menu stylé 2 : https://codepen.io/barhatsor/pen/YzwxaQV

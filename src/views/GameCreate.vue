<template>
  <div class="gameCreateContainer">
    <div class="navbar">
      <img
        alt="Back to home page"
        class="homeButton"
        src="@/assets/img/home.png"
        @click="backToHome()"
      />
      <div class="username">{{ this.username }}</div>

      <ButtonCreateDice @newItem="newItem" />
      <ButtonCreateCard @newItem="newItem" />
      <ButtonCreatePiece @newItem="newItem" />
      <ButtonCreateDeck @newItem="newItem" />
      <ButtonCreateImage @newItem="newItem" />

      <button class="save" @click="save">Save</button>
      <label class="upload" for="uploadInput" >Upload</label>
      <input
          id="uploadInput"
          accept="application/json"
          type="file"
          @change="upload"
      />
    </div>
    <canvas id="canvas"></canvas>
    <button class="startGameButton" @click="postCreateRoom">
      Start game with these {{ this.numberOfItems }} items
    </button>
  </div>
  <div id="menu"></div>
</template>

<script>
import { canvasMixin } from "@/mixins/canvasMixin";
import { fabric } from "fabric";
import { mapState } from "vuex";
import { Card } from "@/gameObjects/Card";
import { DiceNumber } from "@/gameObjects/DiceNumber";
import { Piece } from "@/gameObjects/Piece";
import { CardImage } from "@/gameObjects/CardImage";
import { Deck } from "@/gameObjects/Deck";
import { DiceImage } from "@/gameObjects/DiceImage";
import ButtonCreateDice from "@/components/ButtonCreateDice";
import ButtonCreateCard from "@/components/ButtonCreateCard";
import ButtonCreatePiece from "@/components/ButtonCreatePiece";
import ButtonCreateDeck from "@/components/ButtonCreateDeck";
import ButtonCreateImage from "@/components/ButtonCreateImage";

export default {
  name: "GameCreate",
  components: {
    ButtonCreateDice,
    ButtonCreateCard,
    ButtonCreatePiece,
    ButtonCreateDeck,
    ButtonCreateImage
  },
  mixins: [canvasMixin],
  data() {
    return {
      room: this.$route.params.room_id,
      canvas: null,
    };
  },
  computed: {
    ...mapState({ username: "username" }),
    numberOfItems() {
      if (!this.canvas) {
        return 0;
      }
      return this.canvas.getObjects().length - 2;
    },
  },
  mounted() {
    this.canvas = this.getCanvasWithControl();

    let titre = new fabric.Text(`${this.room} : Initialization`, {
      fontFamily: "Comic Sans",
      left: 700,
      top: 400,
      id: "room_init",
      type: "Text",
      selectable: false,
    });

    let subtitle = new fabric.Text(
      `Prepare the room with items before the game starts`,
      {
        fontFamily: "Comic Sans",
        left: 480,
        top: 450,
        id: "room_init_st",
        type: "Text",
        selectable: false,
      }
    );
    this.canvas.add(titre);
    this.canvas.add(subtitle);

    /* Gestion des menus */
    // this.canvas.on("selection:created", (e) => {
    //   const object = e.selected[0];
    //   if (object.getMenu !== undefined) {
    //     object.getMenu(this.canvas).openMenu(true, object.left, object.top);
    //   }
    // });
    this.canvas.on("object:moving", (e) => {
      const object = e.transform.target;
      if (object?.onMoving !== undefined) {
        object.onMoving(this.canvas, e);
      }
    });
    this.canvas.on("mouse:down", (e) => {
      const object = e.target;
      if (object?.onMouseDown !== undefined) {
        object.onMouseDown(this.canvas, e);
      }
    });
    this.canvas.on("selection:cleared", (e) => {
      const object = e.deselected[0];
      if (object?.onDeseleced !== undefined) {
        object.onDeseleced(this.canvas, e);
      }
    });
    this.canvas.on("mouse:dblclick", (e) => {
      const object = e.target;
      if (object?.onDoubleClick !== undefined) {
        object.onDoubleClick(this.canvas);
        this.canvas.renderAll();
      }
    });
  },
  methods: {
    newItem(item) {
      this.canvas.add(item);
      this.canvas.requestRenderAll();
    },
    save() {
      let exportedObjects = this.canvas
        .getObjects()
        .filter(
          (obj) => !(obj.id === "room_init") & !(obj.id === "room_init_st")
        );
      let save = { canvasObjects: exportedObjects };
      let element = document.createElement("a");
      let data =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(save));
      let todayDate = new Date().toLocaleDateString();
      element.style.display = "none";
      element.setAttribute("href", data);
      element.setAttribute(
        "download",
        `Boardgame-Initialization-${this.room}-${todayDate}.json`
      );
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
    upload(event) {
      try {
        let file = event.target.files[0]
        let fr = new FileReader()
        fr.onloadend = (loadedEvent) => {
          let objects = JSON.parse(loadedEvent.target.result)
          this.$toast.success("Items loaded successfully")
          for (const obj of objects.canvasObjects) {
            this.addObjectToCanvas(this.canvas, obj)
          }
        }
        fr.readAsText(file)
      } catch(e) {
        this.$toast.error("Error when loading items")
      }
    },
    backToHome() {
      this.$router.push("/");
    },
    postCreateRoom() {
      let objects = this.canvas
        .getObjects()
        .filter(
          (obj) => !(obj.id === "room_init") & !(obj.id === "room_init_st")
        );
      this.axios
        .post("http://0.0.0.0:3001/room/create", {
          room_name: this.room,
          objects: objects,
        })
        .then(() => {
          this.$router.push(`/game/${this.room}`);
          this.$toast.success("Room created !");
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message);
        });
    },
    createNewCard() {
      let figures = [
        "As",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "Valet",
        "Dame",
        "Roi",
      ];
      let type = ["Carreau", "Pique", "Coeur", "Trèfle"];
      let card = new Card({
        label: `${figures[Math.floor(Math.random() * figures.length)]} de ${
          type[Math.floor(Math.random() * type.length)]
        }`,
        left: 200,
      });
      this.canvas.add(card);
    },
    createNewCardImage() {
      let cardImage = new CardImage({
        srcRecto: require("@/assets/img/to_delete_when_server_side_implemented/ace_spade.png"),
        srcVerso: require("@/assets/img/to_delete_when_server_side_implemented/verso.png"),
        top: 200,
        left: 200,
      });
      this.canvas.add(cardImage);
    },
    createNewPiece() {
      let piece = new Piece({
        src: require("@/assets/img/to_delete_when_server_side_implemented/monopoly/hotel.jpeg"),
        left: 100,
        top: 100,
      });
      this.canvas.add(piece);
    },
    createNewDice() {
      let dice = new DiceNumber({
        left: 100,
        top: 100,
      });
      this.canvas.add(dice);
    },
    createNewDeck() {
      let deck = new Deck({
        left: 100,
        top: 100,
      });
      this.canvas.add(deck);
    },
    createNewDiceImage() {
      let diceImage = new DiceImage({
        listFace: [
          require("@/assets/img/to_delete_when_server_side_implemented/monopoly/hotel.jpeg"),
          require("@/assets/img/to_delete_when_server_side_implemented/ace_spade.png"),
          require("@/assets/img/to_delete_when_server_side_implemented/monopoly/maison.png"),
          require("@/assets/img/to_delete_when_server_side_implemented/monopoly/pions/voiture.png"),
        ],
      });
      this.canvas.add(diceImage);
    },
  },
};
</script>

<style lang="scss">
.navButton {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}

.navButton:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.upload {
  @extend .navButton !optional;
  color: gray;
  background-color: lightgray;
}

.save {
  @extend .navButton !optional;
  color: gray;
  background-color: lightgray;
}
</style>

<style lang="scss" scoped>
.gameCreateContainer {
  margin-left: 10vw;
  margin-right: 10vw;
  background-color: #dfe7fd;
  min-height: 100vh;
  overflow: auto;
}

h1 {
  text-align: center;
  margin-top: 50px;
  color: #a8dadc;
  font-size: 50px;
  z-index: 5000;
}

.navbar {
  z-index: 1;
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  background-color: rgba(125, 204, 206, 0.8);
  padding: 5px;
}

.navbar > * {
  margin-left: 20px;
}

.navbar > *:first-child {
  margin-left: 10px;
}

.username {
  font-size: 30px;
  font-weight: bold;
}

.homeButton {
  height: 30px;
  cursor: pointer;
}

.startGameButton {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.startGameButton:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

#uploadInput {
  display: none;
}
</style>

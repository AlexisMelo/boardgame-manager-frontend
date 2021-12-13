<template>
  <div class="gameCreateContainer">
    <div class="navbar">
      <img alt="Back to home page" class="homeButton" src="@/assets/home.png" @click="backToHome()"/>
      <div class="username">{{ this.username }}</div>
      <ButtonAddShape />
    </div>
    <canvas id="canvas"></canvas>
    <button class="startGameButton" @click="postCreateRoom">Start game with these {{ this.numberOfItems }} items</button>
  </div>
</template>

<script>
import {canvasMixin} from "@/mixins/canvasMixin";
import {fabric} from "fabric";
import {mapState} from "vuex";
import ButtonAddShape from "@/components/ButtonAddShape";

export default {
  name: "GameCreate",
  mixins: [canvasMixin],
  components: {ButtonAddShape},
  data() {
    return {
      room: this.$route.params.room_id,
      canvas: null
    }
  },
  computed: {
    ...mapState({username: "username"}),
    numberOfItems() {
      if (!this.canvas) {
        return 0
      }
      return this.canvas.getObjects().length - 2
    }
  },
  mounted() {
    this.canvas = this.getCanvasWithControl()

    let titre = new fabric.Text(`${this.room} : Initialization`, {
      fontFamily: "Comic Sans",
      left: 700,
      top: 400,
      id: "room_init",
      type: "Text",
      selectable: false
    });
    let subtitle = new fabric.Text(`Prepare the room with items before the game starts`, {
      fontFamily: "Comic Sans",
      left: 480,
      top: 450,
      id: "room_init_st",
      type: "Text",
      selectable: false
    });
    this.canvas.add(titre);
    this.canvas.add(subtitle);

    this.emitter.on("create_card", (card) => {
      this.canvas.add(card);
    });
  },
  methods: {
    backToHome() {
      this.$router.push("/")
    },
    postCreateRoom() {
      this.axios.post("http://0.0.0.0:3001/room/create", {room_name: this.room, objects: this.canvas.getObjects()}).then(() => {
        this.$router.push(`/game/${this.room}`)
        this.$toast.success("Room created !")
      }).catch((error) => {
        this.$toast.error(error.response.data.message)
      })
    }
  }
}
</script>

<style scoped>
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

.navbar > *:not(:first-child) {
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
  background-color: #4CAF50; /* Green */
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
  z-index: 10;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.startGameButton:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>
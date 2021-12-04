<template>
  <button class="button" @click="createNewCard">Add random card</button>
</template>

<script>
import {Card} from "@/gameObjects/Card";

export default {
  name: "ButtonAddShape",
  methods: {
    createNewCard() {
      let figures = ["As", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Valet", "Dame", "Roi"]
      let type = ["Carreau", "Pique", "Coeur", "Trèfle"]
      let card = new Card({
        label: `${figures[Math.floor(Math.random() * figures.length)]} de ${type[Math.floor(Math.random() * type.length)]}`,
        left: 200
      })
      this.emitter.emit("create_card", card)
    }
  }
}
</script>

<style scoped>
.button {
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
}

.button:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>
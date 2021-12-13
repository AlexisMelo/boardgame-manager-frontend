<template>
  <button class="button" @click="createNewDeck">Add random deck</button>
</template>

<script>
import { Deck } from "@/gameObjects/Deck";

export default {
  name: "ButtonAddShape",
  methods: {
    createNewDeck() {
      let deck = new Deck({
        label: `Deck`,
        left: 200,
      });
      this.emitter.emit("create_card", deck);
    },
  },
};
</script>

<style scoped>
.button {
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

.button:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>
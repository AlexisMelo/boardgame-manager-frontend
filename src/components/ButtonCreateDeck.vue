<template>
  <div>
    <button class="navButton" @click="createNewDeck">Add Deck</button>
  </div>
</template>

<script>
import { Deck } from "@/gameObjects/Deck";
import {fabric} from "fabric";

export default {
  emits: ["newItem"],
  name: "ButtonCreateDeck",
  data: function () {
    return {
      min: 0,
      max: 0,
      faces: [],
    };
  },
  mounted() {},
  methods: {
    createNewDeck() {
      fabric.util.loadImage(require("@/assets/img/to_delete_when_server_side_implemented/defaultDeck.png"), (img) => {
        let deck = new Deck(img,  {
          left: 100,
          top: 100
        })
        this.$emit("newItem", deck);
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/modal.scss";
</style>

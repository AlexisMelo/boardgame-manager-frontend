<template>
  <div>
    <button class="navButton" @click="openModal">Add Image</button>

    <div id="createImageModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <span class="close" @click="closeModal">&times;</span>
          <h2>Create Image</h2>
        </div>
        <div class="modal-body">

          <label for="newImageInput">Select an image to add directly to the board</label>
            <input
                id="newImageInput"
                accept="image/*"
                type="file"
            />

          </div>

        <div class="modal-footer">
          <button class="navButton createButton" @click="createNewImage">
            Add image to board
          </button>
        </div>
      </div>
    </div>
  </div>




</template>

<script>
import { Image } from "@/gameObjects/Image";

import modal from "@/assets/js/modal";
const monopolyBoard = require("../assets/img/to_delete_when_server_side_implemented/monopoly/monopoly-classique-plateau.jpg")
const brouette = require("../assets/img/to_delete_when_server_side_implemented/monopoly/pions/brouette.png")
const chapeau = require("../assets/img/to_delete_when_server_side_implemented/monopoly/pions/chapeau.png")
const de_a_coudre = require("../assets/img/to_delete_when_server_side_implemented/monopoly/pions/de_a_coudre.png")
const voiture = require("../assets/img/to_delete_when_server_side_implemented/monopoly/pions/voiture.png")

export default {
  emits: ["newItem"],
  name: "ButtonCreateImage",
  data: function() {
    return {
      modal: null
    }
  },
  mounted() {
    this.modal = document.getElementById("createImageModal");
  },
  methods: {
    openTab(tabName) {
      modal.selectTab(tabName)
    },
    closeModal() {
      modal.closeModal(this.modal)
    },
    openModal() {
      modal.openModal(this.modal)
    },
    createNewImage() {
      console.log(monopolyBoard)
      let images = [
        new Image({
          src: monopolyBoard,
          width: 1241,
          height: 1241
        }),
        new Image({
          src: voiture,
          width: 100,
          height: 56,
          top: 100,
          left: 800
        }),
        new Image({
          src: brouette,
          width: 100,
          height: 71,
          top: 100,
          left: 600
        }),
        new Image({
          src: de_a_coudre,
          width: 100,
          height: 135,
          top: 100,
          left: 400
        }),
        new Image({
          src: chapeau,
          width: 100,
          height: 80,
          top: 100,
          left: 200
        })

      ]

      for (const img of images) {
        this.$emit("newItem", img)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/modal.scss";
</style>
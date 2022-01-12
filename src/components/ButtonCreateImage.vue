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
import { ImageApp } from "@/gameObjects/ImageApp";
import {fabric} from "fabric";

import modal from "@/assets/js/modal";

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
      fabric.util.loadImage(require("@/assets/img/to_delete_when_server_side_implemented/monopoly/monopoly-classique-plateau.jpg"), (img) => {
        let imageApp = new ImageApp(img)
        this.$emit("newItem", imageApp)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/modal.scss";
</style>
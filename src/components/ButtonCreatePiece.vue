<template>
  <button class="navButton" @click="openModal">Add piece</button>

  <div id="createPieceModal" class="modal" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Create piece</h2>
      </div>
      <div class="modal-body">
        <div class="tabButtons">
          <button id="buttonPieceTab" class="selected">Piece</button>
        </div>

        <div id="PieceTab" class="tab">
          <label>Image :</label>
          <input
            id="imagePiece"
            accept="image/*"
            name="faceFile"
            type="file"
            @change="updateImagePiece($event, index)"
          />
        </div>
      </div>
      <div class="modal-footer">
        <button class="navButton createButton" @click="createNewPiece">
          Create the piece
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Piece } from "@/gameObjects/Piece";

export default {
  emits: ["newItem"],
  name: "ButtonCreatePiece",
  data: function () {
    return {
      modal: null,
      min: 0,
      max: 0,
      faces: [],
    };
  },
  mounted() {
    this.modal = document.getElementById("createPieceModal");
  },
  methods: {
    updateImagePiece(event) {
      this.imagePiece = {
        file: event.target.files[0],
        src: URL.createObjectURL(event.target.files[0]),
      };
    },
    closeModal() {
      this.modal.style.display = "none";
    },
    openModal() {
      this.modal.style.display = "block";
    },
    createNewPiece() {
      let piece = new Piece({
        left: 200,
      });
      this.$emit("newItem", piece);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/modal.scss";
</style>
<template>
  <div>
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
  </div>
</template>

<script>
import { Piece } from "@/gameObjects/Piece";
import {fabric} from "fabric";

import modal from "@/assets/js/modal";

export default {
  emits: ["newItem"],
  name: "ButtonCreatePiece",
  data: function () {
    return {
      modal: null
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
      modal.closeModal(this.modal)
    },
    openModal() {
      modal.openModal(this.modal)
    },
    createNewPiece() {
      let nbhouses_hotels = 15
      for (let i = 0; i < nbhouses_hotels; i++) {
        fabric.util.loadImage(require("@/assets/img/to_delete_when_server_side_implemented/monopoly/hotel.png"), (img) => {
          this.$emit("newItem", new Piece(img, {
            top: 400,
            left: 200 + 10*i
          }))
        })
        fabric.util.loadImage(require("@/assets/img/to_delete_when_server_side_implemented/monopoly/maison.png"), (img) => {
          this.$emit("newItem", new Piece(img, {
            top: 500,
            left: 200 + 10*i
          }))
        })
      }

      fabric.util.loadImage(require("@/assets/img/to_delete_when_server_side_implemented/monopoly/pions/brouette.png"), (img) => {
        this.$emit("newItem", new Piece(img))
      })
      fabric.util.loadImage(require("@/assets/img/to_delete_when_server_side_implemented/monopoly/pions/voiture.png"), (img) => {
        this.$emit("newItem", new Piece(img, {
          left: 200
        }))
      })
      fabric.util.loadImage(require("@/assets/img/to_delete_when_server_side_implemented/monopoly/pions/de_a_coudre.png"), (img) => {
        this.$emit("newItem", new Piece(img, {
          left: 300
        }))
      })
      fabric.util.loadImage(require("@/assets/img/to_delete_when_server_side_implemented/monopoly/pions/chapeau.png"), (img) => {
        this.$emit("newItem", new Piece(img, {
          left: 400
        }))
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/modal.scss";
</style>
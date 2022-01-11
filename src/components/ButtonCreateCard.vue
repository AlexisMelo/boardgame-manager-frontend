<template>
  <button class="navButton" @click="openModal">Add card</button>

  <div id="createCardModal" class="modal" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Create card</h2>
      </div>
      <div class="modal-body">
        <div class="tabButtons">
          <button
            id="buttonCardTab"
            class="selected"
            @click="openTab('CardTab')"
          >
            Card
          </button>
          <button id="buttonCardImageTab" @click="openTab('CardImageTab')">
            Card Image
          </button>
        </div>

        <div id="CardTab" class="tab">
          <p>Create a random card from a classic deck.</p>
        </div>

        <div id="CardImageTab" class="tab" style="display: none">
          <label>Image face recto :</label>
          <input
            id="faceRecto"
            accept="image/*"
            name="faceFile"
            type="file"
            @change="updateFace($event, 'recto')"
          />
          <label>Image face verso :</label>
          <input
            id="faceVerso"
            accept="image/*"
            name="faceFile"
            type="file"
            @change="updateFace($event, 'verso')"
          />
        </div>
      </div>
      <div class="modal-footer">
        <button class="navButton createButton" @click="createNewCard">
          Create the card
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Card } from "@/gameObjects/Card";
import modal from "@/assets/js/modal";

export default {
  emits: ['newItem'],
  name: "ButtonCreateCard",
  data: function () {
    return {
      modal: null,
      min: 0,
      max: 0,
      faces: [],
    };
  },
  mounted() {
    this.modal = document.getElementById("createCardModal");
  },
  methods: {
    updateFace(event, face) {
      if (face === "recto") {
        this.faceRecto = {
          file: event.target.files[0],
          src: URL.createObjectURL(event.target.files[0]),
        };
      } else {
        this.faceVerso = {
          file: event.target.files[0],
          src: URL.createObjectURL(event.target.files[0]),
        };
      }
    },
    openTab(tabName) {
      modal.selectTab(tabName)
    },
    closeModal() {
      modal.closeModal(this.modal)
    },
    openModal() {
      modal.openModal(this.modal)
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
      this.$emit("newItem", card);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/modal.scss";
</style>

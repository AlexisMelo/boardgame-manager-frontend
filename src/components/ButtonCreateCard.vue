<template>
  <div>
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
            <button class="navButton createButton" @click="createNewCard">
              Create the card
            </button>
          </div>

          <div id="CardImageTab" class="tab" style="display: none">
            <label>Image face recto :</label>
            <input
              id="faceRecto"
              name="faceFile"
              type="text"
              @change="updateFace($event, 'recto')"
            />
            <label>Image face verso :</label>
            <input
              id="faceVerso"
              name="faceFile"
              type="text"
              @change="updateFace($event, 'verso')"
            />
            <button class="navButton createButton" @click="createImageCard">
              Create the card
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <!--button class="navButton createButton" @click="createImageCard">
            Create the card
          </button-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Card } from "@/gameObjects/Card";
import { CardImage } from "@/gameObjects/CardImage";
import { fabric } from "fabric";

export default {
  emits: ["new"],
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
          file: event.target.value,
          src: event.target.value,
        };
      } else {
        this.faceVerso = {
          file: event.target.value,
          src: event.target.value,
        };
      }
    },
    openTab(tabName) {
      let tabs = document.getElementsByClassName("tab");
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
        document
          .getElementById(`button${tabs[i].id}`)
          .classList.remove("selected");
      }
      document.getElementById(tabName).style.display = "flex";
      document.getElementById(`button${tabName}`).classList.add("selected");
    },
    closeModal() {
      this.modal.style.display = "none";
    },
    openModal() {
      this.modal.style.display = "block";
    },
    createImageCard() {
      for (let i = 1; i < 29; i++) {
        console.log(i);
        fabric.util.loadImage(
          require(`@/assets/img/to_delete_when_server_side_implemented/monopoly/proprietes/p${i}.png`),
          (imgRecto) => {
            fabric.util.loadImage(
              require("@/assets/img/to_delete_when_server_side_implemented/verso.png"),
              (imgVerso) => {
                this.$emit(
                  "newItem",
                  new CardImage(imgRecto, {
                    srcRecto: imgRecto.src,
                    srcVerso: imgVerso.src,
                  })
                );
              }
            );
          }
        );
      }
      for (let i = 1; i < 4; i++) {
        console.log(i);
        fabric.util.loadImage(
          require(`@/assets/img/to_delete_when_server_side_implemented/monopoly/chance/chance${i}.png`),
          (imgRecto) => {
            fabric.util.loadImage(
              require("@/assets/img/to_delete_when_server_side_implemented/monopoly/chance/chanceVerso.png"),
              (imgVerso) => {
                this.$emit(
                  "newItem",
                  new CardImage(imgRecto, {
                    srcRecto: imgRecto.src,
                    srcVerso: imgVerso.src,
                  })
                );
              }
            );
          }
        );
      }
      for (let i = 1; i < 4; i++) {
        console.log(i);
        fabric.util.loadImage(
          require(`@/assets/img/to_delete_when_server_side_implemented/monopoly/caisseCommunaute/cc${i}.png`),
          (imgRecto) => {
            fabric.util.loadImage(
              require("@/assets/img/to_delete_when_server_side_implemented/monopoly/caisseCommunaute/ccVerso.png"),
              (imgVerso) => {
                this.$emit(
                  "newItem",
                  new CardImage(imgRecto, {
                    srcRecto: imgRecto.src,
                    srcVerso: imgVerso.src,
                  })
                );
              }
            );
          }
        );
      }
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

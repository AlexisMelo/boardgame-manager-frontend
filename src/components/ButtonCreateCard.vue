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
          <div class="modal-footer">
            <button class="navButton createButton" @click="createNewCard">
              Create the card
            </button>
          </div>
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
          <div class="modal-footer">
            <button class="navButton createButton" @click="createImageCard">
              Create the card
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Card } from "@/gameObjects/Card";
import { CardImage } from "@/gameObjects/CardImage";

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
      const card = new CardImage({
        srcRecto: this.faceRecto.src,
        srcVerso: this.faceVerso.src,
      });
      this.$emit("newItem", card);
      console.log("CARTE", card);
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

<style>
.selected {
  filter: brightness(90%);
}
</style>

<style lang="scss" scoped>
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 15; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

/* The Close Button */
.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

.modal-body {
  height: 60vh;
}

.modal-footer {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

.tabButtons {
  > button {
    width: 50%;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 20px;
    background-color: lightblue;
    border: none;
    cursor: pointer;

    &:hover {
      filter: brightness(90%);
    }
  }
}

.createButton {
  background-color: #add8e6;
  color: black;
}

.tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tab > * {
  padding: 10px;
  margin: 5px;
}

input {
  text-align: center;
}
</style>

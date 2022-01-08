<template>
  <button class="navButton" @click="createNewPiece">Add Deck</button>
</template>

<script>
import { Deck } from "@/gameObjects/Deck";

export default {
  emits: ["new"],
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
    createNewPiece() {
      let deck = new Deck({
        left: 100,
        top: 100,
      });
      this.$emit("new", deck);
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
  //display: none; /* Hidden by default */
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

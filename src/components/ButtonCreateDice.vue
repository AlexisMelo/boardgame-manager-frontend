<template>
  <button class="navButton" @click="openModal">Add dice</button>

  <div id="createDiceModal" class="modal" @click.self="closeModal">

    <div class="modal-content">
      <div class="modal-header">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Create Dice</h2>
      </div>
      <div class="modal-body">
        <div class="tabButtons">
          <button id="buttonDiceNumberTab" class="selected" @click="openTab('DiceNumberTab')">Dice Number</button>
          <button id="buttonDiceImageTab" @click="openTab('DiceImageTab')">Dice Image</button>
        </div>

        <div id="DiceNumberTab" class="tab">
          <label>Min number: </label><input id="min" v-model="min" type="number">
          <label>Max number : </label><input id="max" v-model="max" type="number">
        </div>

        <div id="DiceImageTab" class="tab" style="display:none">
          <div v-for="(face, index) in faces" :key="index">
            <label :for="`face-${index}`">Face {{ index }}</label>
            <input :id="`face-${index}`" accept="image/*" name="faceFile" type="file"
                   @change="updateFace($event, index)">
            <img v-if="face.src" :src="face.src" alt="zzz" height="50" width="50">
          </div>
          <button @click="newFace">New face</button>

        </div>
      </div>
      <div class="modal-footer">
        <button class="navButton createButton" @click="createNewDice">Create the dice</button>
      </div>
    </div>

  </div>

</template>

<script>
import {DiceNumber} from "@/gameObjects/DiceNumber";

export default {
  emits: ["new"],
  name: "ButtonCreateDice",
  data: function () {
    return {
      modal: null,
      min: 0,
      max: 0,
      faces: []
    }
  },
  mounted() {
    this.modal = document.getElementById("createDiceModal")
  },
  methods: {
    newFace() {
      this.faces.push({file: [], src: false})
    },
    updateFace(event, index) {
      this.faces[index] = {
        file: event.target.files[0],
        src: URL.createObjectURL(event.target.files[0])
      }
    },
    openTab(tabName) {
      let tabs = document.getElementsByClassName("tab")
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none"
        document.getElementById(`button${tabs[i].id}`).classList.remove("selected")
      }
      document.getElementById(tabName).style.display = "flex";
      document.getElementById(`button${tabName}`).classList.add("selected")
    },
    closeModal() {
      this.modal.style.display = "none"
    },
    openModal() {
      this.modal.style.display = "block"
    },
    createNewDice() {
      if ((this.min || this.max) && (this.max > this.min)) {
        let dice = new DiceNumber({
          left: 100,
          top: 100,
          min: this.min,
          max: this.max,
        })
        this.$emit("new", dice)
      }

      if (this.faces) {
        //TODO
        console.log("Faut faire un truc là avec le dé mdr")
      }

    }
  }
}
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
  animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0
  }
  to {
    top: 0;
    opacity: 1
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0
  }
  to {
    top: 0;
    opacity: 1
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
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
  emits: ["newItem"],
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
        this.$emit("newItem", dice)
      }

      if (this.faces) {
        //TODO
        console.log("Faut faire un truc là avec le dé mdr")
      }

    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/modal.scss";
</style>
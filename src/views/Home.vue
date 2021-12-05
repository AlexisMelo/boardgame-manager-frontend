<template>
  <div class="homeContainer">
    <h1>
      Boardgame Manager
    </h1>
    <form class="formJoinRoom">
      <label for="username">
        Username
      </label>
      <input v-model="username" id="username" required type="text"/>

      <label for="room">Room</label>
      <input v-model="room" id="room" required type="text"/>

      <button class="buttonValidation" type="submit" @click.stop.prevent="submit()">
        Join
      </button>

    </form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      room: "Default",
      username: ""
    }
  },
  mounted() {
    if (this.$store.state.username) {
      this.username = this.$store.state.username
    }
  },
  methods: {
    submit() {
      if (!this.username || !this.room) return;
      this.$store.commit("setUsername", this.username)
      this.$router.push(`/game/${this.room}`)
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 50px;
  color: #a8dadc;
  font-size: 50px;
}

input {
  margin-bottom: 50px;
  height: 30px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #457b9d;
  border-radius: 5px;
}

label {
  margin-bottom: 3%;
  font-weight: bold;
  color: #4aacad;
}

.homeContainer {
  margin-left: 10vw;
  margin-right: 10vw;
  background-color: #dfe7fd;
  min-height: 100vh;
  overflow: auto;
}

.formJoinRoom {
  display: flex;
  flex-direction: column;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 25vh;
}

.buttonValidation {
  align-self: center;
  font-size: 20px;
  border: 5px solid #7dccce;
  background-color: #a8dadc;
  color: #4aacad;
  font-weight: bold;
  cursor: pointer;
  padding: 8px 20px;
  border-radius: 5px;
  transition: padding 0.5s ease-out, background-color 0.5s ease-out, color 0.5s ease-out;
}

.buttonValidation:hover {
  color: white;
  background-color: #7dccce;
  padding: 13px 25px;
}
</style>
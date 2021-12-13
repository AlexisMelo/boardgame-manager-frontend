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

      <label for="room">Room's name</label>
      <input v-model="room" id="room" required type="text"/>

      <button class="buttonJoinRoom" type="submit" @click.stop.prevent="joinRoom()">
        Join room
      </button>

      <button class="buttonCreateRoom" type="submit" @click.stop.prevent="createRoom()">
        Create new room
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
    conditionsMet() {
      if (!this.username) {
        this.$toast.error("Username is required")
        return false
      }
      if (!this.room) {
        this.$toast.error("Room name is required")
        return false
      }
      return true
    },
    joinRoom() {
      if (!this.conditionsMet()) return

      this.axios.get(`http://0.0.0.0:3001/room/${this.room}`).then(() => {
        this.$store.commit("setUsername", this.username)
        this.$router.push(`/game/${this.room}`)
      }).catch((error) => {
        this.$toast.error(error.response.data.message)
      })
    },
    createRoom() {
      if (!this.conditionsMet()) return

      this.axios.get(`http://0.0.0.0:3001/room/${this.room}`).then(() => {
        this.$toast.error("Room already exists") //room existe déjà, on autorise pas la création
      }).catch(() => {
        console.log("exist po")
        this.$store.commit("setUsername", this.username)
        this.$router.push(`/game/create/${this.room}`) //room existe pas, on commence la création
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
  font-weight: bold;
  cursor: pointer;
  padding: 8px 20px;
  border-radius: 5px;
  transition: width 0.2s ease-out, background-color 0.2s ease-out, color 0.2s ease-out;
  width: 35%;

  &:hover {
    color: white;
    width: 37%;
  }
}

.buttonJoinRoom {
  @extend .buttonValidation;
  color: #4aacad;
  background-color: #a8dadc;
  border: 5px solid #7dccce;

  &:hover {
    background-color: #7dccce;
  }
}

.buttonCreateRoom {
  @extend .buttonValidation;
  margin-top: 5%;
  color: gray;
  background-color: lightgray;
  border: 5px solid darkgray;

  &:hover {
    background-color: darkgray;
  }
}


</style>
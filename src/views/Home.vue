<template>
  <div class="homeContainer">
    <h1>
      Boardgame Manager
    </h1>
    <form class="formJoinRoom">
      <label for="username">
        Username
      </label>
      <input id="username" v-model="username" required type="text"/>

      <label for="room">Room's name</label>
      <input id="room" v-model="room" required type="text"/>

      <button class="buttonJoinRoom" type="submit" @click.stop.prevent="joinRoom(this.room)">
        Join room
      </button>

      <button class="buttonCreateRoom" type="submit" @click.stop.prevent="createRoom()">
        Create new room
      </button>


    </form>

    <div class="label">Room list</div>

    <div class="roomList" id="roomList">
      <div v-for="room in roomList" :key="room" class="room">
        <div class="roomName">{{ room }}</div>
        <button class="goToRoom" @click="joinRoom(room)">Join</button>
      </div>
      <div v-if="roomList.length === 0" class="noRoom">
        No room yet
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      room: "Default",
      username: "",
      roomList: []
    }
  },
  mounted() {
    if (this.$store.state.username) {
      this.username = this.$store.state.username
    }
    this.updateRoomList()
  },
  methods: {
    updateRoomList() {
      this.axios.get("http://0.0.0.0:3001/rooms").then((response) => {
        this.roomList = response.data.rooms
      })
    },
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
    joinRoom(room) {
      if (!this.conditionsMet()) return

      this.axios.get(`http://0.0.0.0:3001/room/${room}`).then(() => {
        this.$store.commit("setUsername", this.username)
        this.$router.push(`/game/${room}`)
      }).catch((error) => {
        this.$toast.error(error.response.data.message)
      })
    },
    createRoom() {
      if (!this.conditionsMet()) return

      this.axios.get(`http://0.0.0.0:3001/room/${this.room}`).then(() => {
        this.$toast.error("Room already exists") //room existe déjà, on autorise pas la création
      }).catch(() => {
        this.$store.commit("setUsername", this.username)
        this.$router.push(`/game/create/${this.room}`) //room existe pas, on commence la création
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-top: 50px;
  color: #a8dadc;
  font-size: 50px;
}

input {
  height: 30px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #457b9d;
  border-radius: 5px;
}

label, .label {
  margin-top: 3%;
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
  margin-top: 10%;
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

  &:not(:nth-of-type(0)) {
    margin-top: 5%;
  }
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
  color: gray;
  background-color: lightgray;
  border: 5px solid darkgray;

  &:hover {
    background-color: darkgray;
  }
}

.roomList {
  width: 60%;
  margin: auto;
  background-color: #7dccce;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  flex-direction: column;

  * {
    font-size: 18px;
  }

  .room:nth-of-type(even) {
    background-color: #a8dadc;
  }

  .room:nth-of-type(odd) {
    background-color: white;
  }

  .room {
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1%;
    transition: width 0.2s ease-out;

    .goToRoom {
      border-radius: 5px;
      font-weight: bold;
      padding: 5px 20px;
      color: #4aacad;
      background-color: #a8dadc;
      border: 5px solid #7dccce;
      cursor: pointer;
      transition: width 0.2s ease-out, background-color 0.2s ease-out, color 0.2s ease-out;

      &:hover {
        background-color: #7dccce;
      }
    }

    &:hover {
      border-left: 5px solid #7dccce;
      border-right: 5px solid #7dccce;
      width: 100%;
    }
  }
}

</style>
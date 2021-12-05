<template>
  <div class="game">
    <div class="navbar">
      <img alt="Back to home page" class="homeButton" src="@/assets/home.png" @click="backToHome()"/>
      <div class="username">{{ this.username }}</div>
      <ButtonAddShape/>
    </div>
    <FabricCanvas :socket="socket" :room="room"/>
    <div class="containerConnectionInfo">
      <PlayersList :socket="socket"/>
      <div :class="`connectionStatus ${this.socket.connected ? 'connectedStatus' : 'disconnectedStatus'}`"
           :title="connectionStatusText">
      </div>
    </div>
  </div>
</template>

<script>
import FabricCanvas from "@/components/FabricCanvas";
import ButtonAddShape from "@/components/ButtonAddShape";
import {mapState} from "vuex";
import {io} from "socket.io-client/build/esm-debug";
import PlayersList from "@/components/PlayersList";

export default {
  name: 'Home',
  components: {ButtonAddShape, FabricCanvas, PlayersList},
  computed: {
    ...mapState({username: "username"}),
    connectionStatusText() {
      if (this.socket.connected) {
        return "Connection to the server is active"
      }
      return "You are disconnected from the server"
    }
  },
  data() {
    return {
      connected: false,
      socket: null,
      room: this.$route.params.room_id
    }
  },
  created() {
    if (!this.$store.state.username) {
      this.$router.push("/")
    }
    this.socket = this.initializeSocket();
    this.socket.connect()
  },
  unmounted() {
    this.socket.disconnect()
  },
  methods: {
    backToHome() {
      this.$router.push("/")
    },
    initializeSocket() {
      let socket = io("http://0.0.0.0:3000", {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        autoConnect: false,
        forceNew: true,
        query: {
          destinationRoom: this.room
        },
        auth: {
          username: this.username
        }
      })

      socket.on("connect", () => {
        this.$toast.success("Connexion to the server successful", {
          duration: 2000
        })
      })

      socket.on("disconnect", () => {
        this.$toast.error("Disconnected from the server", {
          duration: 2000
        })
      })

      socket.on("connect_error", (err) => {
        if (err.message === "invalid username") {
          this.backToHome()
        }
      })

      socket.on("socket_disconnecting", (data) => {
        this.$toast.warning(`${data.username} left the game`, {
          duration: 2000
        })
      })

      socket.on("socket_connecting", (data) => {
        this.$toast.info(`${data.username} joined the game`, {
          duration: 2000
        })
      })

      return socket
    }
  }
}
</script>

<style scoped>
.navbar {
  z-index: 1;
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  background-color: rgba(125, 204, 206, 0.8);
  padding: 5px;
}

.navbar > *:not(:first-child) {
  margin-left: 20px;
}

.navbar > *:first-child {
  margin-left: 10px;
}

.username {
  font-size: 30px;
  font-weight: bold;
}

.homeButton {
  height: 30px;
  cursor: pointer;
}

.connectionStatus {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  transition: box-shadow 0.3s ease;
}

.connectedStatus {
  box-shadow: 0 0 5px 2px rgba(0, 100, 0, 0.84);
  background-color: rgb(0, 100, 0);
}

.connectedStatus:hover {
  box-shadow: 0 0 10px 5px rgba(0, 100, 0, 0.84);
}

.disconnectedStatus {
  box-shadow: 0 0 5px 2px rgba(255, 0, 0, 0.84);
  background-color: rgb(255, 0, 0);
}

.disconnectedStatus:hover {
  box-shadow: 0 0 10px 5px rgba(255, 0, 0, 0.84);
}

.containerConnectionInfo {
  z-index: 1;
  position: absolute;
  right: 10px;
  bottom: 10px;
  background-color: rgba(125, 204, 206, 0.8);
  padding: 5px;
  display: flex;
  align-items: center;
}

.containerConnectionInfo > *:first-child {
  margin-right: 10px;
}
</style>

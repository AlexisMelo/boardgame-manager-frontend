<template>
  <div class="container" @click="togglePlayersVisibility()">
    <div class="numberOfPlayers"> {{this.numberOfPlayersText}} </div>
    <div v-if="playerListVisible" class="playersList">
      <div v-for="player in this.players" :key="player" class="player">
        {{ player }}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "PlayersList",
  props: {
    socket: {
      type: Object,
      required: true
    },
    room: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      players: new Set(),
      playerListVisible: false
    }
  },
  created() {
    this.extendSocket();
  },
  mounted() {
    this.players.add(this.$store.state.username)
    this.socket.emit("init-players", {room: this.room})
  },
  computed: {
    numberOfPlayersText() {
      if (this.socket.connected) {
        return `${this.players.size} Player${this.players.size > 1 ? "s": ""}`
      }
      return "?"
    }
  },
  methods: {
    extendSocket() {
      this.socket.on("socket_disconnecting", (data) => {
        this.players.delete(data)
      })

      this.socket.on("socket_connecting", (data) => {
        this.players.add(data)
      })

      this.socket.on("init-players", (players) => {
        for (const player of players) {
          this.players.add(player)
        }
      })
    },
    togglePlayersVisibility() {
      this.playerListVisible = !this.playerListVisible
    }
  }
}
</script>

<style scoped>
.container {
  font-size: 20px;
  font-weight: bold;
}

.numberOfPlayers {
  transition: text-shadow 0.5s ease;
}

.numberOfPlayers:hover {
  cursor: pointer;
  text-shadow: 1px 1px 2px rgba(0, 0, 200, 0.90);
}

.playersList {
  position: fixed;
  right: 10px;
  bottom: 50px;
  background-color: rgba(125, 204, 206, 0.8);
}

.player {
  padding: 5px;
}
</style>
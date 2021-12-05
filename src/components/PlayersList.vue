<template>
  <div class="container" @click="togglePlayersVisibility()">
    <div class="numberOfPlayers"> {{ players.length }} / ?</div>
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
    }
  },
  data() {
    return {
      players: [this.$store.state.username],
      playerListVisible: false
    }
  },
  created() {
    this.extendSocket();
  },
  methods: {
    extendSocket() {
      this.socket.on("socket_disconnecting", (data) => {
        for (let i = 0; i < this.players.length; i++) {
          if (this.players[i] === data.username) {
            this.players.splice(i, 1)
            break
          }
        }
      })

      this.socket.on("socket_connecting", (data) => {
        this.players.push(data.username)
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
  text-shadow: 0 0 4px rgba(0, 0, 200, 0.90);
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
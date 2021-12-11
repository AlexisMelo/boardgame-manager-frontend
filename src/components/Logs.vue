<template>
  <div class="logs" id="logs">
    <div class="message" v-for="(message, index) in logs" :key="index">
      {{message}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Logs",
  props: {
    socket: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      logs : []
    }
  },
  created() {
    this.extendSocket()
  },
  methods: {
    extendSocket() {
      this.socket.on("socket_disconnecting", (data) => {
        this.logs.push(`${data} left the game`)
      })

      this.socket.on("socket_connecting", (data) => {
        this.logs.push(`${data} joined the game`)
      })

      this.socket.on("new-add", (data) => {
        this.logs.push(`New object : ${data.label}`)
      })

      this.socket.on("new-modification", (data) => {
        this.logs.push(`Object moved : ${data.label}`)
      })

      this.socket.on("connect", () => {
        this.logs.push("You joined the game")
      })

      this.socket.on("disconnect", () => {
        this.logs.push("You were disconnected")
      })

      this.socket.onAny(() => {
        let messageBody = document.getElementById("logs")
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
      })
    }
  }
}
</script>

<style scoped>
.logs {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.message {
  color: royalblue;
  text-align: left;
}
</style>
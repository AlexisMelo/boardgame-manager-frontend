<template>
  <div class="home">
    <div class="navbar">
      <img @click="backToHome()" class="home" alt="Back to home page" src="@/assets/home.png" />
      <div class="username">{{this.username}}</div>
      <ButtonAddShape/>
    </div>
    <FabricCanvas/>
  </div>
</template>

<script>
import FabricCanvas from "@/components/FabricCanvas";
import ButtonAddShape from "@/components/ButtonAddShape";
import {mapState} from "vuex";

export default {
  name: 'Home',
  components: {ButtonAddShape, FabricCanvas},
  computed: mapState({username: "username"}),
  created() {
    if (!this.$store.state.username) {
      this.$router.push("/")
    }
  },
  methods: {
    backToHome() {
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
.navbar {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  background-color: rgba(125, 204, 206, 0.8);
  padding: 5px;
  margin: 10px;
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

.home {
  height: 30px;
  cursor: pointer;
}
</style>

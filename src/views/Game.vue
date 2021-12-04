<template>
  <div class="home">
    <ButtonAddShape />
    <FabricCanvas />
  </div>
</template>

<script>
import FabricCanvas from "@/components/FabricCanvas";
import ButtonAddShape from "@/components/ButtonAddShape";
export default {
  name: 'Home',
  components: {ButtonAddShape, FabricCanvas}
}
</script>

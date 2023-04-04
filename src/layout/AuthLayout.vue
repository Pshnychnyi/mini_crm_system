<template>
  <div class="container with-nav">
    <app-message></app-message>
    <router-view></router-view>
  </div>
</template>

<script>
import AppMessage from "@/components/ui/AppMessage.vue";
export default {
  name: "Auth",
  components: {
    AppMessage
  }
}
</script>

<style scoped>

</style>
<template>
    <div class="modal-backdrop" @click="$emit('close')"></div>
    <div class="modal">
      <h3 v-if="title">{{title}}</h3>

      <slot></slot>
    </div>
</template>

<script>
export default {
  name: "AppModal",
  props: {
    title: {
      type: String,
      required: false
    }
  },
  emits: ['close']
}
</script>

<style scoped>

</style>
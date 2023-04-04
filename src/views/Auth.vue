<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>
    <div :class="['form-control', {invalid: eError}]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="eblur">
      <small v-if="eError">{{ eError }}</small>
    </div>
    <div :class="['form-control', {invalid: pError}]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="pblur">
      <small v-if="pError">{{ pError }}</small>

    </div>
    <button type="submit" class="btn primary" :disabled="isSubmitting || isTooManyAttempts">Войти</button>
    <div class="text-danger" v-if="isTooManyAttempts">Вы слишком часто пытаетесь войти в систему попробуйте позже</div>
  </form>
</template>

<script>

import {useLoginForm} from "@/use/LoginForm.js";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {error} from "@/utils/error";

export default {
  name: "Auth",
  setup() {
    const route = useRoute()
    const store = useStore()
    if (route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message),
        type: 'warning'
      })
    }
    return {
      ...useLoginForm()
    }
  }
}
</script>

<style scoped>

</style>
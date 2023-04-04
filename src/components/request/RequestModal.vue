<template>
  <form @submit.prevent="onSubmit">
    <div :class="['form-control', {invalid:nError}]">
      <label for="name">ФИО</label>
      <input type="text" id="name" v-model="name" @blur="nBlur">
      <small v-if="nError">{{nError}}</small>
    </div>
    <div :class="['form-control', {invalid:pError}]">
      <label for="phone">Телефон</label>
      <input type="text" id="phone" v-model="phone" @blur="pBlur">
      <small v-if="pError">{{pError}}</small>
    </div>
    <div :class="['form-control', {invalid:sError}]">
      <label for="summ">Сумма заявки</label>
      <input type="number" id="summ" v-model.number="summ" @blur="sBlur">
      <small v-if="sError">{{sError}}</small>
    </div>
    <div :class="['form-control']">
      <label for="status">Статус</label>
      <select name="status" id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>
    <button class="btn primary" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>

import {useRequestForm} from "@/use/RequestForm";
import {useStore} from "vuex";
export default {
  name: "RequestModal",
  setup(_, {emit}) {
    const store = useStore()
    const submit = async (values) => {
      await store.dispatch('request/create', values)
      emit('created')
    }

    return{
      ...useRequestForm(submit)
    }
  },
  emits: ['created']
}
</script>

<style scoped>

</style>
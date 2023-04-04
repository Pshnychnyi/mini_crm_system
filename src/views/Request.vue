<template>
  <app-loader v-if="loading"></app-loader>
  <app-page back title="Заявка" v-else-if="request">
    <p><strong>Имя владельца</strong>: {{request.name}}</p>
    <p><strong>Номер телефона</strong>: {{request.phone}}</p>
    <p><strong>Сумма</strong>: {{currency(request.summ)}}</p>
    <p><strong>Статус</strong>: <app-status :type="request.status"></app-status></p>

    <div :class="['form-control']">
      <label for="status">Статус</label>
      <select name="status" id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>
    <button class="btn danger" @click="remove()">Удалить</button>
    <button class="btn" @click="update()" v-if="hasChanges">Обновить</button>
  </app-page>
  <h3 class="text-center text-white" v-else>
    Заявки с ID = {{id}} нет
  </h3>
</template>

<script>
import {ref, onMounted, computed} from 'vue'
import AppPage from "@/components/ui/AppPage.vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import AppLoader from "@/components/ui/AppLoader.vue";
import AppStatus from "@/components/ui/AppStatus.vue";
import {currency} from "../utils/currency";

export default {
  name: "Request.vue",

  setup() {
    const loading = ref(true)
    const request = ref({})
    const status = ref()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const id = route.params.id

    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('request/loadById', id)
      status.value = request.value?.status
      loading.value = false
    })

    const hasChanges = computed(() => request.value.status !== status.value)

    const remove = async () => {
      await store.dispatch('request/remove', id)
      await router.push('/')
    }
    const update = async () => {
      const data = {...request.value, status: status.value, id}
      await store.dispatch('request/update', data)
      request.value.status = status.value
    }

    return {
      loading, request, id, currency, remove, update, status, hasChanges
    }
  },
  components: {
    AppPage, AppStatus, AppLoader
  }
}
</script>

<style scoped>

</style>
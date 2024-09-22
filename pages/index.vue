<script setup lang="ts">
import type {NewsGet, NewsResponse} from "~/server/api/news.get"

import type {Ref} from "vue";

const lastPage = ref(0)
const news: Ref<NewsGet[]> = ref([])

const currentPage = ref(1)
const isLoading = ref(false)

watch(currentPage, load)
async function load() {
  isLoading.value = true
  const infos = await $fetch('/api/news', {
    query: {
      page: currentPage.value
    }
  })

  const {data, last_page}: NewsResponse = JSON.parse(infos)

  news.value = data
  lastPage.value = last_page
  isLoading.value = false

  console.log(data)
}

onBeforeMount(load)
</script>

<template>
  <NuxtLayout>
    <div v-for="item in news">
      {{ item.title }}
    </div>
    <v-pagination :length="4" :total-visible="4" v-model="currentPage" :disabled="isLoading"/>
  </NuxtLayout>
</template>

<style scoped>

</style>
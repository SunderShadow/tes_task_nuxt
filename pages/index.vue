<script setup lang="ts">
import type {News, NewsResponse} from "~/server/api/news.get"

import type {Ref} from "vue";
import NewsCard from "~/components/NewsCard.vue";

const lastPage = ref(0)
const news: Ref<News[]> = ref([])

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

  window.scroll(0, 0)
}

onBeforeMount(load)
</script>

<template>
  <NuxtLayout>
    <v-container>
      <NewsCard v-for="card in news" v-bind="card"/>
      <v-pagination class="mt-5" :length="lastPage" v-model="currentPage" :disabled="isLoading"/>
    </v-container>
  </NuxtLayout>
</template>

<style scoped>

</style>
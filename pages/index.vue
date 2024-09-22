<script setup lang="ts">
import type {News, NewsResponse} from "~/server/api/news.get"

import type {Ref} from "vue";
import NewsCard from "~/components/NewsCard.vue";

const search = ref('')
const date = ref()

const lastPage = ref(0)
const news: Ref<News[]> = ref([])

const currentPage = ref(1)
const isLoading = ref(false)

async function load() {
  isLoading.value = true

  const infos = await $fetch('/api/news', {
    query: {
      page: currentPage.value,
      date: date.value ?? undefined, // Предположим сервер принимает такие данные
      search: search.value ?? search.value
    }
  })

  const {data, last_page}: NewsResponse = JSON.parse(infos)

  news.value = data
  lastPage.value = last_page

  isLoading.value = false
  window.scroll(0, 0)
}

let timeoutKey = setTimeout(() => {}, 0)
function watchSearchChange() {
  clearTimeout(timeoutKey)

  timeoutKey = setTimeout(() => {
    currentPage.value = 1
    load()
  }, 300)
}
onBeforeMount(load)

watch(search, watchSearchChange)
watch([date, currentPage], load)
</script>

<template>
  <NuxtLayout>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field placeholder="Search" v-model="search"></v-text-field>
        </v-col>
        <v-col>
          <v-dialog persistent>
            <template v-slot:activator="{props: activatorProps}">
              <v-btn v-bind="activatorProps" icon="mdi-calendar"></v-btn>
            </template>

            <template v-slot:default="{isActive}">
              <div class="mx-auto"><v-date-picker v-model="date" @update:model-value="isActive.value = false"/></div>
            </template>
          </v-dialog>
        </v-col>
      </v-row>
      <v-skeleton-loader v-if="isLoading" v-for="i in 5" type="card"></v-skeleton-loader>
      <NewsCard v-else v-for="card in news" v-bind="card" :key="card.title"/>
      <v-pagination class="mt-5" :length="lastPage" v-model="currentPage" :disabled="isLoading"/>
    </v-container>
  </NuxtLayout>
</template>

<style scoped>

</style>
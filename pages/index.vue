<script setup lang="ts">
import type {News, NewsResponse} from "~/server/api/news.get"

import type {Ref} from "vue";

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

  console.log(data)
}

onBeforeMount(load)
</script>

<template>
  <NuxtLayout>
    <v-container>
      <v-card class="mt-5" v-for="item in news" :elevation="2">
        <template v-slot:title>
          <v-card-title><a :href="item.origin">{{ item.title }}</a></v-card-title>
          <v-card-subtitle><span class="text-blue-darken-2">{{ item.author ? item.author : '' }}</span> {{ item.pub_date }}</v-card-subtitle>
        </template>

        <v-carousel
            v-if="item.images"
            :show-arrows="item.images.length > 1 ? 'hover' : false"
            :hide-delimiters="true"
            cycle
        >
          <v-carousel-item v-for="imgSrc in item.images" :src="imgSrc" cover></v-carousel-item>
        </v-carousel>

        <v-card-text class="bg-surface-light pt-4">
          {{ item.anons }}
        </v-card-text>
      </v-card>
      <v-pagination class="mt-5" :length="lastPage" :total-visible="4" v-model="currentPage" :disabled="isLoading"/>
    </v-container>
  </NuxtLayout>
</template>

<style scoped>

</style>
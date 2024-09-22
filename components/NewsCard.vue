<script setup lang="ts">
defineProps({
  title: {
    required: true,
    type: String
  },
  origin: {
    required: true,
    type: String
  },
  author: {
    default: '',
    type: [String, Boolean]
  },
  published_at: {
    required: true,
    type: String
  },
  anons: {
    required: true,
    type: String
  },
  images: {
    default: [],
    type: Array<string>
  }
})
</script>

<template>
  <v-card class="mt-5" :elevation="2">
    <template v-slot:title>
      <v-card-title><a :href="origin">{{ title }}</a></v-card-title>
      <v-card-subtitle><span v-if="author" class="text-blue-darken-2">{{ author }}</span> {{ published_at }}</v-card-subtitle>
    </template>

    <v-carousel
        v-if="images.length"
        :show-arrows="images.length > 1 ? 'hover' : false"
        :hide-delimiters="true"
        cycle
    >
      <v-carousel-item v-for="imgSrc in images" :src="imgSrc" cover></v-carousel-item>
    </v-carousel>

    <v-card-text class="bg-surface-light pt-4">
      {{ anons }}
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
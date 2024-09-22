<script setup lang="ts">
</script>

<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-title>Some title</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <slot/>
    </v-main>
  </v-app>
</template>

<style scoped>

</style>
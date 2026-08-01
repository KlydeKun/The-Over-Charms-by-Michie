<template>
  <div id="app">
    <SiteHeader />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import SiteHeader from "./components/site-header.vue";
</script>

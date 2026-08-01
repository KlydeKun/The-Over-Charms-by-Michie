<template>
  <div id="app">
    <header>
      <SiteHeader />
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import SiteHeader from "./components/site-header.vue";
</script>

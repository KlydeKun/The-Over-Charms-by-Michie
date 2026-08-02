<template>
  <CartProvider>
    <div id="app">
      <SiteHeader />
      <StickyCart />
      <main>
        <router-view />
      </main>
    </div>
  </CartProvider>
</template>

<script setup lang="ts">
import CartProvider from "./components/CartProvider.vue";
import SiteHeader from "./components/SiteHeader.vue";
import StickyCart from "./components/StickyCart.vue";
</script>

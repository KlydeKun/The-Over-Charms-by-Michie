<template>
  <Analytics />
  <SpeedInsights />
  <CartProvider>
    <div id="app">
      <Toaster position="top-center" />
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
import { Toaster } from "vue-sonner";
import { Analytics } from "@vercel/analytics/vue";
import { SpeedInsights } from "@vercel/speed-insights/vue";
</script>

<template>
  <section class="px-5 sm:px-6 max-w-6xl mx-auto">
    <div class="flex items-end justify-between mb-8 gap-4">
      <div>
        <span
          class="font-mono text-[10px] uppercase tracking-[0.25em] text-primary block mb-2"
        >
          Best Sellers
        </span>
        <h2 class="font-display text-2xl sm:text-3xl">
          Loved by the neighborhood
        </h2>
      </div>
      <router-link
        to="/menu"
        class="hidden sm:inline-flex text-xs font-semibold px-4 py-2 rounded-full border border-foreground/10 hover:bg-foreground/5 transition-colors"
        @click="scrollToTop"
      >
        See all →
      </router-link>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
      <ProductCard :items="bestSellers" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { products } from "@/lib/products.ts";
import ProductCard from "../ProductCard.vue";

const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

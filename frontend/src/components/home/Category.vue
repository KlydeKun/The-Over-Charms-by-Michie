<template>
  <section class="px-5 sm:px-6 max-w-6xl mx-auto mt-20">
    <div class="text-center mb-10">
      <span
        class="font-mono text-[10px] uppercase tracking-[0.25em] text-primary block mb-2"
      >
        What we bake
      </span>
      <h2 class="font-display text-2xl sm:text-3xl">Browse the bakery</h2>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <router-link
        v-for="(category, index) in categories"
        :key="index"
        :to="{ path: '/menu', query: { category: category } }"
        class="group relative aspect-4/5 rounded-2xl overflow-hidden bg-card border border-foreground/5"
      >
        <img
          :src="getSrc(category)"
          :alt="category"
          class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"
        />
        <div class="absolute bottom-4 left-4 right-4 text-white">
          <h3 class="font-display text-xl capitalize">{{ category }}</h3>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { categories, products } from "@/lib/products";

const getSrc = (c: string) => products.find((p) => p.category === c)?.image;
</script>

<template>
  <div class="pb-32">
    <header
      class="px-5 sm:px-6 pt-10 max-w-4xl mx-auto text-center animate-fade-up"
    >
      <span
        class="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-4 block"
      >
        Est. 2023 — Bake With Love
      </span>
      <div class="relative">
        <h1
          class="font-display text-4xl sm:text-5xl md:text-6xl text-balance leading-[1.05] md:mb-3"
        >
          Baking Dreams, one charm at a time
        </h1>
        <img
          :src="ribbon"
          alt="ribbon"
          class="absolute top-15 md:top-25 left-1/2 -translate-x-1/2 h-28 md:h-41 w-[70%] md:w-[55%] mx-auto"
        />
        <p
          class="text-muted-foreground text-pretty max-w-70 md:max-w-96 mx-auto mb-8 mt-16 md:mt-22 text-[13px] md:text-lg"
        >
          Discover delightful treats crafted with love- freshly baked,
          beautifully made, just for you.
        </p>
      </div>
      <div class="flex items-center justify-center gap-3 mb-10 flex-wrap">
        <router-link
          to="/menu"
          class="text-sm font-medium bg-primary text-primary-foreground px-6 py-3 rounded-full hover:brightness-110 transition-all"
        >
          Order Now
        </router-link>
        <router-link
          to="/menu"
          class="text-sm font-medium px-6 py-3 rounded-full border border-foreground/10 hover:bg-foreground/5 transition-colors"
        >
          View Menu
        </router-link>
      </div>
      <div
        class="w-full aspect-21/9 bg-accent rounded-3xl overflow-hidden shadow-sm"
      >
        <img
          :src="heroImage"
          alt="Sourdough loaf and golden croissants on parchment"
          width="1600"
          height="896"
          class="w-full h-full object-cover"
        />
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import ribbon from "@/assets/images/ribbon_no_bg_1.png";
import heroImage from "@/assets/images/hero_image.jpg";
</script>

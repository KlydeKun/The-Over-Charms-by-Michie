<template>
  <nav
    class="sticky top-0 z-40 bg-background/50 backdrop-blur-sm border-b border-foreground/5 transform:[translateZ(0)]"
  >
    <div
      class="max-w-6xl mx-auto px-5 sm:px-6 py-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4"
    >
      <router-link to="/" class="flex items-center gap-2 min-w-0">
        <span
          class="size-10 shrink-0 rounded-full grid place-items-center text-primary-foreground font-display font-bold"
          >
          <img :src="logo" alt="logo" class="rounded-full">
          </span
        >
        <p
          class="font-display text-normal sm:text-lg font-bold tracking-tight truncate"
        >
          The Oven Charms
          <p class="text-xs text-muted-foreground">by Michie</p>
        </p>
      </router-link>
      <div class="flex items-center gap-2 sm:gap-3">
        <router-link to="/menu" class="hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-full border border-foreground/10 hover:bg-foreground/5 transition-colors">Menu</router-link>
        <router-link to="/cart" class="relative text-sm font-medium px-4 py-2 rounded-full border border-foreground/10 hover:bg-foreground/5 transition-colors">Cart
          <span v-if="totalItems > 0" class="absolute -top-1 -right-1 size-5 bg-primary text-primary-foreground text-[10px] font-mono font-bold rounded-full grid place-items-center ring-2 ring-background">{{ totalItems }}</span>
        </router-link>
        <router-link to="/menu" class="hidden sm:inline-flex text-sm font-medium bg-primary text-primary-foreground px-5 py-2 rounded-full hover:brightness-110 transition-all">Order Now</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.jpg'
import { useCart } from '@/composables/useCart';

const { totalItems } = useCart();
</script>

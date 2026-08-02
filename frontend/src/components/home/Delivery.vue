<template>
  <section class="mt-20 bg-accent/30 py-16 px-5 sm:px-6">
    <div class="max-w-4xl mx-auto text-center">
      <span
        class="font-mono text-[10px] uppercase tracking-[0.25em] text-primary block mb-2"
      >
        Delivery
      </span>
      <h2 class="font-display text-2xl sm:text-3xl mb-8 italic">
        Baking for our neighbors
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div
          v-for="(place, index) in places"
          :key="index"
          class="p-4 border border-foreground/10 rounded-2xl bg-background/70 text-sm font-medium"
        >
          {{ place }}
        </div>
      </div>
      <p class="text-xs text-muted-foreground mt-6">
        Delivery is available for reserved orders only. Please reserve in
        advance for your preferred delivery date and time.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const places = reactive(["Pasig", "Pinagbuhatan", "Pateros", "San Miguel"]);
</script>

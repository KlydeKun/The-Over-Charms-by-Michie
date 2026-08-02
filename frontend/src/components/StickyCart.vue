<template>
  <div
    v-if="!isHidden"
    class="fixed bottom-4 left-4 right-4 z-50 flex justify-center pointer-events-none animate-fade-up"
  >
    <router-link
      to="/cart"
      class="pointer-events-auto w-full max-w-md bg-foreground text-background rounded-2xl py-4 px-5 shadow-2xl flex items-center justify-between active:scale-[0.98] transition-transform"
    >
      <div class="flex items-center gap-3 min-w-0">
        <div
          class="size-8 shrink-0 bg-primary rounded-lg grid place-items-center font-mono text-xs text-primary-foreground font-bold animate-cart-pulse"
          :key="totalItems"
        >
          {{ totalItems }}
        </div>
        <span class="font-medium truncate">View Basket</span>
      </div>
      <span class="font-mono text-sm shrink-0"
        >{{ formatPrice(subTotal) }} →</span
      >
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { formatPrice, useCart } from "@/composables/useCart";
import { computed } from "vue";
import { useRoute } from "vue-router";

const { totalItems, subTotal } = useCart();
const route = useRoute();

const isHidden = computed(() => {
  if (totalItems.value === 0) return true;

  const hiddenPaths = ["/cart", "/checkout", "/order"];
  return hiddenPaths.some((path) => route.path.startsWith(path));
});
</script>

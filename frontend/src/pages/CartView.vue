<template>
  <main
    v-if="items.length > 0"
    class="max-w-3xl mx-auto px-5 sm:px-6 pt-6 pb-24"
  >
    <router-link
      to="/menu"
      class="inline-flex text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground mb-6"
    >
      ← Keep shopping
    </router-link>
    <ul class="space-y-3 mb-8">
      <li
        v-for="item in items"
        :key="item.id"
        class="flex gap-4 p-3 bg-card border border-foreground/5 rounded-2xl"
      >
        <router-link :to="`/product/${item.id}`">
          <img
            :src="item.image"
            :alt="item.name"
            class="size-20 sm:size-24 rounded-xl object-cover shrink-0"
            width="96"
            height="96"
          />
        </router-link>
        <div class="flex-1 min-w-0 flex flex-col">
          <div className="flex justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-display text-lg leading-tight truncate">
                {{ item.name }}
              </h3>
            </div>
            <span className="font-mono text-sm shrink-0">
              {{ formatPrice(item.price * item.quantity) }}
            </span>
          </div>
          <div class="mt-auto flex items-center justify-between pt-3">
            <div
              class="inline-flex items-center bg-background border border-foreground/10 rounded-full"
            >
              <Button
                class="size-8 flex items-center rounded-full hover:bg-foreground/5"
                aria-label="Decrease"
                variant="ghost"
                @click="() => updateQuantity?.(item.id, item.quantity - 1)"
              >
                −
              </Button>
              <span class="w-8 text-center font-mono text-xs">{{
                item.quantity
              }}</span>
              <Button
                class="size-8 flex items-center rounded-full hover:bg-foreground/5"
                aria-label="Increase"
                variant="ghost"
                @click="() => updateQuantity?.(item.id, item.quantity + 1)"
              >
                +
              </Button>
            </div>
            <Button
              variant="ghost"
              class="p-0 text-xs text-muted-foreground underline underline-offset-4 hover:bg-transparent hover:text-destructive focus:bg-transparent active:bg-transparent"
              @click="removeItem(item.id)"
            >
              Remove
            </Button>
          </div>
        </div>
      </li>
    </ul>

    <div class="bg-card border border-foreground/5 rounded-2xl p-5 space-y-2">
      <div class="flex justify-between text-sm">
        <span class="text-muted-foreground">Subtotal</span>
        <span class="font-mono">{{ formatPrice(subTotal) }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-muted-foreground">Delivery</span>
        <span class="font-mono">
          {{ delivery === 0 ? "Free" : formatPrice(delivery) }}
        </span>
      </div>
      <p v-if="subTotal < FREE_THRESHOLD" class="text-[11px] text-primary">
        Add {{ formatPrice(FREE_THRESHOLD - subTotal) }} more for free delivery.
      </p>
      <div class="flex justify-between pt-3 border-t border-foreground/10">
        <span class="font-display text-lg">Total</span>
        <span class="font-mono text-lg">{{ formatPrice(total) }}</span>
      </div>
      <router-link
        to="/checkout"
        class="mt-4 block text-center bg-primary text-primary-foreground rounded-full py-4 font-semibold hover:brightness-110 transition-all"
      >
        Checkout
      </router-link>
    </div>
  </main>
  <main v-else class="max-w-md mx-auto px-6 py-24 text-center">
    <span
      class="font-mono text-[10px] uppercase tracking-[0.25em] text-primary block mb-2"
    >
      Empty basket
    </span>
    <h1 class="font-display text-3xl mb-3">Nothing in here yet</h1>
    <p class="text-muted-foreground mb-8">
      Fresh bakes are waiting. Pick something delicious.
    </p>
    <router-link
      to="/menu"
      class="inline-flex bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:brightness-110"
    >
      Browse menu
    </router-link>
  </main>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { formatPrice, useCart } from "@/composables/useCart";
import { computed } from "vue";

const DELIVERY_FEE = 5;
const FREE_THRESHOLD = 500;

const { items, subTotal, updateQuantity, removeItem } = useCart();

const delivery = computed(() => {
  if (subTotal.value === 0 || subTotal.value >= FREE_THRESHOLD) {
    return 0;
  } else {
    return DELIVERY_FEE;
  }
});

const total = computed(() => subTotal.value + delivery.value);
</script>

<template>
  <div
    v-for="(product, index) in bestSellers"
    :key="index"
    class="group animate-fade-up flex flex-col"
    :style="{ animationDelay: `${Math.min(index * 60, 400)}ms` }"
  >
    <div
      @click="handleClickImage(product)"
      class="block w-full aspect-square bg-card rounded-2xl mb-4 overflow-hidden outline-1 -outline-offset-1 outline-foreground/5 group-hover:shadow-lg transition-all"
    >
      <img
        :src="product.image"
        :alt="product.name"
        loading="lazy"
        width="{768}"
        height="{768}"
        class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
      />
    </div>
    <div class="flex justify-between items-start mb-1 gap-2">
      <h3
        class="font-display text-lg leading-tight truncate cursor-pointer"
        @click="handleClickImage(product)"
      >
        {{ product.name }}
      </h3>
      <span class="font-mono text-xs shrink-0 mt-1">{{
        formatPrice(product.price)
      }}</span>
    </div>
    <p class="text-xs text-muted-foreground mb-4 line-clamp-2">
      {{ product.description }}
    </p>
    <Button
      variant="outline"
      class="mt-auto w-full py-2.5 rounded-xl bg-card border border-foreground/10 text-foreground text-xs font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all active:scale-[0.98]"
      @click="handleAddToCart(product)"
    >
      {{ handleHasOptions(product) ? "Select Options" : "Add to Cart" }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { formatPrice, useCart } from "@/composables/useCart";
import { products, type Product } from "@/lib/products";
import { Button } from "./ui/button";
import { useRouter } from "vue-router";

const router = useRouter();
const { addItem } = useCart();

const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);

const handleHasOptions = (product: Product) => {
  return (product.options?.length ?? 0) > 0;
};

const handleClickImage = (product: Product) => {
  router.push({
    path: `/product/${product.id}`,
  });
};

const handleAddToCart = (product: Product) => {
  addItem({
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    quantity: 1,
  });
};
</script>

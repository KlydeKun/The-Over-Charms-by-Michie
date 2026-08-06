<script setup lang="ts">
import { useProvideCart } from "../composables/useCart";

useProvideCart();
</script>

<template>
  <slot />
</template>
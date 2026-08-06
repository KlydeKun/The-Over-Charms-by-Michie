<template>
  <Hero />
  <BestSeller />
  <Category />
  <Testimonial />
  <Delivery />
  <Footer />
</template>

<script setup lang="ts">
import BestSeller from "@/components/home/BestSeller.vue";
import Category from "@/components/home/Category.vue";
import Delivery from "@/components/home/Delivery.vue";
import Footer from "@/components/home/Footer.vue";
import Hero from "@/components/home/Hero.vue";
import Testimonial from "@/components/home/Testimonial.vue";
import { useHead } from "@unhead/vue";

useHead({
  title: "The Oven Charms by Michie",
  meta: [
    {
      name: "description",
      content: "Discover delightful treats crafted with LOVE",
    },
    { property: "og:title", content: "The Oven Charms by Michie" },
    {
      property: "og:description",
      content: "Baking dreams one charm at a time",
    },
  ],
});
</script>

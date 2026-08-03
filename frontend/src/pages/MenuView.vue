<template>
  <main class="pb-32 max-w-6xl mx-auto px-5 sm:px-6 pt-8">
    <div class="text-center mb-8 animate-fade-up">
      <span
        class="font-mono text-[10px] uppercase tracking-[0.25em] text-primary block mb-2"
      >
        Today's Menu
      </span>
      <h1 class="font-display text-3xl sm:text-5xl">Choose your bake</h1>
    </div>

    <div class="mb-6 max-w-md mx-auto">
      <input
        id="search"
        v-model="query"
        type="search"
        placeholder="Search cookies, bread…"
        class="w-full px-5 py-3 rounded-full border border-foreground/10 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
    </div>

    <div class="overflow-x-auto no-scrollbar mb-10">
      <div class="flex gap-2 min-w-max justify-center px-2">
        <Button
          v-for="item in allCategories"
          :key="item"
          @click="setCategory(item)"
          :variant="activeCategory === item ? 'default' : 'outline'"
          class="rounded-full cursor-pointer"
        >
          {{ item }}
        </Button>
      </div>
    </div>

    <p
      v-if="filtered.length === 0"
      class="text-center text-muted-foreground py-16"
    >
      Nothing matches that. Try a different search.
    </p>
    <div
      v-else
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
    >
      <ProductCard :items="filtered" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@unhead/vue";
import { products, categories, type Category } from "@/lib/products";
import ProductCard from "@/components/ProductCard.vue";
import { Button } from "@/components/ui/button";

useHead({
  title: "The Oven Charms by Michie",
  meta: [
    {
      name: "description",
      content: "Discover delighted treats crafted with LOVE",
    },
    { property: "og:title", content: "The Oven Charms by Michie" },
    {
      property: "og:description",
      content: "Baking dreams one charm at a time",
    },
  ],
});

const route = useRoute();
const router = useRouter();

const allCategories = ["All", ...categories] as const;

const query = ref((route.query.q as string) ?? "");

const activeCategory = computed<Category | "All">(
  () => (route.query.category as Category | undefined) ?? "All",
);

const filtered = computed(() => {
  return products.filter((p) => {
    const matchesCat =
      activeCategory.value === "All" || p.category === activeCategory.value;
    const matchesQ =
      !query.value ||
      p.name.toLowerCase().includes(query.value.toLowerCase()) ||
      p.description.toLowerCase().includes(query.value.toLowerCase());
    return matchesCat && matchesQ;
  });
});

function setCategory(c: Category | "All") {
  router.replace({
    query: {
      ...route.query,
      category: c === "All" ? undefined : c,
    },
  });
}

watch(query, (newQ) => {
  router.replace({
    query: {
      ...route.query,
      q: newQ || undefined,
    },
  });
});
</script>

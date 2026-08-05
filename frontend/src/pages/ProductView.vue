<template>
  <main class="pb-40 max-w-5xl mx-auto px-5 sm:px-6 pt-6">
    <Button
      variant="ghost"
      class="inline-flex items-center text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground mb-6"
      @click="handleGoToMenu"
    >
      ← Back to menu
    </Button>
    <div v-if="product" class="grid md:grid-cols-2 gap-8 md:gap-12">
      <div
        class="aspect-square rounded-3xl overflow-hidden bg-card border border-foreground/5"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover"
        />
      </div>

      <div>
        <div>
          <span
            class="font-mono text-[10px] uppercase tracking-[0.25em] text-primary block mb-3"
          >
            {{ product.category }}
          </span>
          <h1 class="font-display text-3xl sm:text-4xl leading-tight mb-3">
            {{ product.name }}
          </h1>
          <p className="font-mono text-base mb-4">
            {{ formatPrice(product.price) }}
          </p>
          <p class="text-muted-foreground leading-relaxed mb-8">
            {{ product.longDescription }}
          </p>
        </div>
        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase tracking-widest mb-3">
            Quantity
          </h3>
          <div
            className="inline-flex items-center bg-card border border-foreground/10 rounded-full overflow-hidden"
          >
            <Button
              variant="ghost"
              @click="quantity = Math.max(1, quantity - 1)"
              class="size-10 grid place-items-center hover:bg-foreground/5"
              aria-label="Decrease"
            >
              -
            </Button>
            <span className="w-10 text-center font-mono text-sm">{{
              quantity
            }}</span>
            <Button
              variant="ghost"
              @click="quantity++"
              class="size-10 grid place-items-center hover:bg-foreground/5"
              aria-label="Increase"
            >
              +
            </Button>
          </div>
        </div>
        <div class="border-t border-foreground/10">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                class="text-xs font-semibold uppercase tracking-widest cursor-pointer"
                >Ingredients</AccordionTrigger
              >
              <AccordionContent class="text-sm text-muted-foreground mt-2">
                {{ product.ingredients.join(", ") }}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div class="mb-5 border-t border-b border-foreground/10">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                class="text-xs font-semibold uppercase tracking-widest cursor-pointer"
                >Allergens</AccordionTrigger
              >
              <AccordionContent class="text-sm text-muted-foreground mt-2">
                {{ product.allergens.join(", ") }}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div
          class="sticky bottom-4 sm:static bg-background/95 backdrop-blur sm:bg-transparent rounded-2xl p-4 sm:p-0 -mx-1 sm:mx-0 shadow-lg sm:shadow-none border sm:border-0 border-foreground/5"
        >
          <div class="flex items-center gap-3">
            <Button
              class="flex-1 py-6 rounded-full bg-card border border-black/5 text-sm font-semibold text-black hover:bg-foreground/5 transition-all active:scale-[0.98]"
              size="lg"
              @click="() => handleAddToCart(false)"
            >
              Add - {{ formatPrice(totalUnit * quantity) }}
            </Button>
            <Button
              class="flex-1 py-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all active:scale-[0.98]"
              size="lg"
              @click="() => handleAddToCart(true)"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-24">
      <h1 class="font-display text-3xl mb-3">Product not found</h1>
      <p class="text-muted-foreground mb-6">
        We could not find a product for this link.
      </p>
      <Button as-child>
        <router-link to="/menu">Back to menu</router-link>
      </Button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { formatPrice, useCart } from "@/composables/useCart";
import { getProduct, type ProductOptionGroup } from "@/lib/products";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const route = useRoute();
const router = useRouter();
const { addItem } = useCart();

const quantity = ref<number>(1);

const product = computed(() => {
  const id = route.params.id;
  return typeof id === "string" ? getProduct(id) : undefined;
});

const selected = ref<Record<string, string | string[]>>(
  (() => {
    const init: Record<string, string | string[]> = {};
    for (const g of product.value?.options ?? []) {
      init[g.id] = g.type === "single" ? (g.options[0]?.id ?? "") : [];
    }
    return init;
  })(),
);

const totalUnit = computed(() => {
  const options = product.value?.options ?? [];

  const delta = options.reduce((sum, group) => {
    const v = selected.value?.[group.id];
    return sum + getGroupDelta(group, v);
  }, 0);

  return (product.value?.price ?? 0) + delta;
});

const handleGoToMenu = () => {
  router.push("/menu");
};

const getGroupDelta = (
  group: ProductOptionGroup,
  selection: string | string[] | undefined,
): number => {
  if (!selection) return 0;

  if (group.type === "single" && typeof selection === "string") {
    const opt = group.options.find((o) => o.id === selection);
    return opt?.priceDelta ?? 0;
  }

  if (group.type === "multi" && Array.isArray(selection)) {
    return selection.reduce((sum, id) => {
      const opt = group.options.find((o) => o.id === id);
      return sum + (opt?.priceDelta ?? 0);
    }, 0);
  }

  return 0;
};

const handleAddToCart = (gotoCart: boolean) => {
  if (!product.value) return;

  addItem({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    quantity: 1,
    image: product.value.image,
  });

  if (gotoCart) router.push({ name: "cart" });
};
</script>

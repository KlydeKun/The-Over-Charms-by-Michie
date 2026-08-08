<template>
  <main class="max-w-2xl mx-auto px-5 sm:px-6 pt-8 pb-24">
    <div class="text-center mb-5 animate-fade-up">
      <span class="font-mono text-[10px] uppercase tracking-[0.25em] text-primary block mb-3">
        Order Confirmed
      </span>
      <h1 class="font-display text-4xl sm:text-5xl mb-3">
        Thanks, {{ getOrders?.customer.name.split(" ")[0] }}!
      </h1>
      <p class="text-muted-foreground">
        Your bakes are in the oven. We've sent a confirmation to
        <span class="text-foreground">{{ getOrders?.customer.email }}</span> and <span class="text-foreground">{{
          getOrders?.customer.phone
        }}</span>.
      </p>
    </div>

    <div class="bg-card border border-foreground/5 rounded-2xl p-6 mb-6">
      <div class="grid grid-cols-2 gap-4 text-sm">
        <Info label="Order" :value="getOrders?.id" />
        <Info label="Status" value="Confirmed" />
        <Info :label="getOrders?.customer.fulfillment === 'delivery' ? 'Delivery Date' : 'Pickup Date'"
          :value="orderDateTime" />
        <div v-if="getOrders?.customer.fulfillment === 'delivery' && getOrders.customer.address">
          <Info label="Address" :value="getOrders.customer.address" />
        </div>
      </div>
    </div>

    <div class="bg-card border border-foreground/5 rounded-2xl p-6 mb-6">
      <h3 class="text-xs font-semibold uppercase tracking-widest mb-4">Order status</h3>
      <ol class="space-y-3">
        <li class="flex items-center gap-3 text-sm" v-for="item in status" :key="item.label">
          <span :class="['size-3 rounded-full', item.active ? 'bg-primary' : 'bg-foreground/10']" />
          <span :class="[item.active ? '' : 'text-muted-foreground']">{{ item.label }}</span>
        </li>
      </ol>
    </div>

    <div class="bg-card border border-foreground/5 rounded-2xl p-6 mb-8">
      <h3 class="text-xs font-semibold uppercase tracking-widest mb-4">What's in the box</h3>
      <ul class="space-y-3 mb-4">
        <li v-for="order in getOrders?.items" :key="order.id" class="flex justify-between gap-3 text-sm">
          <span class="min-w-0">
            <span class="font-mono text-xs text-muted-foreground mr-2">×{{ order.quantity }}</span>
            {{ order.name }}
          </span>
          <span class="font-mono text-xs shrink-0">
            {{ formatPrice(order.price * order.quantity) }}
          </span>
        </li>
      </ul>
      <div class="pt-3 border-t border-foreground/10 space-y-1.5 text-sm">
        <Row label="Subtotal" :value='formatPrice(getOrders?.subtotal ?? 0)' />
        <Row label="Delivery" :value="getOrders?.delivery === 0 ? 'Free' : formatPrice(getOrders?.delivery ?? 0)" />
        <Row :label='`Paid via ${getOrders?.customer.payment.toUpperCase()}`'
          :value="formatPrice(getOrders?.total ?? 0)" bold />
      </div>
    </div>
    <router-link to="/menu"
      class="block text-center bg-primary text-primary-foreground rounded-xl py-4 font-semibold hover:brightness-110 transition-all"
      @click="scrollToTop">
      Order more
    </router-link>
  </main>
</template>

<script setup lang="ts">
import Info from "@/components/order/Info.vue";
import Row from "@/components/order/Row.vue";
import { formatPrice, scrollToTop, type CartItem } from "@/composables/useCart";
import { useHead } from "@unhead/vue";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

interface OrderRecord {
  id: string;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
  customer: {
    fulfillment: "delivery" | "pickup";
    name: string;
    phone: string;
    email: string;
    address?: string;
    instructions?: string;
    date: string;
    time: string;
    payment: "card" | "cod" | "gcash" | "maya";
  };
  createdAt: string;
}

const route = useRoute();
const getOrders = ref<OrderRecord | null>(null);
const isLoaded = ref<boolean>(false);

const orderDateTime = computed(() => {
  const order = getOrders.value;
  if (!order) return "";
  const { date, time } = order.customer;
  const getDate = new Date(date);
  const formatted = getDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return `${formatted}, ${time}`;
});

const status = computed(() => [
  { label: "Confirmed", active: true },
  { label: getOrders.value?.customer.fulfillment === "delivery" ? "Out for delivery" : "Ready for pickup", active: false },
  { label: getOrders.value?.customer.fulfillment === "delivery" ? "Delivered" : "Picked up", active: false },
])

watch(
  () => route.params.id,
  (newValue) => {
    if (newValue) {
      try {
        const raw = sessionStorage.getItem(`order:${newValue}`);
        if (raw) getOrders.value = JSON.parse(raw);
      } catch (e) {
        console.error("Failed to parse storage:", e);
      }
      isLoaded.value = true;
    }
  },
  {
    immediate: true,
  },
);

const defaultTitle = "Order - The Oven Charms by Michie";

useHead({
  title: getOrders.value
    ? `Order ${getOrders.value.id} - The Oven Charms by Michie`
    : defaultTitle,
  meta: [
    {
      name: "description",
      content: "Your bakery order confirmation.",
    },
  ],
});
</script>

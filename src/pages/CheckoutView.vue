<template>
  <main class="max-w-5xl mx-auto px-5 sm:px-6 pt-6 pb-24">
    <router-link to="/cart"
      class="inline-flex text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground mb-6">
      ← Back to basket
    </router-link>
    <h1 class="font-display text-3xl sm:text-4xl mb-8">Checkout</h1>

    <form @submit="onSubmit" class="grid lg:grid-cols-[1fr_360px] gap-8">
      <div class="space-y-8">
        <section>
          <h2 class="text-xs font-semibold uppercase tracking-widest mb-3">
            How
          </h2>
          <div class="grid grid-cols-2 gap-3">
            <Button v-for="deliver in modeOfDelivery" :key="deliver" type="button" @click="handleFulfillment(deliver)"
              :class="[
                'py-6.5 rounded-2xl border text-sm font-semibold transition-all',
                fulfillment === deliver
                  ? 'bg-foreground text-background border-foreground'
                  : 'text-black bg-card border-foreground/10 hover:border-foreground/30',
              ]">
              {{ deliver === "delivery" ? "Delivery" : "Pickup" }}
            </Button>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-xs font-semibold uppercase tracking-widest">
            Your details
          </h2>
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel for="name">Full Name</FormLabel>
              <FormControl>
                <Input id="name" type="text" v-bind="componentField" :class="[inputCls]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <div class="flex flex-col sm:grid sm:grid-cols-2 gap-4 items-start">
            <FormField v-slot="{ componentField }" name="phone">
              <FormItem>
                <FormLabel for="phone">Phone Number</FormLabel>
                <FormControl>
                  <Input id="phone" type="text" v-bind="componentField" :class="[inputCls]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel for="email">Email</FormLabel>
                <FormControl>
                  <Input id="email" type="text" v-bind="componentField" :class="[inputCls]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div v-if="fulfillment === 'delivery'" class="space-y-4">
            <FormField v-slot="{ componentField }" name="address">
              <FormItem>
                <FormLabel for="address">Delivery address</FormLabel>
                <FormControl>
                  <Input id="address" type="text" v-bind="componentField" :class="[inputCls]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="instructions">
              <FormItem>
                <FormLabel for="instructions">Delivery instructions (optional)</FormLabel>
                <FormControl>
                  <Textarea id="instructions" v-bind="componentField" :class="[textAreaCls]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div class="flex flex-col sm:grid sm:grid-cols-2 gap-4 items-start">
            <FormField v-slot="{ value, handleChange }" name="date">
              <FormItem class="flex flex-col">
                <FormLabel>
                  {{
                    fulfillment === "delivery" ? "Delivery date" : "Pickup date"
                  }}
                </FormLabel>

                <Popover v-slot="{ close }">
                  <PopoverTrigger as-child>
                    <FormControl>
                      <Button variant="outline" :class="[
                        'w-full justify-between text-left font-normal rounded-xl py-6 border-foreground/10 bg-card',
                        !value && 'text-muted-foreground',
                      ]">
                        <span>{{
                          value ? formatDate(value) : "Select date"
                        }}</span>
                        <CalendarIcon class="h-4 w-4 opacity-50 shrink-0" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent class="w-auto p-3 bg-card border border-foreground/10 shadow-lg rounded-2xl z-50"
                    align="start">
                    <Calendar :model-value="value ? parseDate(value) : undefined" @update:model-value="
                      (val) => (handleChange(val?.toString()), close())
                    " layout="month-and-year" :default-placeholder="defaultPlaceholder" initial-focus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ value, handleChange }" name="time">
              <FormItem>
                <FormLabel>Preferred Time</FormLabel>
                <Select :model-value="value ?? ''" @update:model-value="handleChange">
                  <FormControl>
                    <SelectTrigger class="w-full rounded-xl border-foreground/10 bg-card py-6">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent class="rounded-xl border-foreground/10 bg-card shadow-lg z-50">
                    <SelectGroup>
                      <SelectItem v-for="slot in timeSlots" :key="slot.id" :value="String(slot.value)">
                        {{ slot.value }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </section>

        <section>
          <h2 class="text-xs font-semibold uppercase tracking-widest mb-3">
            Payment
          </h2>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Button v-for="item in paymentMethods" :key="item.id" type="button" :class="[
              'py-5 px-2 rounded-xl border text-xs font-semibold transition-all',
              payment === item.id
                ? 'bg-foreground text-background border-foreground'
                : 'text-black bg-card border-foreground/10 hover:border-foreground/30',
            ]" @click="handlePayment(item.id)">
              {{ item.label }}
            </Button>
          </div>
        </section>
      </div>

      <aside class="bg-card border border-foreground/5 rounded-2xl p-5 h-fit lg:sticky lg:top-24 space-y-3">
        <h2 class="text-xs font-semibold uppercase tracking-widest mb-2">
          Order summary
        </h2>
        <ul class="space-y-2 max-h-60 overflow-y-auto pr-1">
          <li v-for="item in items" :key="item.id" class="flex justify-between items-center text-sm gap-3">
            <span class="min-w-0 truncate flex items-center gap-2">
              <span class="font-mono text-xs text-muted-foreground">× {{ item.quantity }}</span>
              {{ item.name }}
            </span>
            <span class="font-mono text-xs shrink-0">
              {{ formatPrice(item.price * item.quantity) }}
            </span>
          </li>
        </ul>
        <div class="border-t border-foreground/10 pt-3 space-y-1.5">
          <div class="flex justify-between text-sm">
            <span class="text-muted-foreground">Total</span>
            <span class="font-mono">{{ formatPrice(subTotal) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-muted-foreground">Delivery</span>
            <span class="font-mono">{{
              delivery === 0 ? "Free" : formatPrice(delivery)
            }}</span>
          </div>
          <div class="flex justify-between pt-2 border-t border-foreground/10">
            <span class="font-display text-lg">Total</span>
            <span class="font-mono text-lg">{{ formatPrice(total) }}</span>
          </div>
        </div>
        <Button type="submit" :disabled="isSubmitting"
          class="w-full bg-primary text-primary-foreground rounded-xl py-6.5 font-semibold hover:brightness-110 transition-all disabled:opacity-60">
          {{
            isSubmitting
              ? "Placing order…"
              : `Place order · ${formatPrice(total)}`
          }}
        </Button>
      </aside>
    </form>
  </main>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice, useCart } from "@/composables/useCart";
import { DELIVERY_FEE, FREE_THRESHOLD } from "@/constants/cart.constant";
import {
  inputCls,
  paymentMethods,
  textAreaCls,
  timeSlots,
} from "@/constants/checkout.constant";
import { checkoutSchema } from "@/lib/validation";
import {
  getLocalTimeZone,
  today,
  parseDate,
} from "@internationalized/date";
import { CalendarIcon } from "@lucide/vue";
import { useHead } from "@unhead/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

type DeliveryType = "delivery" | "pickup";
type PaymentType = "cod" | "gcash" | "maya";

const modeOfDelivery: DeliveryType[] = ["delivery", "pickup"];

const router = useRouter();
const { items, subTotal, clearCart } = useCart();
const isPlacing = ref<boolean>(false);
const isMounted = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);
const fulfillment = ref<DeliveryType>("delivery");
const payment = ref<PaymentType>("cod");
const defaultPlaceholder = today(getLocalTimeZone());

const delivery = computed(() =>
  fulfillment.value === "pickup" || subTotal.value >= FREE_THRESHOLD
    ? 0
    : DELIVERY_FEE,
);
const total = computed(() => subTotal.value + delivery.value);

const form = useForm({
  validationSchema: toTypedSchema(checkoutSchema),
  initialValues: {
    fulfillment: fulfillment.value,
    payment: payment.value,
  },
});

const onSubmit = form.handleSubmit(async (values) => {
  isPlacing.value = true;
  isSubmitting.value = true;
  const orderId = `SC-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  const submittedValues = JSON.stringify({
    id: orderId,
    items: items.value,
    subTotal: subTotal.value,
    delivery: delivery.value,
    total: total.value,
    customer: values,
    createdAt: new Date().toISOString(),
  });
  try {
    sessionStorage.setItem(`order:${orderId}`, submittedValues);
  } catch (error) {
    console.error("Error saving order:", error);
  } finally {
    setTimeout(() => {
      router.push({
        name: "order",
        params: { id: orderId },
      });
      clearCart?.();
    }, 500);
  }
});

const handleFulfillment = (value: DeliveryType) => {
  fulfillment.value = value;
  form.setFieldValue("fulfillment", value);
};

const handlePayment = (value: string) => {
  const getValue = value as PaymentType;
  payment.value = getValue;
  form.setFieldValue("payment", getValue);
};

const formatDate = (date: Date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

watch(
  [isMounted, isPlacing, () => items.value.length],
  ([isMounted, isPlacing, linesLength]) => {
    if (isMounted && !isPlacing && linesLength === 0) {
      router.replace("/cart");
    }
  },
  { immediate: true },
);

onMounted(() => {
  isMounted.value = true;
});

useHead({
  title: "Checkout - The Oven Charms by Michie",
  meta: [
    {
      name: "description",
      content: "Complete your bakery order.",
    },
  ],
});
</script>

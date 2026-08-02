import CartView from "@/pages/CartView.vue";
import CheckoutView from "@/pages/CheckoutView.vue";
import HomePage from "@/pages/HomeView.vue";
import MenuView from "@/pages/MenuView.vue";
import OrderView from "@/pages/OrderView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/menu",
    name: "menu",
    component: MenuView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/order",
    name: "order",
    component: OrderView,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutView,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/HomeView.vue"),
  },
  {
    path: "/menu",
    name: "menu",
    component: () => import("@/pages/MenuView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/pages/CartView.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/pages/OrderView.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("@/pages/CheckoutView.vue"),
  },
  {
    path: "/product/:id",
    name: "product",
    component: () => import("@/pages/ProductView.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

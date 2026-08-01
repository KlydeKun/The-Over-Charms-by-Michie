import CartView from "@/pages/CartView.vue";
import HomePage from "@/pages/HomeView.vue";
import MenuView from "@/pages/MenuView.vue";
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
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

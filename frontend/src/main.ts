import { createApp } from "vue";
import { createHead } from "@unhead/vue/client";
import App from "./App.vue";
import "./style.css";
import { router } from "./router/route";

const app = createApp(App);
const head = createHead();
app.use(head);
app.use(router);
app.mount("#app");

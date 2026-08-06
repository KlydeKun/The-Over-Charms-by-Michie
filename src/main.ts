import { createApp } from "vue";
import { createHead } from "@unhead/vue/client";
import App from "./App.vue";
import "./style.css";
import { router } from "./router/route";
import "vue-sonner/style.css";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";

// Initialize Vercel tracking
inject();
injectSpeedInsights();

const app = createApp(App);
const head = createHead();
app.use(head);
app.use(router);
app.mount("#app");

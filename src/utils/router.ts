import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "App",
    component: () => import("../App.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import mapView from "../views/mapView.vue";

const routes = [
  {
    path: "/",
    component: mapView,
  },
  {
    path: "/view",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TILTLE}/${to.name}`;
  next();
});
export default router;

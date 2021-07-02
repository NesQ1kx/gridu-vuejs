import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: { name: "CharactersList", query: { page: 1 } },
  },
  {
    path: "/characters",
    name: "CharactersList",
    component: () => import(/* webpackChunkName: "characters" */ "../views/CharactersList.vue")
  },
  {
    path: "/favourites",
    name: "Favourites",
    component: () => import(/* webpackChunkName: "favourites" */ "../views/FavouritesList.vue"),
  },
  {
    path: "/character/:id",
    name: "CharacterDetails",
    component: () => import(/* webpackChunkName: "character" */ "../views/CharacterDetails.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "NotFound" }
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "notFound" */ "../views/NotFound.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/about/:username",
      name: "about",
      props: true,
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: () => import("../views/Edit.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/details/:id",
      name: "details",
      component: () => import("../views/Details.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/SignUp.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/Profile.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/change-password",
      name: "change-password",
      component: () => import("../views/ChangePassword.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next("/login");
  } else {
    next();
  }
});

export default router

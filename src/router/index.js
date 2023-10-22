import { createRouter, createWebHistory } from "vue-router";

import Layout from "../components/layouts/Layout.vue";
import Home from "../components/Home.vue";
import Products from "../components/Products.vue";
import About from "../components/static/About.vue";
import Contact from "../components/static/Contact.vue";
import Login from "../components/auth/Login.vue";
import Registration from "../components/auth/Registration.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "/shop",
        name: "shop",
        component: Products,
      },
      {
        path: "/about",
        name: "about",
        component: About,
      },
      {
        path: "/contact",
        name: "contact",
        component: Contact,
      },
      {
        path: "/login",
        name: "login",
        component: Login,
      },
      {
        path: "/registration",
        name: "registration",
        component: Registration,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

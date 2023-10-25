import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

import Layout from "../components/layouts/Layout.vue";
import Home from "../components/Home.vue";
import Products from "../components/Products.vue";
import Product from "../components/SingleProduct.vue";
import About from "../components/static/About.vue";
import Contact from "../components/static/Contact.vue";
import Cart from "../components/Cart.vue";
import Wishlist from "../components/Wishlist.vue";
import Dashboard from "../components/auth/Dashboard.vue";
import Profile from "../components/auth/Profile.vue";
import ChangePassword from "../components/auth/ChangePassword.vue";
import Orders from "../components/auth/Orders.vue";
import PaymentMethods from "../components/auth/PaymentMethods.vue";
import Reviews from "../components/auth/Reviews.vue";
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
        path: "/shop/:category?",
        name: "shop",
        component: Products,
      },
      {
        path: "/shop/product/:id",
        name: "product",
        component: Product,
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
        path: "/wishlist",
        name: "wishlist",
        component: Wishlist,
      },
      {
        path: "/cart",
        name: "cart",
        component: Cart,
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
        children: [
          {
            path: "/profile",
            name: "profile",
            component: Profile,
          },
          {
            path: "/change-password",
            name: "change-password",
            component: ChangePassword,
          },
          {
            path: "/orders",
            name: "orders",
            component: Orders,
          },
          {
            path: "/reviews",
            name: "reviews",
            component: Reviews,
          },
          {
            path: "/payment-methods",
            name: "payment-methods",
            component: PaymentMethods,
          },
        ],
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

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/");
  } else {
    next();
  }
});

export default router;

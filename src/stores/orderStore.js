import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [],
  }),
  getters: {

  },
  actions: {
    createOrder(cartItems) {
        this.orders.push(...cartItems);
        return {
          success: true,
          message: "Order placed successfully!",
        };
    },
  },
  persist: true,
});

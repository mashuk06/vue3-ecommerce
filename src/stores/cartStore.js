import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
  }),
  getters: {
    isProductInCart: (state) => (productId) => {
      return state.some((item) => item.id === productId); // Check if product exists in cart
    },
    getCartQuantity: (state) => {
      let totalQuantity = 0;

      for (const productId in state.cart) {
        totalQuantity += state.cart[productId].quantity;
      }

      return totalQuantity;
    },
    getTotalPrice: (state) => {
      let totalPrice = 0;

      for (const productId in state.cart) {
        const product = state.cart[productId];
        totalPrice += product.quantity * product.price;
      }

      return totalPrice.toFixed(2);
    },
  },
  actions: {
    addToCart(product) {
      const index = this.cart.findIndex((item) => item.id === product.id);

      if (index !== -1) {
        this.cart[index].quantity++;
      } else {
        product.quantity = 1;
        this.cart.push(product);
      }

      return { success: true, message: "Product added to cart!" };
    },
    removeFromCart(productId) {
      const index = this.cart.findIndex((product) => product.id === productId);
      if (index !== -1) {
        this.cart.splice(index, 1);
        return { success: true, message: "Product removed from cart!" };
      } else {
        return { success: false, message: "Product not found in cart!" };
      }
    },
    clearCart(){
      this.cart = []
    }
  },
  persist: true,
});

import { defineStore } from "pinia";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    wishlist: [],
  }),
  getters: {
    isProductInWishlist: (state) => (product) => {
      return state.wishlist.some((item) => item.id === product.id);
    },
    countWishlist: (state) => {
      return state.wishlist.length;
    },
  },
  actions: {
    addToWishList(product) {
      if (!this.isProductInWishlist(product)) {
        this.wishlist.push(product);
        return {
          success: true,
          message: "Product added to wishlist!",
        };
      } else {
        return {
          success: false,
          message: "Product is already in the wishlist!",
        };
      }
    },
    removeFromWishlist(productId) {
      const index = this.wishlist.findIndex((item) => item.id === productId);
      if (index !== -1) {
        this.wishlist.splice(index, 1);
        return {
          success: true,
          message: "Product removed from wishlist!",
        };
      } else {
        return {
          success: false,
          message: "Product not found in the wishlist!",
        };
      }
    },
  },
  persist: true,
});

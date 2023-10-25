<script setup>
  import { ref, onBeforeMount } from 'vue'
  import axios from 'axios'
  import { useRoute } from 'vue-router';
  import { useWishlistStore } from '../stores/wishlistStore'
  import { useCartStore } from '../stores/cartStore'
  import { toast } from 'vue3-toastify'
  import 'vue3-toastify/dist/index.css'

  const product = ref('')
  const route = useRoute()

  const quantity = ref(1);

  const increment = () => {
    quantity.value++;
  }

  const decrement = () => {
    if (quantity.value > 1) {
      quantity.value--;
    }
  }

  const wishList = useWishlistStore()
  const addToWishList = (product) => {
    const result = wishList.addToWishList(product)
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  const cart = useCartStore()
  const addToCart = (product) => {
    const result = cart.addToCart(product,quantity.value)
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }
  const selectedThumbnail = ref('');

  const selectThumbnail = (image) => {
    selectedThumbnail.value = image;
  }

  onBeforeMount(() => {
    axios.get('https://dummyjson.com/products/' + route.params.id)
      .then(res => {
        console.log(res.data)
        product.value = res.data
        selectedThumbnail.value = res.data.thumbnail
      })
  })
</script>

<template>
  <div class="container grid grid-cols-2 gap-6">
    <div>
      <img :src="selectedThumbnail" style="height:400px;width: 600px;" :alt="product.title" class="w-full">
      <div class="grid grid-cols-5 gap-4 mt-4">
        <img @click.prevent="selectThumbnail(image)" v-for="image,index in product.images" :key="index" :src="image"
          :alt="product.title" style="height: 80px; width: 100px;" class="w-full cursor-pointer border border-primary">
      </div>
    </div>

    <div>
      <h2 class="text-3xl font-medium uppercase mb-2">{{ product.title }}</h2>
      <div class="flex items-center mb-4">
        <div class="flex gap-1 text-sm text-yellow-400">
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
        </div>
        <div class="text-xs text-gray-500 ml-3">(150 Reviews)</div>
      </div>
      <div class="space-y-2">
        <p class="text-gray-800 font-semibold space-x-2">
          <span>Availability: </span>
          <span class="text-green-600">{{ product.stock }} In Stock</span>
        </p>
        <p class="space-x-2">
          <span class="text-gray-800 font-semibold">Brand: </span>
          <span class="text-gray-600">{{ product.brand }}</span>
        </p>
        <p class="space-x-2">
          <span class="text-gray-800 font-semibold">Category: </span>
          <span class="text-gray-600">{{ product.category }}</span>
        </p>
      </div>
      <div class="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
        <p class="text-xl text-primary font-semibold">${{ product.price }}</p>
      </div>

      <p class="text-gray-800 font-semibold space-x-2">
        <span>Description: </span>
        <p class="mt-4 text-gray-600">{{ product.description }}</p>
      </p>

      <div class="mt-4">
        <h3 class="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
        <div class="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
          <div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none" @click="decrement">-
          </div>
          <div class="h-8 w-8 text-base flex items-center justify-center">{{ quantity }}</div>
          <div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none" @click="increment">+
          </div>
        </div>
      </div>
      <div class="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
        <a @click.prevent="addToCart(product)"
          class="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition cursor-pointer">
          <i class="fa-solid fa-bag-shopping"></i> Add to cart
        </a>
        <a @click.prevent="addToWishList(product)"
          class="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition cursor-pointer">
          <i class="fa-solid fa-heart"></i> Wishlist
        </a>
      </div>

      <div class="flex gap-3 mt-4">
        <a href="#"
          class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
          <i class="fa-brands fa-facebook-f"></i>
        </a>
        <a href="#"
          class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
          <i class="fa-brands fa-twitter"></i>
        </a>
        <a href="#"
          class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
          <i class="fa-brands fa-instagram"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

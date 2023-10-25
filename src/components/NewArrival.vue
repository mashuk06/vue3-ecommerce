<script setup>
    import { ref, onBeforeMount } from 'vue'
    import axios from 'axios'
    import { useWishlistStore } from '../stores/wishlistStore'
    import { useCartStore } from '../stores/cartStore'
    import { toast } from 'vue3-toastify'
    import 'vue3-toastify/dist/index.css'

    const wishList = useWishlistStore()
    const addToWishList = (product) => {
        const result = wishList.addToWishList(product)
        if(result.success){
            toast.success(result.message)
        }else{
            toast.error(result.message)
        }
    }

    const cart = useCartStore()
    const addToCart = (product) => {
        const result = cart.addToCart(product)
        if(result.success){
            toast.success(result.message)
        }else{
            toast.error(result.message)
        }
    }

    const newProducts = ref([])
    onBeforeMount(() => {
        axios.get('https://dummyjson.com/products?limit=4&skip=65')
            .then(res => {
                newProducts.value = res.data.products
            })
    })


</script>

<template>
    <div class="container pb-16">
        <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">top new arrival</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div v-for="product,index in newProducts" :key="index"
                class="bg-white shadow rounded overflow-hidden group">
                <div class="relative">
                    <img :src="product.thumbnail" style="height: 260px !important;width: 294px !important;" alt="product 1" class="w-full">
                    <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                        <a href="#"
                            class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                            title="view product">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </a>
                        <a @click.prevent="addToWishList(product)"
                            class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                            title="add to wishlist">
                            <i class="fa-solid fa-heart"></i>
                        </a>
                    </div>
                </div>
                <div class="pt-4 pb-3 px-4">
                    <a href="#">
                        <h4 class="uppercase font-medium text-sm mb-2 text-gray-800 hover:text-primary transition">{{
                            product.title }}</h4>
                    </a>
                    <div class="flex items-baseline mb-1 space-x-2">
                        <p class="text-xl text-primary font-semibold">${{ product.price }}</p>
                    </div>
                    <div class="flex items-center">
                        <div class="flex gap-1 text-sm text-yellow-400">
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                        </div>
                        <div class="text-xs text-gray-500 ml-3">(150)</div>
                    </div>
                </div>
                <a @click.prevent="addToCart(product)"
                    class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition cursor-pointer">Add
                    to cart</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

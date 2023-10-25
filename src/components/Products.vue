<script setup>
    import { ref, onBeforeMount } from 'vue'
    import axios from 'axios'
    import { useCartStore } from '../stores/cartStore'
    import { useWishlistStore } from '../stores/wishlistStore'
    import { toast } from 'vue3-toastify'
    import 'vue3-toastify/dist/index.css'

    const products = ref([])
    const categories = ref([])

    const cart = useCartStore()
    const addToCart = (product) => {
        const result = cart.addToCart(product)
        if (result.success) {
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }
    }

    const wishList = useWishlistStore()
    const addToWishList = (product) => {
        const result = wishList.addToWishList(product)
        if(result.success){
            toast.success(result.message)
        }else{
            toast.error(result.message)
        }
    }

    const loadMoreProducts = () => {
        axios.get('https://dummyjson.com/products?limit=9&skip=9')
            .then(res => {
                products.value = [...products.value, ...res.data.products]
            })
    }

    const getCategoryProducts = (category) => {
        axios.get('https://dummyjson.com/products/category/' + category)
            .then(res => {
                products.value = []
                products.value = [...products.value, ...res.data.products]
            })
    }


    onBeforeMount(() => {
        axios.get('https://dummyjson.com/products?limit=9')
            .then(res => {
                products.value = res.data.products
            })
        axios.get('https://dummyjson.com/products/categories')
            .then(res => {
                categories.value = res.data
            })
    })
</script>

<template>
    <div class="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <div class="text-center md:hidden">
            <button
                class="text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block md:hidden"
                type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example"
                aria-controls="drawer-example">
                <ion-icon name="grid-outline"></ion-icon>
            </button>
        </div>
        <!-- ./sidebar -->
        <div class="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
            <div class="divide-y divide-gray-200 space-y-5">
                <div>
                    <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Categories</h3>
                    <div class="space-y-2">
                        <div v-for="category,index in categories" :key="index" class="flex items-center">
                            <div @click="getCategoryProducts(category)"
                                class="text-gray-600 ml-3 cusror-pointer uppercase cursor-pointer">{{ category }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- products -->
        <div class="col-span-3">
            <div class="flex items-center mb-4">
                <select name="sort" id="sort"
                    class="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
                    <option value="">Default sorting</option>
                    <option value="price-low-to-high">Price low to high</option>
                    <option value="price-high-to-low">Price high to low</option>
                </select>

                <div class="flex gap-2 ml-auto">
                    <div
                        class="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
                        <i class="fa-solid fa-grip-vertical"></i>
                    </div>
                    <div
                        class="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer">
                        <i class="fa-solid fa-list"></i>
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-3 grid-cols-2 gap-6">
                <div v-for="product,index in products" :key="index"
                    class="bg-white shadow rounded overflow-hidden group">
                    <div class="relative">
                        <img :src="product.thumbnail" style="height: 294px !important; width: 294px !important"
                            :alt="product.title" class="w-full">
                        <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center
                        justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                            <a href="#"
                                class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                title="view product">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </a>
                            <a @click.prevent="addToWishList(product)"
                                class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition cursor-pointer"
                                title="add to wishlist">
                                <i class="fa-solid fa-heart"></i>
                            </a>
                        </div>
                    </div>
                    <div class="pt-4 pb-3 px-4">
                        <a href="#">
                            <h4 class="uppercase font-medium text-sm mb-2 text-gray-800 hover:text-primary transition">
                                {{ product.title }}</h4>
                        </a>
                        <div class="flex items-baseline mb-1 space-x-2">
                            <p class="text-xl text-primary font-semibold">${{ product.price}}</p>
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
            <div class="flex flex-col items-center">
                <button @click="loadMoreProducts()"
                    class="bg-gray-500 hover:bg-primary text-white font-bold my-5 py-3 px-4 rounded cursor-pointer"
                    v-if="products.length > 0">Load More Products</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

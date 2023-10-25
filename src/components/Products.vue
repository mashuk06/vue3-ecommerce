<script setup>
    import { ref, onBeforeMount, onMounted, computed } from 'vue'
    import axios from 'axios'
    import { useRoute } from 'vue-router';
    import { useCartStore } from '../stores/cartStore'
    import { useWishlistStore } from '../stores/wishlistStore'
    import { toast } from 'vue3-toastify'
    import 'vue3-toastify/dist/index.css'

    const products = ref([])
    const categories = ref([])
    const route = useRoute()

    const sortProducts = (event) => {
        const sortOrder = event.target.value;
        if (sortOrder === 'price-low-to-high') {
            products.value = [...products.value].sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'price-high-to-low') {
            products.value = [...products.value].sort((a, b) => b.price - a.price);
        } else {
            products.value = [...products.value]; // Reset to original order
        }
    }

    const searchProducts = (event) => {
        const searchKey = event.target.value
        if (searchKey.length > '2') {
            products.value = products.value.filter(product => {
                return product.title.toLowerCase().includes(searchKey)
            })
        } else {
            const categoryParam = route.params.category
            if (categoryParam) {
                axios.get(`https://dummyjson.com/products/category/${categoryParam}`)
                    .then(res => {
                        products.value = []
                        products.value = [...products.value, ...res.data.products]
                    });
            } else {
                axios.get('https://dummyjson.com/products?limit=9')
                    .then(res => {
                        products.value = res.data.products
                    })
            }
        }
    }


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
        if (result.success) {
            toast.success(result.message)
        } else {
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

    onMounted(() => {
        const categoryParam = route.params.category
        if (categoryParam) {
            axios.get(`https://dummyjson.com/products/category/${categoryParam}`)
                .then(res => {
                    products.value = []
                    products.value = [...products.value, ...res.data.products]
                });
        }
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
                <select @change="sortProducts($event)" name="sort" id="sort"
                    class="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
                    <option value="">Default sorting</option>
                    <option value="price-low-to-high" @click="highToLow">Price low to high</option>
                    <option value="price-high-to-low">Price high to low</option>
                </select>

                <div class="flex gap-1 ml-auto mr-2">
                    <input type="text" @input="searchProducts($event)" name="search" id="search"
                        class="w-full border border-primary border-r-0 rounded mr-2  focus:outline-none"
                        placeholder="search">
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
                            <router-link :to="{ name: 'product' , params: { id: product.id }}"
                                class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                title="view product">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </router-link>
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

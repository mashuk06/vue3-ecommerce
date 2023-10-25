<script setup>
    import { ref, onBeforeMount } from 'vue'
    import axios from 'axios'
    import { useAuthStore } from '../stores/authStore'

    const auth = useAuthStore()
    const categories = ref([])

    onBeforeMount(() => {
        axios.get('https://dummyjson.com/products/categories')
            .then(res => {
                categories.value = res.data
            })
    })

</script>

<template>
    <nav class="bg-gray-800">
        <div class="container flex">
            <div class="px-8 py-4 bg-primary flex items-center cursor-pointer relative group">
                <span class="text-white">
                    <i class="fa-solid fa-bars"></i>
                </span>
                <span class="capitalize ml-2 text-white">All Categories</span>
                <div
                    class="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
                    <router-link :to="{ name: 'shop' , params: { category: category}}"
                        v-for="category,index in categories" :key="index"
                        class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                        <span class="ml-6 text-gray-600 text-sm">{{ category }}</span>
                    </router-link>
                </div>
            </div>

            <div class="flex items-center justify-between flex-grow pl-12">
                <div class="flex items-center space-x-6 capitalize">
                    <router-link :to="{ name: 'home' }"
                        class="text-gray-200 hover:text-white transition">Home</router-link>
                    <router-link :to="{ name: 'shop' }"
                        class="text-gray-200 hover:text-white transition">Shop</router-link>
                    <router-link :to="{ name: 'about' }" class="text-gray-200 hover:text-white transition">About
                        us</router-link>
                    <router-link :to="{ name: 'contact'}" class="text-gray-200 hover:text-white transition">Contact
                        us</router-link>
                </div>
                <router-link v-if="!auth.currentUser" :to="{ name: 'login'}"
                    class="text-gray-200 hover:text-white transition">Login/Register</router-link>
            </div>
        </div>
    </nav>
</template>

<style scoped>
</style>

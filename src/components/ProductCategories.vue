<script setup>
    import { ref, onBeforeMount } from 'vue'
    import axios from 'axios'

    const categories = ref([])
    onBeforeMount(() => {
        axios.get('https://dummyjson.com/products/categories')
            .then(res => {
                categories.value = res.data
            })
    })
</script>

<template>
    <div class="container py-16">
        <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">shop by category</h2>
        <div class="grid grid-cols-6 gap-3">
            <div class="relative rounded-sm overflow-hidden group" v-for="category,index in categories" :key="index">
                <img :src="`https://source.unsplash.com/random/200x200?sig=${index}`" alt="category 1" class="w-full">
                <router-link :to="{ name: 'shop', params: { category: category }}"
                    class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-sm text-white font-roboto font-medium group-hover:bg-opacity-60 transition uppercase">{{
                    category }}</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

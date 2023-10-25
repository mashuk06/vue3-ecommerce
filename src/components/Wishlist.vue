<script setup>
    import { useWishlistStore } from '../stores/wishlistStore'
    import { useCartStore } from '../stores/cartStore'
    import { toast } from 'vue3-toastify'
    import 'vue3-toastify/dist/index.css'

    const wishlist = useWishlistStore()
    const products = wishlist.wishlist

    const removeFromWishlist = (productId) => {
        const result = wishlist.removeFromWishlist(productId)
        if (result.success) {
            toast.warning(result.message)
        } else {
            toast.error(result.message)
        }
    }

    const cart = useCartStore()
    const addToCart = (product) => {
        const result = cart.addToCart(product)
        if(result.success){
            removeFromWishlist(product.id)
            toast.success(result.message)
        }else{
            toast.error(result.message)
        }
    }
</script>

<template>
    <div class="col-span-9 space-y-4">
        <div v-for="product,index in products" :key="index"
            class="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
            <div class="w-28">
                <img :src="product.thumbnail" alt="product 6" class="w-full">
            </div>
            <div class="w-1/3">
                <h2 class="text-gray-800 text-xl font-medium uppercase">{{ product.title }}</h2>
                <p class="text-gray-500 text-sm">Availability: <span class="text-green-600">In Stock</span></p>
            </div>
            <div class="text-primary text-lg font-semibold">${{ product.price }}</div>
            <a @click.prevent="addToCart(product)"
                class="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium cursor-pointer">add
                to cart</a>

            <div @click.prevent="removeFromWishlist(product.id)"
                class="text-gray-600 cursor-pointer hover:text-primary">
                <i class="fa-solid fa-trash"></i>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

<script setup>
    import { computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useWishlistStore } from '../stores/wishlistStore'
    import { useCartStore } from '../stores/cartStore'
    import { useAuthStore } from '../stores/authStore'
    import { toast } from 'vue3-toastify'
    import 'vue3-toastify/dist/index.css'

    const wishlist = useWishlistStore()
    const cart = useCartStore()
    const auth = useAuthStore()
    const route = useRoute()
    const router = useRouter()

    const goToWishlist = () => {
        if (auth.currentUser) {
            router.push('/wishlist')
        } else {
            toast.info('Please Login first !')
            setTimeout(() => {
                router.push('/login')
            }, 1000)

        }
    }
</script>

<template>
    <header class="py-4 shadow-sm bg-white">
        <div class="container flex items-center justify-between">
            <router-link :to="{ name: 'home' }"><img src="/vue.svg" alt="Logo"></router-link>
            <div class="flex items-center space-x-4 cursor-pointer">
                <router-link :to="{ name: 'wishlist' }"
                    class="text-center text-gray-700 hover:text-primary transition relative">
                    <div class="text-2xl">
                        <i class="fa-regular fa-heart"></i>
                    </div>
                    <div class="text-xs leading-3">Wishlist</div>
                    <div
                        class="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                        {{ wishlist.countWishlist }}</div>
                </router-link>
                <router-link :to="{ name: 'cart' }" class="text-center text-gray-700 hover:text-primary transition relative cursor-pointer">
                    <div class="text-2xl">
                        <i class="fa-solid fa-bag-shopping"></i>
                    </div>
                    <div class="text-xs leading-3">Cart</div>
                    <div
                        class="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                        {{ cart.getCartQuantity }}</div>
                </router-link>
                <router-link v-if="auth.currentUser" :to="{ name: 'dashboard' }"
                    class="text-center text-gray-700 hover:text-primary transition relative">
                    <div class="text-2xl">
                        <i class="fa-regular fa-user"></i>
                    </div>
                    <div class="text-xs leading-3">Account</div>
                </router-link>
                <router-link v-else :to="{ name: 'login' }"
                    class="text-center text-gray-700 hover:text-primary transition relative">
                    <div class="text-2xl">
                        <i class="fa-regular fa-user"></i>
                    </div>
                    <div class="text-xs leading-3">Account</div>
                </router-link>
            </div>
        </div>
    </header>
</template>

<style scoped>
</style>

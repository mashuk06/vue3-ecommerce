<script setup>
  import { useAuthStore } from '../../stores/authStore'
  import { toast } from 'vue3-toastify'
  import 'vue3-toastify/dist/index.css'
  import { useRouter } from 'vue-router'

  const auth = useAuthStore()
  const router = useRouter()

  const logout = () => {
    auth.logout()
    toast.success('Logged Out Successfully!')
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }
</script>

<template>
  <div class="container grid grid-cols-12 items-start gap-6 pt-4 pb-16">
    <div class="col-span-3">
      <div class="px-4 py-3 shadow flex items-center gap-4">
        <div class="flex-shrink-0">
          <img src="assets/images/avatar.png" alt="profile"
            class="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover">
        </div>
        <div class="flex-grow">
          <p class="text-gray-600">Hello,</p>
          <h4 class="text-gray-800 font-medium">{{ auth.currentUser?.name }}</h4>
        </div>
      </div>

      <div class="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
        <div class="space-y-1 pl-8">
          <a href="#" class="relative text-primary block font-medium capitalize transition">
            <span class="absolute -left-8 top-0 text-base">
              <i class="fa-regular fa-address-card"></i>
            </span>
            Manage account
          </a>
          <router-link :to="{ name: 'profile' }" class="relative hover:text-primary block capitalize transition">
            Profile information
          </router-link>
          <router-link :to="{ name: 'change-password' }"
            class="relative hover:text-primary block capitalize transition">
            Change password
          </router-link>
        </div>
        <div class="space-y-1 pl-8 pt-4">
          <a href="javascript:;" class="relative hover:text-primary block font-medium capitalize transition">
            <span class="absolute -left-8 top-0 text-base">
              <i class="fa-solid fa-box-archive"></i>
            </span>
            My order history
          </a>
          <router-link :to="{ name: 'orders' }" class="relative hover:text-primary block capitalize transition">
            My Orders
          </router-link>
          <router-link :to="{ name: 'reviews' }" class="relative hover:text-primary block capitalize transition">
            My reviews
          </router-link>
        </div>
        <div class="space-y-1 pl-8 pt-4">
          <router-link :to="{ name: 'payment-methods' }"
            class="relative hover:text-primary block font-medium capitalize transition">
            <span class="absolute -left-8 top-0 text-base">
              <i class="fa-regular fa-credit-card"></i>
            </span>
            Payment methods
          </router-link>
        </div>
        <div class="space-y-1 pl-8 pt-4">
          <router-link :to="{ name: 'wishlist' }"
            class="relative hover:text-primary block font-medium capitalize transition">
            <span class="absolute -left-8 top-0 text-base">
              <i class="fa-regular fa-heart"></i>
            </span>
            My wishlist
          </router-link>
        </div>
        <div class="space-y-1 pl-8 pt-4">
          <a @click.prevent="logout" class="relative hover:text-primary block font-medium capitalize transition cursor-pointer">
            <span class="absolute -left-8 top-0 text-base">
              <i class="fa-solid fa-right-from-bracket"></i>
            </span>
            Logout
          </a>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>

<script setup>
    import { onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()
</script>

<template>
    <div v-if="route.name != 'home'" class="container py-4 flex items-center gap-3">
        <router-link :to="{ name: 'home' }" class="text-primary text-base">
            <i class="fa-solid fa-house"></i>
        </router-link>
        <span class="text-sm text-gray-400">
            <i class="fa-solid fa-chevron-right"></i>
        </span>
        <p class="text-gray-600 font-medium uppercase">{{ route.name }}</p>
    </div>
</template>

<style scoped>
</style>

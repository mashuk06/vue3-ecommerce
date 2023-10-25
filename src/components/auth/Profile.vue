<script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '../../stores/authStore'
  const auth = useAuthStore()

  const name = ref(auth.currentUser.name)
  const email = ref(auth.currentUser.email)
</script>

<template>
  <div class="col-span-9 shadow rounded px-6 pt-5 pb-7">
    <h4 class="text-lg font-medium capitalize mb-4">
      Profile information
    </h4>
    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="first">Name</label>
          <input type="text" v-model="name" id="first" class="input-box">
        </div>
        <div>
          <label for="email">Email Address</label>
          <input type="email" v-model="email" id="email" class="input-box">
        </div>
      </div>
    </div>
    <div class="mt-4">
      <button type="submit"
        class="py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">save
        changes</button>
    </div>
  </div>
</template>

<style scoped>
</style>

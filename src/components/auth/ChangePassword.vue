<script setup>
  import { ref, reactive } from 'vue'

</script>

<template>
  <div class="col-span-9 shadow rounded px-6 pt-5 pb-7">
    <h4 class="text-lg font-medium capitalize mb-4">
      Change Password
    </h4>
    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="first">Old Password</label>
          <input type="password" class="input-box">
        </div>
        <div>
          <label for="last">New Password</label>
          <input type="password" class="input-box">
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

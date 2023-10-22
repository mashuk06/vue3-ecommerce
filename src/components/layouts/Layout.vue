<script setup>
  import Header from '../Header.vue'
  import NavBar from '../NavBar.vue'
  import BreadCrumb from '../BreadCrumb.vue'
  import Footer from '../Footer.vue'
  import CopyRights from '../CopyRights.vue'
</script>

<template>
  <div>
    <Header></Header>
    <NavBar></NavBar>
    <BreadCrumb></BreadCrumb>
    <router-view></router-view>
    <Footer></Footer>
    <CopyRights></CopyRights>
  </div>
</template>

<style scoped>
</style>

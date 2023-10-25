<script setup>
  import { ref, onBeforeMount } from "vue";
  import { useOrderStore } from '../../stores/orderStore'

  const orderStore = useOrderStore()
  const products = ref(orderStore.orders);

  const Header = [
    { text: "Product Name", value: "title" },
    { text: "Brand", value: "brand" },
    { text: "Category", value: "category" },
    { text: "Quantity", value: "quantity" },
    { text: "Total", value: "price" },
  ];

</script>

<template>
  <div class="col-span-9 shadow rounded px-6 pt-5 pb-7">
    <h4 class="text-lg font-medium capitalize mb-4">
      Order History
    </h4>
    <EasyDataTable buttons-pagination alternating :headers="Header" :items="products" :rows-per-page="10"
      theme-color="#f48225" table-class-name="customize-table">
      <template #item-price="{ price,quantity }">
        ${{ price * quantity }}
      </template>
    </EasyDataTable>
  </div>
</template>

<style scoped>
  .customize-table {
    --easy-table-border: 1px solid #f48225;
    --easy-table-row-border: 1px solid #f48225;
    --easy-table-header-font-size: 14px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: #c1cad4;
    --easy-table-header-background-color: #2d3a4f;
    --easy-table-header-item-padding: 10px 15px;
    --easy-table-body-even-row-font-color: #fff;
    --easy-table-body-even-row-background-color: #4c5d7a;
    --easy-table-body-row-font-color: #c0c7d2;
    --easy-table-body-row-background-color: #2d3a4f;
    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 14px;
    --easy-table-body-row-hover-font-color: #2d3a4f;
    --easy-table-body-row-hover-background-color: #eee;
    --easy-table-body-item-padding: 10px 15px;
    --easy-table-footer-background-color: #2d3a4f;
    --easy-table-footer-font-color: #c0c7d2;
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 0px 10px;
    --easy-table-footer-height: 50px;
    --easy-table-rows-per-page-selector-width: 70px;
    --easy-table-rows-per-page-selector-option-padding: 10px;
    --easy-table-rows-per-page-selector-z-index: 1;
    --easy-table-scrollbar-track-color: #2d3a4f;
    --easy-table-scrollbar-color: #2d3a4f;
    --easy-table-scrollbar-thumb-color: #4c5d7a;
    --easy-table-scrollbar-corner-color: #2d3a4f;
    --easy-table-loading-mask-background-color: #2d3a4f;
  }
</style>

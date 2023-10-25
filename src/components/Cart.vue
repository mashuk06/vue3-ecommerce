<script setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCartStore } from '../stores/cartStore'
  import { useAuthStore } from '../stores/authStore'
  import { useOrderStore } from '../stores/orderStore'
  import { toast } from 'vue3-toastify'
  import 'vue3-toastify/dist/index.css'

  const auth = useAuthStore()
  const router = useRouter()

  const cart = useCartStore()
  const products = cart.cart

  const shippingAddress = reactive({
    name: auth.currentUser?.name ,
    email: auth.currentUser?.email,
    address: '',
    phone: ''
  })

  const order = useOrderStore()

  const removeFromCart = (productId) => {
    const result = cart.removeFromCart(productId)
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  const placeOrder = () => {
    if(!auth.currentUser) {
      toast.error('Please login to place order !')
      setTimeout(() => {
        router.push('login')
      },2000)
      return false
    }
    if(products.length == 0){
      toast.error('You do not have any product in the cart!')
      return false
    }
    const isAnyEmpty = Object.values(shippingAddress).some(value => value === '');
    if (isAnyEmpty) {
      toast.error('All shipping address fields are required!')
      return false
    } else {
      order.createOrder(cart.cart)
      cart.clearCart()
      toast.success('Order placed successfully')
      setTimeout(() => {
        router.push('orders')
      },2000)
    }
  }
</script>

<template>
  <div class="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
    <div v-if="auth.currentUser && products.length > 0" class="col-span-6 border border-gray-200 p-4 rounded">
      <h3 class="text-lg font-medium capitalize mb-4">Shipping Address</h3>
      <div class="space-y-4">
        <div>
          <label for="name" class="text-gray-600">Name</label>
          <input type="text" v-model="shippingAddress.name" id="name" class="input-box">
        </div>
        <div>
          <label for="email" class="text-gray-600">Email address</label>
          <input type="email" v-model="shippingAddress.email" id="email" class="input-box">
        </div>
        <div>
          <label for="address" class="text-gray-600">Address</label>
          <input type="text" v-model="shippingAddress.address" id="address" class="input-box">
        </div>
        <div>
          <label for="phone" class="text-gray-600">Phone number</label>
          <input type="text" v-model="shippingAddress.phone" id="phone" class="input-box">
        </div>

      </div>
    </div>
    <div class="col-span-6 border border-gray-200 p-4 rounded">
      <h4 class="text-gray-800 text-lg mb-4 font-medium uppercase">order/cart summary</h4>
      <table class="w-full border border-gray-200">
        <thead>
          <tr>
            <th class="p-3 text-left bg-gray-100">Product Title</th>
            <th class="p-3 text-center bg-gray-100">Quantity</th>
            <th class="p-3 text-center bg-gray-100">Price</th>
            <th class="p-3 text-center bg-gray-100">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product,index in products" :key="index" class="hover:bg-gray-100">
            <td class="p-3 border-b border-gray-200">
              <h5 class="text-gray-800 font-medium">{{ product.title }}</h5>
            </td>
            <td class="p-3 text-center border-b border-gray-200">
              <input type="number" min="1" class="text-gray-600 w-16 border border-gray-300 py-1 px-2"
                v-model="product.quantity">
            </td>
            <td class="p-3 text-center border-b border-gray-200">
              <p class="text-gray-800 font-medium">${{ product.price * product.quantity }}</p>
            </td>
            <td class="p-3 text-center border-b border-gray-200">
              <div @click.prevent="removeFromCart(product.id)" class="text-gray-600 cursor-pointer hover:text-primary">
                <i class="fa-solid fa-trash"></i>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="bg-gray-100">
            <td class="p-3 text-left font-medium">Total</td>
            <td class="p-3 text-center font-medium">
              {{ cart.getCartQuantity }}
            </td>
            <td class="p-3 text-center font-medium">
              ${{ cart.getTotalPrice }}
            </td>
            <td class="p-3"></td>
          </tr>
        </tfoot>
      </table>
      <a v-if="products.length > 0" @click.prevent="placeOrder"
        class="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium cursor-pointer">Place
        order</a>
    </div>
  </div>
</template>

<style scoped>
</style>

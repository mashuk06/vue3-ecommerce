<script setup>
    import { ref } from 'vue'
    import { useAuthStore } from '../../stores/authStore'
    import { toast } from 'vue3-toastify'
    import 'vue3-toastify/dist/index.css'
    import { useRouter } from 'vue-router'

    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const agreement = ref(false)

    const router = useRouter()
    const auth = useAuthStore()

    const validation = () => {
        if (!name.value && !email.value && !password.value && !confirmPassword.value) {
            toast.error('All fields are required!')
            return false
        }
        const userExists = auth.checkExistingUser(email.value)
        if (userExists) {
            toast.error('User already exists. Try login!')
            return false
        }
        const passwordMatched = auth.checkPassword(password.value, confirmPassword.value)
        if (!passwordMatched) {
            toast.error('Password and Confirm Password did not match. Try again!')
            return false
        }
        return true
    }
    const signUp = () => {
        if (validation()) {
            const user = { name: name.value, email: email.value, password: password.value };
            auth.registration(user)
            toast.success('Registration successful. You can login now !')
            setTimeout(() => {
                router.push('/login')
            }, 1000)
        }
    }
</script>

<template>
    <div class="contain py-16">
        <div class="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 class="text-2xl uppercase font-medium mb-1">Create an account</h2>
            <p class="text-gray-600 mb-6 text-sm">
                Register As A New Customer
            </p>
            <form action="javascript:;" autocomplete="off">
                <div class="space-y-2">
                    <div>
                        <label for="name" class="text-gray-600 mb-2 block">Full Name</label>
                        <input v-model="name" type="text"
                            class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="Enter your full name">
                    </div>
                    <div>
                        <label for="email" class="text-gray-600 mb-2 block">Email address</label>
                        <input v-model="email" type="email"
                            class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="Enter your email address">
                    </div>
                    <div>
                        <label for="password" class="text-gray-600 mb-2 block">Password</label>
                        <input v-model="password" type="password"
                            class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="******">
                    </div>
                    <div>
                        <label for="confirm" class="text-gray-600 mb-2 block">Confirm password</label>
                        <input v-model="confirmPassword" type="password"
                            class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="******">
                    </div>
                </div>
                <div class="mt-6">
                    <div class="flex items-center">
                        <input type="checkbox" v-model="agreement"
                            class="text-primary focus:ring-0 rounded-sm cursor-pointer">
                        <label for="aggrement" class="text-gray-600 ml-3 cursor-pointer">I have read and agree to the <a
                                href="#" class="text-primary">terms & conditions</a></label>
                    </div>
                </div>
                <div class="mt-4">
                    <button type="submit" @click.prevent="signUp"
                        class="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">create
                        account</button>
                </div>
            </form>

            <!-- login with -->
            <div class="mt-6 flex justify-center relative">
                <div class="text-gray-600 uppercase px-3 bg-white z-10 relative">Or signup with</div>
                <div class="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
            </div>
            <div class="mt-4 flex gap-4">
                <a href="#"
                    class="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">facebook</a>
                <a href="#"
                    class="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">google</a>
            </div>
            <!-- ./login with -->

            <p class="mt-4 text-center text-gray-600">Already have account? <router-link :to="{ name: 'login'}"
                    class="text-primary">Login now</router-link></p>
        </div>
    </div>
</template>

<style scoped>
</style>

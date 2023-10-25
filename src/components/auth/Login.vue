<script setup>
    import { ref } from 'vue'
    import { useAuthStore } from '../../stores/authStore'
    import { toast } from 'vue3-toastify'
    import 'vue3-toastify/dist/index.css'
    import { useRouter } from 'vue-router'

    const email = ref('')
    const password = ref('')

    const router = useRouter()
    const auth = useAuthStore()

    const signIn = () => {
        if (!email.value && !password.value){
            toast.error('Enter email and password to login!')
            return false
        }
        const login = auth.login(email.value, password.value)
        if (login) {
            toast.success('Login successful!')
            setTimeout(() => {
                router.push('/dashboard')
            }, 2000)
        } else {
            toast.error('Username Password did not matched!')
            return false
        }
    }
</script>

<template>
    <div class="contain py-16">
        <div class="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 class="text-2xl uppercase font-medium mb-1">Login</h2>
            <p class="text-gray-600 mb-6 text-sm">
                Welcome Back User
            </p>
            <form action="javascript:;" autocomplete="off">
                <div class="space-y-2">
                    <div>
                        <label for="email" class="text-gray-600 mb-2 block">Email address</label>
                        <input type="email" v-model="email"
                            class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="youremail.@domain.com">
                    </div>
                    <div>
                        <label for="password" class="text-gray-600 mb-2 block">Password</label>
                        <input type="password" v-model="password"
                            class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="******">
                    </div>
                </div>
                <div class="flex items-center justify-between mt-6">
                    <div class="flex items-center">
                        <input type="checkbox" name="remember" id="remember"
                            class="text-primary focus:ring-0 rounded-sm cursor-pointer">
                        <label for="remember" class="text-gray-600 ml-3 cursor-pointer">Remember me</label>
                    </div>
                    <a href="javascript:;" class="text-primary">Forgot password</a>
                </div>
                <div class="mt-4">
                    <button type="submit" @click.prevent="signIn"
                        class="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">Login</button>
                </div>
            </form>

            <!-- login with -->
            <div class="mt-6 flex justify-center relative">
                <div class="text-gray-600 uppercase px-3 bg-white z-10 relative">Or login with</div>
                <div class="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
            </div>
            <div class="mt-4 flex gap-4">
                <a href="javascript:;"
                    class="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">facebook</a>
                <a href="javascript:;"
                    class="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">google</a>
            </div>
            <p class="mt-4 text-center text-gray-600">Don't have account?
                <router-link :to="{ name: 'registration'}" class="text-primary">Register
                    now</router-link>
            </p>
        </div>
    </div>
</template>

<style scoped>
</style>

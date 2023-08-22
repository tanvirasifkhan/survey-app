<template> 
    <AppLayout>
        <div class="m-auto flex mt-16 items-center justify-center">
            <div class="rounded-2xl bg-white mt-10 px-6 py-6 w-96">
                <div class="flex-col items-center space-y-2 justify-center text-center">
                    <h2 class="text-gray-600 text-2xl">Sign In</h2>
                    <p class="text-gray-500 text-base">Welcome back! Please enter your details</p>
                </div>
                <form class="mt-6">
                    <div class="flex-col space-y-2 items-start justify-start">
                        <label for="email" class="cursor-pointer text-gray-600 font-normal text-base">Email Address</label>
                        <input type="text" id="email" v-model="user.email" class="hover:shadow transition-all border border-gray-200 outline-none rounded px-3 text-gray-500 py-2 w-full focus:border-gray-300" placeholder="Email address">
                        <span class="text-red-500 font-medium">{{ getEmailError }}</span>
                    </div>
                    <div class="flex-col mt-3 space-y-2 items-start justify-start">
                        <label for="password" class="cursor-pointer text-gray-600 font-normal text-base">Password</label>
                        <input type="password" id="password" v-model="user.password" class="hover:shadow transition-all border border-gray-200 outline-none rounded px-3 text-gray-500 py-2 w-full focus:border-gray-300" placeholder="Password">
                        <span class="text-red-500 font-medium">{{ getPasswordError }}</span>
                    </div>
                    <div class="mt-4">
                        <button @click.prevent="authenticate(user)" :disabled="isAuthenticating" :class="[isAuthenticating ? 'cursor-not-allowed': '']" class="flex items-center justify-center space-x-2 w-full py-2 rounded-lg text-center bg-emerald-400 transition-all hover:bg-emerald-500 text-white">
                            <svg v-if="isAuthenticating" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="[isAuthenticating ? 'animate-spin' : '']" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                            <span>{{ isAuthenticating ? 'Authenticating...': 'Let me in' }}</span>
                        </button>
                    </div>
                    <div class="mt-4 text-center">
                        <router-link :to="{ name: 'register' }" class="text-gray-500 hover:text-emerald-500 hover:underline">Don't have an account ? Register</router-link>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>

<script>
    import AppLayout from '../../layout/AppLayout.vue'
    import { mapActions, mapGetters } from 'vuex'
    
    export default {
        mounted() {
            document.title = "Login"
        },
        created(){
            if(localStorage.getItem('user') !== null){
                this.$router.push({ name: 'dashboard' })
            }
        },
        data(){
            return {
                user: {
                    email: '',
                    password: ''
                }
            }
        },
        components: {
            AppLayout
        },
        computed: {
            ...mapGetters({
                'getEmailError': 'auth/getEmailError',
                'getPasswordError': 'auth/getPasswordError',
                'isAuthenticating': 'auth/isAuthenticating'               
            })
        },
        methods: {
            ...mapActions({
                'signUp': 'auth/signUp',
                'authenticate': 'auth/authenticate'
            })
        }
    }
</script>
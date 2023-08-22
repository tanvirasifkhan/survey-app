<template> 
    <AppLayout>
        <div class="m-auto flex mt-16 items-center justify-center">
            <div class="m-auto items-center justify-center">
                <div class="rounded-2xl bg-white mt-10 px-6 py-6 w-96">
                    <div class="flex-col items-center space-y-2 justify-center text-center">
                        <h2 class="text-gray-600 text-2xl">Register</h2>
                        <p class="text-gray-500 text-base">Please enter your details to register</p>              
                    </div>
                    <form class="mt-6">
                        <div class="flex-col space-y-2 items-start justify-start">
                            <label for="name" class="cursor-pointer text-gray-600 font-normal text-base">Name</label>
                            <input type="text" id="name" v-model="user.name" class="hover:shadow transition-all border border-gray-200 outline-none rounded px-3 text-gray-500 py-2 w-full focus:border-gray-300" autocomplete="off" placeholder="Name">
                            <span class="text-red-500 font-medium">{{ getNameError }}</span>
                        </div>
                        <div class="flex-col mt-3 space-y-2 items-start justify-start">
                            <label for="email" class="cursor-pointer text-gray-600 font-normal text-base">Email Address</label>
                            <input type="text" id="email" v-model="user.email" class="hover:shadow transition-all border border-gray-200 outline-none rounded px-3 text-gray-500 py-2 w-full focus:border-gray-300" autocomplete="off" placeholder="Email address">
                            <span class="text-red-500 font-medium">{{ getEmailError }}</span>
                        </div>
                        <div class="flex-col mt-3 space-y-2 items-start justify-start">
                            <label for="password" class="cursor-pointer text-gray-600 font-normal text-base">Password</label>
                            <input type="password" id="password" v-model="user.password" class="hover:shadow transition-all border border-gray-200 outline-none rounded px-3 text-gray-500 py-2 w-full focus:border-gray-300" placeholder="Password">
                            <span class="text-red-500 font-medium">{{ getPasswordError }}</span>
                        </div>
                        <div class="mt-4">
                            <button @click.prevent="signUp(user)" :disabled="isRegistering" :class="[isRegistering ? 'cursor-not-allowed': '']" class="flex items-center justify-center space-x-2 w-full py-2 rounded-lg text-center bg-emerald-400 transition-all hover:bg-emerald-500 text-white">
                                <svg v-if="isRegistering" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="[isRegistering ? 'animate-spin' : '']" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                <span>{{ isRegistering ? 'Registering...': 'Create an Account' }}</span>
                            </button>
                        </div>
                        <div class="mt-4 text-center">
                            <router-link :to="{ name: 'login' }" class="text-gray-500 hover:text-emerald-500 hover:underline">Alreay have an account ? Sign in</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AppLayout>  
</template>

<script>
    import AppLayout from '../../layout/AppLayout.vue'
    import { mapActions, mapGetters } from 'vuex'
    
    export default {
        mounted() {
            document.title = "Register"
        },
        created(){
            if(localStorage.getItem('user') !== null){
                this.$router.push({ name: 'dashboard' })
            }
        },
        components: {
            AppLayout
        },
        data(){
            return {
                user: {
                    name: '',
                    email: '',
                    password: ''
                }
            }
        },
        computed: {
            ...mapGetters({
                'getNameError': 'auth/getNameError',
                'getEmailError': 'auth/getEmailError',
                'getPasswordError': 'auth/getPasswordError',
                'getSuccessMessage': 'auth/getSuccessMessage',
                'isRegistering': 'auth/isRegistering'
            })
        },
        methods: {
            ...mapActions({
                'signUp': 'auth/signUp'
            })
        }
    }
</script>
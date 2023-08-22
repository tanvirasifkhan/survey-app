<template>
    <div class="bg-white flex items-center justify-between p-3 w-full fixed">
        <router-link :to="{ name: 'home' }" class="text-2xl text-center font-bold">
            <span class="text-slate-500">Survey</span>
            <span class="text-emerald-400 italic">App</span>
        </router-link>
        <nav v-if="isAuthenticated">
            <ul class="flex items-center space-x-2">
                <li><router-link :to="{ name: 'dashboard' }" :class="[getCurrentRoute === 'dashboard' ? 'bg-emerald-500 text-white':'text-gray-700']" class="font-semibold px-3 py-2 hover:text-white hover:bg-emerald-500 rounded-lg">Dashboard</router-link></li>
                <li><router-link :to="{ name: 'survey_list' }" :class="[getCurrentRoute === 'survey_list' ? 'bg-emerald-500 text-white':'text-gray-700']" class="font-semibold px-3 py-2 hover:text-white hover:bg-emerald-500 rounded-lg">Surveys</router-link></li>
                <li><router-link :to="{ name: 'create_survey' }" :class="[getCurrentRoute === 'create_survey' ? 'bg-emerald-500 text-white':'text-gray-700']" class="font-semibold px-3 py-2 hover:text-white hover:bg-emerald-500 rounded-lg">Create new Survey</router-link></li>
                <li><router-link :to="{ name: 'response_list' }" :class="[getCurrentRoute === 'response_list' ? 'bg-emerald-500 text-white':'text-gray-700']" class="font-semibold px-3 py-2 hover:text-white hover:bg-emerald-500 rounded-lg">Responses</router-link></li>                
            </ul>
        </nav>
        <nav>
            <ul v-if="isAuthenticated" class="flex items-center"> 
                <li><p class="text-gray-700 font-semibold p-3">Welcome! <strong>{{ getAuthenticatedUser !== null ? getAuthenticatedUser.name : null }}</strong></p></li>
                <li><a href="#" @click.prevent="logout" class="text-white font-semibold px-3 py-2 rounded-lg bg-rose-500 hover:bg-rose-600">Logout</a></li>
            </ul>
            <ul v-else class="flex items-center">                
                <li><router-link :to="{ name: 'login' }" class="text-gray-700 font-semibold p-3">Login</router-link></li>
                <li><router-link :to="{ name: 'register' }" class="font-semibold px-3 py-2 rounded-lg text-white bg-emerald-500 hover:bg-emerald-600">Register</router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        data(){
            return {
                isAuthenticated: false
            }
        },
        created(){
            if(localStorage.getItem('user') !== null){
                this.isAuthenticated = true
            }else{
                this.isAuthenticated = false
            }
        },
        computed: {
            ...mapGetters({
                'getAuthenticatedUser': 'auth/getAuthenticatedUser'
            }),
            getCurrentRoute(){
                return this.$route.name
            }
        },
        methods: {
            ...mapActions({
                'logout': 'auth/logout'
            })
        }
    }
</script>
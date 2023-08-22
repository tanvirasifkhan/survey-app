<template>
    <AppLayout>
        <div class="m-auto mt-5 flex items-center justify-center overscroll-y-scroll">
            <div class="mt-16 px-6 py-6 w-2/5">
                <h3 class="text-xl text-gray-500 font-bold uppercase">Survey Response Information</h3>
                <div class="mt-5" v-if="isSingleSurveyResponseLoading">
                    <LoadingData />
                </div>
                <div class="mt-5" v-else-if="hasSurveyResponseError">
                    <Error message="Error Fetching Data" />
                </div>
                <div v-else>
                    <div class="mt-5">
                        <div class="flex items-start bg-white p-7 space-x-5 mt-3">
                            <div class="rounded-full bg-gray-100 p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                            </div>
                            <div class="rounded-md space-y-2">
                                <h2 class="text-xl font-semibold text-gray-600 hover:underline hover:text-emerald-500">{{ getSingleSurveyResponse.survey }}</h2>
                                <h3 class="text-sm text-gray-500">{{ getSingleSurveyResponse.description }}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5">
                        <h3 class="text-lg text-gray-500 font-bold">Questions & Answers</h3>
                        <div class="flex items-start bg-white p-7 space-x-5 mt-3">                            
                            <div class="rounded-md space-y-2 w-full">
                                <div v-for="(response, index) in JSON.parse(getSingleSurveyResponse.responses)" :key="index" class="space-y-2 items-start justify-start">
                                    <label :for="response.question" class="text-gray-600 font-semibold text-lg">{{ response.question }}</label>
                                    <p class="border border-gray-50 bg-gray-100 outline-none rounded p-3 text-gray-700 w-full text-lg">{{ response.answer }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 flex items-center justify-center space-x-2">
                        <router-link :to="{ name: 'response_list' }" class="rounded-lg text-white px-3 py-2 bg-emerald-500">Back</router-link>
                    </div> 
                </div>            
            </div>
        </div>
    </AppLayout>
</template>

<script>
    import LoadingData from '../../components/LoadingData.vue'
    import Error from '../../components/Error.vue'
    import AppLayout from '../../layout/AppLayout.vue'
    import { mapActions, mapGetters } from 'vuex'
    
    export default {
        components: {
            AppLayout,
            LoadingData,
            Error
        },
        mounted(){
            document.title = "Survey Response Information"
        },
        created(){
            this.fetchSurveyResponseData(this.$route.params.id)

            if(localStorage.getItem('user') === null){
                this.$router.push({ name: 'login' })
            }
        },
        computed: {
            ...mapGetters({
                'isSingleSurveyResponseLoading': 'response/isSingleSurveyResponseLoading',
                'hasSurveyResponseError': 'response/hasSurveyResponseError',
                'getSingleSurveyResponse': 'response/getSingleSurveyResponse'
            })
        },
        methods: {
            ...mapActions({
                'fetchSurveyResponseData': 'response/fetchSurveyResponseData'
            })
        }
    }
</script>
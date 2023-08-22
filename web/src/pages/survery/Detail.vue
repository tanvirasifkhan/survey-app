<template>
  <AppLayout>
    <div class="m-auto mt-16 flex items-center justify-center overscroll-y-scroll">
        <div class="mt-10 px-6 py-6 w-2/5">
            <h3 class="text-xl text-gray-500 font-bold uppercase">Survgey Detail Information</h3>
            <div class="mt-5">
                <LoadingData v-if="isSingleSurveyDataLoading"/>
                <Error v-else-if="hasError" message="Error Fetching Data" />
                <SurveyDetail v-else :title="getSingleSurvey.title"
                    :description="getSingleSurvey.description" :questions="JSON.parse(getSingleSurvey.questions)" />
            </div>
            <div class="mt-4 flex items-center justify-center space-x-2">
                <router-link :to="{ name: 'survey_list' }" class="rounded-lg text-white px-3 py-2 bg-emerald-500">Back</router-link>
            </div>
        </div>
    </div>
  </AppLayout>
</template>

<script>
    import AppLayout from '../../layout/AppLayout.vue'
    import { mapActions, mapGetters } from 'vuex'
    import Pagination from '../../components/Pagination.vue'
    import LoadingData from '../../components/LoadingData.vue'
    import Error from '../../components/Error.vue'
    import NoData from '../../components/NoData.vue'
    import SurveyDetail from '../../components/SurveyDetail.vue'
    
    export default {
        components: {
            AppLayout,
            Pagination,
            LoadingData,
            Error,
            NoData,
            SurveyDetail
        },
        mounted() {
            document.title = "Survey Detail"
        },
        created(){
            this.fetchSurveyData(this.$route.params.id)

            if(localStorage.getItem('user') === null){
                this.$router.push({ name: 'login' })
            }
        },
        computed: {
            ...mapGetters({
                'isSingleSurveyDataLoading': 'survey/isSingleSurveyDataLoading',
                'hasError': 'survey/hasError',
                'getSingleSurvey': 'survey/getSingleSurvey'
            })
        },
        methods: {
            ...mapActions({
                'fetchSurveyData': 'survey/fetchSurveyData'
            })
        }
    }
</script>
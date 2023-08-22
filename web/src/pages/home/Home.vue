<template>
  <AppLayout>
    <div class="m-auto mt-5 flex items-center justify-center overscroll-y-scroll">
        <div class="mt-16 px-6 py-6 w-2/5">
            <h3 class="text-xl text-gray-500 font-bold uppercase">Select any survey to give your feedback</h3>
            <div class="mt-8">
                <LoadingData v-if="isDataLoading" />
                <NoData v-else-if="homeSurveys.length === 0" message="No Survey Available" />
                <Error v-else-if="hasError" message="Error Fetching Data" />
                <div v-else>
                    <Survey v-for="survey in homeSurveys" 
                        :link="{ name: 'create_response', params: { id: survey.id } }"
                        :key="survey.id" :title="survey.title"
                        :description="survey.description" />
                </div>               
            </div>
            <div class="flex items-center justify-end mt-4">
                <Pagination :pagination="getPagination" :offset="3" @paginate="paginatedHomeSurveyList(getPagination.current_page)"/>
            </div>            
        </div>
    </div>
  </AppLayout>
</template>

<script>
    import Survey from '../../components/Survey.vue'
    import AppLayout from '../../layout/AppLayout.vue'
    import { mapActions, mapGetters } from 'vuex'
    import LoadingData from '../../components/LoadingData.vue'
    import NoData from '../../components/NoData.vue'
    import Error from '../../components/Error.vue'
    import Pagination from '../../components/Pagination.vue'
    
    export default {
        components: {
            AppLayout,
            Survey,
            LoadingData,
            Error,
            NoData,
            Pagination
        },
        mounted() {
            document.title = "Home"            
        },
        created(){
            this.paginatedHomeSurveyList(1)
        },
        computed: {
            ...mapGetters({
                'isDataLoading': 'survey/isDataLoading',
                'hasError': 'survey/hasError',
                'homeSurveys': 'survey/homeSurveys',
                'getPagination':'survey/getPagination'
            })
        },
        methods: {
            ...mapActions({
                'paginatedHomeSurveyList': 'survey/paginatedHomeSurveyList'
            })
        }
    }
</script>
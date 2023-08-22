<template>
  <AppLayout>
    <div class="m-auto mt-5 flex items-center justify-center overscroll-y-scroll">
        <div class="mt-10 px-6 py-6 w-full">
          <div class="grid grid-cols-3 gap-3">
            <div class="col-span-2">
                <div class="mt-5 bg-white rounded-lg border border-gray-200">
                    <div class="flex items-center justify-between border-b border-gray-200">
                        <h2 class="text-gray-500 px-5 py-3 text-base font-medium uppercase border-b border-gray-100">Recent Survey List</h2>
                    </div>
                    <div class="xs:overflow-x-auto">
                        <LoadingData v-if="isLatestSurveyLoading" />
                        <NoData v-else-if="getLatestSurveys.length === 0" message="No Survey Available" />
                        <Error v-else-if="hasLatestSurveyError" message="Error Fetching Data" />
                        <table v-else class="w-full">
                            <thead class="bg-gray-100 text-left border border-gray-100">
                                <tr>
                                    <th class="text-base text-gray-500 font-medium p-3 uppercase">Title</th>
                                    <th class="text-base text-gray-500 font-medium p-3 uppercase">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(survey, index) in getLatestSurveys" :key="survey.id" :class="[index %2 !==0 ?'bg-gray-50':'']" class="border-b border-gray-50">
                                    <td class="text-gray-700 text-base p-3">{{ survey.title }}</td>
                                    <td class="text-gray-700 text-base p-3">{{ survey.description }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex items-center justify-between border-t border-gray-200">
                        <router-link :to="{ name: 'survey_list' }" class="text-sky-500 px-5 py-3 text-base font-medium hover:underline uppercase border-b border-gray-100">View List</router-link>
                    </div>
                </div>
            </div>
            <div class="col-span-1">
                <div class="mt-5 bg-white rounded-lg border border-gray-200">
                    <div class="flex items-center justify-between border-b border-gray-200">
                        <h2 class="text-gray-500 px-5 py-3 text-base font-medium uppercase border-b border-gray-100">Recent  Response List</h2>
                    </div>
                    <div class="xs:overflow-x-auto">
                        <LoadingData v-if="isLatestSurveyResponseLoading" />
                        <NoData v-else-if="getLatestSurveyResponses.length === 0" message="No Response Available" />
                        <Error v-else-if="hasLatestSurveyResponseError" message="Error Fetching Data" />
                        <table v-else class="w-full">
                            <thead class="bg-gray-100 text-left border border-gray-100">
                                <tr>
                                    <th class="text-base text-gray-500 font-medium p-3 uppercase">Date</th>
                                    <th class="text-base text-gray-500 font-medium p-3 uppercase">Survey Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(response, index) in getLatestSurveyResponses" :key="response.id" :class="[index % 2 !== 0 ?'bg-gray-50':'']" class="border-b border-gray-50">
                                    <td class="text-gray-700 text-base p-3">{{ response.date }}</td>
                                    <td class="text-gray-700 text-base p-3">{{ response.survey }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex items-center justify-between border-t border-gray-200">
                        <router-link :to="{ name: 'response_list' }" class="text-sky-500 px-5 py-3 text-base font-medium hover:underline uppercase border-b border-gray-100">View List</router-link>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  </AppLayout>
</template>

<script>
    import AppLayout from '../../layout/AppLayout.vue'
    import { mapActions, mapGetters } from 'vuex'
    import LoadingData from '../../components/LoadingData.vue'
    import Error from '../../components/Error.vue'
    import NoData from '../../components/NoData.vue'
    
    export default {
        components: {
            AppLayout,
            LoadingData,
            Error,
            NoData
        },
        mounted() {
            document.title = "Dashboard"
        },
        created(){ 
            this.latestSurveys()
            this.latestSurveyResponses()

            if(localStorage.getItem('user') === null){
                this.$router.push({ name: 'home' })
            }
        },
        computed: {
            ...mapGetters({
                'isLatestSurveyLoading': 'survey/isLatestSurveyLoading',
                'hasLatestSurveyError': 'survey/hasLatestSurveyError',
                'getLatestSurveys': 'survey/getLatestSurveys',
                'isLatestSurveyResponseLoading': 'response/isLatestSurveyResponseLoading',
                'hasLatestSurveyResponseError': 'response/hasLatestSurveyResponseError',
                'getLatestSurveyResponses': 'response/getLatestSurveyResponses'
            })
        },
        methods: {
            ...mapActions({
                'latestSurveys': 'survey/latestSurveys',
                'latestSurveyResponses': 'response/latestSurveyResponses'
            })
        }
    }
</script>
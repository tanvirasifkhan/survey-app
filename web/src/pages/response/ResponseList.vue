<template>
  <AppLayout>
    <div class="m-auto mt-5 flex items-center justify-center overscroll-y-scroll">
        <div class="mt-10 px-6 py-6 w-3/5">
          <div class="mt-5 bg-white rounded-lg border border-gray-200">
            <div class="flex items-center justify-between border-b border-gray-200">
                <h2 class="text-gray-500 px-5 py-3 text-base font-medium uppercase border-b border-gray-100">Survey Response List</h2>
            </div>
            <div class="xs:overflow-x-auto">
                <LoadingData v-if="isDataLoading" />
                <NoData v-else-if="countSurveyResponses === 0" message="No Response Available" />
                <Error v-else-if="hasError" message="Error Fetching Data" />
                <table v-else class="w-full">              
                  <thead class="bg-gray-100 text-left border border-gray-100">
                      <tr>
                          <th class="text-base text-gray-500 font-medium p-3 uppercase">Date</th>
                          <th class="text-base text-gray-500 font-medium p-3 uppercase">Survey</th>
                          <th class="text-base text-gray-500 font-medium p-3 uppercase">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(response, index) in getSurveyResponses" :key="response.id" :class="[index % 2 !== 0 ? 'bg-gray-50': '']" class="border-b border-gray-50">
                          <td class="text-gray-700 text-base p-3">{{ response.date }}</td>
                          <td class="text-gray-700 text-base p-3">{{ response.survey }}</td>
                          <td class="text-gray-700 flex items-center text-sm space-x-3 px-3 py-5">
                            <router-link :to="{ name: 'response_info', params: { id: response.id } }">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer hover:text-sky-600">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </router-link>
                            <svg @click.prevent="removeSurveyResponse(response.id)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer hover:text-red-600">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </td>
                      </tr>
                  </tbody>
                </table>
            </div>
            <div class="flex items-center justify-between border-t border-gray-200">
                <h2 class="text-gray-700 p-3 border-b border-gray-100">Showing <span class="text-gray-800 font-medium">{{ getSurveyResponses.length }}</span> of <span class="font-medium">{{ countSurveyResponses }}</span></h2>
                <Pagination :pagination="getPagination" :offset="3" @paginate="paginatedSurveyResponseList(getPagination.current_page)"/>
            </div>
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
    import { deleteSurveyResponse } from '../../library/response'
    import { getToken } from '../../library/auth'
    import { createToast } from 'mosha-vue-toastify'
    
    export default {
        components: {
            AppLayout,
            Pagination,
            LoadingData,
            Error,
            NoData
        },
        mounted() {
            document.title = "Survey Response List"
        },
        created(){
            this.paginatedSurveyResponseList(1)

            if(localStorage.getItem('user') === null){
                this.$router.push({ name: 'login' })
            }
        },
        computed: {
            ...mapGetters({
                'isDataLoading': 'response/isDataLoading',
                'hasError': 'response/hasError',
                'getSurveyResponses': 'response/getSurveyResponses',
                'countSurveyResponses': 'response/countSurveyResponses',
                'getPagination':'response/getPagination'
            })
        },
        methods: {
            ...mapActions({
                'paginatedSurveyResponseList': 'response/paginatedSurveyResponseList'
            }),
            removeSurveyResponse(id){
                deleteSurveyResponse(getToken(), {id: id}).then(() => {
                    this.paginatedSurveyResponseList(1)
                    createToast('Survey response deleted successfully', {
                        type: 'success',
                        position: 'top-center',
                        showIcon: true,
                        timeout: 1500
                    })
                })
            }
        }
    }
</script>
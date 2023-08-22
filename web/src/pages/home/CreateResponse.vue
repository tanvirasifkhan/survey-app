<template>
    <AppLayout>
        <div class="m-auto mt-5 flex items-center justify-center overscroll-y-scroll">
            <div class="mt-16 px-6 py-6 w-2/5">
                <h3 class="text-xl text-gray-500 font-bold uppercase">Create new Response</h3>
                <div class="mt-5" v-if="isDataFetching">
                    <LoadingData />
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
                                <h2 class="text-xl font-semibold text-gray-600 hover:underline hover:text-emerald-500">{{ survey.title }}</h2>
                                <h3 class="text-sm text-gray-500">{{ survey.description }}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5">
                        <h3 class="text-lg text-gray-500 font-bold">Questions & Answers</h3>
                        <div class="flex items-start bg-white p-7 space-x-5 mt-3">                            
                            <div class="rounded-md space-y-2 w-full">
                                <div v-for="(question, index) in JSON.parse(survey.questions)" :key="index" class="space-y-2 items-start justify-start">
                                    <label :for="question.value" class="cursor-pointer text-gray-600 font-semibold text-lg">{{ question.value }}</label>
                                    <textarea :id="question.value" v-model="answers[index]" rows="8" class="hover:shadow transition-all border border-gray-200 outline-none rounded px-3 text-gray-500 py-2 w-full focus:border-gray-300" autocomplete="off" :placeholder="question.value"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 flex items-center justify-end space-x-2">
                        <router-link :to="{ name: 'home' }" class="rounded-lg text-white px-3 py-2 bg-red-500">Cancel</router-link>
                        <button @click.prevent="createResponse" 
                            :disabled="isSubmittingResponse" 
                            :class="[isSubmittingResponse ? 'cursor-not-allowed': '']"
                            class="rounded-lg text-white px-3 
                            py-2 bg-emerald-500">{{ isSubmittingResponse ? 'Sending Feedback...' : 'Send Feedback' }}</button>
                    </div> 
                </div>            
            </div>
        </div>
    </AppLayout>
</template>

<script>
    import LoadingData from '../../components/LoadingData.vue'
    import AppLayout from '../../layout/AppLayout.vue'
    import { fetchSurveyForHome } from '../../library/survey'
    import { createSurveyResponse } from '../../library/response'
    import { createToast } from 'mosha-vue-toastify'
    
    export default {
        components: {
            AppLayout,
            LoadingData
        },
        data(){
            return {
                survey: {
                    id: '',
                    title: '',
                    description: '',
                    questions: ''
                },
                isDataFetching: false,
                answers: [],
                questions: [],
                questionAndAnswer: [],
                isSubmittingResponse: false
            }
        },
        mounted(){
            document.title = "Create Response"
        },
        created(){
            this.isDataFetching = true
            fetchSurveyForHome(this.$route.params.id).then(response => {
                this.isDataFetching = false
                this.survey = response.data.data
                let questionList = JSON.parse(response.data.data.questions)
                for(let count = 0; count < questionList.length; count++){
                    this.questions.push(questionList[count]?.value)
                }
            })
        },
        methods: {
            createResponse(){
                this.isSubmittingResponse = true
                let answerList = this.answers
                let questionList = this.questions
                for(let countQuestion = 0; countQuestion < questionList.length; countQuestion++){
                    this.questionAndAnswer.push({'question': questionList[countQuestion], 'answer': answerList[countQuestion]})             
                }

                createSurveyResponse({
                    survey_id: this.$route.params.id,
                    responses: JSON.stringify(this.questionAndAnswer)
                }).then(() => {
                    this.isSubmittingResponse = false
                    this.$router.push({ name: 'home' })
                    createToast('Survey response has sent', {
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
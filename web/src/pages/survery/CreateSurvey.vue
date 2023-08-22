<template>
  <AppLayout>
    <div class="m-auto mt-5 flex items-center justify-center overscroll-y-scroll">
        <div class="mt-10 px-6 py-6 w-4/5">
          <div class="mt-5 bg-white rounded-lg border border-gray-200">
            <div class="flex items-center justify-between border-b border-gray-200">
                <h2 class="text-gray-500 px-5 py-3 text-base font-medium uppercase border-b border-gray-100">Create new Survey</h2>
            </div>
            <div class="xs:overflow-x-auto">
              <form action="">
                <div class="p-3 space-y-2">
                    <div class="space-y-2 items-start justify-start">
                        <label for="title" class="cursor-pointer text-gray-600 font-normal text-base">Title <span title="Required" class="text-red-500">*</span></label>
                        <input type="text" id="title" v-model="survey.title" class="hover:shadow transition-all border border-gray-200 outline-none rounded px-3 text-gray-500 py-2 w-full focus:border-gray-300" autocomplete="off" placeholder="Title">
                        <span class="text-red-500 font-medium">{{ errors.title }}</span>
                    </div>
                    <div class="space-y-2 items-start justify-start">
                        <label for="description" class="cursor-pointer text-gray-600 font-normal text-base">Description <span title="Required" class="text-red-500">*</span></label>
                        <textarea id="description" v-model="survey.description" rows="8" class="hover:shadow transition-all border border-gray-200 outline-none rounded px-3 text-gray-500 py-2 w-full focus:border-gray-300" autocomplete="off" placeholder="Description"></textarea>
                        <span class="text-red-500 font-medium">{{ errors.description }}</span>
                    </div>
                    <div class="space-y-2 items-start justify-start">
                        <label for="questions" class="cursor-pointer text-gray-600 font-normal text-base">Questions <span title="Required" class="text-red-500">*</span></label>
                        <h2 class="text-red-500 text-lg" v-if="questions.length === 0">No Questions Added</h2>
                        <div v-else class="space-y-2">
                            <SurveyQuestion v-for="(question, index) in questions" 
                                :key="index" :indexOfQuestion="index" 
                                v-model="question.value" @onRemove="questions.splice(index, 1)" />
                        </div>                                               
                    </div>
                </div>
              </form>     
              <button @click.prevent="addMoreQuestions" class="m-5 bg-emerald-500 rounded-lg text-white px-3 py-2">{{ questions.length === 0 ? 'Add Question' : 'Add More Questions' }}</button>
            </div>            
            <div class="flex border-t border-gray-100 justify-end space-x-3 p-3 bg-gray-50">
                <button @click.prevent="createNewSurvey" :disabled="hasSurveyCreated" :class="[hasSurveyCreated ? 'cursor-not-allowed': '']" class="text-white rounded-lg px-10 py-2 
                    transition-all bg-emerald-500 hover:bg-emerald-500 font-medium">
                    {{ hasSurveyCreated ? 'Saving...': 'Save Survey' }}    
                </button>
            </div>
          </div>
        </div>
    </div>
  </AppLayout>
</template>

<script>
    import SurveyQuestion from '../../components/SurveyQuestion.vue'
    import AppLayout from '../../layout/AppLayout.vue'
    import { createSurvey } from '../../library/survey'
    import { getToken } from '../../library/auth'
    import { createToast } from 'mosha-vue-toastify'
    
    export default {
        components: {
            AppLayout,
            SurveyQuestion
        },
        mounted() {
            document.title = "Create new Survey"
        },
        data(){
            return {
                questions: [],
                hasSurveyCreated: false,
                survey: {
                    title: '',
                    description: '',
                    questions: ''
                },
                errors: {
                    title: '',
                    description: '',
                    questions: ''
                }
            }
        },
        created(){
            if(localStorage.getItem('user') === null){
                this.$router.push({ name: 'login' })
            }
        },
        methods: {
            addMoreQuestions(){
                this.questions.push({ value: '' })
            },
            createNewSurvey(){
                this.hasSurveyCreated = true
                createSurvey(getToken(), {
                    title: this.survey.title,
                    description: this.survey.description,
                    questions: JSON.stringify(this.questions)
                }).then(response => {
                    if(response.data.errors){
                        this.hasSurveyCreated = false

                        if(response.data.errors.title){
                            this.errors.title = response.data.errors.title[0]
                        }else{
                            this.errors.title = ''
                        }
            
                        if(response.data.errors.description){
                            this.errors.description = response.data.errors.description[0]
                        }else{
                            this.errors.description = ''
                        }

                        if(response.data.errors.questions){
                            this.errors.questions = response.data.errors.questions[0]
                        }else{
                            this.errors.questions = ''
                        }
                    }else{
                        this.hasSurveyCreated = false
                        this.$router.push({ name: 'survey_list' })
                        createToast('Survey created successfully', {
                            type: 'success',
                            position: 'top-center',
                            showIcon: true,
                            timeout: 1500
                        })
                    }            
                })
            }
        }
    }
</script>
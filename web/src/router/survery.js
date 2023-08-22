import SurveyList from '../pages/survery/SurveyList.vue'
import CreateSurvey from '../pages/survery/CreateSurvey.vue'
import Detail from '../pages/survery/Detail.vue'

export const survey = [
    {
        path: '/survey/list',
        name: 'survey_list',
        component: SurveyList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/survey/create',
        name: 'create_survey',
        component: CreateSurvey,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/survey/:id/detail',
        name: 'detail',
        component: Detail,
        meta: {
            requiresAuth: true
        }
    }
]
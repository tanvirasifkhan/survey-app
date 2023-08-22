import ResponseList from '../pages/response/ResponseList.vue'
import ResponseInfo from '../pages/response/ResponseInfo.vue'

export const response = [
    {
        path: '/response/list',
        name: 'response_list',
        component: ResponseList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/response/:id/info',
        name: 'response_info',
        component: ResponseInfo,
        meta: {
            requiresAuth: true
        }
    }
]
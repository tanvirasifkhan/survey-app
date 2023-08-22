import Home from '../pages/home/Home.vue'
import CreateResponse from '../pages/home/CreateResponse.vue'

export const home = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/survey/:id/response/create',
        name: 'create_response',
        component: CreateResponse
    }
]
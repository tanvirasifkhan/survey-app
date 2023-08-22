import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue'

export const auth = [
    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    {
        path: '/register',
        component: Register,
        name: 'register'
    }
]
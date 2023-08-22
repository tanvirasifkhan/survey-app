import Dashboard from '../pages/dashboard/Dashboard.vue'

export const dashboard = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    }
]
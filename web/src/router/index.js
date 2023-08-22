import { createRouter, createWebHistory } from "vue-router"
import { auth } from "./auth"
import { home } from './home'
import { survey } from "./survery"
import { dashboard } from "./dashboard"
import { response } from "./response"

export const routes = [
    ...auth,
    ...home,
    ...survey,
    ...dashboard,
    ...response
]

export const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    const isLoggedin = localStorage.getItem('user') !== null
    
    if (to.meta.requiresAuth && !isLoggedin) {
      next('/')
    }else{
        next()
    }
})  

export default router
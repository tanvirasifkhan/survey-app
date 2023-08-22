import { registerUser, authenticate, logout } from "../library/auth"
import { router } from '../router/index'
import { getToken } from "../library/auth"

const state = {
    isRegistering: false,
    successMessage: '',
    errors: {
        name: '',
        email: '',
        password: ''
    },
    user: localStorage.getItem('user') || null,
    isAuthenticating: false
}

const getters = {
    isRegistering(state) {
        return state.isRegistering
    },

    getSuccessMessage(state){
        return state.successMessage
    },

    getNameError(state){
        return state.errors.name
    },

    getEmailError(state){
        return state.errors.email
    },

    getPasswordError(state){
        return state.errors.password
    },

    getAuthenticatedUser(state){
        return JSON.parse(state.user)
    },

    isAuthenticating(state){
        return state.isAuthenticating
    }
}


const mutations = {
    SET_IS_REGISTERING(state, isRegistering) {
        state.isRegistering = isRegistering
    },

    SET_SUCCESS_MESSAGE(state, successMessage) {
        state.successMessage = successMessage
    },

    SET_NAME_ERROR(state, nameError){
        state.errors.name = nameError
    },

    SET_EMAIL_ERROR(state, emailError){
        state.errors.email = emailError
    },

    SET_PASSWORD_ERROR(state, passwordError){
        state.errors.password = passwordError
    },

    SET_AUTHENTICATED_USER(state, user){
        state.user = JSON.stringify(user)
        localStorage.setItem('user', JSON.stringify(user))
    },

    SET_IS_AUTHENTICATING(state, isAuthenticating) {
        state.isAuthenticating = isAuthenticating
    }
}


const actions = {
    signUp({ commit }, user){
        commit('SET_IS_REGISTERING', true)
        console.log(user)
        registerUser(user).then(response => {
            if(response.data.errors){
                commit('SET_IS_REGISTERING', false)
                if(response.data.errors.name){
                    commit('SET_NAME_ERROR', response.data.errors.name[0])
                }else{
                    commit('SET_NAME_ERROR', '')
                }

                if(response.data.errors.email){
                    commit('SET_EMAIL_ERROR', response.data.errors.email[0])
                }else{
                    commit('SET_EMAIL_ERROR', '')
                }

                if(response.data.errors.password){
                    commit('SET_PASSWORD_ERROR', response.data.errors.password[0])
                }else{
                    commit('SET_PASSWORD_ERROR', '')
                }
            }else{
                commit('SET_IS_REGISTERING', false)
                commit('SET_NAME_ERROR', '')
                commit('SET_EMAIL_ERROR', '')
                commit('SET_PASSWORD_ERROR', '')
                commit('SET_AUTHENTICATED_USER', response.data.user)
                router.push({ name: 'dashboard' })
            }
        })
    },

    authenticate({ commit }, { email, password }) {
        commit('SET_IS_AUTHENTICATING', true)
        authenticate({ email: email, password: password }).then(response => { 
            if(response.data.errors){
                commit('SET_IS_AUTHENTICATING', false)
                if(response.data.errors.email){
                    commit('SET_EMAIL_ERROR', response.data.errors.email[0])
                }else{
                    commit('SET_EMAIL_ERROR', '')
                }
    
                if(response.data.errors.password){
                    commit('SET_PASSWORD_ERROR', response.data.errors.password[0])
                }else{
                    commit('SET_PASSWORD_ERROR', '')
                }
            }else{
                commit('SET_IS_AUTHENTICATING', false)
                commit('SET_NAME_ERROR', '')
                commit('SET_EMAIL_ERROR', '')
                commit('SET_PASSWORD_ERROR', '')
                commit('SET_AUTHENTICATED_USER', response.data.user)
                router.push({ name: 'dashboard' })
            }          
        })
    },

    logout({ commit }){
        logout(getToken()).then(() => {
            commit('SET_AUTHENTICATED_USER', null)
            commit('SET_NAME_ERROR', '')
            commit('SET_EMAIL_ERROR', '')
            commit('SET_PASSWORD_ERROR', '')
            commit('SET_SUCCESS_MESSAGE', '')
            localStorage.removeItem('user')
            router.push({ name: 'login' })
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
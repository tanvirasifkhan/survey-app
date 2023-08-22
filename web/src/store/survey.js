import { getToken } from "../library/auth"
import { surveyList, fetchSurvey, latestSurveyList, homeSurveyList } from "../library/survey"

const state = {
    isLoading: false,
    hasError: false,
    surveys: [],
    homeSurveys: [],
    countSurveys: 0,
    pagination: {},
    survey: {},
    isSingleSurveyLoading: false,
    hasSurveyError: false,
    isLatestSurveyLoading: false,
    lastetSurveys: [],
    hasLatestSurveyError: false
}

const getters = {
    isDataLoading(state){
        return state.isLoading
    },

    isLatestSurveyLoading(state){
        return state.isLatestSurveyLoading
    },

    hasError(state){
        return state.hasError
    },

    surveys(state){
        return state.surveys
    },

    homeSurveys(state){
        return state.homeSurveys
    },

    countSurveys(state){
        return state.countSurveys
    },

    getPagination(state){
        return state.pagination
    },

    getSingleSurvey(state){
        return state.survey
    },

    getLatestSurveys(state){
        return state.lastetSurveys
    },

    isSingleSurveyDataLoading(state){
        return state.isSingleSurveyLoading
    },

    hasSurveyError(state){
        return state.hasSurveyError
    },

    hasLatestSurveyError(state){
        return state.hasLatestSurveyError
    }
}

const mutations = {
    SET_DATA_LOADING(state, isLoading){
        state.isLoading = isLoading
    },

    SET_LASTET_SURVEY_LOADING(state, isLatestSurveyLoading){
        state.isLatestSurveyLoading = isLatestSurveyLoading
    },

    SET_HAS_ERROR(state, hasError){
        state.hasError = hasError
    },

    SET_SURVEYS(state, surveys){
        state.surveys = surveys
    },

    SET_HOME_SURVEYS(state, homeSurveys){
        state.homeSurveys = homeSurveys
    },

    SET_COUNT_SURVEYS(state, countSurveys){
        state.countSurveys = countSurveys
    },

    SET_PAGINATION(state, pagination){
        state.pagination = pagination
    },

    SET_SINGLE_SURVEY(state, survey){
        state.survey = survey
    },

    SET_LATEST_SURVEYS(state, lastetSurveys){
        state.lastetSurveys = lastetSurveys
    },

    SET_SINGLE_SURVEY_LOADING(state, isSingleSurveyLoading){
        state.isSingleSurveyLoading = isSingleSurveyLoading
    },

    SET_SURVEY_ERROR(state, hasSurveyError){
        state.hasSurveyError = hasSurveyError
    },

    SET_LATEST_SURVEY_ERROR(state, hasLatestSurveyError){
        state.hasLatestSurveyError = hasLatestSurveyError
    }
}

const actions = {
    paginatedSurveyList({ commit }, page){
        commit('SET_DATA_LOADING', true)
        surveyList(getToken(), page).then((response) => {
            commit('SET_DATA_LOADING', false)
            commit('SET_SURVEYS', response.data.data)
            commit('SET_COUNT_SURVEYS', response.data.meta.total)
            commit('SET_PAGINATION', response.data.meta)
        }).catch(error => {
            commit('SET_HAS_ERROR', true)
        })
    },

    paginatedHomeSurveyList({ commit }, page){
        commit('SET_DATA_LOADING', true)
        homeSurveyList(getToken(), page).then((response) => {
            commit('SET_DATA_LOADING', false)
            commit('SET_HOME_SURVEYS', response.data.data)
            commit('SET_PAGINATION', response.data.meta)
        }).catch(error => {
            commit('SET_HAS_ERROR', true)
        })
    },

    fetchSurveyData({ commit }, id){
        commit('SET_SINGLE_SURVEY_LOADING', true)
        fetchSurvey(getToken(), id).then(response => {
            commit('SET_SINGLE_SURVEY_LOADING', false)
            commit('SET_SINGLE_SURVEY', response.data.data)
        }).catch(error => {
            commit('SET_SURVEY_ERROR', true)
        })
    },

    latestSurveys({ commit }){
        commit('SET_LASTET_SURVEY_LOADING', true)
        latestSurveyList(getToken()).then(response => {
            commit('SET_LASTET_SURVEY_LOADING', false)
            commit('SET_LATEST_SURVEYS', response.data.data)
        }).catch(error => {
            commit('SET_LATEST_SURVEY_ERROR', true)
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
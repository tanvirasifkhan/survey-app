import { getToken } from '../library/auth'
import { latestSurveyResponseList, surveyResponseList, fetchSurveyResponse } from '../library/response'

const state = {
    isLatestResponseLoading: false,
    lastetSurveyResponses: [],
    hasLatestSurveyResponseError: false,
    isLoading: false,
    hasError: false,
    surveyResponses: [],
    countSurveyResponses: 0,
    pagination: {},
    response: {},
    isSingleSurveyResponseLoading: false,
    hasSurveyResponseError: false,
}

const getters = {
    isDataLoading(state){
        return state.isLoading
    },

    hasError(state){
        return state.hasError
    },

    getSurveyResponses(state){
        return state.surveyResponses
    },

    countSurveyResponses(state){
        return state.countSurveyResponses
    },

    getPagination(state){
        return state.pagination
    },

    getSingleSurveyResponse(state){
        return state.response
    },

    isSingleSurveyResponseLoading(state){
        return state.isSingleSurveyResponseLoading
    },

    hasSurveyResponseError(state){
        return state.hasSurveyResponseError
    },

    isLatestSurveyResponseLoading(state){
        return state.isLatestResponseLoading
    },

    getLatestSurveyResponses(state){
        return state.lastetSurveyResponses
    },

    hasLatestSurveyResponseError(state){
        return state.hasLatestSurveyResponseError
    }
}

const mutations = {
    SET_DATA_LOADING(state, isLoading){
        state.isLoading = isLoading
    },

    SET_HAS_ERROR(state, hasError){
        state.hasError = hasError
    },

    SET_SURVEY_RESPONSES(state, surveyResponses){
        state.surveyResponses = surveyResponses
    },

    SET_COUNT_SURVEY_RESPONSES(state, countSurveyResponses){
        state.countSurveyResponses = countSurveyResponses
    },

    SET_PAGINATION(state, pagination){
        state.pagination = pagination
    },

    SET_SINGLE_SURVEY_RESPONSE(state, response){
        state.response = response
    },

    SET_SINGLE_SURVEY_RESPONSE_LOADING(state, isSingleSurveyResponseLoading){
        state.isSingleSurveyResponseLoading = isSingleSurveyResponseLoading
    },

    SET_SURVEY_RESPONSE_ERROR(state, hasSurveyResponseError){
        state.hasSurveyResponseError = hasSurveyResponseError
    },

    SET_LASTET_SURVEY_RESPONSE_LOADING(state, isLatestResponseLoading){
        state.isLatestResponseLoading = isLatestResponseLoading
    },

    SET_LATEST_SURVEY_RESPONSES(state, lastetSurveyResponses){
        state.lastetSurveyResponses = lastetSurveyResponses
    },

    SET_LATEST_SURVEY_RESPONSE_ERROR(state, hasLatestSurveyResponseError){
        state.hasLatestSurveyResponseError = hasLatestSurveyResponseError
    }
}

const actions = {
    paginatedSurveyResponseList({ commit }, page){
        commit('SET_DATA_LOADING', true)
        surveyResponseList(getToken(), page).then((response) => {
            commit('SET_DATA_LOADING', false)
            commit('SET_SURVEY_RESPONSES', response.data.data)
            commit('SET_COUNT_SURVEY_RESPONSES', response.data.meta.total)
            commit('SET_PAGINATION', response.data.meta)
        }).catch(error => {
            commit('SET_HAS_ERROR', true)
        })
    },

    fetchSurveyResponseData({ commit }, id){
        commit('SET_SINGLE_SURVEY_RESPONSE_LOADING', true)
        fetchSurveyResponse(getToken(), id).then(response => {
            commit('SET_SINGLE_SURVEY_RESPONSE_LOADING', false)
            commit('SET_SINGLE_SURVEY_RESPONSE', response.data.data)
        }).catch(error => {
            commit('SET_SURVEY_RESPONSE_ERROR', true)
        })
    },

    latestSurveyResponses({ commit }){
        commit('SET_LASTET_SURVEY_RESPONSE_LOADING', true)
        latestSurveyResponseList(getToken()).then(response => {
            commit('SET_LASTET_SURVEY_RESPONSE_LOADING', false)
            commit('SET_LATEST_SURVEY_RESPONSES', response.data.data)
        }).catch(error => {
            commit('SET_LATEST_SURVEY_RESPONSE_ERROR', true)
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
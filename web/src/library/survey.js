import Api from './base'

// get the authenticated lastest survey list
export const latestSurveyList = (token) => {
    return Api.get('survey/latest', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

// get the authenticated survey list
export const surveyList = (token, page) => {
    return Api.get(`survey/list?page=${page}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

// get the authenticated survey home list
export const homeSurveyList = (token, page) => {
    return Api.get(`survey/list/home?page=${page}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

// create new survey
export const createSurvey = (token, data) => {
    return Api.post('survey/create', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

// fetch single survey data
export const fetchSurvey = (token, id) => {
    return Api.get(`survey/${id}/show`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

// fetch single survey data for home
export const fetchSurveyForHome = (id) => {
    return Api.get(`survey/${id}/home/show`)
}

// delete survey by id
export const deleteSurvey = (token, data) => {
    return Api.post('survey/delete', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}
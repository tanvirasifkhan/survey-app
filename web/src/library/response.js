import Api from './base'

// get the authenticated lastest survey response list
export const latestSurveyResponseList = (token) => {
    return Api.get('response/latest', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

// get the authenticated survey response list
export const surveyResponseList = (token, page) => {
    return Api.get(`response/list?page=${page}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

// create new survey response
export const createSurveyResponse = (data) => {
    console.log(data)
    return Api.post('response/create', data)
}

// fetch single survey response data
export const fetchSurveyResponse = (token, id) => {
    return Api.get(`response/${id}/show`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

// delete survey response by id
export const deleteSurveyResponse = (token, data) => {
    return Api.post('response/delete', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}
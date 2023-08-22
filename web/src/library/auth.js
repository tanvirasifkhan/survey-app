import Api from './base'

// register new user
export const registerUser = (user) => {
    return Api.post('register', user)
}

// log the user into the system
export const authenticate = (data) => {
    return Api.post('login', data)
}

// get user auth token
export const getToken = () => {
    return  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null
}

// log the user out of the system
export const logout = (token) => {
    return Api.post('logout', {}, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}
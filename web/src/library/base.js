import axios from 'axios'

const baseAPI = 'http://localhost:8000/api/'

const Api = axios.create({
    baseURL: baseAPI
})

export default Api
import api from './Api'
import baseURL from './Http'


export const loginUser = async (user) => {
    const res = await api.post(baseURL + '/api/login', user)
    return res
}

export const saveToken = (token) => {
    localStorage.setItem('token', token)
    
}

export const giveToken = () => {
    return localStorage.getItem('token')
}
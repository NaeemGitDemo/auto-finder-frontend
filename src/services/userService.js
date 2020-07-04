import api from './Api'
import baseURL from './Http'


export const getUser = async () => {
    try {
        const res = await api.get(`${baseURL}/api/users/me`)
        return res

    } catch (error) {

    }
}

export const updateUser = async (user) => {
    try {
        await api.put(`${baseURL}/api/users/me`, user)
    } catch (error) {
        return error
    }
}

export const updateUserPassword = async (password) => {
    try {
        await api.put(`${baseURL}/api/users/me/password`, { password })
    } catch (error) {
        return error
    }
}
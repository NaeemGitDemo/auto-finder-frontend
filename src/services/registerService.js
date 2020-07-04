import api from './Api'
import baseURL from './Http'


export const registerUser = async (user) => {
    const res = await api.post(baseURL + '/api/users', user)
    return res
}
import api from './Api'
import baseURL from './Http'




export const uploadImage = async (formData, config) => {
    try {
        const res = await api.post(baseURL + '/uploads', formData, config)
        return res
    } catch (error) {
        return error
    }
}
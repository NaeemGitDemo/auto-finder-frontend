import api from './Api'
import baseURL from './Http'

export const getModels = async () => {
    try {
        const res = await api.get(baseURL + '/api/models')
        return res.data
    } catch (error) {

    }
}

export const getModel = async (id) => {
    const res = await api.get(`${baseURL}/api/models/${id}`)
    return res.data
}

export const addModel = async (model) => {
    await api.post(baseURL + '/api/models', model)
}

export const updateModel = async (id, model) => {
    await api.put(`${baseURL}/api/models/${id}`, model)
}



export const deleteModel = async (id) => {
    try {
        await api.delete(`${baseURL}/api/models/${id}`)
    } catch (error) {

    }
}


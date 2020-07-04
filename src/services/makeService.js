import api from '../services/Api'
import baseURL from './Http'


export const getMakes = async () => {
    try {
        const res = await api.get(baseURL + '/api/makes')
        return res.data
    } catch (error) {

    }
}
export const getMake = async (id) => {
    try {
        const res = await api.get(`${baseURL}/api/makes/${id}`)
        return res.data
    } catch (error) {

    }
}
export const addMakes = async (make) => {
    await api.post(baseURL + '/api/makes', make)
}

export const updateMake = async (id, name) => {
    const make = {}
    make.name = name
    await api.put(`${baseURL}/api/makes/${id}`, make)
}

export const deleteMake = async (id) => {
    await api.delete(`${baseURL}/api/makes/${id}`)
}
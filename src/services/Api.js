import axios from 'axios'
import { giveToken } from './loginService'

axios.defaults.headers.common['x-auth-token'] = giveToken()

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.1.105:8001/index.php?route=api/v1',
    headers: {'content-type': 'application/x-www-form-urlencoded'}
})

export default api

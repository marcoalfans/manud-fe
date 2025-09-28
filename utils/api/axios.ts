import axios from 'axios'

const api = axios.create({
  baseURL: 'https://manudaja.my.id:4001'
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

export default api

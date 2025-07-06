import axios, { AxiosResponse } from 'axios'

import { refreshAccessToken } from 'apis/services/token'
import { getAccessToken, setAccessToken, removeAccessToken } from './token'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
})

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

let isRefreshing = false
let failedQueue: any[] = []

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (token) {
      if (prom.config.headers) {
        prom.config.headers['Authorization'] = `Bearer ${token}`
      }
      prom.resolve(api(prom.config))
    } else {
      prom.reject(error)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest })
        })
      }
      isRefreshing = true
      try {
        const newToken = await refreshAccessToken()
        setAccessToken(newToken)
        processQueue(null, newToken)
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        removeAccessToken()
        window.location.href = '/'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)

export default api

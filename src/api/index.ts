import axios from 'axios'
import { router } from '@/router'

const api = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: {
    // Authorization: 'token',
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    // Add Authorization header with token to every request if the token exists
    const token = getLocalToken()
    if (token) config.headers['Authorization'] = 'Bearer ' + token
    else setLocalToken()
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

api.interceptors.response.use((response) => {
  // Redirect to /auth and remove token on 401 - Unauthorized.
  if (401 === response.status) {
    console.error(new Error('401 Unauthorized. Redirecting to the authorization page.'))
    setLocalToken()
    router.push('/auth')
  }
  return response
})

export function setLocalToken(token?: string) {
  if (token) localStorage.setItem('pmedia-token', token)
  else localStorage.removeItem('pmedia-token')
}

export function getLocalToken(): string | null {
  return localStorage.getItem('pmedia-token')
}

export function isGuest(): boolean {
  return !localStorage.getItem('pmedia-token')
}

export function isAuth(): boolean {
  return !isGuest()
}

export { api }

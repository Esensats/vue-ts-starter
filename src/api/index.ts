import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: {
    // Authorization: 'token',
    'Content-Type': 'application/json'
  }
})

export { api }

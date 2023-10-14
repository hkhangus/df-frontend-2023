import axios, { AxiosError } from 'axios'

import { getAccessToken } from '../utils/functions/get_access_token'


export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(async (config) => {
  const jwt = await getAccessToken()

  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    return Promise.reject(error.response?.data)
  },
)

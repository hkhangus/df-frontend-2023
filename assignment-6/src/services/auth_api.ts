import { LoginRequest, UserProfile, ResponseWithData } from '../types'
import { axiosInstance } from './axios_instance'

export const authApi = {
  async login(loginRequest: LoginRequest): Promise<UserProfile> {
    return axiosInstance.post('/auth/login', loginRequest)
  },

  getProfile(): Promise<ResponseWithData<UserProfile>> {
    return axiosInstance.get('/me')
  },
}

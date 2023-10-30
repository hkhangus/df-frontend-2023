import {
  Book,
  BookPayload,
  ListResponse,
  ResponseWithData,
  ListParams,
} from '../types'
import { axiosInstance } from './axios_instance'

export const bookApi = {
  get(id: number | string): Promise<ResponseWithData<Book>> {
    console.log('call api')
    return axiosInstance.get(`/books/${id}`)
  },

  getAll(params: Partial<ListParams>): Promise<ListResponse<Book>> {
    return axiosInstance.get('/books', { params })
  },

  add(payload: BookPayload): Promise<ResponseWithData<Book>> {
    return axiosInstance.post('/books', payload)
  },

  update(
    id: number | string,
    payload: BookPayload,
  ): Promise<ResponseWithData<Book>> {
    return axiosInstance.put(`/books/${id}`, payload)
  },

  delete(id: number | string) {
    return axiosInstance.delete(`/books/${id}`)
  },
}

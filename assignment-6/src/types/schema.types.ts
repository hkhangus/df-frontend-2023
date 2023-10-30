import { type } from 'os'

export type LoginRequest = {
  email: string
  password: string
}

export type UserProfile = {
  data: {
    id: number
    email: string
    accessToken: string
  }
}

export type ResponseWithData<T> = {
  data: T
}

export type Pagination = {
  hasNext: boolean
  page: number
  pageSize: number
  sort: number
  totalPages: number
  totalRecords: number
}

export type Metadata = {
  hasNext: boolean
  page: number
  pageSize: number
  totalPages: number
  totalRecords: number
}

export type ListResponse<T> = {
  data: T[]
  metadata: Metadata
}

export type ListParams = {
  page: number
  pageSize: number
  sort: string
  query: string
  topicId: number
}

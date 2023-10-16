import { UserProfile } from '../../types'

export function getAccessToken(): UserProfile | null {
  try {
    return JSON.parse(window.localStorage.getItem('jwt') || '')
  } catch (error) {
    return null
  }
}
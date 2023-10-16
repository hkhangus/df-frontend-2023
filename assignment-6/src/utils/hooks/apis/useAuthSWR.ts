'use client'

import useSWR, { SWRConfiguration } from 'swr'
import { authApi } from '../../../services/auth_api'
import { LoginRequest, UserProfile } from '../../../types'

import { isSSR } from '../../functions'

export interface UseAuthSWRProps {
  options?: Partial<SWRConfiguration>
}

export function useAuthSWR({ options }: UseAuthSWRProps = {}) {
  const { data, error, isLoading, mutate } = useSWR(
    'get-profile',
    () => authApi.getProfile(),
    {
      dedupingInterval: 60 * 60 * 1000, // 1hr
      revalidateOnFocus: false,
      isPaused: () => (isSSR() ? true : Boolean(!localStorage.getItem('jwt'))),
      ...options,
      onError(err) {
        console.log(err)
        logout()
      },
    },
  )

  async function login(payload: LoginRequest) {
    if (isSSR()) return

    const data = await authApi.login(payload)
    console.log('jwt', data.data.accessToken)
    if (data?.data?.accessToken) {
      // console.log('jwt', data.data.accessToken)
      localStorage.setItem('jwt', JSON.stringify(data.data.accessToken))
    }

    await mutate()
  }

  async function logout() {
    if (isSSR()) return
    await localStorage.removeItem('jwt')
  }

  return {
    profile: (data?.data ?? {}) as UserProfile | undefined,
    isLoading,
    isError: error,
    login,
    logout,
    isLoggedIn: Boolean(data?.data),
  }
}

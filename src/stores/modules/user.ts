import { defineStore } from 'pinia'
import type { LoginForm, UserState } from '@/api/user'
import { clearToken, setToken } from '@/utils/auth'

import {
  doLogin,
  getUserInfo,
} from '@/api/user'

const InitUserInfo = {
  uid: 0,
  nickname: '',
  avatar: '',
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserState>({ ...InitUserInfo })

  // Set user's information
  const setInfo = (partial: Partial<UserState>) => {
    userInfo.value = { ...partial }
  }

  const info = async () => {
    try {
      const { data } = await getUserInfo()
      setInfo(data)
    }
    catch (error) {
      clearToken()
      throw error
    }
  }

  return {
    userInfo,
    info,
  }
}, {
  persist: true,
})

export const login = async (loginForm: LoginForm) => {
  try {
    const data = await doLogin(loginForm)
    setToken(data.refreshToken, data.accessToken);
  }
  catch (error) {
    clearToken()
    throw error
  }
}

export default useUserStore

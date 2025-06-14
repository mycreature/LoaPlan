import axios from 'axios'
import { AuthFormData } from '../types/authTypes'

export const requestRegisterUser = async (data: AuthFormData) => {
  try {
    const response = await axios.post('/api/users/register', {
      email: data.email,
      password: data.password,
      apiKey: data.apiKey,
      character: data.character,
    })
    console.log('✅ 회원가입 성공:', response.data)

    alert('회원가입이 완료되었습니다. 로그인해주세요.')
    return response.data
  } catch (error) {
    console.error('❌ 회원가입 실패:', error)
    throw error
  }
}

export const requestLoginUser = async (data: AuthFormData) => {
  try {
    const response = await axios.post('/api/users/login', {
      email: data.email,
      password: data.password,
    })
    console.log('✅ 로그인 성공:', response.data)
    localStorage.setItem('token', response.data.token)
    return response.data
  } catch (error) {
    console.error('❌ 로그인 실패:', error)
    throw error
  }
}

export const requestGuestUser = async () => {
  const guestApiKey = import.meta.env.VITE_GUEST_API_KEY || ''
  const guestCharacter = import.meta.env.VITE_GUEST_CHARACTER || ''

  try {
    const guestData = { apiKey: guestApiKey, character: guestCharacter }
    localStorage.removeItem('token')
    localStorage.removeItem('account-storage')
    sessionStorage.setItem('guest-storage', JSON.stringify(guestData))
    console.log('✅ 게스트 로그인 성공:')
  } catch (error) {
    console.error('❌ 게스트 로그인 실패:', error)
    throw error
  }
}

export const requestLogOut = async () => {
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('account-storage')
    sessionStorage.clear()
    console.log('✅ 로그아웃 성공')
  } catch (error) {
    console.error('❌ 로그아 실패:', error)
    throw error
  }
}

export const requestProfileUpdate = async (data: AuthFormData) => {
  try {
    const response = await axios.put('/api/users/userinfo', {
      email: data.email,
      apiKey: data.apiKey,
      character: data.character,
    })
    console.log('✅ 프로필 수정 성공:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ 프로필 수정 실패:', error)
    throw error
  }
}

export const requestPasswordUpdate = async (data: AuthFormData) => {
  try {
    const response = await axios.put('/api/users/find-password', {
      email: data.email,
      password: data.password,
    })
    console.log('✅ 비밀번호 수정 성공:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ 비밀번호 수정 실패:', error)
    throw error
  }
}

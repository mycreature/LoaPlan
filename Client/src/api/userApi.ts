import axios from 'axios'
import { AuthFormData } from '../types/Types'
import { guestAccount, guestOtherSelection, guestRaidSelection } from '../constants/guestStorage'

export const requestRegisterUser = async (data: AuthFormData) => {
  try {
    const response = await axios.post('/api/auth/signup', {
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
    const response = await axios.post('/api/auth/login', {
      email: data.email,
      password: data.password,
    })
    console.log('✅ 로그인 성공:', response.data)
    storageClear()
    localStorage.setItem('token', response.data.token)
    return response.data
  } catch (error) {
    console.error('❌ 로그인 실패:', error)
    throw error
  }
}

export const requestGuestUser = async () => {
  try {
    storageClear()
    localStorage.setItem('account-storage', JSON.stringify({ state: guestAccount }))
    localStorage.setItem(
      'other-selection-storage',
      JSON.stringify({ state: guestOtherSelection.state }),
    )
    localStorage.setItem(
      'raid-selection-storage',
      JSON.stringify({ state: guestRaidSelection.state }),
    )
    sessionStorage.setItem('guest-token', 'guest-token')
  } catch (error) {
    console.error('❌ 게스트 로그인 실패:', error)
    throw error
  }
}

export const requestLogOut = async () => {
  try {
    storageClear()
    console.log('✅ 로그아웃 성공')
  } catch (error) {
    console.error('❌ 로그아 실패:', error)
    throw error
  }
}

export const requestProfileUpdate = async (data: AuthFormData) => {
  try {
    const response = await axios.put('/api/users/update', {
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
    const response = await axios.put('/api/auth/find-password', {
      email: data.email,
      password: data.password,
    })
    console.log('✅ 비밀번호 수정 성공:', response.data)
    alert('비밀번호가 변경되었습니다. 로그인 해주세요.')
    return response.data
  } catch (error) {
    console.error('❌ 비밀번호 수정 실패:', error)
    throw error
  }
}

export const getApiKey = () => {
  const apiKey = JSON.parse(localStorage.getItem('account-storage') || '{}')?.state?.apiKey

  if (!apiKey) {
    throw new Error('API 키가 설정되지 않았습니다. 먼저 로그인해주세요.')
  }

  return apiKey
}

export const requestDeleteUser = async (email: string) => {
  try {
    const response = await axios.delete(`/api/users/delete/${email}`)
    localStorage.clear()
    console.log('✅ 회원 탈퇴 성공:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ 회원 탈퇴 실패:', error)
    throw error
  }
}

export const sendEmailCode = async (email: string, type: 'register' | 'password') => {
  try {
    const response = await axios.post(`/api/verification/`, {
      email: email,
      type: type,
    })
    console.log('✅ 코드 전송 성공:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ 코드 전송 실패:', error)
    throw error
  }
}

export const checkEmailCode = async (email: string, code: string) => {
  try {
    const response = await axios.post(`/api/verification/verify`, {
      email: email,
      code: code,
    })
    console.log('✅ 코드 확인 성공:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ 코드 확인 실패:', error)
    throw error
  }
}

export const storageClear = async () => {
  try {
    localStorage.removeItem('account-storage')
    localStorage.removeItem('other-selection-storage')
    localStorage.removeItem('raid-selection-storage')
    localStorage.removeItem('token')
    sessionStorage.removeItem('guest-token')
  } catch (error) {
    console.error('❌ 스토리지 초기화 실패:', error)
    throw error
  }
}

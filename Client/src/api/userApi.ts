import axios from 'axios'

export const requestRegisterUser = async (accountStore: any) => {
  try {
    const response = await axios.post('/api/users/register', {
      email: accountStore.email,
      password: accountStore.password,
      apiKey: accountStore.apiKey,
      character: accountStore.character,
    })
    console.log('✅ 회원가입 성공:', response.data)

    alert('회원가입이 완료되었습니다. 로그인해주세요.')
    return response.data
  } catch (error) {
    console.error('❌ 회원가입 실패:', error)
    throw error
  }
}

export const requestLoginUser = async (accountStore: any) => {
  try {
    const response = await axios.post('/api/users/login', {
      email: accountStore.email,
      password: accountStore.password,
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
    localStorage.clear()
    sessionStorage.clear()
    console.log('✅ 로그아웃 성공')
  } catch (error) {
    console.error('❌ 로그아 실패:', error)
    throw error
  }
}

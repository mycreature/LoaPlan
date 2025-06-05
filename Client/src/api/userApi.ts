import axios from 'axios'

export const requestRegisterUser = async (accountStore: any) => {
  try {
    const response = await axios.post('/api/user/register', {
      email: accountStore.email,
      password: accountStore.password,
      apiKey: accountStore.apiKey,
      character: accountStore.character,
    })
    console.log('✅ 회원가입 성공:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ 회원가입 실패:', error)
    throw error
  }
}

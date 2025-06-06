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

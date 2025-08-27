import { jwtDecode } from 'jwt-decode'
import useAccountStore from '../stores/others/AccountStore'
import { checkToken } from '../api/userApi'

interface DecodedToken {
  email: string
  apiKey: string
  character: string
  exp?: number
  iat?: number
}

export const getJwtInfo = async () => {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const decoded: DecodedToken = jwtDecode(token)
    const { email, apiKey, character, exp } = decoded

    // 현재 시간 초 단위
    const now = Math.floor(Date.now() / 1000)

    // 토큰 만료 여부 체크
    if (exp && exp < now) {
      await checkToken()
    }

    useAccountStore.setState({
      email,
      apiKey,
      character,
      exp,
    })

    return true
  } catch (err) {
    console.error('❌ 토큰 디코드 실패:', err)
    localStorage.removeItem('token')
    return false
  }
}

export default getJwtInfo

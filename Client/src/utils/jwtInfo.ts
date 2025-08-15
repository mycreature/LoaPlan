import { jwtDecode } from 'jwt-decode'
import useAccountStore from '../stores/others/AccountStore'

interface DecodedToken {
  email: string
  apiKey: string
  character: string
  exp?: number
  iat?: number
}

export const getJwtInfo = () => {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const decoded: DecodedToken = jwtDecode(token)

    const { email, apiKey, character } = decoded

    useAccountStore.setState({
      email,
      apiKey,
      character,
    })
  } catch (err) {
    console.error('❌ 토큰 디코드 실패:', err)
  }
}

export default getJwtInfo

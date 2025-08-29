import Block from '../components/ui/Block'
import { useState } from 'react'
import { AuthFormData } from '../types/Types'
import { requestGuestUser, requestLoginUser } from '../api/userApi'
import LoginForm from '../components/form/LoginForm'
import { useRequireNoAuth } from '../hook/useAuthRedirect'
import GuestLoginForm from '../components/form/GusetLoginForm'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [loadingGuest, setLoadingGuest] = useState(false)
  const [loadingAuth, setLoadingAuth] = useState(false)

  // 비로그인시만 접근가능 (로그인, 게스트시 메인페이지 리다이렉트)
  useRequireNoAuth()

  const navigate = useNavigate()

  const handleLoginSubmit = async (data: AuthFormData) => {
    setLoadingAuth(true)
    try {
      await requestLoginUser(data)
      navigate('/')
    } catch (error: any) {
      alert(error.response?.data?.message || '로그인 중 오류 발생')
    } finally {
      setLoadingAuth(false)
    }
  }

  const handleGusetLogin = async () => {
    setLoadingGuest(true)
    try {
      await requestGuestUser()
    } catch (error: any) {
      alert(error.response?.data?.message || '게스트 로그인 중 오류 발생')
    } finally {
      setLoadingGuest(false)
      alert('게스트 로그인 성공')
      navigate('/')
    }
  }

  return (
    <main className='flex h-full w-full justify-center'>
      <Block width={390} height={310}>
        <div className='flex h-full w-full flex-col gap-5 p-4'>
          <h2 className='mx-auto leading-none font-extrabold text-black'>로그인</h2>
          <div className='flex flex-col gap-2'>
            <LoginForm onSubmit={handleLoginSubmit} isLoading={loadingAuth} />
            <GuestLoginForm onSubmit={handleGusetLogin} isLoading={loadingGuest} />
          </div>
        </div>
      </Block>
    </main>
  )
}

export default Login

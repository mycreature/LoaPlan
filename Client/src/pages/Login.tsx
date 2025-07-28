import { useNavigate } from 'react-router-dom'
import Block from '../components/ui/Block'
import { useState } from 'react'
import { AuthFormData } from '../types/Types'
import useAccountStore from '../stores/others/AccountStore'
import { requestLoginUser } from '../api/userApi'
import LoginForm from '../components/form/LoginForm'
import { useRequireNoAuth } from '../hook/useAuthRedirect'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const setApiKey = useAccountStore((state) => state.setApiKey)
  const setCharacter = useAccountStore((state) => state.setCharacter)

  // 비로그인시만 접근가능 (로그인, 게스트시 메인페이지 리다이렉트)
  useRequireNoAuth()

  const handleLoginSubmit = async (data: AuthFormData) => {
    setIsLoading(true)
    try {
      const respone = await requestLoginUser(data)

      setApiKey(respone.user.apiKey)
      setCharacter(respone.user.character)

      sessionStorage.clear()

      navigate('/')
    } catch (error: any) {
      alert(error.response?.data?.message || '로그인 중 오류 발생')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-600 pt-[50px]'>
      <main className='space-y-[10px] p-[10px]'>
        <div className='flex justify-center gap-x-[10px]'>
          <Block width={390} height={310}>
            <div className='flex h-full w-full flex-col gap-5 p-4'>
              <h2 className='mx-auto leading-none font-extrabold text-black'>로그인</h2>
              <LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} />
            </div>
          </Block>
        </div>
      </main>
    </div>
  )
}

export default Login

// pages/register.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Block from '../components/ui/Block'
import RegisterForm, { FormData } from '../components/form/RegisterForm'
import useAccountStore from '../stores/AccountStore'
import { requestRegisterUser } from '../api/userApi'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Zustand store actions
  const setEmail = useAccountStore((state) => state.setEmail)
  const setPassword = useAccountStore((state) => state.setPassword)
  const setConfirmPassword = useAccountStore((state) => state.setConfirmPassword)
  const setApiKey = useAccountStore((state) => state.setApiKey)
  const setCharacter = useAccountStore((state) => state.setCharacter)

  const handleRegisterSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      // Store에 데이터 저장
      setEmail(data.email)
      setPassword(data.password)
      setConfirmPassword(data.confirmPassword)
      setApiKey(data.apiKey)
      setCharacter(data.character)

      console.log('회원가입 정보:', data)

      // API 호출
      await requestRegisterUser(useAccountStore.getState())

      // 성공 시 로그인 페이지로 이동
      navigate('/login')
    } catch (error: any) {
      alert(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-600'>
      <main className='space-y-[10px] p-[10px]'>
        <div className='flex justify-center gap-x-[10px]'>
          <Block width={390} height={500}>
            <div className='flex h-full flex-col items-center justify-start'>
              <h2 className='pt-3 text-black'>회원가입</h2>
              <RegisterForm onSubmit={handleRegisterSubmit} isLoading={isLoading} />
            </div>
          </Block>
        </div>
      </main>
    </div>
  )
}

export default Register

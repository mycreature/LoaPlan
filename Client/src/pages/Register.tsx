// pages/register.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Block from '../components/ui/Block'
import RegisterForm from '../components/form/RegisterForm'
import useAccountStore from '../stores/AccountStore'
import { requestRegisterUser } from '../api/userApi'
import { AuthFormData } from '../types/authTypes'
import { useRequireNoAuth } from '../hook/useAuthRedirect'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // 전역 상태관리
  const setEmail = useAccountStore((state) => state.setEmail)
  const setPassword = useAccountStore((state) => state.setPassword)
  const setConfirmPassword = useAccountStore((state) => state.setConfirmPassword)
  const setApiKey = useAccountStore((state) => state.setApiKey)
  const setCharacter = useAccountStore((state) => state.setCharacter)

  // 비로그인시 접근가능 (로그인, 게스트 접근 x)
  useRequireNoAuth()

  /**
   * 회원가입 폼 제출 핸들러
   * @param data {AuthFormData} 회원가입 폼 데이터
   */
  const handleRegisterSubmit = async (data: AuthFormData) => {
    setIsLoading(true)

    try {
      // 1. Store에 데이터 저장
      setEmail(data.email)
      setPassword(data.password)
      setConfirmPassword(data.confirmPassword)
      setApiKey(data.apiKey)
      setCharacter(data.character)

      // 2. API 호출
      await requestRegisterUser(useAccountStore.getState())
      sessionStorage.clear()

      // 3. 성공 시 로그인 페이지로 이동
      navigate('/login')
    } catch (error: any) {
      // 4. 에러 발생 경우
      alert(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.')
    } finally {
      // 5. 로딩 상태 초기화
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

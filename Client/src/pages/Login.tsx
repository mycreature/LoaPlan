import { useNavigate } from 'react-router-dom'
import Block from '../components/ui/Block'
// import Button from '../components/ui/Button'
// import Input from '../components/ui/Input'
import { useState } from 'react'
import { AuthFormData } from '../types/authTypes'
import useAccountStore from '../stores/AccountStore'
import { requestLoginUser } from '../api/userApi'
import LoginForm from '../components/form/LoginForm'

const login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const setEmail = useAccountStore((state) => state.setEmail)
  const setPassword = useAccountStore((state) => state.setPassword)
  const setApiKey = useAccountStore((state) => state.setApiKey)
  const setCharacter = useAccountStore((state) => state.setCharacter)

  const handleLoginSubmit = async (data: AuthFormData) => {
    setIsLoading(true)

    try {
      // 1. Store에 데이터 저장
      setEmail(data.email)
      setPassword(data.password)
      setApiKey(data.apiKey)
      setCharacter(data.character)

      console.log('로그인 정보:', data)
      // 2. API 호출
      await requestLoginUser(useAccountStore.getState())
      // 3. 성공 시 메인 페이지 이동
      navigate('/')
    } catch (error: any) {
      alert(error.response?.data?.message || '로그인 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-600'>
      <main className='space-y-[10px] p-[10px]'>
        <div className='flex justify-center gap-x-[10px]'>
          <Block width={390} height={300}>
            <div className='flex h-full flex-col items-center justify-start'>
              <h2 className='pt-3 text-black'>로그인</h2>
              <LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} />
            </div>
          </Block>
        </div>
      </main>
    </div>
  )
}

export default login

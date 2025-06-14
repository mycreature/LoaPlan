import { useNavigate } from 'react-router-dom'
import Block from '../components/ui/Block'
import { useState } from 'react'
import { AuthFormData } from '../types/authTypes'
import { requestPasswordUpdate } from '../api/userApi'

import { useRequireNoAuth } from '../hook/useAuthRedirect'
import FindPasswordForm from '../components/form/FindPasswordForm'

const FindPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // 비로그인시 접근가능 (로그인, 게스트 접근 x)
  useRequireNoAuth()

  const handlePasswordSubmit = async (data: AuthFormData) => {
    setIsLoading(true)

    try {
      await requestPasswordUpdate(data)

      navigate('/login')
    } catch (error: any) {
      alert(error.response?.data?.message || '변경중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen w-full bg-gray-600'>
      <main className='w-full space-y-[10px] p-[10px]'>
        <div className='flex w-full justify-center gap-x-[10px]'>
          <Block width={390} height={340}>
            <div className='flex h-full w-full flex-col items-center justify-start'>
              <h2 className='pt-3 text-black'>비밀번호 변경</h2>
              <FindPasswordForm onSubmit={handlePasswordSubmit} isLoading={isLoading} />
            </div>
          </Block>
        </div>
      </main>
    </div>
  )
}

export default FindPassword

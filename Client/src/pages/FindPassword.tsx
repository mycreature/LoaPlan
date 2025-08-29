import { useNavigate } from 'react-router-dom'
import Block from '../components/ui/Block'
import { useState } from 'react'
import { AuthFormData } from '../types/Types'
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
    <main className='flex h-full w-full justify-center'>
      <Block width={390} height={398}>
        <div className='flex h-full w-full flex-col gap-5 p-4'>
          <h2 className='mx-auto leading-none font-extrabold text-black'>비밀번호 변경</h2>
          <FindPasswordForm onSubmit={handlePasswordSubmit} isLoading={isLoading} />
        </div>
      </Block>
    </main>
  )
}

export default FindPassword

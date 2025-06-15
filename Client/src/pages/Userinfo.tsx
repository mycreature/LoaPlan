import { useNavigate } from 'react-router-dom'
import Block from '../components/ui/Block'
import { useState } from 'react'
import { AuthFormData } from '../types/authTypes'
import useAccountStore from '../stores/AccountStore'
import { requestProfileUpdate } from '../api/userApi'
import UserinfoForm from '../components/form/UserinfoForm'
import { useRequireUser } from '../hook/useAuthRedirect'

const Userinfo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const setCharacter = useAccountStore((state) => state.setCharacter)

  // 로그인시 접근가능 (게스트, 비로그인 접근 x)
  useRequireUser('/login')

  const handleProfileSubmit = async (data: AuthFormData) => {
    setIsLoading(true)

    const prevState = useAccountStore.getState()

    const prevCharacter = prevState.character

    try {
      const respone = await requestProfileUpdate(data)

      setCharacter(respone.user?.character)

      navigate('/')
    } catch (error: any) {
      // 실패 시 이전 값으로 복원

      setCharacter(prevCharacter)

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
              <h2 className='pt-3 text-black'>회원 수정</h2>
              <UserinfoForm onSubmit={handleProfileSubmit} isLoading={isLoading} />
            </div>
          </Block>
        </div>
      </main>
    </div>
  )
}

export default Userinfo

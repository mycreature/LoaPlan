import { useNavigate } from 'react-router-dom'
import Block from '../components/ui/Block'
import { useState } from 'react'
import { AuthFormData } from '../types/authTypes'
import useAccountStore from '../stores/AccountStore'
import { requestProfileUpdate } from '../api/userApi'
import UserinfoForm from '../components/form/UserinfoForm'

const Userinfo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const setApiKey = useAccountStore((state) => state.setApiKey)
  const setCharacter = useAccountStore((state) => state.setCharacter)

  const handleProfileSubmit = async (data: AuthFormData) => {
    setIsLoading(true)

    try {
      setApiKey(data.apiKey)
      setCharacter(data.character)

      // 2. API 호출
      await requestProfileUpdate(useAccountStore.getState())
      // 3. 성공 시 메인 페이지 이동
      navigate('/')
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

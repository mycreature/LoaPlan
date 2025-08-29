import { useNavigate } from 'react-router-dom'
import Block from '../components/ui/Block'
import { useState } from 'react'
import { AuthFormData } from '../types/Types'
import { requestProfileUpdate } from '../api/userApi'
import UserinfoForm from '../components/form/UserinfoForm'
import { useRequireUser } from '../hook/useAuthRedirect'
import DeleteUserForm from '../components/form/DeleteUserForm'

const Userinfo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // 로그인시 접근가능 (게스트, 비로그인 접근 x)
  useRequireUser('/login')

  const handleProfileSubmit = async (data: AuthFormData) => {
    setIsLoading(true)

    try {
      await requestProfileUpdate(data)

      alert('변경이 완료되었습니다.')
      navigate('/')
    } catch (error: any) {
      alert(error.response?.data?.message || '변경중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className='flex h-full w-full justify-center'>
      <Block width={390} height={310}>
        <div className='flex w-full flex-col gap-5 p-4'>
          <h2 className='mx-auto leading-none font-extrabold text-black'>회원 수정</h2>
          <div className='flex flex-col gap-2'>
            <UserinfoForm onSubmit={handleProfileSubmit} isLoading={isLoading} />
            <DeleteUserForm />
          </div>
        </div>
      </Block>
    </main>
  )
}

export default Userinfo

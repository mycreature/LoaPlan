import { useNavigate } from 'react-router-dom'
import { requestDeleteUser } from '../../api/userApi'
import useAccountStore from '../../stores/others/AccountStore'
import Button from '../ui/Button'
import { useState } from 'react'

const DeleteUserForm = () => {
  const navigate = useNavigate()
  const email = useAccountStore((state) => state.email)

  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm('정말로 탈퇴하시겠습니까?')
    if (!confirmDelete) return

    setIsLoading(true)

    if (!email) {
      alert('이메일 정보가 없습니다. 다시 로그인해주세요.')
      return
    }
    try {
      await requestDeleteUser(email)
      navigate('/login')
    } catch (error) {
      console.error('회원 탈퇴 실패:', error)
      alert('회원 탈퇴 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
      window.location.reload()
      alert('회원 탈퇴가 완료되었습니다.')
    }
  }

  return (
    <div className='flex flex-col'>
      <Button
        type='button'
        text='회원 탈퇴'
        onClick={handleDeleteUser}
        lightColor='bg-red'
        darkColor='bg-black'
        width={358}
        height={40}
        isLoading={isLoading}
      />
    </div>
  )
}

export default DeleteUserForm

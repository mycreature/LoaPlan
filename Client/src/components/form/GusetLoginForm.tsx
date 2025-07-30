import Button from '../ui/Button'

interface GuestLoginFormProps {
  onSubmit: any
  isLoading: boolean
}

const GuestLoginForm = ({ onSubmit, isLoading = false }: GuestLoginFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault() // 새로고침 방지
        onSubmit()
      }}
      className='flex flex-col'
    >
      <Button
        text={isLoading ? '로그인 중...' : '게스트 로그인'}
        type='submit'
        disabled={isLoading}
        darkColor='bg-black'
        lightColor='bg-red'
      />
    </form>
  )
}

export default GuestLoginForm

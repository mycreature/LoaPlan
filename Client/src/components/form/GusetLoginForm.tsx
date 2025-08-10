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
        text='게스트 로그인'
        type='submit'
        darkColor='bg-black'
        lightColor='bg-red'
        width={358}
        height={40}
        isLoading={isLoading}
      />
    </form>
  )
}

export default GuestLoginForm

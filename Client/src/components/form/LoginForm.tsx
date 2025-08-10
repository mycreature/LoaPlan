import { Controller, useForm } from 'react-hook-form'
import Button from '../ui/Button'
import Input from '../ui/Input'
import ErrorText from '../ui/ErrorText'

import { AuthFormData } from '../../types/Types'

import { validateEmail } from '../../utils/validation'
import { Link } from 'react-router-dom'

interface LoginFormProps {
  onSubmit: (data: AuthFormData) => void
  isLoading?: boolean
}

const LoginForm = ({ onSubmit, isLoading = false }: LoginFormProps) => {
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<AuthFormData>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleFormSubmit = (data: AuthFormData) => {
    // 모든 값이 유효하고, 인증도 완료된 경우에만 onSubmit
    if (!errors.email && !errors.password && data.email && data.password) {
      onSubmit(data)
    } else {
      // 실패 시 로그 출력 및 알림
      console.log('유효성 검사 실패:', {
        emailError: errors.email?.message,
        passwordError: errors.password?.message,
      })
      alert('입력한 정보를 확인해주세요.')
    }
  }

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(handleFormSubmit)}>
      <div className='flex flex-col'>
        {/* 이메일 필드 */}
        <Controller
          name='email'
          control={control}
          rules={{
            validate: (value) => validateEmail(value) || true, // 유효하지 않으면 에러 메시지, 유효하면 true
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                placeholder='이메일'
                type='email'
                error={errors.email?.message || ''}
              />
              <ErrorText message={errors.email?.message} />
            </>
          )}
        />
        {/* 비밀번호 필드 */}
        <Controller
          name='password'
          control={control}
          rules={{
            validate: (value) => (value ? true : '비밀번호를 입력해주세요.'),
          }}
          render={({ field }) => (
            <>
              <Input {...field} placeholder='비밀번호' className={`w-full`} type='password' />
            </>
          )}
        />
      </div>
      <div className='my-1 flex h-5 gap-2'>
        <Link to='/register'>
          <span className='text-sm text-black underline'>회원가입</span>
        </Link>
        <Link to='/find-password'>
          <span className='text-sm text-black underline'>비밀번호 찾기</span>
        </Link>
      </div>
      <div className='mt-2 flex flex-col'>
        <Button
          text='로그인'
          type='submit'
          disabled={isLoading}
          isLoading={isLoading}
          width={358}
          height={40}
        />
      </div>
    </form>
  )
}

export default LoginForm

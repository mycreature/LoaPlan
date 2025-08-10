import { useForm, Controller } from 'react-hook-form'
import Button from '../ui/Button'
import Input from '../ui/Input'
import ErrorText from '../ui/ErrorText'

import { AuthFormData } from '../../types/Types'

import { validateEmail, validatePassword, validateConfirmPassword } from '../../utils/validation'

interface FindPasswordProps {
  onSubmit: (data: AuthFormData) => void // 폼 제출 시 실행할 함수
  isLoading?: boolean // 로딩 상태
}

const FindPasswordForm = ({ onSubmit, isLoading = false }: FindPasswordProps) => {
  // useForm 훅으로 폼을 제어
  const {
    control,
    handleSubmit,
    watch,

    formState: { errors }, // 에러 정보
  } = useForm<AuthFormData>({
    mode: 'onTouched', // onBlur 시 값 검사
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { password } = watch() // 필요한 값 구조분해

  // 실제 폼 제출 함수 (유효성 검사를 통과한 경우만 실행)
  const handleFormSubmit = (data: AuthFormData) => {
    // 모든 값이 유효하고, 인증도 완료된 경우에만 onSubmit 호출
    if (
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword &&
      data.email &&
      data.password &&
      data.confirmPassword
    ) {
      onSubmit(data)
    } else {
      // 실패 시 로그 출력 및 알림
      console.log('유효성 검사 실패:', {
        emailError: errors.email?.message,
        passwordError: errors.password?.message,
        confirmPasswordError: errors.confirmPassword?.message,
      })
      alert('입력한 정보를 확인해주세요.')
    }
  }

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(handleFormSubmit)}>
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
              className={`w-full ${errors.email ? 'mb-1' : ''}`}
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
          validate: (value) => validatePassword(value) || true,
        }}
        render={({ field }) => (
          <>
            <Input
              {...field}
              placeholder='비밀번호'
              className={`w-full ${errors.password ? 'mb-1' : ''}`}
              type='password'
            />
            <ErrorText message={errors.password?.message} />
          </>
        )}
      />

      {/* 비밀번호 재입력 필드 */}
      <Controller
        name='confirmPassword'
        control={control}
        rules={{
          validate: (value) => validateConfirmPassword(password, value) || true,
        }}
        render={({ field }) => (
          <>
            <Input
              {...field}
              placeholder='비밀번호 재입력'
              className={`w-full ${errors.confirmPassword ? 'mb-1' : ''}`}
              type='password'
            />
            <ErrorText message={errors.confirmPassword?.message} />
          </>
        )}
      />

      {/* 최종 제출 버튼 */}
      <div className='mt-2 flex flex-col'>
        <Button type='submit' text='비밀번호 변경' isLoading={isLoading} width={358} height={40} />
      </div>
    </form>
  )
}

export default FindPasswordForm

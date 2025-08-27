import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import ErrorText from '../ui/ErrorText'
import { checkEmailCode, sendEmailCode } from '../../api/userApi'
import { AxiosError } from 'axios'
import { AuthFormData } from '../../types/Types'

import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  disabledEmailInput,
  disableldVerificationCodeInput,
} from '../../utils/validation'

interface RegisterFormProps {
  onSubmit: (data: AuthFormData) => void // 폼 제출 시 실행할 함수
  isLoading?: boolean // 로딩 상태
}

const FindPasswordForm = ({ onSubmit, isLoading = false }: RegisterFormProps) => {
  // 이메일 인증여부 상태 관리
  const [emailChecked, setEmailChecked] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [verificationCodeChecked, setVerificationCodeChecked] = useState(false)

  // 버튼 클릭시 각각의 로딩 상태 관리
  const [loadingEmailSend, setLoadingEmailSend] = useState(false)
  const [loadingVerificationCode, setLoadingVerificationCode] = useState(false)

  // useForm 훅으로 폼을 제어
  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors }, // 에러 정보
  } = useForm<AuthFormData>({
    mode: 'onTouched', // onBlur 시 값 검사
    defaultValues: {
      email: '',
      verificationCode: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { email, password } = watch() // 필요한 값 구조분해

  // 실제 폼 제출 함수 (유효성 검사를 통과한 경우만 실행)
  const handleFormSubmit = (data: AuthFormData) => {
    // 모든 값이 유효하고, 인증도 완료된 경우에만 onSubmit 호출
    if (
      !errors.email &&
      !errors.verificationCode &&
      !errors.password &&
      !errors.confirmPassword &&
      data.email &&
      data.verificationCode &&
      data.password &&
      data.confirmPassword
    ) {
      onSubmit(data)
    } else {
      // 실패 시 로그 출력 및 알림
      console.log('유효성 검사 실패:', {
        emailError: errors.email?.message,
        verificationCodeError: errors.verificationCode?.message,
        passwordError: errors.password?.message,
        confirmPasswordError: errors.confirmPassword?.message,
      })
      alert('입력한 정보를 확인해주세요.')
    }
  }

  const handleError = (field: keyof AuthFormData, error: any) => {
    if (error instanceof AxiosError) {
      setError(field, {
        message: error.response?.data.message || field + ' 에 대한 오류가 발생했습니다.',
      })
      alert(error.response?.data.message)
    } else {
      setError(field, { message: '알수 없는 오류가 발생했습니다.' })
    }
  }

  return (
    <form className='flex w-[358px] flex-col' onSubmit={handleSubmit(handleFormSubmit)}>
      {/* 이메일 필드 */}
      <div className={`flex w-full items-center justify-between`}>
        <Controller
          name='email'
          control={control}
          rules={{
            validate: (value) => validateEmail(value) || true, // 유효하지 않으면 에러 메시지, 유효하면 true
          }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder='이메일'
              error={errors.email?.message || ''}
              width={260}
              disabled={disabledEmailInput(email, emailChecked, errors.email?.message || '')}
              type='email'
              onChange={(e) => {
                field.onChange(e.target.value) // 입력값 변경
                setEmailChecked(false) // 인증 초기화
                clearErrors('email') // 에러 초기화
              }}
            />
          )}
        />
        <Button
          text='발송'
          type='button'
          disabled={disabledEmailInput(email, emailChecked, errors.email?.message || '')}
          isLoading={loadingEmailSend}
          onClick={async () => {
            setLoadingEmailSend(true)
            try {
              if (validateEmail(email)) {
                return alert('이메일 형식이 올바르지 않습니다.')
              }
              const code = await sendEmailCode(email, 'password')

              if (!code) {
                setError('email', { message: code.message })
              } else {
                clearErrors('email')
                alert('이메일 인증 코드를 전송했습니다.')
                setEmailChecked(true) // 인증 상태 true
              }
            } catch (error) {
              handleError('email', error)
            } finally {
              setLoadingEmailSend(false) // 로딩 종료
            }
          }}
        />
      </div>
      <ErrorText message={errors.email?.message} />

      {/* 이메일 인증 코드 필드 */}
      <div className={`flex w-full items-center justify-between`}>
        <Controller
          name='verificationCode'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder='이메일 인증코드'
              error={errors.verificationCode?.message || ''}
              width={260}
              disabled={disableldVerificationCodeInput(
                verificationCode,
                verificationCodeChecked,
                emailChecked,
                errors.verificationCode?.message,
              )}
              type='verificationCode'
              onChange={(e) => {
                field.onChange(e.target.value) // 입력값 변경
                setVerificationCode(e.target.value)
                setVerificationCodeChecked(false) // 인증 초기화
                clearErrors('verificationCode') // 에러 초기화
              }}
            />
          )}
        />
        <Button
          text='인증'
          type='button'
          disabled={disableldVerificationCodeInput(
            verificationCode,
            verificationCodeChecked,
            emailChecked,
            errors.verificationCode?.message || '',
          )}
          isLoading={loadingVerificationCode}
          onClick={async () => {
            setLoadingVerificationCode(true)
            try {
              const code = await checkEmailCode(email, verificationCode)
              if (!code) {
                setError('verificationCode', { message: code.message })
              } else {
                clearErrors('verificationCode')
                alert('이메일 인증이 완료되었습니다.')
                setVerificationCodeChecked(true) // 인증 상태 true
              }
            } catch (error) {
              handleError('verificationCode', error)
            } finally {
              setLoadingVerificationCode(false)
            }
          }}
        />
      </div>
      <ErrorText message={errors.verificationCode?.message} />

      {/* 비밀번호 필드 */}
      <Controller
        name='password'
        control={control}
        rules={{
          validate: (value) => validatePassword(value) || true,
        }}
        render={({ field }) => (
          <>
            <Input {...field} placeholder='신규 비밀번호' type='password' />
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
            <Input {...field} placeholder='비밀번호 재입력' type='password' />
            <ErrorText message={errors.confirmPassword?.message} />
          </>
        )}
      />

      {/* 최종 제출 버튼 */}
      <div className='mt-2 flex flex-col'>
        <Button
          type='submit'
          text={isLoading ? '처리중...' : '회원가입'}
          width={358}
          height={40}
          disabled={isLoading}
        />
      </div>
    </form>
  )
}

export default FindPasswordForm

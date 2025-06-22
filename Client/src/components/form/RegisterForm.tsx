import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import ErrorText from '../ui/ErrorText'

import { AuthFormData } from '../../types/authTypes'

import {
  validateEmail,
  validatePassword,
  validateCharacterName,
  validateConfirmPassword,
  validateApiKey,
  disabledCharacterInput,
  disabledApiKeyInput,
} from '../../utils/validation'

interface RegisterFormProps {
  onSubmit: (data: AuthFormData) => void // 폼 제출 시 실행할 함수
  isLoading?: boolean // 로딩 상태
}

const RegisterForm = ({ onSubmit, isLoading = false }: RegisterFormProps) => {
  // API Key, 캐릭터 인증 여부를 상태로 관리
  const [apiKeyChecked, setApiKeyChecked] = useState(false)
  const [characterChecked, setCharacterChecked] = useState(false)

  // useForm 훅으로 폼을 제어
  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors }, // 에러 정보
  } = useForm<AuthFormData>({
    mode: 'onTouched', // onBlur 시 값 검사
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      apiKey: '',
      character: '',
    },
  })

  const { password, apiKey, character } = watch() // 필요한 값 구조분해

  // 실제 폼 제출 함수 (유효성 검사를 통과한 경우만 실행)
  const handleFormSubmit = (data: AuthFormData) => {
    // 모든 값이 유효하고, 인증도 완료된 경우에만 onSubmit 호출
    if (
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword &&
      !errors.apiKey &&
      !errors.character &&
      data.email &&
      data.password &&
      data.confirmPassword &&
      data.apiKey &&
      data.character &&
      apiKeyChecked
    ) {
      onSubmit(data)
    } else {
      // 실패 시 로그 출력 및 알림
      console.log('유효성 검사 실패:', {
        emailError: errors.email?.message,
        passwordError: errors.password?.message,
        confirmPasswordError: errors.confirmPassword?.message,
        apiKeyError: errors.apiKey?.message,
        characterError: errors.character?.message,
      })
      alert('입력한 정보를 확인해주세요.')
    }
  }

  return (
    <form className='mt-4 w-[90%] space-y-[20px]' onSubmit={handleSubmit(handleFormSubmit)}>
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

      {/* API Key 필드와 인증 버튼 */}
      <div className={`${errors.apiKey ? 'mb-1' : ''} flex w-full items-center justify-between`}>
        <Controller
          name='apiKey'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder='API KEY'
              error={errors.apiKey?.message || ''}
              disabled={disabledApiKeyInput(apiKey, apiKeyChecked, errors.apiKey?.message || '')}
              type='api' // 커스텀 Input이므로 커스텀 type 허용
              onChange={(e) => {
                field.onChange(e.target.value) // 입력값 변경
                setApiKeyChecked(false) // 인증 초기화
                clearErrors('apiKey') // 에러 초기화
                setValue('character', '') // 캐릭터 초기화
              }}
            />
          )}
        />
        <Button
          text='인증'
          textClass='text-2xl font-extrabold h-full '
          className='h-full rounded-lg px-6 py-1'
          type='button'
          disabled={disabledApiKeyInput(apiKey, apiKeyChecked, errors.apiKey?.message || '')}
          onClick={async () => {
            const error = await validateApiKey(apiKey) // API 키 유효성 검사
            if (error) {
              setError('apiKey', { message: error })
            } else {
              clearErrors('apiKey')
            }
            setApiKeyChecked(true) // 인증 상태 true
          }}
        />
      </div>
      <ErrorText message={errors.apiKey?.message} />

      {/* 캐릭터명 필드와 인증 버튼 */}
      <div className={`${errors.character ? 'mb-1' : ''} flex w-full items-center justify-between`}>
        <Controller
          name='character'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder='대표 캐릭터명'
              disabled={disabledCharacterInput(
                character,
                characterChecked,
                errors.character?.message || '',
                apiKey,
                apiKeyChecked,
                errors.apiKey?.message || '',
              )}
              error={errors.character?.message || ''}
              type='character'
              onChange={(e) => {
                field.onChange(e.target.value) // 값 업데이트
                setCharacterChecked(false) // 인증 초기화
                clearErrors('character') // 에러 초기화
              }}
            />
          )}
        />
        <Button
          text='인증'
          textClass='text-2xl font-extrabold h-full '
          type='button'
          disabled={disabledCharacterInput(
            character,
            characterChecked,
            errors.character?.message || '',
            apiKey,
            apiKeyChecked,
            errors.apiKey?.message || '',
          )}
          className='h-full rounded-lg px-6 py-1'
          onClick={async () => {
            const error = await validateCharacterName(character, apiKey)
            if (error) {
              setError('character', { message: error })
            } else {
              clearErrors('character')
            }
            setCharacterChecked(true)
          }}
        />
      </div>
      <ErrorText message={errors.character?.message} />

      {/* 최종 제출 버튼 */}
      <div className='mt-8 space-y-[10px]'>
        <Button
          type='submit'
          text={isLoading ? '처리중...' : '회원가입'}
          className='w-full'
          textClass='text-xl font-extrabold'
          disabled={isLoading}
        />
      </div>
    </form>
  )
}

export default RegisterForm

import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import {
  validateEmail,
  validatePassword,
  validateCharacterName,
  validateConfirmPassword,
  validateApiKey,
  disabledCharacterInput,
  disabledApiKeyInput,
} from '../../utils/validation'

export interface FormData {
  email: string
  password: string
  confirmPassword: string
  apiKey: string
  character: string
}

interface RegisterFormProps {
  onSubmit: (data: FormData) => void
  isLoading?: boolean
}

const RegisterForm = ({ onSubmit, isLoading = false }: RegisterFormProps) => {
  const [apiKeyChecked, setApiKeyChecked] = useState(false)
  const [characterChecked, setCharacterChecked] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      apiKey: '',
      character: '',
    },
  })

  const watchedValues = watch()
  const { password, apiKey, character } = watchedValues

  const handleFormSubmit = (data: FormData) => {
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
      <Controller
        name='email'
        control={control}
        rules={{
          validate: (value) => validateEmail(value) || true,
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
            {errors.email && (
              <span style={{ color: 'red', fontSize: '0.9rem' }} className='mb-3'>
                {errors.email.message}
              </span>
            )}
          </>
        )}
      />

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
            {errors.password && (
              <span style={{ color: 'red', fontSize: '0.9rem' }} className='mb-3'>
                {errors.password.message}
              </span>
            )}
          </>
        )}
      />

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
            {errors.confirmPassword && (
              <span style={{ color: 'red', fontSize: '0.9rem' }} className='mb-3'>
                {errors.confirmPassword.message}
              </span>
            )}
          </>
        )}
      />

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
              type='api'
              onChange={(e) => {
                field.onChange(e.target.value)
                setApiKeyChecked(false)
                clearErrors('apiKey')
                setValue('character', '')
              }}
            />
          )}
        />
        <Button
          text='인증'
          textStyle='text-2xl font-extrabold h-full '
          className='h-full rounded-lg px-6 py-1'
          type='button'
          disabled={disabledApiKeyInput(apiKey, apiKeyChecked, errors.apiKey?.message || '')}
          onClick={async () => {
            const error = await validateApiKey(apiKey)
            if (error) {
              setError('apiKey', { message: error })
            } else {
              clearErrors('apiKey')
            }
            setApiKeyChecked(true)
          }}
        />
      </div>
      {errors.apiKey && (
        <span style={{ color: 'red', fontSize: '0.9rem' }} className='mb-3'>
          {errors.apiKey.message}
        </span>
      )}

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
            />
          )}
        />
        <Button
          text='인증'
          textStyle='text-2xl font-extrabold h-full '
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
      {errors.character && (
        <span style={{ color: 'red', fontSize: '0.9rem' }} className='mb-3'>
          {errors.character.message}
        </span>
      )}

      <div className='mt-8 space-y-[10px]'>
        <Button
          type='submit'
          text={isLoading ? '처리중...' : '회원가입'}
          className='w-full'
          textStyle='text-xl font-extrabold'
          disabled={isLoading}
        />
      </div>
    </form>
  )
}

export default RegisterForm

import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import ErrorText from '../ui/ErrorText'
import { AuthFormData } from '../../types/Types'
import {
  validateCharacterName,
  validateApiKey,
  disabledCharacterInput,
  disabledApiKeyInput,
} from '../../utils/validation'
import useAccountStore from '../../stores/others/AccountStore'
import { AxiosError } from 'axios'

interface UserinfoFormProps {
  onSubmit: (data: AuthFormData) => void // 폼 제출 시 실행할 함수
  isLoading?: boolean // 로딩 상태
}

const UserinfoForm = ({ onSubmit, isLoading = false }: UserinfoFormProps) => {
  // API Key, 캐릭터 인증 여부를 상태로 관리
  const [apiKeyChecked, setApiKeyChecked] = useState(false)
  const [characterChecked, setCharacterChecked] = useState(false)

  const [loadingApiKey, setLoadingApiKey] = useState(false)
  const [loadingCharacter, setLoadingCharacter] = useState(false)

  const email = useAccountStore((state) => state.email)

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
      apiKey: '',
      character: '',
      email: email,
    },
  })

  const { apiKey, character } = watch() // 필요한 값 구조분해

  // 실제 폼 제출 함수 (유효성 검사를 통과한 경우만 실행)
  const handleFormSubmit = (data: AuthFormData) => {
    // 모든 값이 유효하고, 인증도 완료된 경우에만 onSubmit 호출
    if (
      !errors.apiKey &&
      !errors.character &&
      data.apiKey &&
      data.character &&
      apiKeyChecked &&
      characterChecked
    ) {
      onSubmit(data)
    } else {
      // 실패 시 로그 출력 및 알림
      console.log('유효성 검사 실패:', {
        apiKeyError: errors.apiKey?.message,
        characterError: errors.character?.message,
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
    <form className='flex h-full w-[358px] flex-col' onSubmit={handleSubmit(handleFormSubmit)}>
      {/* API Key 필드와 인증 버튼 */}
      <div className={`flex w-full items-center justify-between`}>
        <Controller
          name='apiKey'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder='API KEY'
              error={errors.apiKey?.message || ''}
              width={260}
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
          type='button'
          disabled={disabledApiKeyInput(apiKey, apiKeyChecked, errors.apiKey?.message || '')}
          isLoading={loadingApiKey}
          onClick={async () => {
            setLoadingApiKey(true)
            try {
              const error = await validateApiKey(apiKey) // API 키 유효성 검사
              if (error) {
                setError('apiKey', { message: error })
              } else {
                setApiKeyChecked(true)
                clearErrors('apiKey')
              }
            } catch (error) {
              handleError('apiKey', error)
            } finally {
              setLoadingApiKey(false)
            }
          }}
        />
      </div>
      <ErrorText message={errors.apiKey?.message} />

      {/* 캐릭터명 필드와 인증 버튼 */}
      <div className={`flex w-full items-center justify-between`}>
        <Controller
          name='character'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder='대표 캐릭터명'
              width={260}
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
          type='button'
          disabled={disabledCharacterInput(
            character,
            characterChecked,
            errors.character?.message || '',
            apiKey,
            apiKeyChecked,
            errors.apiKey?.message || '',
          )}
          isLoading={loadingCharacter}
          onClick={async () => {
            setLoadingCharacter(true)
            try {
              const error = await validateCharacterName(character, apiKey)
              if (error) {
                setError('character', { message: error })
              } else {
                setCharacterChecked(true)
                clearErrors('character')
              }
            } catch (error) {
              handleError('character', error)
            } finally {
              setLoadingCharacter(false)
            }
          }}
        />
      </div>
      <ErrorText message={errors.character?.message} />

      <div className='mt-2 flex flex-col'>
        {/* 변경 사항 저장 */}
        <Button type='submit' text='변경 사항 저장' isLoading={isLoading} width={358} height={40} />
      </div>
    </form>
  )
}

export default UserinfoForm

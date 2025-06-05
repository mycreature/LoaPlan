import { useState } from 'react'
import Block from '../components/ui/Block'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import useAccountStore from '../stores/AccountStore'
import {
  validateEmail,
  validatePassword,
  validateCharacterName,
  validateConfirmPassword,
  validateApiKey,
} from '../utils/validation'

const register = () => {
  // 전역 상태관리
  const setEmail = useAccountStore((state) => state.setEmail)
  const setPassword = useAccountStore((state) => state.setPassword)
  const setConfirmPassword = useAccountStore((state) => state.setConfirmPassword)
  const setApiKey = useAccountStore((state) => state.setApiKey)
  const setCharacter = useAccountStore((state) => state.setCharacter)

  // 로컬 상태관리
  const [email, setEmailState] = useState('')
  const [password, setPasswordState] = useState('')
  const [confirmPassword, setConfirmPasswordState] = useState('')
  const [apiKey, setApiKeyState] = useState('')
  const [character, setCharacterState] = useState('')

  // 유효성 검사 상태관리
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [apiKeyError, setApiKeyError] = useState('')
  const [apiKeyChecked, setApiKeyChecked] = useState(false)
  const [characterError, setCharacterError] = useState('')

  return (
    <div className='min-h-screen bg-gray-600'>
      <main className='space-y-[10px] p-[10px]'>
        <div className='flex justify-center gap-x-[10px]'>
          <Block width={390} height={600}>
            <div className='flex h-full flex-col items-center justify-start'>
              <h2 className='pt-3 text-black'>회원가입</h2>
              <div className='mt-4 w-[90%] space-y-[20px]'>
                <Input
                  value={email}
                  placeholder='이메일'
                  className={`w-full ${emailError ? 'mb-1' : ''}`}
                  type='email'
                  error={emailError}
                  onChange={(e) => {
                    setEmailError(validateEmail(e.target.value))
                    setEmailState(e.target.value)
                  }}
                  onBlur={(e) => (!emailError ? setEmailState(e.target.value) : '')}
                />
                {emailError && (
                  <span style={{ color: 'red', fontSize: '0.9rem' }} className='mb-3'>
                    {emailError}
                  </span>
                )}
                <Input
                  placeholder='비밀번호'
                  className={`w-full ${passwordError ? 'mb-1' : ''}`}
                  type='password'
                  onChange={(e) => {
                    setPasswordError(validatePassword(e.target.value))
                  }}
                  onBlur={(e) => (!passwordError ? setPasswordState(e.target.value) : '')}
                />
                {passwordError && (
                  <span style={{ color: 'red', fontSize: '0.9rem' }} className='mb-3'>
                    {passwordError}
                  </span>
                )}
                <Input
                  placeholder='비밀번호 재입력'
                  className={`w-full ${confirmPasswordError ? 'mb-1' : ''}`}
                  type='password'
                  onChange={(e) => {
                    setConfirmPasswordError(validateConfirmPassword(password, e.target.value))
                  }}
                  onBlur={(e) =>
                    !confirmPasswordError ? setConfirmPasswordState(e.target.value) : ''
                  }
                />
                {confirmPasswordError && (
                  <span style={{ color: 'red', fontSize: '0.9rem' }} className='mb-3'>
                    {confirmPasswordError}
                  </span>
                )}
                <div
                  className={`${apiKeyError ? 'mb-1' : ''} flex w-full items-center justify-between`}
                >
                  <Input
                    placeholder='API KEY'
                    error={apiKeyError}
                    value={apiKey}
                    type='api'
                    onChange={(e) => {
                      setApiKeyState(e.target.value)
                      setApiKeyChecked(false)
                      setApiKeyError('')
                      setCharacterState('')
                    }}
                  />
                  <Button
                    text='인증'
                    textStyle='text-2xl font-extrabold h-full '
                    className='h-full rounded-lg px-6 py-1'
                    onClick={async () => {
                      const error = await validateApiKey(apiKey)
                      setApiKeyError(error)
                      setApiKeyChecked(true)
                    }}
                  />
                </div>
                {apiKeyError && (
                  <span style={{ color: 'red', fontSize: '0.9rem' }} className='mb-3'>
                    {apiKeyError}
                  </span>
                )}
                <div
                  className={`${characterError ? 'mb-1' : ''} flex w-full items-center justify-between`}
                >
                  <Input
                    placeholder='대표 캐릭터명'
                    disabled={!apiKeyChecked || !!apiKeyError || !apiKey}
                    error={characterError}
                    value={character}
                    type='character'
                    onChange={(e) => {
                      setCharacterState(e.target.value)
                    }}
                  />
                  <Button
                    text='인증'
                    textStyle='text-2xl font-extrabold h-full '
                    className='h-full rounded-lg px-6 py-1'
                    onClick={async () => {
                      const error = await validateCharacterName(character, apiKey)
                      setCharacterError(error)
                    }}
                  />
                </div>
                {characterError && (
                  <span style={{ color: 'red', fontSize: '0.9rem' }} className='mb-3'>
                    {characterError}
                  </span>
                )}
              </div>
              <div className='mt-8 w-[90%] space-y-[10px]'>
                <Button
                  text='회원가입'
                  className='w-full'
                  textStyle='text-xl font-extrabold'
                  onClick={() => {
                    if (
                      !emailError &&
                      !passwordError &&
                      !confirmPasswordError &&
                      !apiKeyError &&
                      !characterError &&
                      email &&
                      password &&
                      confirmPassword &&
                      apiKey &&
                      character &&
                      apiKeyChecked
                    ) {
                      setEmail(email)
                      setPassword(password)
                      setConfirmPassword(confirmPassword)
                      setApiKey(apiKey)
                      setCharacter(character)
                      console.log('회원가입 정보:', { email, password, apiKey, character })
                      // 회원가입 로직 추가 필요
                    } else {
                      console.log('유효성 검사 실패:', {
                        emailError: emailError,
                        passwordError: passwordError,
                        confirmPasswordError: confirmPasswordError,
                        apiKeyError: apiKeyError,
                        characterError: characterError,
                      })
                      alert('입력한 정보를 확인해주세요.')
                    }
                  }}
                />
                <Button
                  text='Google 로그인'
                  className='w-full text-black'
                  darkColor='bg-white'
                  lightColor='bg-gray'
                  textStyle='text-xl font-extrabold'
                />
              </div>
            </div>
          </Block>
        </div>
      </main>
    </div>
  )
}

export default register

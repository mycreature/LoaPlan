import axios from 'axios'

export const validateEmail = (value: string) => {
  if (!value) return '이메일을 입력하세요.'
  if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(value)) return '이메일 형식이 올바르지 않습니다.'
  return ''
}

export const validatePassword = (value: string) => {
  if (!value) return '비밀번호를 입력하세요.'
  if (value.length < 8) return '비밀번호는 8자 이상이어야 합니다.'
  return ''
}

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) return '비밀번호가 일치하지 않습니다.'
  return ''
}

export const validateApiKey = async (apiKey: string) => {
  if (!apiKey) return 'API 키를 입력하세요.'

  apiKey = 'bearer ' + apiKey.trim()

  try {
    const res = await axios.get(
      'https://developer-lostark.game.onstove.com/characters/마이크리처/siblings',
      {
        headers: {
          authorization: apiKey,
          accept: 'application/json',
        },
        timeout: 3000, // 3초 제한
      },
    )

    // 200 OK면 정상
    if (res.status === 200) alert('API 키 검증 성공.')
    return ''
  } catch (e: any) {
    if (
      (e.response && e.response.status === 401) ||
      (e.message && e.message.includes('String contains non ISO-8859-1 code point'))
    ) {
      return 'API 키가 유효하지 않습니다.'
    }
    return 'API 키 검증 중 오류가 발생했습니다.'
  }
}

export const validateCharacterName = async (character: string, apiKey: string) => {
  if (!character) return '캐릭터명을 입력하세요.'

  character = character.trim()

  try {
    const res = await axios.get(
      `https://developer-lostark.game.onstove.com/armories/characters/${character}/profiles`,
      {
        headers: {
          authorization: 'bearer ' + apiKey,
          accept: 'application/json',
        },
        timeout: 3000, // 3초 제한
      },
    )
    if (res.data == null) {
      return '캐릭터명이 유효하지 않습니다.'
    }
    if (res.data.length == 0 || res.data.CharacterImage == null) {
      return '캐릭터명이 유효하지 않습니다.'
    }
    if (res.status === 200) alert('캐릭터 검증 성공.')
    return ''
  } catch (e: any) {
    if (e.response && e.response.status === 404) {
      return '캐릭터명이 유효하지 않습니다.'
    }
    return '캐릭터명 검증 중 오류가 발생했습니다.'
  }
}

export const disabledEmailInput = (email: string, emailChecked: boolean, emailError?: string) => {
  if (emailError) return false

  if (emailChecked && email) return true

  return false
}

export const disableldVerificationCodeInput = (
  verificationCode: string,
  verificationCodeChecked: boolean,
  emailChecked: boolean,
  verificationCodeError?: string,
) => {
  if (verificationCodeError) return false

  if (!emailChecked) return true

  if (verificationCodeChecked && emailChecked && verificationCode) return true

  return false
}

export const disabledApiKeyInput = (
  apiKey: string,
  apiKeyChecked: boolean,
  apikeyError: string,
) => {
  if (apikeyError) return false

  if (apiKeyChecked && apiKey) return true

  return false
}

export const disabledCharacterInput = (
  character: string,
  characterChecked: boolean,
  characterError: string,
  apiKey: string,
  apiKeyChecked: boolean,
  apiKeyError: string,
) => {
  const apikeyState = disabledApiKeyInput(apiKey, apiKeyChecked, apiKeyError)

  if (characterError) return false

  if (!apikeyState) return true

  if (character && characterChecked && apikeyState) return true

  return false
}

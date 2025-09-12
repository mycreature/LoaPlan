import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { guestAccount } from '../constants/guestStorage'

const guestApiKeys = [
  guestAccount.apiKey,
  guestAccount.apikey_2,
  guestAccount.apiKey_3,
  guestAccount.apiKey_4,
].filter(Boolean) // VITE 환경변수가 없을 경우(undefined)를 대비해 배열에서 제거

export const createLostarkInstance = (apikey: string): AxiosInstance => {
  // 게스트 인스턴스 유무 파악
  const isGuestMode = guestApiKeys.includes(apikey)

  // 기본 API-Key 인덱스
  let currentKeyIndex = 0

  const instance = axios.create({
    baseURL: 'https://developer-lostark.game.onstove.com',
    headers: {
      'content-type': 'application/json;charset-UTF-8',
      accept: 'application/json',
    },
  })

  // 요청 인터셉터: 요청 헤더 설정에만 집중합니다.
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      let currentApiKey = apikey

      if (isGuestMode) {
        currentApiKey = guestApiKeys[currentKeyIndex]
      }

      config.headers.authorization = `bearer ${currentApiKey}`
      return config
    },
    (error: AxiosError) => {
      // 어차피 response 인터셉터에서 모든 에러를 처리할 것이므로,
      // 여기서 로깅하면 중복이 발생합니다.
      return Promise.reject(error)
    },
  )

  // 응답 인터셉터: 모든 응답 처리(성공, 재시도, 최종 실패 로깅)를 전담합니다.
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig

      if (
        error.response?.status === 429 &&
        isGuestMode &&
        currentKeyIndex < guestApiKeys.length - 1
      ) {
        currentKeyIndex++

        // 헤더를 직접 수정하는 대신, instance.defaults를 사용하는 것도 좋은 방법이지만
        // 현재 구조에서는 originalRequest를 수정하는 것이 직관적입니다.
        const newApiKey = guestApiKeys[currentKeyIndex]
        originalRequest.headers.authorization = `bearer ${newApiKey}`

        return instance(originalRequest)
      }

      // ✅ 최종 실패 지점: 재시도 조건이 맞지 않거나 모든 재시도에 실패하면 이 곳으로 옵니다.
      console.error('❌ Lostark API 최종 오류:', error.response?.data || error.message)
      return Promise.reject(error)
    },
  )

  return instance
}

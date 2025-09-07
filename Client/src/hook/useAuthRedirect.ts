import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAccountStore from '../stores/others/AccountStore'

// 현재 계정 상태 확인
export const getAuthStatus = () => {
  const isGuest = useAccountStore.getState().isGuest
  const isLogin = !!localStorage.getItem('token')

  return { isGuest, isLogin }
}

// 로그인 or 게스트 유저만 접근 가능 (비 로그인 x)
export const useRequireUserOrGuest = (redirectUrl: string = '/', message?: boolean) => {
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const { isGuest, isLogin } = getAuthStatus()

    if (!isLogin && !isGuest) {
      if (message) {
        alert('로그인 해주세요!!')
      }
      navigate(redirectUrl)
    }
    setChecked(true)
  }, [navigate, redirectUrl])

  return checked
}

// 로그인 유저만 접근 가능 (게스트, 비 로그인 x)
export const useRequireUser = (redirectUrl: string = '/', message?: boolean) => {
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const { isGuest, isLogin } = getAuthStatus()

    if (isGuest || !isLogin) {
      if (message) {
        alert('로그인 해주세요!!')
      }
      navigate(redirectUrl)
    }
    setChecked(true)
  }, [navigate, redirectUrl])

  return checked
}

// 비 로그인 유저만 접근 가능 (로그인, 게스트 x)
export const useRequireNoAuth = (redirectUrl: string = '/', message?: boolean) => {
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const { isGuest, isLogin } = getAuthStatus()

    if (isLogin || isGuest) {
      if (message) {
        alert('로그아웃 됩니다!!')
      }
      navigate(redirectUrl)
    }
    setChecked(true)
  }, [navigate, redirectUrl])

  return checked
}
